import React, { FC } from "react";
import styled from "styled-components";
import { IconButton } from "./IconButton";
import { THEME } from "../constants/theme";


export type Severity = "error" | "success"
type AlertProps = {
  severity: Severity
  text: string
  onClose?: () => void
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

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  z-index: 1000;
`

export const Alert: FC<AlertProps> = ({severity, text, onClose}) => {
  return (
    <StyledAlert severity={severity}>
      {text}
      <IconButton variant={severity} iconName="x" onClick={onClose} />  
    </StyledAlert>
  )
}