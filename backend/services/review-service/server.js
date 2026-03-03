const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('../../shared/middleware/errorHandler');
const connectDB = require('../../shared/config/db');

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