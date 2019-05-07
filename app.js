//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//validation
var expressValidator = require('express-validator');
var expressSession = require('express-session');
//template engine
var hbs = require('express-handlebars');

//contains routes to index
var indexRouter = require('./routes/index');

//start up express
var app = express();

// view engine setup
//html templating and where html files belong
//template thing
//https://www.youtube.com/watch?v=1srD3Mdvf50 refer to this video
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); //change from jade
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//secret = key? saveUnitalized: false = store to session storage only when initalized ;resave only saves if we change something; 
app.use(expressSession({secret: 'max', saveUnitialized: false, resave: false}));
 



// in the routes/index file it contains the routes of our files
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
 