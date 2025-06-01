import display from "../assets/display.svg"
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { motion } from "motion/react"
import { SmoothWordWriter } from "./content-text";

const Content = () => {
    const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;
    const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate("/status/6802fef91e3a8f59fb6338f7");
  };
  return (
    <div className="content flex flex-col items-center mt-8 px-8 md:px-10">
      <SmoothWordWriter></SmoothWordWriter>
      {/* <h1 className="font-light text-2xl md:text-5xl flex flex-col items-center mb-5">
        Real-Time API Monitoring & <br /> <span>Uptime Tracking</span>{" "}
      </h1>
      <h3 className="font-extralight text-xs md:text-lg text-center mb-10">
        Monitor API uptime, response times, and failures in real-time.
        <br />{" "}
        <span>
          Get instant alerts, detailed logs, and historical insights to ensure
          your APIs stay reliable and performant.
        </span>
      </h3> */}
      <div className="flex flex-col md:flex-row justify-center w-full">
      <Link
        // href={`mailto:${supportEmail}`}
        to={'/signup'}
        className="bg-primary mr-5 px-11 py-3 rounded-lg text-black font-semibold my-3 text-center w-full md:w-auto"
      >
        Get Started
      </Link>
        <button onClick={handleRequestDemo} className=" px-11 py-3 my-3 rounded-lg font-semibold text-center w-full md:w-auto border-2 border-secondary">
          View Demo
        </button>
      </div>
      <motion.img
      initial={{ x:100, scale:0.2}}
      whileInView={{
        scale:1,
        x:0,
        transition: { duration: 1 }
      }}
       src={display} alt="" className="hidden md:flex"/>
    </div>
  );
};

export default Content;
