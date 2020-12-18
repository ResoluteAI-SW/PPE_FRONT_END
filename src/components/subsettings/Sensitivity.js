import React, { useState, useEffect } from 'react';
import { firedb } from '../../firebase/firebase';
import {
    Grid,
    Typography,
    Box,
    FormControl,
    Select,
    Button,
    InputLabel,
    Snackbar,
    Slide
} from '@material-ui/core'
import { Alert } from '@material-ui/lab';

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Sensitivity({ clientId }) {

    //Snackbar state
    const [saveSuccess, setSaveSuccess] = useState(false);

    //SNACK BAR CLOSE
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveSuccess(false)
    };

    //Form state
    const [current, setCurrent] = useState("");
    const [updatedValue, setUpdatedValue] = useState("");
    const [disabled, setDisabled] = useState(true);

    const onChange = (e) => {
        setCurrent(e.target.value);
        setDisabled(false);
    };
    const handleSubmit = (e) => {

        firedb
            .collection(`Clients_data/${clientId}/Settings/`)
            .doc('GeneralSettings')
            .update({
                "DetectionSensitivity": current
            })
            .then((res) => {
                setSaveSuccess(true)
            })
            .catch((err) => {
                console.log(err.message)
            });

        setDisabled(true);

    };

    useEffect(() => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/`)   //get the current sensitivity value
            .doc('GeneralSettings')
            .onSnapshot((res) => {
                setUpdatedValue(res.data().DetectionSensitivity)
            })
    }, [clientId]);
    return (
        <Grid>
            <Typography variant="h3" align="center">Current Sensitivity Level</Typography>
            <Typography variant="h4" align="center">{updatedValue}</Typography>
            <Typography variant="subtitle1" align="center">Set Sensitivity level</Typography>
            <Box mx="auto" style={{ maxWidth: "200px" }} align="center">
                <form>
                    <FormControl variant='outlined' fullWidth margin="normal">
                        <InputLabel fullWidth>Sensitivity level</InputLabel>
                        <Select
                            native
                            name="current"
                            value={current}
                            onChange={(e) => onChange(e)}
                            label='Sensitivity level'
                        >
                            <option value={40}>40</option>
                            <option value={140}>140</option>
                            <option value={240}>240</option>
                            <option value={320}>320</option>
                        </Select>
                    </FormControl>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={(e) => handleSubmit(e)}
                        disabled={disabled}
                        fullWidth
                    >Set Sensitivity</Button>
                </form>
            </Box>
            <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    Sensitivity Level Changed!
                </Alert>
            </Snackbar>
        </Grid>
    )
}
