const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.getRegisterPage = (req, res) => {
  res.render('register', { error: null });
};

exports.getLoginPage = (req, res) => {
  res.render('login', { error: null });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.render('register', { error: 'User already exists with this email or username' });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user'
    });

    const token = generateToken(user._id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect('/recipes');
  } catch (error) {
    res.render('register', { error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect('/recipes');
  } catch (error) {
    res.render('login', { error: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.redirect('/login');
};
