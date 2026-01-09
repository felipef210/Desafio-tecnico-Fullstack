import { Router } from 'express';
import * as controller from '../controllers/taskController';

const router = Router();

router.post('/', controller.createTask);
router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTask);
router.patch('/:id', controller.updateTaskStatus);
router.delete('/:id', controller.deleteTask);

export default router;
