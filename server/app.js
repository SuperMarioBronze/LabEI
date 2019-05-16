var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');*/
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var fs = require('fs');

//Database
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "db4free.net",
  user: "basededadosteste",
  password: "12345678",
  database: "basededadosteste"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Make our db accessible to our router
app.use(function(req,res,next){
  req.con = con;
  next();
});

app.use('/', routes);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




//Line by line reader
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('../Sofia/results/SINK_8');

lr.on('error', function (err) {
	// 'err' contains error object
});


var i=0;
var json = [];
lr.on('line', function (line) {
  // 'line' contains the current line without the trailing newline character.
  var array = [];
  array[0]=line.split(' ');
  array[0]=line.split('#')
  array[0].splice(-1,1);
  json[i]=JSON.stringify(array[0])
  console.log(json[i]);
  console.log('!!!!!!!!!!!!!!')
  fs.writeFile("test.txt", json[i], function(err) {
    if (err) {
        console.log(err);
    }
});
  i++;
});


lr.on('end', function () {
	// All lines are read, file is closed now.
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
