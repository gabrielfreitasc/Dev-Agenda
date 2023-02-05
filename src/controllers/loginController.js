const Login = require('../models/loginModel')

exports.index = (req, res) => {  // Verifica se o usuário esta logado
    if(req.session.user) {
        return res.render('logged')
    };
    res.render('login');
};

// exports.logged = function(req, res) {
//     res.render('logged');
// }

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body)
        await login.register();
    
        if(login.errors.length > 0) { // funcionalidade de exibir os errors na tela
            req.flash('errors', login.errors);
            // Quando der error, deve-se voltar pra página de registro novamente, para isso é necessáiro salvar a sessão
            req.session.save(function() {
                return res.redirect('/');
            });
            return;
        }

        req.flash('success', "Seu usuário foi criado com sucesso!");
        req.session.save(function() {
            res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body)
        await login.logOn();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
              return res.redirect('/login');
            });
            return;
        }

        req.flash('success', "Você conectou na sua conta!");
        req.session.user = login.user;  // jogando o navegador do usuario na sessão
        req.session.save(function() {
            return res.redirect('/login');
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}