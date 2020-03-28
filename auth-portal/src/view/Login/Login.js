import React from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    TextField: {
        paddingBottom: theme.spacing(2)
    }
}))

export default function Login() {
    const classes = useStyles()
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item lg={5} xs={12}>
                <Typography
                    className={classes.TextField}
                    variant="h3"
                >
                    Sign in
                </Typography>
                <TextField
                    className={classes.TextField}
                    fullWidth
                    label="Email address"
                    name="email"
                    type="text"
                    variant="outlined"
                />
                <TextField
                    className={classes.TextField}
                    fullWidth
                    label="password"
                    name="password"
                    type="password"
                    variant="outlined"
                />
                <Button
                    // className={}
                    color="primary"
                    // disabled={}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Sign in now
                </Button>
            </Grid>

        </Grid>
    )
}