# TaskTrackerCLI
Task tracker is a project used to track and manage your tasks, written in TypeScript. It allows you to easily create, list, update, and delete tasks.

# Installation
To use TaskTrackerCLI, first, clone the repository and then install the necessary dependencies. After that, you can use the npm link command to make the task-cli command available globally on your system.

git clone https://github.com/coder-Sachin1214/Task-CLI.git \
cd Task-CLI \
npm install \
npm run build \
npm link

# Usage

### Adding a new task
task-cli add "Buy groceries" todo 

### Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner" \
task-cli delete 1 

### Marking a task as in progress or done
task-cli mark-status 1 done 

### Listing all tasks
task-cli list 

### Listing tasks by status
task-cli list done \
task-cli list todo \
task-cli list in-progress 
