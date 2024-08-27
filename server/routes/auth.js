const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const protect = require('../middleware/authMiddleware'); 

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Ensure matchPassword method exists
    if (typeof user.matchPassword !== 'function') {
      return res.status(500).json({ message: 'Error processing request' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }

  // Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,  // Your Gmail address
    pass: process.env.EMAIL_PASSWORD,  // Your Gmail password or App-specific password
  },
});


// Password recovery endpoint
router.post('/recover-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set token expiration time (1 hour)
    const resetPasswordExpire = Date.now() + 3600000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/reset-password/${resetToken}`;

    // Email message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a PUT request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    // Send email
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: message,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

// Reset password endpoint
router.put('/reset-password/:resetToken', async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password', error });
  }
});
});

module.exports = router;
