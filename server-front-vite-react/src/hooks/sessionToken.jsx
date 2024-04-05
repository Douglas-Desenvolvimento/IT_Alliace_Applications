import { useState, useEffect } from 'react';
import axios from 'axios';

// Função para verificar se o token expirou
function isTokenExpired(expirationTime) {
  return expirationTime < Date.now();
}

// Função para verificar se a sessão expirou
function isSessionExpired(expirationTime) {
  return expirationTime < Date.now();
}

// Função para verificar se houve inatividade do usuário
function hasUserBeenInactive(inactivityTimeout) {
  const lastActivityTime = localStorage.getItem('lastActivityTime');
  return lastActivityTime && Date.now() - parseInt(lastActivityTime) > inactivityTimeout;
}

// Função para realizar logout se a sessão expirar por inatividade do usuário
export function checkSessionExpiration(setShowSessionExpiredAlert) {
  const expirationTime = localStorage.getItem('expirationTime');
  const inactivityTimeout = 2 * 60 * 1000; // Tempo de inatividade em milissegundos (2 minutos)

  const isSessionActive = !hasUserBeenInactive(inactivityTimeout);

  if (expirationTime && isSessionActive) {
    if (isSessionExpired(parseInt(expirationTime))) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      setShowSessionExpiredAlert(true); // Exibir alerta de sessão expirada
    } else {
      renewToken(localStorage.getItem('token'))
        .then(() => {
          // Token renovado com sucesso, atualize o tempo de expiração
          const newExpirationTime = Date.now() + (2 * 60 * 1000); // Novo tempo de expiração (2 minutos)
          localStorage.setItem('expirationTime', newExpirationTime.toString());
          console.log('Token renovado com sucesso. Novo tempo de expiração:', newExpirationTime);
        })
        .catch(error => {
          console.error('Erro ao renovar o token:', error);
          setShowSessionExpiredAlert(true); // Exibir alerta de sessão expirada em caso de erro na renovação
        });
    }
  } else {
    // Sessão expirada por inatividade do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    setShowSessionExpiredAlert(true); // Exibir alerta de sessão expirada
  }
}

// Função para renovar o token fazendo uma requisição à rota /api/renew-token
function renewToken(oldToken) {
  return axios.post('http://localhost:3000/api/renew-token', null, {
    headers: {
      Authorization: `Bearer ${oldToken}` // Inclui o token antigo no cabeçalho Authorization
    }
  })
    .then(response => {
      const newToken = response.data.token;
      const expiresIn = response.data.expiresIn;

      if (!newToken || !expiresIn) {
        throw new Error('Resposta inválida ao renovar o token');
      }

      // Lógica para tratar a resposta da renovação do token, se necessário
      console.log('Token renovado com sucesso:', newToken, expiresIn);
    })
    .catch(error => {
      throw error;
    });
}

// Função para atualizar o último horário de atividade do usuário
function updateUserActivity() {
  localStorage.setItem('lastActivityTime', Date.now().toString());
}

// Função para configurar a verificação de expiração da sessão em intervalos regulares
export function setupSessionExpirationCheck(setShowSessionExpiredAlert) {
  // Verificar a expiração da sessão periodicamente (por exemplo, a cada minuto)
  setInterval(() => {
    checkSessionExpiration(setShowSessionExpiredAlert);
  }, 2 * 60 * 1000); // Verificar a cada 2 minutos

  // Atualizar o horário de atividade do usuário quando houver atividade na página
  document.addEventListener('click', updateUserActivity);
  document.addEventListener('keydown', updateUserActivity);
}

// Hook customizado para gerenciar a sessão do usuário
export function useSession() {
  const [showSessionExpiredAlert, setShowSessionExpiredAlert] = useState(false);

  useEffect(() => {
    setupSessionExpirationCheck(setShowSessionExpiredAlert);
    checkSessionExpiration(setShowSessionExpiredAlert);
  }, []);

  return { showSessionExpiredAlert };
}
