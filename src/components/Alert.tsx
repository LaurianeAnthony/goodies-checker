import React, { FC } from "react";
import styled from "styled-components";


type Severity = "info" | "error" | "success"
type AlertProps = {
  severity: Severity
  text: string
}

const StyledAlert = styled.div<{severity: Severity}>`
  color: ${({severity}) => severity === "error" ? "red" : "black"}
`

export const Alert: FC<AlertProps> = ({severity, text}) => {


  return (
    <StyledAlert severity={severity}>
      {text}
    </StyledAlert>
  )
}