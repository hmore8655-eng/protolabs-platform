const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db.cjs');

const JWT_SECRET = process.env.JWT_SECRET || 'protolabs_secret_key_2026_super_secure';

const loginUser = (email, password) => {
  const user = db.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return { error: 'Invalid email or password' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = {
  loginUser,
  verifyToken,
  JWT_SECRET
};
