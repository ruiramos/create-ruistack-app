import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Home from "./pages/home/Home";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/hello" element={<p>world!</p>} />
        <Route path="*" element={<p>not found sorry</p>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
