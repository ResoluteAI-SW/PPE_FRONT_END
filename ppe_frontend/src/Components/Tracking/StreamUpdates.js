import React, { useEffect, useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { rdb } from "../../FirebaseConfig";
import { UserContext } from "../AdminDashboard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Firebase from "firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 500,
  },
  logsTable: {
    minWidth: 900,
  },
});

export default function StreamUpdates(props) {
  const classes = useStyles();

  const user = useContext(UserContext);
  const [totalPeople, setTotalPeople] = useState(15);
  const [bodySuit, setBodySuit] = useState(0);
  const [boots, setBoots] = useState(0);
  const [gloves, setGloves] = useState(0);
  const [headgear, setHeadgear] = useState(0);
  const [safetyGoggles, setSafetyGoggles] = useState(0);
  const [masks, setMasks] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    rdb
      .ref(`PPE_Alerts/${user.id}/${IPAddress}/Logs`)
      .on("value", (snapshot) => {
        setLogs([]);
        const collection = snapshot.val();
        for (const docID in collection) {
          let obj = collection[docID];
          setLogs((logs) => logs.concat(obj));
        }
      });
    rdb.ref(`PPE_Alerts/${user.id}/${IPAddress}`).on("value", (snapshot) => {
      const collection = snapshot.val();
      for (const field in collection) {
        if (field !== "Logs") {
          switch (field) {
            case "people":
              setTotalPeople(collection[field]);
              break;
            case "body_Suit":
              setBodySuit(collection[field]);
              break;
            case "boots":
              setBoots(collection[field]);
              break;
            case "gloves":
              setGloves(collection[field]);
              break;
            case "headgear":
              setHeadgear(collection[field]);
              break;
            case "mask":
              setMasks(collection[field]);
              break;
            case "headgear":
              setHeadgear(collection[field]);
              break;
            case "safety_goggles":
              setSafetyGoggles(collection[field]);
              break;
            default:
              break;
          }
        }
      }
    });
  }, []);

  const generateLogs = () => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    const pushingRef = rdb
      .ref(`PPE_Alerts/${user.id}/${IPAddress}/Logs`)
      .push();
    pushingRef.set({
      people: 15,
      body_Suit: 12,
      boots: 8,
      gloves: 9,
      headgear: 6,
      mask: 9,
      headgear: 2,
      safety_goggles: 15,
      timestamp: Firebase.database.ServerValue.TIMESTAMP,
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.handleBack()}
      >
        Back to Dashboard
      </Button>
      <Button color="primary" onClick={generateLogs}>
        Generate Logs
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ fontWeight: "bolder" }}>Total people detected</h5>
          <h1 style={{ fontWeight: "bold", color: "#5A1111" }}>
            {totalPeople}
          </h1>
        </div>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Total number of people</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="body suit">
              <StyledTableCell component="th" scope="row">
                Not wearing body suit
              </StyledTableCell>
              <StyledTableCell align="right">{bodySuit}</StyledTableCell>
            </TableRow>
            <TableRow key="boots">
              <StyledTableCell component="th" scope="row">
                Not wearing boots
              </StyledTableCell>
              <StyledTableCell align="right">{boots}</StyledTableCell>
            </TableRow>
            <TableRow key="gloves">
              <StyledTableCell component="th" scope="row">
                Not wearing gloves
              </StyledTableCell>
              <StyledTableCell align="right">{gloves}</StyledTableCell>
            </TableRow>
            <TableRow key="headgear">
              <StyledTableCell component="th" scope="row">
                Not wearing headgear
              </StyledTableCell>
              <StyledTableCell align="right">{headgear}</StyledTableCell>
            </TableRow>
            <TableRow key="masks">
              <StyledTableCell component="th" scope="row">
                Not wearing masks
              </StyledTableCell>
              <StyledTableCell align="right">{masks}</StyledTableCell>
            </TableRow>
            <TableRow key="safety goggles">
              <StyledTableCell component="th" scope="row">
                Not wearing Safety Goggles
              </StyledTableCell>
              <StyledTableCell align="right">{safetyGoggles}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <TableContainer>
        <Table className={classes.logsTable} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Total Persons</StyledTableCell>
              <StyledTableCell align="right">No body suit</StyledTableCell>
              <StyledTableCell align="right">No boots</StyledTableCell>
              <StyledTableCell align="right">No Gloves</StyledTableCell>
              <StyledTableCell align="right">No headgear</StyledTableCell>
              <StyledTableCell align="right">No mask</StyledTableCell>
              <StyledTableCell align="right">Safety Goggles</StyledTableCell>
              <StyledTableCell align="right">Timestamp</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((row) => (
              <StyledTableRow key={logs.id}>
                <StyledTableCell component="th" scope="row">
                  {row.people}
                </StyledTableCell>
                <StyledTableCell align="right">{row.body_Suit}</StyledTableCell>
                <StyledTableCell align="right">{row.boots}</StyledTableCell>
                <StyledTableCell align="right">{row.gloves}</StyledTableCell>
                <StyledTableCell align="right">{row.headgear}</StyledTableCell>
                <StyledTableCell align="right">{row.mask}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.safety_goggles}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
