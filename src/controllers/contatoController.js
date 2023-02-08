const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato.ejs', {
        contato: {}
    });

};

// Will get the datas and save it in the Database (Create)
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('../contato/index'));
            return;
        }

        req.flash('success', 'Contato REGISTRADO com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(e) {
        console.log(e);
        return res.render('404.ejs');
    }
};

// get - edit contato
exports.editIndex = async (req, res) => {
    if(!req.params.id) res.render('404.ejs');
    const contato = await Contato.findById(req.params.id);
    if (!contato) res.render('404.ejs');   

    res.render('contato.ejs', {contato});
};

// post - edit contato (Update)
exports.edit = async (req, res) => {
    try {
        if(!req.params.id) res.render('404.ejs');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id); 
    
        
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contato/index/${req.params.id}`));    
            return;
        }
    
        req.flash('success', 'Contato EDITADO com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(e) {
        console.log(e);
        res.render('404.ejs');
    }

};
