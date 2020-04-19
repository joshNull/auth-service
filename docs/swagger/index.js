const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerDefinition = {
    info: {
        title: 'Auth Service',
        version: '1.0.0',
        description: 'Auth API'
    },
    // securityDefinitions: {
    //     AccessToken: {
    //         type: "apiKey",
    //         name: "access-token",
    //         in: "header",
    //         description: "Requests should include an 'access-token' in header."
    //     }
    // },
    securityDefinitions: {
        AccessToken: {
            type: "apiKey",
            name: "access-token",
            in: "cookie",
            description: "Please use the login API and will send cookies back to browser."
        }
    },
    tags: [
        {
            name: "Public API",
            description: "Available without token"
        },
        {
            name: "User",
            description: "User APIs"
        },
        {
            name: "Role",
            description: "User's role"
        },
        {
            name: "Permission",
            description: "Describe what roles can do"
        }
    ],
    basePath: "/api",

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