import React from "react";
import styled from "styled-components";
import { useAppContext } from "../AppProvider";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { COLORS, MARGIN_DEFAULT } from "../constants";
import { useBilletwebUser } from "../hooks/useBilletwebUser";


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
  
`


const StyledBox = styled.div`
  background-color: ${COLORS.background.contrast};
  border: 1px solid ${COLORS.border.default};
  border-radius: 4px;

  padding: 8px;
  margin-bottom: 8px;
  width: 100%;
  min-height: 100px;

  display: flex;
  flex-direction: column;
`

const StyledButtonWrapper = styled.div`
  margin: 12px;
  width: calc(100% - 24px);
  position: absolute;
  bottom: 0px;
`


export const Result = () => {
  const {barcode, setStep} = useAppContext()
  const {user} = useBilletwebUser(barcode)
  if(!user){
    return <Alert text="Error" severity="error" />
  }
  return (
    <div>
      <StyledHeader>
        <Typography variant="h2">{user.firstname} {user.name}</Typography>
        <Typography variant="body">{user.barcode}</Typography>
      </StyledHeader>

      <StyledContent>
        {/* <StyledBoxes> */}
        <StyledBox>
          <Typography variant="footnote">Goodies</Typography>
          <Typography variant="body" textAlign="center">{user.goodies === "1" ? "Oui" : "Non"}</Typography>
        </StyledBox>
        <StyledBox>
          <Typography variant="footnote">T-shirt</Typography>
          <Typography variant="body"textAlign="center">{user.tshirtSize}</Typography></StyledBox>
        {/* </StyledBoxes> */}

      </StyledContent>
      
      <StyledButtonWrapper><Button onClick={() => setStep("SCANNING")}>Scanner un billet</Button></StyledButtonWrapper>

    </div>
    
  );
}

