'use strict';

const Categories = require('../catergories');
const categories = new Categories();
const { word } = require('faker').lorem;

describe('`Categories` class', () => {
  describe('`post` method', () => {
    it('add a record to the database and return what was posted', () => {
      const record = { name: word() };
      expect(categories.post(record).name).toBe(record.name);
    });
  });
  describe('`get` method', () => {
    it('should return a record if given a valid `_id`', () => {
      const record = { name: word() };
      const { _id } = categories.post(record);
      expect(categories.get(_id).name).toBe(record.name);
    });
    it('should return an array if given an invalid `_id`', () => {
      const record = { name: word() };
      categories.post(record);
      const fakeId = 0;
      expect(Array.isArray(categories.get(fakeId))).toBeTruthy();
    });
    it('should return an array if not given an argument', () => {
      expect(Array.isArray(categories.get())).toBeTruthy();
    });
  });
  describe('`put` method', () => {
    it('should return a modified record if given a valid `_id` and `record`', () => {
      const record = { name: word() };
      const modified = { name: word() };
      categories.post(record);
      const { _id } = categories.get()[0];
      expect(categories.put(_id, modified)).toEqual(expect.objectContaining(modified));
      expect(categories.put(_id, modified)).not.toEqual(expect.objectContaining(record));
    });
    it('should return an empty object if given an invalid `_id`', () => {
      const record = { name: word() };
      const modified = { name: word() };
      categories.post(record);
      const fakeId = 0;
      expect(categories.put(fakeId, modified)).not.toEqual(expect.objectContaining(record));
    });
  });
  describe('`delete` method', () => {
    xit('should return the element with the given `_id`', () => {
      const record = { name: word() };
      categories.post(record);
      const { _id } = categories.get().find(r => r.name === record.name);
      const deleted = categories.delete(_id);
      expect(deleted).toEqual(expect.objectContaining(record));
    });
    it('should remove the element with the given `_id` from the database', () => {
      const record = { name: word() };
      categories.post(record);
      const { _id } = categories.get().find(r => r.name === record.name);
      categories.delete(_id);
      const db = categories.get();
      expect(db.find(record => record._id === _id)).toBeFalsy();
    });
    it('should return an empty object if given an invalid `_id`', () => {
      const fakeId = 0;
      expect(categories.delete(fakeId)).toEqual({});
    });
  });
  describe('`validate` method', () => {
    it('should return `false` if an entry does not match the schema', () => {
      const bad = { _id: 0, name: undefined };
      expect(categories.validate(bad)).toBeFalsy();
    });
    it('should return `true` if an entry does match the schema', () => {
      const good = { _id: word(), name: word() };
      expect(categories.validate(good)).toBeTruthy();
    });
  });
});