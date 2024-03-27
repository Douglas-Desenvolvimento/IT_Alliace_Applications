import { decode } from "jwt-decode";
import { isTokenExpired } from './isTokenExpired';
import { renewToken } from './renewToken';

const TOKEN_EXPIRATION_THRESHOLD = 60000; // Tempo limite em milissegundos antes do token expirar

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
