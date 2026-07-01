import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { validateSignup, validateLogin, runValidation } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', validateSignup, runValidation, register);
router.post('/login', validateLogin, runValidation, login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

export default router;
