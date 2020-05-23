import React, { useState, useContext, useEffect } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Webcam from "react-webcam";
import { UserContext } from "../AdminDashboard";
import { db } from "../../FirebaseConfig";
import RetrainUsers from "./RetrainUsers";

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
const angles = ["Front", "Top", "Bottom", "Right", "Left"];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const videoConstraints = {
  width: 500,
  height: 440,
  facingMode: "user",
};

var severity = "success";
var message = "IP Camera successfully registered";

export default function AddProfile() {
  const adminDoc = useContext(UserContext);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [department, setDepartment] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [hashtag, setHashtag] = useState("");
  const [open, setOpen] = React.useState(false);
  const [retrainedPersons, setRetrainedPersons] = useState(0);
  const classes = useStyles();

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImages((images) => images.concat(imageSrc));
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
        <Tooltip
          title="Click 5 photos with different angles"
          open={images.length !== 5}
          arrow
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={capture}
            disabled={images.length >= 5}
          >
            Click Photo
          </Button>
        </Tooltip>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {images.map((image) => (
            <img
              src={image}
              alt="loading."
              style={{ width: 50, height: 50, margin: 5 }}
            />
          ))}
        </div>
      </div>
    );
  };

  const submitProfileInfo = (e) => {
    e.preventDefault();
    const uuid = parseInt(adminDoc.data().persons_registered) + 1;
    console.log(uuid);
    const persons_not_retrained =
      parseInt(adminDoc.data().persons_not_retrained) + 1;
    console.log(persons_not_retrained);
    const profileInfo = {
      uuid: uuid,
      name: name,
      department: department,
      blocked: blocked,
      hashtag: hashtag,
      adminEmail: adminDoc.data().email,
      adminOrganization: adminDoc.data().organization,
    };
    var form = new FormData();
    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    // };
    form.append("identification", uuid);
    form.append("Front_Face", images[0]);
    form.append("Bottom_Face", images[1]);
    form.append("Top_Face", images[2]);
    form.append("Right_Face", images[3]);
    form.append("Left_Face", images[4]);
    db.collection("people")
      .add(profileInfo)
      .then((doc) => {
        console.log(doc.id);
        adminDoc.ref
          .set(
            {
              persons_registered: uuid,
              persons_not_retrained: persons_not_retrained,
            },
            { merge: true }
          )
          .then(() => {
            // add the backend integration here using form and config
            //----------------------------------------
            //add these lines in .then() of backend response
            console.log("successfully updated");
            severity = "success";
            message = `Details successfully registered.`;
            setOpen(true);
            setName("");
            setDepartment("");
            setBlocked(false);
            setHashtag("");
            setImages([]);
          })
          .catch((err) => {
            console.log(err);
            severity = "error";
            message = `Error while updating admin info: ${err.message}`;
            setOpen(true);
          });
      })
      .catch((err) => {
        console.log(err);
        severity = "error";
        message = err.message;
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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

  useEffect(() => {
    adminDoc.ref.onSnapshot((doc) => {
      setRetrainedPersons(doc.data().persons_not_retrained);
    });
  });

  if (retrainedPersons > 4) {
    return <RetrainUsers />;
  }

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        {images.length === 5 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <h2>Images captured</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {images.map((image) => (
                <img
                  src={image}
                  alt="loading."
                  style={{ width: 100, height: 100, margin: 5 }}
                />
              ))}
            </div>
          </div>
        ) : (
          <WebcamCapture />
        )}
      </Grid>
      {images.length === 5 ? (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add Profile Details
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
                <div style={{ marginBottom: "2%" }}>
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
                    disabled={
                      name === "" || department === "" || hashtag === ""
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} sm={8} md={5} square>
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>
              Click the photo with {angles[images.length]} angle of the face
            </h3>
          </div>
        </Grid>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
