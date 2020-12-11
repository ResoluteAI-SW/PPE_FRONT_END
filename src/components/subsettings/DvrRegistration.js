import React, { useState, useEffect } from 'react';

//Firebase imports
import { firedb } from '../../firebase/firebase';
import moment from 'moment';

//Form validation
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';

import {
    Grid,
    Box,
    Typography,
    makeStyles,
    Button,
    Snackbar,
    TextField,
    Slide
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

//Components imports
import DvrTable from './DvrTable'

const useStyles = makeStyles((theme) => ({
    heading: {
        marginBottom: theme.spacing(2)
    },
    textFiled: {
        marginBottom: theme.spacing(2)
    },
}))



export default function DvrRegistration({ clientId }) {
    const classes = useStyles();

    //All Dvr state
    const [dvrDetails, setDvrDetails] = useState([]);

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

    const [formDate, setFormData] = useState({
        type: "",
        brand: "",
        hardwareName: "",
        port: "",
        userName: "",
        password: ""
    });



    const onChange = (e) => setFormData({ ...formDate, [e.target.name]: e.target.value })
    const { type, brand, hardwareName, port, userName, password } = formDate;

    const data = {
        Type: type,
        Brand: brand,
        HardwareName: hardwareName,
        Port: port,
        Username: userName,
        Password: password,
        Timelogged: moment().format('lll')
    }

    const handleSubmit = () => {
        if (!type || !brand || !hardwareName || !port || !userName || !password) {
            setFieldMissing(true)
        }
        else {
            firedb
                .collection(`Clients_data/${clientId}/Settings/Camera_details/Dvr`)
                .add(data)
                .then((res) => {
                    setRegSuccess(true);
                    formReset();
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }
    }

    const formReset = () => {
        setFormData({
            type: "",
            brand: "",
            hardwareName: "",
            port: "",
            userName: "",
            password: ""
        })
    }

    useEffect(() => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/Camera_details/Dvr`)
            .orderBy("Timelogged", "desc")
            .onSnapshot((dvr) => {
                const dvrDetailsArray = [];
                dvr.forEach((item) => {
                    dvrDetailsArray.push({ ...item.data(), Vid: item.id })
                })
                setDvrDetails(dvrDetailsArray);
            })
    }, [clientId]);

    return (
        <Grid container spacing={3}>
            <Grid item lg={4}>
                <Box>
                    <Typography align="center" variant="subtitle1" className={classes.heading}>DVR Settings</Typography>
                    <ValidatorForm>
                        <SelectValidator
                            className={classes.textFiled}
                            name="type"
                            value={type}
                            onChange={(e) => onChange(e)}
                            label="Type"
                            fullWidth
                            variant="outlined"
                            placeholder="Brand"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        >
                            <option value={"Dvr"}>DVR</option>
                            <option value={"Nvr"}>NVR</option>
                            <option value={"Ip Camera"}>IP Camera</option>
                        </SelectValidator>

                        <SelectValidator
                            fullWidth
                            variant="outlined"
                            placeholder="Brand"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            className={classes.textFiled}
                            name="brand"
                            value={brand}
                            onChange={(e) => onChange(e)}
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
                            name="hardwareName"
                            value={hardwareName}
                            onChange={(e) => onChange(e)}
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
                            name="port"
                            value={port}
                            onChange={(e) => onChange(e)}

                        />
                        <TextValidator
                            placeholder="User Name"
                            label="User Name"
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}

                            validators={['required']}
                            errorMessages={['This field is required']}
                            name="userName"
                            value={userName}
                            onChange={(e) => onChange(e)}
                        />
                        <TextValidator
                            type="password"
                            placeholder="Password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            className={classes.textFiled}

                            validators={['required']}
                            errorMessages={['This field is required']}
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                        <Button
                            type="submit"
                            onClick={() => handleSubmit()}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Register DVR
                        </Button>
                    </ValidatorForm>
                </Box>
            </Grid>
            <Grid item lg={8}>
                <DvrTable dvrData={dvrDetails} />
            </Grid>


            <Snackbar open={fieldMissing} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error">
                    Please enter all the required details!
                </Alert>
            </Snackbar>
            <Snackbar open={regSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    DVR registered successfully!
                </Alert>
            </Snackbar>
        </Grid>
    )
}
