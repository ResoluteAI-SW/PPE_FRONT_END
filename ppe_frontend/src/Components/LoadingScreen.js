import React from "react";
import HashLoader from "react-spinners/HashLoader";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <HashLoader size={50} color={"#FFFFFF"} loading={true} />
        <h3 style={{ color: "white", marginLeft: "2%" }}>Loading</h3>
      </div>
    );
  }
}
