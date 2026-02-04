import { Router } from 'express';
import taskRouter from "./task.routes"
import userRouter from "./user.routes"

const router = Router();



router.use("/task", taskRouter)
router.use("/user", userRouter)
export default router
