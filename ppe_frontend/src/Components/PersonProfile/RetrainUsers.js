import React, { useContext } from "react";
import AlertLogo from "../../Media/Images/warningIcon.png";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { UserContext } from "../AdminDashboard";

/**
 * @Component responsible for displaying retrain users screen
 */
export default function RetrainUsers() {
  const userDoc = useContext(UserContext);
  let accessToken = null;
  userDoc.ref.onSnapshot((doc) => {
    accessToken = doc.data().accessToken;
  });
  const handleRetrain = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get("https://facegenie.co/recog/retrain", config)
      .then((res) => {
        if (res.status === 200) {
          userDoc.ref.set(
            {
              persons_not_retrained: 0,
            },
            { merge: true }
          );
        } else if (res.status === 401) {
          let obj = {
            email: userDoc.data().email,
            password: userDoc.data().password,
          };
          authenticationBackend(userDoc, obj);
        }
      })
      .catch((err) => {
        console.log("error while retraining:: ", err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={AlertLogo}
        alt="Alert"
        style={{ height: "30%", width: "30%" }}
      />
      <h3>Retrain the registered users' faces in order to add more profiles</h3>
      <Button variant="contained" color="primary" onClick={handleRetrain}>
        Retrain
      </Button>
    </div>
  );
}

function authenticationBackend(adminDoc, obj) {
  axios
    .post("https://facegenie.co/accounts/profile/token/", obj)
    .then((res) => {
      if (res.status === 200) {
        // console.log("access token: ", res.data.access);
        // console.log("refresh token: ", res.data.refresh);
        adminDoc.ref.set(
          {
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          },
          { merge: true }
        );
      }
    })
    .catch((err) => {
      console.log("error while fetching refresh token: ", err);
    });
}
