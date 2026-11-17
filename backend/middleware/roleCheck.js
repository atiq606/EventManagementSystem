const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: `Access denied. Required role: ${requiredRole}` });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
