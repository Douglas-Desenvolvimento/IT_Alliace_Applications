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
  