import React, { FC } from "react";
import { BiCheck, BiX } from "react-icons/bi"
import styled from "styled-components";
import { Box } from "./Box";
import { Typography } from "../components/Typography";
import { THEME } from "../constants/theme";

const StyledButton = styled.button`
  padding: 0;
  margin-bottom: 8px;
  width: 100%;
  min-height: 100px;
background: none;
border: none;
`
const StyledBox = styled(Box)`
  padding: 8px;
  width: 100%;

  display: flex;
  flex-direction: column;
`

const StyledActiveIcon = styled.div<{isActive?: boolean}>`
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  background: ${THEME.colors.interactive.contrast.default};

  ${({isActive}) => isActive && `
    background: ${THEME.colors.interactive.success.default};
  `}
`

type UserInfoBoxProps = {title: string, subtitle: string, isActive?: boolean, onClick: () => void}

export const UserInfoBox:FC<UserInfoBoxProps> = ({title, subtitle, isActive, onClick}) => {

  return (
    <StyledButton  onClick={() => onClick()}>
      <StyledBox withBorder colorSet={isActive ? "success" : "main"}  borderRadius={4}>
        <Typography textAlign="left" variant="body">{title}</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" width="100%" height="100px">
          <Typography variant="h3" textAlign="center">{subtitle}</Typography>
          <StyledActiveIcon isActive={isActive}>
            {isActive ?
              <BiCheck size="30" color={THEME.colors.content.above.contrast}/> :
              <BiX size="30" color={THEME.colors.content.above.main}/> }
          </StyledActiveIcon></Box>
      </StyledBox>
    </StyledButton>
       
  );
}

