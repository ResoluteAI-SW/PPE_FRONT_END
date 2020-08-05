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
import axios from "axios";

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
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          height={440}
          width={500}
        />
        {/* <Tooltip
          title="Click 5 photos with different angles"
          open={images.length !== 5}
          arrow
        > */}
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={capture}
            disabled={images.length >= 5}
          >
            Click Photo
          </Button>
        {/* </Tooltip> */}
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
    const persons_registered = parseInt(adminDoc.data().persons_registered) + 1;
    const persons_not_retrained =
      parseInt(adminDoc.data().persons_not_retrained) + 1;
    console.log(persons_not_retrained);
    const profileInfo = {
      name: name,
      department: department,
      blocked: blocked,
      hashtag: hashtag,
      adminEmail: adminDoc.data().email,
      adminOrganization: adminDoc.data().organization,
    };
    var form = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    form.append("Front_Face", images[0]);
    form.append("Bottom_Face", images[1]);
    form.append("Top_Face", images[2]);
    form.append("Right_Face", images[3]);
    form.append("Left_Face", images[4]);
    db.collection("people")
      .add(profileInfo)
      .then((doc) => {
        console.log(doc.id);
        form.append("identification", doc.id);
        adminDoc.ref
          .set(
            {
              persons_registered: persons_registered,
              persons_not_retrained: persons_not_retrained,
            },
            { merge: true }
          )
          .then(() => {
            axios
              .post("https://facegenie.co/recog/reg/", form, config)
              .then((res) => {
                if (res.status === 200) {
                  console.log("successfully updated");
                  severity = "success";
                  message = `Details successfully registered.`;
                  setOpen(true);
                  setName("");
                  setDepartment("");
                  setBlocked(false);
                  setHashtag("");
                  setImages([]);
                }
              })
              .catch((err) => {
                console.log(err);
                severity = "error";
                message = `Error while uploading images: ${err}`;
                setOpen(true);
              });
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
    // adminDoc.ref.onSnapshot((doc) => {
    //   setRetrainedPersons(doc.data().persons_not_retrained);
    // });
  });

  if (retrainedPersons > 1) {
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
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <div style={{ marginTop: "10%"}}>
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
              // height: "100vh",
              marginTop: "50%",
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


//new code


// import React, { useState, useEffect } from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Grid from "@material-ui/core/Grid";
// import Chip from "@material-ui/core/Chip";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { firedb } from "../firebase";
// import moment from 'moment'
// import WebcamCapture from "./WebcamComponent";
// import Loader from "react-loader-spinner";
// import Camera from './Camera'

// const colorHashtags = ["yellow", "red", "blue", "green"];

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   },
//   paper: {
//     marginTop: theme.spacing(6),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },
//   avatar: {
//     margin: theme.spacing(1),
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// }));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// export default function AddUserProfile(props) {

//   const [uuid, setUuid] = useState(
//     "Auto-Generated"
//   );
//   const [regNo, setRegNo] = useState(
//     ""
//   );
//   const [firstName, setFirstName] = useState(
//     ""
//   );
//   const [lastName, setLastName] = useState(
//     ""
//   );
//   const [classOfUser, setClassOfUser] = useState(
//     ""
//   );
//   const [section, setSection] = useState(
//     ""
//   );
//   const [blocked, setBlocked] = useState(
//     ""
//   );
//   const [hashtag, setHashtag] = useState(
//     ""
//   );
//   const [photos, setPhotos] = useState(false)
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const [reg, setReg] = useState("")
//   const [images, setImages] = useState([])
//   const [imageLength, setImagelength] = useState(0)
//   const [showSnackBarImagesError, setShowSnackBarImagesError] = useState(false)
//   const [statusRegister, setStatusRegister] = useState(false)
//   const [showSnackBarRegister, setShowSnackBarRegister] = useState(false)


//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpenSnackBar(false);
//     setShowSnackBarImagesError(false)
//     setStatusRegister(false)
//     setShowSnackBarRegister(false)
//   };



//   const datetime = new Date().toISOString()
//   console.log(datetime)



//   useEffect(() => {
//     firedb
//       .collection("students")
//       .orderBy("created_at", "desc")
//       .limit(1)
//       .get()
//       .then(querySnapshot => {
//         console.log(querySnapshot)
//         querySnapshot.forEach(doc => {
//           console.log(doc.data())
//           console.log(doc.data().regNo)
//           console.log(doc.data().created_at)
//           setReg(doc.data().regNo)

//           // console.log(doc.data().created_at.toDate().toString())                                      //gets and formats timestamp
//           // if(doc.data().created_at.toDate().toString() < datetime){
//           //   console.log("found")

//           // }
//         })
//       })
//   }, [])

//   var newregno = parseInt(reg)
//   newregno++;
//   console.log(newregno)

//   var fruits = moment(datetime).format('LL LTS');
//   console.log(fruits)
//   var ts = "July 20, 2020 8:03 PM"
//   var citrus = fruits.slice(0, 14);
//   var time = fruits.slice(14, 27)
//   var firedate = citrus + "at " + time + " UTC+5:30"
//   Date.parse(firedate)
//   console.log(typeof (firedate))




//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!firstName || !lastName || !classOfUser || !section) {
//       setOpenSnackBar(true);
//     } else {

//       const profileDetails = {
//         regNo: newregno.toString(),
//         firstName: firstName,
//         lastName: lastName,
//         classOfUser: classOfUser,
//         section: section,
//         blocked: blocked,
//         registrationDone: "true",
//         hashtag: hashtag,
//         created_at: firedate
//       }


//       console.log(profileDetails)
//       if (images.length !== 5) {
//         setShowSnackBarImagesError(true)
//       } else {
//         //firebase insertion code

//         firedb
//           .collection("students")
//           .add(profileDetails)
//           .then(response => {
//             console.log(response.id)
//             console.log("added!")
//             setStatusRegister(true)
//             setShowSnackBarRegister(true)
//             handleDone()
//           });

//         //completed the details registration but not posting the images to the backend.
//       }
//     };


//   }



//   const formDataPreparation = () => {
//     var form = new FormData();
//     const config = {
//       headers: { "content-type": "multipart/form-data" }
//     };
//     form.append("identification", this.state.UUID);
//     form.append("Front_Face", this.state.images[0]);
//     form.append("Bottom_Face", this.state.images[1]);
//     form.append("Top_Face", this.state.images[2]);
//     form.append("Right_Face", this.state.images[3]);
//     form.append("Left_Face", this.state.images[4]);
//     return { form, config };
//   }

//   const handleDone = e => {
//     setRegNo("");
//     setFirstName("");
//     setLastName("");
//     setClassOfUser("");
//     setSection("");
//     setBlocked(false);
//     setHashtag("");
//     setImages([]);
//     setImagelength(0);
//   };

//   const handleReset = e => {
//     e.preventDefault();
//     confirmAlert({
//       title: "Warning!",
//       message: "Are you sure you want to reset the details",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             setRegNo("");
//             setFirstName("");
//             setLastName("");
//             setClassOfUser("");
//             setSection("");
//             setBlocked(false);
//             setHashtag("");
//             props.onFormReset({
//               regNo: "",
//               firstName: "",
//               lastName: "",
//               classOfUser: "",
//               section: "",
//               blocked: false,
//               registrationDone: "false",
//               hashtag: ""
//             });
//           }
//         },
//         {
//           label: "No",
//           onClick: () => { }
//         }
//       ]
//     });
//   };



//   const classes = useStyles();


//   const addImages = image => {
//     images.push(image)
//     console.log(images)
//     setImagelength(images.length)
//     console.log(imageLength)
//   };

//   // function ImageList() {
//   //   return (

//   //   );
//   // }

//   return (

//     <div className='w3-animate-bottom'>
//       <Grid container spacing={3} >
//         <Grid item xs={6}>
//           {/* <Camera /> */}


//           <div>
//             <div style={{ float: "left", marginLeft: "20px" }}>
//               <div>
//                 {images.length === 5 ? (
//                   <div>Great Job! All 5 images successfully captured</div>
//                 ) : (
//                     <div>
//                       <h3>
//                         Please capture in all 5 positions respectively: Top Bottom
//                         Left Right Front
//                 </h3>
//                       <WebcamCapture
//                         onClickCapture={addImages}
//                         className="camera"
//                       />
//                       <div
//                         style={{ textAlign: "center" }}
//                       >Count = {imageLength}</div>
//                     </div>
//                   )}
//                 {images.length !== 0 ? <div>
//                   <ul >
//                     {images.map(image => (
//                       <li
//                         key={image}

//                       >
//                         <img
//                           src={image}
//                           alt="Nothing"
//                           style={{
//                             width: "100px",
//                             height: "100px",
//                             margin: "20px"
//                           }}
//                         />
//                         <br />
//                       </li>
//                     ))}
//                   </ul>
//                 </div> : null}
//                 {/* {images.length !== 0 ? console.log(images.length) : null} */}

//               </div>
//               <br />
//               <div style={{ textAlign: "center" }}>
//                 <Button
//                   type="button"
//                   variant="contained"
//                   color="primary"
//                 // onClick={this.handleRetrainClick}
//                 // disabled={!this.state.statusRegister}
//                 >
//                   Retrain
//                 </Button>
//                 {/* <LoadingIndicator /> */}
//               </div>
//             </div>
//             {/* {this.props.uniqueID ? <div style={{ float: "right" }}>
//               <EditUserProfile
//                 onFormSubmit={this.setProfileDetailsAndSubmit}
//                 studentDetails={this.props}
//                 uniqueID={this.props.uniqueID}
//                 onFormReset={this.profileDetailsReset}
//               />
//             </div> : <div style={{ float: "right" }}>
//                 <AddUserProfile
//                   onFormSubmit={this.setProfileDetailsAndSubmit}
//                   studentDetails={this.props}
//                   onFormReset={this.profileDetailsReset}
//                 />
//               </div>} */}


//             {/* <Snackbar
//               open={showSnackBarRetrain}
//               autoHideDuration={4000}
//               onClose={handleClose}
//             >
//               <Alert onClose={handleClose} severity="success">
//                 Retrain Successful
//               </Alert>
//             </Snackbar> */}
//             <Snackbar
//               open={showSnackBarRegister}
//               autoHideDuration={4000}
//               onClose={handleClose}
//             >
//               <Alert onClose={handleClose} severity="success">
//                 Registration Successful!
//           </Alert>
//             </Snackbar>
//             <Snackbar
//               open={showSnackBarImagesError}
//               autoHideDuration={3000}
//               onClose={handleClose}
//             >
//               <Alert onClose={handleClose} severity="error">
//                 Please capture for all 5 images!
//           </Alert>
//             </Snackbar>
//           </div>
//         </Grid>
//         <Grid item xs={6}>
//           <div className={classes.paper}>
//             <Avatar className={classes.avatar}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Student Details
//         </Typography>
//             <form className={classes.form} noValidate onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="UUID"
//                     name="UUID"
//                     variant="outlined"
//                     disabled
//                     fullWidth
//                     id="UUID"
//                     label="UUID"
//                     autoFocus
//                     onChange={e => setUuid(e.target.value)}
//                     value={uuid}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="Registration Number"
//                     name="RegNo"
//                     variant="outlined"
//                     required
//                     fullWidth
//                     disabled
//                     id="RegNo"
//                     label="Registration No"
//                     value={newregno}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     id="FirstName"
//                     label="First Name"
//                     fullWidth
//                     name="FirstName"
//                     autoComplete="First Name"
//                     onChange={e => setFirstName(e.target.value)}
//                     value={firstName}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     id="LastName"
//                     label="Last Name"
//                     fullWidth
//                     name="LastName"
//                     autoComplete="Last Name"
//                     onChange={e => setLastName(e.target.value)}
//                     value={lastName}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl className={classes.formControl}>
//                     <InputLabel id="ClassLabel">Class</InputLabel>
//                     <Select
//                       labelId="Class"
//                       id="Class"
//                       onChange={e => setClassOfUser(e.target.value)}
//                       value={classOfUser}
//                     >
//                       <MenuItem value={10}>X</MenuItem>
//                       <MenuItem value={11}>XI</MenuItem>
//                       <MenuItem value={12}>XII</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl className={classes.formControl}>
//                     <InputLabel id="SectionLabel">Section</InputLabel>
//                     <Select
//                       labelId="Section"
//                       id="Section"
//                       onChange={e => setSection(e.target.value)}
//                       value={section}
//                     >
//                       <MenuItem value={"A"}>A</MenuItem>
//                       <MenuItem value={"B"}>B</MenuItem>
//                       <MenuItem value={"C"}>C</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         value="blocked"
//                         color="primary"
//                         onChange={e => setBlocked(e.target.checked)}
//                         checked={blocked}
//                       />
//                     }
//                     label="Blocked"
//                     value={blocked}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <div>
//                     {colorHashtags.map(hashtag => (
//                       <Chip
//                         label={`#${hashtag}`}
//                         style={{
//                           margin: "3px",
//                           color: hashtag === "yellow" ? "gold" : hashtag
//                         }}
//                         variant="outlined"
//                         onClick={() => {
//                           setHashtag(`#${hashtag}`)
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     id="Hashtag"
//                     label="Insert # Hashtag"
//                     fullWidth
//                     name="Hashtag"
//                     autoComplete="Hashtag"
//                     onChange={e => setHashtag(e.target.value)}
//                     value={hashtag}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     id="Created_at"
//                     label="Created_at"
//                     fullWidth
//                     name="Created_at"
//                     autoComplete="Created_at"
//                     disabled
//                     value={moment(datetime).format('llll')}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Button
//                     variant="contained"
//                     className={classes.submit}
//                     fullWidth
//                     onClick={handleReset}
//                   >
//                     Reset
//               </Button>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     className={classes.submit}
//                     fullWidth
//                   >
//                     Submit
//               </Button>
//                 </Grid>
//               </Grid>
//             </form>
//             <Snackbar
//               open={openSnackBar}
//               autoHideDuration={6000}
//               onClose={handleClose}
//             >
//               <Alert onClose={handleClose} severity="error">
//                 Please fill all the details!
//           </Alert>
//             </Snackbar>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
