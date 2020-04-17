const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const { user } = require('../models')
const { userSchema } = require('.././validation')

dotenv.config()

async function getUser(req, res) {
    try {
        console.log("USER ID : ", req.user_id)

        let [result] = await user.findAll({
            attributes: ['first_name', 'last_name', 'email'],
            where: {
                id: req.user_id
            }
        })
        res.json({ successful: true, data: result })

    } catch (error) {
        console.log("error : ", error)
        res.json({ successful: false })
    }
}

/**
 * Register controller for a post method route
 * 
 * @param {object} req request
 * @param {object} res response
 * @return {void} 
 * Send response to clientside in a JSON format.
 */
async function createUser(req, res) {
    try {
        // Validate request
        let { error } = userSchema.registerValidation(req.body)
        if (error) throw { "error_message": error.details[0].message }

        //Check if username exist
        let account = await user.findAll({
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
        let result = await user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password,
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

module.exports = {
    getUser,
    createUser
}