import React from "react";
import styled from "styled-components";
import { useAppContext } from "../AppProvider";
import { Button } from "../components/Button";


const StyledContent = styled.div`
  margin: 12px;
`
export const Home = () => {
  const { setStep } = useAppContext()
  return (
    <StyledContent>
      <Button onClick={() => setStep("SCANNING")}>Scanner un billet</Button>
    </StyledContent>
  );
}

