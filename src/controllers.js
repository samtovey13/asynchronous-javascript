const request = require('request');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const allController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint',
  });
};

const randomController = (req, res) => {
  res.send({
    message: 'This is the random joke endpoint',
  });
};

const personalisedController = (req, res) => {
  // const firstName = req.params.first;
  // const lastName = req.params.last;
  res.send({
    message: 'This is the personalised joke endpoint',
  });
};

module.exports = { mainController, allController, randomController, personalisedController };
