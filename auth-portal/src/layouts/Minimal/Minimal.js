import React from 'react'
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    content: {
        height: '100%'
    }
}))

function Minimal(prop) {
    const { className, children } = prop
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <main className={clsx(className, classes.content)}>
                {children}
            </main>
        </div>
    )
}

Minimal.propTypes = {
    className: propTypes.string,
    children: propTypes.node
}

export default Minimal