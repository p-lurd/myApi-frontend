import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Status from "./pages/status";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={1000} icon={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status/:id" element={<Status />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
