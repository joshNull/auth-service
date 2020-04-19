/**
 *  Extended Error class to label the manually thwrown error. This is helpful for filtering error from server to client.
 *  @extends Error
 */
class ErrorHandler extends Error {
    /**
     * Set error message
     * @param {string} error Client error message
     * @param {string} error Error that is intended for server
    */
    constructor(clientError = "An error occured", serverError = "") {
        super(clientError)
        this.name = 'ErrorHandler'
        this.serverError = serverError
        // console.log('\x1b[31m', "Error Message: ", serverError);
    }
}

/**
 * Filter Error messages. Only return client friendly error messages.
 * 
 * @param {object} error An instance of ErrorHandler class
 * @returns {string} Error message
 */
function errorFilter(error) {
    // if error came from ErrorHandler class then return error message else hide error that is not meant for client side.
    if (error.name === 'ErrorHandler') {
        console.log('\x1b[31m', "Error Message: ", error.serverError);
        return error.message
    } else {
        console.log('\x1b[31m', "Error Message: ", error.message);
        return "An error occured"
    }
}

module.exports = {
    ErrorHandler,
    errorFilter
}