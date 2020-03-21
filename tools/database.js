const database = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const connection = database.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD
});

const query = (query, parameters) => {
    return new Promise((res, rej) => {
        let mysql2 = connection.query(query, parameters, function (error, results, fields) {
            if (error) rej(error)
            res(results)
        });
        // console.log("SQL : ", mysql2.sql)
    })
}

const migrate = async () => {
    try {
        const modelDirectory = '/Users/josh/Desktop/My Projects/user-service/model/' // For enhancement
        const fs = require('fs')
    
        // console.log(process.argv.splice(1)) insert parameter in npm script
    
        let files = fs.readdirSync(modelDirectory)
        .map(file => require(modelDirectory + file.split(".").shift()))
        .filter((file) => file.model) // Filter modules that only have model object
        .map(file => file.model()) // Get only models 
    
        console.log("MODELS : ", files)
    
        let result = await Promise.all(files)
    
        console.log("RESULT : ", result)
    
        process.exit(0) // Clean exit in terminal
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

module.exports = {
    connection,
    query,
    migrate
}