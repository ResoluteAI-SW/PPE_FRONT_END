import React, { useState, useEffect } from 'react'
import {
    Grid,
    Typography,
    Box,
    makeStyles,
    Select,
    MenuItem,
    Divider,
    Avatar,
    Table,
    TableBody,
    TableHead,
    TableFooter,
    Button,
    TableCell,
    TableRow,
    TextField,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { firedb } from '../../firebase/firebase';
import hazmatSuit from '../../assets/images/hazmat-suit.jpg'
import gloves from '../../assets/images/gloves.jpeg'
import hardCap from '../../assets/images/hard-cap.jpg'
import faceShield from '../../assets/images/face-shield.jpg'
import boots from '../../assets/images/boots.jpeg'
import respirator from '../../assets/images/respirator.jpg'

const useStyles = makeStyles((theme) => ({
    marginBtm: {
        marginBottom: theme.spacing(4)
    },
    marginTB: {
        margin: theme.spacing(3, 0, 3, 0)
    }
}))
export default function PpeWarning({ clientId }) {
    const classes = useStyles();

    const [saveSuccess, setSaveSuccess] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveSuccess(false)
    };

    const [formData, setFormData] = useState({
        ppeHazmatSuit: "red",
        ppeGloves: "red",
        ppeHardCap: "yellow",
        ppeShield: "red",
        ppeBoots: "red",
        ppeRespirator: "red",
        redMin: "5",
        redSec: "00",
        yellowMin: "10",
        yellowSec: "00",
    });
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { ppeBoots, ppeHazmatSuit, ppeShield, ppeRespirator, ppeHardCap, ppeGloves, redMin, redSec, yellowMin, yellowSec } = formData;
    const dataPrep = {

        "hazmat_suit": ppeHazmatSuit,
        "face_shield": ppeShield,
        "gloves": ppeGloves,
        "respirator": ppeRespirator,
        "boots": ppeBoots,
        "hard_cap": ppeHardCap,
        "Time": {
            "red": `${redMin}:${redSec}`,
            "yellow": `${yellowMin}:${yellowSec}`,
        }

    }
    const handleSave = () => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/`)
            .doc('GeneralSettings')
            .update({
                "PpeWarnings": dataPrep
            })
            .then((res) => {
                setSaveSuccess(true)
            })
            .catch((err) => {
                console.log(err.message)
            });
    }
    useEffect(() => {
        firedb
            .collection(`Clients_data/${clientId}/Settings/`)
            .doc('GeneralSettings')
            .onSnapshot((res) => {
                const ppeData = res.data().PpeWarnings
                const redTime = ppeData.Time.red.split(":")
                const yellowTime = ppeData.Time.yellow.split(":")

                setFormData({
                    ppeHazmatSuit: ppeData.hazmat_suit,
                    ppeGloves: ppeData.gloves,
                    ppeHardCap: ppeData.hard_cap,
                    ppeShield: ppeData.face_shield,
                    ppeBoots: ppeData.boots,
                    ppeRespirator: ppeData.respirator,
                    redMin: redTime[0],
                    redSec: redTime[1],
                    yellowMin: yellowTime[0],
                    yellowSec: yellowTime[1],
                })
            })
    }, [clientId]);
    return (
        <Grid container spacing={2}>
            <Grid item lg={6}>
                <Typography variant="subtitle1" className={classes.marginBtm}>Configure Your PPE Warning Types</Typography>
                <Grid container>
                    <Grid item lg={4}>
                        <Box>
                            <Avatar>
                                <img src={hazmatSuit} width="100%" />
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item lg={4} container direction="column" justify="center">
                        <Typography>Hazmat Suit</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Select
                            name="ppeHazmatSuit"
                            value={ppeHazmatSuit}
                            onChange={(e) => onChange(e)}
                        >
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider className={classes.marginTB} />
                <Grid container>
                    <Grid item lg={4}>
                        <Box>
                            <Avatar>
                                <img src={gloves} width="100%" />
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item lg={4} container direction="column" justify="center">
                        <Typography>Gloves</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Select
                            name="ppeGloves"
                            value={ppeGloves}
                            onChange={(e) => onChange(e)}
                        >
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider className={classes.marginTB} />
                <Grid container>
                    <Grid item lg={4}>
                        <Box>
                            <Avatar>
                                <img src={hardCap} width="100%" />
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item lg={4} container direction="column" justify="center">
                        <Typography>Hard Cap</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Select
                            name="ppeHardCap"
                            value={ppeHardCap}
                            onChange={(e) => onChange(e)}
                        >
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider className={classes.marginTB} />
                <Grid container>
                    <Grid item lg={4}>
                        <Box>
                            <Avatar>
                                <img src={faceShield} width="100%" />
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item lg={4} container direction="column" justify="center">
                        <Typography>Face Shield</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Select
                            name="ppeShield"
                            value={ppeShield}
                            onChange={(e) => onChange(e)}
                        >
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider className={classes.marginTB} />
                <Grid container>
                    <Grid item lg={4}>
                        <Box>
                            <Avatar>
                                <img src={boots} width="100%" />
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item lg={4} container direction="column" justify="center">
                        <Typography>Boots</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Select
                            name="ppeBoots"
                            value={ppeBoots}
                            onChange={(e) => onChange(e)}
                        >
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Divider className={classes.marginTB} />
                <Grid container>
                    <Grid item lg={4}>
                        <Box>
                            <Avatar>
                                <img src={respirator} width="100%" />
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item lg={4} container direction="column" justify="center">
                        <Typography>Respirators</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Select
                            name="ppeRespirator"
                            value={ppeRespirator}
                            onChange={(e) => onChange(e)}
                        >
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="yellow">Yellow</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6}>
                <Typography variant="subtitle1" className={classes.marginBtm}>Set Your PPE Warning Time</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Type</b></TableCell>
                            <TableCell align="center"><b>Minutes</b></TableCell>
                            <TableCell align="center"><b>Seconds</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">Red</TableCell>
                            <TableCell align="center">
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    label="Minutes"
                                    size="small"
                                    placeholder="5"
                                    name="redMin"
                                    value={redMin}
                                    onChange={(e) => onChange(e)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    label="Seconds"
                                    size="small"
                                    placeholder="00"
                                    name="redSec"
                                    value={redSec}
                                    onChange={(e) => onChange(e)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Yellow</TableCell>
                            <TableCell align="center">
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    label="Minutes"
                                    size="small"
                                    placeholder="10"
                                    name="yellowMin"
                                    value={yellowMin}
                                    onChange={(e) => onChange(e)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    label="Seconds"
                                    size="small"
                                    placeholder="20"
                                    name="yellowSec"
                                    value={yellowSec}
                                    onChange={(e) => onChange(e)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Box align="center">
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save Settings
                        </Button>
                </Box>
            </Grid>
            <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success">
                    PPE warnings saved !
                </Alert>
            </Snackbar>
        </Grid>
    )
}
