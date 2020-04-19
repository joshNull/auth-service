import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer
} from '@material-ui/core'
import { useFetch } from '../../../../helpers'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



function UserTable() {

    // const {} = useFetch()
    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => ( */}
                    <TableRow key={1}>
                        <TableCell component="th" scope="row">
                            asd
                        </TableCell>
                        <TableCell align="right">qwe</TableCell>
                        <TableCell align="right">asd</TableCell>
                        <TableCell align="right">zxc</TableCell>
                        <TableCell align="right">123</TableCell>
                    </TableRow>
                    {/* ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable








