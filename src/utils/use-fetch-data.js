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
          toast.error("There is a server error, please reload")
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        
        setGroupedData(result);
      } catch (err) {
        toast.error(err.message)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { groupedData, loading, error };
}

export default useFetchData;
