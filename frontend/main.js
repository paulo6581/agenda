import 'core-js-compat/';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Signup from './modules/Signup';
import Contato from './modules/Contato';

// Validation Login of user - front-end
const login = new Login('.sign-in');
login.init();

// Validation Sign up of user - front-end
const signup = new Signup('.sign-up');
signup.init();

// Validation form Contato of the user - front-end
const contato = new Contato('.contato');
contato.init();