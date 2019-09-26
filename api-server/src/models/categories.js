'use strict';

const uuid = require('uuid/v4');

/**
 * Schema defined for categories; the assignment was to implement categories without Mongoose
 * @type {{name: {required: boolean}, id: {required: boolean}}}
 */
const schema = {
  id: {required: true},
  name: {required: true}
};

/**
 * Class - categories model
 */
class Categories {

  /**
   * Constructor - included an array that acted as a database
   */
  constructor() {
    this.database = [];
  }

  /**
   * Gets a category based on ID
   * @param id
   * @returns the data of the requested category
   */
  get(id) {
    let response = id ? this.database.filter(record => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   * Posts a new category, pushes to database
   * @param entry
   * @returns newly created category
   */
  post(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * Updates existing category by ID
   * @param id
   * @param entry
   * @returns updated data
   */
  put(id, entry) {
    entry.id = id;
    let record = this.sanitize(entry);

    if (record.id) { this.database = this.database.map(item => item.id === id ? record : item); }
    return Promise.resolve(record);
  }

  /**
   * Deletes existing category by ID
   * @param id
   * @returns Promise - deletes entry
   */
  delete(id) {
    this.database = this.database.filter(record => record.id !== id);
    return Promise.resolve();
  }

  /**
   * Cleans up entries that are being either posted or updated.
   * Makes sure that valid & required data has been provided.
   * @param entry
   * @returns the data (if it is valid), or 'undefined' (if it is not valid)
   */
  sanitize(entry) {
    let isValid = true;
    let record = {};

    Object.keys(schema).forEach(field => {
      if (schema[field].required){
        if (entry[field]){
          record[field] = entry[field];
        } else {
          isValid = false;
        }
      } else {
        record[field] = entry[field];
      }
    });
    return isValid ? record : undefined;
  }

}

module.exports = Categories;