import React, {  FC } from "react";
import { Link, To } from "react-router-dom";
import styled from "styled-components";
import { VariantButton } from "./Button";
import { IconName, icons } from "./IconButton";
import { THEME } from "../constants/theme";


type IconButtonProps = {
  variant: VariantButton
  iconName: IconName
  to: To
}

const StyledButton = styled(Link)<Omit<IconButtonProps, "iconName">>`

  background: ${({variant}) => THEME.colors.interactive[variant].default};
  color: ${({variant}) => THEME.colors.content.above[variant]};
  border: 1px solid ${({variant}) => THEME.colors.border[variant]};
  height: 40px;
  width: 40px;

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

`

export const IconButtonLink: FC<IconButtonProps> = ({ iconName, variant, ...props}) => {

  return (
    <StyledButton variant={variant} {...props}>{React.cloneElement(icons[iconName], {color: THEME.colors.content.above[variant], size: 25})}</StyledButton>
  )
}