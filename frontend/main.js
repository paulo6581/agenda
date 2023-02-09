import 'core-js-compat/';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Signup from './modules/Signup';

// Validation Login of user - front-end
const login = new Login('.sign-in');
login.init();

// Validation Sign up of user - front-end
const signup = new Signup('.sign-up');
signup.init();



