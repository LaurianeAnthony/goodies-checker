import React, {  ComponentProps, FC } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";



const StyledButton = styled(({ children, ...props }) => (
  <button {...props}>{children}</button>
))`

  background: ${COLORS.content.primary};
  color: ${COLORS.content.default};
  border: 1px solid ${COLORS.border.primary};

  border-radius: 4px;
  padding: 14px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;

`

export const Button: FC<ComponentProps<"button">> = props => {

  return (
    <StyledButton {...props}>{props.children}</StyledButton>
  )
}