import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M23.7019 12.8726L13.3531 1.36424C12.9172 0.878587 12.0801 0.878587 11.6443 1.36424L1.2955 12.8726C1.14654 13.0378 1.04876 13.2428 1.01406 13.4627C0.979357 13.6825 1.00922 13.9077 1.10002 14.1109C1.284 14.5263 1.69565 14.7933 2.14985 14.7933H4.4496V22.8492C4.4496 23.1544 4.57074 23.4471 4.78639 23.6629C5.00203 23.8788 5.2945 24 5.59947 24H9.04908C9.35405 24 9.64652 23.8788 9.86216 23.6629C10.0778 23.4471 10.199 23.1544 10.199 22.8492V18.2458H14.7984V22.8492C14.7984 23.1544 14.9196 23.4471 15.1352 23.6629C15.3509 23.8788 15.6433 24 15.9483 24H19.3979C19.7029 24 19.9954 23.8788 20.211 23.6629C20.4267 23.4471 20.5478 23.1544 20.5478 22.8492V14.7933H22.8475C23.0702 14.7943 23.2884 14.7304 23.4754 14.6094C23.6624 14.4884 23.8102 14.3155 23.9008 14.1119C23.9914 13.9083 24.0208 13.6827 23.9855 13.4626C23.9502 13.2426 23.8516 13.0376 23.7019 12.8726V12.8726Z"
        stroke={props.strokeColor}
        strokeWidth={props.strokeWidth}
      />
    </SvgIcon>
  );
}
