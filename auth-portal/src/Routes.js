import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import RouteWithLayout from './components/RouteWithLayout'

import Page from './view/Page'
import PageOne from './view/PageOne'
import PageTwo from './view/PageTwo'

import Main from './layouts/Main'

export default function Routes() {
    return (
        <Switch>
            <RouteWithLayout exact path="/" component={Page} layout={Main} />
            <RouteWithLayout exact path="/page-one" component={PageOne} layout={Main} />
            <RouteWithLayout exact path="/page-two" component={PageTwo} layout={Main} />
        </Switch>
    )
}
