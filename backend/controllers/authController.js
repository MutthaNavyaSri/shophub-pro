import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password, firstname, lastname, phone } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({
        message: userExists.email === email 
          ? 'Email already registered' 
          : 'Username already taken',
      });
    }

    // Create user
    const user = await User.create({
      email,
      username,
      password,
      firstname,
      lastname,
      phone: phone || '',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email);
    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (user && (await user.matchPassword(password))) {
      console.log('Password match: Success');
      res.json({
        _id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      console.log('Login failed: Invalid credentials');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        id: user._id,
        email: user.email,
        username: user.username,
        name: {
          firstname: user.firstname,
          lastname: user.lastname,
        },
        phone: user.phone,
        address: user.address,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
