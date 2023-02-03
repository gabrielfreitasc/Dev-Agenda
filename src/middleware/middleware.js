exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors'); // poderia ser qualquer coisa nesse valor da variável
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.send("404"); // aqui renderiza-se uma página 404
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();  // Vai gerar um token para cada página, porem é necessário utiliza-lo em cada página
    next();
};