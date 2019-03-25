let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let token = require('./util/token');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let apiRouter = require('./routes/api');

let app = express();

app.all('/api/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.header("Access-Control-Allow-Origin", "http://devilcx.com:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Auth-Token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 验证登录token
app.use((req, res, next) => {
  let tokenStr = req.get('Auth-Token'),
    verifyRes = token.verifyToken(tokenStr),
    needToken = token.needToken(req.url);

  if (req.method === 'OPTIONS' || verifyRes.result || !needToken) return next();
  // 登录过期
  res.status(401).json({
    msg: '登录过期，请重新登录',
    result: false
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
