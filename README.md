
# Task Tracker CLI

A simple command-line interface (CLI) application for managing tasks. You can add, update, delete, and list tasks, as well as track their status. Tasks are stored in a local `tasks.json` file.

## Features

- Add new tasks with a description.
- Update task descriptions.
- Mark tasks as "in-progress" or "done".
- Delete tasks.
- List tasks, filtered by status (e.g., `todo`, `in-progress`, `done`).
- Tasks are persisted locally in a JSON file.

### Project URL
[Task Tracker CLI](https://roadmap.sh/projects/task-tracker)

## Installation

### Prerequisites

- Node.js (v12 or higher)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/abdullahi-abdiaziz/task-tracker-cli.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracker-cli
   ```

3. Install dependencies (if you add any in the future):

   ```bash
   npm install
   ```

4. Make the CLI globally executable (optional but recommended):

   ```bash
   npm link
   ```

Now, you can run the `task-cli` command globally from anywhere in your terminal.

## Usage

You can use the CLI to manage your tasks with the following commands:

### Add a New Task

```bash
task-cli add "Task description"
```

Example:

```bash
task-cli add "Buy groceries"
```

### Update a Task

```bash
task-cli update <id> <new description>
```

Example:

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

### Delete a Task

```bash
task-cli delete <id>
```

Example:

```bash
task-cli delete 1
```

### Mark a Task as In-Progress

```bash
task-cli mark-in-progress <id>
```

Example:

```bash
task-cli mark-in-progress 2
```

### Mark a Task as Done

```bash
task-cli mark-done <id>
```

Example:

```bash
task-cli mark-done 3
```

### List Tasks

List all tasks:

```bash
task-cli list
```

List tasks filtered by status (`todo`, `in-progress`, or `done`):

```bash
task-cli list todo
```

### Help

Show the help message with a list of commands:

```bash
task-cli help
```

## Task Statuses

Tasks can have the following statuses:

- `todo`: The task is yet to be started.
- `in-progress`: The task is currently being worked on.
- `done`: The task is completed.

## JSON File

The tasks are stored locally in a `tasks.json` file in the same directory as the script. Each task has the following structure:

```json
{
  "id": 1,
  "description": "Task description",
  "status": "todo",
  "createdAt": "2024-10-19T10:30:00.000Z",
  "updatedAt": "2024-10-19T10:30:00.000Z"
}
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
