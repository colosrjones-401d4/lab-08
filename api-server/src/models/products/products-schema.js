'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: Boolean,
});

module.exports = mongoose.model('products ', products);
