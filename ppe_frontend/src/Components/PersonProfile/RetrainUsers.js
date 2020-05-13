import React from "react";
import AlertLogo from "../../Media/Images/warningIcon.png";
import Button from "@material-ui/core/Button";

export default function RetrainUsers() {
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
      <Button variant="contained" color="primary">
        Retrain
      </Button>
    </div>
  );
}
