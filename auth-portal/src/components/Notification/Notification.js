import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

function Notification(props) {

    const {
        children,
        open,
        anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
        key = 'bottom, right',
        autoHideDuration = 3000,
        severity,
        snackbarOnClose,
        muiAlertOnClose,
        ...rest } = props

    return (
        <div {...rest}>
            < Snackbar
                open={open}
                anchorOrigin={anchorOrigin}
                key={key}
                autoHideDuration={autoHideDuration}
                onClose={snackbarOnClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={severity}
                    onClose={muiAlertOnClose}
                >
                    {children}
                </MuiAlert>
            </Snackbar >
        </div>

    )
}

export default Notification