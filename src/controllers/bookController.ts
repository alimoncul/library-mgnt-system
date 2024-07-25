import { Request, Response } from 'express';
import { Book } from '../models';

/**
 * Retrieves all books from the database, sorted alphabetically by name.
 * Certain fields like 'score' are excluded from the output.
 * @param req The request object from Express.
 * @param res The response object from Express. Returns a JSON list of books.
 */
const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.findAll({
            order: [
                ['name', 'ASC']
            ],
            attributes: {
                exclude: ['score']  // Excludes these fields from the results
            }
        });
        res.json(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Fetches a single book by its ID from the database.
 * @param req The request object, containing the book's ID in the route parameters.
 * @param res The response object from Express. Returns the book as JSON if found, otherwise sends a 404 error.
 */
const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Creates a new book in the database using the data provided in the request body.
 * @param req The request object from Express, containing the book data in its body.
 * @param res The response object from Express. Sends a 201 status code on successful creation.
 */
const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        await Book.create(req.body);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { getAllBooks, getBookById, createBook };
