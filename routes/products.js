'use strict';

const express = require('express');

const router = express.Router();

// Models
const Products = require('product.js');
const products = new Products();

/** H'Liana - defining routes and callbacks */
router.get('/', getProducts);
router.post('/', postProducts);
router.get('/:id', getProduct);
router.put('/:id', putProducts);
router.delete('/:id', deleteProducts);

/**
 * getProducts function - outputs data and count (all products)
 * @param request
 * @param response
 * @param next
 */
function getProducts(request,response,next) {
  // expects an array of objects back
  products.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

/**
 * Gets one product by ID and outputs the data
 * @param request
 * @param response
 * @param next
 */
function getProduct(request,response,next) {
  // expects an array with one object in it
  products.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * Posts (adds) new product
 * @param request
 * @param response
 * @param next
 */
function postProducts(request,response,next) {
  // expects the record that was just added to the database
  products.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function putProducts(request,response,next) {
  // expects the record that was just updated in the database
  products.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * Deletes a product by ID
 * @param request
 * @param response
 * @param next
 */
function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  products.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;