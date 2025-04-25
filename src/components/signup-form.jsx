import { useState } from "react";
import github from "../assets/github.svg";
const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
  };
  return (
    <div className="flex items-center justify-center w-full h-10/12 lg:pr-15">
      <div className="bg-grayA p-10 rounded-lg lg:min-w-3/12 shadow-xl/20 shadow-gray-600 inset-shadow-sm inset-shadow-gray-200/10">
        <h1 className="mb-8 font-semibold b">Register</h1>
        <form className="mb-5">
        <div className="pb-1.5">
            <label htmlFor="username" className="text-xs">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full border-light border-1 rounded-md mt-1 pl-1 py-1.5 hover:cursor-pointer hover:border-gray-100  transition duration-200"
            />
          </div>
          <div className="pb-1.5">
            <label htmlFor="email" className="text-xs">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="w-full border-light border-1 rounded-md mt-1 pl-1 py-1.5 hover:cursor-pointer hover:border-gray-100  transition duration-200"
            />
          </div>
          
          <div className="">
            <label htmlFor="password" className="text-xs">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border-light border-1 rounded-md mt-1 pl-1 py-1.5 hover:cursor-pointer hover:border-gray-100  transition duration-200"
            />
          </div>
          <div className="mb-7">
            <label htmlFor="confirm-password" className="text-xs">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              className="w-full border-light border-1 rounded-md mt-1 pl-1 py-1.5 hover:cursor-pointer hover:border-gray-100  transition duration-200"
            />
          </div>
          <input
            type="button"
            value="Sign Up"
            className="bg-primary text-black py-1.5 mt-3 w-full rounded-lg hover:bg-blue-300 hover:cursor-pointer transition duration-200"
          />
        </form>
        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-grayA text-gray-500">Or</span>
          </div>
        </div>
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-2 px-4 gap-3 bg-gray-900 hover:bg-gray-800 text-white font-light rounded-lg transition duration-200 disabled:opacity-70 hover:cursor-pointer"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            //   <Github size={20} />
            // <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github" />
            <img src={github} className="w-6" alt="" />
          )}
          <span>{isLoading ? "Connecting..." : "Continue with GitHub"}</span>
        </button>
      </div>
    </div>
  );
};
export default SignupForm;
