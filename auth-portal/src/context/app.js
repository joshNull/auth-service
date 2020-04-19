import React, { useState, createContext } from 'react'
import ContextDevTool from 'react-context-devtool'

export const AppContext = createContext()

const initialState = {
    authenticated: false,
    fullPageLoader: false,
    user: {
        firstName: "",
        lastName: "",
        email: "",
    },
    error: {
        statusCode: "",
        message: ""
    },
    settings: {},
    env: {
        api_url: "http://localhost:3000/"
    }
}

export const AppProvider = (props) => {
    const [app, setApp] = useState(initialState)
    return (
        <AppContext.Provider value={[app, setApp]}>
            <ContextDevTool context={AppContext} />
            {props.children}
        </AppContext.Provider>
    )
}