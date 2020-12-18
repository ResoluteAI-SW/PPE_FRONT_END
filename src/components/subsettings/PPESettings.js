import React, { useState, useContext } from 'react';
import {
    Grid,
    Typography,
    withStyles,
    Tabs,
    Tab,
    makeStyles,
    Box
} from '@material-ui/core';
import PpeWarnings from './PpeWarning';
import PersonThreshold from './PersonThreshold';
import PpeThreshold from './PpeThreshold';
import DistanceThreshold from './DistanceTreshold';
import DetectionThreshold from './DetectionThreshold';


const useStyles = makeStyles((theme) => ({
    heading: {
        marginBottom: theme.spacing(2)
    }
}))

const AntTabs = withStyles({
    root: {
        borderBottom: "1px solid #e8e8e8",
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        "&$selected": {
            color: "#F72A1F",
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&:focus": {
            color: "#F72A1F",
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

export default function PpeSettings({ clientId }) {
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid item lg={12}>
                <AntTabs
                    value={value}
                    onChange={handleChange}
                >
                    <AntTab label="PPE Warnings" />
                    <AntTab label="Person Threshold" />
                    <AntTab label="PPE Threshold" />
                    <AntTab label="Distance Threshold" />
                    <AntTab label="Detection Threshold" />
                </AntTabs>
                <div style={{ marginTop: "3%" }}>
                    <TabPanel value={value} index={0}>
                        <PpeWarnings clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PersonThreshold clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PpeThreshold clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <DistanceThreshold clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <DetectionThreshold clientId={clientId} />
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    )
}