'use strict';

const uuid = require('uuid/v4');
const schema = {
  _id: { required: true, type: 'string' },
  name: { required: true, type: 'string', uppercase: true },
};
/**
 * @param  {} {this.db=[];}get(_id
 * @param  {} {constrecord=_id?this.db.filter(record=>record._id===_id
 * @param  {} post(record} [0]
 */
class Categories {
  constructor() {
    this.db = [];
  }

  get(_id) {
    const record = _id ? this.db.filter(record => record._id === _id)[0] : this.db;
    return record;
  }

  post(record) {
    record._id = uuid();
    this.db.push(record);
    return record;
  }

  put(_id, record) {
    const index = this.db.findIndex(record => record._id === _id);
    if (index >= 0) {
      const oldRecord = this.db[index];
      const newRecord = { ...oldRecord, ...record };
      this.db.splice(index, 1, newRecord);
      return newRecord;
    }
    return {};
  }

  delete(_id) {
    const index = this.db.findIndex(record => record._id === _id);
    if (index >= 0) {
      const record = this.db[index];
      this.db.splice(index, 1);
      return record;
    }
    return {};
  }

  validate(entry) {
    return !Object.keys(schema)
      .map(key => {
        // This is not dynamic and won't adjust to most changes
        // in our schema, unfortunately. Also, mongoose uses the
        // String constructor, but 'str' instanceof String -> false.
        if (entry[key] && typeof entry[key] === 'string') {
          return true;
        }
        return false;
      })
      .includes(false);
  }
}

module.exports = Categories;