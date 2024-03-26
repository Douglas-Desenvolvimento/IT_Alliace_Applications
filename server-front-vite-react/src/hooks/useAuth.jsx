// useAuth.js
import { useState } from 'react';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      // Simulando uma solicitação à API para validar o usuário
      // Substitua esta lógica pela chamada real à sua API
      if (username === 'usuario' && password === 'senha') {
        setAuthenticated(true);
        return true;
      } else {
        throw new Error('Nome de usuário ou senha inválidos.');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
};

export default useAuth;
