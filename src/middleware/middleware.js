exports.middlewareGlobal = (req, res, next) => {
    res.locals.variableLocal = 'Valor da variableLocal'; // poderia ser qualquer coisa nesse valor da variável
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