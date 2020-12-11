import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function MenuDropDown(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M1.5 1.5L7.5 7.5L13.5 1.5"
        stroke="#F72A1F"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
