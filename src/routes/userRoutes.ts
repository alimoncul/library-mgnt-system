import { Router } from 'express';
import userController from '../controllers/userController';
import userValidation from '../validations/userValidation';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', validateRequest(userValidation.createUserSchema), userController.createUser);

export default router;
