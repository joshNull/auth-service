const router = require('express').Router()
const { userModel } = require('../model')
const { userSchema } = require('../validation')

router.post('/register', async (req, res) => {

    try {
        const { error } = userSchema.validate(req.body)
        if (error) throw { "error_message": error.details[0].message }

        let result = await userModel.createUser(req.body)

        res.json(result)

    } catch (error) {

        res.status(400).json(error)

    }

})

// router.get('/register', (req, res) => {

//     res.send("GET REGISTER.")

// })

module.exports = router