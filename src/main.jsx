import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Status from "./pages/status";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute.jsx";
import NotFound from "./pages/404"
import Settings from "./pages/settings";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={1000} icon={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status/:id" element={<Status />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
