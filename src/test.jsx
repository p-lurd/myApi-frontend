import React, { useState, useEffect } from 'react';
import { Calendar, Activity, Clock, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust to your NestJS backend URL

const ApiMonitoringDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });
  
  const [selectedApi, setSelectedApi] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apis, setApis] = useState([]);

  // Mock API list - replace with actual API call
  useEffect(() => {
    // Simulated API list - you would fetch this from your backend
    setApis([
      { id: 'api-1', name: 'User Service API', url: 'https://api.example.com/users' },
      { id: 'api-2', name: 'Payment API', url: 'https://api.example.com/payments' },
      { id: 'api-3', name: 'Notification API', url: 'https://api.example.com/notifications' }
    ]);
    setSelectedApi('api-1');
  }, []);

  const fetchMetrics = async () => {
    if (!selectedApi || !dateRange.startDate || !dateRange.endDate) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/monitoring/metrics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiId: selectedApi,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch metrics');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedApi) {
      fetchMetrics();
    }
  }, [selectedApi, dateRange]);

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getUptimeColor = (uptime) => {
    if (uptime >= 99.9) return 'text-green-600';
    if (uptime >= 99) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseTimeColor = (responseTime) => {
    if (responseTime <= 200) return 'text-green-600';
    if (responseTime <= 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Monitoring Dashboard</h1>
          <p className="text-gray-600">Monitor your API uptime and performance metrics</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* API Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select API
              </label>
              <select
                value={selectedApi}
                onChange={(e) => setSelectedApi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an API</option>
                {apis.map(api => (
                  <option key={api.id} value={api.id}>
                    {api.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                max={dateRange.endDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                min={dateRange.startDate}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Refresh Button */}
            <div className="flex items-end">
              <button
                onClick={fetchMetrics}
                disabled={loading || !selectedApi}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Date Range Summary */}
          {dateRange.startDate && dateRange.endDate && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                Showing metrics for {formatDuration(dateRange.startDate, dateRange.endDate)} 
                ({new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()})
              </p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-800">Error: {error}</p>
            </div>
          </div>
        )}

        {/* Metrics Cards */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Uptime Percentage */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className={`text-2xl font-bold ${getUptimeColor(metrics.uptimePercentage)}`}>
                    {metrics.uptimePercentage.toFixed(2)}%
                  </p>
                </div>
                <Activity className={`w-8 h-8 ${getUptimeColor(metrics.uptimePercentage)}`} />
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metrics.uptimePercentage >= 99.9 ? 'bg-green-500' : 
                      metrics.uptimePercentage >= 99 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(metrics.uptimePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Average Response Time */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className={`text-2xl font-bold ${getResponseTimeColor(metrics.averageResponseTime)}`}>
                    {metrics.averageResponseTime.toFixed(0)}ms
                  </p>
                </div>
                <Clock className={`w-8 h-8 ${getResponseTimeColor(metrics.averageResponseTime)}`} />
              </div>
            </div>

            {/* Total Requests */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalRequests.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            {/* Failed Requests */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Failed Requests</p>
                  <p className="text-2xl font-bold text-red-600">
                    {metrics.failedRequests.toLocaleString()}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        )}

        {/* Additional Details */}
        {metrics && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Performance Summary</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Success Rate: {((metrics.totalRequests - metrics.failedRequests) / metrics.totalRequests * 100).toFixed(2)}%</li>
                  <li>Total Downtime: {metrics.totalDowntime || 0} minutes</li>
                  <li>Cache Hit Rate: {metrics.cacheHitRate || 'N/A'}%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Data Freshness</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Last Updated: {metrics.lastUpdated ? new Date(metrics.lastUpdated).toLocaleString() : 'N/A'}</li>
                  <li>Data Source: {metrics.fromCache ? 'Cached' : 'Real-time'}</li>
                  <li>Query Duration: {metrics.queryDuration || 'N/A'}ms</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !metrics && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading metrics...</p>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!loading && !metrics && !error && selectedApi && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No metrics available for the selected date range</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiMonitoringDashboard;