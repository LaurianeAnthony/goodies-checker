import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Typography } from "../components/Typography";
import useAttendees from "../hooks/useAttendees";
import { Attendee } from "../types";

export const Search = () => {
  const [query, setQuery] = useState<string>("")
  const [result, setResult] = useState<Attendee[]>([])
  const attendees = useAttendees()
  const navigate = useNavigate()

  useEffect(() => {
    if(attendees){
      const result = attendees.filter(attendee => attendee.fullname.toLowerCase().includes(query.toLowerCase()))
      setResult(result)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <Box p="xl">      
      <BackButton variant="main" />   

      <TextField type="text" placeholder="Rechercher par nom" onChange={(value ) => setQuery(value.target.value)} mb="xl"/>
    
      {query && result.map(user => 
        <Button fullWidth key={user.id} mb="s" variant='main' onClick={() => {
          navigate(`/attendee/${user.barcode}`)
        }}>
          <Typography variant='body'>{user.fullname}</Typography></Button>
      )}

      {query && result.length === 0 && 
        <Typography variant="footnote" textAlign="center" display="block">Aucun utilisateur trouvé</Typography>
      }
    </Box>
  
  );
}

