'use strict';

const Products = require('../products.js');
const products = new Products();
const { word } = require('faker').lorem;

const supergoose = require('./supergoose');
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('`Products` class', () => {
  describe('`post` method', () => {
    it('add a record to the database and return what was posted', () => {
      const record = { name: word() };
      const posted = products.post(record);
      return posted.then(n => {
        expect(n.name).toBe(record.name.toUpperCase());
      });
    });
  });
  describe('`get` method', () => {
    it('should return a record if given a valid `id`', () => {
      const record = { name: word() };
      const posted = products.post(record);
      return posted.then(p => {
        const { id } = p;
        const got = products.get(id);

        return got.then(g => {
          expect(g.name).toBe(record.name.toUpperCase());
        });
      });
    });
    it('should return an array if given an invalid `id`', () => {
      const fakeID = 0;
      const got = products.get(fakeID);
      return got.then(g => {
        expect(Array.isArray(g)).toBeTruthy();
      });
    });

    it('should return an array if not given an argument', () => {
      const got = products.get();
      return got.then(g => {
        expect(Array.isArray(g)).toBeTruthy();
      });
    });
  });
  describe('`put` method', () => {
    it('should return a modified record if given a valid `id` and `record`', () => {
      const record = { name: word() };
      const modified = { name: word() };

      const posted = products.post(record);
      return posted.then(p => {
        const { id } = p;
        const put = products.put(id, modified);
        return put.then(u => {
          expect(u.name).toBe(modified.name.toUpperCase());
          expect(u.name).not.toBe(record.name.toUpperCase());
        });
      });
    });
    xit('should return an empty object if given an invalid `id`', () => {
      const record = { name: word() };
      const modified = { name: word() };

      products.post(record);
      const fakeId = 0;
      const put = products.put(fakeId, modified);
      return put
        .then(u => {
          expect(u).not.toEqual(expect.objectContaining(record));
        })
        .catch(console.error);
    });
  });
  xdescribe('`delete` method', () => {
    xit('should return the element with the given `id`', () => {
      const record = { name: word() };
      const { id } = products.post(record);
      const validated = { name: record.name.toUpperCase() };
      expect(products.delete(id)).toEqual(expect.objectContaining(validated));
    });
    xit('should remove the element with the given `id` from the database', () => {
      const record = { name: word() };
      products.post(record);
      const { id } = products.get().find(r => r.name === record.name);
      products.delete(id);
      const db = products.get();
      expect(db.find(record => record.id === id)).toBeFalsy();
    });
    xit('should return an empty object if given an invalid `id`', () => {
      const fakeId = 0;
      expect(products.delete(fakeId)).toEqual({});
    });
  });
});