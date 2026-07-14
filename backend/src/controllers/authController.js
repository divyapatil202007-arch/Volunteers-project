import { AuthService } from '../services/AuthService.js';
import { prisma } from '../config/db.js';

const sendTokenResponse = async (user, statusCode, res) => {
  const { token, refreshToken } = AuthService.generateTokens(user);

  // Save refresh token in DB - mocked out
  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { refreshToken }
  // });

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
          id: user.id,
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
    await sendTokenResponse(user, 201, res);
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
    await sendTokenResponse(user, 200, res);
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      res.status(401);
    }
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear refresh token in DB - mocked out
    // if (req.user) {
    //   await prisma.user.update({
    //     where: { id: req.user.id },
    //     data: { refreshToken: null }
    //   });
    // }

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
    // Mock user lookup
    // const user = await prisma.user.findUnique({
    //   where: { id: req.user.id }
    // });
    const user = { ...req.user };
    
    // Remove password before sending
    if (user) {
      delete user.password;
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: user
    });
  } catch (err) {
    next(err);
  }
};
