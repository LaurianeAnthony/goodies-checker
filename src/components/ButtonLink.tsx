import React, {  FC, PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import styled from "styled-components";
import { VariantButton } from "./Button";
import { Typography } from "./Typography";
import { THEME } from "../constants/theme";
import { MarginProps, margin } from "../utils/ui/margin";

type ButtonProps = {
  variant: VariantButton
  to: To
} & MarginProps

const StyledButton = styled(Link)<ButtonProps>`

  background: ${({variant}) => THEME.colors.interactive[variant].default};
  border: 1px solid ${({variant}) => THEME.colors.border[variant]};
  height: 40px;

  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({variant}) => THEME.colors.interactive[variant].hover};
    cursor: pointer;
  }

  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;

  ${margin}
`

export const ButtonLink: FC<PropsWithChildren<ButtonProps>> = ({ children, variant, ...props}) => {

  return (
    <StyledButton variant={variant} {...props}><Typography variant="h3" color={THEME.colors.content.above[variant]}>{children}</Typography></StyledButton>
  )
}