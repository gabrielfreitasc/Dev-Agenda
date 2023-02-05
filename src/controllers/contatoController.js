const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {} // evitar bug de contato q n da pra cadastra, por causa do edit
    })
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register();
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
          }
    
        req.flash('success', 'Contato registrado com Sucesso!');
        req.session.save(function(){
            return res.redirect(`/contato/${contato.contato._id}`);
         });
        return;
    } catch (err) {
        console.log(err);
        return res.render('404');
    }
}

// Static Function

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.getID(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato', {contato});
};

exports.edit = async function(req, res) {

    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
          }
    
        req.flash('success', 'Contato editado com Sucesso!');
        req.session.save(function(){
            return res.redirect(`/contato/${contato.contato._id}`);
         });
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
 };

 exports.delete = async function (req, res) {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('404');

    req.flash('success', 'Contato deletado com Sucesso!');
    req.session.save(function(){
        return res.redirect(`/`);
    }
)};