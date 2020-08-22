import styled from "styled-components";

export const VideoCallPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 600px;
  width: 1000px;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  backdrop-filter: saturate(180%) blur(20px);
  z-index: 4;
  box-shadow: 0px 0px 120px 0px #00000022;
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const RemoteStream = styled.div`
  position: absolute;
  background: transparent;
  z-index: 1;
  height: 300px;
  width: 190px;
  align-self: flex-start;
`;

export const Profile = styled.div`
  width: 20%;
  height: 100%;
  background-color: #d86765;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
`;

export const ProfilePicture = styled.div`
  width: 80%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ButtonsRow = styled.div`
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
