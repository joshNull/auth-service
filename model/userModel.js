const { database } = require("../tools")

const getUser = async (data) => {
    try {
        let result = await database.query("SELECT * FROM user where ?", data)
        return result
    } catch (error) {
        throw error
    }
}

const createUser = async (data) => {
    try {
        let result = await database.query("INSERT INTO user SET ?", data)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUser,
    createUser
}