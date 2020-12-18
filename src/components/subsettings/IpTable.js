import React, { useEffect, useState, useContext } from 'react';
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
    DialogContent,
    Dialog,
    Slide,
    Snackbar,
    FormControlLabel,
    Checkbox,

} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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

export default function IpTable({ IpcameraDetails, clientId }) {
    const classes = useStyles();
    //Snackbar state
    const [saveSuccess, setSaveSuccess] = useState(false);

    //Modal state
    const [modelOpen, setModelOpen] = useState(false);
    const [socialDistance, setSocialDistance] = useState(false);
    const [ppe, setPpe] = useState(false);
    const [faceRecognation, setFaceRecognation] = useState(false);
    const [editFormDate, setEditFormData] = useState({
        editIpAddress: "",
        editChannelName: "",
        editHashtag: "",
        editDepartment: "",
        vid: "",
        threshold: null,
        frameRate: null,
        type: "",
    });
    const onChangeEdit = (e) => setEditFormData({ ...editFormDate, [e.target.name]: e.target.value })
    const { editChannelName, editDepartment, editIpAddress, editHashtag, threshold, frameRate, type } = editFormDate;

    //Once modal is open set the form state
    const setModalState = (Vid) => {
        setModelOpen(true);
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras/`)
            .doc(Vid)
            .get()
            .then((res) => {
                setEditFormData({
                    editIpAddress: res.data().Ip_address,
                    editChannelName: res.data().channel_name,
                    editHashtag: res.data().Hashtag,
                    editDepartment: res.data().Location,
                    vid: Vid,
                    threshold: res.data().Settings.det_threshold,
                    frameRate: res.data().Settings.frame_rate,
                    type: res.data().Settings.type,
                })
                setPpe(res.data().Settings.Service.ppe)
                setSocialDistance(res.data().Settings.Service.social_distance)
                setFaceRecognation(res.data().Settings.Service.face_recognition)
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
                    Ip_address: editFormDate.editIpAddress,
                    channel_name: editFormDate.editChannelName,
                    Hashtag: editFormDate.editHashtag,
                    Location: editFormDate.editDepartment,
                    "Settings": {
                        "Service": {
                            "noteacher": false,
                            "stayback": false,
                            "face_recognition": faceRecognation,
                            "ppe": ppe,
                            "social_distance": socialDistance
                        },
                        det_threshold: threshold,
                        frame_rate: frameRate,
                        type: type
                    },
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
        'Dvr Name',
        'Camera',
        'Location',
        'Hashtag',
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
                                <TableCell align="center">{row.DVR}</TableCell>
                                <TableCell align="center">{row.camera_name}</TableCell>
                                <TableCell align="center">{row.Location}</TableCell>
                                <TableCell align="center">{row.Hashtag}</TableCell>
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
                <DialogContent>
                    <Typography variant="subtitle1" className={classes.textFiled} align="center">Edit IP Camera Configuration</Typography>
                    <ValidatorForm>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
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
                            </Grid>
                            <Grid item lg={6}>
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
                            </Grid>
                            <Grid item lg={6}>
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
                            </Grid>
                            <Grid item lg={6}>
                                <SelectValidator
                                    SelectProps={{
                                        native: true,
                                    }}
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
                                    <option aria-label="None" value="" />
                                    <option value={"opd"}>OPD</option>
                                    <option value={"icu"}>ICU</option>
                                    <option value={"research room"}>Research Romm</option>
                                    <option value={"cancer department"}>Cancer Department</option>
                                </SelectValidator>
                            </Grid>
                            <Grid item lg={6}>
                                <SelectValidator
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    className={classes.textFiled}
                                    name="threshold"
                                    value={threshold}
                                    onChange={(e) => onChangeEdit(e)}
                                    label="Detection Threshold"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                >
                                    <option value={0.5}>0.5</option>
                                    <option value={0.6}>0.6</option>
                                    <option value={0.7}>0.7</option>
                                    <option value={0.8}>0.8</option>
                                    <option value={0.9}>0.9</option>
                                    <option value={1}>1</option>
                                </SelectValidator>
                            </Grid>
                            <Grid item lg={6}>
                                <SelectValidator
                                    SelectProps={{
                                        native: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    className={classes.textFiled}
                                    name="frameRate"
                                    value={frameRate}
                                    onChange={(e) => onChangeEdit(e)}
                                    label="Frame Rate"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                >
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={1}>1</option>
                                </SelectValidator>
                            </Grid>
                        </Grid>
                        <TextValidator
                            variant="outlined"
                            label="Type"
                            fullWidth
                            name="type"
                            onChange={e => onChangeEdit(e)}
                            value={type}
                            className={classes.textFiled}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <Typography variant="subtitle1" align="center">Service Subcribed for</Typography>
                        <FormControlLabel
                            control={<Checkbox checked={faceRecognation} onChange={() => setFaceRecognation(!faceRecognation)} />}
                            label="Face Recognation "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={ppe} onChange={() => { setPpe(!ppe) }} />}
                            label="PPE"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={socialDistance} onChange={() => { setSocialDistance(!socialDistance) }} />}
                            label="Social Distance"
                            className={classes.textFiled}
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
                    IP Camera Edit successfull!
                </Alert>
            </Snackbar>
        </Grid >

    )
}
