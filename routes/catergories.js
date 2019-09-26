'use strict';

const express = require('express');

const router = express.Router();

// Models
const Categories = require('../src/models/categories.js');
const categories = new Categories();

/**
 * Routes
 */
router.get('/', getCategories);
router.post('/', postCategories);
router.get('/:id', getCategory);
router.put('/:id', putCategories);
router.delete('/:id', deleteCategories);

/**
 * Route handler - getCategories - retrieves array of objects to be returned from model
 * @param request
 * @param response
 * @param next
 */
function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  categories.get()
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
 * gets individual category based on ID - sends that information to browser
 * @param request
 * @param response
 * @param next
 */
function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * posts a new category, and returns that data
 * @param request
 * @param response
 * @param next
 */
function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.post(request.body)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * updates an existing category based on ID
 * @param request
 * @param response
 * @param next
 */
function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * Deletes an existing category based on ID
 * @param request
 * @param response
 * @param next
 */
function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;