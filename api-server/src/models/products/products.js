'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');

// How can we connect ourselves to the mongo interface?
/**
 * Class representing a Category.
 * @extends Model
 */
class Products extends Model {
  constructor() { super(schema); }
}
// What do we export?
module.exports = exports = Products;