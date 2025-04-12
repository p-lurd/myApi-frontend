import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { formatCurrentDate } from "../utils/date-formatter";
import warning from "../assets/warning.svg";
import useFetchData from "../utils/use-fetch-data";
import StatusBoxes from "../components/status";
import { getStatusInfo } from "../utils/status-info-gen";

const Mainbody = () => {
  const [activeLink, setActiveLink] = useState("current");
  const [uptimeStatus, setUptimeStatus] = useState("");
  const today = formatCurrentDate();
  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;
  const { groupedData, loading, error } = useFetchData(id);
  // useEffect(()=>{
  //   console.log(groupedData);
  // },[groupedData])
  const getSystemStatus = (lastResponse) => {
    if (!lastResponse) return "No Data";
    if (!lastResponse.success) return "Major Outage";
    if (lastResponse.responseTime > 1500) return "Partial Outage";
    return "System operational";
  };

  return (
    <div className="font-primary flex flex-col items-center mt-8">
      <div className="font-primary flex flex-col flex-auto w-5/7 ">
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
          {
          !error && groupedData.length===0 &&
            <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg items-center text-amber-500">
              No data to display right now, please reload
            </div>
            }
          {error ? (
            <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg items-center text-red-800">
              There is a server error, please reload
            </div>
          ) : (
            <>
              {!loading ? (
                <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg">
                  <span className="font-medium">Current Status</span>
                  <span className="flex items-center font-medium text-sm">
                    <img src={warning} alt="" className="w-4.5 mr-1" />
                    Partial Outage
                  </span>
                </div>
              ) : (
                <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg">
                  Loading...
                </div>
              )}

              {/* This is where to map */}
              <div className="flex flex-col px-3 bg-secondary rounded-lg">
                <div className="flex justify-between pb-8 pt-2 text-sm">
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
                {/* {console.log(groupedData)} */}
                {groupedData.map((group) => {
                  const lastResponse =
                    group.responses[group.responses.length - 1];
                  const { text, icon } = getStatusInfo(lastResponse);

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
              <a className="text-lg font-medium pb-5">more details:</a>
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Mainbody;
