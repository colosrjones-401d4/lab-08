'use strict';

const schema = require('./products-schema');

/**
 * Model - Products class
 */
class Products {

  constructor() {
  }

  /**
   * Get product by ID
   * @param _id
   * @returns product data based on ID
   */
  get(_id) {
    let query = _id ? {_id} : {};
    return schema.find(query);
  }

  /**
   * Posts a new product
   * @param record
   * @returns the newly saved product
   */
  post(record) {
    let newRecord = new schema(record);
    return newRecord.save();
  }

  /**
   * Updates a product based on ID
   * @param _id
   * @param record
   * @returns updated product
   */
  put(_id, record) {
    return schema.findByIdAndUpdate(_id, record, {new: true});
  }

  /**
   * Deletes a product based on ID
   * @param _id
   * @returns deleted product
   */
  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }

}

module.exports = Products;