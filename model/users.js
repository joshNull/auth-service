const db = require("../tools/database")

const createUser = async (data) => {
    try {
        let result = await db("INSERT INTO user SET ?", data)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser
}