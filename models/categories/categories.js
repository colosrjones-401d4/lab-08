'use strict';

const Model = require('../mongo.js');
const schema = require('./catergories-schema.js');

// How can we connect ourselves to the mongo interface?
/**
 * Class representing a Category.
 * @extends Model
 */
class Categories extends Model {
  constructor() { super(schema); }
}

module.exports = exports = Categories;
