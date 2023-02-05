// MÉTODO GET (Carregar páginas)
require('dotenv').config(); // para esconder senhas e user para n ser submit ao github

const express = require('express');
const app = express();

const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTIONSTRING , {useNewUrlParser: true, useUnifiedTopology: true})  // return promise
    .then(() => {
        app.emit('Okay')
    })
    .catch((error) => console.log(error));

const session = require('express-session'); // Vai salvar a sessão na memória, identificar o nav do cliente, salvar um cookie
const MongoStore = require('connect-mongo'); // Session vao ser salvas no banco de dados
const flash = require('connect-flash'); // flash mesages, mensagens autodestrutivas, msg error ou feedback, salvas em sessão

const routes = require('./routes'); // rotas da API
const path = require('path');

const helmet = require('helmet'); // security
const csrf = require('csurf'); // tokens para os forms
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middleware/middleware')

app.use(helmet());

app.use(express.urlencoded({extended: true})); // Vai dar condição para o req.body realizar algo quando requisitado dps de um POST
app.use(express.json());
// Conteúdo static

app.use(express.static(path.resolve(__dirname, 'public'))); // arquivos státicos e que podem ser acessados diretamente (img, css, js) 

// .....
 
const sessionOptions = session({ // configs session
    secret: 'AK28DHNSGE2FNS8302KSS3030() ALN30',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}), // nova sintaxe do mongo recomenda o uso do .create e um .env do URI do mongodb
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // total de 7 dias o cookie vai durar
        httpOnly: true
    }
}) 

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // pode ser feito um redirecionamento por diretórios, porem pode dar problemas, aconselho utilizar absoluto como está
app.set('view engine', 'ejs');

app.use(csrf()); // antes de cada middleware vai injetar os tokens (senhas)
// Nossos próprios Middlewares
app.use(middlewareGlobal); // Em todas requisições, rotas, verbos, vão passar dentro desse middleware
app.use(checkCsrfError); // middleware do CSRFS para page 404
app.use(csrfMiddleware); // middleware pra cada form, que vai gerar os tokens
app.use(routes);    

app.on('Okay', () => {  // So sera feito a conexão do cliente com o server, após a conexão com o db for feita
    app.listen(3000, () => {
        console.log('Acesse: http://localhost:3000')
        console.log('Servidor Executando na Porta: 3000')
    });
});
