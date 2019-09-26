'use strict';

const Products = require('../src/models/products.js');
const products = new Products();

const supergoose = require('./supergoose');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Products model test', () => {
  it('can post() a new product', () => {
    let test = {name: 'Test'};
    return products.post(test)
      .then(record => {
        Object.keys(test).forEach(key => {
          expect(record[key]).toEqual(test[key].toUpperCase());
        })
      })
  });

  it('can get() a product', () => {
    let test = {name: 'Test'};
    return products.post(test)
      .then(record => {
        return products.get(record.id)
          .then(product => {
            Object.keys(test).forEach(key => {
              expect(record[key]).toEqual(test[key].toUpperCase());
            })
          })
      })
  });

  it('can update a product', () => {
    let test = {name: 'Test'};
    let newTest = {name: 'New'};
    return products.post(test)
      .then(record => {
        return products.put(record.id, newTest)
          .then(updatedProduct => {
            expect(updatedProduct.name).toEqual(newTest.name);
          })
      })
  });

});