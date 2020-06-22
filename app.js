'use strict';

const createError = require('http-errors');
const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const indexRouter = require('./controllers/routes');
const meetingRouter = require('./controllers/routes/meeting');

app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/reunion', meetingRouter);

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

module.exports = app;
