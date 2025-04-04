import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { formatCurrentDate } from "../utils/date-formatter";
import warning from "../assets/warning.svg";
import useFetchData from "../utils/use-fetch-data";

const Mainbody = () => {
  const [activeLink, setActiveLink] = useState("current");
  const [uptimeStatus, setUptimeStatus] = useState("");
  const today = formatCurrentDate();
  const { id } = useParams();

  // useEffect(() => {
  //   // const handleUserJoined = (data: { username: string }) => {
  //   //     if (data?.username) {
  //   //         showNotification(`${data.username} joined the call`);
  //   //     } else {
  //   //         console.error(
  //   //             'Received user-joined event without username',
  //   //             data
  //   //         );
  //   //     }
  //   // };

  // },[])
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetchData(id);
  // console.log({ data });
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="font-primary flex flex-col border-2 border-blue-600 items-center mt-8">
      <div className="font-primary flex flex-col flex-auto w-5/7 ">
        <div className="flex items-start space-x-3 py-3">
          <Link
            to={"/"}
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
            to={"/"}
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
          {error? (<div className="flex flex-col px-3 py-6 bg-secondary rounded-lg items-center text-red-800">There is a server error, please reload</div>):(
            <>
          {!loading?(
            <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg">
            <span className="font-medium">Current Status</span>
            <span className="flex items-center font-medium text-sm">
              <img src={warning} alt="" className="w-4.5 mr-1" />
              Partial Outage
            </span>
          </div>):(
            <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg">Loading...</div>
          )}
          
          {/* This is where to map */}
          <div className="flex flex-col px-3 py-6 bg-secondary rounded-lg"></div>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Mainbody;
