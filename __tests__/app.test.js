/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('GET / homepage', () => {
  it('GET / should respond with the homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Hello, welcome to my jokes API');
        done();
      });
  });
});

describe('GET /jokes', () => {
  it('GET /jokes should respond with a list of all jokes', done => {
    const mockResponse = {
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
    };

    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual([
          {
            categories: [],
            id: 1,
            joke: 'i am a joke',
          },
          {
            categories: [],
            id: 2,
            joke: 'i am another joke',
          },
        ]);
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET /joke/random', () => {
  it('GET /joke/random should respond with a random joke object', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual({
          categories: [],
          id: 115,
          joke: 'i am a random joke',
        });
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 500, message: 'huge error' });
    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET /joke/random/personal/:first/:last', () => {
  it('GET /joke/random/personal/:first/:last should respond with a personalised joke', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 402,
        joke: 'Random joke about Manchester Codes.',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Manchester', lastName: 'Codes' })
      .reply(200, mockResponse);

    request(app)
      .get('/joke/random/personal/Manchester/Codes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual({
          id: 402,
          joke: 'Random joke about Manchester Codes.',
          categories: [],
        });
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Manchester', lastName: 'Codes' })
      .replyWithError({ statusCode: 500, message: 'huge error' });
    request(app)
      .get('/joke/random/personal/Manchester/Codes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
      });
  });
});
