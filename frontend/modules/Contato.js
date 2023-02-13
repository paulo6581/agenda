import validator from "validator";

export default class Contato {
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
        const telefoneInput = element.querySelector('input[name="telefone"]');
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            this.createError(emailInput, 'Email inválido.');
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