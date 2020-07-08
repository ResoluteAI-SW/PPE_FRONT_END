import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PPEAlertReports from "./PPEAlertReports";
import AttendanceReports from "./AttendanceReports";
const drawerWidth = 240;

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

/**
 * @Component responsible for displaying navigation bar to navigate between Attendance marking
 * and PPE alert reports
 * @param {*} props
 */

export default function NavigationReports(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("Attendance Reports");
  const mainListItems = ["PPE Alert Reports", "Attendance Reports"];

  return (
    <div>
      <div className={classes.root}>
        <main className={classes.content}>
          <div class="w3-bar w3-black w3-animate-top">
            {mainListItems.map((item) => (
              <button
                class="w3-bar-item w3-button"
                href="#"
                onClick={() => {
                  setTitle(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <Container maxwidth="lg" className={classes.container}>
            <RenderComponent component={title} frame={props.frame} />
          </Container>
        </main>
      </div>
    </div>
  );
}

/**
 * @Component repsonsible for rendering the child component
 * @param {*} props
 */
function RenderComponent(props) {
  const componentMap = {
    "PPE Alert Reports": <PPEAlertReports />,
    "Attendance Reports": <AttendanceReports frame={props.frame} />,
  };
  return <div>{componentMap[props.component]}</div>;
}
