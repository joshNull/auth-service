const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const { User } = require('../models')
const { userSchema } = require('.././validation')

dotenv.config()

async function getUser(req, res) {
    try {
        console.log("USER ID : ", req.user_id)

        let [result] = await User.findAll({
            attributes: ['firstName', 'lastName', 'email'],
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

module.exports = {
    getUser,
    createUser
}