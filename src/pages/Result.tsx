import { getDoc, doc, deleteDoc, setDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../AppProvider";
import { BackButton } from "../components/BackButton";
import { Box } from "../components/Box";
import { ButtonLink } from "../components/ButtonLink";
import { IconButtonLink } from "../components/IconButtonLink";
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
  justify-content: space-between;
  flex-direction: column;
  height: 150px;
`



const StyledButtonWrapper = styled(Box)`
  margin: 12px;
  width: calc(100% - 24px);
  position: absolute;
  bottom: 0px;
`

type Goodies = {
  goodies: boolean
  tshirt: boolean
}


export const Result = () => {
  const {id} = useParams<{id: string}>()
  const [goodies, setGoodies] = useState<Goodies>({goodies: false, tshirt: false})
  const {firestoreDb, setNotify} = useAppContext()
  const {user, isLoading} = useBilletwebUser({barcode: id})

  useEffect(() => {
    if (firestoreDb && user){
      getDoc(doc(firestoreDb, "attendees-goodies-checker", user.id)).then(querySnapshot => {
        setGoodies(querySnapshot.data() as Goodies);
      });

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  if(!firestoreDb || !user){
    return null
  }
  if(!user && !isLoading){
    setNotify({text: "Impossible de charger l'utilisateur", severity: "error"})
    return null
  }

  const onToggleGoodies = (type: "goodies" | "tshirt", value: boolean):void => {
    deleteDoc(doc(firestoreDb, "attendees-goodies-checker", user.id)).then(() => {
      const newGoodies: Goodies = {
        ...goodies,
        ...(type === "goodies" ? {goodies: value}: {tshirt: value})
      }
      setDoc(doc(firestoreDb, "attendees-goodies-checker", user.id), newGoodies).then(() => {
        setGoodies(newGoodies)
      })
    });
  }
  


  return (
    <div>
      <StyledHeader>
        <BackButton />
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <Typography variant="h2">{user.fullname}</Typography>
          <Typography variant="body">{user.barcode}</Typography>
        </Box>
      </StyledHeader>

      <Box m="xl">
        <UserInfoBox title="Goodies" subtitle={user.goodies === "1" ? "Oui" : "Non"} isActive={goodies?.goodies} onClick={() => onToggleGoodies("goodies", !goodies?.goodies)}/>
        <UserInfoBox title="T-shirt" subtitle={user.tshirtSize} isActive={goodies?.tshirt}  onClick={() => onToggleGoodies("tshirt", !goodies?.tshirt)}/>
      </Box>
      

      <StyledButtonWrapper display="flex"> 
        <ButtonLink fullWidth to="/scanning" variant="primary" mr="s">Scanner un billet</ButtonLink>
        <IconButtonLink to="/search" variant="main" iconName="search" />
      </StyledButtonWrapper>

    </div>
    
  );
}

