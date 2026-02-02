import { Router } from 'express';
import * as TaskController from '@controllers';
import { validateSchema } from '@middlewares';
import { TaskSchema, IdSchema } from '@schemas';

export const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.post('/task', validateSchema(TaskSchema), TaskController.createTaskController);
router.post('/task/:id/start', validateSchema(IdSchema, 'params'), TaskController.startTaskController);
router.post('/task/:id/pause', validateSchema(IdSchema, 'params'), TaskController.pauseTaskController);
router.post('/task/:id/done', validateSchema(IdSchema, 'params'), TaskController.doneTaskController);
router.get('/task', TaskController.getAllTasksController);
router.get('/task/:id', validateSchema(IdSchema, 'params'), TaskController.getTaskByIdController);
router.delete('/task/:id', validateSchema(IdSchema, 'params'), TaskController.removeTaskController);
