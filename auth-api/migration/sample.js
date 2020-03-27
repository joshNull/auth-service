const { database } = require("../tools")

const schema = async () => {
    try {
        return await database.query(`
            CREATE TABLE sample (
                PersonID int,
                LastName varchar(255),
                FirstName varchar(255),
                Address varchar(255),
                City varchar(255)
            )`
        )
    } catch (error) {
        throw error
    }
}

module.exports = {
    schema
}