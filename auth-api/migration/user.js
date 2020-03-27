const { database } = require("../tools")

const schema = async () => {
    try {
        return await database.query(`
            CREATE TABLE user (
                id int NOT NULL AUTO_INCREMENT,
                username varchar(255),
                password varchar(255),
                date datetime,
                PRIMARY KEY (id)
            )`
        )
    } catch (error) {
        throw error
    }
}

module.exports = {
    schema
}