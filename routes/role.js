const router = require('express').Router()
const { roleController } = require('../controller')

/**
 * @swagger
 * /role/{role_id}:
 *   get:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Role
 *     description: Send request with parameter to get a role or send empty parameter to get all
 *     parameters:
 *      - name: role_id
 *        description: Role's ID
 *        in: path
 *        required: false
 *        type: integer
 *        allowEmptyValue: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:role_id?', roleController.getRole)

/**
 * @swagger
 * /role:
 *   post:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Role
 *     description: Create Role
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       description: "Create a role"
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *         example:
 *           name: Admin
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', roleController.createRole)

/**
 * @swagger
 * /role/{role_id}:
 *   patch:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Role
 *     description: Update a role
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: role_id
 *        description: Role's ID
 *        in: path
 *        type: integer
 *      - in: body
 *        name: body
 *        description: "Update a role"
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *          example:
 *            name: Administrator
 *     responses:
 *       200:
 *         description: Success
 */
router.patch('/:role_id', roleController.updateRole)

/**
 * @swagger
 * /role/{role_id}:
 *   delete:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Role
 *     description: Delete a role
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: role_id
 *        description: Role's ID
 *        in: path
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:role_id', roleController.deleteRole)

/**
 * @swagger
 * /role/assign-to-user/{role_id}:
 *   post:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Role
 *     description: Assign role to user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: role_id
 *        description: Role's ID
 *        in: path
 *        type: integer
 *      - in: body
 *        name: body
 *        description: "Assign role to user"
 *        schema:
 *          type: object
 *          properties:
 *            user_id:
 *              type: integer
 *          example:
 *            user_id: 1
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/assign-to-user/:role_id', roleController.assignRoleToUser)

/**
 * @swagger
 * /role/assign-to-user/{role_id}:
 *   delete:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - Role
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: role_id
 *        description: Role's ID
 *        in: path
 *        type: integer
 *      - in: body
 *        name: body
 *        description: "Assign role to user"
 *        schema:
 *          type: object
 *          properties:
 *            user_id:
 *              type: integer
 *          example:
 *            user_id: 1
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/assign-to-user/:role_id', roleController.removeRoleFromUser)

module.exports = router