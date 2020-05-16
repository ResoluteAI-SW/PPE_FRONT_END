import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HazmatSuit from "../../Media/Images/hazmat.png";
import Gloves from "../../Media/Images/gloves.png";
import HardCap from "../../Media/Images/hardCap.png";
import Faceshield from "../../Media/Images/faceshield.png";
import Boots from "../../Media/Images/boots.png";
import Respirator from "../../Media/Images/respirator.png";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  selectPPE: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    margin: "1%",
    padding: "2%",
  },
  content: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "50%",
  },
  redAlert: {
    backgroundColor: "#ff4747",
    color: "#ffffff",
  },
  yellowAlert: {
    backgroundColor: "#f4ff2b",
    color: "#000000",
  },
});

export default function PPESettings() {
  const [tools, setTools] = useState([
    { display: "Hazmat Suit", image: HazmatSuit, alertType: "Red" },
    { display: "Gloves", image: Gloves, alertType: "Red" },
    { display: "Hard Cap", image: HardCap, alertType: "Yellow" },
    { display: "Face Shield", image: Faceshield, alertType: "Red" },
    { display: "Boots", image: Boots, alertType: "Yellow" },
    { display: "Respirators", image: Respirator, alertType: "Red" },
  ]);
  const [time, setTime] = useState([
    { color: "Red", minutes: 1, seconds: 50 },
    { color: "Yellow", minutes: 2, seconds: 25 },
  ]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.selectPPE}>
        <h2>Select PPE for Detection</h2>
        <div style={{ marginTop: 10 }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {tools.map((row, index) => (
                  <TableRow
                    className={
                      row.alertType === "Red"
                        ? classes.redAlert
                        : classes.yellowAlert
                    }
                  >
                    <TableCell style={{ width: "20%" }}>
                      <img
                        src={row.image}
                        alt={row.display}
                        className={classes.image}
                      />
                    </TableCell>
                    <TableCell>
                      <h5>{row.display}</h5>
                    </TableCell>
                    <TableCell>
                      <h5>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tools[index].alertType}
                          onChange={(e) => {
                            var obj = tools[index];
                            obj.alertType = e.target.value.toString();
                            const toolsBefore = tools.slice(0, index);
                            const toolsAfter = tools.slice(
                              index + 1,
                              tools.length
                            );
                            setTools([...toolsBefore, obj, ...toolsAfter]);
                          }}
                        >
                          <MenuItem value={"Red"}>Red</MenuItem>
                          <MenuItem value={"Yellow"}>Yellow</MenuItem>
                        </Select>
                      </h5>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className={classes.selectPPE}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Type</TableCell>
                <TableCell align="right">Minutes</TableCell>
                <TableCell align="right">Seconds</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {time.map((row, index) => (
                <TableRow>
                  <TableCell align="left">{row.color}</TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      id="minutes"
                      name="minutes"
                      min="0"
                      max="59"
                      style={{
                        width: "40%",
                      }}
                      value={row.minutes}
                      onChange={(e) => {
                        var obj = time[index];
                        obj.minutes = e.target.value.toString();
                        const timeBefore = time.slice(0, index);
                        const timeAfter = time.slice(index + 1, time.length);
                        setTime([...timeBefore, obj, ...timeAfter]);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      id="seconds"
                      name="seconds"
                      min="0"
                      max="59"
                      style={{
                        width: "40%",
                      }}
                      value={row.seconds}
                      onChange={(e) => {
                        var obj = time[index];
                        obj.seconds = e.target.value.toString();
                        const timeBefore = time.slice(0, index);
                        const timeAfter = time.slice(index + 1, time.length);
                        setTime([...timeBefore, obj, ...timeAfter]);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
