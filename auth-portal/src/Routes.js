import React, { useContext, useEffect } from 'react';
import { Switch } from 'react-router-dom'
import { ProtectedPage, PublicPage } from './components'
import { User, Role, Permission, Login } from './view'
import { Main, Minimal } from './layouts'
import { AppContext } from '../src/context'
import Cookies from 'js-cookie'


export default function Routes() {
    const [app, setApp] = useContext(AppContext)

    useEffect(() => {
        const tokenInCookies = Cookies.get('access-token')
        if (tokenInCookies) {
            setApp({ ...app, authenticated: true })
        }
    }, [])

    return (
        <Switch>
            <PublicPage exact path="/login" component={Login} layout={Minimal} />
            <ProtectedPage exact path="/user" component={User} layout={Main} />
            <ProtectedPage exact path="/role" component={Role} layout={Main} />
            <ProtectedPage exact path="/permission" component={Permission} layout={Main} />
            {/* <Redirect exact path="/" to="/user" /> */}
        </Switch>
    )
}
