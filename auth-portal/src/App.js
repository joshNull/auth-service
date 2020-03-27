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
                {/* <div>
                    <ul>
                        <li><Link to="/">PAGE</Link></li>
                        <li><Link to="/page-one">PAGE 1</Link></li>
                        <li><Link to="/page-two">PAGE 2</Link></li>
                    </ul>
                </div> */}
                <Routes />
            </Router>
        </ThemeProvider>
    )
}