import express from 'express';
import { body } from 'express-validator';
import { signup, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstname').trim().notEmpty().withMessage('First name is required'),
    body('lastname').trim().notEmpty().withMessage('Last name is required'),
  ],
  signup
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile);

export default router;
