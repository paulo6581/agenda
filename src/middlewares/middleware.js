exports.middlewareGlobal = (req, res, next) => {
    // Injetando conteúdo em todas as rotas.
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};  

// middleware verification CSRF
exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404.ejs');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

// checks if the user is logged
exports.loginRequired =(req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => req.redirect('/'));
        return;
    }
    next();
};