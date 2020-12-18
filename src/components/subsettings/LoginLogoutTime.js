import React, { useState, useEffect } from 'react';
import { firedb } from '../../firebase/firebase';
import moment from 'moment'
import {
    Grid,
    Typography,
    Box,
    TextField,
    Button,
    makeStyles,
    Snackbar,
    Slide
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    submit: {
        marginTop: "20px"
    },
    longText: {
        fontSize: "29px"
    },
    numberFont: {
        fontSize: "50px"
    }
}))

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginLogoutTime({ clientId }) {
    const classes = useStyles();

    //Snackbar state
    const [saveSuccess, setSaveSuccess] = useState(false);

    //SNACK BAR CLOSE
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveSuccess(false)
    };
    //form state
    const [login, setLogin] = useState("")
    const [logout, setLogOut] = useState("")
    const [disabled, setDisabled] = useState(true);

    //After updated value
    const [updatedLogin, setUpdatedLogin] = useState("")
    const [updatedLogout, setUpdatedLogout] = useState("")

    const onChange = (e) => {
        setLogin(e.target.value)
        setDisabled(false);
    }
    const onChange1 = (e) => {
        setDisabled(false);
        setLogOut(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/`)   //get the current login/logout value
            .doc('GeneralSettings')
            .update({
                OfficeTimings: {
                    login: login,
                    logout: logout
                }
            })
            .then((res) => {
                setSaveSuccess(true)
            })
            .catch((err) => {
                alert(err.message)
            })

    };

    useEffect(() => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/`)   //get the current login/logout value
            .doc('GeneralSettings')
            .onSnapshot((res) => {
                setUpdatedLogin(
                    res.data().OfficeTimings.login
                )
                setUpdatedLogout(
                    res.data().OfficeTimings.logout
                )
            })
    }, [clientId]);

    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography variant="h3" align="center">Current Office Timings</Typography>
                <Typography align="center" variant="h4">
                    {moment(updatedLogin, ["HH.mm"]).format("hh:mm A")} - {moment(updatedLogout, ["HH.mm"]).format("hh:mm A")}
                </Typography>
                <Box mt={2} align="center" mx="auto" style={{ maxWidth: "550px" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <Typography variant="subtitle1" align="center">Set Login Time</Typography>
                            <form>
                                <TextField
                                    type="time"
                                    name="loginTime"
                                    value={login}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    onChange={(e) => onChange(e)}
                                />
                            </form>
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant="subtitle1" align="center"> Set Logout Time</Typography>
                            <form>
                                <TextField
                                    type="time"
                                    name="logoutTime"
                                    value={logout}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    onChange={(e) => onChange1(e)}
                                />
                            </form>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                            onClick={handleSubmit}
                            disabled={disabled}
                        >
                            Set
                    </Button>
                    </Grid>
                </Box>
            </Grid>
            <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    Office Timing Changed!
                </Alert>
            </Snackbar>
        </Grid>
    )
}
