require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.LOGIN_TOKEN_EXPIRATION || '30d',
  });
};
