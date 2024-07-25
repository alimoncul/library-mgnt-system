import { Request, Response } from 'express';
import { User, Book, BorrowedBook } from '../models';
import { UserAttributes, UserInstance } from '../models/User';
import { BookDetails } from '../models/Book';

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

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { getAllUsers, getUserById, createUser };
