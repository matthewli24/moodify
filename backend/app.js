const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const models = require('./models');
const helmet = require('helmet');

//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth-routes');
const spotifyRouter = require('./routes/spotify-routes');

//passport config
const passportSetup = require('./config/passport-setup');

//dev
const swig = require('swig');
const consolidate = require('consolidate');

const app = express();

//dev: view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', consolidate.swig);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use(session({ 
  secret: 'keyboard cat',
  name: 'sessID',
  secure: true,
  httpOnly: true, 
  resave: false, 
  saveUninitialized: false }
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/spotify', spotifyRouter);

//cors bypass
const FRONTENDURL = 'http://localhost:3000';
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTENDURL);
  res.header('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With',
   'Content-Type', 'Accept', 'Authorization');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', (process.env.PORT || 8000));

models.sequelize.sync({ force: false })
  .then(() => {
    const port = app.get('port');
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });

module.exports = app;
