import { Request, Response } from 'express';
import { User, Book, BorrowedBook } from '../models';
import { Op } from 'sequelize';

const borrowBook = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            res.status(404).send('User or Book not found');
            return;
        }

        const existingBorrow = await BorrowedBook.findOne({
            where: { userId, bookId, returnedAt: null },
        });

        if (existingBorrow) {
            res.status(400).send('Book is already borrowed by this user');
            return;
        }

        await BorrowedBook.create({ userId, bookId, borrowedAt: new Date() });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const returnBook = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);
    const score = req.body.score;

    try {
        const borrowRecord = await BorrowedBook.findOne({
            where: { userId, bookId, returnedAt: null },
        });

        if (!borrowRecord) {
            res.status(404).send('No active borrow record found for this book and user');
            return;
        }

        borrowRecord.returnedAt = new Date();
        borrowRecord.rating = score;
        await borrowRecord.save();

        const allRatings = await BorrowedBook.findAll({
            where: { bookId, rating: { [Op.not]: null } },
            attributes: ['rating'],
        });

        let averageScore =
            allRatings.reduce((sum, record) => sum + (record.rating || 0), 0) / allRatings.length;

        const book = await Book.findByPk(bookId);
        if (book) {
            book.score = averageScore;
            await book.save();
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { borrowBook, returnBook };
