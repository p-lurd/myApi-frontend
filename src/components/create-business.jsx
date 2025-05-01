import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgUrl from  "../assets/bg.svg"
import { useState } from "react";
import { toast } from "react-toastify";

const CreateBusiness = () => {
  const navigate = useNavigate();
  const { businesses, user, setSelectedBusiness, fetchBusinesses } = useAuth();
  const [formData, setFormData] = useState('');

//   if (businesses.length > 0) {
//     navigate("/businesses");
//   }
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData(value);
  };

  const submitBusiness = async (e) => {
    e.preventDefault();
    try {
        const toastId = toast.loading("please wait...")
        if (!formData) {
            toast.error("Business name is required");
            return;
        }
        if(!user){
            toast.error("please login first");
            navigate('/login')
            return;
        }
        const {email, githubId} = user;
        const ownerId = user._id;
        const response = await fetch(`${import.meta.env.VITE_API_URL}/businesses`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData,
                email,
                githubId,
                ownerId
            }),
            credentials: "include",
        })
        const businessResponse = await response.json();
        if(!response.ok){
            toast.dismiss(toastId);
            toast.error(`Failed to create business: ${businessResponse.message}`);
            return;
        }else{
            const fetchData = {
                name: formData,
                businessId: businessResponse._id,
                email,
                role: "superadmin",
            }
            console.log({fetchData})
            const res = await fetch(`${import.meta.env.VITE_API_URL}/businesses/worker`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fetchData),
                credentials: "include",
            })
            const UBresponse = await res.json();
            if(!response.ok){
                toast.dismiss(toastId);
                toast.error(`Failed to create business: ${UBresponse.message}`);
                return;
            }
            setSelectedBusiness(businessResponse)
        }
        toast.dismiss(toastId);
        toast.success("Business successfully created");
        fetchBusinesses(user);
        setFormData("")
    } catch (error) {
        console.error("Authentication check failed:", error);
        toast.error(error.message)
    }
  };
  return (
      <div className="flex flex-col w-full justify-center rounded-xl border-2 border-gray-600 p-5 lg:h-70">
        <h1 className="mb-3 text-2xl font-semibold">Create Business</h1>
      <label htmlFor="businessName" className="mb-3 text-xl">Business Name:</label>
        {/* <textarea class="resize-none rounded-md border-3 border-grayA" id="businessName"></textarea> */}
        <input type="text" id="businessName" name="businessName" value={formData} onChange={handleChange} className="border-2 border-gray-600 h-10 rounded-3xl pl-5"/>
        <div className="flex flex-row justify-end">
        <button 
        className=" bg-final border-2 border-final mr-2 px-5 py-2 rounded-2xl text-primary font-medium mt-5 hover:cursor-pointer hover:bg-gray-900"
        onClick={submitBusiness}
        >
            Create
        </button>
        </div>
        {/* <div className="flex flex-row justify-end">
        <Link 
        className="mt-10 flex flex-row items-center hover:cursor-pointer text-sm"
        to={'/dashboard'}
        >
            Skip for now <ChevronRight color="white" size={20} /><ChevronRight color="white" size={20} />
        </Link>
        </div> */}
        </div>
  )
};

export default CreateBusiness;
