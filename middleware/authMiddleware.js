// Importing the JWT library for token verification
const jwt = require('jsonwebtoken');

// Load environment variables from the .env file
require('dotenv').config();

// Middleware to verify the JWT token for user authentication
const authMiddleware = (req, res, next) => {
  // Extract the JWT token from the authorization header
  const token = req.headers['authorization'];
  
  // If no token is provided, return a 403 Forbidden response
  if (!token) return res.status(403).send('Token is required');
  
  try {
    // Verify the token using the secret stored in the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    
    // If token is valid, proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired, return a 401 Unauthorized response
    res.status(401).send('Invalid token');
  }
};

// Exporting the middleware to be used in routes
module.exports = authMiddleware;
