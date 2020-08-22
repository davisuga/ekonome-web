import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack
} from "agora-rtc-sdk-ng";
import React from "react";
import ReactDOM from "react-dom";
const appId = "a0ebf066528c4d37816579ba101e8fda";
interface IRtc {
  client?: IAgoraRTCClient;
  localVideoTrack?: ICameraVideoTrack;
  localAudioTrack?: IMicrophoneAudioTrack;
}
const rtc: IRtc = {};
const options = { appId, token: null };

const startCall = async (channel: string) => {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
  const uid = await rtc.client.join(
    options.appId,
    channel,
    options.token,
    null
  );
  // Create a video track from the video captured by a camera.
  // Publish the local audio and video tracks to the channel.
  [rtc.localAudioTrack, rtc.localVideoTrack] = await Promise.all([
    AgoraRTC.createMicrophoneAudioTrack(),
    AgoraRTC.createCameraVideoTrack()
  ]);
  rtc.localVideoTrack.play("local-stream");

  rtc.client.on("user-published", async (user, mediaType) => {
    if (
      user != undefined &&
      mediaType &&
      rtc &&
      rtc.client &&
      rtc.client.subscribe
    ) {
      // Subscribe to a remote user
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");
      // console.log(user);
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        console.log(remoteVideoTrack);

        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const PlayerContainer = React.createElement("div", {
          id: user.uid,
          className: "stream"
        });

        ReactDOM.render(
          PlayerContainer,
          document.getElementById("remote-stream")
        );

        user.videoTrack && user.videoTrack.play(`${user.uid}`);
      }

      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. Do not need to pass any DOM element
        remoteAudioTrack && remoteAudioTrack.play();
      }
    }
  });

  rtc.client.on("user-unpublished", user => {
    // Get the dynamically created DIV container
    const playerContainer = document.getElementById(user.uid.toString());
    console.log(playerContainer);
    // Destroy the container
    playerContainer && playerContainer.remove();
  });

  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  console.log("publish success!");
};
export { startCall, rtc };
