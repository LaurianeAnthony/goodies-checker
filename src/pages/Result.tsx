import React from "react";
import styled from "styled-components";
import { useAppContext } from "../AppProvider";
import { Alert } from "../components/Alert";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { Typography } from "../components/Typography";
import { UserInfoBox } from "../components/UserInfoBox";
import { THEME } from "../constants/theme";
import { useBilletwebUser } from "../hooks/useBilletwebUser";

const StyledHeader = styled.header`
  background: ${THEME.colors.content.primary};
  padding: ${THEME.spacing.xl}px;

  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 150px;
`



const StyledButtonWrapper = styled(Box)`
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

      <Box m="xl">
        <UserInfoBox title="Goodies" subtitle={user.goodies === "1" ? "Oui" : "Non"} isActive={true}/>
        <UserInfoBox title="T-shirt" subtitle={user.tshirtSize} isActive={false}/>
      </Box>
      
      <StyledButtonWrapper display="flex">
        <Button variant="primary" onClick={() => setStep("SCANNING")} mr="s">Scanner un billet</Button>
        <IconButton variant="main" iconName="search" />  
      </StyledButtonWrapper>

    </div>
    
  );
}

