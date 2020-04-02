import React from 'react'
import { Router, Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createBrowserHistory } from 'history'

import { AppProvider } from './context'
import Routes from './Routes'
import theme from './theme'

import '@babel/polyfill'

const browserHistory = createBrowserHistory()

export default function App() {
    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <Router history={browserHistory}>
                    <Routes />
                </Router>
            </ThemeProvider>
        </AppProvider>
    )
}