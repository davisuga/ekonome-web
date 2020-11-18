import React from "react";

import { ButtonsRowContainer } from "./styles";
import { Fab } from "@rmwc/fab";

import "@rmwc/fab/styles";

type ButtonsRowProps = {
  toggleAudio?: () => void;
  toggleVideo?: () => void;
  endCall?: () => void;
};

const ButtonsRow: React.FC<ButtonsRowProps> = ({
  toggleAudio,
  toggleVideo,
  endCall,
  ...props
}) => {
  return (
    <ButtonsRowContainer {...props}>
      <Fab
        icon="volume_off"
        id="volume_off"
        //onClick={toggleAudio}
        style={{
          bottom: "30px",
          zIndex: 999,
          backgroundColor: "white",
          color: "blue"
        }}
      ></Fab>
      <Fab
        icon="call_end"
        id="hangupBtn"
        //onClick={() => endCall()}
        style={{ bottom: "30px", zIndex: 999, backgroundColor: "red" }}
      ></Fab>
      <Fab
        icon="videocam_off"
        id="videocam_off"
        //onClick={toggleVideo}
        style={{
          bottom: "30px",
          zIndex: 999,
          backgroundColor: "white",
          color: "blue"
        }}
      ></Fab>
    </ButtonsRowContainer>
  );
};

export default ButtonsRow;
