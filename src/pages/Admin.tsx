import React from "react";
import { BackButton } from "../components/BackButton";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";
import useBilletwebAttendeesMutation from "../hooks/useBilletwebAttendeesMutation";

export const Admin = () => {

  const { syncBilletwebAttendees } = useBilletwebAttendeesMutation()


  return (
    <Box p="xl" height="100vh" >
      <BackButton variant='contrast' />
      <Typography variant='h2' mb="l">Administration</Typography>
      <Button variant="primary" onClick={() => syncBilletwebAttendees()}>Sync participants depuis Billetweb</Button>
    </Box>
  );
}

