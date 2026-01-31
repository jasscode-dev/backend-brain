import { Router } from 'express';
import { createTaskController } from '@controllers';

export const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.post('/task', createTaskController);
