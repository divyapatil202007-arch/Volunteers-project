import { prisma } from '../config/db.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    
    // Remove password before sending
    if (user && user.password) {
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
