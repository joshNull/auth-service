import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Role() {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper classname={classes.paper}>
                    <Typography>Role</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}