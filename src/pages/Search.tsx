import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../AppProvider";
import { BackButton } from "../components/BackButton";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import { THEME } from "../constants/theme";
import { User } from "../types";

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  padding: ${THEME.spacing.m}px;
  margin-bottom: ${THEME.spacing.xl}px;
`

export const Search = () => {
  const [query, setQuery] = useState<string>("")
  const [result, setResult] = useState<User[]>([])
  const { firestoreAttendees } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    const result = firestoreAttendees.filter(attendee => attendee.fullname.toLowerCase().includes(query.toLowerCase()))
    setResult(result)
  }, [query, firestoreAttendees])

  return (
    <Box p="xl">   
      <BackButton variant="main" />   
      <StyledInput type="text" placeholder="Rechercher par nom" onChange={(value ) => setQuery(value.target.value)}/>

      {query && result.map(user => 
        <Button key={user.id} mb="s" variant='main' onClick={() => {
          navigate(`/user/${user.barcode}`)
        }}>
          <Typography variant='body'>{user.fullname}</Typography></Button>
      )}

      {query && result.length === 0 && 
        <Typography variant="footnote" textAlign="center" display="block">Aucun utilisateur trouvé</Typography>
      }
    </Box>
  );
}

