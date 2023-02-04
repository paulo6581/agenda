exports.middlewareGlobal = (req, res, next) => {
    // Injetando conteúdo em todas as rotas.
    res.locals.umaVariavelLocal = 'Este é o valor da variável local';
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};  

// middleware verification CSRF
exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('404.ejs');
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};