import React from "react";
import styled from "styled-components";
import { useAppContext } from "../AppProvider";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { COLORS, MARGIN_DEFAULT } from "../constants";
import { useBilletwebUser } from "../hooks/useBilletwebUser";

const StyledResult = styled.div`
  color: ${COLORS.content.default};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  
`
const StyledHeader = styled.header`
  background: ${COLORS.content.primary};
  padding: ${MARGIN_DEFAULT}px;

  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 150px;
`

const StyledContent = styled.div`
  margin: ${MARGIN_DEFAULT}px;
  flex-grow: 1;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`

const StyledBoxes = styled.div`
  display: flex;
  justify-content: space-between;
`


const StyledBox = styled.div`
  background-color: ${COLORS.background.contrast};
  border: 1px solid ${COLORS.border.default};
  border-radius: 4px;

  padding: 8px;
  width: 43%;

  display: flex;
  flex-direction: column;
`


export const Result = () => {
  const {barcode, setStep} = useAppContext()
  const {user} = useBilletwebUser(barcode)
  if(!user){
    return <Alert text="Error" severity="error" />
  }
  return (
    <StyledResult>
      <StyledHeader>
        <Typography variant="h2">{user.firstname} {user.name}</Typography>
        <Typography variant="body">{user.barcode}</Typography>
      </StyledHeader>

      <StyledContent>
        <StyledBoxes>
          <StyledBox>
            <Typography variant="footnote">Goodies</Typography>
            <Typography variant="body" textAlign="center">{user.goodies === "1" ? "Oui" : "Non"}</Typography>
          </StyledBox>
          <StyledBox>
            <Typography variant="footnote">T-shirt</Typography>
            <Typography variant="body"textAlign="center">{user.tshirtSize}</Typography></StyledBox>
        </StyledBoxes>

        <Button onClick={() => setStep("SCANNING")}>Scanner un billet</Button>
      </StyledContent>

    </StyledResult>
    
  );
}

