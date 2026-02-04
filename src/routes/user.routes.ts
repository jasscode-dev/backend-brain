import { Router } from "express";
import * as authController from "src/modules/user/controllers"
const router = Router();

router.post('/login', authController.loginController);
router.post('/register', authController.registerController);

export default router