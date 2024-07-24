import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateRequest = (schema: Joi.Schema, property: 'body' | 'params' = 'body') =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return res.status(400).json({ message: error.details.map(detail => detail.message) });
        }
        next();
    };

export default validateRequest;
