const router = require('express').Router()
const { userController } = require('../controller')

/**
 * @swagger
 * /user/{user_id}:
 *   get:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - User
 *     description: Send request with parameter to get a user or send empty parameter to get all
 *     parameters:
 *      - name: user_id
 *        description: User's ID
 *        in: path
 *        required: false
 *        type: integer
 *        allowEmptyValue: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:user_id?', userController.getUser)

/**
 * @swagger
 * /user:
 *   post:
 *     security:
 *      - AccessToken: []
 *     tags:
 *      - User
 *     description: Create User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       description: "User object"
 *       schema:
 *         type: object
 *         properties:
 *           first_name:
 *             type: string
 *           last_name:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *           first_name: John
 *           last_name: doe
 *           email: "test@test.com"
 *           password: "123456789"
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', userController.createUser)

module.exports = router