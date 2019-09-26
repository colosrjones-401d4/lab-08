'use strict';

const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const supertest = require('supertest');
const {server} = require('../src/app.js');
const mockRequest = supergoose.server(server);
const mockClient = supertest(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('API server app.js tests', () => {

  it('should be able to post', ()  => {

    let test = {name: 'test'};

    return mockRequest
      .post('/products')
      .send(test)
      .then(result => {
        expect(result.status).toBe(200);
        expect(result.body.name).toEqual(test.name.toUpperCase());
      });

  });


  it('following a post to a valid model, should find a single record', () => {

    let test = {name: 'test'};

    return mockRequest
      .post('/products')
      .send(test)
      .then(result => {
        return mockRequest.get(`/products/${result.body._id}`)
          .then(product => {
            expect(product.status).toBe(200);
            expect(product.body.name).toEqual(test.name.toUpperCase());
          });
      });

  });

  it('should be able to update a record', () => {

    let test = {name: 'test'};
    let updatedTest = {name: 'update'};

    return mockRequest
      .post('/products')
      .send(test)
      .then(result => {
        return mockRequest.put(`/products/${result.body._id}`)
          .send(updatedTest)
          .then(updated => {
            expect(updated.status).toEqual(200);
            expect(updated.body.name).toEqual(updatedTest.name);
          })
      })
  });

  it('should be able to delete a record', () => {

    let test = {name: 'test'};

    return mockRequest
      .post('/products')
      .send(test)
      .then(result => {
        return mockRequest.del(`/products/${result.body._id}`)
          .then(product => {
            expect(product.status).toBe(200);
          })
      });

  });

  it('should respond with 200 on a good route', () => {
    return mockClient.get('/products')
      .then(result => {
        expect(result.status).toEqual(200);
      })
  });

  it('should respond with 404 on an unknown route', () => {
    return mockClient.get('/hello')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  });

});