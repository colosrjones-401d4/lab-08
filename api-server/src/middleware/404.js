'use strict';

/**
 * Sends an error status and message as a response when a route is not found.
 * @param req
 * @param res
 * @param next
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};