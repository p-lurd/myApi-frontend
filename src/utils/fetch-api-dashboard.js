import { toast } from "react-toastify";

const fetchApiStatus = async (page = 1, limit = 30, apiIdFilter = null) => {
  try {
    const response = await fetch(
        // replace the businessId
      `/api/businessId?page=${page}&limit=${limit}&apiId=${apiIdFilter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        coredentials: "include",
      }
    );
    if(!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }
    const data = await response.json();
    if(!data) throw new Error('No data found');
    return data;
  } catch (error) {
    if(error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      toast.error("Cannot connect to server. Please check your internet connection.");
    } else {
      // Handle other errors
      toast.error(error.message || "An unknown error occurred");
      throw error;
    }
  }
};
