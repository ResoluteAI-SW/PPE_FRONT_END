import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { clientContext } from '../App';
import resoulteAiLogo from '../assets/images/resoluteai_logo.jpg';
import { Logout } from '../utils/Logout'

import Register from './Register';
import Profiles from './Profiles';
import SettingsPage from './Settings';
import PpeTracking from './PpeTracking';
import Reports from './Reports';
import SocialDistance from './SocialDistance';
import Downloads from './Downloads';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    makeStyles,
    Drawer,
    Hidden,
    useTheme,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    withStyles,
    Grid,
    Button,
    Dialog,
    DialogContent,
    Slide
} from '@material-ui/core';
import {
    AccountCircle,
    Menu,
    PersonAdd,
    TrackChanges,
    Assessment,
    Accessibility,
    GetApp,
    Settings,
    PeopleAlt,
    ExitToApp
} from '@material-ui/icons'

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    baseBox: {
        display: "flex"
    },
    toolBar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(7, 3, 3, 3),
        backgroundColor: "#fafafa",
        // height: "100vh"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    logoHolder: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(5)
    }
}));

const StyledListItem = withStyles({
    root: {
        color: '#828282',
        height: 48,
        '&.Mui-selected': {
            backgroundColor: '#FFE8E9',
            color: 'black',
            borderLeft: '3px solid #F72A14',
            fontWeight: 'bolder',
            '&:hover': {
                backgroundColor: '#FFE8E9',
                color: 'black',
            },
        },
        fontWeight: 'bolder',
        marginBottom: "10px"
    },

})(ListItem);

//Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [title, setTitle] = useState("registerEmployees");

    const [logOutModal, setLogoutModal] = useState(false);
    const modalClose = () => {
        setLogoutModal(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const mainList = (
        <div>
            <div className={classes.logoHolder}>
                <img src={resoulteAiLogo} alt="Resolteai" width="100%" />
            </div>
            <List>
                <StyledListItem
                    onClick={() => setTitle("registerEmployees")}
                    button
                    selected={title === "registerEmployees"}
                >
                    <ListItemIcon><PersonAdd /></ListItemIcon>
                    <ListItemText>Register Employee</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setTitle("employeesProfile")}
                    button
                    selected={title === "employeesProfile"}
                >
                    <ListItemIcon><PeopleAlt /></ListItemIcon>
                    <ListItemText>Employees Profile</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setTitle("ppeTracking")}
                    button
                    selected={title === "ppeTracking"}
                >
                    <ListItemIcon><TrackChanges /></ListItemIcon>
                    <ListItemText>PPE Tracking</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setTitle("reports")}
                    button
                    selected={title === "reports"}
                >
                    <ListItemIcon><Assessment /></ListItemIcon>
                    <ListItemText>Reports</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setTitle("socialDistancing")}
                    button
                    selected={title === "socialDistancing"}
                >
                    <ListItemIcon><Accessibility /></ListItemIcon>
                    <ListItemText>Social Distancing</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setTitle("downloads")}
                    button
                    selected={title === "downloads"}
                >
                    <ListItemIcon><GetApp /></ListItemIcon>
                    <ListItemText>Downloads</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setTitle("settings")}
                    button
                    selected={title === "settings"}
                >
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </StyledListItem>
                <StyledListItem
                    onClick={() => setLogoutModal(true)}
                    button
                    selected={title === "logOut"}
                >
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                </StyledListItem>
            </List>
        </div>
    )

    //Authentication (Check if client is logged in)
    const client = useContext(clientContext);
    console.log(client)

    // Authenticate
    if (client === null) {
        return (
            <Redirect to={{ pathname: "/" }} />
        )
    }
    return (
        <div className={classes.baseBox}>
            <AppBar color="inherit" position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Box
                        style={{ flexGrow: "1" }}
                    >
                        <IconButton
                            color="primary"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton
                            color="primary"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {mainList}
                    </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {mainList}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolBar}></div>
                <RenderComponent component={title} />
            </main>
            <Dialog
                open={logOutModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={modalClose}

            >
                <DialogContent style={{ textAlign: "center", paddingTop: "15px", paddingBottom: "20px" }}>
                    <Typography variant="subtitle1" ><b>Confirm Logout</b></Typography>
                    <Typography style={{ marginBottom: "20px", marginTop: "2%" }}>Are you sure you want to logout?</Typography>
                    <Grid container spacing={2} >
                        <Grid item lg={6}>
                            <Button
                                size="small"
                                color="inherit"
                                variant="contained"
                                onClick={modalClose}>Cancel</Button>
                        </Grid>
                        <Grid item lg={6}>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={Logout}>Ok</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>

    )
}

const RenderComponent = (props) => {
    const componentMap = {
        "registerEmployees": <Register />,
        "employeesProfile": <Profiles />,
        "settings": <SettingsPage />,
        "ppeTracking": <PpeTracking />,
        "reports": <Reports />,
        "socialDistancing": <SocialDistance />,
        "downloads": <Downloads />
    }
    return (
        <div>{componentMap[props.component]}</div>
    )
}


