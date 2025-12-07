import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const useFetchDashboard = (apiIdFilter, page, setPage) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedBusiness } = useAuth();
  const fetchApiStatus = async (page = 1, limit = 30, apiIdFilter = null) => {
    try {
      if (selectedBusiness !== null) {
        const businessId = selectedBusiness._id;
        const apiUrl = import.meta.env.VITE_API_URL;
        let fetchUrl = `${apiUrl}/api/dashboard/${businessId}?page=${page}&limit=${limit}`;
        if (apiIdFilter) {
          fetchUrl += `&apiIdFilter=${apiIdFilter}`;
        }
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("please login to continue");
          }
          throw new Error(
            data.message || `Something went wrong: ${response.status}`
          );
        }

        if (!data) throw new Error("No data found");

        return data;
      }
      return [];
    } catch (error) {
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        toast.error(
          "Cannot connect to server. Please check your internet connection."
        );
      } else {
        // Handle other errors
        toast.error(error.message || "An unknown error occurred");
        throw error;
      }
    }
  };
  const loadData = useCallback(
    async (pageNum = page, resetData = false) => {
      setLoading(true);
      try {
        const data = await fetchApiStatus(pageNum, 10, apiIdFilter);
        setApiData((prev) =>
          resetData || pageNum === 1 ? data : [...prev, ...data]
        );
        setPage(pageNum);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      } finally {
        setLoading(false);
      }
    },
    [apiIdFilter, page, setPage, selectedBusiness]
  );

  useEffect(() => {
    loadData(1, true);
  }, [apiIdFilter, selectedBusiness]);

  return { apiData, loading, loadData };
};

export default useFetchDashboard;

// {export const fetchApiStatus = async (page = 1, limit = 30, apiIdFilter = null, toast) => {
//     try {
//         // Crosscheck the structure of selected businesses
//         const{selectedBusinesses} = useAuth()
//         const businessId = selectedBusinesses?.id;
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await fetch(
//         `${apiUrl}/api/dashboard/${businessId}?page=${page}&limit=${limit}&apiId=${apiIdFilter}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Cache-Control": "no-cache, no-store, must-revalidate",
//             Pragma: "no-cache",
//             Expires: "0",
//           },
//           credentials: "include",
//         }
//       );
//       // console.log({response})
//       const data = await response.json();
//       if(!response.ok) {
//         if(response.status === 401) {
//             // Navigate('/login')
//             throw new Error('please login to continue');

//         }
//         throw new Error(data.message || `Something went wrong: ${response.status}`);
//       }

//       if(!data) throw new Error('No data found');

//       return data;
//     } catch (error) {
//       if(error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
//         toast.error("Cannot connect to server. Please check your internet connection.");
//       } else {
//         // Handle other errors
//         toast.error(error.message || "An unknown error occurred");
//         throw error;
//       }
//     }
//   };}
