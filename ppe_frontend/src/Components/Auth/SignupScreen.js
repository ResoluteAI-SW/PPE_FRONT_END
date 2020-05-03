import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ResoluteAILogo from "../../Media/Images/resolute-AI-logo-rectangle.png";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ marginBottom: 5 }}
    >
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [organization, setOrganization] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const classes = useStyles();

  const signup = () => {
    const details = {
      email: email,
      username: username,
      password1: password,
      password2: password2,
      organization: organization,
      ph_number: contactNumber,
    };
    console.log(JSON.stringify(details));
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(161,31,31,1) 64%)",
        opacity: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        style={{
          width: "40%",
          marginTop: "3%",
          marginBottom: "2.68%",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img
              src={ResoluteAILogo}
              alt="loading"
              style={{ width: "80%", height: "50%", marginBottom: 20 }}
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error={
                      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        email
                      ) && email !== ""
                    }
                    helperText={
                      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        email
                      ) && email !== ""
                        ? "Invalid email"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="confirm-password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    error={password2 !== password && password2 !== ""}
                    helperText={
                      password2 !== password && password2 !== ""
                        ? "Passwords do not match"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="organization"
                    name="organization"
                    // required
                    fullWidth
                    id="organization"
                    label="Organization"
                    autoFocus
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    fullWidth
                    id="contact"
                    label="Contact"
                    name="contact"
                    autoComplete="contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    error={
                      !/^[0-9]+$/.test(contactNumber) && contactNumber !== ""
                    }
                    helperText={
                      !/^[0-9]+$/.test(contactNumber) && contactNumber !== ""
                        ? "Invalid contact number"
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ width: "50%", borderRadius: 20 }}
                  onClick={signup}
                  disabled={
                    (password !== password2 && password2 !== "") ||
                    password.length === 0 ||
                    password2.length === 0 ||
                    username.length === 0 ||
                    email.length === 0
                  }
                >
                  Sign Up
                </Button>
              </div>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>

          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Paper>
    </div>
  );
}
