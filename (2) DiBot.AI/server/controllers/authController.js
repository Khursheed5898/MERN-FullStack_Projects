import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingEmail = await User.findOne({ email: cleanEmail });
    if (existingEmail) {
      return res.status(400).json({ message: 'An account with this email already exists. Please log in.' });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ 
      username: { $regex: new RegExp(`^${cleanUsername}$`, 'i') } 
    });
    if (existingUsername) {
      return res.status(400).json({ 
        message: `The username "${cleanUsername}" is already taken. Please choose another name.` 
      });
    }

    const user = new User({ 
      username: cleanUsername, 
      email: cleanEmail, 
      password 
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'Field';
      return res.status(400).json({ 
        message: `${field === 'username' ? 'Username' : 'Email'} is already registered. Please choose another.` 
      });
    }
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: error.message || 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: error.message || 'Server error during login.' });
  }
};
