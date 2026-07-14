import { hashPassword, matchPassword, getSignedJwtToken, getRefreshToken } from '../utils/authUtils.js';

// In-memory database for hackathon (pre-filled with a demo user)
export const users = [
  {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'test@example.com',
    password: '$2b$10$wO8qG.I9L5.V9oFwI.hZ/u6C8e/v1aD6kZ3.X8Wk3iO/m2h1z2y.C', // "password123"
    role: 'volunteer'
  },
  {
    id: 'demo-ngo-123',
    name: 'Demo NGO',
    email: 'ngo@example.com',
    password: '$2b$10$wO8qG.I9L5.V9oFwI.hZ/u6C8e/v1aD6kZ3.X8Wk3iO/m2h1z2y.C', // "password123"
    role: 'ngo'
  }
];

export class AuthService {
  static async registerUser(data) {
    const { name, email, password, role } = data;

    // Check if user exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      throw new Error('Email already registered');
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      password: hashedPassword,
      role: role || 'volunteer'
    };
    
    users.push(user);
    return user;
  }

  static async loginUser(email, password) {
    // Hackathon Mode: If user doesn't exist, auto-create them so the demo never fails!
    let user = users.find(u => u.email === email);
    
    if (!user) {
      // Auto-register them in the background
      const hashedPassword = await hashPassword(password);
      user = {
        id: Math.random().toString(36).substring(7),
        name: email.split('@')[0], // Use email prefix as name
        email,
        password: hashedPassword,
        role: 'volunteer'
      };
      users.push(user);
      return user;
    }

    // Check if password matches
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      // For the hackathon, if they mistyped the password, we will just update it!
      // This guarantees they can never get locked out during a live demo.
      user.password = await hashPassword(password);
    }

    return user;
  }

  static generateTokens(user) {
    const token = getSignedJwtToken(user.id, user.role);
    const refreshToken = getRefreshToken(user.id);
    return { token, refreshToken };
  }
}
