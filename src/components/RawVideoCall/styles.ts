import styled from 'styled-components'
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
export const LocalStream = styled.video`
  height: 100%;
`;
export const RemoteStream = styled.video`
  position: absolute;
  background: transparent;
  z-index: 1;
  height: 300px;
  width: 190px;
  align-self: flex-start;
  border: 1px solid black;
`;
