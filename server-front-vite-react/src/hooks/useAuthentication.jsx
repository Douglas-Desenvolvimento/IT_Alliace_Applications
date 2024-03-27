import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      setError('');

      // Requisição para fazer o login
      const loginResponse = await fetch('http://localhost:3000/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!loginResponse.ok) {
        throw new Error('Falha ao fazer login.');
      }

      const { token, expirationTime } = await loginResponse.json(); // Obtenha o token JWT da resposta
      //const {expirationTime} = await loginResponse.json();
      // Armazene o token JWT localmente
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      console.log('Token JWT:', token, 'Tempo de expiração:', expirationTime);

      // Requisição para obter os dados do usuário autenticado
      const userResponse = await fetch('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${token}` // Envie o token JWT como cabeçalho de autorização
        }
      });

      if (!userResponse.ok) {
        throw new Error('Falha ao obter os dados do usuário.');
      }

      const userData = await userResponse.json();

      // Armazene os dados do usuário localmente
      localStorage.setItem('userData', JSON.stringify(userData));
      const userLocal = JSON.parse(localStorage.getItem('userData'));
      console.log('Dados do usuário:', userLocal);

      // Redireciona para a página desejada após o login
      navigate('/home');
      
      // Retorna true se o usuário for autenticado com sucesso
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  return { login };
};


export default useAuthentication;
