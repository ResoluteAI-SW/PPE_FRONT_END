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
import { db, rdb, storageRef } from "../FirebaseConfig";
import PlaceDashboard from "./Tracking/PlaceDashboard";
import NavigationReports from "./Reports/NavigationReports";
import NavigationTabs from "./PersonProfile/NavigationTabs";
import SocialDistancingDashboard from "./SocialDistance/PlaceDashboard";
import LoadingScreen from "./LoadingScreen";
import moment from "moment";
import GetAppIcon from "@material-ui/icons/GetApp";
import Downloads from "./Downloads/Downloads";
import Firebase from "firebase";
import axios from "axios";

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

/**
 * @Component responsible for admin dashboard entry point.
 * @param {*} props
 */

export default function AdminDashboard(props) {
  const classes = useStyles();
  const [userDoc, setUserDoc] = useState(null); // to check if the user is logged in
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("Configurations"); // to open that component initially
  const [frame, setFrame] = useState(null); // attendance marking frames
  const [socialDistancingFrame, setSocialDistancingFrame] = useState(null); // social distancing frames
  // list of items to be displayed on navigation bar
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
          <Tooltip title="Social Distancing" placement="right-start" arrow>
            <ListItemIcon>
              <DoneOutlineTwoToneIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Social Distancing" />
        </StyledListItem>
        <StyledListItem
          button
          onClick={() => {
            setTitle("Downloads");
          }}
          selected={title === "Downloads"}
        >
          <Tooltip title="Downloads" placement="right-start" arrow>
            <ListItemIcon>
              <GetAppIcon color="primary" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Downloads" />
        </StyledListItem>
      </div>
    </ThemeProvider>
  );

  /**
   * @function responsible for loading all the data and configurations for the logged in user.
   * responsible for connecting sockets for all the IP Cameras
   * responsible for processing the data coming from socket channel
   */

  useEffect(() => {
    db.collection("users")
      .where("email", "==", props.user.email) // loop through the users to get the logged in user
      .get()
      .then((querySnapshot) => {
        // send email and password to backend:::
        doc = querySnapshot.docs[0];
        console.log("email: ", doc.data().email);
        console.log("password: ", doc.data().password);
        let obj = {
          email: doc.data().email,
          password: doc.data().password,
        };
        authenticationBackend(obj);
        setInterval(() => {
          authenticationBackend(obj);
        }, 60 * 5 * 1000);
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
            doc.ref.onSnapshot((doc1) => {
              let ipCamerasSockets = []; // ip cameras sockets
              const todayDate = moment().format("DD MMM YYYY");
              doc.ref.collection("ipCameras").onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  //here doc contains all the ip camera details such as IP Address and the configurations
                  console.log(
                    `wss://facegenie.co/ws/responser/${
                      doc.data().IPAddress
                    }/?token=\'${doc1.data().accessToken}\'`
                  );
                  let socket = new WebSocket(
                    `wss://facegenie.co/ws/responser/${
                      doc.data().IPAddress
                    }/?token=\'${doc1.data().accessToken}\'`
                  );
                  let obj = {
                    socket: socket,
                    IPCamera: doc.data(),
                  };
                  ipCamerasSockets = ipCamerasSockets.concat(obj);
                  // ip camera sockets will be pushed to the list.
                });
                ipCamerasSockets.forEach((obj, index) => {
                  obj.socket.onopen = () => {
                    console.log(
                      "Connection Established on socket: ",
                      obj.IPCamera.IPAddress
                    );
                    // as soon as connection established, request the backend to send data
                    // by sending "send"
                    obj.socket.send("send");
                    // should be changed later
                  };
                  // establishing connection for each socket.
                  obj.socket.onmessage = function (data) {
                    const dataJSON = JSON.parse(data.data);
                    /**
                     * dataJSON = {
                     *  message:{
                     *  frame:"data;image/jpegnmfocewmfioewmowq",
                     * type:"error"
                     * }
                     * }
                     */
                    setFrame(dataJSON.message.frame);
                    // if the message type is social distancing,
                    // set the social distancing frame to state variable.
                    if (dataJSON.message.type === "social_distancing") {
                      console.log(
                        "::::::::::::social distancing frame:::::::::"
                      );
                      setSocialDistancingFrame(dataJSON.message.frame);
                      console.log("frame: ", dataJSON.message.frame);
                    }
                    // if camera not found error, socket connection closes
                    // after every 15 seconds, try connecting that particular socket again
                    if (dataJSON.message.type === "error") {
                      console.log(
                        "socket closed due to message type error: ",
                        dataJSON.message.type
                      );
                      obj.socket.close();
                      setTimeout(() => {
                        let socket = new WebSocket(
                          `wss://facegenie.co/ws/responser/${obj.IPCamera.IPAddress}/`
                        );
                        ipCamerasSockets[index] = socket;
                        ipCamerasSockets[index].onopen = () => {
                          console.log(
                            "Connection Established on socket: ",
                            obj.IPCamera.IPAddress
                          );
                          obj.socket.send("send");
                          // should be changed later
                        };
                        // insert socket.onMessage here.???
                      }, 15000);
                    }
                    // process the response from backend and save it to firebase
                    processResponse(
                      data,
                      persons,
                      todayDate,
                      doc,
                      obj.IPCamera
                    );
                    obj.socket.send("send");
                  };
                  // process the data incoming on that channel
                  obj.socket.onclose = function (data) {
                    console.log("onclose");
                    console.log(data);
                    obj.socket.onerror = function (data) {
                      console.log("error");
                      console.log(data);
                    };
                  };
                  // closing and error while connecting of the sockets handled
                });
              });
            });
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
              <RenderComponent
                component={title}
                frame={frame}
                socialDistancingFrame={socialDistancingFrame}
              />
            </UserContext.Provider>
          </Container>
        </main>
      </div>
    </div>
  );
}

