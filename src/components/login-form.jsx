import { useState } from "react";
import github from "../assets/github.svg";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {user, setuser, login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    } else if (!formData.email) {
      toast.error("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email");
      return false;
    } else {
      return true;
    }
  };
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoading(true);
        const credential ={
            email: formData.email,
            password: formData.password
        }
        const res = await login(credential);
        if(!res.success){
            toast.error(res.error);
            return
        }
      toast.success("Login successful!");
      navigate("/settings");
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        toast.error("Cannot connect to server. Please check your internet connection.");
      } else {
        // Handle other errors
        toast.error(error.message || "An unknown error occurred");
      }
      console.error("Signup error:", error);
    }finally {
      setIsLoading(false);
    }
  };
  const handleGithubLogin = () => {
    try {
      setIsLoading(true);
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    } catch (error) {
      toast.error(error.message);
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-10/12 lg:pr-15">
      <div className="bg-grayA p-10 rounded-lg lg:min-w-3/12 shadow-xl/20 shadow-gray-600 inset-shadow-sm inset-shadow-gray-200/10">
        <h1 className="mb-8 font-semibold b">Login</h1>
        <form className="mb-5">
          <div className="pb-1.5">
            <label htmlFor="email" className="text-xs">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              placeholder="you@example.com"
              autoComplete="email"
              onChange={handleChange}
              className="w-full border-light border-1 rounded-md mt-1 pl-2 py-1.5 hover:cursor-pointer hover:border-gray-100  transition duration-200"
            />
          </div>

          <div className="mb-7">
            <label htmlFor="password" className="text-xs">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              autoComplete="new-password"
              onChange={handleChange}
              className="w-full border-light border-1 rounded-md mt-1 pl-2 py-1.5 hover:cursor-pointer hover:border-gray-100  transition duration-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleEmailLogin}
          disabled={isLoading}
            className="bg-primary text-black py-1.5 mt-3 w-full rounded-lg hover:bg-blue-300 hover:cursor-pointer transition duration-200"
          >
            {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    'Sign in'
                  )}
          </button>
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
          type="submit"
          onClick={handleGithubLogin}
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
export default LoginForm;