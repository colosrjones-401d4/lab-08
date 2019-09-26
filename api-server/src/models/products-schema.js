'use strict';

const mongoose = require('mongoose');

/**
 * Schema used for products model
 */
const products = mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('products ', products);
