const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.redirect('/login');
    }

    req.user = user;
    next();
  } catch (error) {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    return res.redirect('/login');
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).render('error', {
        error: `User role ${req.user.role} is not authorized to access this route`,
        user: req.user
      });
    }
    next();
  };
};
