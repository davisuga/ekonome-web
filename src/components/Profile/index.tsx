import React, { useState, useEffect, useCallback } from "react";
import { SimpleMenu, MenuItem } from "@rmwc/menu";
import {
  Container,
  ProfileContainer,
  EconomistName,
  ProfilePicture,
  CompanyName,
  CustomButton,
  StatusDot
} from "./styles";
import api from "../../services/firebase";

interface ProfileProps {
  picture_url: string;
  name: string;
  company: string;
  children: React.ReactElement;
}

const Profile: React.FC = props => {
  const [status, setStatus] = useState<"offline" | "online" | "busy">(
    "offline"
  );
  const statusList: ["online", "offline", "busy"] = [
    "online",
    "offline",
    "busy"
  ];
  const statusColors = {
    online: "green",
    offline: "red",
    busy: "yellow"
  };
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const setEconomistData = useCallback(async () => {
    const economistID = localStorage.getItem("economistID");
    if (economistID) {
      const economist = await api
        .firestore()
        .collection("economists")
        .doc(economistID)
        .get();
      setName(economist.data()?.name);
      setCompanyName(economist.data()?.company);
      const economistPictureRef = api
        .storage()
        .ref()
        .child(`economist/${economistID}.png`);
      const economistProfilePictureURL = await economistPictureRef.getDownloadURL();
      console.log(`got download link: ${economistProfilePictureURL}`);
      setProfilePictureUrl(economistProfilePictureURL);
      console.timeEnd("set economist data");
    }

    console.log("there's no economist ID on the local database :/");
  }, []);

  useEffect(() => {
    setEconomistData();
  }, []);

  const setEconomistStatus = async (
    economistID: string,
    status: "online" | "offline" | "busy"
  ) => {
    const newStatus = await api
      .database()
      .ref(`/economists/${economistID}`)
      .set({ status: status });
    console.log(`new status: ${status}`);
    return newStatus;
  };

  useEffect(() => {
    const economistID = localStorage.getItem("economistID");
    api
      .database()
      .ref(`/economists/${economistID}/call_status`)
      .on("value", () => {});
  }, []);

  useEffect(() => {
    const economistID = localStorage.getItem("economistID");
    console.log("economist id: ", localStorage.getItem("economistID"));

    console.log("trying to set new status on database..");
    economistID
      ? setEconomistStatus(economistID, status)
      : console.log("no economistID on the database");
  }, [status]);

  return (
    <Container>
      <ProfileContainer>
        <ProfilePicture>
          <img src={profilePictureUrl} />
        </ProfilePicture>
        <EconomistName>{name}</EconomistName>
        <CompanyName>{companyName}</CompanyName>
        <SimpleMenu
          onSelect={evt => setStatus(statusList[evt.detail.index])}
          handle={
            <CustomButton>
              <StatusDot color={statusColors[status]} />
              {status}
            </CustomButton>
          }
        >
          <MenuItem>online</MenuItem>
          <MenuItem>offline</MenuItem>
          <MenuItem>busy</MenuItem>
        </SimpleMenu>
      </ProfileContainer>

      {props.children}
    </Container>
  );
};

export default Profile;
