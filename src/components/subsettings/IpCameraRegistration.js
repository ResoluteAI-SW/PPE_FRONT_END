import React, { useState, useEffect } from 'react';

//Firebase imports
import { firedb } from '../../firebase/firebase';
import moment from 'moment'

import {
    Grid,
    Box,
    Typography,
    makeStyles,
    Chip,
    Button,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//Form validation
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';

//Components imports
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

    const [IpcameraDetails, setIpCameraDetails] = useState([])

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
        channelName: ""
    });

    const onChange = (e) => setFormData({ ...formDate, [e.target.name]: e.target.value })
    const { ipAddress, location, channelName } = formDate;

    const data = {
        IPAddress: ipAddress,
        Location: location,
        Hashtag: hashtag,
        ChannelName: channelName,
        Timelogged: moment().format('lll')
    }

    const handleSubmit = () => {
        if (!ipAddress || !location || !channelName) {
            setFieldMissing(true)
        }
        else {
            firedb
                .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras`)
                .add(data)
                .then((res) => {
                    formReset();
                    setRegSuccess(true)

                })
                .catch((err) => {
                    console.log(err.message);
                })
        }
    }

    const formReset = () => {
        setFormData({
            IPAddress: "",
            PointOfCamera: "",
        })
        setHashtag("")
    }
    useEffect(() => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/IPCameras`)
            .orderBy("Timelogged", "desc")
            .onSnapshot((cameras) => {
                const cameraArray = [];
                cameras.forEach((item) => {
                    cameraArray.push({ ...item.data(), Vid: item.id })
                })
                setIpCameraDetails(cameraArray);
            })
    }, [clientId]);
    return (
        <Grid container spacing={3}>
            <Grid item lg={4}>
                <Box>
                    <Typography align="center" variant="subtitle1" className={classes.heading}>IP Camera Registration</Typography>
                    <ValidatorForm>
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
                            <option value={"research"}>R&D</option>
                            <option value={"finance"}>Finance</option>
                            <option value={"design"}>Design</option>
                            <option value={"software developemnt"}>Software Development</option>
                        </SelectValidator>

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
                <IpTable IpcameraDetails={IpcameraDetails} />
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
