import React, { useState, useContext } from 'react';

//CLIENT CONTEXT
import { AuthContext } from '../components/auth/AuthContext';

//Components imports
import DvrRegistration from './subsettings/DvrRegistration'
import IpCameraRegistration from './subsettings/IpCameraRegistration';
import Sensitivity from './subsettings/Sensitivity';
import FrameThreshold from './subsettings/FrameThreshold';
import LoginLogoutTime from './subsettings/LoginLogoutTime';
import PPESettings from './subsettings/PPESettings';

//Mui
import {
    Grid,
    Typography,
    withStyles,
    Tabs,
    Tab,
    makeStyles,
    Box
} from '@material-ui/core';


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

export default function Settings() {
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //GET THE CLIENT ID FROM CONTEXT
    const client = useContext(AuthContext);
    const clientId = client.clientId;
    return (
        <Grid container>
            <Typography variant="h2" className={classes.heading}>Settings</Typography>
            <Grid item lg={12}>
                <AntTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <AntTab label="DVR Settings" />
                    <AntTab label="IP Camera" />
                    <AntTab label="Sensitivity" />
                    <AntTab label="Time" />
                    <AntTab label="Threshold" />
                    <AntTab label="PPE Settings" />
                </AntTabs>
                <div style={{ marginTop: "3%" }}>
                    <TabPanel value={value} index={0}>
                        <DvrRegistration clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <IpCameraRegistration clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Sensitivity clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <LoginLogoutTime clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <FrameThreshold clientId={clientId} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <PPESettings clientId={clientId} />
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    )
}
