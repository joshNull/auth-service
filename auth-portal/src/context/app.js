import React, { useState, createContext } from 'react'
import ContextDevTool from 'react-context-devtool'

export const AppContext = createContext()

export const AppProvider = (props) => {
    const [app, setApp] = useState(
        {
            authenticated: false,
            fullPageLoader: false,
            user: {
                firstName: "",
                lastName: "",
                email: "",
            },
            error: "",
            settings: {},
            env: {
                api_url: "http://localhost:3000/"
            }
        }
    )
    return (
        <AppContext.Provider value={[app, setApp]}>
            <ContextDevTool context={AppContext} />
            {props.children}
        </AppContext.Provider>
    )
}