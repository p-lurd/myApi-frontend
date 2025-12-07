import {
  Calendar,
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Divide,
} from "lucide-react";

const MetricsCard = ({metrics}) => {
    const getUptimeColor = (uptime) => {
    if (uptime >= 99.9) return "text-green-600";
    if (uptime >= 99) return "text-yellow-600";
    return "text-red-600";
  };

  const getResponseTimeColor = (responseTime) => {
    if (responseTime <= 200) return "text-green-600";
    if (responseTime <= 500) return "text-yellow-600";
    return "text-red-600";
  };
    return ( 
        <div className="w-full p-2 ">
        {metrics && (
          <div className="grid md:grid-cols-2 lg:gap-6">
            {/* Uptime Percentage */}
            <div className=" rounded-lg shadow-sm border-b border-gray-200 p-1 md:p-2  ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-400">Uptime</p>
                  <p className={`text-xs md:text-2xl font-bold ${getUptimeColor(metrics.uptimePercentage)}`}>
                    {metrics.uptimePercentage.toFixed(2)}%
                  </p>
                </div>
                <Activity className={`w-3 h-3 md:w-8 md:h-8 ${getUptimeColor(metrics.uptimePercentage)}`} />
              </div>
              <div className="mt-1 md:mt-4">
                <div className="w-full bg-gray-200 rounded-full md:h-2 h-0.5">
                  <div 
                    className={`md:h-2 h-0.5 rounded-full ${
                      metrics.uptimePercentage >= 99.9 ? 'bg-green-500' : 
                      metrics.uptimePercentage >= 99 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(metrics.uptimePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Average Response Time */}
            <div className=" rounded-lg shadow-sm border-b border-gray-200 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Avg Response Time</p>
                  <p className={`text-2xl font-bold ${getResponseTimeColor(metrics.averageResponseTime)}`}>
                    {metrics.averageResponseTime.toFixed(0)}ms
                  </p>
                </div>
                <Clock className={`w-8 h-8 ${getResponseTimeColor(metrics.averageResponseTime)}`} />
              </div>
            </div>

            {/* Total Requests */}
            <div className=" rounded-lg shadow-sm border-b border-gray-200 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalRequests.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            {/* Failed Requests */}
            <div className=" rounded-lg shadow-sm border-b border-gray-200 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Failed Requests</p>
                  <p className="text-2xl font-bold text-red-600">
                    {metrics.failedRequests.toLocaleString()}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        )}
        </div>
     );
}
 
export default MetricsCard;