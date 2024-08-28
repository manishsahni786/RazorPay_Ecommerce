const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
  
    // Log request headers for debugging
    console.log('Request Headers:', req.headers);
  
    // Check if the token is sent in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract the token
  
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
  
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user from payload to request
            req.user = await User.findById(decoded.id).select('-password');
  
            if (!req.user) {
                console.log('User not found');
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
  
            next(); // Proceed to the next middleware/route
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.log('Authorization header missing or incorrect');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
  
module.exports = protect;
