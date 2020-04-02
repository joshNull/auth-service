const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const { User } = require('../models')
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
        if (error) throw { "error_message": error.details[0].message }

        let account = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
            where: {
                email: req.body.email
            }
        });

        //Check if username don't exist
        if (account.length <= 0) throw { "error_message": "Email don't exist" }

        //Validate login
        const validatePassword = await bcrypt.compare(req.body.password, account[0]['dataValues']['password'])
        if (!validatePassword) throw { "error_message": "Password incorrect" }

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

        delete account[0]['dataValues']['password']

        res.json({
            successful: true,
            data: account[0]['dataValues']
        })

    } catch (error) {
        console.log("ERROR", error)
        res.status(401).json({ successful: false })
    }
}

module.exports = {
    login
}
