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

const useStyles = makeStyles({
  root: {
    display: "flex",
    // height: "70vh",
    alignItems: "center",
    width: "100%",
  },
  selectPPE: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "pink",
    // height: "70vh",
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
    width: "9%",
    height: "9%",
  },
});

export default function PPESettings() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.selectPPE}>
        <h2>Select PPE for Detection</h2>
        <div style={{ marginTop: 10 }}>
          <div className={classes.content}>
            <img
              src={HazmatSuit}
              className={classes.image}
              alt="Hazmat Suit Icon"
            />
            <input class="w3-check" type="checkbox" checked={true} />
            <h5>Hazmat Suit</h5>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Red"
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
            </Select>
          </div>
          <div className={classes.content}>
            <img src={Gloves} className={classes.image} alt="Gloves Icon" />
            <input class="w3-check" type="checkbox" checked={true} />
            <h5>Gloves</h5>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Red"
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
            </Select>
          </div>
          <div className={classes.content}>
            <img src={HardCap} className={classes.image} alt="Hard Cap Icon" />
            <input class="w3-check" type="checkbox" checked={true} />
            <h5>Hard Cap</h5>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Red"
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
            </Select>
          </div>
          <div className={classes.content}>
            <img
              src={Faceshield}
              className={classes.image}
              alt="Face Shield Icon"
            />
            <input class="w3-check" type="checkbox" checked={true} />
            <h5>Face Shield</h5>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Red"
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
            </Select>
          </div>
          <div className={classes.content}>
            <img src={Boots} className={classes.image} alt="Boots Icon" />
            <input class="w3-check" type="checkbox" checked={true} />
            <h5>Boots</h5>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Red"
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
            </Select>
          </div>
          <div className={classes.content}>
            <img
              src={Respirator}
              className={classes.image}
              alt="Respirators Icon"
            />
            <input class="w3-check" type="checkbox" checked={true} />
            <h5>Respirators</h5>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Red"
            >
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div className={classes.selectPPE}>Hello</div>
    </div>
  );
}
