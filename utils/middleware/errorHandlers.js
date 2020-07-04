const boom = require('@hapi/boom');
const { config } = require('../../config');


function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack }
  }
  return error;
}

function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.log(err);
  next(err); //Para llamar al siguiente middleware de error
}

function wrapErrors(err, req, res, next){
  if(!err.isBoom){
    next(boom.badImplementation(err));
  }

  next(err);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const { output: {statusCode, payload} } = err;
  //res.status(err.status || 500);
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
}