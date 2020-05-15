import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { UserContext } from "../AdminDashboard";

const colorHashtags = ["entry", "exit", "lab", "lobby"];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

var severity = "success";
var message = "IP Camera successfully registered";

var ipCameraEdit = null;

export default function IPCameraRegistration() {
  const classes = useStyles();
  const [ipAddress, setIPAddress] = useState("");
  const [placeInstalled, setPlaceInstalled] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [ipCameras, setIPCameras] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    user.ref.collection("ipCameras").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setIPCameras((ipCameras) => ipCameras.concat(doc.data()));
      });
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      ipAddress === "" ||
      hashtag === "" ||
      placeInstalled === "" ||
      username === "" ||
      password === ""
    ) {
      severity = "warning";
      message = "Please fill all the details";
      setOpen(true);
    } else {
      console.log(ipCameraEdit);
      setIPCameras([]);
      if (ipCameraEdit) {
        for (var i = 0; i < ipCameras.length; i++) {
          if (ipCameras[i].IPAddress === ipCameraEdit.IPAddress) {
            user.ref
              .collection("ipCameras")
              .where("IPAddress", "==", ipCameraEdit.IPAddress)
              .get()
              .then((querySnapshot) => {
                const IPCameraDoc = querySnapshot.docs[0];
                IPCameraDoc.ref
                  .set(
                    {
                      IPAddress: ipAddress,
                      Place: placeInstalled,
                      Hashtag: hashtag,
                      Username: username,
                      Password: password,
                    },
                    { merge: true }
                  )
                  .then(() => {
                    message = "Edit Successful";
                    severity = "success";
                    setUsername("");
                    setPassword("");
                    setHashtag("");
                    setIPAddress("");
                    setPlaceInstalled("");
                    setOpen(true);
                  })
                  .catch((err) => {
                    message = err.message;
                    severity = "error";
                    setOpen(true);
                  });
              });
            return 0;
          }
          console.log("heyy");
        }
      }
      let ipCameraInfo = {
        IPAddress: ipAddress,
        Place: placeInstalled,
        Hashtag: hashtag,
        Username: username,
        Password: password,
      };
      user.ref
        .collection("ipCameras")
        .add(ipCameraInfo)
        .then((doc) => {
          if (doc.id) {
            severity = "success";
            message = "IP Camera details successfully submitted";
            setUsername("");
            setPassword("");
            setHashtag("");
            setIPAddress("");
            setPlaceInstalled("");
            setOpen(true);
          }
        })
        .catch((err) => {
          console.log(err);
          severity = "error";
          message = err.message;
          setOpen(true);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleEdit = (ipAddress) => {
    console.log(ipAddress);
    ipCameraEdit = ipCameras.find(
      (ipCamera) => ipCamera.IPAddress === ipAddress
    );
    setIPAddress(ipCameraEdit.IPAddress);
    setPlaceInstalled(ipCameraEdit.Place);
    setUsername(ipCameraEdit.Username);
    setPassword(ipCameraEdit.Password);
    setHashtag(ipCameraEdit.Hashtag);
  };

  const handleDelete = (ipAddress) => {
    console.log(ipAddress);
    setIPCameras([]);
    user.ref
      .collection("ipCameras")
      .where("IPAddress", "==", ipAddress)
      .get()
      .then((querySnapshot) => {
        const IPCameraDoc = querySnapshot.docs[0];
        IPCameraDoc.ref
          .delete()
          .then(() => {
            severity = "success";
            message = "IP Camera successfully deleted";
            setOpen(true);
          })
          .catch((err) => {
            console.log(err);
            severity = "error";
            message = err.message;
            setOpen(true);
          });
      });
  };

  return (
    <Container component="main" style={{ width: "100%" }}>
      <CssBaseline />
      <Grid container spacing={3} maxWidth="xs">
        <Grid item xs={6}>
          <div className={classes.paper} class="w3-animate-bottom">
            <div style={{ textAlign: "center" }}>
              <Typography component="h1" variant="h4">
                IP Camera Registration
              </Typography>
            </div>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleFormSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ipAddress"
                label="IP Address"
                name="ipAddress"
                autoComplete="ipAddress"
                autoFocus
                value={ipAddress}
                onChange={(e) => setIPAddress(e.target.value)}
              />
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="placeInstalled"
                  label="Place Installed"
                  name="placeInstalled"
                  autoComplete="placeInstalled"
                  fullWidth
                  onChange={(e) => setPlaceInstalled(e.target.value)}
                  value={placeInstalled}
                />
              </Grid>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div>
                  Suggested Hashtags:
                  {colorHashtags.map((hashtag) => (
                    <Chip
                      label={`#${hashtag}`}
                      style={{
                        margin: "3px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        setHashtag(`#${hashtag}`);
                      }}
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  id="Hashtag"
                  label="Insert # Hashtag"
                  fullWidth
                  name="Hashtag"
                  autoComplete="Hashtag"
                  onChange={(e) => setHashtag(e.target.value)}
                  value={hashtag}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register IP Camera
              </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.paper} class="w3-animate-bottom">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>IP Address</StyledTableCell>
                    <StyledTableCell align="right">Location</StyledTableCell>
                    <StyledTableCell align="right">Hashtag</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ipCameras.map((row) => (
                    <StyledTableRow key={row.uuid}>
                      <StyledTableCell component="th" scope="row">
                        {row.IPAddress}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Place}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Hashtag}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              handleEdit(row.IPAddress);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleDelete(row.IPAddress);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
