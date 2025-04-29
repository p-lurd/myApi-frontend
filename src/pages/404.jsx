import { Link, useNavigate } from "react-router-dom";
import bgUrl from "../assets/bg.svg";
import weup from "../assets/we-up.svg";
import { ArrowLeft } from "lucide-react";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-lvh bg-repeat relative flex flex-col items-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <Link to="/" className="self-start">
      <img
        src={weup}
        alt="logo"
        className="hover:cursor-pointer size-20 pl-5 mt-4"
      />
    </Link>

      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="text-5xl text-secondary px-6 py-4">
          404: Page not found
        </h1>

        <Link to={"/"} className="flex items-center hover:cursor-pointer">
          <ArrowLeft color="white" size={35} />
          <span className="text-secondary ">Go home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
