const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('../../shared/middleware/errorHandler');
const connectDB = require('../../shared/config/db');

// mongoose
//   .connect(process.env.MONGO_REVIEWS, {
//     serverSelectionTimeoutMS: 5000
//   })
//   .then(() => console.log('Review Service Mongo Connected'))
//   .catch((err) => {
//     console.error(err.message);
//     process.exit(1);
//   });

connectDB(process.env.MONGO_REVIEWS);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ service: 'Review Service Running at port ' + process.env.PORT_REVIEW });
});

app.use('/api/reviews', require('./routes/reviewRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT_REVIEW, () =>
  console.log(`Review Service running on ${process.env.PORT_REVIEW}`)
);