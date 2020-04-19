const Joi = require('@hapi/joi');

const getRoleValidation = (data) => {
    return Joi.object({
        role_id: Joi.number()
    }).validate(data)
}

const createRoleValidation = (data) => {
    return Joi.object({
        name: Joi.string().required(),
    }).validate(data)
}

const updateRoleValidation = (data) => {
    return Joi.object({
        name: Joi.string().required(),
        role_id: Joi.number().required(),
    }).validate(data)
}

const deleteRoleValidation = (data) => {
    return Joi.object({
        role_id: Joi.number().required()
    }).validate(data)
}

const roleUserValidation = (data) => {
    return Joi.object({
        user_id: Joi.number().required(),
        role_id: Joi.number().required(),
    }).validate(data)
}

module.exports = {
    getRoleValidation,
    createRoleValidation,
    updateRoleValidation,
    deleteRoleValidation,
    roleUserValidation
}