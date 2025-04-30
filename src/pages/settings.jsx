import bgUrl from "../assets/bg.svg";
import CreateBusiness from "../components/create-business";
import BusinessList from "../components/businessList";
import AuthorizedUserForm from "../components/authorize-user";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ChevronsRight, ChevronsLeft, Copy } from "lucide-react";
import AddApi from "../components/add-api"
import { toast } from "react-toastify";

const Settings = () => {
  const { user, selectedBusiness } = useAuth();
  const copyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/status/${selectedBusiness._id}`)
    toast.success("copied to clipboard")
  }
  const copyId = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(selectedBusiness._id)
    toast.success("copied to clipboard")
  }
  return (
    <div
      className="flex flex-row bg-repeat w-lvw md:w-full h-full md:h-fit lg:h-lvh font-primary py-20 text-secondary justify-center items-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="flex flex-col space-y-3 w-full sm:w-3/5 lg:w-full  px-10 py-7 rounded-xl bg-grayA shadow-xl/20 shadow-gray-600 inset-shadow-sm inset-shadow-gray-200/10 ">
        <div className="flex flex-row justify-between">
            <div>
            <h1 className="text-3xl mb-3">Settings</h1>
          <p className="mb-3 text-xl">Welcome, {user.name}!</p>
            </div>
            <div className="lg:space-y-2 ">
                <button 
                className="flex flex-row lg:pr-5 items-center justify-center hover:cursor-pointer hover:text-primary ml-2"
                onClick={copyLink}
                ><Copy size={20} className="pr-1"></Copy>business link</button>
                <button 
                className="flex flex-row lg:pr-5 items-center justify-center hover:cursor-pointer hover:text-primary ml-6"
                onClick={copyId}
                ><Copy size={20} className="pr-1"></Copy>business Id</button>
            </div>
          
        </div>
        <div className="flex flex-col lg:flex-row md:space-x-3 w-full space-y-3">
          <BusinessList></BusinessList>
          <CreateBusiness></CreateBusiness>
          <AuthorizedUserForm></AuthorizedUserForm>
        </div>
        <div className="flex flex-col w-full rounded-xl border-2 border-gray-600 p-5">
          <AddApi></AddApi>
        </div>
        <div className="w-full flex flex-row justify-between items-center px-10 mt-5">
          <Link
            to={"/"}
            className="flex items-center hover:cursor-pointer justify-center"
          >
            <ChevronsLeft size={25}></ChevronsLeft> <span> Go home</span>
          </Link>
          <Link
            to={"/dashboard"}
            className="flex items-center hover:cursor-pointer justify-center"
          >
            <span>Dashboard</span> <ChevronsRight size={25}></ChevronsRight>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
