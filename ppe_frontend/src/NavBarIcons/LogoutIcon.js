import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function LogoutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M13.8462 10.0385V7.96158H4.94506V4.84619L0 9.00004L4.94506 13.1539V10.0385H13.8462Z"
        fill={props.strokeColor}
      />
      <path
        d="M18.6388 0H9.05303C7.87824 0 6.92285 0.897 6.92285 2V6H9.05303V2H18.6388V16H9.05303V12H6.92285V16C6.92285 17.103 7.87824 18 9.05303 18H18.6388C19.8136 18 20.769 17.103 20.769 16V2C20.769 0.897 19.8136 0 18.6388 0Z"
        fill={props.strokeColor}
      />
    </SvgIcon>
  );
}
