// data.js
export const summary = {
  totalTasks: 120,
  tasks: {
    completed: 50,
    'in progress': 30,
    todo: 40,
  },
  last10Task: [
    {
      title: 'Fix login bug',
      priority: 'high',
      stage: 'in progress',
      team: [
        { name: 'Alice Johnson', email: 'alice@example.com', title: 'Frontend Developer' },
        { name: 'Bob Smith', email: 'bob@example.com', title: 'QA Engineer' },
      ],
      createdAt: '2025-07-01T10:00:00Z',
    },
    {
      title: 'Design onboarding flow',
      priority: 'medium',
      stage: 'todo',
      team: [
        { name: 'Carol Williams', email: 'carol@example.com', title: 'Product Designer' },
      ],
      createdAt: '2025-07-02T14:30:00Z',
    },
    {
      title: 'Deploy v2.1.0',
      priority: 'high',
      stage: 'completed',
      team: [
        { name: 'Dave Lee', email: 'dave@example.com', title: 'DevOps Engineer' },
        { name: 'Eve Martinez', email: 'eve@example.com', title: 'Project Manager' },
      ],
      createdAt: '2025-06-30T09:15:00Z',
    },
    {
      title: 'Update dependencies',
      priority: 'low',
      stage: 'in progress',
      team: [
        { name: 'Frank Wright', email: 'frank@example.com', title: 'Backend Developer' },
      ],
      createdAt: '2025-06-29T11:45:00Z',
    },
    {
      title: 'Refactor dashboard',
      priority: 'medium',
      stage: 'todo',
      team: [
        { name: 'Grace Kim', email: 'grace@example.com', title: 'UI/UX Designer' },
        { name: 'Henry Adams', email: 'henry@example.com', title: 'Product Owner' },
      ],
      createdAt: '2025-06-28T13:00:00Z',
    },
    {
      title: 'Customer feedback analysis',
      priority: 'low',
      stage: 'completed',
      team: [
        { name: 'Ivy Clark', email: 'ivy@example.com', title: 'Marketing Analyst' },
      ],
      createdAt: '2025-06-27T16:20:00Z',
    },
    {
      title: 'Write unit tests',
      priority: 'high',
      stage: 'in progress',
      team: [
        { name: 'Jack Miller', email: 'jack@example.com', title: 'Test Engineer' },
        { name: 'Kara Wilson', email: 'kara@example.com', title: 'Scrum Master' },
      ],
      createdAt: '2025-06-26T08:10:00Z',
    },
    {
      title: 'Setup CI/CD',
      priority: 'medium',
      stage: 'todo',
      team: [
        { name: 'Liam Thomas', email: 'liam@example.com', title: 'DevOps Intern' },
      ],
      createdAt: '2025-06-25T10:50:00Z',
    },
    {
      title: 'Code review for PR #34',
      priority: 'low',
      stage: 'completed',
      team: [
        { name: 'Mona Scott', email: 'mona@example.com', title: 'Code Reviewer' },
        { name: 'Noah Brown', email: 'noah@example.com', title: 'Team Lead' },
      ],
      createdAt: '2025-06-24T12:30:00Z',
    },
    {
      title: 'Redesign profile page',
      priority: 'high',
      stage: 'in progress',
      team: [
        { name: 'Olivia Davis', email: 'olivia@example.com', title: 'UI Designer' },
      ],
      createdAt: '2025-06-23T15:00:00Z',
    },
  ],
  last10Users: [
    {
      _id: 'u1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      title: 'Frontend Developer',
      isActive: true,
      createdAt: '2025-06-21T09:00:00Z',
    },
    {
      _id: 'u2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      title: 'QA Engineer',
      isActive: false,
      createdAt: '2025-06-22T10:30:00Z',
    },
    {
      _id: 'u3',
      name: 'Carol Williams',
      email: 'carol@example.com',
      title: 'Product Designer',
      isActive: true,
      createdAt: '2025-06-23T11:15:00Z',
    },
    {
      _id: 'u4',
      name: 'Dave Lee',
      email: 'dave@example.com',
      title: 'DevOps Engineer',
      isActive: true,
      createdAt: '2025-06-24T13:00:00Z',
    },
    {
      _id: 'u5',
      name: 'Eve Martinez',
      email: 'eve@example.com',
      title: 'Project Manager',
      isActive: false,
      createdAt: '2025-06-25T14:45:00Z',
    },
    {
      _id: 'u6',
      name: 'Frank Wright',
      email: 'frank@example.com',
      title: 'Backend Developer',
      isActive: true,
      createdAt: '2025-06-26T16:10:00Z',
    },
    {
      _id: 'u7',
      name: 'Grace Kim',
      email: 'grace@example.com',
      title: 'UI/UX Designer',
      isActive: true,
      createdAt: '2025-06-27T17:25:00Z',
    },
    {
      _id: 'u8',
      name: 'Henry Adams',
      email: 'henry@example.com',
      title: 'Product Owner',
      isActive: false,
      createdAt: '2025-06-28T18:40:00Z',
    },
    {
      _id: 'u9',
      name: 'Ivy Clark',
      email: 'ivy@example.com',
      title: 'Marketing Analyst',
      isActive: true,
      createdAt: '2025-06-29T19:55:00Z',
    },
    {
      _id: 'u10',
      name: 'Jack Miller',
      email: 'jack@example.com',
      title: 'Test Engineer',
      isActive: true,
      createdAt: '2025-06-30T21:10:00Z',
    },
  ]
}

export const chartData = [
  { name: 'High', total: 20 },
  { name: 'Medium', total: 50 },
  { name: 'Low', total: 30 },
]

export const tasks = [
  {
    id: '1',
    title: 'Fix login bug',
    description: 'Resolve authentication issue on mobile',
    stage: 'todo',
    priority: 'high',
    createdAt: '2025-07-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Design onboarding flow',
    description: 'UI flow for new users',
    stage: 'in progress',
    priority: 'medium',
    createdAt: '2025-07-02T14:30:00Z',
  },
  {
    id: '3',
    title: 'Deploy v2.1.0',
    description: 'Production release deployment',
    stage: 'completed',
    priority: 'high',
    createdAt: '2025-06-30T09:15:00Z',
  },
]
