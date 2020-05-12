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
        }}
      >
        <div>
          <HashLoader size={50} color={"#123abc"} loading={true} />
        </div>
      </div>
    );
  }
}
