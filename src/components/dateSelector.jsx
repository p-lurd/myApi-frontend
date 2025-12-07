import React, { useState, useEffect } from "react";
import {
  Calendar,
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Divide,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL

const DateSelector = ({dateRange, setDateRange, setSelectedApi, selectedApi, fetchMetrics, loading}) => {
  const {selectedBusiness} = useAuth();
  
  
  //   const [error, setError] = useState(null);
  const [apis, setApis] = useState([]);

  useEffect(() => {
    if(!selectedBusiness){
        return
    }
    const listAPIs = async (id)=>{
        try {
            const apisResponse = await fetch(`${apiUrl}/api/monitoring/apis/${id}`,{
                method: 'GET',
                headers:{
                    "Content-Type": "application/json", // Fixed typo
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
                credentials: 'include',
            });
            
            const ApiData = await apisResponse.json();
            // console.log({ApiData})
            
            if(apisResponse.ok){
                setApis(ApiData)
                // Only set selectedApi if there isn't one already, or if the current one isn't in the new list
                if(ApiData.length > 0 && (!selectedApi || !ApiData.find(api => api._id === selectedApi._id))){
                    setSelectedApi(ApiData[0]);
                }
                return
            }else{
                throw new Error(ApiData.message||`Failed to fetch APIs: ${apisResponse.status}`)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    listAPIs(selectedBusiness._id)
}, [selectedBusiness, selectedApi]);

  

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  const formatDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

  return (
    <div className="w-full px-5 ">
      {/* API Selection */}
      <div className="mb-1.5">
        <label className="block text-sm font-medium text-blue-400 ">
          Select API
        </label>
        <select
          value={selectedApi}
          onChange={(e) => setSelectedApi(e.target.value)}
          className="w-full text-sm py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an API</option>
          {apis.map((api) => (
            <option key={api._id} value={api._id}>
              {api.apiName}
            </option>
          ))}
        </select>
      </div>
      {/* Start Date */}
      <div className="mb-1.5">
        <label className="block text-xs font-medium text-gray-300 mb-0.5">
          <Calendar className="inline w-4 h-4 mr-1" />
          Start Date
        </label>
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => handleDateChange("startDate", e.target.value)}
          max={dateRange.endDate}
          className="w-full text-sm px-1 py-0.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* End Date */}
      <div className="mb-2">
        <label className="block text-xs font-medium text-gray-300 mb-0.5">
          <Calendar className="inline w-4 h-4 mr-1" />
          End Date
        </label>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => handleDateChange("endDate", e.target.value)}
          min={dateRange.startDate}
          max={new Date().toISOString().split("T")[0]}
          className="w-full text-sm px-1 py-0.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* Refresh Button */}
      <div className="flex justify-end mb-2">
        <div className="flex items-end">
                    <button
                      onClick={fetchMetrics}
                      disabled={loading || !selectedApi}
                      className="text-xs w-full px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Loading...' : 'Refresh'}
                    </button>
                  </div>
      </div>
      {/* Date Range Summary */}
          {dateRange.startDate && dateRange.endDate && (
            <div className="flex p-1 rounded-md">
                <AlertCircle className="w-3.5 h-3.5 text-yellow-500 mr-1 pt-0.5" />
              <p className="text-xs text-blue-200">
                Showing metrics for {formatDuration(dateRange.startDate, dateRange.endDate)} 
                ({new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()})
              </p>
            </div>
          )}
    </div>
  );
};

export default DateSelector;
