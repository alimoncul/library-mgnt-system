// src/controllers/bookController.ts
import { Request, Response } from 'express';
import Book from '../models/Book';

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

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

const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { getAllBooks, getBookById, createBook };
