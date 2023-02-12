const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    if(req.session.user) {
        const contatos = await Contato.findContatos(req.session.user.email);
        res.render('index.ejs', {contatos});
        return
    }
    res.render('login.ejs');
};
