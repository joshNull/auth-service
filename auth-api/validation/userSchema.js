const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    return Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }).validate(data)
}

module.exports = {
    registerValidation
}