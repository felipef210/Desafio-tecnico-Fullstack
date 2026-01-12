"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.findAllTasks = findAllTasks;
exports.findTaskById = findTaskById;
exports.updateTask = updateTask;
exports.updateTaskStatus = updateTaskStatus;
exports.deleteTask = deleteTask;
let tasks = [];
let nextId = 0;
function createTask(title, description) {
    const task = {
        id: ++nextId,
        title,
        description,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(task);
    return task;
}
function findAllTasks() {
    return tasks;
}
function findTaskById(id) {
    return tasks.find(t => t.id === id);
}
function updateTask(id, taskBody) {
    const task = findTaskById(id);
    if (!task)
        return null;
    if (taskBody.title !== undefined) {
        if (task.title.trim() !== '')
            task.title = taskBody.title;
    }
    if (taskBody.description !== undefined) {
        if (task.description.trim() !== '')
            task.description = taskBody.description;
    }
    return task;
}
function updateTaskStatus(id) {
    const task = findTaskById(id);
    if (!task)
        return null;
    task.completed = !task.completed;
    return task;
}
function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1)
        return false;
    tasks.splice(index, 1);
    return true;
}
