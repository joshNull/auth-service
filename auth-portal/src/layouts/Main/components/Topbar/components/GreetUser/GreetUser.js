import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useContextHelper, useReducerHelper, useFetch, setErrorHelper } from '../../../../../../helpers'

function GreetUser() {
    const [{ user }, setApp] = useContextHelper()
    const [draft, dispatch] = useReducerHelper()

    const { data, error } = useFetch({ endpoint: "api/user" })

    useEffect(() => { setApp(draft) }, [draft])

    useEffect(() => {
        if (setErrorHelper(error, dispatch)) {
            let userDetails = {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email
            }
            dispatch({ type: 'setUser', payload: userDetails })
        }
    }, [data, error])

    return (<Typography>{user.firstName ? "Hi! " + user.firstName : ""}</Typography>)
}

export default GreetUser