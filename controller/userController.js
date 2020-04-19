const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const { user, role } = require('../models')
const { userSchema } = require('.././validation')

dotenv.config()

async function getUser(req, res) {
    try {
        let params = req.params.user_id ? { id: req.params.user_id } : {}

        let result = await user.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email'],
            where: { ...params },
            include: [{
                model: role,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }]
        })

        res.json({ successful: true, data: result })
    } catch (error) {
        res.json({ successful: false, message: error.message })
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
        if (error) throw new Error(error.details[0].message)

        //Check if username exist
        let account = await user.findAll({
            attributes: ['email'],
            where: {
                email: req.body.email
            }
        });

        if (account.length > 0) throw new Error("Username already exist")

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

        console.log("Function createUser : ", result)

        res.json({
            successful: true,
            message: "Successfully register an account"
        })

    } catch (error) {
        res.json({ successful: false, message: error.message })
    }
}

module.exports = {
    getUser,
    createUser
}