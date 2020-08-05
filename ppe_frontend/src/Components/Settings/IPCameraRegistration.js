// import React, { useState, useContext, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Chip from "@material-ui/core/Chip";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { UserContext } from "../AdminDashboard";
// import { rdb } from "../../FirebaseConfig";

// const colorHashtags = ["entry", "exit", "lab", "lobby"];

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
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
//   table: {
//     minWidth: 400,
//   },
// }));

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

// var severity = "success";
// var message = "IP Camera successfully registered";

// var ipCameraEdit = null;
// var ipCamerasTemp = [];

// export default function IPCameraRegistration() {
//   const classes = useStyles();
//   const [ipAddress, setIPAddress] = useState("");
//   const [placeInstalled, setPlaceInstalled] = useState("");
//   const [hashtag, setHashtag] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [open, setOpen] = React.useState(false);
//   const [ipCameras, setIPCameras] = useState([]);
//   const [body_suit, setBody_Suit] = useState(false);
//   const [boots, setBoots] = useState(false);
//   const [gloves, setGloves] = useState(false);
//   const [headgear, setHeadgear] = useState(false);
//   const [mask, setMask] = useState(false);
//   const [safety_goggles, setSafety_Goggles] = useState(false);
//   const user = useContext(UserContext);

//   useEffect(() => {
//     user.ref.collection("ipCameras").onSnapshot((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         ipCamerasTemp.push(doc.data());
//         console.log(ipCamerasTemp);
//       });
//       setIPCameras(ipCamerasTemp);
//       ipCamerasTemp = [];
//     });
//   }, []);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (
//       ipAddress === "" ||
//       hashtag === "" ||
//       placeInstalled === "" ||
//       username === "" ||
//       password === ""
//     ) {
//       severity = "warning";
//       message = "Please fill all the details";
//       setOpen(true);
//     } else {
//       console.log(ipCameraEdit);
//       setIPCameras([]);
//       if (ipCameraEdit) {
//         for (var i = 0; i < ipCameras.length; i++) {
//           if (ipCameras[i].IPAddress === ipCameraEdit.IPAddress) {
//             user.ref
//               .collection("ipCameras")
//               .where("IPAddress", "==", ipCameraEdit.IPAddress)
//               .get()
//               .then((querySnapshot) => {
//                 const IPCameraDoc = querySnapshot.docs[0];
//                 IPCameraDoc.ref
//                   .set(
//                     {
//                       IPAddress: ipAddress,
//                       Place: placeInstalled,
//                       Hashtag: hashtag,
//                       Username: username,
//                       Password: password,
//                     },
//                     { merge: true }
//                   )
//                   .then(() => {
//                     const IPAddress = ipCameraEdit.IPAddress.replace(
//                       /\./g,
//                       "_"
//                     );
//                     console.log(IPAddress);
//                     updateToRDB(user, IPAddress, ipAddress);
//                     message = "Edit Successful";
//                     severity = "success";
//                     setUsername("");
//                     setPassword("");
//                     setHashtag("");
//                     setIPAddress("");
//                     setPlaceInstalled("");
//                     setOpen(true);
//                   })
//                   .catch((err) => {
//                     message = err.message;
//                     severity = "error";
//                     setOpen(true);
//                   });
//               });
//             return 0;
//           }
//           console.log("heyy");
//         }
//       }
//       let ipCameraInfo = {
//         IPAddress: ipAddress,
//         Place: placeInstalled,
//         Hashtag: hashtag,
//         Username: username,
//         Password: password,
//         BodySuit: body_suit,
//         Boots: boots,
//         Gloves: gloves,
//         Headgear: headgear,
//         Mask: mask,
//         Safety_Goggles: safety_goggles,
//       };
//       user.ref
//         .collection("ipCameras")
//         .add(ipCameraInfo)
//         .then((doc) => {
//           if (doc.id) {
//             writeToRDB(user, ipCameraInfo, setOpen);
//             severity = "success";
//             message = "IP Camera details successfully submitted";
//             setUsername("");
//             setPassword("");
//             setHashtag("");
//             setIPAddress("");
//             setPlaceInstalled("");
//             setOpen(true);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           severity = "error";
//           message = err.message;
//           setOpen(true);
//         });
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleEdit = (ipAddress) => {
//     console.log(ipAddress);
//     ipCameraEdit = ipCameras.find(
//       (ipCamera) => ipCamera.IPAddress === ipAddress
//     );
//     setIPAddress(ipCameraEdit.IPAddress);
//     setPlaceInstalled(ipCameraEdit.Place);
//     setUsername(ipCameraEdit.Username);
//     setPassword(ipCameraEdit.Password);
//     setHashtag(ipCameraEdit.Hashtag);
//   };

//   const handleDelete = (ipAddress) => {
//     console.log(ipAddress);
//     user.ref
//       .collection("ipCameras")
//       .where("IPAddress", "==", ipAddress)
//       .get()
//       .then((querySnapshot) => {
//         const IPCameraDoc = querySnapshot.docs[0];
//         IPCameraDoc.ref
//           .delete()
//           .then(() => {
//             deleteFromRDB(ipAddress, user, setOpen);
//           })
//           .catch((err) => {
//             console.log(err);
//             severity = "error";
//             message = err.message;
//             setOpen(true);
//           });
//       });
//   };

//   return (
//     <Container component="main" style={{ width: "100%" }}>
//       <CssBaseline />
//       <Grid container spacing={3} maxwidth="xs">
//         <Grid item xs={6}>
//           <div className={classes.paper} class="w3-animate-bottom">
//             <div style={{ textAlign: "center" }}>
//               <Typography component="h1" variant="h4">
//                 IP Camera Registration
//               </Typography>
//             </div>
//             <form
//               className={classes.form}
//               noValidate
//               onSubmit={handleFormSubmit}
//             >
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="ipAddress"
//                 label="IP Address"
//                 name="ipAddress"
//                 autoComplete="ipAddress"
//                 autoFocus
//                 value={ipAddress}
//                 onChange={(e) => setIPAddress(e.target.value)}
//               />
//               <Grid
//                 item
//                 xs={12}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   required
//                   id="placeInstalled"
//                   label="Place Installed"
//                   name="placeInstalled"
//                   autoComplete="placeInstalled"
//                   fullWidth
//                   onChange={(e) => setPlaceInstalled(e.target.value)}
//                   value={placeInstalled}
//                 />
//               </Grid>
//               <Grid container spacing={3}>
//                 <Grid
//                   item
//                   xs={6}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     id="username"
//                     label="Username"
//                     name="username"
//                     autoComplete="username"
//                     onChange={(e) => setUsername(e.target.value)}
//                     value={username}
//                   />
//                 </Grid>
//                 <Grid
//                   item
//                   xs={6}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="password"
//                     label="Password"
//                     name="password"
//                     type="password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     value={password}
//                   />
//                 </Grid>
//               </Grid>
//               <Grid item xs={12}>
//                 <div>
//                   Suggested Hashtags:
//                   {colorHashtags.map((hashtag) => (
//                     <Chip
//                       label={`#${hashtag}`}
//                       style={{
//                         margin: "3px",
//                       }}
//                       variant="outlined"
//                       onClick={() => {
//                         setHashtag(`#${hashtag}`);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   id="Hashtag"
//                   label="Insert # Hashtag"
//                   fullWidth
//                   name="Hashtag"
//                   autoComplete="Hashtag"
//                   onChange={(e) => setHashtag(e.target.value)}
//                   value={hashtag}
//                 />
//               </Grid>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-evenly",
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="remember"
//                       color="primary"
//                       onChange={(e) => setBody_Suit(e.target.checked)}
//                       checked={body_suit}
//                     />
//                   }
//                   label="Body Suit"
//                   value={body_suit}
//                   color="black"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="remember"
//                       color="primary"
//                       onChange={(e) => setBoots(e.target.checked)}
//                       checked={boots}
//                     />
//                   }
//                   label="Boots"
//                   value={boots}
//                   color="black"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="remember"
//                       color="primary"
//                       onChange={(e) => setGloves(e.target.checked)}
//                       checked={gloves}
//                     />
//                   }
//                   label="Gloves"
//                   value={gloves}
//                   color="black"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="remember"
//                       color="primary"
//                       onChange={(e) => setHeadgear(e.target.checked)}
//                       checked={headgear}
//                     />
//                   }
//                   label="Headgear"
//                   value={headgear}
//                   color="black"
//                 />
//               </div>
//               <div style={{ display: "flex", justifyContent: "center" }}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="remember"
//                       color="primary"
//                       onChange={(e) => setMask(e.target.checked)}
//                       checked={mask}
//                     />
//                   }
//                   label="Mask"
//                   value={mask}
//                   color="black"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="remember"
//                       color="primary"
//                       onChange={(e) => setSafety_Goggles(e.target.checked)}
//                       checked={safety_goggles}
//                     />
//                   }
//                   label="Safety Goggles"
//                   value={safety_goggles}
//                   color="black"
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//               >
//                 Register IP Camera
//               </Button>
//             </form>
//             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//               <Alert onClose={handleClose} severity={severity}>
//                 {message}
//               </Alert>
//             </Snackbar>
//           </div>
//         </Grid>
//         <Grid item xs={6}>
//           <div className={classes.paper} class="w3-animate-bottom">
//             <TableContainer component={Paper}>
//               <Table className={classes.table} aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell>IP Address</StyledTableCell>
//                     <StyledTableCell align="right">Location</StyledTableCell>
//                     <StyledTableCell align="right">Hashtag</StyledTableCell>
//                     <StyledTableCell align="right">Actions</StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {ipCameras.map((row) => (
//                     <StyledTableRow key={row.uuid}>
//                       <StyledTableCell component="th" scope="row">
//                         {row.IPAddress}
//                       </StyledTableCell>
//                       <StyledTableCell align="right">
//                         {row.Place}
//                       </StyledTableCell>
//                       <StyledTableCell align="right">
//                         {row.Hashtag}
//                       </StyledTableCell>
//                       <StyledTableCell align="right">
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           <IconButton
//                             onClick={() => {
//                               handleEdit(row.IPAddress);
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => {
//                               handleDelete(row.IPAddress);
//                             }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </div>
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// function updateToRDB(user, IPAddress, ipAddress) {
//   rdb
//     .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
//     .once("value")
//     .then((querySnapshot) => {
//       const obj = querySnapshot.val();
//       rdb
//         .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
//         .remove()
//         .then(() => {
//           const newIPAddress = ipAddress.replace(/\./g, "_");
//           rdb.ref(`/SocialDistancing/${user.id}/${newIPAddress}`).set(obj);
//         });
//     });
//   rdb
//     .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
//     .once("value")
//     .then((querySnapshot) => {
//       const obj = querySnapshot.val();
//       rdb
//         .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
//         .remove()
//         .then(() => {
//           const newIPAddress = ipAddress.replace(/\./g, "_");
//           rdb.ref(`/PPE_Alerts/${user.id}/${newIPAddress}`).set(obj);
//         });
//     });
// }

// function deleteFromRDB(ipAddress, user, setOpen) {
//   const IPAddress = ipAddress.replace(/\./g, "_");
//   rdb
//     .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
//     .remove()
//     .then(() => {
//       severity = "success";
//       message = "IP Camera successfully deleted";
//       setOpen(true);
//     })
//     .catch((err) => {
//       console.log(err);
//       severity = "error";
//       message = err.message;
//       setOpen(true);
//     });
//   rdb
//     .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
//     .remove()
//     .then(() => {
//       severity = "success";
//       message = "IP Camera successfully deleted";
//       setOpen(true);
//     })
//     .catch((err) => {
//       console.log(err);
//       severity = "error";
//       message = err.message;
//       setOpen(true);
//     });
// }

// function writeToRDB(user, ipCameraInfo, setOpen) {
//   const IPAddress = ipCameraInfo.IPAddress.replace(/\./g, "_");
//   rdb
//     .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
//     .set({
//       status: "Green",
//       Logs: {},
//     })
//     .then((res) => {
//       console.log("response: ", res);
//     })
//     .catch((err) => {
//       console.log(
//         "Error while updating the Social distancing in Real time Database",
//         err
//       );
//       console.log(err);
//       severity = "error";
//       message = err.message;
//       setOpen(true);
//     });
//   rdb
//     .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
//     .set({
//       status: "Green",
//       people: 0,
//       mask: 0,
//       body_Suit: 0,
//       boots: 0,
//       gloves: 0,
//       headgear: 0,
//       non_body_suit: 0,
//       safety_goggles: 0,
//       Logs: {},
//     })
//     .then((res) => {
//       console.log("response: ", res);
//     })
//     .catch((err) => {
//       console.log(
//         "Error while updating the PPE Alerts in Real time Database",
//         err
//       );
//       console.log(err);
//       severity = "error";
//       message = err.message;
//       setOpen(true);
//     });
// }


//new code




import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import VideocamIcon from "@material-ui/icons/Videocam";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import { UserContext } from "../AdminDashboard";
import { rdb } from "../../FirebaseConfig";
import IPtable from './IPtable'


const colorHashtags = ["entry", "exit", "canteen", "class"];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

var severity = "success";
var message = "IP Camera successfully registered";

var ipCameraEdit = null;
var ipCamerasTemp = [];

export default function IPCameraRegistration() {
  const classes = useStyles();
  const [ipAddress, setIPAddress] = useState("");
  const [placeInstalled, setPlaceInstalled] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [ipCameras, setIPCameras] = useState([]);
  const [body_suit, setBody_Suit] = useState(false);
  const [boots, setBoots] = useState(false);
  const [gloves, setGloves] = useState(false);
  const [headgear, setHeadgear] = useState(false);
  const [mask, setMask] = useState(false);
  const [safety_goggles, setSafety_Goggles] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    user.ref.collection("ipCameras").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ipCamerasTemp.push(doc.data());
        console.log(ipCamerasTemp);
      });
      setIPCameras(ipCamerasTemp);
      ipCamerasTemp = [];
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
                    const IPAddress = ipCameraEdit.IPAddress.replace(
                      /\./g,
                      "_"
                    );
                    console.log(IPAddress);
                    updateToRDB(user, IPAddress, ipAddress);
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
        BodySuit: body_suit,
        Boots: boots,
        Gloves: gloves,
        Headgear: headgear,
        Mask: mask,
        Safety_Goggles: safety_goggles,
      };
      user.ref
        .collection("ipCameras")
        .add(ipCameraInfo)
        .then((doc) => {
          if (doc.id) {
            writeToRDB(user, ipCameraInfo, setOpen);
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
    user.ref
      .collection("ipCameras")
      .where("IPAddress", "==", ipAddress)
      .get()
      .then((querySnapshot) => {
        const IPCameraDoc = querySnapshot.docs[0];
        IPCameraDoc.ref
          .delete()
          .then(() => {
            deleteFromRDB(ipAddress, user, setOpen);
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
    <div style={{ marginTop: "3%"}}>
      <Grid container spacing={12}>
        <Grid item md={4} style={{ marginLeft: "5%" }}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              IP Camera Registration
            </Typography>
            <form className={classes.form} noValidate
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setBody_Suit(e.target.checked)}
                      checked={body_suit}
                    />
                  }
                  label="Body Suit"
                  value={body_suit}
                  color="black"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setBoots(e.target.checked)}
                      checked={boots}
                    />
                  }
                  label="Boots"
                  value={boots}
                  color="black"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setGloves(e.target.checked)}
                      checked={gloves}
                    />
                  }
                  label="Gloves"
                  value={gloves}
                  color="black"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setHeadgear(e.target.checked)}
                      checked={headgear}
                    />
                  }
                  label="Headgear"
                  value={headgear}
                  color="black"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setMask(e.target.checked)}
                      checked={mask}
                    />
                  }
                  label="Mask"
                  value={mask}
                  color="black"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={(e) => setSafety_Goggles(e.target.checked)}
                      checked={safety_goggles}
                    />
                  }
                  label="Safety Goggles"
                  value={safety_goggles}
                  color="black"
                />
              </div>
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
          </div>
        </Grid>


        <Grid item md={6} style={{ marginLeft: "7%" }}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Current IP Camera Configurations
          </Typography>
            <IPtable />
          </div>

        </Grid>
      </Grid>

      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {content}
        </Alert>
      </Snackbar> */}
    </div>

  );
}



