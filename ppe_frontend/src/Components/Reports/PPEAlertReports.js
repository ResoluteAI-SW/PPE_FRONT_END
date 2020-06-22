import React, { useEffect, useState, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { db, rdb } from "../../FirebaseConfig";
import { UserContext } from "../AdminDashboard";

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
  logsTable: {
    minWidth: 900,
  },
});

export default function PPEAlertReports() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    user.ref.collection("ipCameras").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const IPAddressRDB = doc.data().IPAddress.replace(/\./g, "_");
        console.log(IPAddressRDB);
        rdb
          .ref(`PPE_Alerts/${user.id}/${IPAddressRDB}/Logs`)
          .once("value")
          .then((snapshot) => {
            const collection = snapshot.val();
            for (const docID in collection) {
              let obj = collection[docID];
              setLogs((logs) => logs.concat(obj));
            }
          });
      });
    });
  }, []);

  return (
    <div>
      <h1 style={{ margin: 10 }}>PPE Alerts Logs</h1>
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
