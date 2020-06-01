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
    minWidth: 400,
  },
});

var reverseTempList = [];

export default function StreamUpdates(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    rdb
      .ref(`SocialDistancing/${user.id}/${IPAddress}/Logs`)
      .orderByChild("timestamp")
      .limitToLast(3)
      .on("value", (snapshot) => {
        setLogs([]);
        const collection = snapshot.val();
        for (const docID in collection) {
          const obj = collection[docID];
          obj.id = docID;
          reverseTempList.push(obj);
        }
        setLogs(reverseTempList.reverse());
        reverseTempList = [];
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
          margin: 10,
          padding: 5,
          justifyContent: "space-between",
        }}
      >
        <div>
          <img src="https://picsum.photos/500" alt="Stream not available" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Thumbnail</StyledTableCell>
                  <StyledTableCell align="right">Grid</StyledTableCell>
                  <StyledTableCell align="right">IP Address</StyledTableCell>
                  <StyledTableCell align="right">Hashtag</StyledTableCell>
                  <StyledTableCell align="right">Timestamp</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((row) => (
                  <StyledTableRow key={logs.id}>
                    <StyledTableCell component="th" scope="row">
                      <img src="https://picsum.photos/50" alt="No thumbnail" />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.Grid}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.ip}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Hashtag}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                // onClick={() => props.handleBack()}
              >
                Show complete Logs
              </Button>
            </div>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
