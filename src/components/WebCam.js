import React from "react";
import Webcam from "react-webcam";

import { IconButton, Grid, Box } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";


const WebcamCapture = (props) => {
    const webcamRef = React.useRef(null);

    return (
        <Grid>
            <Box >
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                />
            </Box>
            <Box align="center">
                <IconButton
                    color="primary"
                    onClick={(e) => {
                        const imageSrc = webcamRef.current.getScreenshot();
                        props.getImageSrc(imageSrc);
                    }}
                >
                    <PhotoCamera style={{ fontSize: "50px" }} />
                </IconButton>
            </Box>
        </Grid >
    );
};

export default WebcamCapture