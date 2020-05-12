import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Webcam from "react-webcam";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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

const colorHashtags = ["lab assistant", "management", "employee"];

const videoConstraints = {
  width: 500,
  height: 440,
  facingMode: "user",
};

export default function AddProfile() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [hashtag, setHashtag] = useState("");
  const classes = useStyles();

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
    }, [webcamRef]);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "95%",
          padding: 10,
        }}
        class="w3-card"
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          height={440}
          width={500}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={capture}
        >
          Click Photo
        </Button>
      </div>
    );
  };

  const submitProfileInfo = (e) => {
    e.preventDefault();
    const profile = {
      name: name,
      department: department,
      blocked: blocked,
      hashtag: hashtag,
    };
    console.log(profile);
  };

  const handleReset = (e) => {
    e.preventDefault();
    var confirmAns = window.confirm("Are you sure you want to reset?");
    if (confirmAns) {
      setName("");
      setDepartment("");
      setBlocked(false);
      setHashtag("");
    }
    console.log("pressed reset");
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <WebcamCapture />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Profile
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={submitProfileInfo}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              autoFocus
              value={name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="department"
              label="Department"
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              autoComplete="department"
              value={department}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={(e) => setBlocked(e.target.checked)}
                  checked={blocked}
                />
              }
              label="Blocked"
              value={blocked}
            />
            <Grid item xs={12}>
              <div style={{ marginBottom: "0.5%" }}>
                Suggested Hashtags:
                {colorHashtags.map((hashtag) => (
                  <Chip
                    label={`#${hashtag}`}
                    style={{
                      margin: "2px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setHashtag(`#${hashtag}`);
                    }}
                  />
                ))}
              </div>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleReset}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
