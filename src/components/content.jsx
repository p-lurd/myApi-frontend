import display from "../assets/display.svg"
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";

const Content = () => {
    const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;
    const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate("/status/67c0fc8c9e176ef282a37af1");
  };
  return (
    <div className="content flex flex-col items-center mt-8">
      <h1 className="font-light text-5xl flex flex-col items-center mb-5">
        Real-Time API Monitoring & <br /> <span>Uptime Tracking</span>{" "}
      </h1>
      <h3 className="font-extralight text-lg flex flex-col items-center mb-10">
        Monitor API uptime, response times, and failures in real-time.
        <br />{" "}
        <span>
          Get instant alerts, detailed logs, and historical insights to ensure
          your APIs stay reliable and performant.
        </span>
      </h3>
      <div className="flex flex-row justify-center">
      <a
        href={`mailto:${supportEmail}`}
        className="bg-primary mr-5 px-11 py-3 rounded-lg text-black font-semibold"
      >
        Get Started
      </a>
        <button onClick={handleRequestDemo} className=" px-7 py-3 rounded-lg font-semibold border-2 border-secondary">
          Request a Demo
        </button>
      </div>
      <img src={display} alt="" />
    </div>
  );
};

export default Content;
