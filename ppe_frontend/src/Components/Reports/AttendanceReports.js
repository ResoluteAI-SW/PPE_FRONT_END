import React, { useEffect, useState, useContext } from "react";
import { rdb } from "../../FirebaseConfig";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { UserContext } from "../AdminDashboard";
import moment from "moment";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

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

/**
 * @Component responsible for displaying attendance marking and stream side by side
 */

export default function AttendanceReports(props) {
  const classes = useStyles();

  const userDoc = useContext(UserContext);
  const [attendanceReports, setAttendanceReports] = useState([]);

  /**
   * @function responsible for getting the attendance reports
   */
  useEffect(() => {
    // let socket = new WebSocket(
    //   "wss://facegenie.co/ws/responser/192.168.29.126/"
    // );
    // socket.onopen = () => {
    //   console.log("Connection Established");
    // };
    // socket.onmessage = (data) => {
    //   const obj = JSON.parse(data.data);
    //   console.log(obj.message.type);
    //   if (obj.message.type === "attendance_tracking") {
    //   }
    // };
    const todayDate = moment().format("DD MMM YYYY");
    console.log(todayDate);
    console.log(userDoc.id);
    rdb
      .ref(`/Attendance/${userDoc.id}/${todayDate}`)
      .on("value", (snapshot) => {
        setAttendanceReports([]);
        const collection = snapshot.val();
        for (const attendee in collection) {
          console.log(collection[attendee]);
          setAttendanceReports((attendanceReports) =>
            attendanceReports.concat(collection[attendee])
          );
        }
      });
  }, []);

  return (
    <div className={classes.paper} class="w3-animate-bottom">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          {props.frame === "" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <VideocamOffIcon style={{ width: 300, height: 300 }} />
              <h4>Stream not available currently</h4>
            </div>
          ) : (
            <img
              src={props.frame}
              alt="Stream not available"
              style={{ width: 640, height: 360 }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Designation</StyledTableCell>
                <StyledTableCell align="right">Department</StyledTableCell>
                <StyledTableCell align="right">Login</StyledTableCell>
                <StyledTableCell align="right">Logout</StyledTableCell>
                <StyledTableCell align="right">Mask</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceReports.map((row) => (
                <StyledTableRow key={row.uuid}>
                  <StyledTableCell component="th" scope="row">
                    {row.Name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Designation}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Department}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Login}</StyledTableCell>
                  <StyledTableCell align="right">{row.Logout}</StyledTableCell>
                  <StyledTableCell align="right">{row.Mask}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
