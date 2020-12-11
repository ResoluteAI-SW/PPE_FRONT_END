import React, { useEffect, useState } from 'react';
import { firedb } from '../firebase/firebase';
import { ExportCSV } from '../utils/ExportCsv'

import {
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
    Grid,
    TableContainer,
    TableHead,
    TableBody,
    Table,
    makeStyles,
    Typography,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    colorRed: {
        color: "#F72A1F"
    }
}))


export default function AttendanceReports() {
    const classes = useStyles();
    const [ppeLogs, setPpeLogs] = useState([]);

    //Pagination task
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ppeLogs.length - page * rowsPerPage);


    //Table heading
    const headings = [
        'Reg No',
        'Name',
        'Email/Phone',
        'Department',
        'Block List',
        'Hashtag',
        'Timestamp'
    ]


    return (
        <Grid container>
            <Grid item lg={12}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography variant="subtitle1">Daily Attendance Logs</Typography>
                    </Grid>
                    <Grid item>
                        <ExportCSV csvData={ppeLogs} fileName={'EmployeeInfo'} />
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "2%" }}>
                <Table >
                    <TableHead>
                        <TableRow >
                            {
                                headings.map((heading, index) => {
                                    return (
                                        <TableCell key={index} align="center">
                                            <b>{heading}</b>
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? ppeLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : ppeLogs
                        ).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.IPAddress}</TableCell>
                                <TableCell align="center">{row.Location}</TableCell>
                                <TableCell align="center">{row.Hashtag}</TableCell>
                                <TableCell align="center">{row.Timelogged}</TableCell>
                                <TableCell align="center">{row.Hashtag}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={ppeLogs.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid >

    )
}
