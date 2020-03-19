const router = require("express").Router()

router.post('/register', (req, res) => {

    res.send("REGISTER.")

})

router.get('/register', (req, res) => {

    res.send("GET REGISTER.")

})

module.exports = router