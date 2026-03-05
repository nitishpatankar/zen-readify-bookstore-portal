const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const connectDB = require('../../shared/config/db');

console.log('AUTH SERVICE STARTING...');
console.log('PORT_AUTH:', process.env.PORT_AUTH);

connectDB(process.env.MONGO_AUTH);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashed,
    role: role || 'USER'
  });

  res.json({ message: 'User Registered' });
});

// app.post('/login', async (req, res) => {
//   console.log('Login request received :: ', req.body);

//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign(
//     { id: user._id, role: user.role, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );

//   res.json({ token, role: user.role });
// });

app.post('/login', (req, res) => {
  console.log("Login hit auth service :: ", req);
  res.json({ message: "Auth OK" });
});

app.post('/login', async (req, res) => {
  try {
    console.log('Login request received :: ', req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('User from DB :: ', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log('Password match result :: ', match);

    if (!match) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('JWT generated successfully');

    res.json({ token, role: user.role });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(process.env.PORT_AUTH, () =>
  console.log(`Auth Service running on ${process.env.PORT_AUTH}`)
);
