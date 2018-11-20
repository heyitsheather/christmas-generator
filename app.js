require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session");
const flash        = require("connect-flash");
const MongoStore   = require("connect-mongo")(session);
const passport     = require("passport");


mongoose
  .connect('mongodb://localhost/christmas-generator', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// makes our app create sessions (more on this later)
app.use(session({
  resave: true,
  saveUninitialized: true,
  // "secret" should be a string that's different for every app
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));



// default value for title local
app.locals.title = 'Christmas Gift Ideas Generator';

// default value for secondTitle for Elf page
app.locals.secondTitle = 'Help people to finds 3 special Gifts 🎁 and gain 50 cent!';

app.use(flash());
// this function runs before All ypur routes
app.use((req, res, next) => {
  
  //send flash message to the hbs files as "message"
  res.locals.messages = req.flash();
  // send logged in user's info to ALL hbs file as "currentUser"
  // res.locals.currentUser = req.user;

  next();
});

const index = require('./routes/index');
app.use('/', index);

// const requestRouter = require('./routes/request-router');
// app.use('/', requestRouter);

const elfRouter = require('./routes/elf-router');
app.use('/', elfRouter);


module.exports = app;
