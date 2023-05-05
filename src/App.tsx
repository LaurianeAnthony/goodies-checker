import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "./AppProvider";
import { Scanning } from "./pages/Scanning";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})


const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <header>
            Goodies checker
          </header>
          <Scanning />
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
