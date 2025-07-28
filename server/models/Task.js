import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  priority: {
    type: DataTypes.ENUM('high', 'medium', 'normal', 'low'),
    defaultValue: 'normal'
  },
  stage: {
    type: DataTypes.ENUM('todo', 'in progress', 'completed'),
    defaultValue: 'todo'
  },
  description: {
    type: DataTypes.TEXT
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Define Task-User many-to-many relationship for team members
Task.belongsToMany(User, { 
  through: 'TaskTeam',
  as: 'team'
});
User.belongsToMany(Task, { 
  through: 'TaskTeam',
  as: 'tasks'
});

// Define Task-User one-to-many relationship for activities
const TaskActivity = sequelize.define('TaskActivity', {
  type: {
    type: DataTypes.ENUM('assigned', 'started', 'in progress', 'bug', 'completed', 'commented'),
    defaultValue: 'assigned'
  },
  activity: DataTypes.STRING,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Task.hasMany(TaskActivity);
TaskActivity.belongsTo(Task);
TaskActivity.belongsTo(User, { as: 'by' });

// Define subtasks
const SubTask = sequelize.define('SubTask', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tag: DataTypes.STRING,
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Task.hasMany(SubTask);
SubTask.belongsTo(Task);

// Define assets and links as separate tables
const TaskAsset = sequelize.define('TaskAsset', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const TaskLink = sequelize.define('TaskLink', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Task.hasMany(TaskAsset);
TaskAsset.belongsTo(Task);

Task.hasMany(TaskLink);
TaskLink.belongsTo(Task);

export default Task;
export { TaskActivity, SubTask, TaskAsset, TaskLink };