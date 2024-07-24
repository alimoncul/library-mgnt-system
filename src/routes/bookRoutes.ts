import { Router } from 'express';
import bookController from '../controllers/bookController';
import validateRequest from '../middlewares/validateRequest';
import bookValidation from '../validations/bookValidation';

const router = Router();

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', validateRequest(bookValidation.createBookSchema), bookController.createBook);

export default router;
