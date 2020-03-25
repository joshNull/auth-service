const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    return Joi.object({
        username: Joi.string().min(10).required(),
        password: Joi.string().min(6).required()
    }).validate(data)
}

module.exports = {
    registerValidation
}