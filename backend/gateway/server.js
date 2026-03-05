const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());

// JWT Middleware
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.headers['x-user'] = JSON.stringify(decoded);
    next();
  } catch {
    return res.sendStatus(403);
  }
}

/* ================= AUTH ROUTES ================= */
app.use('/api/auth',
  createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_AUTH}`,
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': ''
    },
    onProxyReq: (proxyReq, req, res) => {
      if (req.body && Object.keys(req.body).length) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }
  })
);

/* ================= BOOK ROUTES ================= */
// app.use('/api/books',
//   verifyJWT,
//   createProxyMiddleware({
//     target: `http://localhost:${process.env.PORT_BOOK}`,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api/books': ''
//     }
//   })
// );

app.use('/api/books',
  createProxyMiddleware({
    target: `http://127.0.0.1:${process.env.PORT_BOOK}`,
    changeOrigin: true,
    pathRewrite: {
      '^/api/books': ''
    }
  })
);

app.listen(process.env.PORT_GATEWAY, () =>
  console.log(`Gateway running on ${process.env.PORT_GATEWAY}`)
);
