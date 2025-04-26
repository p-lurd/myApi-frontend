import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, ChevronDown, ChevronUp, RefreshCw, Settings, Filter, MessageSquare } from 'lucide-react';
import bgUrl from "../assets/bg.svg";
/**
 * Expected data structure from MongoDB:
 * {
 *   _id: string,
 *   url: string,
 *   apiName: string,
 *   apiId: string,
 *   statusCode: number,
 *   responseTime: number,
 *   success: boolean,
 *   businessId: string,
 *   createdAt: string,
 *   updatedAt: string,
 *   comments: Array<{text: string, timestamp: string}> (added for comments feature)
 * }
 */

// Mock data - replace with your actual API call
const fetchApiStatus = (page = 1, limit = 30, apiIdFilter = null) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a list of mock API names and IDs
      const apiList = [
        { apiName: "User Authentication", apiId: "507f1f77bcf86cd799439011" },
        { apiName: "Product Catalog", apiId: "507f1f77bcf86cd799439012" },
        { apiName: "Order Processing", apiId: "507f1f77bcf86cd799439013" },
        { apiName: "Payment Gateway", apiId: "507f1f77bcf86cd799439014" },
        { apiName: "Notification Service", apiId: "507f1f77bcf86cd799439015" }
      ];
      
      const mockData = Array.from({ length: limit }, (_, i) => {
        const id = (page - 1) * limit + i + 1;
        const apiInfo = apiList[id % apiList.length];
        const success = Math.random() > 0.15;
        const responseTime = Math.floor(Math.random() * 2000 + 50);
        // Determine status based on success and responseTime
        const status = !success ? 'down' : responseTime > 1500 ? 'slow' : 'up';
        
        return {
          _id: `mock_id_${id}`,
          url: `/api/${apiInfo.apiName.toLowerCase().replace(/\s+/g, '-')}/v1`,
          apiName: apiInfo.apiName,
          apiId: apiInfo.apiId,
          statusCode: success ? 200 : 500,
          responseTime: responseTime,
          success: success,
          businessId: "507f1f77bcf86cd799439020",
          createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
          comments: status === 'down' ? [
            { 
              text: "Investigating connection issue with database", 
              timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString() 
            }
          ] : []
        };
      });
      
      // Apply API ID filter if provided
      const filteredData = apiIdFilter 
        ? mockData.filter(item => item.apiId === apiIdFilter)
        : mockData;
        
      resolve(filteredData);
    }, 800);
  });
};

