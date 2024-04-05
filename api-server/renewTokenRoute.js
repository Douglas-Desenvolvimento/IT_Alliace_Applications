const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const router = express.Router();

// Rota para renovar o token
router.post('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    // Verifique se o token é válido usando a chave secreta importada
    const decoded = jwt.verify(token, auth.secretKey);

    // Se o token estiver expirado, gere um novo token
    if (Date.now() > decoded.exp * 1000) {
      const newToken = jwt.sign({ userId: decoded.userId }, auth.secretKey, { expiresIn: '2m' });
      const expiresIn = Math.floor((decoded.exp * 1000 - Date.now()) / 1000); // Tempo restante em segundos
      return res.json({ token: newToken, expiresIn });
    }

    // Retorne o token recebido na resposta, pois ainda não expirou
    const expiresIn = Math.floor((decoded.exp * 1000 - Date.now()) / 1000); // Tempo restante em segundos
    res.json({ token, expiresIn });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Se o token estiver expirado, gere um novo token com tempo de expiração
      const newToken = jwt.sign({ userId: error.userId }, auth.secretKey, { expiresIn: '50' });
      return res.json({ token: newToken, expiresIn: 2* 60 * 1000 });
    }
    console.error('Erro ao renovar o token:', error.message);
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
