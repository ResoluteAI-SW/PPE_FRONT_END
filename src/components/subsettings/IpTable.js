import React, { useEffect, useState, useContext } from 'react';

//Firebase imports
import { firedb } from '../../firebase/firebase';
//CLIENT CONTEXT
import { clientContext } from '../../App';
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
    DialogContent,
    Dialog,
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

export default function IpTable({ IpcameraDetails }) {
    const classes = useStyles();

    //GET THE CLIENT ID FROM CONTEXT
    const client = useContext(clientContext);
    const clientId = client.clientId;
    //Snackbar state
    const [saveSuccess, setSaveSuccess] = useState(false);

    //Modal state
    const [modelOpen, setModelOpen] = useState(false);
    const [editFormDate, setEditFormData] = useState({
        editIpAddress: "",
        editChannelName: "",
        editHashtag: "",
        editDepartment: "",
        vid: ""
    });
    const onChangeEdit = (e) => setEditFormData({ ...editFormDate, [e.target.name]: e.target.value })
    const { editChannelName, editDepartment, editIpAddress, editHashtag } = editFormDate;

    //Once modal is open set the form state
    const setModalState = (Vid) => {
        setModelOpen(true);
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras/`)
            .doc(Vid)
            .get()
            .then((res) => {
                setEditFormData({
                    editIpAddress: res.data().IPAddress,
                    editChannelName: res.data().ChannelName,
                    editHashtag: res.data().Hashtag,
                    editDepartment: res.data().Location,
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
            .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras/`)
            .doc(editFormDate.vid)
            .update(
                {
                    IPAddress: editFormDate.editIpAddress,
                    ChannelName: editFormDate.editChannelName,
                    Hashtag: editFormDate.editHashtag,
                    Location: editFormDate.editDepartment
                }
            )
            .then((res) => {

                setSaveSuccess(true)
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, IpcameraDetails.length - page * rowsPerPage);


    //Table heading
    const headings = [
        'Camera',
        'Location',
        'Hashtag',
        'Time Logged',
        'Action'
    ]

    return (
        <Grid>
            <Typography align="center" variant="subtitle1" className={classes.heading}>Current IP Camera Configurations</Typography>
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
                            ? IpcameraDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : IpcameraDetails
                        ).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.ChannelName}</TableCell>
                                <TableCell align="center">{row.Location}</TableCell>
                                <TableCell align="center">{row.Hashtag}</TableCell>
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
                            count={IpcameraDetails.length}
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
                        <TextValidator
                            placeholder="IP Address"
                            label="IP Address"
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}
                            name="editIpAddress"
                            value={editIpAddress}
                            onChange={(e) => onChangeEdit(e)}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <TextValidator
                            placeholder="Channel Name"
                            label="Channel Name"
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}
                            name="editChannelName"
                            value={editChannelName}
                            onChange={(e) => onChangeEdit(e)}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <TextValidator
                            variant="outlined"
                            id="Hashtag"
                            label="Insert # Hashtag"
                            fullWidth
                            name="editHashtag"
                            autoComplete="Hashtag"
                            onChange={e => onChangeEdit(e)}
                            value={editHashtag}
                            className={classes.textFiled}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <SelectValidator
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}
                            name="editDepartment"
                            value={editDepartment}
                            onChange={(e) => onChangeEdit(e)}
                            label="Department Name"
                            validators={['required']}
                            errorMessages={['This field is required']}
                        >
                            <option value={"research"}>R&D</option>
                            <option value={"finance"}>Finance</option>
                            <option value={"design"}>Design</option>
                            <option value={"software developemnt"}>Software Development</option>
                        </SelectValidator>

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
                    IP Camera Edit successfull!
                </Alert>
            </Snackbar>
        </Grid >

    )
}
