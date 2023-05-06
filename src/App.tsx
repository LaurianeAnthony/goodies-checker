import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import AppProvider from "./AppProvider";
import { THEME } from "./constants/theme";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";
import { Result } from "./pages/Result";
import { Scanning } from "./pages/Scanning";
import { Search } from "./pages/Search";


const firebaseConfig = {
  apiKey: "AIzaSyCjrXACadxAxjsWVA5J8Wr-X-hRrFkGbUk",
  authDomain: "goodies-checker.firebaseapp.com",
  projectId: "goodies-checker",
  storageBucket: "goodies-checker.appspot.com",
  messagingSenderId: "205454885555",
  appId: "1:205454885555:web:2ef85c7e01692512bea6c6"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const StyledLayout = styled.div`
  background: ${THEME.colors.background.contrast};
  height: 100vh;
`


const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppProvider firestoreDb={db}>
          <StyledLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/scanning" element={<Scanning />} />
              <Route path="/search" element={<Search />} />
              <Route path="/user/:id" element={<Result />} />
            </Routes>
          </StyledLayout>
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
