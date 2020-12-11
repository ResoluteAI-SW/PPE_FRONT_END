import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function SettingsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M21.9453 13.1387V12.4604V11.7731L23.659 10.2736C23.9749 9.99518 24.1822 9.61404 24.2443 9.19755C24.3064 8.78106 24.2192 8.35604 23.9982 7.9976L21.8918 4.42739C21.7353 4.15629 21.5102 3.93111 21.2392 3.77445C20.9682 3.61779 20.6607 3.53516 20.3477 3.53484C20.1537 3.53335 19.9607 3.5635 19.7764 3.62409L17.6075 4.35599C17.2331 4.10715 16.8425 3.88352 16.4383 3.68657L15.9831 1.43734C15.9015 1.02641 15.6779 0.657283 15.3516 0.394571C15.0252 0.131858 14.6169 -0.00769933 14.198 0.000327952H10.0208C9.60196 -0.00769933 9.19361 0.131858 8.86726 0.394571C8.54091 0.657283 8.31735 1.02641 8.23573 1.43734L7.78053 3.68657C7.37347 3.88347 6.97989 4.1071 6.60236 4.35599L4.47809 3.58839C4.29181 3.53986 4.09891 3.52177 3.90685 3.53484C3.59381 3.53516 3.28636 3.61779 3.01534 3.77445C2.74432 3.93111 2.51926 4.15629 2.36274 4.42739L0.256311 7.9976C0.0479779 8.35551 -0.0294379 8.77471 0.0373229 9.18342C0.104084 9.59212 0.310867 9.9649 0.622258 10.2379L2.30918 11.782V13.1476L0.622258 14.6471C0.302071 14.922 0.089632 15.3015 0.0226398 15.7181C-0.0443524 16.1348 0.0384355 16.5617 0.256311 16.9231L2.36274 20.4933C2.51926 20.7644 2.74432 20.9896 3.01534 21.1463C3.28636 21.3029 3.59381 21.3856 3.90685 21.3859C4.10085 21.3874 4.29379 21.3572 4.47809 21.2966L6.64699 20.5647C7.02145 20.8136 7.41206 21.0372 7.81623 21.2342L8.27144 23.4834C8.35306 23.8943 8.57661 24.2635 8.90296 24.5262C9.22931 24.7889 9.63767 24.9284 10.0565 24.9204H14.2694C14.6883 24.9284 15.0966 24.7889 15.423 24.5262C15.7493 24.2635 15.9729 23.8943 16.0545 23.4834L16.5097 21.2342C16.9168 21.0373 17.3103 20.8136 17.6879 20.5647L19.8478 21.2966C20.0321 21.3572 20.2251 21.3874 20.4191 21.3859C20.7321 21.3856 21.0396 21.3029 21.3106 21.1463C21.5816 20.9896 21.8067 20.7644 21.9632 20.4933L23.9982 16.9231C24.2066 16.5652 24.284 16.146 24.2172 15.7373C24.1504 15.3286 23.9437 14.9558 23.6323 14.6828L21.9453 13.1387ZM20.3477 19.6008L17.2862 18.5654C16.5696 19.1725 15.7505 19.647 14.8674 19.9667L14.2337 23.171H10.0208L9.38713 20.0024C8.51102 19.6736 7.69638 19.1999 6.97723 18.6011L3.90685 19.6008L1.80043 16.0306L4.22817 13.8885C4.06314 12.9645 4.06314 12.0187 4.22817 11.0948L1.80043 8.89016L3.90685 5.31994L6.96831 6.35531C7.68497 5.74827 8.50404 5.27376 9.38713 4.954L10.0208 1.74973H14.2337L14.8674 4.9183C15.7435 5.24713 16.5581 5.72083 17.2773 6.3196L20.3477 5.31994L22.4541 8.89016L20.0264 11.0323C20.1914 11.9562 20.1914 12.9021 20.0264 13.826L22.4541 16.0306L20.3477 19.6008Z"
        fill={props.strokecolor}
      />
      <path
        d="M12.1268 17.8159C11.0676 17.8159 10.0322 17.5018 9.15155 16.9133C8.27087 16.3249 7.58447 15.4885 7.17914 14.5099C6.7738 13.5314 6.66775 12.4546 6.87439 11.4158C7.08102 10.3769 7.59107 9.42272 8.34002 8.67376C9.08898 7.92481 10.0432 7.41476 11.082 7.20813C12.1209 7.00149 13.1976 7.10754 14.1762 7.51288C15.1548 7.91821 15.9911 8.60461 16.5796 9.48529C17.168 10.366 17.4821 11.4014 17.4821 12.4605C17.4893 13.1658 17.3557 13.8654 17.0891 14.5184C16.8225 15.1713 16.4283 15.7646 15.9295 16.2633C15.4308 16.762 14.8376 17.1562 14.1846 17.4228C13.5317 17.6894 12.8321 17.823 12.1268 17.8159ZM12.1268 8.89033C11.655 8.87934 11.1858 8.96417 10.7476 9.1397C10.3095 9.31523 9.91155 9.57781 9.57781 9.91155C9.24407 10.2453 8.98149 10.6433 8.80596 11.0814C8.63043 11.5195 8.5456 11.9887 8.55659 12.4605C8.5456 12.9324 8.63043 13.4016 8.80596 13.8397C8.98149 14.2778 9.24407 14.6758 9.57781 15.0095C9.91155 15.3433 10.3095 15.6059 10.7476 15.7814C11.1858 15.9569 11.655 16.0417 12.1268 16.0308C12.5987 16.0417 13.0678 15.9569 13.506 15.7814C13.9441 15.6059 14.3421 15.3433 14.6758 15.0095C15.0095 14.6758 15.2721 14.2778 15.4476 13.8397C15.6232 13.4016 15.708 12.9324 15.697 12.4605C15.708 11.9887 15.6232 11.5195 15.4476 11.0814C15.2721 10.6433 15.0095 10.2453 14.6758 9.91155C14.3421 9.57781 13.9441 9.31523 13.506 9.1397C13.0678 8.96417 12.5987 8.87934 12.1268 8.89033Z"
        fill={props.strokecolor}
      />
    </SvgIcon>
  );
}
