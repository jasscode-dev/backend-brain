
import { Router } from "express";
import { routineController } from "src/composition";
import { validateSchema } from "@middlewares";
import { IdSchema } from "src/modules/routine/validators";

const router = Router();

router.get('/user/:userId', routineController.getAllByUser);
router.get('/:id', validateSchema(IdSchema, 'params'), routineController.getById);

export default router;
