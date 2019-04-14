const express = require('express');

const app = express();

// ADD START
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { log } = require('../util/log');
const index = require('./routes/index');


// ADD END
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.use(express.static(`${__dirname}/public`));


app.use(cors());
// ADD USE START
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  // store: sessionStore,
  secret: 'webfunc',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
}));
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  log.info('not found');
  next(new Error(`${req.originalUrl} not found`));
});

// error handler
app.use((err, req, res, next) => {
  log.error('Route ErrorrHandler:', err);
  const localerr = err;
  log.info('ErrorRequest:',
    req.method,
    req.originalUrl,
    JSON.stringify(req.body));
  const httpstatus = localerr.code || 500;
  res.status(httpstatus).send(localerr);
  next();
});

module.exports = app;
