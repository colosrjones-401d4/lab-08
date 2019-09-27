'use strict';

const uuid = require('uuid');

const schema = {
  id: {required: true},
  name: {required: true},
  displayname: {required: true},
  description: {required: true},
};

class Categories {

  constructor() {
    this.database = [];
  }

  get(_id) {
    
  }
  
  post(record) {
  }

  put(_id, record) {
  }

  delete(_id) {
  }

}

module.exports = Categories;