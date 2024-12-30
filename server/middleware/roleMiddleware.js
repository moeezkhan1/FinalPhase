const authorize = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next(); // Proceed if the user has the required role
  };
  
  module.exports = authorize;
  