function updateToRDB(user, IPAddress, ipAddress) {
  rdb
    .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
    .once("value")
    .then((querySnapshot) => {
      const obj = querySnapshot.val();
      rdb
        .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
        .remove()
        .then(() => {
          const newIPAddress = ipAddress.replace(/\./g, "_");
          rdb.ref(`/SocialDistancing/${user.id}/${newIPAddress}`).set(obj);
        });
    });
  rdb
    .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
    .once("value")
    .then((querySnapshot) => {
      const obj = querySnapshot.val();
      rdb
        .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
        .remove()
        .then(() => {
          const newIPAddress = ipAddress.replace(/\./g, "_");
          rdb.ref(`/PPE_Alerts/${user.id}/${newIPAddress}`).set(obj);
        });
    });
}

function deleteFromRDB(ipAddress, user, setOpen) {
  const IPAddress = ipAddress.replace(/\./g, "_");
  rdb
    .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
    .remove()
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
  rdb
    .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
    .remove()
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
}

function writeToRDB(user, ipCameraInfo, setOpen) {
  const IPAddress = ipCameraInfo.IPAddress.replace(/\./g, "_");
  rdb
    .ref(`/SocialDistancing/${user.id}/${IPAddress}`)
    .set({
      status: "Green",
      Logs: {},
    })
    .then((res) => {
      console.log("response: ", res);
    })
    .catch((err) => {
      console.log(
        "Error while updating the Social distancing in Real time Database",
        err
      );
      console.log(err);
      severity = "error";
      message = err.message;
      setOpen(true);
    });
  rdb
    .ref(`/PPE_Alerts/${user.id}/${IPAddress}`)
    .set({
      status: "Green",
      people: 0,
      mask: 0,
      body_Suit: 0,
      boots: 0,
      gloves: 0,
      headgear: 0,
      non_body_suit: 0,
      safety_goggles: 0,
      Logs: {},
    })
    .then((res) => {
      console.log("response: ", res);
    })
    .catch((err) => {
      console.log(
        "Error while updating the PPE Alerts in Real time Database",
        err
      );
      console.log(err);
      severity = "error";
      message = err.message;
      setOpen(true);
    });
}
