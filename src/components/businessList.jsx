// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import bgUrl from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";
import { Plug2Icon } from "lucide-react";
import { toast } from "react-toastify";

const BusinessList = () => {
  const { user, businesses, selectedBusiness, setSelectedBusiness } = useAuth();
  const [doneHere, setDoneHere] = useState(false);
  const navigate = useNavigate();
  // it should be able to get event and still select business
  const handleBusinessChange = (business) => {
    setSelectedBusiness(business);
    setDoneHere(true);
    // navigate("/dashboard");
  };
  useEffect(() => {
    if(selectedBusiness && doneHere){
      toast.success(`${selectedBusiness.name} selected successfully`);
      setDoneHere(false)
    }
  }, [selectedBusiness, doneHere]);
  useEffect(() => {
    if (!user){
      navigate('/login')
       return null // Should never happen due to ProtectedRoute
      };
  }, []);
  return (
    <div className="w-full  rounded-xl border-2 border-gray-600 p-5 lg:h-70 justify-center">
        <h1 className="mb-6 text-xl">Select Business:</h1>
        <div>
          

          {businesses.length > 0 ? (
            <div className="border-1 border-gray-600 rounded-lg p-4 lg:max-h-45 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <h3 className="mb-2">Your Businesses:</h3>
              <ul className="business-list">
                {businesses.map((business) => (
                  <li
                    key={business._id}
                    className={`business-item hover:cursor-pointer border-2 border-gray-600 p-2 rounded-2xl flex flex-row items-center justify-between mb-2 ${
                      selectedBusiness?.id === business.id
                        ? "selected-business"
                        : ""
                    }`}
                    onClick={() => handleBusinessChange(business)}
                  >
                    <Plug2Icon></Plug2Icon>
                    {business.name}
                    <div>
                    {selectedBusiness?._id === business._id && (
                      <span className="active-indicator"> (Active)</span>
                    )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No businesses available. Please contact your administrator.</p>
          )}
        </div>
      </div>
  )
};

export default BusinessList;

// {selectedBusiness && (
//   <div>
//     <h2>{selectedBusiness.name}</h2>
//     {/* Dashboard content specific to the selected business */}
//     {/* For example, showing API endpoints for this business */}
//     <div>
//       <h3>API Endpoints</h3>
//       {/* List of API endpoints for monitoring */}
//     </div>
//   </div>
// )}
