import React from 'react'
import propTypes from 'prop-types'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

function Footer(props) {
    const { className, ...rest } = props
    const classes = useStyles()
    
    return (
        <div
            {...rest}
            className={clsx(className, classes.root)}
        >
        </div>
    )

}

Footer.propTypes = {
    className: propTypes.string
}

export default Footer