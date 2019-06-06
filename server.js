var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    User = require('./models/user');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


var indexRoutes = require('./config/routes/index');

// Connect to DB
mongoose.connect('"mongodb://localhost/loginapp', { useNewUrlParser: true });
var db = mongoose.connection;

app.use('/', indexRoutes)

app.listen(3000);