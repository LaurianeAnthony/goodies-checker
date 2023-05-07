import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../App";
import { useAppContext } from "../AppProvider";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setNotify } = useAppContext()
     
  const onLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setNotify({
          text: `${errorCode}: ${errorMessage}`,
          severity: "error"
        })
      });
     
  }
  return (
    <Box p="xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <form>
        <TextField  id="email-address"
          name="email"
          type="email"                                    
          required                
          aria-label="Adresse email"                                                                
          placeholder="Adresse email"
          onChange={(e)=>setEmail(e.target.value)}
          mb="l"
        />
        
        <TextField  
          id="password"
          name="password"
          type="password"                                    
          required       
          aria-label="Mot de passe"                                                                          
          placeholder="Mot de passe"
          onChange={(e)=>setPassword(e.target.value)}
          mb="xl"
        />

        <Button variant='primary' fullWidth onClick={onLogin}>Se connecter</Button>
                             
      </form>
    </Box>
  );
}

