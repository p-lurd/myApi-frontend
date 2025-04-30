import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function AuthorizedUserForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);
  const { businesses, user, setSelectedBusiness, selectedBusiness } = useAuth();
//   remove message and use toast

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        
    setIsSubmitting(true);

    // Validate input
    if (!email || !email.includes("@")) {
        toast.error("Please use a valid email")
      setIsSubmitting(false);
      return;
    }
    const toastId = toast.loading("please wait...")
    const dataToSend = {
        name: selectedBusiness.name,
        businessId: selectedBusiness._id,
        email,
        role
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/businesses/worker`,{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(dataToSend),
        credentials: "include"
    })
    const data = response.json();
    toast.dismiss(toastId);
    if(response.ok){
        toast.success("worker preauthorization successfully");
        setEmail("");
        setRole("admin");
    }else{
        throw new Error(data.message || `Something went wrong: ${response.status}`);
    }
    toast.dismiss(toastId);
    } catch (error) {
        toast.error(error.message);
    }finally{
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full rounded-xl border-2 border-gray-600 p-5 lg:h-70">
      <h1 className="font-semibold text-xl mb-3">Add an authorized user</h1>
      
      <div>
      <div className="mb-5">
          <label className="mb-2 font-light text-md">Role:</label>
          <div className="flex gap-4 mt-2">
            {["superadmin", "admin", "support"].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name="role"
                  value={option}
                  checked={role === option}
                  onChange={() => setRole(option)}
                  className="mr-2"
                  disabled={isSubmitting}
                />
                <label htmlFor={option} className="capitalize">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 font-light text-md">Email:</label>
          <input 
            type="text" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-600 rounded-2xl pl-2 p-1 w-full" 
            disabled={isSubmitting}
          />
        </div>
        
        
        
        <div className="flex justify-end">
        <button 
          onClick={handleSubmit}
          className="bg-final border-2 border-final mr-2 px-4 py-2 rounded-2xl text-primary font-medium  hover:cursor-pointer hover:bg-gray-900 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding user..." : "Add user"}
        </button>
        </div>
      </div>
      
      {/* {message && (
        <div 
          className={`mt-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )} */}
    </div>
  );
}