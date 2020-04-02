import React, { useContext } from 'react'
import clsx from 'clsx'
import propTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Button, Badge, Hidden, IconButton, Typography } from '@material-ui/core'
import { AppContext } from '../../../../context'
import Cookies from 'js-cookie'

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none'
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
}))

function Topbar(props) {
    const { className, onSidebarOpen, ...rest } = props;
    const classes = useStyles();
    const [app, setApp] = useContext(AppContext)

    return (
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Toolbar>
                <Typography>AUTH SERVICE</Typography>
                <Button
                    onClick={() => {
                        setApp((state) => {

                            let newState = Object.assign({}, state);

                            newState.authenticated = false          
                            
                            Cookies.remove('access-token')
                            Cookies.remove('refresh-token')

                            return newState
                        })
                    }}
                    color="inherit">
                    LOGOUT
                        </Button>

            </Toolbar>
        </AppBar>
    )

}

Topbar.propTypes = {
    className: propTypes.string,
    onSidebarOpen: propTypes.func
}

export default Topbar