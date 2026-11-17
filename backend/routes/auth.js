const express = require('express');
const jwt = require('jsonwebtoken');
const { readData } = require('../utils/fileHandler');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const data = readData();
  const user = data.users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, SECRET_KEY, {
    expiresIn: '24h'
  });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
