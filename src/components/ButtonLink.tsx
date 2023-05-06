import React, {  FC, PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import styled from "styled-components";
import { ButtonCssProps, buttonCss } from "./Button";
import { Typography } from "./Typography";
import { THEME } from "../constants/theme";
import { margin } from "../utils/ui/margin";

type ButtonProps = {
  to: To
} & ButtonCssProps

const StyledButton = styled(Link)<ButtonProps>`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  ${buttonCss};
  ${margin}
`

export const ButtonLink: FC<PropsWithChildren<ButtonProps>> = ({ children, size="m", variant, ...props}) => {
  return (
    <StyledButton variant={variant}  size={size} {...props}>
      <Typography variant="h3" color={THEME.colors.content.above[variant]}>
        {children}
      </Typography>
    </StyledButton>
  )
}