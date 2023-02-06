const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato.ejs', {
        contato: {}
    });

};

// Will get the datas and save it in the Database
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('../contato/index'));
            return;
        }

        req.flash('success', 'Contato Salvo com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));


    } catch(e) {
        console.log(e);
        return res.render('404.ejs');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) res.render('404.ejs');
    const contato = await Contato.findById(req.params.id);
    if (!contato) res.render('404.ejs');   

    res.render('contato.ejs', {contato});
};