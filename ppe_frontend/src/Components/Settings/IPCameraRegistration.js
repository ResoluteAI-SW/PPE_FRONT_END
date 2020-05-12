import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
}));

var severity = "success";
var message = "IP Camera successfully registered";

export default function IPCameraRegistration() {
  const classes = useStyles();
  const [ipAddress, setIPAddress] = useState("");
  const [placeInstalled, setPlaceInstalled] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [open, setOpen] = React.useState(false);
  const user = useContext(UserContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (ipAddress === "" || hashtag === "" || placeInstalled === "") {
      severity = "warning";
      message = "Please fill all the details";
      setOpen(true);
    } else {
      let ipCameraInfo = {
        IPAddress: ipAddress,
        Place: placeInstalled,
        Hashtag: hashtag,
      };
      user.ref
        .collection("ipCameras")
        .add(ipCameraInfo)
        .then((doc) => {
          if (doc.id) {
            severity = "success";
            message = "IP Camera details successfully submitted";
            setOpen(true);
            setHashtag("");
            setIPAddress("");
            setPlaceInstalled("");
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} class="w3-animate-bottom">
        <div style={{ textAlign: "center" }}>
          <Typography component="h1" variant="h4">
            IP Camera Registration
          </Typography>
        </div>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
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
            onChange={(e) => setIPAddress(e.target.value)}
          />
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="placeInstalled"
                label="Place Installed"
                name="placeInstalled"
                autoComplete="placeInstalled"
                onChange={(e) => setPlaceInstalled(e.target.value)}
              />
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
    </Container>
  );
}
