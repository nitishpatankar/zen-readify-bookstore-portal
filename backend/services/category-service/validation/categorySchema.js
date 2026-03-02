const Joi = require('joi');

exports.categoryValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow('')
});