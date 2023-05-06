import React, { FC } from "react";
import styled from "styled-components";
import { THEME } from "../constants/theme";


type Severity = "error" | "success"
type AlertProps = {
  severity: Severity
  text: string
}

const StyledAlert = styled.div<{severity: Severity}>`
  color: ${({severity}) => THEME.colors.content[severity]};
  background-color: ${({severity}) => THEME.colors.background[severity]};
  border: 1px solid ${({severity}) => THEME.colors.border[severity]};

  padding: 12px;
  margin: 12px;
  width: calc(100% - 24px);
  position: absolute;
  box-sizing: border-box;
  top: 0px;
`

export const Alert: FC<AlertProps> = ({severity, text}) => {
  return (
    <StyledAlert severity={severity}>
      {text}
    </StyledAlert>
  )
}