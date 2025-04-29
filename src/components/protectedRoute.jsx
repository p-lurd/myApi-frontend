// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RefreshCw } from "lucide-react";
import bgUrl from  "../assets/bg.svg"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
    // <div>Loading...</div>// Or a proper loading spinner
    <div 
    className="flex justify-center items-center w-full h-full"
    style={{ backgroundImage: `url(${bgUrl})` }}
    >
              <div className="animate-spin mr-2">
                <RefreshCw size={20} className="text-blue-500" />
              </div>
              <span>Loading data...</span>
            </div>
  ) 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;