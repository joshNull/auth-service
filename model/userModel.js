const { database } = require("../tools")

const createUser = async (data) => {
    try {
        let result = await database.query("INSERT INTO user SET ?", data)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser
}