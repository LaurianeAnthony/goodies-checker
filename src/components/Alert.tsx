import React, { FC } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";


type Severity = "error" | "success"
type AlertProps = {
  severity: Severity
  text: string
}

const StyledAlert = styled.div<{severity: Severity}>`
  color: ${({severity}) => COLORS.content[severity]};
  background-color: ${({severity}) => COLORS.background[severity]};
  border: 1px solid ${({severity}) => COLORS.border[severity]};

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