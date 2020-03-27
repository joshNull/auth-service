const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { userModel } = require('.././model')
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
        let user = await userModel.getUser({ "username": req.body.username })
        if (user.length > 0) throw { "error_message": "Username already exist" }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        //Create user
        let result = await userModel.createUser({
            username: req.body.username,
            password: password
        })

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

        let user = await userModel.getUser({ "username": req.body.username })

        //Check if username don't exist
        if (user.length <= 0) throw { "error_message": "Email don't exist" }

        //Validate login
        const validatePassword = await bcrypt.compare(req.body.password, user[0].password)
        if (!validatePassword) throw { "error_message": "Password incorrect" }

        //Create token
        const refreshToken = jwt.sign({
            id: user[0].id
        },
            process.env.TOKEN_SECRET, {
            expiresIn: '1h',
        })

        const accessToken = jwt.sign({
            id: user[0].id
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
