import { AuthService } from '../services/AuthService.js';
import { User } from '../models/User.js';

const sendTokenResponse = (user, statusCode, res) => {
  const { token, refreshToken } = AuthService.generateTokens(user);

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  user.save({ validateBeforeSave: false });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message: 'Authentication successful',
      data: {
        token,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
};

export const register = async (req, res, next) => {
  try {
    const user = await AuthService.registerUser(req.body);
    sendTokenResponse(user, 201, res);
  } catch (err) {
    if (err.message === 'Email already registered') {
      res.status(400);
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginUser(email, password);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      res.status(401);
    }
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear refresh token in DB
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.refreshToken = undefined;
        await user.save({ validateBeforeSave: false });
      }
    }

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: user
    });
  } catch (err) {
    next(err);
  }
};
