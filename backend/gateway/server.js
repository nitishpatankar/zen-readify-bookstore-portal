const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/books', createProxyMiddleware({
  target: `http://localhost:${process.env.PORT_BOOK}`,
  changeOrigin: true
}));

app.use('/api/categories', createProxyMiddleware({
  target: `http://localhost:${process.env.PORT_CATEGORY}`,
  changeOrigin: true
}));

// app.use('/api/users', createProxyMiddleware({
//   target: `http://localhost:${process.env.PORT_USER}`,
//   changeOrigin: true
// }));

app.use('/api/search', createProxyMiddleware({
  target: `http://localhost:${process.env.PORT_SEARCH}`,
  changeOrigin: true
}));

app.listen(process.env.PORT_GATEWAY, () => {
  console.log(`API Gateway running on ${process.env.PORT_GATEWAY}`);
});

app.use('/api/reviews', createProxyMiddleware({
  target: `http://localhost:${process.env.PORT_REVIEW}`,
  changeOrigin: true
}));