import React, {  FC } from "react";
import styled from "styled-components";
import { Typography } from "./Typography";
import { THEME } from "../constants/theme";
import { MarginProps, margin } from "../utils/ui/margin";

export type VariantButton = "primary" | "main" | "contrast"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: VariantButton
} & MarginProps

const StyledButton = styled.button<ButtonProps>`

  background: ${({variant}) => THEME.colors.interactive[variant].default};
  color: ${({variant}) => THEME.colors.content.above[variant]};
  border: 1px solid ${({variant}) => THEME.colors.border[variant]};
  height: 40px;

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

export const Button: FC<ButtonProps> = ({ children, variant, ...props}) => {

  return (
    <StyledButton variant={variant} {...props}><Typography variant="h3">{children}</Typography></StyledButton>
  )
}