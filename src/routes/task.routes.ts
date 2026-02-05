import { validateSchema } from "@middlewares";
import { TaskSchema, IdSchema } from "src/modules/routine/validators";
import { Router } from "express";
import { taskController } from "src/composition";


const router = Router();

router.post('/', validateSchema(TaskSchema), taskController.create);
router.post('/:id/start', validateSchema(IdSchema, 'params'), taskController.start);
router.post('/:id/pause', validateSchema(IdSchema, 'params'), taskController.pause);
router.post('/:id/done', validateSchema(IdSchema, 'params'), taskController.done);
router.get('/', taskController.getAll);
router.delete('/:id', validateSchema(IdSchema, 'params'), taskController.delete);
export default router