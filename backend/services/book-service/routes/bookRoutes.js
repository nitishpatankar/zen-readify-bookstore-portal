const router = require('express').Router();
const Book = require('../models/Book');
const validate = require('../../../shared/middleware/validate');
const { bookValidationSchema } = require('../validation/bookSchema');

// Get All Books
/**
 * 
 */
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    console.log('Books retrieved:', books.length);
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Get Book By ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

// Create Book
router.post('/', validate(bookValidationSchema), async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// Update Book
router.put('/:id', validate(bookValidationSchema), async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

// Delete Book
router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Update rating from review-service
router.put('/:id/rating', async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        averageRating: req.body.averageRating,
        totalReviews: req.body.totalReviews
      },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    next(err);
  }
});

module.exports = router;