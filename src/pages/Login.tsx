import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { BiHide, BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../App";
import { useAppContext } from "../AppProvider";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField"

const UnstyledButton = styled.button`
  background: none;
  border: none;
  display: flex;
`

const StyledForm = styled.form`
  width: 100%
`

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState<"password" | "text">("password")
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
      <StyledForm>
        <TextField  
          id="email-address"
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
          type={passwordInputType}                                    
          required       
          aria-label="Mot de passe"                                                                          
          placeholder="Mot de passe"
          onChange={(e)=>setPassword(e.target.value)}
          mb="xl"
          endAction={
            passwordInputType === "text" ? 
              <UnstyledButton type="button" onClick={() => setPasswordInputType("password")}><BiHide /></UnstyledButton> 
              : 
              <UnstyledButton type="button" onClick={() => setPasswordInputType("text")}><BiShow /></UnstyledButton>
          }
        />
        <Button variant='primary' fullWidth onClick={onLogin}>Se connecter</Button>
                             
      </StyledForm>
    </Box>
  );
}

