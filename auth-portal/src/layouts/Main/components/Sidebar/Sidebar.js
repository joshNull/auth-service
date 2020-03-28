import React from 'react'
import clsx from 'clsx'
import propTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Drawer, Divider } from '@material-ui/core'

import PeopleIcon from '@material-ui/icons/People'
import LockIcon from '@material-ui/icons/Lock'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import { SidebarNav } from './components'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    }
}))

function Sidebar(props) {
    const { open, variant, onClose, className, ...rest } = props
    const classes = useStyles()

    const pages = [
        {
            title: 'User',
            href: '/user',
            icon: <PeopleIcon />
        },
        {
            title: 'Role',
            href: '/role',
            icon: <AssignmentIndIcon />
        },
        {
            title: 'Permission',
            href: '/permission',
            icon: <LockIcon />
        },
        {
            title: 'Login',
            href: '/login',
            icon: <VpnKeyIcon />
        },
    ]

    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div
                {...rest}
                className={clsx(classes.root, className)}
            >
                                <Divider className={classes.divider} />

                <SidebarNav
                    className={classes.nav}
                    pages={pages}
                />
                <Divider className={classes.divider} />
            </div>
        </Drawer>
    )
}

Sidebar.propTypes = {
    className: propTypes.string,
    onClose: propTypes.func,
    open: propTypes.bool.isRequired,
    variant: propTypes.string.isRequired
}

export default Sidebar