const express = require('express');
const { generateToken } = require('./auth');
const { user: users } = require('./userRoute');
const router = express.Router();

// Rota para login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find(user => user.username === username && user.password === password);

  // Exemplo de lógica de validação do usuário (substitua por sua própria lógica):
  if (foundUser) {
    try {
      // Gera o token JWT usando a função importada
      const token = generateToken(username);
      const expirationTime = Date.now() + 50 * 60 * 1000;
      console.log('Usuário encontrado:', foundUser);  

      // Faz uma requisição para a rota '/user' e passa o token como parte do corpo da requisição
      fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: foundUser, token }) // Passando o usuário e o token no corpo da requisição
      })
      .then(response => {
        // Aqui você pode processar a resposta da rota '/user' se necessário
        console.log('Resposta da rota /user:', response);
      })
      .catch(error => {
        console.error('Erro ao fazer requisição para /user:', error);
      });

      // Retorna apenas as informações necessárias do usuário
      res.json({ token, expirationTime, user: { 
        username: foundUser.username,
        email: foundUser.email,
        telefone: foundUser.telefone,
        role: foundUser.role,
        empresa: foundUser.empresa,
        siteid: foundUser.siteid,
        token: token // Adiciona o token gerado ao campo 'token' no objeto de resposta
      }});
      console.log('Token gerado com sucesso:', token);
      console.log('Tempo de expiração:', expirationTime);
    } catch (error) {
      console.error('Erro ao gerar o token:', error.message);
      res.status(500).json({ error: 'Erro ao gerar o token.' });
    }
  } else {
    // Se as credenciais estiverem incorretas, retorna um erro de autenticação
    res.status(401).json({ error: 'Credenciais inválidas.' });
  }
});

module.exports = router;
