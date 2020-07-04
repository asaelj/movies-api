const boom = require('@hapi/boom');
//const joi = require('@hapi/joi');

function validate(data, schema) {
  //validacion con joi
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    //(sin boom) error ? next(new Error(error)) : next();
    error ? next(boom.badRequest(error)) : next();
  }
}

module.exports = validationHandler;