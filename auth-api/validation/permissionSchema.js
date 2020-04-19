const Joi = require('@hapi/joi');

const getPermissionValidation = (data) => {
    return Joi.object({
        permission_id: Joi.number()
    }).validate(data)
}

const createPermissionValidation = (data) => {
    return Joi.object({
        name: Joi.string().required(),
    }).validate(data)
}

const updatePermissionValidation = (data) => {
    return Joi.object({
        name: Joi.string().required(),
        role_id: Joi.number().required(),
    }).validate(data)
}

const deletePermissionValidation = (data) => {
    return Joi.object({
        permission_id: Joi.number().required()
    }).validate(data)
}

const rolePermissionValidation = (data) => {
    return Joi.object({
        role_id: Joi.number().required(),
        permission_id: Joi.number().required(),
    }).validate(data)
}

module.exports = {
    getPermissionValidation,
    createPermissionValidation,
    updatePermissionValidation,
    deletePermissionValidation,
    rolePermissionValidation
}