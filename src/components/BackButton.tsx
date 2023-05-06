import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "./Box";
import { VariantButton } from "./Button";
import { IconButton } from "./IconButton";


export const BackButton: FC<{variant?: VariantButton}> = ({variant = "primary"}) => {
  const navigate = useNavigate()  


  return (
    <Box mb="m">
      <IconButton onClick={() => navigate(-1)} variant={variant} iconName="arrow-left"/>
    </Box>
  );
}

