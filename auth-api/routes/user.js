const router = require('express').Router()
const { userController } = require('../controller')

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *      - User
 *     description: Get user details
 *     responses:
 *       200:
 */
router.get('/:user_id?', userController.getUser)

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *      - User
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: json
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/', userController.createUser)

module.exports = router