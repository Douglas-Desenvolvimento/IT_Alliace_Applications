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
      const expirationTime = Date.now() + 60 * 1000;
      // Retorna o token gerado como resposta
      res.json({ token, expirationTime, users: foundUser});
      console.log('Token gerado com sucesso:', token, foundUser);
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
