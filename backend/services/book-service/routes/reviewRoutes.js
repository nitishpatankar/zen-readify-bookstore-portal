const router = require('express').Router({ mergeParams: true });
const Review = require('../models/Review');
const Book = require('../models/Book');
const validate = require('../../../shared/middleware/validate');
const { reviewValidationSchema } = require('../validation/reviewSchema');

// Add Review to Book
router.post(
  '/',
  validate(reviewValidationSchema),
  async (req, res, next) => {
    try {
      const bookId = req.params.bookId;

      const review = await Review.create({
        ...req.body,
        book: bookId
      });

      // Recalculate average rating
      const reviews = await Review.find({ book: bookId });

      const avg =
        reviews.reduce((acc, r) => acc + r.rating, 0) /
        reviews.length;

      await Book.findByIdAndUpdate(bookId, {
        averageRating: avg.toFixed(1),
        totalReviews: reviews.length
      });

      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }
);

// Get Reviews of Book
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find({
      book: req.params.bookId
    });

    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

module.exports = router;