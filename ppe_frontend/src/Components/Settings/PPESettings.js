import React from "react";
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
});

export default function PPESettings() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.selectPPE}>
        <h2>Select PPE for Detection</h2>
        <div style={{ marginTop: 10 }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: "20%" }}>
                    <img
                      src={HazmatSuit}
                      alt="Hazmat suit icon"
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <h5>Hazmat Suit</h5>
                  </TableCell>
                  <TableCell>
                    <input class="w3-check" type="checkbox" checked="checked" />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="Red"
                    >
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%" }}>
                    <img
                      src={Gloves}
                      alt="Gloves icon"
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <h5>Gloves</h5>
                  </TableCell>
                  <TableCell>
                    <input class="w3-check" type="checkbox" checked="checked" />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="Red"
                    >
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%" }}>
                    <img
                      src={HardCap}
                      alt="Hard cap icon"
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <h5>Hard Cap</h5>
                  </TableCell>
                  <TableCell>
                    <input class="w3-check" type="checkbox" checked="checked" />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="Red"
                    >
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%" }}>
                    <img
                      src={Faceshield}
                      alt="Faceshield icon"
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <h5>Face Shield</h5>
                  </TableCell>
                  <TableCell>
                    <input class="w3-check" type="checkbox" checked="checked" />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="Red"
                    >
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%" }}>
                    <img
                      src={Boots}
                      alt="Boots icon"
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <h5>Boots</h5>
                  </TableCell>
                  <TableCell>
                    <input class="w3-check" type="checkbox" checked="checked" />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="Red"
                    >
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ width: "30%" }}>
                    <img
                      src={Respirator}
                      alt="Respirator icon"
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <h5>Respirators</h5>
                  </TableCell>
                  <TableCell>
                    <input class="w3-check" type="checkbox" checked="checked" />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="Red"
                    >
                      <MenuItem value="Red">Red</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className={classes.selectPPE}>Hello</div>
    </div>
  );
}
