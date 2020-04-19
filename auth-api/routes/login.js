const router = require('express').Router()
const { loginController, userController } = require('../controller')

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *      - Public API
 *     description: Login to the application
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
 *         description: login
 */
router.post('/register', userController.createUser)

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *      - Public API
 *     description: Login to the application
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
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *           email: "test@test.com"
 *           password: "123456789"
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', loginController.login)

module.exports = router