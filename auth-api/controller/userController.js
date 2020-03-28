const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { User } = require('../models')
const { userSchema } = require('.././validation')

dotenv.config()

/**
 * Register controller for a post method route
 * 
 * @param {object} req request
 * @param {object} res response
 * @return {void} 
 * Send response to clientside in a JSON format.
 */
async function register(req, res) {
    try {
        // Validate request
        let { error } = userSchema.registerValidation(req.body)
        if (error) throw { "error_message": error.details[0].message }

        //Check if username exist
        let account = await User.findAll({
            attributes: ['email'],
            where: {
                email: req.body.email
            }
        });

        if (account.length > 0) throw { "error_message": "Username already exist" }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        //Create user
        let result = await User.create({
            firstName: req.body.firstName, // not yet required
            lastName: req.body.lastName, // not yet required
            email: req.body.email,
            password: password,
            createdAt: ""
        })

        console.log("Register : ", result)

        res.json({
            successful: true,
            message: "Successfully register an account"
        })

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(400).json(error)
    }

}

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
        let { error } = userSchema.registerValidation(req.body)
        if (error) throw { "error_message": error.details[0].message }

        let account = await User.findAll({
            attributes: ['id', 'email', 'password'],
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

        res.json({
            successful: true,
            message: "Successfully logged in"
        })

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(400).json(error)
    }
}

module.exports = {
    register,
    login
}
