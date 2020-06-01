import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../AdminDashboard";
import { rdb } from "../../FirebaseConfig";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";

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
    minWidth: 700,
  },
});

export default function Logs(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    rdb
      .ref(`SocialDistancing/${user.id}/${IPAddress}/Logs`)
      .on("value", (snapshot) => {
        setLogs([]);
        const collection = snapshot.val();
        for (const docID in collection) {
          const obj = collection[docID];
          obj.id = docID;
          setLogs((logs) => logs.concat(obj));
        }
      });
  }, []);

  const generateLogs = () => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    const pushingRef = rdb
      .ref(`SocialDistancing/${user.id}/${IPAddress}/Logs`)
      .push();
    pushingRef.set({
      Grid: "01",
      ip: "192.168.29.127",
      Hashtag: "#Lab",
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
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
      <Button variant="contained" color="primary" onClick={generateLogs}>
        Generate Logs
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Grid</StyledTableCell>
                <StyledTableCell align="right">IP</StyledTableCell>
                <StyledTableCell align="right">Hashtag</StyledTableCell>
                <StyledTableCell align="right">Timestamp</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row) => (
                <StyledTableRow key={logs.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.Grid}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.ip}</StyledTableCell>
                  <StyledTableCell align="right">{row.Hashtag}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.timestamp}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
