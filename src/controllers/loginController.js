const Login = require('../models/loginModel');

exports.index = (req, res) => {
    if (req.session.user) return res.render('login-logged.ejs');
    return res.render('login.ejs');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('../login/index');
            });
            return;
        }
    
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => {
            return res.redirect('../login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404.ejs');
    }
  
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('../login/index');
            });
            return;
        }

        req.flash('success', 'Você entrou no Sistema Agenda.');
        req.session.user =  login.user;

        req.session.save(() => {
            return res.redirect('../login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404.ejs');
    }
  
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};