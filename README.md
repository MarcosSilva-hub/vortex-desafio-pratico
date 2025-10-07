# Vortex - Sistema de Indicação

Uma aplicação web SPA (Single Page Application) que implementa um sistema de pontos por indicação, desenvolvida com React no front-end e Node.js/Express no back-end.

## 🚀 Funcionalidades

### ✅ Requisitos Funcionais Implementados

- **Página de Cadastro**: Formulário completo com validação em tempo real
- **Validação Front-end**: 
  - E-mail com formato válido
  - Senha com mínimo 8 caracteres contendo letras e números
  - Confirmação de senha
- **Página de Perfil**: 
  - Exibição do nome do usuário
  - Pontuação atual (inicia em 0)
  - Link de indicação único
  - Botão "Copiar Link" funcional
- **Sistema de Indicação**: 
  - Links únicos por usuário
  - Pontuação automática (+1 ponto por indicação)
  - Atualização de pontos em tempo real

### 🎨 Design e UX

- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **CSS Puro**: Sem frameworks de UI (Bootstrap, Material UI, Tailwind)
- **Design Moderno**: Gradientes, glassmorphism e animações suaves
- **Experiência Intuitiva**: Navegação clara e feedback visual

## 🛠️ Tecnologias Escolhidas

### Front-end: React
**Justificativa**: 
- Componentização eficiente para reutilização de código
- Hooks para gerenciamento de estado moderno
- React Router para navegação SPA
- Ecossistema maduro com excelente suporte
- Facilita manutenção e escalabilidade

### Back-end: Node.js + Express
**Justificativa**:
- JavaScript em todo o stack (consistência)
- Express é leve e flexível
- Excelente para APIs REST
- Comunidade ativa e documentação extensa
- Fácil deploy e integração com front-end

### Banco de Dados: SQLite
**Justificativa**:
- Zero configuração (arquivo local)
- Perfeito para desenvolvimento e protótipos
- Suporte completo a SQL
- Fácil backup e portabilidade
- Ideal para aplicações de pequeno/médio porte

## 📁 Estrutura do Projeto

```
vortex-desafio-pratico/
├── client/                 # Front-end React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.js         # Componente principal
│   │   └── index.js       # Ponto de entrada
│   └── package.json
├── server.js              # Servidor Express
├── package.json           # Dependências do back-end
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd vortex-desafio-pratico
```

2. **Instale as dependências**
```bash
# Instalar dependências do back-end
npm install

# Instalar dependências do front-end
cd client
npm install
cd ..
```

3. **Execute a aplicação**

**Opção 1: Desenvolvimento (recomendado)**
```bash
npm run dev
```
Este comando executa o servidor e o cliente simultaneamente.


4. **Acesse a aplicação**
- Front-end: http://localhost:3000
- Back-end API: http://localhost:5000

## 🔧 Scripts Disponíveis

### Back-end
- `npm start` - Executa o servidor em produção
- `npm run server` - Executa o servidor em modo desenvolvimento

### Front-end
- `npm run client` - Executa o React em modo desenvolvimento
- `npm run build` - Gera build de produção

### Desenvolvimento
- `npm run dev` - Executa back-end e front-end simultaneamente
- `npm run install-all` - Instala dependências de ambos os projetos

## 📡 API Endpoints

### POST /api/register
Cadastra um novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "referralCode": "abc12345" // opcional
}
```

### GET /api/user/:id
Busca dados do usuário por ID

### GET /api/user-by-code/:code
Busca usuário por código de indicação

## 🎯 Fluxo da Aplicação

1. **Cadastro**: Usuário preenche formulário com validação em tempo real
2. **Redirecionamento**: Após cadastro, usuário é direcionado para o perfil
3. **Perfil**: Exibe informações pessoais, pontos e link de indicação
4. **Indicação**: Usuário compartilha seu link único
5. **Pontuação**: Quando alguém se cadastra via link, o indicador ganha 1 ponto
6. **Atualização**: Pontos são atualizados automaticamente

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Validação tanto no front-end quanto back-end
- Códigos de indicação únicos (UUID)
- Sanitização de dados de entrada

## 📱 Responsividade

A aplicação foi desenvolvida com mobile-first approach:
- Breakpoints: 768px (tablet) e 480px (mobile)
- Layout flexível e adaptativo
- Componentes otimizados para touch
- Tipografia e espaçamentos ajustados

## 🎨 Design System

### Cores
- Primária: Gradiente azul-roxo (#667eea → #764ba2)
- Sucesso: Verde (#4CAF50)
- Erro: Vermelho (#e74c3c)
- Fundo: Gradiente azul-roxo com glassmorphism

### Tipografia
- Font-family: System fonts (San Francisco, Segoe UI, etc.)
- Hierarquia clara com diferentes pesos e tamanhos

### Componentes
- Cards com glassmorphism
- Botões com gradientes e hover effects
- Formulários com validação visual
- Animações suaves e transições

## 🚀 Deploy

### Produção
```bash
# Build do front-end
npm run build

# Executar servidor
npm start
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz:
```
PORT=5000
NODE_ENV=production
```

## 🤖 Colaboração com IA

Este projeto foi desenvolvido com o auxílio de IA para:

-Etapa visual: utilizei a IA como apoio criativo para definir o conceito estético e estrutural do layout da aplicação feita em React. Com isso, foi possível aprimorar a escolha da paleta de cores, com base em um estilo moderno e limpo. Essas orientações serviram como referência visual e técnica, permitindo que o design final fosse harmonioso, responsivo e funcional, mantendo a identidade visual do projeto sem depender de frameworks externos de CSS.

-Back End: A IA foi utilizada para acelerar o processo de estruturação da API REST desenvolvida com Node.js e Express. Com seu auxílio, foi possível estruturar os endpoints REST (/api/register, /api/user/:id, /api/user-by-code/:code), com validações e boas práticas de segurança, implementar o uso do bcrypt para o hash de senhas e UUID para geração de identificadores únicos e otimizar consultas ao banco SQLite, garantindo persistência local eficiente.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido por Marcos como parte do desafio prático Vortex.


