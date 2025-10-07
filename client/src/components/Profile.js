import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ user, onRefresh }) => {
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const referralLink = `${window.location.origin}/referral/${user.referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Meu Perfil</h2>
          <button 
            onClick={handleRefresh} 
            className="refresh-btn"
            disabled={refreshing}
          >
            {refreshing ? 'Atualizando...' : '🔄 Atualizar'}
          </button>
        </div>

        <div className="profile-info">
          <div className="info-section">
            <h3>Informações Pessoais</h3>
            <div className="info-item">
              <label>Nome:</label>
              <span>{user.name}</span>
            </div>
            <div className="info-item">
              <label>E-mail:</label>
              <span>{user.email}</span>
            </div>
          </div>

          <div className="points-section">
            <h3>Pontuação</h3>
            <div className="points-display">
              <div className="points-number">{user.points}</div>
              <div className="points-label">pontos</div>
            </div>
            <p className="points-description">
              Você ganha 1 ponto a cada pessoa que se cadastra usando seu link de indicação!
            </p>
          </div>

          <div className="referral-section">
            <h3>Seu Link de Indicação</h3>
            <div className="referral-link-container">
              <div className="referral-link">
                <code>{referralLink}</code>
              </div>
              <button 
                onClick={copyToClipboard}
                className={`copy-btn ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar Link'}
              </button>
            </div>
            <p className="referral-description">
              Compartilhe este link com seus amigos para ganhar pontos!
            </p>
          </div>

          <div className="how-it-works">
            <h3>Como Funciona</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Compartilhe seu link</strong>
                  <p>Copie e compartilhe seu link de indicação com amigos</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Amigo se cadastra</strong>
                  <p>Seu amigo clica no link e se cadastra na plataforma</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Você ganha pontos</strong>
                  <p>Automaticamente você recebe 1 ponto por indicação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


