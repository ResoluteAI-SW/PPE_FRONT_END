import React, { useState, useContext } from 'react';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { Alert } from '@material-ui/lab';
import WebCam from './WebCam';
import { firedb, storageRef } from '../firebase/firebase';
import { clientContext } from '../App';
import {
    Button,
    Grid,
    makeStyles,
    Typography,
    Box,
    Snackbar
} from '@material-ui/core';
import {
    GroupAdd,
    PhotoSizeSelectActual
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    marginBtm: {
        marginBottom: theme.spacing(2)
    }
}))

export default function Register() {
    const classes = useStyles();
    const client = useContext(clientContext);
    const clientId = client.clientId;
    const [fieldMissing, setFieldMissing] = useState(false);
    const [imageMissing, setImageMissing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [webCamSrc, setWebCamSrc] = useState("");
    const [formData, setFormData] = useState({
        regNo: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        joiningDate: "",
        department: "",
        employeeType: "",
        dob: ""
    });
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const { regNo, firstName, lastName, email, phone, gender, joiningDate, department, employeeType, dob } = formData;
    const dataPrep = {
        Employee_details: {
            "first_name": firstName,
            "last_name": lastName,
            "Dob": dob,
            "Gender": gender,
            "Email": email,
            "Phone": phone,
            "Face": ""
        },
        Registration_Num: regNo,
        Type: employeeType,
        Joining_date: joiningDate,
        Department_details: {
            "department": department
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFieldMissing(false);
        setImageMissing(false);
        setSuccess(false)
    };

    const getImageSrc = (src) => {
        setWebCamSrc(src);
    }
    const resetImage = () => {
        setWebCamSrc("");
    }
    const handleRegister = () => {
        if (!regNo || !firstName || !lastName || !email || !phone || !department || !employeeType || !dob) {
            setFieldMissing(true);
        }
        else if (webCamSrc === "") {
            setImageMissing(true)
        }
        else {
            const staffRef = firedb.collection(`Clients_data/${clientId}/AllUsers/TargetUsers/TargetUserCollection`).doc();
            let frame_trim = webCamSrc.replace("data:image/jpeg;base64,", "");
            const uploadTask = storageRef
                .child(`/Users/Target_users/${clientId}/Staff/${staffRef.id}/Face`)
                .putString(frame_trim, "base64", { contentType: "image/jpeg" });

            uploadTask.on('state_changed',
                (snapshot) => {

                },
                (err) => {

                },
                () => {
                    storageRef.child(`/Users/Target_users/${clientId}/Staff/${staffRef.id}/Face`).getDownloadURL()
                        .then((url) => {
                            const staffInfo = {
                                ...dataPrep,
                                "StorageLinks": {
                                    "Face": url
                                }
                            }
                            staffRef.set(staffInfo)
                                .then((res) => {
                                    setSuccess(true)
                                    resetForm()
                                })

                        })
                }
            )
        }
    }
    const resetForm = () => {
        setFormData({
            regNo: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
            joiningDate: "",
            department: "",
            employeeType: "",
            dob: ""
        });
        setWebCamSrc("")
    }
    return (
        <Grid container spacing={4}>
            <Grid item lg={6}>
                <Box align="center" className={classes.marginBtm}>
                    <PhotoSizeSelectActual color="primary" />
                    <Typography variant="subtitle1" >Capture Photo</Typography>
                </Box>
                <Box mx="auto" style={{ maxWidth: "400px" }}>
                    {
                        webCamSrc === "" ?
                            <WebCam getImageSrc={getImageSrc} /> :
                            <div align="center">
                                <img src={webCamSrc} alt="Employee Photo" />
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    style={{ marginTop: "10px" }}
                                    onClick={resetImage}
                                >
                                    Retake
                                </Button>
                            </div>
                    }
                </Box>

            </Grid>
            <Grid item lg={6}>
                <Box align="center" className={classes.marginBtm}>
                    <GroupAdd color="primary" />
                    <Typography variant="subtitle1" >Employee Details</Typography>
                </Box>
                <ValidatorForm>
                    <TextValidator
                        label="Employee Reg No"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        className={classes.marginBtm}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        name="regNo"
                        value={regNo}
                        onChange={(e) => onChange(e)}
                    />
                    <Grid container spacing="2">
                        <Grid item lg={6}>
                            <TextValidator
                                label="First Name"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                className={classes.marginBtm}
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                name="firstName"
                                value={firstName}
                                onChange={(e) => onChange(e)}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <TextValidator
                                label="Last Name"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                className={classes.marginBtm}
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                name="lastName"
                                value={lastName}
                                onChange={(e) => onChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <TextValidator
                        type="email"
                        label="Email Address"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        className={classes.marginBtm}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                    <TextValidator
                        type="number"
                        label="Mobile Number"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        className={classes.marginBtm}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        name="phone"
                        value={phone}
                        onChange={(e) => onChange(e)}
                    />
                    <SelectValidator
                        fullWidth
                        variant="outlined"
                        className={classes.marginBtm}
                        label="Department"
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                        name="department"
                        value={department}
                        onChange={(e) => onChange(e)}

                    >
                        <option value={"icu"}>ICU</option>
                        <option value={"pharmacy"}>Pharmacy</option>
                        <option value={"cardiology"}>Cardiology</option>
                    </SelectValidator>
                    <Grid container spacing="2">
                        <Grid item lg={6}>
                            <SelectValidator
                                fullWidth
                                variant="outlined"
                                className={classes.marginBtm}
                                label="Gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => onChange(e)}
                            >
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"others"}>Others</option>
                            </SelectValidator>
                        </Grid>
                        <Grid item lg={6}>
                            <TextValidator
                                label="DOB"
                                variant="outlined"
                                color="primary"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                className={classes.marginBtm}
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                name="dob"
                                value={dob}
                                onChange={(e) => onChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing="2">
                        <Grid item lg={6}>
                            <SelectValidator
                                fullWidth
                                variant="outlined"
                                className={classes.marginBtm}
                                label="Employee Type"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                name="employeeType"
                                value={employeeType}
                                onChange={(e) => onChange(e)}

                            >
                                <option value={"doctor"}>Doctor</option>
                                <option value={"nurse"}>Nurse</option>
                                <option value={"others"}>Others</option>
                            </SelectValidator>
                        </Grid>
                        <Grid item lg={6}>
                            <TextValidator
                                label="Joining Date"
                                variant="outlined"
                                color="primary"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                className={classes.marginBtm}
                                name="joiningDate"
                                value={joiningDate}
                                onChange={(e) => onChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        color="primary"
                        onClick={(e) => handleRegister()}
                    >
                        Register
                    </Button>
                </ValidatorForm>
                <Snackbar open={fieldMissing} autoHideDuration={6000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error">
                        Please enter all the required details!
                </Alert>
                </Snackbar>
                <Snackbar open={imageMissing} autoHideDuration={6000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error">
                        Please capture employee photo!
                </Alert>
                </Snackbar>
                <Snackbar open={success} autoHideDuration={6000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="success">
                        Employee registered successfully!
                </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}
