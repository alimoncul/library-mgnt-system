import { Router } from 'express';
import resetController from '../controllers/resetController';

const router = Router();

router.post('/reset', resetController.resetDatabase); // implemented for testing purposes

export default router;
