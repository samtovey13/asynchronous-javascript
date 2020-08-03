module.exports = {
  mockResponseAllJokes: {
    type: 'success',
    value: [
      {
        id: 1,
        joke: 'i am a joke',
        categories: [],
      },
      {
        id: 2,
        joke: 'i am another joke',
        categories: [],
      },
    ],
  },
  mockResponseRandom: {
    type: 'success',
    value: {
      id: 115,
      joke: 'i am a random joke',
      categories: [],
    },
  },
  mockResponsePersonal: {
    type: 'success',
    value: {
      id: 402,
      joke: 'Random joke about Manchester Codes.',
      categories: [],
    },
  },
};
