import React, { useContext, useReducer, useEffect } from 'react'
import { AppContext } from '../../context'
import { appReducer } from '../../reducer'
import Cookies from 'js-cookie'

function useLogout() {
    const [app, setApp] = useContext(AppContext)
    const [draft, dispatch] = useReducer(appReducer, app)

    useEffect(() => {
        setApp(draft)
    }, [draft])
    
    return () => {
        Cookies.remove('access-token')
        dispatch({ type: "logout" })
        dispatch({ type: "clearError" })
    }
}

export default useLogout