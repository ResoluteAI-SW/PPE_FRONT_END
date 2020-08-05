import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AddProfile from "./AddProfile";
import ViewProfiles from "./ViewProfiles";
import Button from "@material-ui/core/Button";

import { Tab } from 'semantic-ui-react'

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

export default function NavigationTabs() {
  const classes = useStyles();
  const [title, setTitle] = React.useState("Add Profile");
  const mainListItems = ["Add Profile", "View Profiles"];



  const panes = [
    { menuItem: 'Add Profile', render: () => <Tab.Pane><AddProfile /></Tab.Pane> },
    { menuItem: 'View Profiles', render: () => <Tab.Pane><ViewProfiles /></Tab.Pane> },
  ]

  const TabExampleBasic = () => <Tab panes={panes} />




  return (
    <div className='w3-animate-bottom'>
          {/* <div class="w3-bar w3-animate-top" style={{ backgroundColor: "#FFE8E9" }}>
            {mainListItems.map((item) => (
              <Button
                class="w3-bar-item w3-button"
                href="#"
                onClick={() => {
                  setTitle(item);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <Container maxwidth="lg" className={classes.container}>
            <RenderComponent component={title} />
          </Container> */}
            <TabExampleBasic />
    </div>
  );
}

function RenderComponent(props) {
  const componentMap = {
    "Add Profile": <AddProfile />,
    "View Profiles": <ViewProfiles />,
  };
  return <div>{componentMap[props.component]}</div>;
}
