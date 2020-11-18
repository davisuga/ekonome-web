import React, { useEffect } from "react";
import ButtonsRow from "../ButtonsRow";
import init from "./outdated";
import { VideoCallPopup, LocalStream, RemoteStream } from "./styles";

type RawVideoCallProps = { notifyClient: (roomID: string) => void };

const RawVideoCall: React.FC<RawVideoCallProps> = ({ notifyClient }) => {
  useEffect(() => {
    init().then(roomID => {
      notifyClient(roomID);
    });
  }, []);

  return (
    <VideoCallPopup>
      <LocalStream id="localVideo" muted autoPlay />
      <RemoteStream autoPlay id="remoteVideo" />
      <ButtonsRow />
    </VideoCallPopup>
  );
};
export default RawVideoCall;
