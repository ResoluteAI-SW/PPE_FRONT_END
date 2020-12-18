import React, { useState, useEffect } from 'react';
import { firedb } from '../../firebase/firebase';
import moment from 'moment'
import {
    Grid,
    Box,
    Typography,
    makeStyles,
    Chip,
    Button,
    Snackbar,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import IpTable from './IpTable'

const useStyles = makeStyles((theme) => ({
    heading: {
        marginBottom: theme.spacing(2)
    },
    textFiled: {
        marginBottom: theme.spacing(2)
    },
}))
const colorHashtags = ["entry", "exit", "canteen", "garden"];

export default function IpCameraRegistration({ clientId }) {
    const classes = useStyles();

    const [IpcameraDetails, setIpCameraDetails] = useState([]);
    const [dvrList, setDvrList] = useState([])

    //Snackbar state
    const [fieldMissing, setFieldMissing] = useState(false);
    const [regSuccess, setRegSuccess] = useState(false);
    //SNACK BAR CLOSE
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFieldMissing(false);
        setRegSuccess(false)
    };

    const [hashtag, setHashtag] = useState("");
    const [formDate, setFormData] = useState({
        ipAddress: "",
        location: "",
        channelName: "",
        dvrName: ""
    });
    const [socialDistance, setSocialDistance] = useState(false);
    const [ppe, setPpe] = useState(false);
    const [faceRecognation, setFaceRecognation] = useState(false);

    const onChange = (e) => setFormData({ ...formDate, [e.target.name]: e.target.value })
    const { ipAddress, location, channelName, dvrName } = formDate;

    const data = {
        DVR: dvrName,
        Ip_address: ipAddress,
        Location: location,
        Hashtag: hashtag,
        channel_name: channelName,
        camera_name: ipAddress + "." + channelName,
        time_logged: moment().format('lll'),
        Settings: {
            Service: {
                "noteacher": false,
                "stayback": false,
                ppe: ppe,
                social_distance: socialDistance,
                face_recognition: faceRecognation
            },
            det_threshold: 0.7,
            frame_rate: 0.5,
            Type: ""
        }
    }

    const handleSubmit = () => {
        if (!ipAddress || !location || !channelName || !dvrName) {
            setFieldMissing(true)
        }
        else {
            firedb
                .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras`)
                .add(data)
                .then((res) => {
                    setRegSuccess(true)
                    formReset();
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }
    }

    const formReset = () => {
        setFormData({
            ipAddress: "",
            location: "",
            channelName: "",
            dvrName: ""
        })
        setHashtag("")
    }

    useEffect(() => {

        //Get the ipcamera list and to update it in latestconfig everytime this component loads.
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras`)
            // .orderBy("Timelogged", "desc")
            .onSnapshot((cameras) => {
                const cameraArray = [];
                const configArray = [];

                cameras.forEach((item) => {
                    cameraArray.push({ ...item.data(), Vid: item.id });
                    configArray.push(item.data());
                })
                setIpCameraDetails(cameraArray);
                firedb
                    .collection(`Clients_data/${clientId}/Updates/`)
                    .doc('LatestUpdates/')
                    .update("Config", configArray)
                    .then((res) => {
                        console.log("LatestUpdates updated")
                    })
            })
        //Get the all dvr registered
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/DVR`)
            .get()
            .then((res) => {
                const dvrArray = [];
                res.forEach((item) => {
                    dvrArray.push(item.data().hardwarename)
                })
                setDvrList(dvrArray);
            })
    }, [clientId]);

    return (
        <Grid container spacing={3}>
            <Grid item lg={4}>
                <Box>
                    <Typography align="center" variant="subtitle1" className={classes.heading}>IP Camera Registration</Typography>
                    <ValidatorForm>
                        <SelectValidator
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}
                            name="dvrName"
                            value={dvrName}
                            onChange={(e) => onChange(e)}
                            label="DVR Name"
                            validators={['required']}
                            errorMessages={['This field is required']}
                        >
                            <option aria-label="None" value="" />
                            {
                                dvrList.map((dvr) => {
                                    return (
                                        <option value={dvr}>{dvr}</option>
                                    )
                                })
                            }
                        </SelectValidator>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <TextValidator
                                    placeholder="IP Address"
                                    label="IP Address"
                                    fullWidth
                                    variant="outlined"
                                    className={classes.textFiled}
                                    name="ipAddress"
                                    value={ipAddress}
                                    onChange={(e) => onChange(e)}
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
                                    name="channelName"
                                    value={channelName}
                                    onChange={(e) => onChange(e)}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />
                            </Grid>
                        </Grid>
                        <div className={classes.textFiled}>
                            Suggested Hashtags:
                                {colorHashtags.map(hashtag => (
                            <Chip
                                label={`#${hashtag}`}
                                style={{
                                    margin: "3px",
                                    color: hashtag === "yellow" ? "gold" : hashtag
                                }}
                                variant="outlined"
                                onClick={() => {
                                    setHashtag(`#${hashtag}`);
                                }}
                            />
                        ))}
                        </div>

                        <TextValidator
                            variant="outlined"
                            id="Hashtag"
                            label="Insert # Hashtag"
                            fullWidth
                            name="Hashtag"
                            autoComplete="Hashtag"
                            onChange={e => setHashtag(e.target.value)}
                            value={hashtag}
                            className={classes.textFiled}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <SelectValidator
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}
                            name="location"
                            value={location}
                            onChange={(e) => onChange(e)}
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
                            label="Social Distancing"
                            className={classes.textFiled}
                        />
                        <Button
                            onClick={() => handleSubmit()}
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </ValidatorForm>
                </Box>
            </Grid>
            <Grid item lg={8}>
                <IpTable IpcameraDetails={IpcameraDetails} clientId={clientId} />
            </Grid>
            <Snackbar open={fieldMissing} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error">
                    Please enter all the required details!
                </Alert>
            </Snackbar>
            <Snackbar open={regSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    IP Camera registered successfully!
                </Alert>
            </Snackbar>
        </Grid >
    )
}
