import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "./Box";
import { VariantButton } from "./Button";
import { IconButton } from "./IconButton";


export const BackButton: FC<{variant?: VariantButton, onClick?: () => void}> = ({variant = "primary", onClick}) => {
  const navigate = useNavigate()  


  return (
    <Box mb="m">
      <IconButton onClick={() => onClick ? onClick() : navigate(-1)} variant={variant} iconName="arrow-left"/>
    </Box>
  );
}

