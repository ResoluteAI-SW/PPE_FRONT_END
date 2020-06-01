import React from "react";
import Button from "@material-ui/core/Button";

export default function Logs(props) {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.handleBack()}
      >
        Back to Dashboard
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Logs part for {props.IPAddress} yet to be developed
      </div>
    </div>
  );
}
