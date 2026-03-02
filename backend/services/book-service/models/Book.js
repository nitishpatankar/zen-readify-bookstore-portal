const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['Best Seller', 'New Arrival', "Editor's Pick"],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [
      {
        type: String
      }
    ],
    imageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);

