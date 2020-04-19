import React, { useState, useContext, useReducer, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import { AppContext } from '../../context'
import { appReducer } from '../../reducer'


import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

function ErrorMessage(props) {
    return (
        <Snackbar open={props.show}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            key={'bottom,center'}
            autoHideDuration={6000} onClose={props.alertOnClose}>
            <MuiAlert elevation={6} variant="filled" severity="error" onClose={props.alertOnClose}>
                {props.children}
            </MuiAlert>
        </Snackbar>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Login(props) {
    const classes = useStyles()
    const { register, errors, handleSubmit } = useForm()
    const [app, setApp] = useContext(AppContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [newApp, dispatch] = useReducer(appReducer, app)

    // Blank state was set before request was finished
    useEffect(() => {
        setApp(newApp)
    }, [newApp])

    const onSubmit = (e) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include'
        }

        fetch(app.env.api_url + 'api/login', options)
            .then(async (response) => {
                const { successful, data, message } = await response.json()
                if (successful) {
                    let userDetails = {
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email
                    }
                    dispatch({ type: "login", payload: { user: userDetails } })
                    props.history.push('/user')

                } else {
                    throw message
                }
            })
            .catch(error => {
                setApp({ ...app, error: { show: true, message: error } })
            })
    }

    return (
        <Container component="main" maxWidth="xs">

            {/* <ErrorMessage
                show={app.error.show}
                alertOnClose={() => setApp({ ...app, error: { show: false, message: app.error.message } })}
            >
                {app.error.message}
            </ErrorMessage> */}

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => { setEmail(e.target.value) }}
                        inputRef={register({ required: true })}
                        helperText={errors.email && 'Email is required'}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        inputRef={register({ required: true })}
                        helperText={errors.password && 'Password is required'}
                    />
                    {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    {/* <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid> */}
                </form>
            </div>
            {/* <Box mt={8}>
                    <Copyright />
                </Box> */}
        </Container>
    )
}