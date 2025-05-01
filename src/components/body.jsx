import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { formatCurrentDate } from "../utils/date-formatter";
import warning from "../assets/warning.svg";
import useFetchData from "../utils/use-fetch-data";
import StatusBoxes from "../components/status";
import { getStatusInfo } from "../utils/status-info-gen";
import {toast} from "react-toastify"
import errorIcon from "../assets/error.svg";

const Mainbody = () => {
  const [activeLink, setActiveLink] = useState("current");
  const [uptimeStatus, setUptimeStatus] = useState("");
  const today = formatCurrentDate();
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState({
          text: "No Data",
          icon: <img src={errorIcon} alt="Error Icon" className="w-4.5 mr-1" />,
          priority: 0
        });

  const apiUrl = import.meta.env.VITE_API_URL;
  const { groupedData, loading, error } = useFetchData(id);
  useEffect(()=>{
    // if(loading){
    //   toast.loading("Loading...",)
    // }
  },[groupedData, error, loading])
  const getSystemStatus = (lastResponse) => {
    if (!lastResponse) return "No Data";
    if (!lastResponse.success) return "Major Outage";
    if (lastResponse.responseTime > 1500) return "Partial Outage";
    return "System operational";
  };

  return (
    <div className="font-primary flex flex-col items-center mt-8 px-4">
      <div className="font-primary flex flex-col flex-auto w-full px-0.5 md:w-5/7 ">
        <div className="flex items-start space-x-3 py-3">
          <Link
            to={"#"}
            className={`${
              activeLink === "current"
                ? "font-medium underline underline-offset-6"
                : "font-normal hover:text-gray-600"
            }`}
            onClick={() => setActiveLink("current")}
          >
            Current Status
          </Link>
          <Link
            to={"#"}
            className={`${
              activeLink === "history"
                ? "font-medium underline underline-offset-6"
                : "font-normal hover:text-gray-600"
            }`}
            onClick={() => setActiveLink("history")}
          >
            History
          </Link>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg bg-secondary flex justify-between px-3 py-8">
            <span className="font-medium">API Status Dashboard</span>
            <span className="text-sm font-light">{today}</span>
          </div>
          
          {error ? (
            <></>
          ) : (
            <>
              {!loading ? (
                <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg">
                  <span className="font-medium">Current Status</span>
                  <span className="flex items-center font-medium text-sm">
                    {currentStatus.icon}
                    {currentStatus.text}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg">
                  Loading...
                </div>
              )}


              <div className="flex flex-col px-3 bg-secondary rounded-lg">
                <div className="flex justify-between pb-8 pt-2 text-sm flex-col md:flex-row">
                  <span className=" font-medium">
                    Status Timeline : 30 days
                  </span>
                  <div className="flex items-center space-x-4 text-black text-sm">
                    <span className="flex items-center">
                    <span className="w-4 h-4 bg-green-600 rounded-sm mr-2"></span>
                      Operational 
                    </span>

                    <span className="flex items-center">
                      <span className="w-4 h-4 bg-yellow-600 rounded-sm mr-2"></span>
                      Degraded
                    </span>

                    <span className="flex items-center">
                      <span className="w-4 h-4 bg-red-700 rounded-sm mr-2"></span>
                      Down
                    </span>
                  </div>
                </div>
                {groupedData.map((group) => {
                  const lastResponse =
                    group.responses[group.responses.length - 1];
                  const { text, icon, priority } = getStatusInfo(lastResponse);
                  if(priority>currentStatus.priority){
                    setCurrentStatus({text, icon, priority})
                  }
                  return (
                    <div
                      key={group._id}
                      className="api-group border-1 rounded-lg border-gray-400 px-3 mb-7"
                    >
                      <div className="text-sm flex justify-between  mt-4 mb-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {group.responses[0].apiName}
                          </span>
                          <span className="text-xs font-medium flex items-center">
                            {icon}
                            {text}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm">Uptime: 99.8%</span>
                          <span className="text-xs">
                            Last Checked: {today}
                          </span>
                        </div>
                      </div>

                      <div>
                        <StatusBoxes group={group.responses}></StatusBoxes>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a className="text-lg font-medium pb-5 pl-3">More details:</a>
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Mainbody;
