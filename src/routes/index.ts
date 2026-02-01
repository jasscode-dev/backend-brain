import { Router } from 'express';
import * as TaskController from '@controllers';

export const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.post('/task', TaskController.createTaskController);
router.post('/task/:id/start', TaskController.startTaskController);
router.post('/task/:id/pause', TaskController.pauseTaskController);
router.post('/task/:id/done', TaskController.doneTaskController);
router.get('/task', TaskController.getAllTasksController);
router.get('/task/:id', TaskController.getTaskByIdController);
router.delete('/task/:id', TaskController.removeTaskController);
