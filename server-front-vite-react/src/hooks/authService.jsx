// authService.js
import { jwtDecode } from "jwt-decode";

const TOKEN_EXPIRATION_THRESHOLD = 60000; // Tempo limite em milissegundos antes do token expirar

// Função para verificar se o token está expirado
export const isTokenExpired = (token) => {
  const decodedToken = decode(token);
  return decodedToken.exp < Date.now() / 1000;
};

// Função para renovar o token
export const renewToken = async () => {
  try {
    // Faça uma solicitação à API para renovar o token
    const response = await fetch('http://localhost:3000/api/renew-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to renew token.');
    }

    const { token } = await response.json();
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error renewing token:', error.message);
    // Trate o erro conforme necessário (por exemplo, redirecione para fazer login novamente)
  }
};

// Função para validar a sessão do usuário antes de acessar uma rota protegida
export const validateSession = async () => {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    // Token ausente ou expirado, encerrar a sessão do usuário
    // Redirecione o usuário para fazer login novamente
    // Por exemplo: navigate('/login');
    return false;
  }

  // Token ainda é válido, renová-lo se estiver prestes a expirar
  const decodedToken = decode(token);
  const expirationTime = decodedToken.exp * 1000; // Converta para milissegundos
  const currentTime = Date.now();

  if (expirationTime - currentTime < TOKEN_EXPIRATION_THRESHOLD) {
    // Token está prestes a expirar, renove-o
    await renewToken();
  }

  return true; // Sessão do usuário válida
};
