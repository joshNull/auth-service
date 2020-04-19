const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerDefinition = {
    info: {
        title: 'User Service',
        version: '1.0.0',
        description: 'User API'
    },
    tags: [
        {
            name: "User",
            description: "User APIs"
        },
        {
            name: "Role",
            description: "Role APIs"
        }
    ],
    basePath: "/api"
}

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = {
    swaggerUIServe: swaggerUi.serve,
    swaggerUISetup: swaggerUi.setup(swaggerSpec)
}