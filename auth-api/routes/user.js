const router = require('express').Router()
const { userController } = require('../controller')

/**
 * @swagger
 * /user/register:
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
router.post('/register', userController.register)

/**
 * @swagger
 * /user/login:
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
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', userController.login)

// MY TESTER

const { verifyToken } = require('../tools')

router.get('/', verifyToken.verifyToken, (req, res) => {

    res.send("HELLO WORLD")
})

module.exports = router