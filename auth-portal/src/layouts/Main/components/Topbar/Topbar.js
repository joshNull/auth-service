import React, { useState } from 'react'
import clsx from 'clsx'
import propTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography } from '@material-ui/core'

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
                <Typography>AUTH SERVICE</Typography>
            </Toolbar>
        </AppBar>
    )

}

Topbar.propTypes = {
    className: propTypes.string,
    onSidebarOpen: propTypes.func
}

export default Topbar