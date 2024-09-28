// Middleware to check if the authenticated user has the required role(s)
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Extract the user's role from req.user, which is assumed to be set by a previous authentication middleware
    const userRole = req.user.role;

    // Check if the user's role is included in the list of allowed roles
    if (!roles.includes(userRole)) {
      // If the user's role is not in the allowed roles, return a 403 Forbidden response
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }

    // If the user's role is authorized, proceed to the next middleware or route handler
    next();
  };
};

// Export the middleware so it can be used in routes
module.exports = roleMiddleware;
