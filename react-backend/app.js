var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

//dev
const swig = require('swig');
const consolidate = require('consolidate');

const models = require('./models');

//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', consolidate.swig);

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


////////////////////////////////////////////////////////
// app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.set('port', (process.env.PORT || 8000));
// const port = app.get('port');
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

models.sequelize.sync({force: false})
  .then(() => {
    const port = app.get('port');
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });

module.exports = app;
