import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Status from "./pages/status";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status/:id" element={<Status />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
