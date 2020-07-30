const express = require('express');
const {
  mainController,
  jokesController,
  randomController,
  personalisedController,
} = require('./controllers');

const app = express();

app.get('/', mainController);
app.get('/jokes', jokesController);
app.get('/joke/random', randomController);
app.get('/joke/random/personal/:first/:last', personalisedController);

module.exports = app;
