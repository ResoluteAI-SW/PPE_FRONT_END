import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function LogsIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect
        x="1"
        y="1"
        width="25"
        height="19"
        rx="2"
        stroke={props.strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="6.75"
        y1="5.25"
        x2="16.25"
        y2="5.25"
        stroke={props.strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="6.75"
        y1="10.25"
        x2="12.25"
        y2="10.25"
        stroke={props.strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="6.75"
        y1="15.25"
        x2="20.25"
        y2="15.25"
        stroke={props.strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
