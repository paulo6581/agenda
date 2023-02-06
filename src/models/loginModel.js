const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// Tudo no Mongoose começa com um Schema. Cada esquema é mapeado para uma coleção do MongoDB e define a forma dos documentos dentro dessa coleção.
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// creating the Model
const LoginModel = mongoose.model('Login', LoginSchema);

// Validate the data
class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.validates();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email});

        // check if the user Doesn't exists
        if (!this.user) {
            this.errors.push('Usuário NÃO existe!');
            return;
        }

        // Login - compare Password with Hash
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register() {
        this.validates();
        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync(); 
        // generating a hash  based in the salt
        this.body.password = bcryptjs.hashSync(this.body.password, salt); 
   
        this.user = await LoginModel.create(this.body);
    }

    // Checks if the User already exists
    async userExists() {
        this.user = await LoginModel.findOne({email: this.body.email});
        if (this.user) this.errors.push('Usuário já EXISTE!');
    }

    validates() {
        this.cleanUp();
        // validation - the email must be valid
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        // validdation - the password must be between 3 and 50
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;