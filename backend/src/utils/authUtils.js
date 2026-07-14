import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const matchPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

export const getSignedJwtToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || 'fallback_secret_for_hackathon', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

export const getRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_secret', {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d'
  });
};
