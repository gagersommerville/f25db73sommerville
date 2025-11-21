require('dotenv').config();
const connectionString = process.env.MONGO_CON;

mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(connectionString);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", function(){
    console.log("Connection to DB succeeded")
});

const Mountain = require("./models/mountain");

// Seed DB once
async function recreateDB(){
  await Mountain.deleteMany();

  const instance1 = new Mountain({
    name: 'Everest',
    height: 29032,
    range: 'Himalayas'
  });

  const instance2 = new Mountain({
    name: 'Denali',
    height: 20310,
    range: 'Alaska Range'
  });

  const instance3 = new Mountain({
    name: 'Fuji',
    height: 12389,
    range: 'Fuji Volcanic'
  });

  await instance1.save();
  await instance2.save();
  await instance3.save();

  console.log('Sample mountains saved');
}

let reseed = true; 
if (reseed) {
  recreateDB().catch(err => console.error(err));
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mountainsRouter = require('./routes/mountains');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var Account = require('./models/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mountains', mountainsRouter);
app.use('/gridbuild', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
    .then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      user.authenticate(password, function(err, result) {
        if (err) { return done(err); }
        if (!result.user) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, result.user);
      });
    })
    .catch(function(err) {
      return done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, user) {
    done(err, user);
  });
});

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

module.exports = app;
