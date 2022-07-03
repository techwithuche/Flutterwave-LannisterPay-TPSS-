'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const hpp = require('hpp');
const httpStatus = require('http-status');
const Helper = require('./helpers/response')
const app = express();
const mongoose = require('./database/mongoose');



app.use(
  bodyParser.json({

    limit: '50mb',
  }),
);


app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }),
);


app.use(hpp());

app.use(
  cookieSession({
    name: 'session',
    keys: ['SECRECTKEY'],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);
app.use(cookieParser());




// CORS setup for dev
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
  next();
});


const routes = require('./api');

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  if (err.status === 404) {
    return Helper.sendResponse(res, httpStatus.NOT_FOUND, false, null, err, 'Route Not Found', null);
  } else {
    console.log('\x1b[41m', err);
    let path = req.baseUrl + req.route && req.route.path;
    if (path.substr(path.length - 1) === '/') {
      path = path.slice(0, path.length - 1);
    }
    err.method = req.method;
    err.path = req.path;
    AddErrorToLogs(req, res, next, err);
    return Helper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, null, err, null, null);
  }
});

module.exports = app;