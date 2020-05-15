import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { UserContext } from "../AdminDashboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

export default function AttendanceSettings() {
  const classes = useStyles();
  const [frameRate, setFrameRate] = useState(0);
  const [sensitivity, setSensitivity] = useState(0);
  const [open, setOpen] = React.useState(false);
  const userDoc = useContext(UserContext);

  useEffect(() => {
    if (
      userDoc.data().settings.attendanceFrameRate &&
      userDoc.data().settings.attendanceSensitivity
    ) {
      const frameRate = userDoc.data().settings.attendanceFrameRate;
      const sensitivity = userDoc.data().settings.attendanceSensitivity;
      setFrameRate(frameRate);
      setSensitivity(sensitivity);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveAttendanceSettings = () => {
    console.log("frame rate", frameRate);
    console.log("sensitivity", sensitivity);
    userDoc.ref
      .set(
        {
          settings: {
            attendanceFrameRate: frameRate,
            attendanceSensitivity: sensitivity,
          },
        },
        { merge: true }
      )
      .then(() => {
        console.log("Settings updated successfully");
        message = "Attendance Settings updated successfully";
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

  return (
    <div className={classes.root}>
      <div
        style={{
          padding: 15,
          display: "flex",
          alignItems: "center",
          width: "50%",
          flexDirection: "column",
        }}
        class="w3-card-2 w3-animate-top"
      >
        <Typography id="discrete-slider" gutterBottom>
          Attendance Frame Rate
        </Typography>
        <Slider
          value={frameRate}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={5}
          marks
          min={0}
          max={100}
          style={{
            marginTop: 40,
          }}
          onChange={(e, value) => setFrameRate(value)}
        />
        <Typography id="discrete-slider" gutterBottom>
          Attendance Sensitivity
        </Typography>
        <Slider
          value={sensitivity}
          aria-labelledby="discrete-slider"
          step={0.05}
          marks
          valueLabelDisplay="on"
          min={0}
          max={1}
          style={{
            marginTop: 40,
          }}
          onChange={(e, value) => setSensitivity(value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={saveAttendanceSettings}
        >
          Save
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
