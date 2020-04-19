import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom'
import { Page } from './components'
import { User, Role, Permission, Login } from './view'
import { Main, Minimal } from './layouts'
import { useContextHelper, useSendRequest, useReducerHelper, useFetch } from './helpers'
import Cookies from 'js-cookie'

export default function Routes() {
    const [app, setApp] = useContextHelper()
    // const [draft, dispatch] = useReducerHelper()

    // const {data} = useFetch({ endpoint: "api/user" })
  
    // useEffect(() => {
    //     let userDetails = {
    //         firstName: data.first_name,
    //         lastName: data.last_name,
    //         email: data.email
    //     }
    //     dispatch({ type: 'setUser', payload: userDetails })
    // }, [data])

    // useEffect(() => {
    //     console.log(draft)
    //     setApp(draft)
    // }, [draft])

    useEffect(() => {
        const auth = Cookies.get('access-token') ? true : false
        setApp({ ...app, authenticated: auth })
    }, [])

    return (
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Page isLoggedIn={false} exact path="/login" component={Login} layout={Minimal} />
            <Page exact path="/user" component={User} layout={Main} />
            <Page exact path="/role" component={Role} layout={Main} />
            <Page exact path="/permission" component={Permission} layout={Main} />
        </Switch>
    )
}
