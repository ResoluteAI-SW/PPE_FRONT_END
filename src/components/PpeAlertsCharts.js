import React, { useState } from 'react';
import PpeTracking from './PpeTracking';
import { Doughnut } from 'react-chartjs-2';
import Chart from "chart.js";
import {
    Typography,
    Grid,
    Box,
    Button,
    makeStyles
} from '@material-ui/core';
import {
    ArrowBack
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    colorGrey: {
        color: "rgba(0,0,0,0.6)"
    },
    marginBtm: {
        marginBottom: theme.spacing(5)
    }
}));
export default function PpeAlertsCharts() {
    const classes = useStyles();

    const [Data, setData] = useState({
        datasets: [
            {
                borderWidth: 1,
                borderAlign: "center",
                hoverBorderColor: "white",
                backgroundColor: ["#f05454", "#f7f5f8"],
                hoverBackgroundColor: ["#f05454", "#f7f5f8"],
                data: [20, 100],
            },
        ],
    });

    const [options, setOptions] = useState({
        tooltips: {
            enabled: false,
        },
        cutoutPercentage: 80,
        legend: {
            display: false,
        },
        aspectRatio: 2,
    });

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = "20%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        },
    });

    const [goBack, setGoBack] = useState(false)
    if (goBack) {
        return (
            <PpeTracking />
        )
    }
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} className={classes.marginBtm}>
                <Box textAlign="left">
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => setGoBack(true)}
                        color="primary"
                    >
                        Go back
                    </Button>
                </Box>
                <Typography variant="h1" className={classes.colorGrey}>Location :
                <span style={{ fontSize: "19px", fontWeight: "500", color: "black" }}> Surgery Room </span>
                </Typography>
            </Grid>

            <Grid item lg={5} container direction="column" justify="center">
                <Box align="center">
                    <Typography variant="h1" className={classes.colorGrey} align="center">Total People Detected  </Typography>
                    <Typography variant="h4">7</Typography>
                </Box>
            </Grid>
            <Grid item lg={7}>
                <Box >
                    <Typography variant="subtitle1" align="center" className={classes.marginBtm}>
                        PPE Alerts Detected On Persons
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item lg={4} className={classes.marginBtm} className={classes.marginBtm}>
                            <Doughnut data={Data} options={options} />
                            <Typography align="center">No  Body Suit</Typography>
                        </Grid>
                        <Grid item lg={4} className={classes.marginBtm}>
                            <Doughnut data={Data} options={options} />
                            <Typography align="center">No  Boots</Typography>
                        </Grid>
                        <Grid item lg={4} className={classes.marginBtm}>
                            <Doughnut data={Data} options={options} />
                            <Typography align="center">No  Gloves</Typography>
                        </Grid>
                        <Grid item lg={4} className={classes.marginBtm}>
                            <Doughnut data={Data} options={options} />
                            <Typography align="center">No  Headgear</Typography>
                        </Grid>
                        <Grid item lg={4} className={classes.marginBtm}>
                            <Doughnut data={Data} options={options} />
                            <Typography align="center">No  Mask</Typography>
                        </Grid>
                        <Grid item lg={4} className={classes.marginBtm}>
                            <Doughnut data={Data} options={options} />
                            <Typography align="center">No  Safety Goggles</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
