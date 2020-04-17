const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { generateAccessToken, validateToken } = require('../utility/token')

dotenv.config()

async function verifyToken(req, res, next) {

    const accessToken = req.cookies['access-token']
    const refreshToken = req.cookies['refresh-token']

    if (!accessToken) return res.status(401).send("Access Denied.")

    try {
        let decoded = await validateToken(accessToken, 'access-token')
        req.user_id = decoded.id
        console.log("-- ACCESS TOKEN ---", decoded)
        next()
    } catch (accessTokenError) {
        if ("name" in accessTokenError && accessTokenError.name == "TokenExpiredError" && refreshToken) {
            console.log("-- REFRESH TOKEN ---", accessTokenError)

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
                    res.status(401).json(refreshTokenError)
                })
        } else {
            res.status(401).json({ sucessful: false, message: accessTokenError.message || "An error has occured" })
        }
    }

}

module.exports = {
    verifyToken
}