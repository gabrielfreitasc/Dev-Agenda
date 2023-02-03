// Arquivo com a função de realizar o ROTEAMENTO

const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas Home
route.get('/', homeController.index); // (Middlewares)

// Rotas de Login
route.get('/login', loginController.index); // (Middlewares)
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
// route.get('/login/logged', loginController.logged);
route.get('/login/logout', loginController.logout);

module.exports = route; 