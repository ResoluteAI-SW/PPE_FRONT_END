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

  const handleRetrain = () => {
    axios.get("https://facegenie.co/recog/retrain").then((res) => {
      if (res.status === 200) {
        userDoc.ref.set(
          {
            persons_not_retrained: 0,
          },
          { merge: true }
        );
      }
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
