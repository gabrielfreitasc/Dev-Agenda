const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    countersing: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async logOn() {
        this.authenticateLogin();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user) {
            this.errors.push('Email e/ou senha inválido(s)');
            return;
        }
        // validação da senha do user com o bcrypti
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {// checagem da senha passada no body com a que esta amarzenada no hash
            this.errors.push('Email e/ou senha invalido(s)');
            this.user = null;
            return;
        }
    }

    async register() {
        this.authenticateRegister();
        if(this.errors.length > 0) return; // aq não vai registrar o usuário caso tenha errors

        await this.emailExist();

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt); //criptografando a senha
        this.body.countersing = bcryptjs.hashSync(this.body.countersing, salt); //criptografando contra-senha
        this.user = await LoginModel.create(this.body); // modo de salvar o usuario de fora 
    }

    async emailExist() {
       this.user = await LoginModel.findOne({email: this.body.email}); // Verificando dentro da DB a existencia de um mesmo email que o passado no form (Return email || null)
       if(this.user) {
        this.errors.push('Email já existe!')
       }
    }

    authenticateRegister() {
        this.cleanUpRegister();
        // validação dos campos
            // email valido
            if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

            // senha entre 5 a 50 caracteres
        if(this.body.password.length < 5 || this.body.password.length > 50) {
            this.errors.push('A Senha precisa ter entre 5 a 50 caracteres!');
        }
            // contra-senha precisa ser a mesma da senha
        if(this.body.countersing !== this.body.password) {
            this.errors.push('As senhas precisam ser iguais!');
        }
    }

    authenticateLogin() {
        this.cleanUpLogin();
        // validação dos campos
            // email valido
            if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

            // senha entre 5 a 50 caracteres
        if(this.body.password.length < 5 || this.body.password.length > 50) {
            this.errors.push('A Senha precisa ter entre 5 a 50 caracteres!');
        }
    }


    cleanUpRegister() { // vai garantir que tudo que tem no body é uma string
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
              this.body[key] = '';
            }
          }

        this.body = {
            email: this.body.email,
            password: this.body.password,
            countersing: this.body.countersing
        };
    }

    cleanUpLogin() { // vai garantir que tudo que tem no body é uma string
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
              this.body[key] = '';
            }
          }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;