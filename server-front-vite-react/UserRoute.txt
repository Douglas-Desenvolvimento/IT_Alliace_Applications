const express = require('express');
const router = express.Router();

const user = [
    // Dados dos usuários
    {
        "id": "1",
        "username": "Douglas",
        "telefone": 2197045500,
        "email": "douglas@email.com",
        "role": "admin",
        "password": "260914",
        "empresa": "IT Alliance"
      },
      {
        "id": "2",
        "username": "Paula",
        "telefone": 2197048919,
        "email": "paula@email.com",
        "role": "user",
        "password": "260914",
        "empresa": "DS Solutions"
      },
      {
        "id": "3",
        "username": "Alice",
        "telefone": 2197048866,
        "email": "alice@email.com",
        "role": "tech",
        "password": "260914",
        "empresa": "Dev Limites"
      }
];

// Rota para obter todos os usuários
router.get('/', (req, res) => {
  res.json(user);
});

// Outras rotas relacionadas aos usuários podem ser adicionadas aqui
module.exports = {user, router};
