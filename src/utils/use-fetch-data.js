import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function useFetchData(endpoint) {
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const fetchUrl = `${apiUrl}/api/${endpoint}`;
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // These headers prevent caching
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.ok) {
          // toast.error("Invalid login credientials");
          // throw new Error(`Error: ${response.status}`); 
          throw new Error(data.message || `Error: ${response.status}`);
        }

        const data = await response.json();
        if(!data) throw new Error('No data found');
        
        setGroupedData(data);
      } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          toast.error("Cannot connect to server. Please check your internet connection.");
        } else {
          // Handle other errors
          toast.error(error.message || "An unknown error occurred");
        }
        // console.error("Signup error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { groupedData, loading, error };
}

export default useFetchData;
