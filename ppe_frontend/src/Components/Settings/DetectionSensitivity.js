// import React, { useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";
// import { SettingsContext } from "../../App";
// import axios from "axios";

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

// export default function DetectionSensitivityAdjustment() {
//   const [settings, testSettings] = useContext(SettingsContext);
//   const classes = useStyles();
//   const [value, setValue] = useState(
//     parseFloat(settings["Detection Sensitivity"])
//   );

//   const handleDetectionSensitivitySave = () => {
//     const data = {
//       value: value,
//     };
//     axios
//       .post("/api/admin/setDetectionSensitivity", data)
//       .then((res) => console.log(res.status))
//       .catch((err) => console.log(err));
//     testSettings("Detection Sensitivity", value);
//   };

//   return (
//     <div className={classes.root}>
//       <Typography id="discrete-slider" gutterBottom>
//         Detection Sensitivity Adjustment
//       </Typography>
//       <Slider
//         defaultValue={value}
//         aria-labelledby="discrete-slider"
//         valueLabelDisplay="on"
//         step={0.05}
//         marks
//         min={0}
//         max={1}
//         style={{ marginTop: "30px" }}
//         onChange={(e, value) => setValue(value)}
//       />
//       <div className={classes.margin} />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleDetectionSensitivitySave}
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

// Styling of sensitivity Component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),
  },
  sensitivity: {
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

const Sensitivity = () => {
  const classes = useStyles();

  const [current, setCurrent] = useState('40');

  const [sensitivity, setSensitivity] = useState(current);
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    setSensitivity(e.target.value);
    setDisabled(false);
  };

  const onClick = (e) => {
    setCurrent(sensitivity);
    setDisabled(true);
  };

  return (
    <div >
<Container className={classes.root}>
      <Typography variant='h4'>Current Attendance Sensitivity Level</Typography>
      <Typography variant='h1' className={classes.sensitivity}>
        <Box fontWeight={900}>{current}</Box>
      </Typography>

      <Typography variant='h5'>
        <Box fontWeight={300}>Set Attendance Sensitivity level</Box>
      </Typography>

      {/* Dropdown Menu */}
      <div className={classes.root}>
        <FormControl variant='outlined' fullWidth>
          <InputLabel>Sensitivity Level</InputLabel>
          <Select
            native
            value={sensitivity}
            onChange={(e) => onChange(e)}
            label='Sensitivity Level'
            inputProps={{
              name: 'sensitivity',
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
          <Box fontSize={15}>Set Sensitivity</Box>
        </Button>
      </div>
    </Container>
    </div>
    
  );
};

export default class DetectionSensitivityAdjustment extends React.Component {
  render() {
    return <Sensitivity />;
  }
}