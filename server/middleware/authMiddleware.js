const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  // Check if there is an authorization header
  const authHeader = req.headers.authorization;
  // console.log('akdkja');
  

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // Extract the token from the header
      const token = authHeader.split(' ')[1];
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request
      req.user = await User.findById(decoded.id).select('-password');
      
      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // No token provided
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
