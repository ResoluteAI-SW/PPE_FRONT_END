// import React, { useState, useContext, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";
// import { UserContext } from "../AdminDashboard";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";

// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     alignItems: "center",
//   },
//   innerRoot: {
//     width: 500,
//   },
// });

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// var severity = "success";
// var message = "IP Camera successfully registered";

// export default function AttendanceSettings() {
//   const classes = useStyles();
//   const [frameRate, setFrameRate] = useState(0);
//   const [sensitivity, setSensitivity] = useState(0);
//   const [open, setOpen] = React.useState(false);
//   const userDoc = useContext(UserContext);

//   // useEffect(() => {
//   //   if (
//   //     userDoc.data().settings.attendanceFrameRate &&
//   //     userDoc.data().settings.attendanceSensitivity
//   //   ) {
//   //     const frameRate = userDoc.data().settings.attendanceFrameRate;
//   //     const sensitivity = userDoc.data().settings.attendanceSensitivity;
//   //     setFrameRate(frameRate);
//   //     setSensitivity(sensitivity);
//   //   }
//   // }, []);

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const saveAttendanceSettings = () => {
//     console.log("frame rate", frameRate);
//     console.log("sensitivity", sensitivity);
//     userDoc.ref
//       .set(
//         {
//           settings: {
//             attendanceFrameRate: frameRate,
//             attendanceSensitivity: sensitivity,
//           },
//         },
//         { merge: true }
//       )
//       .then(() => {
//         console.log("Settings updated successfully");
//         message = "Attendance Settings updated successfully";
//         severity = "success";
//         setOpen(true);
//       })
//       .catch((err) => {
//         message = err.message;
//         severity = "error";
//         setOpen(true);
//         console.log(err);
//       });
//   };

//   return (
//     <div className={classes.root}>
//       <div
//         style={{
//           padding: 15,
//           display: "flex",
//           alignItems: "center",
//           width: "50%",
//           flexDirection: "column",
//         }}
//         class="w3-card-2 w3-animate-top"
//       >
//         <Typography id="discrete-slider" gutterBottom>
//           Attendance Frame Rate
//         </Typography>
//         <Slider
//           value={frameRate}
//           aria-labelledby="discrete-slider"
//           valueLabelDisplay="on"
//           step={5}
//           marks
//           min={0}
//           max={100}
//           style={{
//             marginTop: 40,
//           }}
//           onChange={(e, value) => setFrameRate(value)}
//         />
//         <Typography id="discrete-slider" gutterBottom>
//           Attendance Sensitivity
//         </Typography>
//         <Slider
//           value={sensitivity}
//           aria-labelledby="discrete-slider"
//           step={0.05}
//           marks
//           valueLabelDisplay="on"
//           min={0}
//           max={1}
//           style={{
//             marginTop: 40,
//           }}
//           onChange={(e, value) => setSensitivity(value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={saveAttendanceSettings}
//         >
//           Save
//         </Button>
//       </div>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity={severity}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }


//new code 


// import React, { useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";
// import axios from "axios";
// import { SettingsContext } from "../../App";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   margin: {
//     height: theme.spacing(3),
//   },
// }));

// export default function AttendanceFrameThreshold() {
//   const [settings, testSettings] = useContext(SettingsContext);
//   console.log(settings["Attendance Frame Threshold"]);
//   const classes = useStyles();
//   const [value, setValue] = useState(
//     parseInt(settings["Attendance Frame Threshold"])
//   );

//   const handleFrameValueSave = () => {
//     const data = {
//       value: value,
//     };
//     axios
//       .post("/api/admin/setAttendanceFrameThreshold", data)
//       .then((res) => console.log(res.status))
//       .catch((err) => console.log(err));
//     testSettings("Attendance Frame Threshold", value);
//     console.log(settings["Attendance Frame Threshold"]);
//   };

//   return (
//     <div className={classes.root}>
//       <Typography id="discrete-slider" gutterBottom>
//         Attendance Frame Threshold
//       </Typography>
//       <Slider
//         defaultValue={value}
//         aria-labelledby="discrete-slider"
//         valueLabelDisplay="on"
//         step={5}
//         marks
//         min={0}
//         max={100}
//         style={{ marginTop: "30px" }}
//         onChange={(e, value) => setValue(value)}
//       />
//       <div className={classes.margin} />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleFrameValueSave}
//       >
//         Save
//       </Button>
//     </div>
//   );
// }


import React, { useState } from 'react';

// Local Imports

// Package Imports

// Material-UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// Styling of Threshold Component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),
  },
  Threshold: {
    margin: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
  },
  select: {
    '& fieldset': {
      border: '2px solid red',
    },
  },
}));

const Threshold = () => {
  const classes = useStyles();

  const [current, setCurrent] = useState('40');

  const [Threshold, setThreshold] = useState(current);
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    setThreshold(e.target.value);
    setDisabled(false);
  };

  const onClick = (e) => {
    setCurrent(Threshold);
    setDisabled(true);
  };

  return (
    <div >
      <Container className={classes.root}>
        <Typography variant='h4'>Current Detection Threshold Level</Typography>
        <Typography variant='h1' className={classes.Threshold}>
          <Box fontWeight={900}>{current}</Box>
        </Typography>

        <Typography variant='h5'>
          <Box fontWeight={300}>Set Detection Threshold level</Box>
        </Typography>

        {/* Dropdown Menu */}
        <div className={classes.root}>
          <FormControl variant='outlined' fullWidth>
            <InputLabel fullWidth>Threshold Level</InputLabel>
            <Select
              native
              value={Threshold}
              onChange={(e) => onChange(e)}
              label='Threshold Level'
              inputProps={{
                name: 'Threshold',
              }}
              className={classes.select}
            >
              <option value={40}>40</option>
              <option value={140}>140</option>
              <option value={240}>240</option>
              <option value={320}>320</option>
            </Select>
          </FormControl>

          <Button
            variant='contained'
            color='primary'
            onClick={(e) => onClick(e)}
            className={classes.button}
            disabled={disabled}
          >
            <Box fontSize={15}>Set Threshold</Box>
          </Button>
        </div>
      </Container>
    </div>

  );
};

export default class FrameRate extends React.Component {
  render() {
    return <Threshold />;
  }
}