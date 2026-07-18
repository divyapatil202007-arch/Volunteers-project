import { supabase } from '../config/supabase.js';
import { prisma } from '../config/db.js';

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
    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);
    const supabaseUser = data?.user;

    if (error || !supabaseUser) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Find the user in our Prisma DB
    let user = await prisma.user.findUnique({
      where: { email: supabaseUser.email }
    });
    
    // Auto-sync: Create the user in Prisma if they don't exist yet
    if (!user) {
      const name = supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0];
      const role = supabaseUser.user_metadata?.role || 'volunteer';
      
      const createData = {
        email: supabaseUser.email,
        name: name,
        role: role,
      };

      if (role === 'ngo' || role === 'admin') {
        createData.ngo = {
          create: {
            organizationName: name,
            registrationNumber: `REG-${Date.now()}`,
            description: 'New NGO Organization',
            address: 'To be updated'
          }
        };
      } else {
        createData.volunteerProfile = {
          create: {
            skills: '',
            interests: '',
            availability: '',
            languages: '',
            achievements: '',
            badges: ''
          }
        };
      }

      user = await prisma.user.create({
        data: createData
      });
    }

    // Don't pass the password to req.user (even if it's optional now)
    if (user.password) delete user.password;
    req.user = user;

    next();
  } catch (err) {
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
