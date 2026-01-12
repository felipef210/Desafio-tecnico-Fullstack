import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { Task } from '../model/Task';

export function createTask(req: Request, res: Response) {
  const { title } = req.body;
  const { description } = req.body;

  if (!title || title.trim() === '')
    return res.status(400).json({ message: 'O título é obrigatório' });

  if (!description || description.trim() === '')
    return res.status(400).json({ message: 'A descrição é obrigatória' });

  const task: Task = taskService.createTask(title, description);
  res.status(201).json(task);
}

export function getTasks(req: Request, res: Response) {
  res.json(taskService.findAllTasks());
}

export function getTaskById(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const task: Task | undefined = taskService.findTaskById(id);

  if (!task)
    return res.status(404).json({ message: 'Tarefa não encontrada' });

  res.json(task);
}

export function updateTask(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const { title } = req.body;
  const { description } = req.body;
  const task: Task | null = taskService.updateTask(id, req.body);

  if (!title || title.trim() === '')
    return res.status(400).json({ message: 'O título é obrigatório' });

  if (!description || description.trim() === '')
    return res.status(400).json({ message: 'A descrição é obrigatória' });

  if (!task)
    return res.status(404).json({ message: 'Tarefa não encontrada' });

  res.status(200).json(task);
}

export function updateTaskStatus(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const task: Task | null = taskService.updateTaskStatus(id);

  if (!task)
    return res.status(404).json({ message: 'Tarefa não encontrada' });

  return res.status(200).json(task);
}

export function deleteTask(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const deleted: boolean = taskService.deleteTask(id);

  if (!deleted)
    return res.status(404).json({ message: 'Tarefa não encontrada' });

  res.status(204).send();
}
