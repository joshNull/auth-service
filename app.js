const express = require("express")
const app = express()

const routes = require('./routes')

app.use('/api/user', routes)

module.exports = app