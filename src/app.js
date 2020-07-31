const express = require('express');
const { jokesController, randomController, personalisedController } = require('./controllers');

const app = express();
app.use(express.static('public'));

app.get('/jokes', jokesController);
app.get('/joke/random', randomController);
app.get('/joke/random/personal/:first/:last', personalisedController);

module.exports = app;
