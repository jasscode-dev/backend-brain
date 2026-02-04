import { validateSchema } from "@middlewares";
import { TaskSchema } from "src/modules/routine/validators";
import { Router } from "express";
import { taskController } from "src/composition";


const router = Router();

router.post('/', validateSchema(TaskSchema), taskController.create);
/* router.post('/:id/start', validateSchema(IdSchema, 'params'), TaskController.startTaskController);
router.post('/:id/pause', validateSchema(IdSchema, 'params'), TaskController.pauseTaskController);
router.post('/:id/done', validateSchema(IdSchema, 'params'), TaskController.doneTaskController);
router.get('/', TaskController.getAllTasksController);
router.get('/:id', validateSchema(IdSchema, 'params'), TaskController.getTaskByIdController);
router.delete('/:id', validateSchema(IdSchema, 'params'), TaskController.removeTaskController);
 */
export default router