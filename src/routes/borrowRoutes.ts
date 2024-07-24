import { Router } from 'express';
import borrowController from '../controllers/borrowController';
import borrowValidation from '../validations/borrowValidation';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.post('/users/:userId/borrow/:bookId', validateRequest(borrowValidation.borrowBookSchema, 'params'), borrowController.borrowBook);
router.post('/users/:userId/return/:bookId', validateRequest(borrowValidation.returnBookSchemaBody), validateRequest(borrowValidation.returnBookSchemaParams, 'params'), borrowController.returnBook);

export default router;
