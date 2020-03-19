const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string().min(10).required(),
    password: Joi.string().min(6).required()
})

module.exports = schema
