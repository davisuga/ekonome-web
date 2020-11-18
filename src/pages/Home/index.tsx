import React, { useEffect, useState } from "react";

//UI imports
import { ToastContainer, toast } from "react-toastify";
import { Container } from "./styles";
import Profile from "../../components/Profile";
import ScheduleOverview from "../../components/ScheduleOverview";
import RecentActivity from "../../components/RecentActivity";
import { Button } from "@rmwc/button";

// CSS imports
import "react-toastify/dist/ReactToastify.css";
import "@rmwc/menu/styles";

// API-related imports
import api from "../../services/firebase";
import { useTranslation } from "react-i18next";
import { ToastProps } from "../../types";
import RawVideoCall from "../../components/RawVideoCall";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [clientName, setClientName] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [ifTheresNewCallRequest, setIfTheresNewCallRequest] = useState(false);
  const [callState, setCallState] = useState<
    "available" | "denied" | "stopped" | "busy" | "calling" | null
  >("available");
  const [clientUID, setClientUID] = useState("");

  const acceptCall = async (roomID: string) => {
    api.setCallStatus("busy");
    api.acceptCallRequest(roomID);
  };

  const quit = async () => {
    await api
      .auth()
      .signOut()
      .catch(error => console.log("error", error));
    console.log("quitting...");
  };

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
      console.log("====================================");
      console.log("got new call! getting name by uid...");
      console.log("====================================");
      api.getUserNameByUid(clientUID).then(name => {
        setClientName(name);
        //This state changes triggers the toast
        setIfTheresNewCallRequest(true);
      });
    } else if (callState === "available") {
      setCallAccepted(false);
    }
    return () => {
      console.log();
    };
  }, [callState]);

  // Setup firebase listeners and reset
  useEffect(() => {
    const economistId = api.getEconomistId();

    const economistReference = api.database().ref(`/economists/${economistId}`);

    const clienUIDReference = api
      .database()
      .ref(`/economists/${economistId}/client_uid`);
    const callStatus = api
      .database()
      .ref(`/economists/${economistId}/call_status`);

    clienUIDReference.on("value", data => {
      setClientUID(data.val());
      console.log(`client UID: ${data.val()}`);
    });

    callStatus.on("value", data => {
      setCallState(data.val());
      console.log(`call state: ${data.val()}`);
    });

    console.log("api.economistId", api.getEconomistId());

    economistReference
      .onDisconnect()
      .remove()
      .then(() => {
        economistReference.set(null);
      });

    window.addEventListener("beforeunload", () => {
      callStatus.off();
      clienUIDReference.off();
    });

    return () => {
      callStatus.off();
      clienUIDReference.off();
    };
  }, []);

  const handleAcceptCall = () => {
    setIfTheresNewCallRequest(false);
    setCallAccepted(true);
  };

  const handleDenyCall = (closeToast: () => void) => {
    closeToast();
    setIfTheresNewCallRequest(false);
    console.log(`economist id: ${api.getEconomistId()}`);
    api.setCallStatus("denied");
  };

  const Msg = ({ closeToast }: ToastProps) => (
    <div>
      Accept call from {clientName}?
      <br />
      <Button onClick={() => handleAcceptCall()}>yes</Button>
      <Button onClick={() => handleDenyCall(closeToast)}>No</Button>
    </div>
  );

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

      {callAccepted && <RawVideoCall notifyClient={acceptCall} />}

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
