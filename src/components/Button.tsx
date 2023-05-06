import React, {  FC } from "react";
import styled, { css } from "styled-components";
import { Typography } from "./Typography";
import { THEME } from "../constants/theme";
import { MarginProps, margin } from "../utils/ui/margin";

export type VariantButton = "primary" | "main" | "contrast" | "error" | "success"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonCssProps

export type ButtonCssProps = {
  variant: VariantButton
  size?: "s" | "m"
  fullWidth?: boolean
} & MarginProps

export const buttonCss = css`
  ${({variant, fullWidth, size}: ButtonCssProps) => `
    background: ${THEME.colors.interactive[variant].default};
    border: 1px solid ${THEME.colors.border[variant]};
    height: ${size === "m" ? "40px" : "25px"};

    &:hover {
      background: ${THEME.colors.interactive[variant].hover};
      cursor: pointer;
    }

    border-radius: 4px;
    ${fullWidth && "width: 100%;"}
  `}
`

const StyledButton = styled.button<ButtonProps>`

  ${buttonCss};


  ${margin}
`

export const Button: FC<ButtonProps> = ({ children, variant, size="m" ,...props}) => {

  return (
    <StyledButton variant={variant} size={size} {...props}><Typography variant={size === "m" ? "h3": "footnote"} color={THEME.colors.content.above[variant]}>{children}</Typography></StyledButton>
  )
}