const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ------------------
// Mongo Connection
// ------------------

mongoose
  .connect(process.env.MONGO_BOOKS, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log('Search Service Mongo Connected'))
  .catch((err) => {
    console.error('Mongo Connection Failed:', err.message);
    process.exit(1);
  });

// ------------------
// Book Schema (Lightweight Replica)
// ------------------

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    category: String,
    description: String,
    imageUrl: String,
    averageRating: Number,
    totalReviews: Number
  },
  { timestamps: true }
);

bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text'
});

const Book = mongoose.model('Book', bookSchema);

// ------------------
// SEARCH ROUTE
// ------------------

/*
GET /api/search?query=atomic&genre=Self Help&page=1&limit=5&sort=rating
*/

app.get('/api/search', async (req, res) => {
  console.log('Search query:', req.query);
  try {
    const { query, genre } = req.query;

    const filter = {};

    // 🔎 Text search
    if (query && query.trim() !== '') {
      filter.$text = { $search: query };
    }

    // 🎯 Genre filter (case-insensitive)
    if (genre && genre.trim() !== '') {
      filter.genre = { $regex: genre, $options: 'i' };
    }

    const results = await Book.find(filter).sort({ createdAt: -1 });

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Search failed'
    });
  }
});

// ------------------

app.listen(process.env.PORT_SEARCH, () =>
  console.log(`Search Service running on ${process.env.PORT_SEARCH}`)
);