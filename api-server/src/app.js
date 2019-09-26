'use strict';

/**
 * Third party resources
 * @type {createApplication|createApplication}
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

/**
 * Esoteric resources - error handler middleware
 */
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

/**
 * Routers for category and product
 */
const productRoute = require('../../routes/products');
const categoryRoute = require('../../routes/categories');

/** Preparing express app */
const app = express();

/** App level middleware */
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/products', productRoute);
app.use('/categories', categoryRoute);

/** Catch-alls */
app.use(notFound);
app.use(errorHandler);

/**
 * Exporting server/app
 * @type {{server: *, start: (function(*=): http.Server)}}
 */
module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Server up on port ${port}`) ),
};