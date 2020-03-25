const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { generateAccessToken, validateToken } = require('./token')

dotenv.config()

async function verifyToken(req, res, next) {

    const accessToken = req.cookies['access-token']
    const refreshToken = req.cookies['refresh-token']

    if (!accessToken) return res.status(401).send("Access Denied.")

    try {
        let decoded = await validateToken(accessToken, 'access-token')
        req.user = decoded
        next()
    } catch (error) {
        if ("name" in error && error.name == "TokenExpiredError" && refreshToken) {
            validateToken(refreshToken, 'refresh-token')
                .then((decoded) => {

                    // check for expiration of refresh token
                    console.log("REFRESH TOKEN : ", decoded)

                    if (decoded) {
                        let newAccessToken = generateAccessToken({ id: decoded.id })
                        res.cookie('access-token', newAccessToken, {})
                        next()
                    }
                }).catch((refreshTokenError) => {
                    res.status(401).json(refreshTokenError)
                })
        } else {
            res.status(401).json(error)
        }
    }

}

module.exports = {
    verifyToken
}