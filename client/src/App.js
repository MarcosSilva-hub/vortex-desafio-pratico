import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Register from './components/Register';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('/api/register', userData);
      
      if (response.data.success) {
        // Buscar dados completos do usuário
        const userResponse = await axios.get(`/api/user/${response.data.userId}`);
        const userInfo = userResponse.data;
        
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        return { success: true };
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erro ao cadastrar usuário' 
      };
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const refreshUserData = async () => {
    if (user) {
      try {
        const response = await axios.get(`/api/user/${user.id}`);
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Vortex</h1>
          <p>Sistema de Pontos por Indicação</p>
          {user && (
            <div className="user-info">
              <span>Olá, {user.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Sair
              </button>
            </div>
          )}
        </header>

        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={
                user ? 
                <Navigate to="/profile" replace /> : 
                <Navigate to="/register" replace />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? 
                <Navigate to="/profile" replace /> : 
                <Register onRegister={handleRegister} />
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? 
                <Profile user={user} onRefresh={refreshUserData} /> : 
                <Navigate to="/register" replace />
              } 
            />
            <Route 
              path="/referral/:code" 
              element={<Register onRegister={handleRegister} />} 
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Vortex - Sistema de Indicação</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
