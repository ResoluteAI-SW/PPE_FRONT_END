import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function VisitorTrackingIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M18.7783 3.22185C16.9117 1.34468 14.4268 0.209603 11.7858 0.0278441V0H10.2144V4.71433H11.7858V1.60444C16.6185 2.00506 20.4287 6.06572 20.4287 11.0001C20.4287 16.1991 16.199 20.4288 11.0001 20.4288C5.80118 20.4288 1.57153 16.1991 1.57153 11.0001C1.57045 9.7597 1.81463 8.53133 2.29002 7.38564C2.76541 6.23995 3.46263 5.19956 4.34157 4.32432L10.0195 11.4881L11.251 10.5121L4.54743 2.05407L3.92838 2.57412C2.23067 3.99902 1.00299 5.90354 0.406221 8.03814C-0.190546 10.1727 -0.128564 12.4378 0.584045 14.5366C1.29665 16.6353 2.62665 18.4699 4.39975 19.7998C6.17285 21.1297 8.30634 21.893 10.5207 21.9895C12.735 22.0861 14.9268 21.5115 16.809 20.3411C18.6911 19.1706 20.1758 17.4588 21.0685 15.4301C21.9611 13.4013 22.2201 11.1502 21.8114 8.97179C21.4028 6.79334 20.3456 4.78916 18.7784 3.22185H18.7783Z"
        fill={props.strokecolor}
      />
    </SvgIcon>
  );
}
