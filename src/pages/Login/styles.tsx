import styled from "styled-components";
import React from "react";
import "./styles.css";

const blue = "#164f85";
const red = "#d86765";

const BaseRedTriangleSvg = () => {
  return (
    <svg
      className="RedTriangleSvg"
      viewBox="0 0 558 490"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 489.5V0H557.5L0 489.5Z" fill="#D86765" />
    </svg>
  );
};

const BaseBlueTriangleSvg = () => {
  return (
    <svg
      className="BlueTriangleSvg"
      viewBox="0 0 558 490"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M557.5 0V489.5H0L557.5 0Z" fill="#164F85" />
    </svg>
  );
};

export const RedTriangleSvg = styled(BaseRedTriangleSvg)``;
export const BlueTriangleSvg = styled(BaseBlueTriangleSvg)``;

const LogoA = () => <h1 style={{ color: red }}>Ekono</h1>;
const LogoB = () => <h1 style={{ color: blue }}>Me</h1>;
const LogoC = () => <h1 style={{ color: red }}>.</h1>;

export const UnstyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2pc;
`;

export const Logo = () => {
  return (
    <UnstyledLogo>
      <LogoA /> <LogoB /> <LogoC />
    </UnstyledLogo>
  );
};

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.7fr 0.7fr;
  grid-template-rows: 0.5fr 2fr 0.5fr;
  gap: 1px 1px;
  grid-template-areas: ". . ." ". content ." ". . .";
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  grid-area: content;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;

  flex-direction: column;
`;
