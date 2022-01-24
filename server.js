require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mainRouter = require('./routes/mainRouter');
const errorPage = require('./routes/error');
const session = require('express-session');
const passport = require('passport');

require('./models/db');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}))


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(mainRouter);
app.use(errorPage);
const port = 5000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`);
});