function authenticationBackend(obj) {
  axios
    .post("https://facegenie.co/accounts/profile/token/", obj)
    .then((res) => {
      if (res.status === 200) {
        console.log("access token: ", res.data.access);
        console.log("refresh token: ", res.data.refresh);
        doc.ref.set(
          {
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          },
          { merge: true }
        );
      }
    })
    .catch((err) => {
      console.log("error while fetching refresh token: ", err);
    });
}

/**
 * @function responsible for processing the backend response and storing into database
 * @param {*} data
 * @param {*} persons
 * @param {*} todayDate
 * @param {*} userDoc
 * @param {*} IPCamera
 */

function processResponse(data, persons, todayDate, userDoc, IPCamera) {
  console.log("message received on IP Address: ", IPCamera.IPAddress);
  const IPAddressRDB = IPCamera.IPAddress.replace(/\./g, "_");

  // IP Cameras in realtime database are stored in the form of "XXX_XX_XXX_XX"

  const obj = JSON.parse(data.data); // converting the JSON String into JSON paresable object
  console.log("JSON parsed data: ", obj);
  if (obj.message.type === "attendance_tracking") {
    // if response message is of type attendance_tracking
    /**
     * message:{
     * users:["1","mask"],
     * users:["2","no_mask"],
     *
     * }
     */
    const usersDetected = obj.message.users;
    for (let i = 0; i < usersDetected.length; i++) {
      // console.log("looping inside users");
      const user = usersDetected[i];
      // console.log("person detected:", user[0]);
      for (let j = 0; j < persons.length; j++) {
        // console.log("looping inside stored users.....");
        // console.log("stored user: ", persons[j].id);
        // console.log("matched?: - ", persons[j].id === user[0]);
        if (persons[j].id === user[0]) {
          // console.log("person matched");
          // store response in realtime database
          rdb
            .ref(`/Attendance/${doc.id}/${todayDate}/${persons[j].id}`)
            .set({
              Name: persons[j].data.name,
              Department: persons[j].data.department,
              Login: moment().format("HH:mm:ss"),
              Logout: moment().format("HH:mm:ss"),
              Designation: "Researcher",
              Mask: user[1] === "Mask" ? "Mask" : "No mask",
            })
            .then((res) =>
              console.log("response after writing socket message: ", res)
            )
            .catch((err) => console.log(err));
        }
      }
    }
  } else if (obj.message.type === "ppe_alerts") {
    // if response message is of type attendance_tracking

    // check what all settings are enabled on particular IP Camera

    var PPETotalCount = 0; // to validate if the status is red or green
    if (IPCamera.Body_Suit) {
      PPETotalCount += 1;
    }
    // if (IPCamera.Boots) {
    //   PPETotalCount += 1;
    // }
    if (IPCamera.Gloves) {
      PPETotalCount += 1;
    }
    if (IPCamera.Headgear) {
      PPETotalCount += 1;
    }
    if (IPCamera.Mask) {
      PPETotalCount += 1;
    }
    if (IPCamera.Safety_Goggles) {
      PPETotalCount += 1;
    }
    const users = obj.message.users;
    const realtimePPEUpdate = {}; // final log to be updated in Real time database
    realtimePPEUpdate.people = users.num_people;
    realtimePPEUpdate.mask = 0;
    realtimePPEUpdate.body_Suit = 0;
    // realtimePPEUpdate.non_body_Suit = 0;
    // realtimePPEUpdate.boots = 0;
    realtimePPEUpdate.gloves = 0;
    realtimePPEUpdate.headgear = 0;
    realtimePPEUpdate.safety_goggles = 0;
    realtimePPEUpdate.status = "Green";
    realtimePPEUpdate.timestamp = Firebase.database.ServerValue.TIMESTAMP;
    const people = users.people;
    for (let i = 0; i < people.length; i++) {
      console.log("detected ppe", people[i].ppe_violations);

      if (people[i].ppe_violations > 5 - PPETotalCount) {
        // decide if status has to be set to red or green
        realtimePPEUpdate.status = "Red";
      } else {
        realtimePPEUpdate.status = "Green";
      }
      if (IPCamera.Body_Suit) {
        realtimePPEUpdate.body_Suit += people[i].no_body_suit.num === 1 ? 1 : 0;
        // realtimePPEUpdate.non_body_Suit +=
        //   people[i].non_body_suit.num === 0 ? 1 : 0;
      }
      // if (IPCamera.Boots) {
      //   realtimePPEUpdate.headgear += people[i].boots.num === 0 ? 1 : 0;
      // }
      if (IPCamera.Gloves) {
        realtimePPEUpdate.gloves += people[i].no_gloves.num === 1 ? 1 : 0;
      }
      if (IPCamera.Headgear) {
        realtimePPEUpdate.headgear += people[i].no_headgear.num === 1 ? 1 : 0;
      }
      if (IPCamera.Mask) {
        realtimePPEUpdate.mask += people[i].no_mask.num === 1 ? 1 : 0;
      }
      if (IPCamera.Safety_Goggles) {
        realtimePPEUpdate.safety_goggles +=
          people[i].no_safety_goggles.num === 1 ? 1 : 0;
      }
    }

    // console.log("real time PPE update object: ", realtimePPEUpdate);

    if (realtimePPEUpdate.status === "Red") {
      const pushRef = rdb
        .ref(`/PPE_Alerts/${userDoc.id}/${IPAddressRDB}/Logs`)
        .push();
      // insert into Real time database
      pushRef
        .set({
          body_Suit: realtimePPEUpdate.body_Suit,
          // boots: realtimePPEUpdate.boots,
          gloves: realtimePPEUpdate.gloves,
          headgear: realtimePPEUpdate.headgear,
          mask: realtimePPEUpdate.mask,
          // non_body_suit: realtimePPEUpdate.non_body_Suit,
          people: realtimePPEUpdate.people,
          safety_goggles: realtimePPEUpdate.safety_goggles,
          status: realtimePPEUpdate.status,
          timestamp: realtimePPEUpdate.timestamp,
        })
        .catch((err) => console.log("PPE Alert error", err));
    }

    // update the new data to real time database
    rdb
      .ref(`/PPE_Alerts/${userDoc.id}/${IPAddressRDB}/`)
      .update({
        body_Suit: realtimePPEUpdate.body_Suit,
        // boots: realtimePPEUpdate.boots,
        gloves: realtimePPEUpdate.gloves,
        headgear: realtimePPEUpdate.headgear,
        mask: realtimePPEUpdate.mask,
        // non_body_suit: realtimePPEUpdate.non_body_Suit,
        people: realtimePPEUpdate.people,
        safety_goggles: realtimePPEUpdate.safety_goggles,
        status: realtimePPEUpdate.status,
        timestamp: realtimePPEUpdate.timestamp,
      })
      .catch((err) => console.log("error in PPE Alerts :: ", err));
  } else if (obj.message.type === "social_distancing") {
    // if response message is of type social_distancing
    /**
     * message:{
     *  grid:[1,2,3,4],
     * }
     */
    console.log("Social distancing response: ");
    console.log(obj.message);
    if (obj.message.grid.length > 0) {
      // if there's an actual violation of social distancing
      rdb
        .ref(`/SocialDistancing/${userDoc.id}/${IPAddressRDB}/`)
        .update({
          status: "Red",
        })
        .catch((err) => console.log("error in PPE Alerts :: ", err));
      for (let i = 0; i < obj.message.grid.length; i++) {
        const pushRef = rdb
          .ref(`/SocialDistancing/${userDoc.id}/${IPAddressRDB}/Logs`)
          .push();
        const imgKey = pushRef.key; // take the unique document ID and label it ffor thumbnail
        pushRef
          .set({
            Grid: obj.message.grid[i],
            ip: IPCamera.IPAddress,
            Hashtag: "#Lab",
            timestamp: Firebase.database.ServerValue.TIMESTAMP,
          })
          .then(() => {
            snapToBucket(obj, imgKey);
          })
          .catch((err) =>
            console.log("error while Social distancing updates: ", err)
          );
      }
    } else {
      // if there is no social distancing violation
      rdb
        .ref(`/SocialDistancing/${userDoc.id}/${IPAddressRDB}/`)
        .update({
          status: "Green",
        })
        .catch((err) => console.log("error in Social Distancing :: ", err));
    }
  }
}

/**
 * @function responsible for storing the social distancing thumbnail
 * to cloud bucket
 */

function snapToBucket(obj, imgKey) {
  let frame_trim = obj.message.frame
    .toString()
    .replace("data:image/jpeg;base64,", "");
  storageRef
    .child(`Snapshots/SocialDistance/${imgKey}`)
    .putString(frame_trim, "base64", { contentType: "image/jpeg" })
    .then((snapshot) => console.log("uploaded successfully", snapshot.state))
    .catch((err) => console.error("error while uploading base 64: ", err));
}

function RenderComponent(props) {
  const componentMap = {
    Reports: <NavigationReports frame={props.frame} />,
    "Register Employees": <NavigationTabs />,
    Configurations: <Settings />,
    "PPE Tracking": <PlaceDashboard />,
    "Social Distancing": (
      <SocialDistancingDashboard
        socialDistancingFrame={props.socialDistancingFrame}
      />
    ),
    Downloads: <Downloads />,
  };
  return <div>{componentMap[props.component]}</div>;
}