const ApiUptimeMonitor = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [apiIdFilter, setApiIdFilter] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [slowThreshold, setSlowThreshold] = useState(1500);

  const loadData = async (pageNum = page, resetData = false) => {
    setLoading(true);
    try {
      const data = await fetchApiStatus(pageNum, 30, apiIdFilter);
      setApiData(prev => resetData || pageNum === 1 ? data : [...prev, ...data]);
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to fetch API data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const addComment = (itemId) => {
    if (!commentText.trim()) return;
    
    setApiData(prev => prev.map(item => {
      if (item._id === itemId) {
        const newComment = {
          text: commentText,
          timestamp: new Date().toISOString()
        };
        return {
          ...item,
          comments: [...(item.comments || []), newComment]
        };
      }
      return item;
    }));
    
    setCommentText('');
    setShowCommentModal(false);
  };
  
  const clearApiFilter = () => {
    setApiIdFilter(null);
    loadData(1, true);
  };

  useEffect(() => {
    loadData(1, true);
  }, [apiIdFilter]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Derive status from success and responseTime
  const getStatus = (item) => {
    if (!item.success) return 'down';
    return item.responseTime > slowThreshold ? 'slow' : 'up';
  };
  
  const apiData_withStatus = apiData.map(item => ({
    ...item,
    status: getStatus(item)
  }));
  
  const sortedData = [...apiData_withStatus].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (sortField === 'createdAt') {
      return modifier * (new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    if (sortField === 'responseTime') {
      return modifier * (a.responseTime - b.responseTime);
    }
    
    if (sortField === 'status') {
      const statusOrder = { up: 0, slow: 1, down: 2 };
      return modifier * (statusOrder[a.status] - statusOrder[b.status]);
    }
    
    if (typeof a[sortField] === 'string') {
      return modifier * a[sortField].localeCompare(b[sortField]);
    }
    
    return modifier * (a[sortField] - b[sortField]);
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
  
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className=" text-gray-100 min-h-screen p-6"
    style={{ backgroundImage: `url(${bgUrl})`, backgroundRepeat: "repeat" }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-100">API Uptime Monitor</h1>
            {apiIdFilter && (
              <div className="ml-4 flex items-center bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                Filtered by API
                <button 
                  onClick={clearApiFilter}
                  className="ml-2 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            {/* <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md">
              <span className="text-sm text-gray-400">Slow threshold:</span>
              <input 
                type="number" 
                value={slowThreshold}
                onChange={(e) => setSlowThreshold(Number(e.target.value))}
                className="w-16 bg-gray-700 text-white px-2 py-1 rounded" 
                min="100"
                step="100"
              /> 
              <span className="text-sm text-gray-400">ms</span>
            </div> */}
            <button
              onClick={() => loadData(1, true)}
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
                      onClick={() => handleSort('url')}
                    >
                      Endpoint
                      {sortField === 'url' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button 
                      className="flex items-center gap-1 hover:text-white" 
                      onClick={() => handleSort('apiName')}
                    >
                      API Name
                      {sortField === 'apiName' && (
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
                      onClick={() => handleSort('createdAt')}
                    >
                      Time
                      {sortField === 'createdAt' && (
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
                      onClick={() => setExpandedItem(expandedItem === item._id ? null : item._id)}
                    >
                      <td className="px-4 py-3 font-mono text-sm">{item.url}</td>
                      <td className="px-4 py-3">
                        <button 
                          className="text-blue-400 hover:text-blue-300 text-left"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent expanding the row
                            setApiIdFilter(item.apiId);
                          }}
                        >
                          {item.apiName}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StatusIcon status={item.status} />
                          <span className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          {item.comments && item.comments.length > 0 && (
                            <div className="text-gray-400 ml-2 flex items-center gap-1">
                              <MessageSquare size={14} />
                              <span className="text-xs">{item.comments.length}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{formatTime(item.createdAt)}</td>
                      <td className="px-4 py-3">
                        <span className={item.responseTime > slowThreshold ? 'text-yellow-400' : 'text-green-400'}>
                          {item.responseTime}ms
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono">
                        <span className={item.statusCode >= 400 ? 'text-red-500' : 'text-green-400'}>
                          {item.statusCode}
                        </span>
                      </td>
                    </tr>
                    {expandedItem === item._id && (
                      <tr className="bg-gray-750">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <h4 className="text-gray-400 mb-2">Request Details</h4>
                              <div className="bg-gray-800 p-3 rounded font-mono">
                                <div><span className="text-blue-400">GET</span> {item.url}</div>
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
                                <div className="text-gray-300">Time: {item.responseTime}ms</div>
                                <div className="text-gray-300">Success: {item.success ? 'Yes' : 'No'}</div>
                                <div className="text-gray-500 mt-2">Headers:</div>
                                <div className="pl-2 text-gray-300">Content-Type: application/json</div>
                                <div className="pl-2 text-gray-300">Server: nginx/1.18.0</div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-gray-400">Comments</h4>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItemId(item._id);
                                    setShowCommentModal(true);
                                  }}
                                  className="text-xs px-2 py-1 bg-blue-700 text-blue-200 rounded hover:bg-blue-600 transition-colors"
                                >
                                  Add Comment
                                </button>
                              </div>
                              
                              <div className="bg-gray-800 p-3 rounded h-40 overflow-y-auto">
                                {item.comments && item.comments.length > 0 ? (
                                  <div className="space-y-3">
                                    {item.comments.map((comment, idx) => (
                                      <div key={idx} className="text-sm border-l-2 border-gray-600 pl-3">
                                        <p className="text-gray-300">{comment.text}</p>
                                        <p className="text-gray-500 text-xs mt-1">{formatDateTime(comment.timestamp)}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 italic">No comments yet</p>
                                )}
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

{/* Nonep-4 rounded-lg"> */}
<div>
    <div>
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

export default ApiUptimeMonitor;
