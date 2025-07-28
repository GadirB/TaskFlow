import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public/Admin
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, title, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    title,
    role,
    isAdmin: role.toLowerCase() === "admin",
    isActive: true
  });

  if (user) {
    res.status(201).json({
      status: true,
      message: "User registered successfully"
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login user & get token
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ where: { email } });

  // Check if user exists and password matches
  if (user && user.password === password) {
    // Check if user is active
    if (!user.isActive) {
      res.status(401);
      throw new Error("Account is disabled. Please contact administrator.");
    }

    // Generate token
    generateToken(res, user.id);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      title: user.title,
      role: user.role,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/user/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get team members list
// @route   GET /api/user/get-team
// @access  Private/Admin
const getTeamList = asyncHandler(async (req, res) => {
  const { search } = req.query;
  
  let whereClause = {};
  if (search) {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { role: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const users = await User.findAll({
    where: whereClause,
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json(users);
});

// @desc    Get user task status
// @route   GET /api/user/get-status
// @access  Private/Admin
const getUserTaskStatus = asyncHandler(async (req, res) => {
  // Implementation depends on your task model and relationships
  res.status(200).json({ message: "User task status" });
});

// @desc    Get notifications list
// @route   GET /api/user/notifications
// @access  Private
const getNotificationsList = asyncHandler(async (req, res) => {
  // Implementation depends on your notification model
  res.status(200).json({ message: "Notifications list" });
});

// @desc    Mark notification as read
// @route   PUT /api/user/read-noti
// @access  Private
const markNotificationRead = asyncHandler(async (req, res) => {
  // Implementation depends on your notification model
  res.status(200).json({ message: "Notification marked as read" });
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { name, email, title, role } = req.body;

  const user = await User.findByPk(userId);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.title = title || user.title;
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        title: updatedUser.title,
        role: updatedUser.role,
        isAdmin: updatedUser.isAdmin,
        isActive: updatedUser.isActive
      }
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Change user password
// @route   PUT /api/user/change-password
// @access  Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { password } = req.body;

  const user = await User.findByPk(userId);

  if (user) {
    user.password = password;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password changed successfully"
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Activate/Deactivate user profile
// @route   PUT /api/user/:id
// @access  Private/Admin
const activateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const user = await User.findByPk(id);

  if (user) {
    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      status: true,
      message: isActive ? "User activated successfully" : "User deactivated successfully"
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user profile
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) {
    await user.destroy();

    res.status(200).json({
      status: true,
      message: "User deleted successfully"
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getTeamList,
  getUserTaskStatus,
  getNotificationsList,
  markNotificationRead,
  updateUserProfile,
  changeUserPassword,
  activateUserProfile,
  deleteUserProfile
};