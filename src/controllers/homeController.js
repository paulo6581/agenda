const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.findContatos();
    res.render('index.ejs', {contatos});

};
