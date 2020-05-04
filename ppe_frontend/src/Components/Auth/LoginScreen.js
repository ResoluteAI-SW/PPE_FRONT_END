import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import PPEMaskImage from "../../Media/Images/CleanRoom.png";
import ResoluteAILogo from "../../Media/Images/resolute-AI-logo-rectangle.png";
import labs_images from "../../Media/Images/labs_images.jpg";
import "../Auth/DividerWithText.css";
import firebase from "../../FirebaseConfig";
import AdminDashboard from "../AdminDashboard";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://resoluteai.in/">
        ResoluteAI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(../../Media/Images/CleanRoom.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(10),
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

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const login = () => {
    setEmail("");
    setPassword("");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => console.log("signed in user: ", user.user.toJSON()))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const classes = useStyles();

  if (user) {
    return <AdminDashboard user={user} />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <img
          src={labs_images}
          alt="Loading"
          style={{ height: "100%", margin: "auto" }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            src={ResoluteAILogo}
            alt="loading"
            style={{ width: "80%", height: "50%", marginBottom: 20 }}
          />
          <h1 style={{ color: "#505050" }}>Welcome to PPE Client</h1>
          <form className={classes.form}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ margin: 10, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ width: "50%", borderRadius: 20 }}
                onClick={login}
              >
                Sign In
              </Button>
            </div>
            <div className="separator">OR</div>
            <Grid container style={{ marginTop: 30 }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
