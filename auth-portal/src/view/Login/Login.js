import React, { useState, useContext } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useForm } from 'react-hook-form'
import { AppContext } from '../../context'

const useStyles = makeStyles((theme) => ({
    TextField: {
        paddingBottom: theme.spacing(2)
    }
}))

export default function Login(props) {
    const classes = useStyles()
    const { register, errors, handleSubmit } = useForm()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [app, setApp] = useContext(AppContext)

    const onSubmit = (e) => {

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include'
        }

        fetch(app.env.api_url + 'api/login', options)
            .then(async (response) => {

                const { data } = await response.json()

                // // check for error response
                // if (!response.ok) {
                //     // get error message from body or default to response status
                //     const error = (data && data.message) || response.status;
                //     return Promise.reject(error);
                // }

                setApp({
                    ...app,
                    authenticated: true,
                    user: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    }
                })

                props.history.push('/user')

            })
            .catch(error => {
                // this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            })
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* FOR ENHANCEMENT */}
                    {errors.password && <Typography>Invalid format</Typography>}
                    {errors.email && <Typography>Invalid format</Typography>}

                    <TextField
                        className={classes.TextField}
                        fullWidth
                        label="Email address"
                        name="email"
                        type="text"
                        variant="outlined"
                        onChange={(e) => { setEmail(e.target.value) }}
                        inputRef={register({ required: true })}
                    />
                    <TextField
                        className={classes.TextField}
                        fullWidth
                        label="password"
                        name="password"
                        type="password"
                        variant="outlined"
                        onChange={(e) => { setPassword(e.target.value) }}
                        inputRef={register({ required: true })}
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
                </form>
            </Grid>
        </Grid>
    )
}