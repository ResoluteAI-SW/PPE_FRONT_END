import React, { useEffect, useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DoneOutlineTwoToneIcon from "@material-ui/icons/DoneOutlineTwoTone";
import { rdb } from "../../FirebaseConfig";
import { UserContext } from "../AdminDashboard";
import { Divider } from "@material-ui/core";
import StreamUpdates from "./StreamUpdates";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  redDot: {
    height: 20,
    width: 20,
    backgroundColor: "red",
    borderRadius: "50%",
    display: "inline-block",
  },
  yellowDot: {
    height: 20,
    width: 20,
    backgroundColor: "yellow",
    borderRadius: "50%",
    display: "inline-block",
  },
  greenDot: {
    height: 20,
    width: 20,
    backgroundColor: "green",
    borderRadius: "50%",
    display: "inline-block",
  },
}));

/**
 * @Component responsible for Social distancing Cards for each place
 * @param {*} props
 */
export default function SocialDistancingDashboard(props) {
  const userDoc = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [placeLogs, setPlaceLogs] = useState(null);

  /**
   * @function responsible for loading the last updated status for each IP Camera from RDB
   */
  useEffect(() => {
    var ipCameras = [];
    userDoc.ref
      .collection("ipCameras")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ipCameras.push(doc.data());
        });
      })
      .then(() => {
        console.log("IP Camera: ", ipCameras[0]);
        rdb.ref(`SocialDistancing/${userDoc.id}`).on("value", (snapshot) => {
          setPlaces([]);
          const collection = snapshot.val();
          for (const ipCamera in collection) {
            for (let i = 0; i < ipCameras.length; i++) {
              console.log("for loop for matching IP Addresses starts:");
              const original_IPCameraAddress = ipCameras[i].IPAddress;
              const new_IPCameraAddress = original_IPCameraAddress
                .toString()
                .replace(/\./g, "_");
              if (new_IPCameraAddress === ipCamera) {
                console.log("Approached to the camera matching point");
                const obj = {};
                obj.IPAddress = original_IPCameraAddress;
                obj.Status = collection[ipCamera].status;
                obj.Hashtag = ipCameras[i].Hashtag;
                obj.Place = ipCameras[i].Place;
                setPlaces((places) => places.concat(obj));
              }
            }
          }
        });
      });
  }, []);

  /**
   * @function responsible for moving back to place dashboard
   */
  const setPlaceLogsToNull = () => {
    setPlaceLogs(null);
  };

  const classes = useStyles();

  /**
   * if user/admin has clicked on any of the places
   */
  if (placeLogs) {
    return (
      <StreamUpdates
        IPAddress={placeLogs}
        handleBack={setPlaceLogsToNull}
        socialDistancingFrame={props.socialDistancingFrame}
      />
    );
  }

  /**
   * else return place dashboard
   */
  return <PlaceDashboard />;

  function PlaceDashboard() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <DoneOutlineTwoToneIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Social Distancing
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Container className={classes.cardGrid} maxwidth="md">
            <Grid container spacing={4}>
              {places.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.Place}
                      </Typography>
                      <Divider />
                      <Typography variant="overline" style={{ color: "grey" }}>
                        {card.Hashtag}
                      </Typography>
                      <br />
                      <Typography variant="overline" style={{ color: "grey" }}>
                        {card.IPAddress}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setPlaceLogs(card.IPAddress);
                        }}
                      >
                        View
                      </Button>
                      <Typography>Status:</Typography>
                      <span
                        className={
                          card.Status === "Green"
                            ? classes.greenDot
                            : card.Status === "Red"
                            ? classes.redDot
                            : classes.yellowDot
                        }
                      ></span>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
