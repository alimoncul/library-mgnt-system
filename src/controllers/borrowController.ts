import { Request, Response } from 'express';
import { User, Book, BorrowedBook } from '../models';
import { Op } from 'sequelize';

/**
 * Borrows a book for a user if the book is not already borrowed.
 * Ensures both user and book exist and that the book isn't currently borrowed by the same user.
 * 
 * @param req - The HTTP request object containing the user and book IDs as URL parameters.
 * @param res - The HTTP response object used for sending back HTTP status codes and messages.
 * @returns Sends a 204 status code on successful borrowing, 404 if user or book not found, or 400 if the book is already borrowed.
 */
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

/**
 * Returns a book that a user has borrowed. It updates the borrow record to indicate the book has been returned,
 * records the user's rating, and recalculates the book's average rating.
 * 
 * @param req - The HTTP request object containing the user and book IDs as URL parameters, and the user's rating in the body.
 * @param res - The HTTP response object used for sending back HTTP status codes and messages.
 * @returns Sends a 204 status code on successful return, 404 if no active borrow record is found, or 500 if an error occurs.
 */
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
