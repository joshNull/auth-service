const express = require("express")
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const { verifyToken } = require('./middleware')
const { swaggerUIServe, swaggerUISetup } = require('./docs/swagger')

app.use('/api-docs', swaggerUIServe, swaggerUISetup)

// const whitelist = [
//     'http://localhost:3000',
//     'http://localhost:8080'
// ]

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true
// }

// app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUIServe, swaggerUISetup)
app.use('/api', routes.login)

// Protected routes
app.use('/api/user', verifyToken, routes.user)
app.use('/api/role', verifyToken, routes.role)
app.use('/api/permission', verifyToken, routes.permission)

module.exports = app