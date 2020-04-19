import produce from "immer"

const appReducer = produce((state, action) => {
    switch (action.type) {
        case 'login':
            state.authenticated = true
            state.user = action.payload.user
            return state
        case 'logout':
            state.user = {}
            state.authenticated = false
            return state
        case 'setUser':
            state.user = action.payload
            return state
        case 'setError':
            state.error.statusCode = action.payload.statusCode
            state.error.message = action.payload.message
            return state   
        case 'clearError':
            state.error.statusCode = null
            state.error.message = null
            return state
        default:
            return state
    }
})

export default appReducer
