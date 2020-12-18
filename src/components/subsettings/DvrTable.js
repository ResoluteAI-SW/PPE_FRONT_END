import React, { useEffect, useState } from 'react';
import { firedb } from '../../firebase/firebase';
import EditIcon from '../../assets/NavBarIcons/EditIcon';
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
    Button,
    Dialog,
    DialogContent,
    Slide,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//Form validation
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
    colorRed: {
        color: "#F72A1F"
    },
    textFiled: {
        marginBottom: theme.spacing(2)
    },
}))

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DvrTable({ dvrData, clientId }) {
    const classes = useStyles();

    //Snackbar state
    const [saveSuccess, setSaveSuccess] = useState(false);

    //Modal state
    const [modelOpen, setModelOpen] = useState(false);
    const [editFormDate, setEditFormData] = useState({
        editType: "",
        editBrand: "",
        editHardwareName: "",
        editPort: "",
        vid: ""
    });
    const onChangeEdit = (e) => setEditFormData({ ...editFormDate, [e.target.name]: e.target.value })
    const { editBrand, editPort, editType, editHardwareName } = editFormDate;

    //Once modal is open set the form state
    const setModalState = (Vid) => {
        setModelOpen(true);
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/DVR/`)
            .doc(Vid)
            .get()
            .then((res) => {
                setEditFormData({
                    editType: res.data().type,
                    editBrand: res.data().brand,
                    editHardwareName: res.data().hardwarename,
                    editPort: res.data().port,
                    vid: Vid
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    //SNACK BAR CLOSE
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setModelOpen(false);
        setSaveSuccess(false)
    };

    //Save the edit changes
    const saveChanges = () => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/DVR/`)
            .doc(editFormDate.vid)
            .update(
                {
                    type: editFormDate.editType,
                    brand: editFormDate.editBrand,
                    hardwarename: editFormDate.editHardwareName,
                    port: editFormDate.editPort
                }
            )
            .then((res) => {
                setSaveSuccess(true)
                setEditFormData({
                    editType: "",
                    editBrand: "",
                    editHardwareName: "",
                    editPort: "",
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dvrData.length - page * rowsPerPage);


    //Table heading
    const headings = [
        ' TYPE',
        'BRAND',
        'HARDWARE',
        'Time Logged',
        'Action'
    ]

    return (
        <Grid>
            <Typography align="center" variant="subtitle1" className={classes.heading}>Current Dvr Configurations</Typography>
            <TableContainer style={{ marginTop: "2%" }}>
                <Table >
                    <TableHead>
                        <TableRow >
                            {
                                headings.map((heading, index) => {
                                    return (
                                        <TableCell key={index} align="center" className={classes.colorRed}>
                                            <b>{heading}</b>
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? dvrData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : dvrData
                        ).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.brand}</TableCell>
                                <TableCell align="center">{row.hardwarename}</TableCell>
                                <TableCell align="center">{row.Timelogged}</TableCell>
                                <TableCell align="center">{
                                    <Button
                                        onClick={() => {
                                            setModalState(row.Vid)
                                            setModelOpen(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </Button>
                                }</TableCell>
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
                            count={dvrData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>

            <Dialog
                open={modelOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent style={{ maxWidth: "300px" }}>
                    <Typography variant="subtitle1" className={classes.heading} align="center">Edit DVR Configuration</Typography>
                    <ValidatorForm>
                        <SelectValidator
                            SelectProps={{
                                native: true,
                            }}
                            className={classes.textFiled}
                            name="editType"
                            value={editType}
                            onChange={(e) => onChangeEdit(e)}
                            label="Type"
                            fullWidth
                            variant="outlined"
                            placeholder="Type"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        >
                            <option value={"Dvr"}>DVR</option>
                            <option value={"Nvr"}>NVR</option>
                            <option value={"Ip Camera"}>IP Camera</option>
                        </SelectValidator>

                        <SelectValidator
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                            variant="outlined"
                            placeholder="Brand"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            className={classes.textFiled}
                            name="editBrand"
                            value={editBrand}
                            onChange={(e) => onChangeEdit(e)}
                            label="Brand"
                        >
                            <option value={"Hikvision"}>Hikvision</option>
                            <option value={"CPplus"}>CPplus</option>
                            <option value={"Zicom"}>Zicom</option>
                            <option value={"MI"}>MI</option>
                            <option value={"TP-Link"}>TP-Link</option>
                            <option value={"iBall"}>iBall</option>
                            <option value={"Srihome"}>Srihome</option>
                            <option value={"Mobile Camera"}>Mobile Camera</option>
                        </SelectValidator>

                        <TextValidator
                            placeholder="Hardware Name"
                            label="Hardware Name"
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}
                            name="editHardwareName"
                            value={editHardwareName}
                            onChange={(e) => onChangeEdit(e)}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <TextValidator
                            placeholder="Port"
                            label="Port"
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}

                            validators={['required']}
                            errorMessages={['This field is required']}
                            name="editPort"
                            value={editPort}
                            onChange={(e) => onChangeEdit(e)}

                        />
                        <Button
                            type="submit"
                            onClick={() => { saveChanges() }}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save Changes
                        </Button>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
            <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    DVR Edit successfull!
                </Alert>
            </Snackbar>
        </Grid >

    )
}
