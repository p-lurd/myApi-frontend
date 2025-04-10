import weup from "../assets/weUp.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <header className="flex flex-row text-black-900 ml-4 font-primary ">
      <div className="my-6"><img src={weup} alt="logo" onClick={() => navigate("/")}/></div>
      
      <nav className="flex justify-evenly flex-1 my-7">
        <div className="flex space-x-14 text-xs">
          <Link to={"/"}>
            Home
          </Link>
          <Link to={"#"}>Monitoring</Link>
          <Link to={"#"}>Features</Link>
          <Link to={"#"}>Pricing</Link>
          <Link to={"#"}>Get Help</Link>
        </div>
      </nav>
      <div className=" bg-color-blue-500 mr-6 pt-6">
        <button className=" bg-primary mr-2 px-8 py-1 rounded-md">Login</button>
        <button className=" bg-gray-200 px-6 py-1 rounded-md">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
