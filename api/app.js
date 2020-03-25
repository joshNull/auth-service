const express = require("express")
const app = express()
const routes = require('./routes')

const { swaggerUIServe, swaggerUISetup } = require('./docs/swagger')


app.use(express.json())

app.use('/api/user', routes.user)

app.use('/api-docs', swaggerUIServe, swaggerUISetup)

module.exports = app