import { Request, Response } from 'express';
import { sequelize } from '../models';

// implemented for testing purposes
const resetDatabase = async (req: Request, res: Response): Promise<void> => {
    try {
        await sequelize.drop();
        await sequelize.sync({ force: true }); // Optionally recreate the tables

        res.json({ message: "database is wiped" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { resetDatabase };
