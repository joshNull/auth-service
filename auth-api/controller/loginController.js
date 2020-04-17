const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const { user } = require('../models')
const { userSchema } = require('.././validation')

dotenv.config()

/**
 * Login Controller for a post method route.
 * 
 * @param {object} req request
 * @param {object} res response
 * @description Login the user. Set access and refresh token as cookies. 
 * @return {void} Send route a response in a JSON format.
 */
async function login(req, res) {
    try {
        // Validate request
        let { error } = userSchema.loginValidation(req.body)
        if (error) return res.status(401).json({ successful: false, message: "Incorrect email or password" })

        let account = await user.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'password'],
            where: {
                email: req.body.email
            }
        });

        //Check if username don't exist
        if (account.length <= 0) return res.status(401).json({ successful: false, message: "Incorrect email or password" })

        //Validate login
        const validatePassword = await bcrypt.compare(req.body.password, account[0]['dataValues']['password'])
        if (!validatePassword) return res.status(401).json({ successful: false, message: "Incorrect email or password" })

        //Create token
        const refreshToken = jwt.sign({
            id: account[0]['dataValues']['id']
        },
            process.env.TOKEN_SECRET, {
            expiresIn: '1h',
        })

        const accessToken = jwt.sign({
            id: account[0]['dataValues']['id']
        },
            process.env.TOKEN_SECRET, {
            expiresIn: 60, //1 minute
        })

        // Send response
        res.cookie('refresh-token', refreshToken, {
            // path: '/user',
            httpOnly: true // This token is intended for server use only
        })

        res.cookie('access-token', accessToken, {
            // path: '/user'
            overwrite: true
        })

        delete account[0]['dataValues']['id']
        delete account[0]['dataValues']['password']

        res.json({
            successful: true,
            data: account[0]['dataValues']
        })

    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    login
}
