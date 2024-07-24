import Joi from 'joi';

const createUserSchema = Joi.object({
    name: Joi.string().required().min(3).max(30)
});

export default {
    createUserSchema
};
