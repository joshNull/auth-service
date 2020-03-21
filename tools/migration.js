const migrationDirectory = '/Users/josh/Desktop/My Projects/user-service/migration/' // For enhancement
const fs = require('fs')

const migration = async () => {
    try {
        // console.log(process.argv.splice(1)) insert parameter in npm script

        let schema = fs.readdirSync(migrationDirectory)
            .map(file => require(migrationDirectory + file.split(".").shift())) // Get each modules in migration directory
            .filter((file) => file.schema) // Filter modules that only have schema object
            .map(file => file.schema()) // Get only schema function

        console.log("Number of tables : ", schema.length)

        let result = await Promise.all(schema)

        console.log("RESULT : ", result)

        process.exit(0) // Clean exit in terminal
    } catch (error) {
        let { sqlMessage } = error
        console.log("ERROR : ", sqlMessage)
        process.exit(0)
    }
}

module.exports = {
    migration
}