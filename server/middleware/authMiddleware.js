import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect routes - verify JWT token
const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      const user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // Check if user is active
      if (!user.isActive) {
        res.status(401);
        throw new Error('Account is disabled. Please contact administrator.');
      }

      // Add user to request object
      req.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware - check if user is admin
const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

export { protectRoute, isAdminRoute };