import React, { useState } from 'react';
import { ExportCSV } from '../utils/ExportCsv'
import {
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
    Grid,
    TableContainer,
    Paper,
    TableHead,
    TableBody,
    Table,
    Typography,
    Select,
    MenuItem,
    TextField,
    makeStyles,
    withStyles,
    InputAdornment,
    Box,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
    Search,
} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    colorRed: {
        color: "#F72A1F"
    },
    checkOutButton: {
        color: '#F72A1F',
        backgroundColor: 'rgb(255, 164, 168, 0.3)',
        borderRadius: 4,
        fontWeight: 'bolder',
    },
    heading: {
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginBottom: theme.spacing(2)
    }
}))


export default function Profiles() {
    const classes = useStyles();

    //All visitors state
    const [employessLogs, setEmployessLogs] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    //Filter functions
    const [queryOption, queryBasedOn] = useState('Vname');
    const [queryText, setQueryText] = useState('');
    const handlerQuerytextChange = (e) => {
        setQueryText(e.target.value);
        const newData = employessLogs.filter((x) => (x[queryOption].toLowerCase().indexOf(queryText.toLowerCase()) >= 0));
        setFilteredData(newData);
    }

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
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage,
            queryText === '' ? employessLogs.length - page * rowsPerPage
                : filteredData.length - page * rowsPerPage
        );

    const SearchTextField = withStyles({
        root: {
            borderRadius: 20,
        },
    })(TextField);

    //Table heading
    const headings = [
        'SL.No',
        'PHOTO',
        'ID',
        'NAME',
        'EMAIL & PHONE',
        'BLOCKLIST',
        'ACTION',
    ]


    return (
        <Grid>
            <Grid container >
                <Grid item lg={12}>
                    <Typography variant="h2" className={classes.heading}>Employees Profile</Typography>
                </Grid>
                <Grid item lg={3}>
                    <Box style={{ display: "flex" }}>
                        <TextField
                            label='Search for employee'
                            onChange={(e) => handlerQuerytextChange(e)}
                            name="queryText"
                            value={queryText}
                            variant='outlined'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth

                        />
                        <ExportCSV csvData={employessLogs} fileName={'EmployeeInfo'} />
                    </Box>
                </Grid>
                <Grid item lg={9}>
                    <Grid container spacing={2} justify="flex-end">
                        <Grid item>
                            <Typography className={classes.colorRed} ><b>Filter</b></Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={queryOption}
                                onChange={(e) => queryBasedOn(e.target.value)}
                            >
                                <MenuItem value={"Vname"}>Name</MenuItem>
                                <MenuItem value={"Vemail"}>Email</MenuItem>

                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "2%" }}>
                <Table aria-label='custom pagination table'>
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
                        {
                            queryText === ''
                                ? (rowsPerPage > 0
                                    ? employessLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : employessLogs
                                ).map((row, index) => (
                                    <TableRow key={index} >
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                ))
                                : (rowsPerPage > 0
                                    ? filteredData.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    : filteredData
                                ).map((row, index) => (
                                    <TableRow key={index} >

                                    </TableRow>
                                ))
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={employessLogs.length}
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
