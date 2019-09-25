'use strict';

class Model {

 
  constructor() {
    this.data = {};
     /*
      {
        1: {name:'john'},
        2: {name:'lena'},
        3: {name:'caity'}
      }
     */
  }

  get(_id) {
    if (_id) {
      return this.data.findOne({_id: _id});
    } else {
      return this.data.find({});
    }
  }

  create(record) {
    let newRecord = new this.data(record);
    return newRecord.save();
  }

  
  update(_id, record) {
    return this.data.findByIdAndUpdate(_id, record, {new: true});
  }

  delete(_id) {
    return this.data.findByIdAndDelete(_id);
  }

}

module.exports = Model;