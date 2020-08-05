// import React, { useState, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// // import PPEMaskImage from "../../Media/Images/CleanRoom.png";
// import ResoluteAILogo from "../../Media/Images/resolute-AI-logo-rectangle.png";
// import labs_images from "../../Media/Images/labs_images.jpg";
// import "../Auth/DividerWithText.css";
// import firebase from "../../FirebaseConfig";
// import AdminDashboard from "../AdminDashboard";
// import MuiAlert from "@material-ui/lab/Alert";
// import Snackbar from "@material-ui/core/Snackbar";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://resoluteai.in/">
//         ResoluteAI
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// var message = "";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     backgroundImage: "url(../../Media/Images/CleanRoom.png)",
//     backgroundRepeat: "no-repeat",
//     backgroundColor: "white",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: theme.spacing(10),
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignInScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(false);

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const login = () => {
//     setEmail("");
//     setPassword("");
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((user) => console.log("signed in user: ", user.user.toJSON()))
//       .catch((err) => {
//         console.log(err);
//         message = err.message;
//         setOpen(true);
//       });
//   };

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   }, []);

//   const classes = useStyles();

//   if (user) {
//     return <AdminDashboard user={user} />;
//   }

//   return (
//     <Grid container component="main" className={classes.root}>
//       <CssBaseline />
//       <Grid
//         item
//         xs={false}
//         sm={4}
//         md={7}
//         className={classes.image}
//         style={{
//           alignItems: "center",
//           justifyContent: "center",
//           display: "flex",
//         }}
//       >
//         <img
//           src={labs_images}
//           alt="Loading"
//           style={{ height: "100%", margin: "auto" }}
//         />
//       </Grid>
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <div className={classes.paper}>
//           <img
//             src={ResoluteAILogo}
//             alt="loading"
//             style={{ width: "80%", height: "50%", marginBottom: 20 }}
//             className="w3-animate-zoom"
//           />
//           <h2 style={{ color: "#505050" }}>Welcome to PPE Client</h2>
//           <form className={classes.form}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div style={{ margin: 10, textAlign: "center" }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//                 style={{ width: "50%", borderRadius: 20 }}
//                 onClick={login}
//               >
//                 Sign In
//               </Button>
//             </div>
//             <div className="separator">OR</div>
//             <Grid container style={{ marginTop: 30 }}>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//             <Box mt={5}>
//               <Copyright />
//             </Box>
//           </form>
//         </div>
//       </Grid>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="error">
//           {message}
//         </Alert>
//       </Snackbar>
//     </Grid>
//   );
// }



// new code



import React, { useState, useEffect, Fragment } from "react";
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
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Container from '@material-ui/core/Container';


import { db } from "../../FirebaseConfig";
import { Redirect } from "react-router-dom";


import FaceGenieLogo from '../placeholders/face-genie.png';
import Face from '../placeholders/Face.png';
import Overlay from '../placeholders/overlay.png';
import BackIcon from '../placeholders/BackIcon.png';

import { Tab } from 'semantic-ui-react'

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var message = "";
var severity = "success";

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
  const [open, setOpen] = useState(false);


  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");
  const [organization, setOrganization] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

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
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          console.log(JSON.stringify(user));
          message = "Account successfully created";
          severity = "success";
          db.collection("users")
            .add(details)
            .then((doc) => {
              console.log(doc.id);
              setOpen(true);
              setLoading(false);
              setTimeout(() => {
                setUser(user);
              }, 2000);
            })
            .catch((err) =>
              console.log("error adding user to firebase: ", err)
            );
        }
      })
      .catch((err) => {
        console.log(err);
        message = err.message;
        severity = "error";
        setOpen(true);
        setLoading(false);
      });
  };

  const login = () => {
    setEmail("");
    setPassword("");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => console.log("signed in user: ", user.user.toJSON()))
      .catch((err) => {
        console.log(err);
        message = err.message;
        setOpen(true);
      });
  };

  const panes = [
    {
      menuItem: 'Sign In', render: () => <Tab.Pane>
        <div>

          <Typography
            variant='h5'
            align='center'
            className={classes.heading}
            style={{ marginTop: "3%" }}
          >
            <Box>Enter your details to Sign In</Box>
          </Typography>
          <Grid container justify='center'>
            <Grid item>
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

                {/* <div className="separator">OR</div> */}
                <Grid container style={{ marginTop: "3%" }}>
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
                <Box mt={5}>
                </Box>
              </form>
            </Grid>
          </Grid>
        </div>
      </Tab.Pane>
    },
    {
      menuItem: 'Sign Up', render: () => <Tab.Pane>
        <Typography
          variant='h5'
          align='center'
          className={classes.heading}
          style={{ marginBottom: "3%", marginTop: "3%" }}
        >
          <Box>Enter your details to create an account</Box>
        </Typography>
        <Grid container justify='center'>
          <Grid item>
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
                      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        email
                      ) && email !== ""
                    }
                    helperText={
                      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
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
                    id="organization"
                    label="Organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
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
                        : contactNumber.length !== 10 && contactNumber !== ""
                          ? "Should consist of 10 digits"
                          : ""
                    }
                  />
                </Grid>
              </Grid>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <Button
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
                    email.length === 0 ||
                    (!/^[0-9]+$/.test(contactNumber) && contactNumber !== "") ||
                    loading
                  }
                >
                  {loading ? "Signing Up" : "Sign Up"}
                </Button>
              </div>
              <Grid container justify="flex-end">
                <Grid item>
                  {/* <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link> */}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Tab.Pane>
    },
  ]

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
        {/* <div className={classes.paper}>
          <img
            src={ResoluteAILogo}
            alt="loading"
            style={{ width: "80%", height: "50%", marginBottom: 20 }}
            className="w3-animate-zoom"
          />
          <h2 style={{ color: "#505050" }}>Welcome to PPE Client</h2>
          
        </div> */}
        <div className={classes.paper}>
          <img src={FaceGenieLogo} alt='FaceGenieLogo' />
          <Typography variant='h5'>
            <Box>
              PPE Management System
            </Box>
          </Typography>
          <div className={classes.buttons}>
            <Fragment>
              {/* <Link to='/'>
                <Button
                  startIcon={<img src={BackIcon} />}
                  className={classes.backButton}
                >
                  Go Back
                  </Button>
              </Link> */}
              <Typography
                variant='h5'
                align='center'
                className={classes.heading}
                style={{ marginBottom: "3%", marginTop: "5%" }}
              >
                <Box fontWeight={800}>Please Sign In to continue</Box>
              </Typography>
              <Container maxWidth='xl'>


                <Tab panes={panes} />




              </Container>
              {/* <div style={{ marginTop: "20%"}}>
                <Copyright />
              </div> */}

              {/* <Typography style={{ marginTop: '4%', marginLeft: '10%' }}>
                <Box>
                  Don't have an account?{' '}
                  <Link to='/signup' style={{ color: 'red' }}>
                    Click here
                    </Link>{' '}
                    to Sign Up{' '}
                </Box>
              </Typography> */}
            </Fragment>

          </div>
        </div>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
