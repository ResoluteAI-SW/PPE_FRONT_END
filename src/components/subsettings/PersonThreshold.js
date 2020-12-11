import React, { useState, useEffect } from 'react';

//Fireabse
import { firedb } from '../../firebase/firebase';

//Mui
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

export default function PersonThreshold({ clientId }) {

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
                "person_threshold": current
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
            .collection(`Clients_data/${clientId}/Settings/`)
            .doc('GeneralSettings')
            .onSnapshot((res) => {
                setUpdatedValue(res.data().person_threshold)
            })
    }, [clientId]);
    return (
        <Grid>
            <Typography variant="h3" align="center">Current Person Threshold Level</Typography>
            <Typography variant="h4" align="center">{updatedValue}</Typography>
            <Typography variant="subtitle1" align="center">Set person threshold level</Typography>
            <Box mx="auto" style={{ maxWidth: "200px" }} align="center">
                <form>
                    <FormControl variant='outlined' fullWidth margin="normal">
                        <InputLabel fullWidth>Threshold level</InputLabel>
                        <Select
                            native
                            name="current"
                            value={current}
                            onChange={(e) => onChange(e)}
                            label='Sensitivity level'
                        >
                            <option value={0.5}>0.5</option>
                            <option value={0.6}>0.6</option>
                            <option value={0.7}>0.7</option>
                            <option value={0.8}>0.8</option>
                            <option value={0.9}>0.9</option>
                            <option value={1}>1</option>
                        </Select>
                    </FormControl>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={(e) => handleSubmit(e)}
                        disabled={disabled}
                        fullWidth
                    >Set Threshold</Button>
                </form>
            </Box>
            <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    Threshold Level Changed!
                </Alert>
            </Snackbar>
        </Grid>
    )
}
