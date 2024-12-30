// server/middleware/authMiddleware.cjs
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access Denied: Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Access Denied: Invalid token' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied: You do not have permission' });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
