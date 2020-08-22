import styled from "styled-components";
import { Button } from "@rmwc/button";
export const Container = styled.div`
  width: 20%;
  height: 100%;
  background-color: #d86765;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 7px;
`;
export const ProfilePicture = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-direction: column;
 & img{ max-height:100px;
  max-width:100px;
  object-fit:cover;
  border-radius:50px}
`;
export const ProfileContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px;
  flex-direction: column;
`;
export const CompanyName = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 35px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;

export const EconomistName = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 53px;
  /* identical to box height */
  color: white;
  display: flex;
  align-items: flex-end;
  text-align: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CustomButton = styled.button`
  background: white;
  color: #525252;
  box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  width: 120px;
  height: 25px;
  border: none;
  &:active {
    border: none;
    transform: scale(0.8, 0.8);
    -webkit-transition: 1s ease-in-out;
    -moz-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
  }
  &:hover {
    background: #f4f4f4;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StatusDot = styled.div`
  height: 10px;
  width: 10px;
  float: left;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 100%;
  ${(props) => {
    return `background:${props.color};`;
  }}
`;
