// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL

  const fetchBusinesses = async (userData) => {
    const bizResponse = await fetch(`${apiUrl}/businesses/${userData._id}`,{
      method: 'GET',
      headers:{
        "Content-Type": "applications/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      credentials: 'include',
    });
    if (bizResponse.ok) {
      const bizData = await bizResponse.json();
      setBusinesses(bizData);
      // If there are businesses, select the first one by default
      if (bizData.length > 0) {
        setSelectedBusiness(bizData[0]);
      }
    }
  }
  useEffect(() => {
    // Check if user is logged in when app loads
    const checkLoggedIn = async () => {
      try {
        // if(!document.cookie){return}
        const response = await fetch(`${apiUrl}/auth/me`,{
          method: 'GET',
          headers:{
            "Content-Type": "applications/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          // Fetch businesses for this user
          fetchBusinesses(userData)
          return
        }
        setUser(null);
        setBusinesses([]);
        setSelectedBusiness(null);
        // if(location.pathname !== '/login' || location.pathname !== '/signup' || location.pathname !== '/' || location.pathname !== '/status') {
        //   window.location.href = '/login';
        //   throw new Error('please login first')
        // }
      } catch (error) {
        toast.error(error.message);
        // console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // useEffect(() => {
  //   console.log("Updated user state:", user);
  // }, [user]);
  
  // useEffect(() => {
  //   console.log("Updated businesses state:", businesses);
  // }, [businesses]);
  const login = async (credential) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`,{
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify(credential),
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // Fetch businesses after login
        const bizResponse = await fetch(`${apiUrl}/businesses/${userData._id}`,{
          method: 'GET',
          headers:{
            "Content-Type": "applications/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          credentials: 'include',
        });
        if (bizResponse.ok) {
          const bizData = await bizResponse.json();
          setBusinesses(bizData);
          
          if (bizData.length > 0) {
            setSelectedBusiness(bizData[0]);
          }
        }
        
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async (toast) => {
    try {
        const res = await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
          if(res.ok){
          window.location.href = '/';
          }else if(!res.ok && res.status === 401){
            window.location.href = '/login'
              throw new Error('please login first');
          }
          else{
              throw new Error('Failed to logout');
          }
      setUser(null);
      setBusinesses([]);
      setSelectedBusiness(null);
    } catch (error) {
        toast.error(error.message);
      console.error("Logout failed:", error);
    }
  };

  const selectBusiness = (businessId) => {
    const business = businesses.find(b => b.id === businessId);
    if (business) {
      setSelectedBusiness(business);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      businesses,
      selectedBusiness,
      setSelectedBusiness,
      loading,
      login,
      logout,
      selectBusiness,
      fetchBusinesses
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);