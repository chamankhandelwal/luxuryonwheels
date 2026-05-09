import jwt from 'jsonwebtoken';

export const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev-luxury-on-wheels-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
