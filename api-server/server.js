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
const { router: allservicesRouter } = require('./allServices');
const servicesRouter = require('./servicesApi');

app.use('/user', userRouter);
app.use('/api/renew-token', renewTokenRoute);
app.use('/api/token', tokenRoute);
app.use('/api/allservices', allservicesRouter);
app.use('/api/services', servicesRouter);




app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
