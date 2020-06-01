import React, { useState, useEffect, createContext } from "react";
import clsx from "clsx";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TrackChangesTwoToneIcon from "@material-ui/icons/TrackChangesTwoTone";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DoneOutlineTwoToneIcon from "@material-ui/icons/DoneOutlineTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import Logo from "../Media/Images/ResoluteAI-In-black-bg-social-media.png";
import Settings from "./Settings/Settings";
import firebase from "../FirebaseConfig";
import { db, rdb } from "../FirebaseConfig";
import PlaceDashboard from "./Tracking/PlaceDashboard";
import NavigationReports from "./Reports/NavigationReports";
import NavigationTabs from "./PersonProfile/NavigationTabs";
import SocialDistancingDashboard from "./SocialDistance/PlaceDashboard";
import LoadingScreen from "./LoadingScreen";
import moment from "moment";

const drawerWidth = 240;
var doc = null;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "black",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: "white",
    backgroundColor: "black",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const StyledListItem = withStyles({
  root: {
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: "grey",
      color: "black",
    },
  },
  label: {
    textTransform: "capitalize",
  },
  selected: {
    boxShadow: "5px 3px 5px 3px rgba(155, 40, 42, .6)",
    borderLeft: 10,
    borderColor: "#9B282A",
    "&:hover": {
      backgroundColor: "grey",
      color: "white",
    },
    height: 55,
    fontSize: 25,
    fontWeight: "bold",
  },
})(ListItem);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#0066ff",
      main: "#9B282A",
      contrastText: "#ffffff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const UserContext = createContext();

export default function AdminDashboard(props) {
  const classes = useStyles();
  const [userDoc, setUserDoc] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("Configurations");
  const mainListItems = (
    <ThemeProvider theme={theme}>
      <div>
        <StyledListItem
          button
          onClick={() => {
            setTitle("Register Employees");
          }}
          selected={title === "Register Employees"}
        >
          <Tooltip title="Register Employees" placement="right-start" arrow>
            <ListItemIcon>
              <PersonAddTwoToneIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Register Employees" />
        </StyledListItem>
        <StyledListItem
          button
          onClick={() => {
            setTitle("PPE Tracking");
          }}
          selected={title === "PPE Tracking"}
        >
          <Tooltip title="PPE Tracking" placement="right-start" arrow>
            <ListItemIcon>
              <TrackChangesTwoToneIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="PPE Tracking" />
        </StyledListItem>
        <StyledListItem
          button
          onClick={() => {
            setTitle("Reports");
          }}
          selected={title === "Reports"}
        >
          <Tooltip title="Reports" placement="right-start" arrow>
            <ListItemIcon>
              <AssessmentIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Reports" />
        </StyledListItem>
        <StyledListItem
          button
          onClick={() => {
            setTitle("Configurations");
          }}
          selected={title === "Configurations"}
        >
          <Tooltip title="Configurations" placement="right-start" arrow>
            <ListItemIcon>
              <SettingsTwoToneIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Configurations" />
        </StyledListItem>
        <StyledListItem
          button
          onClick={() => {
            setTitle("Social Distancing");
          }}
          selected={title === "Social Distancing"}
        >
          <Tooltip title="Configurations" placement="right-start" arrow>
            <ListItemIcon>
              <DoneOutlineTwoToneIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Social Distancing" />
        </StyledListItem>
      </div>
    </ThemeProvider>
  );

  useEffect(() => {
    db.collection("users")
      .where("email", "==", props.user.email)
      .get()
      .then((querySnapshot) => {
        doc = querySnapshot.docs[0];
        setUserDoc(doc);
        var persons = [];
        db.collection("people")
          .where("adminEmail", "==", doc.data().email)
          .get()
          .then((querySnapshot) =>
            querySnapshot.forEach((doc) => {
              let obj = {};
              obj.id = doc.id;
              obj.data = doc.data();
              persons = persons.concat(obj);
            })
          )
          .then(() => {
            for (let i = 0; i < persons.length; i++) {
              console.log(persons[i]);
              console.log(persons[i].id);
            }
            let socket = new WebSocket(
              "wss://facegenie.co/ws/responser/192.168.29.126/"
            );
            socket.onopen = () => {
              console.log("Connection Established");
            };
            const todayDate = moment().format("DD MMM YYYY");
            socket.onmessage = function (data) {
              attendanceTracking(data, persons, todayDate);
            };
            socket.onclose = function (data) {
              console.log("onclose");
              console.log(data);

              socket.onerror = function (data) {
                console.log("error");
                console.log(data);
              };
            };
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [props.user.email]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    console.log("clicked");
    firebase
      .auth()
      .signOut()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  };

  if (userDoc === null || userDoc === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={Logo}
              alt="Not available"
              style={{ height: "60px", width: "60px", marginRight: "20px" }}
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <b className="w3-animate-left">
                {"Welcome to Facegenie PPE Client"}
              </b>
            </Typography>
            <Button onClick={logout} style={{ color: "white" }}>
              Sign Out ({`${userDoc.data().username}`})
            </Button>
          </Toolbar>
        </AppBar>
        <ThemeProvider theme={theme}>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon color="primary" />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
          </Drawer>
        </ThemeProvider>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxwidth="lg" className={classes.container}>
            <UserContext.Provider value={userDoc}>
              <RenderComponent component={title} />
            </UserContext.Provider>
          </Container>
        </main>
      </div>
    </div>
  );
}

function attendanceTracking(data, persons, todayDate) {
  console.log("on message", data);
  const obj = JSON.parse(data.data);
  console.log(obj.message.users);
  const usersDetected = obj.message.users;
  console.log("mask detected response: ", obj.message.mask_detected);
  const maskField = obj.message.mask_detected === "True" ? "Mask" : "No Mask";
  for (let i = 0; i < usersDetected.length; i++) {
    console.log("looping inside usersDetected");
    for (let j = 0; j < persons.length; j++) {
      console.log("looping inside persons detected");
      console.log("person id: ", persons[j].id);
      console.log("user:", usersDetected[i]);
      console.log("check bool: ", usersDetected[i] === persons[j].id);
      if (persons[j].id === usersDetected[i]) {
        console.log("reached at person id===user id");
        rdb
          .ref(`/Attendance/${doc.id}/${todayDate}/${persons[j].id}`)
          .set({
            Name: persons[j].data.name,
            Department: persons[j].data.department,
            Login: moment().format("HH:mm:ss"),
            Logout: moment().format("HH:mm:ss"),
            Designation: "Researcher",
            Mask: maskField,
          })
          .then((res) =>
            console.log("response after writing socket message: ", res)
          )
          .catch((err) => console.log(err));
      }
    }
  }
}

function RenderComponent(props) {
  const componentMap = {
    Reports: <NavigationReports />,
    "Register Employees": <NavigationTabs />,
    Configurations: <Settings />,
    "PPE Tracking": <PlaceDashboard />,
    "Social Distancing": <SocialDistancingDashboard />,
  };
  return <div>{componentMap[props.component]}</div>;
}
