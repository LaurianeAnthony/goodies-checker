import React, {  FC, ReactElement } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "styled-components";
import { VariantButton } from "./Button";
import { THEME } from "../constants/theme";

type IconName = "search"

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: VariantButton
  iconName: IconName
}

const icons:Record<IconName, ReactElement> = {
  "search" : <BiSearchAlt2 />
}

const StyledButton = styled.button<Omit<IconButtonProps, "iconName">>`

  background: ${({variant}) => THEME.colors.interactive[variant].default};
  color: ${({variant}) => THEME.colors.content.above[variant]};
  border: 1px solid ${({variant}) => THEME.colors.border[variant]};
  height: 40px;
  width: 40px;

  &:hover {
    background: ${({variant}) => THEME.colors.interactive[variant].hover};
    cursor: pointer;
  }

  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;

`

export const IconButton: FC<IconButtonProps> = ({ iconName, variant, ...props}) => {

  return (
    <StyledButton variant={variant} {...props}>{React.cloneElement(icons[iconName], {color: THEME.colors.content.above[variant], size: 25})}</StyledButton>
  )
}