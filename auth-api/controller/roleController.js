const { roleSchema } = require('.././validation')
const { role, user_role, user, permission } = require('../models')
const { ErrorHandler, errorFilter } = require('../utility')

async function getRole(req, res) {
    try {
        let { error } = roleSchema.getRoleValidation(req.params)
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let params = req.params.role_id ? { id: req.params.role_id } : {}

        let result = await role.findAll({
            attributes: ['id', 'name', 'date_created', 'date_updated'],
            where: { ...params },
            include: [{
                model: permission,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }]
        })

        res.json({ successful: true, data: result })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function createRole(req, res) {
    try {
        let { error } = roleSchema.createRoleValidation(req.body)
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let checker = await role.findAll({ attributes: ['id'], where: { name: req.body.name } })

        if (checker.length > 0) throw new ErrorHandler("Role alredy exist")

        let result = await role.create({ name: req.body.name })

        console.log("Function createRole : ", result)

        res.json({ successful: true, message: "Successfully created role" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function updateRole(req, res) {
    try {
        let { error } = roleSchema.updateRoleValidation({ ...req.body, ...req.params })
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let checker = await role.findAll({ attributes: ['id'], where: { id: req.params.role_id } })
        if (checker.length <= 0) throw new ErrorHandler("Role not exist")

        let result = await role.update({ name: req.body.name }, { where: { id: req.params.role_id } })

        console.log("Function updateRole : ", result)

        res.json({ successful: true, message: "Successfully updated a role" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function deleteRole(req, res) {
    try {
        let { error } = roleSchema.deleteRoleValidation(req.params)
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let checker = await role.findAll({ attributes: ['id'], where: { id: req.params.role_id } })
        if (checker.length <= 0) throw new ErrorHandler("Role not exist")

        await role.destroy({ where: { id: req.params.role_id } })

        res.json({ successful: true, message: "Successfully deleted a role" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function assignRoleToUser(req, res) {
    try {
        let { error } = roleSchema.roleUserValidation({ ...req.body, ...req.params })
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let roleChecker = await role.findAll({ attributes: ['id'], where: { id: req.params.role_id } })
        if (roleChecker.length <= 0) throw new ErrorHandler("Role not exist")

        let userChecker = await user.findAll({ attributes: ['id'], where: { id: req.body.user_id } })
        if (userChecker.length <= 0) throw new ErrorHandler("User not exist")

        let userRoleChecker = await user_role.findAll({ attributes: ['id'], where: { user_id: req.body.user_id, role_id: req.params.role_id } })
        if (userRoleChecker.length > 0) throw new ErrorHandler("Assigned role already exist")

        let result = await user_role.create({
            user_id: req.body.user_id,
            role_id: req.params.role_id
        })

        console.log("Function assignRoleToUser : ", result)

        res.json({ successful: true, message: "Successfully created role" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function removeRoleFromUser(req, res) {
    try {
        let { error } = roleSchema.roleUserValidation({ ...req.body, ...req.params })
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let roleChecker = await role.findAll({ attributes: ['id'], where: { id: req.params.role_id } })
        if (roleChecker.length <= 0) throw new ErrorHandler("Role not exist")

        let userChecker = await user.findAll({ attributes: ['id'], where: { id: req.body.user_id } })
        if (userChecker.length <= 0) throw new ErrorHandler("User not exist")

        let userRoleChecker = await user_role.findAll({ attributes: ['id'], where: { user_id: req.body.user_id, role_id: req.params.role_id } })
        if (userRoleChecker.length <= 0) throw new ErrorHandler("Assign role to user does not exist")

        let result = await user_role.destroy({
            where: { role_id: req.params.role_id, user_id: req.body.user_id }
        })

        console.log("Function assignRoleToUser : ", result)

        res.json({ successful: true, message: "Successfully removed role from user" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

module.exports = {
    getRole,
    createRole,
    updateRole,
    deleteRole,
    assignRoleToUser,
    removeRoleFromUser
}