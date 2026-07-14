import jwt from 'jsonwebtoken';
import { users } from '../services/AuthService.js';

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check headers for authorization token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Else check cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Don't pass the password to req.user
    delete user.password;
    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};
