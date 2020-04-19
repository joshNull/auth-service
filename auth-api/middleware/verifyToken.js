const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { generateAccessToken, validateToken } = require('../utility/token')

dotenv.config()

async function verifyToken(req, res, next) {

    const accessToken = req.cookies['access-token']
    const refreshToken = req.cookies['refresh-token']

    if (!accessToken) return res.status(401).send({ sucessful: false, message: "Access Denied" })

    try {
        let decoded = await validateToken(accessToken, 'access-token')
        req.user_id = decoded.id
        next()
    } catch (accessTokenError) {
        if ("name" in accessTokenError && accessTokenError.name == "TokenExpiredError" && refreshToken) {
            validateToken(refreshToken, 'refresh-token')
                .then((decoded) => {
                    if (decoded) {
                        let newAccessToken = generateAccessToken({ id: decoded.id })
                        req.user_id = decoded.id

                        // Double check - res finsihed request and next is not triggered
                        res.cookie('access-token', newAccessToken, {})

                        next()
                    }
                }).catch((refreshTokenError) => {
                    console.log("Error : ", refreshTokenError.message)
                    res.status(401).json({ sucessful: false, message: "Access Denied" })
                })
        } else {
            console.log("Error : ", accessTokenError.message)
            res.status(401).json({ sucessful: false, message: "Access Denied" })
        }
    }
}

module.exports = {
    verifyToken
}