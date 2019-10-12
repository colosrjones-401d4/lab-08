'use strict';

const Product = require('./products.schema.js');
/**
 * @param  {} id
 * @param  {} {letrecord;if(id
 * @param  {} {record=Product.findById(id
 * @param  {} ;}else{record=Product.find(
 * @param  {} ;}returnrecord;}post(entry
 * @param  {} {entry.name=entry.name.toUpperCase(
 * @param  {} ;constp=newProduct(entry
 * @param  {} ;returnp.save(
 * @param  {} ;}put(id
 * @param  {} entry
 * @param  {} {entry.name=entry.name.toUpperCase(
 * @param  {} ;constresult=Product.findByIdAndUpdate(id
 * @param  {} entry
 * @param  {true}} {new
 */
class Products {
  get(id) {
    let record;
    if (id) {
      record = Product.findById(id);
    } else {
      record = Product.find();
    }
    return record;
  }

  post(entry) {
    entry.name = entry.name.toUpperCase();
    const p = new Product(entry);
    return p.save();
  }

  put(id, entry) {
    entry.name = entry.name.toUpperCase();
    const result = Product.findByIdAndUpdate(id, entry, { new: true });

    return result;
  }

  delete(id) {
    const result = Product.findOneAndRemove({ id });
    return result;
  }
}

module.exports = Products;