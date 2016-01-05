var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var session = require('express-session');
var Handlebars = require('handlebars');
var request = require('request');
Handlebars.registerHelper('eq',function(num1,num2,options){
	if(num1==num2){
		return options.fn(this);
	}
});
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var routes = require('./routes/index');
var MongoStore = require('connect-mongo')(session);
var app = express();
var setting = require('./settings');
var settings = setting(app);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('php',exphbs({
	layoutsDir:'views',
	defaultLayout:'layout',
	extname:".php"
}));
app.set('view engine','php');
app.use(session({
  secret:settings.cookieSecret,
  cookie:{
	  maxAge:1000 * 60 *60 *24 * 30,
	  domain:'.oa.com',
	  path:'/'
  },//30 days
  key:settings.db,
  resave:true,
  store:new MongoStore({
    db:settings.db,
    host:settings.host,
    port:settings.port
  })
}));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
routes(app);
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
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
