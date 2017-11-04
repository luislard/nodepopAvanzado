var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// conexion a la bbdd
require('./lib/connectMongoose');
require('./models/Advertisement');
require('./models/Tag');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

// console.log(i18n.__('HELLO'));
// console.log(i18n.__({phrase: 'HELLO', locale: 'es'})); //fuerza a usar el locale es

// console.log(i18n.__('HOME.TITLE'));

// console.log(__('The name is name and the age is age'));
// console.log(i18n.__('The name is name and the age is age', {
//   name: 'Luis', age: 32
// }));

// console.log(i18n.__n('Mouse', 1));
// console.log(i18n.__n('Mouse', 2));

// usamos las rutas de un controlador
var loginController = require('./routes/loginController');

// app.get( '/api/authenticate',  loginController.index);
// app.post('/login',  loginController.post);
app.post('/api/authenticate',  loginController.postLoginJWT);
app.get( '/logout', loginController.logout);

/**
 * lista de routers
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api/anuncios', require('./routes/apiv1/advertisements'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ?
      { message: 'Not valid', errors: err.mapped()}
      : `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es una petición al API respondo JSON...
  if (isAPI(req)){
    res.json({success: false, error: err.message});
    return;
  }

  // y si no respondo con HTML
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
