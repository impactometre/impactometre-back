'use strict';

const path = require('path');

const express = require('express');
const logger = require('morgan');

const app = express();

const apiRouter = require('./controllers/routes/api');
// const indexRouter = require('./controllers/routes');
// const meetingRouter = require('./controllers/routes/meeting');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

module.exports = app;
