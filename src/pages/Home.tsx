import React from "react";
import { Link } from "react-router-dom";
import { Box } from "../components/Box";
import { ButtonLink } from "../components/ButtonLink";
import { Typography } from "../components/Typography";
import { THEME } from "../constants/theme";

export const Home = () => {
  return (
    <Box p="xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <ButtonLink variant="primary" to="/scanning">Scanner un billet</ButtonLink>
      <Typography variant="body" my="xl">Ou</Typography>
      <ButtonLink variant="main" to="/search">Rechercher par nom</ButtonLink>

      <Box position="absolute" bottom={THEME.spacing.xl+"px"}><Link to="/admin"><Typography variant="footnote">Administration</Typography></Link></Box>
    </Box>
  );
}

