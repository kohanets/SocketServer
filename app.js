

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var config = require('./config/config');

var routes = require('./routes/index');
var secureRoutes = require('./routes/secureRoutes');

var app = express();



config.setConfig();

mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/secure-api', secureRoutes)


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
