import { prisma } from '../config/db.js';
import { hashPassword, matchPassword, getSignedJwtToken, getRefreshToken } from '../utils/authUtils.js';

export class AuthService {
  static async registerUser(data) {
    const { name, email, password, role } = data;

    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new Error('Email already registered');
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'volunteer'
      }
    });

    return user;
  }

  static async loginUser(email, password) {
    // Check for user
    const user = await prisma.user.findUnique({ where: { email } });
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
