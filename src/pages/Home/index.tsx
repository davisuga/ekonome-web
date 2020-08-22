import React, { useEffect, useState, useCallback } from "react";

//UI imports
import { ToastContainer, toast } from "react-toastify";
import { VideoCallPopup, Container, RemoteStream, ButtonsRow } from "./styles";
import Profile from "../../components/Profile";
import ScheduleOverview from "../../components/ScheduleOverview";
import RecentActivity from "../../components/RecentActivity";
import { Button } from "@rmwc/button";
import { Fab } from "@rmwc/fab";

// CSS imports
import "react-toastify/dist/ReactToastify.css";
import "@rmwc/menu/styles";
import "@rmwc/fab/styles";

// API-related imports
import api from "../../services/firebase";
import { useTranslation } from "react-i18next";
import { startCall, rtc } from "../../services/agora";
import { ToastProps } from "../../types";
import { makeID } from "../../utils";

console.time("set economist data");

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [clientName, setClientName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [callAccepted, setCallAccepted] = useState(true);
  const [ifTheresNewCallRequest, setIfTheresNewCallRequest] = useState(false);
  const [callState, setCallState] = useState<
    "available" | "denied" | "stopped" | "busy" | "calling" | null
  >("available");
  const [clientUID, setClientUID] = useState("");

  const acceptCall = () => {
    const randomChannelName = makeID(12);

    api.setCallStatus("busy");
    api.acceptCallRequest(randomChannelName);

    setCallAccepted(true);
    setIfTheresNewCallRequest(false);
    setChannelName(randomChannelName);
    startCall(randomChannelName);
  };

  const quit = async () => {
    await api
      .auth()
      .signOut()
      .catch(error => console.log("error", error));
    console.log("quitting...");
  };

  const setupFirebaseListeners = () => {
    console.log("api on setup firebase", api);

    const economistId = api.getEconomistId();

    api
      .database()
      .ref(`/economists/${economistId}/client_uid`)
      .on("value", data => {
        setClientUID(data.val());
        console.log(`client UID: ${data.val()}`);
      });

    api
      .database()
      .ref(`/economists/${economistId}/call_status`)
      .on("value", data => {
        setCallState(data.val());
        console.log(`call state: ${data.val()}`);
      });

    return api;
  };

  //Initial effect to set economist data and setup listeners
  useEffect(() => {
    setupFirebaseListeners();
    console.log("api.economistId", api.getEconomistId());

    return () => {
      console.log();
    };
  }, []);

  //Effect to display toast
  useEffect(() => {
    ifTheresNewCallRequest && toast(<Msg />);
    ifTheresNewCallRequest && console.log("theres a new request!");
  }, [ifTheresNewCallRequest]);

  // Effect to handle call state changes
  useEffect(() => {
    console.log("changed call state to: ", callState);
    console.log("client uid before if: ", clientUID);

    if (callState === "stopped" || callState === "denied") {
      setCallAccepted(false);
      setIfTheresNewCallRequest(false);
      api.resetChannelNameAndCallStatus();
    } else if (clientUID?.length == 28 && callState == "calling") {
      api.getUserNameByUid(clientUID).then(name => {
        setClientName(name);
        setIfTheresNewCallRequest(true);
      });
    }
    return () => {
      console.log();
    };
  }, [callState]);

  const Msg = ({ closeToast }: ToastProps) => (
    <div>
      Accept call from {clientName}?
      <br />
      <Button onClick={() => acceptCall()}>yes</Button>
      <Button
        onClick={() => {
          closeToast();
          setIfTheresNewCallRequest(false);
          console.log(`economist id: ${api.getEconomistId()}`);
          api.setCallStatus("denied");
        }}
      >
        No
      </Button>
    </div>
  );
  // @ts-ignore

  return (
    <Container>
      <svg
        width="396"
        height="346"
        viewBox="0 0 396 346"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        <path d="M396 345.699V-2H0L396 345.699Z" fill="#164F85" />
      </svg>
      <ToastContainer
        position="top-center"
        autoClose={50000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {callAccepted && (
        <VideoCallPopup id="local-stream" className="local-stream">
          <RemoteStream id="remote-stream"></RemoteStream>
          <ButtonsRow id="buttons-row">
            <Fab
              icon="volume_off"
              id="stop-call"
              onClick={() => api.setCallStatus("stopped")}
              style={{
                bottom: "30px",
                zIndex: 999,
                backgroundColor: "white",
                color: "blue"
              }}
            ></Fab>
            <Fab
              icon="call_end"
              id="stop-call"
              onClick={() => api.setCallStatus("stopped")}
              style={{ bottom: "30px", zIndex: 999, backgroundColor: "red" }}
            ></Fab>
            <Fab
              icon="videocam_off"
              id="stop-call"
              onClick={() => api.setCallStatus("stopped")}
              style={{
                bottom: "30px",
                zIndex: 999,
                backgroundColor: "white",
                color: "blue"
              }}
            ></Fab>
          </ButtonsRow>
        </VideoCallPopup>
      )}

      <Profile>
        <Button raised onClick={() => quit()}>
          LOGOUT
        </Button>
      </Profile>

      <ScheduleOverview></ScheduleOverview>
      <RecentActivity></RecentActivity>
    </Container>
  );
};

export default Home;
