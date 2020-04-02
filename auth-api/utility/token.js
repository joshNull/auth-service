const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const tokenSecret = {
    "access-token": process.env.TOKEN_SECRET,
    "refresh-token": process.env.TOKEN_SECRET
}

/**
 * Generate access token
 * 
 * @param {object} data 
 * @returns {string} Access Token
 */
function generateAccessToken(claims) {
    return jwt.sign(claims, tokenSecret["access-token"], {
        expiresIn: 60, //1 minute
    })
}

/**
 * Generate refresh token
 * 
 * @param {object} data 
 * @returns {string} Refresh Token
 */
function generateRefreshToken(claims) {
    return jwt.sign(claims, tokenSecret["refresh-token"], {
        expiresIn: '1h',
    })
}

/**
 * @typedef tokenType
 * @enum
 * @value {access-token}
 * @value {refresh-token}
 * 
 * @param {string} token
 * @param {tokenType} tokenType
 * @returns {Promise} 
 */
function validateToken(token, tokenType) {
    return new Promise((res, rej) => {
        jwt.verify(token, tokenSecret[tokenType], (error, decoded) => {
            if (error) {
                rej(error)
            } else {
                res(decoded)
            }
        })
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    validateToken
}