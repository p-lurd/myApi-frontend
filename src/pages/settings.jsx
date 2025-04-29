import bgUrl from "../assets/bg.svg";
import CreateBusiness from "../components/create-business";
import BusinessList from "../components/businessList";
import AuthorizedUserForm from "../components/authorize-user";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ChevronsRight, ChevronsLeft } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  return (
    <div
      className="flex flex-row bg-repeat w-lvw md:w-full h-full md:h-fit lg:h-lvh font-primary py-20 text-secondary justify-center items-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="flex flex-col space-y-3 w-full sm:w-3/5 lg:w-full  px-10 py-7 rounded-xl bg-grayA shadow-xl/20 shadow-gray-600 inset-shadow-sm inset-shadow-gray-200/10 ">
        <div>
          <h1 className="text-3xl mb-3">Settings</h1>
          <p className="mb-3 text-xl">Welcome, {user.name}!</p>
        </div>
        <div className="flex flex-col lg:flex-row md:space-x-3 w-full space-y-3">
          <BusinessList></BusinessList>
          <CreateBusiness></CreateBusiness>
          <AuthorizedUserForm></AuthorizedUserForm>
        </div>
        <div className="w-full flex flex-row justify-between items-center px-10 mt-5">
            <Link to={"/"} className="flex items-center hover:cursor-pointer justify-center"><ChevronsLeft size={25}></ChevronsLeft> <span> Go home</span></Link>
            <Link to={"/dashboard"} className="flex items-center hover:cursor-pointer justify-center"><span>Dashboard</span> <ChevronsRight size={25}></ChevronsRight></Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
