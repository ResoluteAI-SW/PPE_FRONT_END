import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { UserContext } from "../AdminDashboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Tab } from 'semantic-ui-react'

import DetectionSensitivity from './Sensitivity'
import FrameRate from './DetectionFrameRate'

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
  },
  innerRoot: {
    width: 500,
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var severity = "success";
var message = "IP Camera successfully registered";

export default function DetectionSettings() {
  const classes = useStyles();
  const [frameRate, setFrameRate] = useState(0);
  const [sensitivity, setSensitivity] = useState(0);
  const [open, setOpen] = React.useState(false);
  const userDoc = useContext(UserContext);

  // useEffect(() => {
  //   if (
  //     userDoc.data().settings.detectionFrameRate &&
  //     userDoc.data().settings.detectionSensitivity
  //   ) {
  //     const frameRate = userDoc.data().settings.detectionFrameRate;
  //     const sensitivity = userDoc.data().settings.detectionSensitivity;
  //     setFrameRate(frameRate);
  //     setSensitivity(sensitivity);
  //   }
  // }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveDetectionSettings = () => {
    userDoc.ref
      .set(
        {
          settings: {
            detectionFrameRate: frameRate,
            detectionSensitivity: sensitivity,
          },
        },
        { merge: true }
      )
      .then(() => {
        console.log("Settings updated successfully");
        message = "Detection Settings updated successfully";
        severity = "success";
        setOpen(true);
      })
      .catch((err) => {
        message = err.message;
        severity = "error";
        setOpen(true);
        console.log(err);
      });
  };

  const panes = [
    { menuItem: 'Detection Frame Rate', render: () => <Tab.Pane> <FrameRate /></Tab.Pane> },
    { menuItem: 'Detection Sensitivity', render: () => <Tab.Pane><DetectionSensitivity /></Tab.Pane> },
  ]

  const TabExampleBasic = () => <Tab panes={panes} />

  return (
    <div >
     
      <TabExampleBasic />
    </div>
  );
}
