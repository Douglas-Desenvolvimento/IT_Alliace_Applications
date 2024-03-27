const jwt = require('jsonwebtoken');

const SECRET_KEY = '260914Pds@';

// Função para gerar token JWT
const generateToken = (username) => {
    try {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1m' });
        return token;
    } catch (error) {
        console.error('Erro ao gerar o token:', error.message);
        throw new Error('Erro ao gerar o token.');
    }
};

module.exports = { generateToken };

module.exports = {
    secretKey: SECRET_KEY,
    generateToken
  };
