const { database } = require("../tools")

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
    createUser
}