const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.getContatos();
    res.render('index', {contatos}); // injetando os contatos dentro do index
};