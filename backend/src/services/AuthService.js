import { User } from '../models/User.js';

export class AuthService {
  static async registerUser(data) {
    const { name, email, password, role } = data;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('Email already registered');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    return user;
  }

  static async loginUser(email, password) {
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  static generateTokens(user) {
    const token = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();
    return { token, refreshToken };
  }
}
