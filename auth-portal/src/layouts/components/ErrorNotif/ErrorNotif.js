import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Modal } from '@material-ui/core'
import { Notification } from '../../../components'
import { useReducerHelper, useLogout, useContextHelper } from '../../../helpers'

const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ErrorNotif() {

    const [{ error }, setApp] = useContextHelper()
    const [draft, dispatch] = useReducerHelper()
    const classes = useStyles()
    const logout = useLogout()

    useEffect(() => setApp(draft), [draft])

    const Unauthorized = (props) => {
        const { statusCode, message } = props

        return (
            <Modal
                open={true}
                disableBackdropClick={true}
            >
                <div className={classes.paper}>
                    <Typography>Error {statusCode}</Typography>
                    <Typography>{message}</Typography>
                    <button onClick={() => logout()}>
                        <Typography>Logout</Typography>
                    </button>
                </div>
            </Modal>)
    }

    // 401 = Unauthorized, 404 = Not found
    return [401, 404].indexOf(error.statusCode) !== -1 ? (
        <Unauthorized
            statusCode={error.statusCode}
            message={error.message}
        />) : (
            <Notification
                open={Boolean(error.message)}
                severity="error"
                snackbarOnClose={() => { dispatch({ type: 'clearError' }) }}
                muiAlertOnClose={() => { dispatch({ type: 'clearError' }) }}
            >
                {"Error " + error.statusCode + " : " + error.message}
            </Notification>
        )
}

export default ErrorNotif