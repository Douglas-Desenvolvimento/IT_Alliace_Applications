import { useState, useEffect } from 'react';

// Função para verificar se a sessão expirou
function isSessionExpired(expirationTime) {
  return expirationTime < Date.now();
}

// Função para verificar se houve inatividade do usuário
function hasUserBeenInactive(inactivityTimeout) {
  const lastActivityTime = localStorage.getItem('lastActivityTime');
  return lastActivityTime && Date.now() - lastActivityTime > inactivityTimeout;
}

// Função para realizar logout se a sessão expirar por inatividade do usuário
export function checkSessionExpiration(setShowSessionExpiredAlert) {
  const expirationTime = localStorage.getItem('expirationTime');
  const inactivityTimeout = 5 * 60 * 1000; // Tempo de inatividade em milissegundos (5 minutos)
  
  // Verificar se a sessão expirou devido à inatividade do usuário
  if (hasUserBeenInactive(inactivityTimeout)) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    setShowSessionExpiredAlert(true); // Exibir alerta de sessão expirada
    // Redirecionar ou realizar outras ações necessárias após o logout
  } else if (expirationTime && isSessionExpired(parseInt(expirationTime))) {
    // Sessão expirada por tempo limite, realizar logout
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    setShowSessionExpiredAlert(true); // Exibir alerta de sessão expirada
    // Redirecionar ou realizar outras ações necessárias após o logout
  }
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
  }, 60000); // Verificar a cada minuto

  // Atualizar o horário de atividade do usuário quando houver atividade na página
  document.addEventListener('mousemove', updateUserActivity);
  document.addEventListener('keydown', updateUserActivity);
}

export function useSession() {
  const [showSessionExpiredAlert, setShowSessionExpiredAlert] = useState(false);

  useEffect(() => {
    setupSessionExpirationCheck(setShowSessionExpiredAlert);
    checkSessionExpiration(setShowSessionExpiredAlert);
  }, []);

  return { showSessionExpiredAlert };
}
