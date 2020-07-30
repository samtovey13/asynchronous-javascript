const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
  });
};

const randomController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      console.log(error);
    });
};

const personalisedController = (req, res) => {
  // const firstName = req.params.first;
  // const lastName = req.params.last;
  res.send({
    message: 'This is the personalised joke endpoint',
  });
};

module.exports = { mainController, jokesController, randomController, personalisedController };
