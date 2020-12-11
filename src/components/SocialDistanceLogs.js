import React, { useEffect, useState } from 'react';
import { firedb } from '../firebase/firebase';
import { ExportCSV } from '../utils/ExportCsv';
import SocialDistance from './SocialDistance';

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
    Paper,
    Box,
    Button
} from '@material-ui/core';
import {
    ArrowBack
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    colorRed: {
        color: "#F72A1F"
    }
}))


export default function SocialDistanceLogs() {
    const classes = useStyles();
    const [socialDistanceLogs, setSocialDistanceLogs] = useState([]);
    const [goBack, setGoBack] = useState(false)

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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, socialDistanceLogs.length - page * rowsPerPage);


    //Table heading
    const headings = [
        'Thumbnail',
        'IP Address',
        'Hashtag',
        'Timestamp'
    ]

    if (goBack) {
        return (
            <SocialDistance />
        )
    }
    return (
        <Grid container>
            <Grid item lg={12}>
                <Box textAlign="left">
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => setGoBack(true)}
                        color="primary"
                    >
                        Go back
                    </Button>
                </Box>
            </Grid>
            <Grid item lg={12}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography variant="subtitle1">Social Distancing Logs</Typography>
                    </Grid>
                    <Grid item>
                        <ExportCSV csvData={socialDistanceLogs} fileName={'EmployeeInfo'} />
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
                            ? socialDistanceLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : socialDistanceLogs
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
                            count={socialDistanceLogs.length}
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
