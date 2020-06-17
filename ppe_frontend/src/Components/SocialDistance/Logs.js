import React, { useEffect, useState, useContext } from "react";
import { rdb, storageRef } from "../../FirebaseConfig";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { UserContext } from "../AdminDashboard";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 400,
  },
}));

export default function AttendanceReports(props) {
  const classes = useStyles();

  const userDoc = useContext(UserContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    rdb
      .ref(`SocialDistancing/${userDoc.id}/${IPAddress}/Logs`)
      .on("value", (snapshot) => {
        setLogs([]);
        const collection = snapshot.val();
        for (const docID in collection) {
          const obj = collection[docID];
          const downloadRef = storageRef.child(
            `Snapshots/SocialDistance/${docID}`
          );
          downloadRef
            .getDownloadURL()
            .then((url) => {
              obj.imgURL = url;
              console.log("object image url: ", obj.imgURL);
            })
            .then((obj.id = docID))
            .then(() => {
              setLogs((logs) => logs.concat(obj));
            })
            .catch((err) => console.log(err.code));
        }
      });
  }, []);

  return (
    <div className={classes.paper} class="w3-animate-bottom">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.handleBack()}
        >
          Back to Live Stream
        </Button>
      </div>
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
                  <img
                    src={row.imgURL}
                    alt="No thumbnail"
                    width={150}
                    height={150}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.Grid}
                </StyledTableCell>
                <StyledTableCell align="right">{row.ip}</StyledTableCell>
                <StyledTableCell align="right">{row.Hashtag}</StyledTableCell>
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
