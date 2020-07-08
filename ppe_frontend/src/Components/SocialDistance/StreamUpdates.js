import React, { useContext, useState, useEffect } from "react";
import Logs from "./Logs";
import Button from "@material-ui/core/Button";
import { UserContext } from "../AdminDashboard";
import { rdb, storageRef } from "../../FirebaseConfig";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
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
    minWidth: 400,
  },
});

var reverseTempList = [];

/**
 * @Component responsible for displaying the social distancing stream
 * and the latest social distancing violation
 * @param {*} props
 */
export default function StreamUpdates(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [showCompleteLogs, setShowCompleteLogs] = useState(false);
  const [frame, setFrame] = useState("");

  /**
   * @function responsible for fetching the latest social distancing violation
   */
  useEffect(() => {
    const IPAddress = props.IPAddress.toString().replace(/\./g, "_");
    // let socket = new WebSocket(
    //   "wss://facegenie.co/ws/responser/192.168.29.126/"
    // );
    // socket.onopen = () => {
    //   console.log("Connection Established");
    // };
    // socket.onmessage = (data) => {
    //   const obj = JSON.parse(data.data);
    //   if (obj.message.type === "social_distancing") {
    //     setFrame(obj.message.frame);
    //   }
    // };
    rdb
      .ref(`SocialDistancing/${user.id}/${IPAddress}/Logs`)
      .orderByChild("timestamp")
      .limitToLast(3)
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
            .then(() => {
              obj.id = docID;
              reverseTempList = reverseTempList.concat(obj);
            })
            .then(() => {
              setLogs(reverseTempList.reverse());
              reverseTempList = [];
            })
            .catch((err) => console.log(err.code));
        }
      });
  }, []);

  /**
   * @function responsible for dispalying the complete logs for that particular IP Camera
   */
  if (showCompleteLogs) {
    return (
      <Logs
        IPAddress={props.IPAddress}
        handleBack={() => setShowCompleteLogs(false)}
      />
    );
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.handleBack()}
      >
        Back to Dashboard
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
          {props.socialDistancingframe === "" ? (
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
              src={props.socialDistancingFrame}
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
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
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
                onClick={() => setShowCompleteLogs(true)}
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
