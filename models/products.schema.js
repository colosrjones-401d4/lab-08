'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  name: { required: true, type: String, uppercase: true },
});

module.exports = mongoose.model('products', products);