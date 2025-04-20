import weup from "../assets/we-up.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const getMainTextColor = () => {
    if (location.pathname === "/") {
      return { text: "text-white", bgColor: "" };
    } else {
      return { text: "text-black", bgColor: "bg-gray-200" };
    }
  };

  return (
    <header
      className={`
    flex flex-row 
    ${getMainTextColor().text}
    font-primary
    justify-between
    md:ml-4
     pr-4 pl-4
    `}
    >
      <div className="my-6">
        <img src={weup} alt="logo" onClick={() => navigate("/")} />
      </div>

      <nav className={`hidden md:flex justify-evenly flex-1 my-7 sm:pl-[8%]`}>
        <div className="flex space-x-8 text-xs">
          <Link to={"/"}>Home</Link>
          <Link to={"#"}>Monitoring</Link>
          <Link to={"#"}>Features</Link>
          <Link to={"#"}>Pricing</Link>
          <Link to={"#"}>Get Help</Link>
        </div>
      </nav>
      <div className=" bg-color-blue-500 pt-6 md:mr-6">
        <button className=" text-sm md:text-lg bg-primary border-2 border-primary mr-2 px-5 py-1.5 md:px-8 md:py-1 rounded-md text-black">
          Login
        </button>
        <button
          className={`${getMainTextColor().bgColor} text-sm md:text-lg px-3  py-1.5 md:px-6 md:py-1 rounded-md border-2 ${location ==="/"? "border-white" :"border-gray-200"}`}
        >
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
