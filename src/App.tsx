import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import AppProvider, { useAppContext } from "./AppProvider";
import { COLORS } from "./constants";
import { Home } from "./pages/Home";
import { Result } from "./pages/Result";
import { Scanning } from "./pages/Scanning";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const StyledLayout = styled.div`
  background: ${COLORS.background.default};
  height: 100vh;
`

const Content = () => {
  const {step } = useAppContext()
  return (
    <StyledLayout>
      {step === "HOME" && <Home />}
      {step === "SCANNING" && <Scanning />}
      {step === "RESULT" && <Result />}
    </StyledLayout>
  )
}

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Content />
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
