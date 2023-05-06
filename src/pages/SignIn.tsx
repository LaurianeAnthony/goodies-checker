import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../App";
import { useAppContext } from "../AppProvider";
import { Box } from "../components/Box";

export const SignIn = () => {
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
        <div>
          <label htmlFor="email-address">
                                    Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"                                    
            required                                                                                
            placeholder="Email address"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
                                    Password
          </label>
          <input
            id="password"
            name="password"
            type="password"                                    
            required                                                                                
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
                                                
        <div>
          <button                                    
            onClick={onLogin}                                        
          >      
                                    Login                                                                  
          </button>
        </div>                               
      </form>
    </Box>
  );
}

