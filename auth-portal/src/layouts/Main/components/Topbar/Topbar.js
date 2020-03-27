import React, { useState } from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
// import propTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
// import InputIcon from '@material-ui/icons/Input'

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


    return (
        <AppBar
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Toolbar>
                AUTH SERVICE
            </Toolbar>
        </AppBar>
    )

}

export default Topbar