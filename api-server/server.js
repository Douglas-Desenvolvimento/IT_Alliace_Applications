const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Substitua pelo seu URL frontend
  }));


const { generateToken } = require('./auth');
const { router: userRouter } = require('./userRoute');
const { user: users } = require('./userRoute');
const tokenRoute = require('./tokenRoute');
const renewTokenRoute = require('./renewTokenRoute');

app.use('/user', userRouter);
app.use('/api/renew-token', renewTokenRoute);
app.use('/api/token', tokenRoute);

// Rota para renovar o token
/* app.post('/api/renew-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    // Verifique se o token é válido usando a chave secreta importada
    const decoded = jwt.verify(token, auth.secretKey);

    // Se o token for válido, gere um novo token
    const newToken = jwt.sign({ userId: decoded.userId }, auth.secretKey, { expiresIn: '1h' });

    // Retorne o novo token na resposta
    res.json({ token: newToken });
  } catch (error) {
    console.error('Erro ao renovar o token:', error.message);
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Rota para login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    const foundUser = users.find(user => user.username === username && user.password === password);

    // Exemplo de lógica de validação do usuário (substitua por sua própria lógica):
    if (foundUser) {
      try {
        // Gera o token JWT usando a função importada
        const token = generateToken(username);
  
        // Retorna o token gerado como resposta
        res.json({ token, users: foundUser});
        console.log('Token gerado com sucesso:', token, foundUser);
      } catch (error) {
        console.error('Erro ao gerar o token:', error.message);
        res.status(500).json({ error: 'Erro ao gerar o token.' });
      }
    } else {
      // Se as credenciais estiverem incorretas, retorna um erro de autenticação
      res.status(401).json({ error: 'Credenciais inválidas.' });
    }
}); */

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
