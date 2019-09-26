'use strict';

/**
 * Sends an error status and message as a response when a route is not found.
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};