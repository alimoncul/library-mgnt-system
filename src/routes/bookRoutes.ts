import { Router } from 'express';
import bookController from '../controllers/bookController';

const router = Router();

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);

export default router;
