import React, { useContext } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AppContext } from '../../../context'


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function FullPageLoader() {

    const [{ fullPageLoader }, setApp] = useContext(AppContext)

    const classes = useStyles()

    return (
        <Backdrop className={classes.backdrop} open={fullPageLoader}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default FullPageLoader