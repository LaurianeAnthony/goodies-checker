import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { Box } from "./Box";
import { THEME } from "../constants/theme";
import { MarginProps, margin } from "../utils/ui/margin";


type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {endAction?: ReactNode} & MarginProps

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  padding: ${THEME.spacing.m}px;
  
  ${margin}
`

export const TextField: FC<TextFieldProps> = ({endAction, ...props}) => {


  return ( 
    <Box position="relative">
      <StyledInput {...props} />
      {endAction && 
      <Box 
        height="40px" 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        position="absolute" 
        top="0" 
        right={`${THEME.spacing.m}px`} 
      >
        {endAction}
      </ Box>
      }
      
    </Box>
  );
}

