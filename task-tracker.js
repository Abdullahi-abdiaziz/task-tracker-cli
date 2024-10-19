#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Path to tasks.json
const tasksFilePath = path.join(__dirname, "tasks.json");

// Initialize tasks.json if it doesn't exist
function initializeTasksFile() {
  if (!fs.existsSync(tasksFilePath)) {
    const initialData = { tasks: [] };
    fs.writeFileSync(tasksFilePath, JSON.stringify(initialData, null, 2));
  }
}

// Read tasks from JSON file
function readTasks() {
  initializeTasksFile();
  const data = fs.readFileSync(tasksFilePath, "utf-8");
  return JSON.parse(data).tasks;
}

// Write tasks to JSON file
function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify({ tasks }, null, 2));
}

// Generate a unique ID
function generateId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
}

// Add a new task
function addTask(description) {
  if (!description) {
    console.error("Error: Task description cannot be empty.");
    process.exit(1);
  }

  const tasks = readTasks();
  const newTask = {
    id: generateId(tasks),
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update a task
function updateTask(id, newDescription) {
  if (!id || !newDescription) {
    console.error("Error: Please provide both task ID and new description.");
    process.exit(1);
  }

  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    console.error(`Error: Task with ID ${id} not found.`);
    process.exit(1);
  }

  tasks[taskIndex].description = newDescription;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  writeTasks(tasks);
  console.log(`Task ${id} updated successfully.`);
}

// Delete a task
function deleteTask(id) {
  if (!id) {
    console.error("Error: Please provide the task ID to delete.");
    process.exit(1);
  }

  const tasks = readTasks();
  const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));

  if (tasks.length === filteredTasks.length) {
    console.error(`Error: Task with ID ${id} not found.`);
    process.exit(1);
  }

  writeTasks(filteredTasks);
  console.log(`Task ${id} deleted successfully.`);
}

// Mark a task as in progress
function markInProgress(id) {
  changeTaskStatus(id, "in-progress");
}

// Mark a task as done
function markDone(id) {
  changeTaskStatus(id, "done");
}

// Change task status
function changeTaskStatus(id, status) {
  if (!id) {
    console.error("Error: Please provide the task ID.");
    process.exit(1);
  }

  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    console.error(`Error: Task with ID ${id} not found.`);
    process.exit(1);
  }

  tasks[taskIndex].status = status;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  writeTasks(tasks);
  console.log(`Task ${id} marked as ${status}.`);
}

// List tasks

function listTasks(filter) {
  const tasks = readTasks();
  let filteredTasks = tasks;

  if (filter) {
    const status = filter.toLowerCase();
    if (!["done", "todo", "in-progress"].includes(status)) {
      console.error(
        'Error: Invalid filter. Use "done", "todo", or "in-progress".'
      );
      process.exit(1);
    }
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  filteredTasks.forEach((task) => {
    console.log(
      `[ID: ${task.id}] ${task.description} - Status: ${task.status}`
    );
  });
}

// Display help
function displayHelp() {
  const helpText = `
Usage: task-cli <command> [arguments]

Commands:
  add <description>            Add a new task
  update <id> <description>    Update an existing task
  delete <id>                  Delete a task
  mark-in-progress <id>        Mark a task as in-progress
  mark-done <id>               Mark a task as done
  list [status]                List tasks. Optional status: done, todo, in-progress
  help                         Show this help message

Examples:
  task-cli add "Buy groceries"
  task-cli update 1 "Buy groceries and cook dinner"
  task-cli delete 1
  task-cli mark-in-progress 2
  task-cli mark-done 3
  task-cli list
  task-cli list done
  task-cli list todo
  task-cli list in-progress
`;
  console.log(helpText);
}

// Main function to parse commands
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "add":
      addTask(args[1]);
      break;
    case "update":
      updateTask(args[1], args[2]);
      break;
    case "delete":
      deleteTask(args[1]);
      break;
    case "mark-in-progress":
      markInProgress(args[1]);
      break;
    case "mark-done":
      markDone(args[1]);
      break;
    case "list":
      listTasks(args[1]);
      break;
    case "help":
    case undefined:
      displayHelp();
      break;
    default:
      console.error(`Error: Unknown command "${command}"`);
      displayHelp();
      process.exit(1);
  }
}

main();
