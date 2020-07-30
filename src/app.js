const express = require('express');
const {
  mainController,
  allController,
  randomController,
  personalisedController,
} = require('./controllers');

const app = express();

app.get('/', mainController);
app.get('/jokes', allController);
app.get('/joke/random', randomController);
app.get('/joke/random/personal/:first/:last', personalisedController);

module.exports = app;
