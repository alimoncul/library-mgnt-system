import Joi from 'joi';

const createBookSchema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    score: Joi.number().optional().min(0).max(10)
});

export default {
    createBookSchema
};
