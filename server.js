const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Inicializar banco de dados
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Criar tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    referral_code TEXT UNIQUE NOT NULL,
    points INTEGER DEFAULT 0,
    referred_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Rotas da API

// Cadastrar usuário
app.post('/api/register', async (req, res) => {
  const { name, email, password, referralCode } = req.body;

  // Validações básicas
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Formato de e-mail inválido' });
  }

  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
    return res.status(400).json({ error: 'A senha deve conter pelo menos uma letra e um número' });
  }

  try {
    // Verificar se e-mail já existe
    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const userReferralCode = uuidv4().substring(0, 8);

    // Verificar se código de indicação é válido (se fornecido)
    let referredBy = null;
    if (referralCode) {
      const referrer = await new Promise((resolve, reject) => {
        db.get('SELECT id FROM users WHERE referral_code = ?', [referralCode], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });

      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Inserir usuário
    const userId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, password, referral_code, referred_by) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, userReferralCode, referredBy],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    // Se foi indicado, adicionar ponto ao indicador
    if (referredBy) {
      await new Promise((resolve, reject) => {
        db.run('UPDATE users SET points = points + 1 WHERE id = ?', [referredBy], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    res.json({ 
      success: true, 
      message: 'Usuário cadastrado com sucesso',
      userId,
      referralCode: userReferralCode
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar usuário por ID
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;

  db.get(
    'SELECT id, name, email, referral_code, points FROM users WHERE id = ?',
    [userId],
    (err, row) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({
        id: row.id,
        name: row.name,
        email: row.email,
        referralCode: row.referral_code,
        points: row.points
      });
    }
  );
});

// Buscar usuário por código de indicação
app.get('/api/user-by-code/:code', (req, res) => {
  const code = req.params.code;

  db.get(
    'SELECT id, name, email, referral_code, points FROM users WHERE referral_code = ?',
    [code],
    (err, row) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Código de indicação inválido' });
      }

      res.json({
        id: row.id,
        name: row.name,
        email: row.email,
        referralCode: row.referral_code,
        points: row.points
      });
    }
  );
});

// Servir React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Fechar banco ao encerrar
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conexão com banco de dados fechada.');
    process.exit(0);
  });
});
