// const Joi = require('joi');

// exports.reviewValidationSchema = Joi.object({
//   reviewerName: Joi.string().required(),
//   rating: Joi.number().integer().min(1).max(5).required(),
//   comment: Joi.string().min(3).required()
// });

const Joi = require('joi');

exports.reviewValidationSchema = Joi.object({
  reviewerName: Joi.string().required(),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),

  comment: Joi.string().min(3).required()
});