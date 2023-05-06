import React, { FC } from "react";
import { BiCheck, BiX } from "react-icons/bi"
import styled from "styled-components";
import { Box } from "./Box";
import { Typography } from "../components/Typography";
import { THEME } from "../constants/theme";

const StyledBox = styled(Box)`
  padding: 8px;
  margin-bottom: 8px;
  width: 100%;
  min-height: 100px;

  display: flex;
  flex-direction: column;
`

const StyledToggleButton = styled.button<{isToggle?: boolean}>`
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  background: ${THEME.colors.interactive.contrast.default};
  &:hover {
    background: ${THEME.colors.interactive.contrast.hover};
    cursor: pointer;
  }

  ${({isToggle}) => isToggle && `
    background: ${THEME.colors.interactive.success.default};
    &:hover {
      background: ${THEME.colors.interactive.success.hover};
    }
    `}
`

type UserInfoBoxProps = {title: string, subtitle: string, isActive?: boolean}

export const UserInfoBox:FC<UserInfoBoxProps> = ({title, subtitle, isActive}) => {

  return (

    <StyledBox component="button" withBorder colorSet={isActive ? "success" : "main"}  borderRadius={4}>
      <Typography variant="body">{title}</Typography>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" width="100%" height="100px">
        <Typography variant="h3" textAlign="center">{subtitle}</Typography>
        <StyledToggleButton isToggle={isActive}>
          {isActive ?
            <BiCheck size="30" color={THEME.colors.content.above.primary}/> :
            <BiX size="30" color={THEME.colors.content.above.main}/> }
        </StyledToggleButton></Box>
    </StyledBox>
       
  );
}

