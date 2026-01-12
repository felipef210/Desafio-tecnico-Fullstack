"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.updateTask = updateTask;
exports.updateTaskStatus = updateTaskStatus;
exports.deleteTask = deleteTask;
const taskService = __importStar(require("../services/taskService"));
function createTask(req, res) {
    const { title } = req.body;
    const { description } = req.body;
    if (!title || title.trim() === '')
        return res.status(400).json({ message: 'O título é obrigatório' });
    if (!description || description.trim() === '')
        return res.status(400).json({ message: 'A descrição é obrigatória' });
    const task = taskService.createTask(title, description);
    res.status(201).json(task);
}
function getTasks(req, res) {
    res.json(taskService.findAllTasks());
}
function getTaskById(req, res) {
    const id = Number(req.params.id);
    const task = taskService.findTaskById(id);
    if (!task)
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(task);
}
function updateTask(req, res) {
    const id = Number(req.params.id);
    const { title } = req.body;
    const { description } = req.body;
    const task = taskService.updateTask(id, req.body);
    if (!title || title.trim() === '')
        return res.status(400).json({ message: 'O título é obrigatório' });
    if (!description || description.trim() === '')
        return res.status(400).json({ message: 'A descrição é obrigatória' });
    if (!task)
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json(task);
}
function updateTaskStatus(req, res) {
    const id = Number(req.params.id);
    const task = taskService.updateTaskStatus(id);
    if (!task)
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    return res.status(200).json(task);
}
function deleteTask(req, res) {
    const id = Number(req.params.id);
    const deleted = taskService.deleteTask(id);
    if (!deleted)
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(204).send();
}
