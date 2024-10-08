import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Toaster } from 'react-hot-toast';
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpeedInsights/>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <Toaster />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
