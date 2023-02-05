// import validator from "validator";
//                     // Login / Register  --> Validação front-end (page Login)
// export default class Login {
//     constructor(formClass) {
//         this.form = document.querySelector(formClass);
//     };

//     init() {
//         this.events();
//     }

//     events() {
//         if (!this.form) return;
//         this.form.addEventListener('submit', e => {
//             e.preventDefault();
//             this.authenticate(e);
//         });
//     }

//     authenticate(e) {
//         const el = e.target;
//         const emailInput = el.querySelector('input[name="email"]');
//         const passwordInput = el.querySelector('input[name="password"]');
//         const counterSingInput = el.querySelector('input[name="countersing"]');

//         let error = false;

//         for(let erroText of this.form.querySelectorAll('.error-text')) {
//             erroText.remove();
//         }

//         for(let field of this.form.querySelectorAll('.input')) {
//             if(!validator.isEmail(emailInput.value)) {
//                 this.erroField(field,'Email invalid');
//                 error = true;
//             }
    
//             if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
//                 this.erroField(field, 'Senha precisa ter entre 3 e 50 caracteres');
//                 error = true;
//             }
    
//             if(counterSingInput.value !== passwordInput.value) {
//                 this.erroField(field, 'As Senhas precisam ser iguais');
//                 error = true;
//             }
    
//             if(!error) el.submit();
//         }
 
//         return error;
//     }

//     erroField(field, msg) {
//         const div = document.createElement('div');
//         div.innerHTML = msg;
//         div.classList.add('error-text');
//         field.insertAdjacentElement('afterend', div);
//     }
// }