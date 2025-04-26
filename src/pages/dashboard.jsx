import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, ChevronDown, ChevronUp, RefreshCw, Settings } from 'lucide-react';

/**
 * Expected data structure:
 * {
 *   id: number,
 *   endpoint: string,
 *   status: string ('up', 'down', or 'slow'),
 *   timestamp: string (ISO date string),
 *   responseTime: number or null,
 *   statusCode: number
 * }
 */

// Mock data - replace with your actual API call
const fetchApiStatus = (page = 1, limit = 30) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = Array.from({ length: limit }, (_, i) => {
        const id = (page - 1) * limit + i + 1;
        const status = Math.random() > 0.15 ? 'up' : Math.random() > 0.5 ? 'down' : 'slow';
        const responseTime = status === 'down' ? null : Math.floor(Math.random() * (status === 'slow' ? 1500 : 300) + 50);
        return {
          id,
          endpoint: `/api/endpoint-${id % 10}`,
          status,
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          responseTime,
          statusCode: status === 'down' ? 500 : 200
        };
      });
      resolve(mockData);
    }, 800);
  });
};

const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState(null);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const loadData = async (pageNum = page) => {
    setLoading(true);
    try {
      const data = await fetchApiStatus(pageNum);
      setApiData(prev => pageNum === 1 ? data : [...prev, ...data]);
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to fetch API data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...apiData].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (sortField === 'timestamp') {
      return modifier * (new Date(a.timestamp) - new Date(b.timestamp));
    }
    
    if (sortField === 'responseTime') {
      if (a.responseTime === null) return 1;
      if (b.responseTime === null) return -1;
      return modifier * (a.responseTime - b.responseTime);
    }
    
    if (sortField === 'status') {
      const statusOrder = { up: 0, slow: 1, down: 2 };
      return modifier * (statusOrder[a.status] - statusOrder[b.status]);
    }
    
    return modifier * a[sortField].localeCompare(b[sortField]);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-500';
      case 'slow': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'up': return <CheckCircle className="text-green-400" size={18} />;
      case 'down': return <AlertCircle className="text-red-500" size={18} />;
      case 'slow': return <Clock className="text-yellow-400" size={18} />;
      default: return null;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-100">API Uptime Monitor</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => loadData(1)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </header>

        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="px-4 py-3 text-left font-medium">
                    <button 
                      className="flex items-center gap-1 hover:text-white" 
                      onClick={() => handleSort('endpoint')}
                    >
                      Endpoint
                      {sortField === 'endpoint' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button 
                      className="flex items-center gap-1 hover:text-white" 
                      onClick={() => handleSort('status')}
                    >
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button 
                      className="flex items-center gap-1 hover:text-white" 
                      onClick={() => handleSort('timestamp')}
                    >
                      Time
                      {sortField === 'timestamp' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button 
                      className="flex items-center gap-1 hover:text-white" 
                      onClick={() => handleSort('responseTime')}
                    >
                      Response Time
                      {sortField === 'responseTime' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr 
                      className="hover:bg-gray-750 cursor-pointer transition-colors"
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    >
                      <td className="px-4 py-3 font-mono text-sm">{item.endpoint}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StatusIcon status={item.status} />
                          <span className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{formatTime(item.timestamp)}</td>
                      <td className="px-4 py-3">
                        {item.responseTime ? (
                          <span className={item.responseTime > 500 ? 'text-yellow-400' : 'text-green-400'}>
                            {item.responseTime}ms
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        <span className={item.statusCode >= 400 ? 'text-red-500' : 'text-green-400'}>
                          {item.statusCode}
                        </span>
                      </td>
                    </tr>
                    {expandedItem === item.id && (
                      <tr className="bg-gray-750">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="text-gray-400 mb-2">Request Details</h4>
                              <div className="bg-gray-800 p-3 rounded font-mono">
                                <div><span className="text-blue-400">GET</span> {item.endpoint}</div>
                                <div className="text-gray-500 mt-2">Headers:</div>
                                <div className="pl-2 text-gray-300">Accept: application/json</div>
                                <div className="pl-2 text-gray-300">User-Agent: APIMonitor/1.0</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-gray-400 mb-2">Response Details</h4>
                              <div className="bg-gray-800 p-3 rounded font-mono">
                                <div className={item.statusCode >= 400 ? 'text-red-500' : 'text-green-400'}>
                                  Status: {item.statusCode} {item.statusCode === 200 ? 'OK' : 'Error'}
                                </div>
                                {item.responseTime && (
                                  <div className="text-gray-300">Time: {item.responseTime}ms</div>
                                )}
                                <div className="text-gray-500 mt-2">Headers:</div>
                                <div className="pl-2 text-gray-300">Content-Type: application/json</div>
                                <div className="pl-2 text-gray-300">Server: nginx/1.18.0</div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center p-6">
              <div className="animate-spin mr-2">
                <RefreshCw size={20} className="text-blue-500" />
              </div>
              <span>Loading data...</span>
            </div>
          )}
          
          {!loading && (
            <div className="p-4 flex justify-center">
              <button 
                onClick={() => loadData(page + 1)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Status Summary</h3>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <span>{apiData.filter(i => i.status === 'up').length} Up</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                <span>{apiData.filter(i => i.status === 'slow').length} Slow</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>{apiData.filter(i => i.status === 'down').length} Down</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Avg Response Time</h3>
            <div className="text-xl font-bold">
              {Math.round(
                apiData
                  .filter(i => i.responseTime !== null)
                  .reduce((sum, i) => sum + i.responseTime, 0) / 
                apiData.filter(i => i.responseTime !== null).length
              )}ms
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Last Updated</h3>
            <div className="text-gray-300">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;