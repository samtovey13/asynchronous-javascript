const request = require('request');
const axios = require('axios');

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      const parsedResponse = JSON.parse(jokesApiResponse.body);
      res.send({ jokes: parsedResponse.value });
    }
  });
};

const randomController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      res.status(error.statusCode).send({ error: error.message });
    });
};

const personalisedController = async (req, res) => {
  const { first, last } = req.params;
  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );
    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    res.status(error.statusCode).send({ error: error.message });
  }
};

module.exports = { jokesController, randomController, personalisedController };
