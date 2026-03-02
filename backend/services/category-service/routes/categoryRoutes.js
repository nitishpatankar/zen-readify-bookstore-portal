const router = require('express').Router();
const Category = require('../models/Category');
const validate = require('../../../shared/middleware/validate');
const { categoryValidationSchema } = require('../validation/categorySchema');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post('/', validate(categoryValidationSchema), async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

module.exports = router;