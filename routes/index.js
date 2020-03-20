const router = require('express').Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { userModel } = require('../model')
const { userSchema } = require('../validation')

dotenv.config()

router.post('/register', async (req, res) => {

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

        res.json(result)

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(400).json(error)
    }

})

router.post('/login', async (req, res) => {

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
        const token = jwt.sign({ id: user[0].id }, process.env.TOKEN_SECRET)

        res.header('auth-token', token).json(user)

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(400).json(error)
    }

})

// MY TESTER

// const { verifyToken } = require('../tools')

// router.get('/', verifyToken.verifyToken, (req, res) => {
//     res.send("HELLO WORLD")
// })

module.exports = router