import express from "express";
import {
  createTask,
  duplicateTask,
  updateTask,
  updateTaskStage,
  updateSubTaskStage,
  createSubTask,
  getTasks,
  getTask,
  trashTask,
  deleteRestoreTask,
  postTaskActivity,
  dashboardStatistics
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks or filtered tasks
router.get("/", protectRoute, getTasks);

// Get dashboard statistics
router.get("/dashboard", protectRoute, dashboardStatistics);

// Get a single task
router.get("/:id", protectRoute, getTask);

// Create a new task
router.post("/create", protectRoute, isAdminRoute, createTask);

// Duplicate a task
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);

// Post task activity
router.post("/activity/:id", protectRoute, postTaskActivity);

// Update a task
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);

// Change task stage
router.put("/change-stage/:id", protectRoute, updateTaskStage);

// Change subtask status
router.put("/change-status/:taskId/:subTaskId", protectRoute, updateSubTaskStage);

// Create a subtask
router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);

// Move task to trash or restore
router.put("/:id", protectRoute, isAdminRoute, trashTask);

// Permanently delete or restore task
router.delete("/delete-restore/:id", protectRoute, isAdminRoute, deleteRestoreTask);

export default router;