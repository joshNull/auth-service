import React from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

export default function Permission() {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>Permission</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}