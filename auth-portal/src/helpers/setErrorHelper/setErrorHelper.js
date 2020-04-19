
function setErrorHelper(error, dispatch) {
    if (Boolean(error.statusCode)) {
        // userReducer's dispatch
        if (typeof dispatch === "function" && typeof error === "object") {
            dispatch({
                type: "setError",
                payload: {
                    statusCode: error.statusCode,
                    message: error.message || "An error has occured"
                }
            })
            return false
        }
        throw "Invalid Parameter"
    }
    else {
        return true
    }
}

export default setErrorHelper