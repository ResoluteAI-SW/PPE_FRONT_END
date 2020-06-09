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
import TrackChangesTwoToneIcon from "@material-ui/icons/TrackChangesTwoTone";
import { UserContext } from "../AdminDashboard";

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

var ipCamerasTemp = [];

export default function PlaceDashboard() {
  const userDoc = useContext(UserContext);
  const [ipCameras, setIPCameras] = useState([]);

  useEffect(() => {
    userDoc.ref.collection("ipCameras").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ipCamerasTemp.push(doc.data());
        console.log(ipCamerasTemp);
      });
      setIPCameras(ipCamerasTemp);
      ipCamerasTemp = [];
    });
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <TrackChangesTwoToneIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            PPE Tracking
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxwidth="md">
          <Grid container spacing={4}>
            {ipCameras.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.Place}
                    </Typography>
                    <Typography>On Duty: {card.OnDuty}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
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
