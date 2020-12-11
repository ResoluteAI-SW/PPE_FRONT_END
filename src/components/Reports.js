import React, { useState, useContext } from 'react';
import { clientContext } from '../App';
import {
    Grid,
    Typography,
    withStyles,
    Tabs,
    Tab,
    makeStyles,
    Box
} from '@material-ui/core';
import PpeAlertsReports from './PpeAlertsReports';
import AttendanceReports from './AttendanceReports'


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

export default function Reports() {
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //GET THE CLIENT ID FROM CONTEXT
    const client = useContext(clientContext);
    const clientId = client.clientId;
    return (
        <Grid container>
            <Typography variant="h2" className={classes.heading}>Reports</Typography>
            <Grid item lg={12}>
                <AntTabs
                    value={value}
                    onChange={handleChange}
                >
                    <AntTab label="PPE Alert Reports" />
                    <AntTab label="Attendance Reports" />
                </AntTabs>
                <div style={{ marginTop: "3%" }}>
                    <TabPanel value={value} index={0}>
                        <PpeAlertsReports clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AttendanceReports clientId={clientId} />
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    )
}
