const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, default: '' },
    number: { type: String, required: false, default: ''},
    work: { type: String, required: false, default: ''},
    createIn: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
};

Contato.prototype.register = async function() { // Retornar Promise (contatoController exports.register precisa ser async/await tbm)
    this.authenticate();

    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body); // quando o contato for criado, ele vais er inserido na chave "contato" q antes era null
};

Contato.prototype.authenticate = function() {
    this.cleanUp();

    if(this.body.email && !validator.isEmail(this.body.email)) {
        this.errors.push('E-mail Inválido!')
    };

    if(!this.body.name) {
        this.errors.push('Nome Completo é um campo obrigatório!')
    }

    if(!this.body.email && !this.body.number) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone')
    }
};

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        number: this.body.number,
        email: this.body.email,
        work: this.body.work
    };
};

Contato.prototype.edit = async function(id) {
    if(typeof id !== "string") return;
    // Vai validar novamente os inputs
    this.authenticate();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true}); // Quando o contato for modificado, enviar o body atualizado e não os antigos, jogando os dados atlz no contato
}

// Métodos Estáticos

Contato.getID = async function (id) { // Não está atrelado ao prototype, por isso não precisa estancia-la (age como static function)
    if(typeof id !== 'string') return;
    const contatos = await ContatoModel.findById(id); 
    return contatos;
}

Contato.getContatos = async function() {
    const contatos = await ContatoModel.find()
        .sort({createIn: -1 }); // vai buscar os contatos em ordem decrescente
    return contatos;
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
}

module.exports = Contato;