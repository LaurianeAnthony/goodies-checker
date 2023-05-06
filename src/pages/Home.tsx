import React from "react";
import { useAppContext } from "../AppProvider";
import { Box } from "../components/Box";
import { Button } from "../components/Button";

export const Home = () => {
  const { setStep } = useAppContext()
  return (
    <Box m="m">
      <Button variant="primary" onClick={() => setStep("SCANNING")}>Scanner un billet</Button>
    </Box>
  );
}

