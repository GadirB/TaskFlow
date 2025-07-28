import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import { sequelize } from "../utils/db.js";
import Task, { TaskActivity, SubTask, TaskAsset, TaskLink } from "../models/Task.js";
import User from "../models/User.js";

// @desc    Create a new task
// @route   POST /api/task/create
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, team, stage, date, priority, assets, links, description } = req.body;

    // Create the task
    const task = await Task.create({
      title,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      description
    });

    // Add team members
    if (team && team.length > 0) {
      await task.setTeam(team);
    }

    // Add assets
    if (assets && assets.length > 0) {
      await TaskAsset.bulkCreate(
        assets.map(url => ({ url, TaskId: task.id }))
      );
    }

    // Add links
    if (links) {
      const linkArray = links.split(',').map(url => url.trim());
      await TaskLink.bulkCreate(
        linkArray.map(url => ({ url, TaskId: task.id }))
      );
    }

    // Record activity
    await TaskActivity.create({
      type: 'assigned',
      activity: `Task created and assigned to team`,
      TaskId: task.id,
      byId: userId
    });

    res.status(200).json({ 
      status: true, 
      task, 
      message: "Task created successfully." 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
});

// @desc    Duplicate a task
// @route   POST /api/task/duplicate/:id
// @access  Private/Admin
const duplicateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    // Find original task with associations
    const originalTask = await Task.findByPk(id, {
      include: ['team', 'TaskAssets', 'TaskLinks', 'SubTasks']
    });

    if (!originalTask) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    // Create new task with basic details
    const newTask = await Task.create({
      title: `Duplicate - ${originalTask.title}`,
      stage: originalTask.stage,
      date: originalTask.date,
      priority: originalTask.priority,
      description: originalTask.description
    });

    // Copy team members
    if (originalTask.team) {
      await newTask.setTeam(originalTask.team.map(member => member.id));
    }

    // Copy assets
    if (originalTask.TaskAssets) {
      await TaskAsset.bulkCreate(
        originalTask.TaskAssets.map(asset => ({
          url: asset.url,
          TaskId: newTask.id
        }))
      );
    }

    // Copy links
    if (originalTask.TaskLinks) {
      await TaskLink.bulkCreate(
        originalTask.TaskLinks.map(link => ({
          url: link.url,
          TaskId: newTask.id
        }))
      );
    }

    // Copy subtasks
    if (originalTask.SubTasks) {
      await SubTask.bulkCreate(
        originalTask.SubTasks.map(subtask => ({
          title: subtask.title,
          date: subtask.date,
          tag: subtask.tag,
          isCompleted: subtask.isCompleted,
          TaskId: newTask.id
        }))
      );
    }

    // Record activity
    await TaskActivity.create({
      type: 'assigned',
      activity: 'Task duplicated and assigned to team',
      TaskId: newTask.id,
      byId: userId
    });

    res.status(200).json({ 
      status: true, 
      message: "Task duplicated successfully." 
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

// @desc    Update a task
// @route   PUT /api/task/update/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, date, team, stage, priority, assets, links, description } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    // Update basic details
    await task.update({
      title,
      date,
      priority: priority.toLowerCase(),
      stage: stage.toLowerCase(),
      description
    });

    // Update team members
    if (team) {
      await task.setTeam(team);
    }

    // Update assets
    if (assets) {
      await TaskAsset.destroy({ where: { TaskId: id } });
      await TaskAsset.bulkCreate(
        assets.map(url => ({ url, TaskId: id }))
      );
    }

    // Update links
    if (links) {
      await TaskLink.destroy({ where: { TaskId: id } });
      const linkArray = links.split(',').map(url => url.trim());
      await TaskLink.bulkCreate(
        linkArray.map(url => ({ url, TaskId: id }))
      );
    }

    res.status(200).json({ 
      status: true, 
      message: "Task updated successfully." 
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Update task stage
// @route   PUT /api/task/change-stage/:id
// @access  Private
const updateTaskStage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    await task.update({ stage: stage.toLowerCase() });

    res.status(200).json({ 
      status: true, 
      message: "Task stage changed successfully." 
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Update subtask status
// @route   PUT /api/task/change-status/:taskId/:subTaskId
// @access  Private
const updateSubTaskStage = asyncHandler(async (req, res) => {
  try {
    const { taskId, subTaskId } = req.params;
    const { status } = req.body;

    const subTask = await SubTask.findOne({
      where: {
        id: subTaskId,
        TaskId: taskId
      }
    });

    if (!subTask) {
      return res.status(404).json({ status: false, message: 'SubTask not found' });
    }

    await subTask.update({ isCompleted: status });

    res.status(200).json({
      status: true,
      message: "SubTask status updated successfully."
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Create a subtask
// @route   PUT /api/task/create-subtask/:id
// @access  Private/Admin
const createSubTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, tag } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    await SubTask.create({
      title,
      date,
      tag,
      isCompleted: false,
      TaskId: id
    });

    res.status(200).json({
      status: true,
      message: "SubTask created successfully."
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Get all tasks
// @route   GET /api/task
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  try {
    const { stage, search, trash } = req.query;
    
    let whereClause = {};
    
    if (stage) {
      whereClause.stage = stage.toLowerCase();
    }
    
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }
    
    if (trash) {
      whereClause.isDeleted = trash === 'true';
    } else {
      whereClause.isDeleted = false;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'team', attributes: ['id', 'name', 'email', 'title', 'role'] },
        'TaskAssets',
        'TaskLinks',
        'SubTasks',
        'TaskActivities'
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Get a single task
// @route   GET /api/task/:id
// @access  Private
const getTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      include: [
        { model: User, as: 'team', attributes: ['id', 'name', 'email', 'title', 'role'] },
        'TaskAssets',
        'TaskLinks',
        'SubTasks',
        'TaskActivities'
      ]
    });

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Move task to trash or restore
// @route   PUT /api/task/:id
// @access  Private/Admin
const trashTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    await task.update({ isDeleted });

    res.status(200).json({
      status: true,
      message: isDeleted ? "Task moved to trash." : "Task restored successfully."
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Permanently delete or restore task
// @route   DELETE /api/task/delete-restore/:id
// @access  Private/Admin
const deleteRestoreTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { restore } = req.query;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    if (restore === 'true') {
      await task.update({ isDeleted: false });
      res.status(200).json({
        status: true,
        message: "Task restored successfully."
      });
    } else {
      // Delete related records first
      await TaskAsset.destroy({ where: { TaskId: id } });
      await TaskLink.destroy({ where: { TaskId: id } });
      await SubTask.destroy({ where: { TaskId: id } });
      await TaskActivity.destroy({ where: { TaskId: id } });
      
      // Delete the task
      await task.destroy();
      
      res.status(200).json({
        status: true,
        message: "Task permanently deleted."
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Post task activity
// @route   POST /api/task/activity/:id
// @access  Private
const postTaskActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ status: false, message: 'Task not found' });
    }

    await TaskActivity.create({
      type,
      activity,
      TaskId: id,
      byId: userId
    });

    res.status(200).json({
      status: true,
      message: "Activity recorded successfully."
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// @desc    Get dashboard statistics
// @route   GET /api/task/dashboard
// @access  Private
const dashboardStatistics = asyncHandler(async (req, res) => {
  try {
    // Get task counts by stage
    const taskCounts = await Task.findAll({
      attributes: [
        'stage',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isDeleted: false },
      group: ['stage']
    });

    // Transform task counts to expected format
    const tasks = {};
    let totalTasks = 0;
    taskCounts.forEach(item => {
      const stage = item.stage.toLowerCase().replace(' ', '');
      const count = parseInt(item.dataValues.count);
      tasks[stage] = count;
      totalTasks += count;
    });

    // Ensure all stages exist
    if (!tasks.todo) tasks.todo = 0;
    if (!tasks.inprogress) tasks.inprogress = 0;
    if (!tasks.completed) tasks.completed = 0;

    // Get recent tasks (last10Task)
    const last10Task = await Task.findAll({
      where: { isDeleted: false },
      include: [
        { model: User, as: 'team', attributes: ['id', 'name', 'email', 'title', 'role'] }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Get recent team members
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // Create graph data for chart
    const graphData = [
      { name: 'Todo', total: tasks.todo },
      { name: 'In Progress', total: tasks.inprogress },
      { name: 'Completed', total: tasks.completed }
    ];

    res.status(200).json({
      totalTasks,
      tasks,
      last10Task,
      users,
      graphData
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

export {
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
};