import { signOut } from "@firebase/auth";
import React from "react";
import {  useNavigate } from "react-router-dom";
import { auth } from "../App";
import { useAppContext } from "../AppProvider";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { ButtonLink } from "../components/ButtonLink";
import { Link } from "../components/Link";
import { Typography } from "../components/Typography";
import { THEME } from "../constants/theme";

export const Home = () => {
  const navigate = useNavigate();
  const { setNotify } = useAppContext()
 
  const handleLogout = () => {               
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      setNotify({text: error, severity:"error"})
    });
  }


  return (
    <Box p="xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <ButtonLink fullWidth variant="primary" to="/scanning">Scanner un billet</ButtonLink>
      <Typography variant="body" my="xl">Ou</Typography>
      <ButtonLink fullWidth variant="main" to="/search">Rechercher par nom</ButtonLink>

      <Box position="absolute" display="flex" flexDirection="column" alignItems="center" bottom={THEME.spacing.xl+"px"}>
        <Link to="/admin"><Typography variant="footnote">Administration</Typography></Link>
        <Button variant="main" mt='m' size="s" onClick={() => handleLogout()}><Typography variant="footnote">Se déconnecter</Typography></Button>
        
      </Box>
    </Box>
  );
}

