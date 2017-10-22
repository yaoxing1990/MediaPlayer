var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var multer = require('multer');
var fs = require('fs');
var DIR = './upload/';
var upload = multer({dest: DIR});

var appRoutes = require('./routes/app');
var uploadRoutes = require('./routes/upload');

var app = express();

const busboyBodyParser = require('busboy-body-parser');


//mongoose.connect('localhost:27017/media');
mongoose.connect('mongodb://yaoxing1990:1pf3h6tfg@ds039010.mlab.com:39010/angular2-deployment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', ['POST', 'GET']);
    res.setHeader('Access-Control-Allow-Headers', '*');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(busboyBodyParser({ limit: '1000mb' }));

app.use(multer({
    dest: DIR,
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
}), function (req, res, next) {
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/upload', uploadRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
