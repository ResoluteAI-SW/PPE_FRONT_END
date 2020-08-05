import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressBar(props) {
  return (
    <div
      style={{
        width: 150,
        height: 150,
        marginRight: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={props.percentage}
        duration={1.4}
        easingFunction={easeQuadInOut}
      >
        {(value) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
              styles={buildStyles({
                pathTransition: "none",
                pathColor: "#F72A14",
                textColor: "#F72A14",
              })}
            />
          );
        }}
      </AnimatedProgressProvider>
      <b style={{ marginTop: 5 }}>{props.title}</b>
    </div>
  );
}
