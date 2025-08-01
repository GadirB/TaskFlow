export const tasks = [
  {
    _id: "1",
    title: "Website Project Proposal",
    priority: "high",
    stage: "todo",
    date: new Date("2023-01-15").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user1", name: "John Doe" },
      { _id: "user2", name: "Anthony Doe" },
    ],
    subTasks: [
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
    ],
  },
  {
    _id: "2",
    title: "Review Code Changes",
    priority: "medium",
    stage: "in progress",
    date: new Date("2023-02-01").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user3", name: "Bob Smith" },
      { _id: "user4", name: "Alice Johnson" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "3",
    title: "Bug Fixing",
    priority: "low",
    stage: "completed",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "4",
    title: "Tsk Manager Project",
    priority: "high",
    stage: "in progress",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "5",
    title: "Tsk Manager Project",
    priority: "high",
    stage: "in progress",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "6",
    title: "Tsk Manager Project",
    priority: "high",
    stage: "todo",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "7",
    title: "Tsk Manager Project",
    priority: "high",
    stage: "completed",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "6",
    title: "Task Manager Project",
    priority: "high",
    stage: "todo",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
  {
    _id: "7",
    title: "Tsk Manager Project",
    priority: "high",
    stage: "completed",
    date: new Date("2023-02-10").toISOString(),
    comments: [],
    assets: [],
    team: [
      { _id: "user2", name: "Jane Doe" },
      { _id: "user5", name: "Charlie Brown" },
    ],
    subTasks: [
      {
        _id: "task2",
        title: "Blog App Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Coding",
      },
      {
        _id: "task1",
        title: "Blog App Admin Dashboard",
        date: new Date("2023-01-15").toISOString(),
        tag: "Design",
      },
    ],
  },
];

export const activitiesData = [
  {
    _id: "0",
    type: "started",
    activity: "started this task.",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
  {
    _id: "1",
    type: "commented",
    activity:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
    date: new Date("2023-01-15").toISOString(),
    by: "Eduardo Benz",
  },
  {
    _id: "2",
    type: "assigned",
    activity: "task to Codewave Asante",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },

  {
    _id: "3",
    type: "in progress",
    activity:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum.",
    date: new Date("2024-01-15").toISOString(),
    by: "Jason Meyers",
  },
  {
    _id: "5",
    type: "bug",
    activity: "bug to Codewave Asante",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
  {
    _id: "4",
    type: "completed",
    activity: "Codewave Asante has completed the task assigned",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
];

export const users = [
  {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    role: "Developer",
    isActive: true,
  },
  {
    name: "Jane Smith",
    title: "Product Manager",
    email: "jane.smith@example.com",
    role: "Manager",
  },
  {
    name: "Alex Johnson",
    title: "UX Designer",
    email: "alex.johnson@example.com",
    role: "Designer",
    isActive: true,
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
  {
    name: "Emily Wilson",
    title: "Data Analyst",
    email: "emily.wilson@example.com",
    role: "Analyst",
  },
  {
    name: "Michael Brown",
    title: "QA Engineer",
    email: "michael.brown@example.com",
    role: "Tester",
  },
];