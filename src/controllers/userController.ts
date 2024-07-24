import { Request, Response } from 'express';
import { User, Book } from '../models';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'name'], // User attributes you want to fetch
            include: [{
                model: Book,
                as: 'BorrowedBooks',
                attributes: ['id', 'name'], // Attributes of the book you want to include
                through: {
                    attributes: ['borrowedAt', 'returnedAt', 'rating'], // Join table attributes
                    where: {} // Optional: conditions on the join table
                },
                required: false // This ensures even users without borrowed books are returned
            }]
        });
        if (user) {
            res.json(user);
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
