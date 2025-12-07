import React, { useState, useEffect } from "react";
import DateSelector from "./dateSelector";
import { toast } from "react-toastify";
import MetricsCard from "./metricsCard";
import AIInsight from "./insightAI";


const apiUrl = import.meta.env.VITE_API_URL

export default function AnalyticsCard({ data }) {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days ago
    endDate: new Date().toISOString().split("T")[0], // today
  });

  const [selectedApi, setSelectedApi] = useState("");
  const [metrics, setMetrics] = useState(null);
  // const placeholderMetric = {
  //   uptimePercentage: 99.5,
  //   averageResponseTime: 150,
  //   totalRequests: 10000,
  //   failedRequests: 50,
  //   totalDowntime: 30,
  //   cacheHitRate: 85,
  //   lastUpdated: "2024-01-15T10:30:00Z",
  //   fromCache: true,
  //   queryDuration: 45,
  // };
  const fetchMetrics = async () => {
    console.log('fetching metrics')
    if (!selectedApi || !dateRange.startDate || !dateRange.endDate) return;

    setLoading(true);
    // setError(null);

    try {
      // Temporary
      // setMetrics(placeholderMetric);
      const response = await fetch(`${apiUrl}/api/monitoring/metrics`, {
        method: "POST",
        headers:{
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
        body: JSON.stringify({
          apiId: selectedApi._id,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log({data})
      setMetrics(data);
    } catch (err) {
      toast.error(err.message || "Failed to fetch metrics");
      //   setError(err.message || 'Failed to fetch metrics');
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log({selectedApi})
    if (selectedApi) {
      fetchMetrics();
    }
  }, [dateRange]);
  return (
    <div className="p-4 rounded-md shadow-md space-y-4">
      {!loading ? (
        <div className=" space-x-8 flex">
          <div className="h-60 bg-gray-700 w-1/3 rounded-2xl flex items-center justify-center ">
          <AIInsight/>
          </div>
          <div
            className={`h-60 bg-gray-700 w-1/3 rounded-2xl flex items-center justify-center ${
              loading ? "animate-pulse" : ""
            }`}
          >
            <MetricsCard metrics={metrics} />
          </div>
          <div className="h-60 bg-gray-700 w-1/3 rounded-2xl flex justify-center items-center">
            <DateSelector
              dateRange={dateRange}
              setDateRange={setDateRange}
              setSelectedApi={setSelectedApi}
              selectedApi={selectedApi}
              fetchMetrics={fetchMetrics}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p className="text-gray-700">{data.body}</p>
        </>
      )}
    </div>
  );
}
