// Load environment variables from the .env file
require('dotenv').config();

// Middleware to verify if the request contains a valid admin API key
const adminMiddleware = (req, res, next) => {
  // Extract the API key from the request headers
  const apiKey = req.headers['x-api-key'];
  
  // Check if the provided API key matches the admin API key stored in the environment variables
  if (apiKey === process.env.ADMIN_API_KEY) {
    // If API key is valid, proceed to the next middleware or route handler
    next();
  } else {
    // If API key is invalid, return a 403 Unauthorized access response
    res.status(403).send('Unauthorized access');
  }
};

// Exporting the middleware to be used in routes
module.exports = adminMiddleware;
