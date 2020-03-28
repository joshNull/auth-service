import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();



export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
                <Routes />
            </Router>
        </ThemeProvider>
    )
}