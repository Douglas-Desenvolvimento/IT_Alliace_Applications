
// Função para verificar se a sessão expirou
function isSessionExpired(expirationTime) {
    return expirationTime < Date.now();
  }
  
  // Lógica para realizar logout se a sessão expirar
  export function checkSessionExpiration(setShowSessionExpiredAlert) {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime && isSessionExpired(parseInt(expirationTime))) {
      // Sessão expirada, realizar logout
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      setShowSessionExpiredAlert(true); // Exibir aleta de sessão expirada
      // Redirecionar ou realizar outras ações necessárias após o logout
    }
  }
  
  // Verificar a expiração da sessão periodicamente (por exemplo, a cada minuto)
  setInterval(checkSessionExpiration, 60000); // Verificar a cada minuto
  