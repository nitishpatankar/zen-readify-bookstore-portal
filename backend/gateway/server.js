require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
  console.log('GATEWAY RECEIVED:', req.method, req.originalUrl);
  next();
});

app.use(
  createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_BOOK}`,
    changeOrigin: true,
    pathFilter: ['/api/books'],
  })
);

app.use(
  createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_CATEGORY}`,
    changeOrigin: true,
    pathFilter: ['/api/categories'],
  })
);

app.listen(process.env.PORT_GATEWAY, () => {
  console.log(`Gateway running on ${process.env.PORT_GATEWAY}`);
});