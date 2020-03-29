'use strict';
const express = require('express');
const app = express();
const env = require('dotenv').config();
const curDateTimeUTC = require('./myLib');
const interval = env.parsed.interval;
const timeout = env.parsed.timeout;

app.get('/', function (req, res) {
  const intervalId = setInterval(() => {
    console.log(curDateTimeUTC());
  }, interval);

  setTimeout(() => {
    clearInterval(intervalId);
    res.send(curDateTimeUTC());
  }, timeout);
});

app.listen(3000);
