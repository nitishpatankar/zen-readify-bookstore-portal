const Joi = require('joi');

exports.bookValidationSchema = Joi.object({
  title: Joi.string().min(2).required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),

  category: Joi.string()
    .valid('Best Seller', 'New Arrival', "Editor's Pick")
    .required(),

  description: Joi.string().min(10).required(),

  reviews: Joi.array()
    .items(Joi.string())
    .default([]),

  imageUrl: Joi.string().uri().required()
});