import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
  width: 25%;
  margin: 10px;
`;
export const Title = styled.h2`
  color: #525252;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
`;
export const Content = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  height: 100%;
  width: 100%;
  padding: 10px;
  color: #3d3d3d;
`;
export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  border-radius: 4px;
  height: 15%;
  margin: 10px;
`;
