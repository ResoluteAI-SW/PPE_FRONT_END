import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    makeStyles,
    Box,
    Button,
    Divider
} from '@material-ui/core';
import {
    PinDrop,
    People,
    VideoCall
} from '@material-ui/icons';
import SocialDistanceLogs from './SocialDistanceLogs'

const useStyles = makeStyles((theme) => ({
    marginBtm: {
        marginBottom: theme.spacing(3)
    },
    cardBody: {
        padding: "20px"
    },
    cardFoot: {
        padding: " 0px 20px 20px 20px"
    },
    cardGreen: {
        backgroundColor: "#4caf50",
        padding: theme.spacing(3, 0)
    },
    cardRed: {
        backgroundColor: "#F72A1F",
        padding: theme.spacing(3, 0)
    },
    cardStatus: {
        color: "#fff",
        fontSize: "15px",
        fontWeight: "600"
    },
    cardFont: {
        fontSize: "12px",
        fontWeight: "600",
        color: "rgba(0,0,0,0.6)"
    },
    colorRed: {
        color: "#F72A1F"
    },
}))

export default function SocialDistance() {
    const classes = useStyles();
    const [showData, setShowData] = useState(false);

    if (showData) {
        return (
            <SocialDistanceLogs data={"Some data"} />
        )
    }
    return (
        <Grid container spacing={2}>
            <Grid item lg={12}>
                <Typography variant="h2" className={classes.marginBtm}>Social Distance Monitoring</Typography>
            </Grid>
            <Grid item lg={4}>
                <Paper>
                    <div className={true ? classes.cardRed : classes.cardGreen}>
                        <Typography align="center" className={classes.cardStatus} >Status</Typography>
                    </div>
                    <Box className={classes.cardBody} >
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <PinDrop color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Location
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>Surgery Room</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <People color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    On Duty
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>10</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <VideoCall color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Camera Name
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>#Surgical Room</Typography>
                        </Box>


                    </Box>
                    <div className={classes.cardFoot}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={(e) => setShowData(true)}
                        >
                            View
                        </Button>
                    </div>
                </Paper>
            </Grid>

            <Grid item lg={4}>
                <Paper>
                    <div className={false ? classes.cardRed : classes.cardGreen}>
                        <Typography align="center" className={classes.cardStatus} >Status</Typography>
                    </div>
                    <Box className={classes.cardBody} >
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <PinDrop color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Location
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>Operation Theater</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <People color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    On Duty
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>10</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <VideoCall color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Camera Name
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>#OT</Typography>
                        </Box>


                    </Box>
                    <div className={classes.cardFoot}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            View
                        </Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper>
                    <div className={false ? classes.cardRed : classes.cardGreen}>
                        <Typography align="center" className={classes.cardStatus} >Status</Typography>
                    </div>
                    <Box className={classes.cardBody} >
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <PinDrop color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Location
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>Surgery Room</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <People color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    On Duty
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>10</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <VideoCall color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Camera Name
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>#Surgical Room</Typography>
                        </Box>


                    </Box>
                    <div className={classes.cardFoot}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            View
                        </Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper>
                    <div className={false ? classes.cardRed : classes.cardGreen}>
                        <Typography align="center" className={classes.cardStatus} >Status</Typography>
                    </div>
                    <Box className={classes.cardBody} >
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <PinDrop color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Location
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>Surgery Room</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <People color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    On Duty
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>10</Typography>
                        </Box>
                        <Divider style={{ margin: "13px 0px" }} />
                        <Box display="flex">
                            <Box flexGrow="1">
                                <Typography className={classes.cardFont}>
                                    <VideoCall color="primary" style={{ fontSize: "15px", marginRight: "14px" }} />
                                    Camera Name
                                </Typography>
                            </Box>
                            <Typography className={classes.cardFont}>#Surgical Room</Typography>
                        </Box>


                    </Box>
                    <div className={classes.cardFoot}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            View
                        </Button>
                    </div>
                </Paper>
            </Grid>
        </Grid >
    )
}
