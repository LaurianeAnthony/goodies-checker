import React, { FC } from "react";
import styled from "styled-components";
import { THEME } from "../constants/theme";
import { MarginProps, margin } from "../utils/ui/margin";


type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & MarginProps

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  padding: ${THEME.spacing.m}px;
  
  ${margin}
`

export const TextField: FC<TextFieldProps> = (props) => {


  return ( 
    <StyledInput {...props}/>
  );
}

