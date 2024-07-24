import Joi from 'joi';

const borrowBookSchema = Joi.object({
    userId: Joi.number().required(),
    bookId: Joi.number().required()
});

const returnBookSchemaParams = Joi.object({
    userId: Joi.number().required(),
    bookId: Joi.number().required()
});

const returnBookSchemaBody = Joi.object({
    score: Joi.number().required().min(1).max(10)
});

export default {
    borrowBookSchema,
    returnBookSchemaParams,
    returnBookSchemaBody
};
