import { Task } from '../model/Task';

let tasks: Task[] = [];
let nextId = 0;

export function createTask(title: string, description: string): Task {
  const task: Task = {
    id: ++nextId,
    title,
    description,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(task);
  return task;
}

export function findAllTasks(): Task[] {
  return tasks;
}

export function findTaskById(id: number): Task | undefined {
  return tasks.find(t => t.id === id);
}

export function updateTask(id: number, taskBody: Task): Task | null {
  const task: Task | undefined = findTaskById(id);

  if (!task) 
    return null;

  if (taskBody.title !== undefined) {
    if (task.title.trim() !== '')
      task.title = taskBody.title;
  }

  if (taskBody.description !== undefined)
    if (task.description.trim() !== '')
      task.description = taskBody.description;

  return task;
}

export function updateTaskStatus(id: number): Task | null {
  const task: Task | undefined = findTaskById(id);

  if (!task)
    return null;

  task.completed = !task.completed;

  return task;
}

export function deleteTask(id: number): boolean {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) 
    return false;

  tasks.splice(index, 1);
  return true;
}