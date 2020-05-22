var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    User = require('./models/user'),
    passportConfig = require('./config/passport');


const app = express();
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'fzgsvsdbqd',
    resave: false,
    saveUninitialized: true
}));


var indexRoutes = require('./config/routes/index');
app.use('/', indexRoutes)

mongoose.set('useCreateIndex', true);

// Connect to DB
mongoose.connect('"mongodb://localhost/loginapp', { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    console.log('Vous êtes connecté')
});


app.listen(3000);