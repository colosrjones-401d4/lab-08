'use strict';

const Categories = require('../src/models/categories');

describe('Categories model', () => {
  it('can post() a new category', () => {
    const category = new Categories();
    let testObj = {name: 'Test'};

    return category.post(testObj)
      .then(record => {
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });

        expect(category.database.length).toEqual(1);
        expect(category.database).toBeTruthy();
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    const category = new Categories();
    let testObj = {name: 'Test'};

    return category.post(testObj)
      .then(record => {
        return category.get(record.id)
          .then(cat => {
            Object.keys(testObj).forEach(key => {
              expect(cat[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can update a category', () => {
    const category = new Categories();
    let testObj = {name: 'Test'};

    let updatedEntry = {name: 'Updated'};
    return category.post(testObj)
      .then(record => {
        return category.put(record.id, updatedEntry)
          .then(updated => {
            Object.keys(updatedEntry).forEach(key => {
              expect(updated[key]).toEqual(updatedEntry[key]);
            });
          })
      })
  });

  it('can delete a category', () => {
    const category = new Categories();
    let testObj = {name: 'Test'};

    return category.post(testObj)
      .then(record => {
        return category.delete(record.id)
          .then(cat => {
            expect(cat).toBeUndefined();
            expect(category.database.length).toEqual(0);
            })
          })
      });

});