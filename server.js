require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // comando para sumir com o aviso no terminal
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto'); //emitir um evento
    })
    .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
    
app.use(helmet());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// settings Session
const sessionOptions = session({
    secret: 'fpoasdjfposajdfapofj',
    store: new MongoStore({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view  engine', 'ejs');

app.use(csrf());
// Nossos próprios Middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes); 

// O evento 'pronto' é acionado em um subaplicativo.
app.on('pronto', () => {
    // método para o express escutar qualquer coisa que chegar em uma porta
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});

