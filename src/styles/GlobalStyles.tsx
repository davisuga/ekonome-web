import styled, { createGlobalStyle } from "styled-components";
import { Button } from "@rmwc/button";

export default createGlobalStyle`

.stream {
  height: 240px;
  width: 160px;
  align-self:flex-start;
}

#largeVideoContainer > div:nth-child(3) > a > div {
  display:none;
  
}
:root {
  --mdc-theme-primary: #164f85;
  --mdc-theme-secondary: #d86765

}
@font-face {
  font-family: Proxima Nova;
  src: url('./proxima-nova.otf');
  
}
#root, body, html {
    height:100%;
    width:100%;
}
*{
font-family: 'Roboto', 'Helvetica';    
    margin:0;
    padding:0;  
    box-sizing:border-box;
}
`;
const blue: string = "#164f85";
const red: string = "#d86765";

const LeftText = styled.p`
  align-self: left;
`;
export const H2 = styled.h2`
  color: #595959;
`;

export const BlueButton = styled(Button)``;
export const RedButton = styled(Button)``;
