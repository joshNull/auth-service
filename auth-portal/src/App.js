import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes />
            </Router>
        </ThemeProvider>
    )
}