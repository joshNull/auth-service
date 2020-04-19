import React, { useState, useEffect, useContext, useReducer } from 'react'
import clsx from 'clsx'
import propTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Cookies from 'js-cookie'
import { GreetUser } from './components'
import { AppContext } from '../../../../context'
import { appReducer } from '../../../../reducer'

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none'
    },
    grow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        }
    }
}))

function Topbar(props) {
    const { className, onSidebarOpen, ...rest } = props;
    const classes = useStyles();
    const [anchor, setAnchor] = useState(null)
    const [app, setApp] = useContext(AppContext)
    const [newApp, dispatch] = useReducer(appReducer, app)

    useEffect(() => {
        setApp(newApp)
    }, [newApp])

    const ProfileMenu = () => {
        return (
            <Menu
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={() => { setAnchor(null) }}
            >
                <MenuItem>Account</MenuItem>
                <MenuItem onClick={() => {
                    dispatch({ type: "logout" })
                    Cookies.remove('access-token')
                }}>
                    Logout
                </MenuItem>
            </Menu>
        )
    }

    return (
        <div className={classes.grow}>
            <AppBar
                {...rest}
                className={clsx(classes.root, className)}
            >
                <Toolbar>
                    <Typography>AUTHENTICATION SERVICE</Typography>
                    <div className={classes.grow} />
                    <GreetUser />
                    <div className={classes.sectionDesktop}>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={(e) => { setAnchor(e.currentTarget) }}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <ProfileMenu />
                </Toolbar>
            </AppBar>
        </div>
    )
}

Topbar.propTypes = {
    className: propTypes.string,
    onSidebarOpen: propTypes.func
}

export default Topbar