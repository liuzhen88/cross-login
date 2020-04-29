var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// var corsOptions = {
//   origin: 'http://www.innok-lpsk.com',
//   credentials: true,
//   maxAge: '1728000'
//   //这一项是为了跨域专门设置的
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.all('*', function(req, res, next) {
//        res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
//        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//       res.header("Access-Control-Allow-Credentials",true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
//      next();
//   });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/token', (req, res, next) => {

  res.cookie('user',1,{ 
    expires: new Date(Date.now() + 1000000000), 
    httpOnly: false, 
    sameSite: 'None', 
    secure: true ,
    domain: 'www.bbscmyk.com'
  });
  // res.setHeader('Set-Cookie', serialize('isVisit', '1'));


  res.jsonp('success');
})









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('------err---------')
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(9988, () => console.log('server start at port 9988'))

module.exports = app;
