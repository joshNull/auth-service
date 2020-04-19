const router = require('express').Router()
const { permissionController } = require('../controller')

 /**
 * @swagger
 * /permission/{permission_id}:
 *   get:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Permission
 *     description: Send request with parameter to get a permission or send empty parameter to get all
 *     parameters:
 *      - name: permission_id
 *        description: Permission's ID
 *        in: path
 *        required: false
 *        type: integer
 *        format: "int64"
 *        allowEmptyValue: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:permission_id?', permissionController.getPermission)

/**
 * @swagger
 * /permission:
 *   post:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Permission
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       description: "Create a permission"
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *         example:
 *           name: Create Product
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', permissionController.createPermission)

/**
 * @swagger
 * /permission/{permission_id}:
 *   patch:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Permission
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: permission_id
 *        description: Permission's ID
 *        in: path
 *        type: integer
 *      - in: body
 *        name: body
 *        description: "Update a permission"
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *          example:
 *            name: Delete a product
 *     responses:
 *       200:
 *         description: Success
 */
router.patch('/:permission_id', permissionController.updatePermission)

/**
 * @swagger
 * /permission/{permission_id}:
 *   delete:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Permission
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: permission_id
 *        description: Permissions's ID
 *        in: path
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:permission_id', permissionController.deletePermission)

/**
 * @swagger
 * /permission/assign-to-role/{permission_id}:
 *   post:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Permission
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: permission_id
 *        description: Permission's ID
 *        in: path
 *        type: integer
 *      - in: body
 *        name: body
 *        description: "Assign permission to role"
 *        schema:
 *          type: object
 *          properties:
 *            role_id:
 *              type: integer
 *          example:
 *            role_id: 1
 *     responses:
 *       200:
 *         description: login
 */
router.post('/assign-to-role/:permission_id', permissionController.assignPermissionToRole)

/**
 * @swagger
 * /permission/assign-to-role/{permission_id}:
 *   delete:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Permission
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: permission_id
 *        description: Permission's ID
 *        in: path
 *        type: integer
 *      - in: body
 *        name: body
 *        description: "Assign permission to role"
 *        schema:
 *          type: object
 *          properties:
 *            role_id:
 *              type: integer
 *          example:
 *            role_id: 1
 *     responses:
 *       200:
 *         description: login
 */
router.delete('/assign-to-role/:permission_id', permissionController.removePermissionFromRole)

module.exports = router