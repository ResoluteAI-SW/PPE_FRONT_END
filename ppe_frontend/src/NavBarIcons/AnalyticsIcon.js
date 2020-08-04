import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function AnalyticsIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect
        x="0.5"
        y="11.5"
        width="4"
        height="11"
        rx="0.5"
        stroke={props.strokeColor}
        fill={props.strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="8.5"
        y="5.5"
        width="4"
        height="17"
        rx="0.5"
        stroke={props.strokeColor}
        fill={props.strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="16.5"
        y="0.5"
        width="4"
        height="22"
        rx="0.5"
        stroke={props.strokeColor}
        fill={props.strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
