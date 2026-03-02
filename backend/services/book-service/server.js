const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('../../shared/config/db');
const errorHandler = require('../../shared/middleware/errorHandler');

connectDB(process.env.MONGO_BOOKS);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ service: 'Book Service Running' });
});

app.use('/api/books', require('./routes/bookRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT_BOOK, () =>
  console.log(`Book Service running on ${process.env.PORT_BOOK}`)
);