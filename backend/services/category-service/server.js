const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('../../shared/config/db');
const errorHandler = require('../../shared/middleware/errorHandler');

connectDB(process.env.MONGO_CATEGORY);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ service: 'Category Service Running' });
});

app.use('/api/categories', require('./routes/categoryRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT_CATEGORY, () =>
  console.log(`Category Service running on ${process.env.PORT_CATEGORY}`)
);