const { database } = require("../tools")

const model = async () => {
    try {
        return await database.query(`CREATE TABLE user (
            id int NOT NULL AUTO_INCREMENT,
            username varchar(255),
            password varchar(255),
            date datetime,
            PRIMARY KEY (id)
        )`)
    } catch (error) {
        throw error
    }
}

const getUser = async (data) => {
    try {
        return await database.query("SELECT * FROM user where ?", data)
    } catch (error) {
        throw error
    }
}

const createUser = async (data) => {
    try {
        return await database.query("INSERT INTO user SET ?", data)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUser,
    createUser,
    model
}