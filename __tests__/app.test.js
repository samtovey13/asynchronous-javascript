const request = require('supertest');
const app = require('../src/app');

describe('GET / should respond with a welcome message', () => {
  it('GET / should respond with Welcome to my jokes API!', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Welcome to my jokes API!');
        done();
      });
  });
});

describe('GET /jokes should respond with a message', () => {
  it('GET /jokes should respond with "This is the all jokes endpoint"', done => {
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('This is the all jokes endpoint');
        done();
      });
  });
});

describe('GET /joke/random should respond with a message', () => {
  it('GET /joke/random should respond with "This is the random joke endpoint"', done => {
    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('This is the random joke endpoint');
        done();
      });
  });
});

describe('GET /joke/random/personal/:first/:last should respond with a message', () => {
  it('GET /joke/random/personal/:first/:last should respond with "This is the personalised joke endpoint"', done => {
    request(app)
      .get('/joke/random/personal/:first/:last')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('This is the personalised joke endpoint');
        done();
      });
  });
});
