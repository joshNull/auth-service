const { permissionSchema } = require('.././validation')
const { permission, role_permission, role } = require('../models')
const { ErrorHandler, errorFilter } = require('../utility')

async function getPermission(req, res) {
    try {
        let { error } = permissionSchema.getPermissionValidation(req.params)
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let params = req.params.permission_id ? { id: req.params.permission_id } : {}

        let result = await permission.findAll({
            attributes: ['id', 'name', 'date_created', 'date_updated'],
            where: { ...params }
        })

        res.json({ successful: true, data: result })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function createPermission(req, res) {
    try {
        let { error } = permissionSchema.createPermissionValidation(req.body)
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let checker = await permission.findAll({ attributes: ['id'], where: { name: req.body.name } })

        if (checker.length > 0) throw new ErrorHandler("Permission alredy exist")

        let result = await permission.create({ name: req.body.name })

        console.log("Function createPermission : ", result)

        res.json({ successful: true, message: "Successfully created permission" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function updatePermission(req, res) {
    try {
        let { error } = permissionSchema.updatePermissionValidation({ ...req.body, ...req.params })
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let checker = await permission.findAll({ attributes: ['id'], where: { id: req.params.permission_id } })
        if (checker.length <= 0) throw new ErrorHandler("Permission not exist")

        let result = await permission.update({ name: req.body.name }, { where: { id: req.params.permission_id } })

        console.log("Function updateRole : ", result)

        res.json({ successful: true, message: "Successfully updated a permission" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function deletePermission(req, res) {
    try {
        let { error } = permissionSchema.deletePermissionValidation(req.params)
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let checker = await permission.findAll({ attributes: ['id'], where: { id: req.params.permission_id } })
        if (checker.length <= 0) throw new ErrorHandler("Permission not exist")

        await permission.destroy({ where: { id: req.params.permission_id } })

        res.json({ successful: true, message: "Successfully deleted a permission" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function assignPermissionToRole(req, res) {
    try {
        let { error } = permissionSchema.rolePermissionValidation({ ...req.body, ...req.params })
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let permissionChecker = await permission.findAll({ attributes: ['id'], where: { id: req.params.permission_id } })
        if (permissionChecker.length <= 0) throw new ErrorHandler("Permission not exist")

        let roleChecker = await role.findAll({ attributes: ['id'], where: { id: req.body.role_id } })
        if (roleChecker.length <= 0) throw new ErrorHandler("Role not exist")

        let rolePermissionChecker = await role_permission.findAll({ attributes: ['id'], where: { role_id: req.body.role_id, permission_id: req.params.permission_id } })
        if (rolePermissionChecker.length > 0) throw new ErrorHandler("Assigned permission already exist")

        let result = await role_permission.create({
            role_id: req.body.role_id,
            permission_id: req.params.permission_id
        })

        console.log("Function assignPermissionToRole : ", result)

        res.json({ successful: true, message: "Successfully assigned permission to role" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

async function removePermissionFromRole(req, res) {
    try {
        let { error } = permissionSchema.rolePermissionValidation({ ...req.body, ...req.params })
        if (error) throw new ErrorHandler("Invalid Parameter", error.details[0].message)

        let permissionChecker = await permission.findAll({ attributes: ['id'], where: { id: req.params.permission_id } })
        if (permissionChecker.length <= 0) throw new ErrorHandler("Permission not exist")

        let roleChecker = await role.findAll({ attributes: ['id'], where: { id: req.body.role_id } })
        if (roleChecker.length <= 0) throw new ErrorHandler("Role not exist")

        let rolePermissionChecker = await role_permission.findAll({ attributes: ['id'], where: { role_id: req.body.role_id, permission_id: req.params.permission_id } })
        if (rolePermissionChecker.length <= 0) throw new ErrorHandler("Assign permission to role does not exist")

        let result = await role_permission.destroy({
            where: { role_id: req.body.role_id, permission_id: req.params.permission_id }
        })

        console.log("Function removePermissionFromRole : ", result)

        res.json({ successful: true, message: "Successfully removed permission to role" })
    } catch (error) {
        res.json({ successful: false, message: errorFilter(error) })
    }
}

module.exports = {
    getPermission,
    createPermission,
    updatePermission,
    deletePermission,
    assignPermissionToRole,
    removePermissionFromRole
}