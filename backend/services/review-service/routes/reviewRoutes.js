const router = require('express').Router();
const Review = require('../models/Review');
const validate = require('../../../shared/middleware/validate');
const { reviewValidationSchema } = require('../validation/reviewSchema');


// ===============================
// Create Review
// POST /api/reviews/:bookId
// ===============================
router.post(
  '/:bookId',
  validate(reviewValidationSchema),
  async (req, res, next) => {
    try {
      const { bookId } = req.params;

      const review = await Review.create({
        bookId,
        ...req.body
      });

      // Recalculate average rating
      const reviews = await Review.find({ bookId });

      const avg =
        reviews.reduce((acc, r) => acc + r.rating, 0) /
        reviews.length;

      // Call Book Service to update rating
      await fetch(
        `http://localhost:${process.env.PORT_BOOK}/api/books/${bookId}/rating`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            averageRating: Number(avg.toFixed(1)),
            totalReviews: reviews.length
          })
        }
      );

      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }
);


// ===============================
// Get Reviews by Book
// GET /api/reviews/:bookId
// ===============================
router.get('/:bookId', async (req, res, next) => {
  try {
    const reviews = await Review.find({
      bookId: req.params.bookId
    });

    res.json(reviews);
  } catch (err) {
    next(err);
  }
});


module.exports = router;