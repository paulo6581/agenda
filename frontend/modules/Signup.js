import validator from "validator";

export default class Signup {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const element = e.target;
        const emailInput = element.querySelector('input[name="email"]');
        const passwordInput = element.querySelector('input[name="password"]');
        const repasswordInput = element.querySelector('input[name="repassword"]');
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'Email inválido');
            error = true;
        }

        if (passwordInput.value !== repasswordInput.value) {
            this.createError(passwordInput, 'Campos senha e repetir senha preicisam ser iguais.');
            error = true;
        }

        if (passwordInput.value.length < 6 || passwordInput.value.length > 50) {
            this.createError(passwordInput, 'Senha precisa ter entre 6 e 50 caracteres.');
            error = true;
        }

        if(!error) element.submit();   
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        field.insertAdjacentElement('afterend', div);
    }
}