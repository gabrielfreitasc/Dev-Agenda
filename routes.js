// Arquivo com a função de realizar o ROTEAMENTO

const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middleware/middleware');

// Rotas Home
route.get('/', homeController.index); // (Middlewares)

// Rotas de Login
route.get('/login', loginController.index); // (Middlewares)
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
// route.get('/login/logged', loginController.logged);
route.get('/login/logout', loginController.logout);

// Rotas de Contato
route.get('/contato', loginRequired, contatoController.index); // temos aqui um Middleware entre a rota e o controller (somente usuários cadastrados)
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route; 