const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Substitua pelo seu URL frontend
  }));


const { generateToken } = require('./auth');
const { router: userRouter } = require('./userRoute');
const { user: users } = require('./userRoute');

app.use('/user', userRouter);




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
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
