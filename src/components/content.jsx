import display from "../assets/display.svg"
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";

const Content = () => {
    const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;
    const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate("/status/67c0fc8c9e176ef282a37af1");
  };
  return (
    <div className="content flex flex-col items-center mt-8 px-8 md:px-10">
      <h1 className="font-light text-2xl md:text-5xl flex flex-col items-center mb-5">
        Real-Time API Monitoring & <br /> <span>Uptime Tracking</span>{" "}
      </h1>
      <h3 className="font-extralight text-xs md:text-lg text-center mb-10">
        Monitor API uptime, response times, and failures in real-time.
        <br />{" "}
        <span>
          Get instant alerts, detailed logs, and historical insights to ensure
          your APIs stay reliable and performant.
        </span>
      </h3>
      <div className="flex flex-col md:flex-row justify-center w-full">
      <a
        href={`mailto:${supportEmail}`}
        className="bg-primary mr-5 px-11 py-3 rounded-lg text-black font-semibold my-3 text-center w-full md:w-auto"
      >
        Get Started
      </a>
        <button onClick={handleRequestDemo} className=" px-11 py-3 my-3 rounded-lg font-semibold text-center w-full md:w-auto border-2 border-secondary">
          View Demo
        </button>
      </div>
      <img src={display} alt="" className="hidden md:flex"/>
    </div>
  );
};

export default Content;
