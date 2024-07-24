import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);

export default router;
