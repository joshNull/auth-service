import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import { RouteWithLayout } from './components'
import { User, Role, Permission, Login } from './view'
import { Main, Minimal } from './layouts'

export default function Routes() {
    return (
        <Switch>
            <Redirect exact path="/" to="/user" />
            
            <RouteWithLayout exact path="/login" component={Login} layout={Minimal} />

            <RouteWithLayout exact path="/user" component={User} layout={Main} />
            <RouteWithLayout exact path="/role" component={Role} layout={Main} />
            <RouteWithLayout exact path="/permission" component={Permission} layout={Main} />
        </Switch>
    )
}
