import { Request, Response } from 'express';
import { User, Book, BorrowedBook } from '../models';
import { UserAttributes, UserInstance } from '../models/User';
import { BookDetails } from '../models/Book';

/**
 * Retrieves all users from the database and sorts them by name in ascending order.
 * @param req - The request object from Express, not used in this function.
 * @param res - The response object from Express used to return the users or an error message.
 */
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Fetches a single user by ID, including details about their borrowed books, categorized into 'past' and 'present'.
 * @param req - The request object from Express, containing the user ID as a URL parameter.
 * @param res - The response object from Express used to return the user's details or an error message.
 * @returns A JSON object with the user's details including borrowed books, or sends a 404 if the user is not found.
 */
const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk<UserAttributes & UserInstance>(req.params.id, {
            attributes: ['id', 'name'],
            include: [{
                model: Book,
                as: 'BorrowedBooks',
                attributes: ['name'],
                through: {
                    attributes: ['borrowedAt', 'returnedAt', 'rating']
                },
                required: false
            }]
        });

        if (user) {
            // Initialize the structured data object
            const structuredData = {
                id: user.id,
                name: user.name,
                books: {
                    past: [] as BookDetails[],
                    present: [] as BookDetails[]
                }
            };

            // Organize books into past and present
            user.BorrowedBooks?.forEach(book => {
                const bookDetails: BookDetails = {
                    name: book.name
                };

                if (book.BorrowedBook?.returnedAt) {
                    // If the book is returned, include the user's rating
                    bookDetails['userScore'] = book?.BorrowedBook?.rating || 0;
                    structuredData.books.past.push(bookDetails);
                } else {
                    // If the book is not yet returned, it's present
                    structuredData.books.present.push(bookDetails);
                }
            });

            res.json(structuredData);

        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

/**
 * Creates a new user in the database using the data provided in the request body.
 * @param req - The request object from Express, containing the new user's data in the body.
 * @param res - The response object from Express used to send the newly created user's details or an error message.
 * @returns A JSON object of the newly created user or a 500 error if an issue occurs during creation.
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { getAllUsers, getUserById, createUser };
