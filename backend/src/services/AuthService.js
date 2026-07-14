import { hashPassword, matchPassword, getSignedJwtToken, getRefreshToken } from '../utils/authUtils.js';

// In-memory database for hackathon
export const users = [];

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
    // Check for user
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  static generateTokens(user) {
    const token = getSignedJwtToken(user.id, user.role);
    const refreshToken = getRefreshToken(user.id);
    return { token, refreshToken };
  }
}
