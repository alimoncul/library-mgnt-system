import { Router } from 'express';
import borrowController from '../controllers/borrowController';

const router = Router();

router.post('/users/:id/borrow/:bookId', borrowController.borrowBook);
router.post('/users/:id/return/:bookId', borrowController.returnBook);

export default router;
