import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const AddApi = () => {
  const { selectedBusiness } = useAuth();
  const [apiData, setApiData] = useState({
    name: "",
    route: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setIsSubmitting(true);

      // Validate input
      if (!apiData.name || !apiData.route) {
        toast.error("Add API: All fields are required for submission");
        setIsSubmitting(false);
        return;
      }
      const toastId = toast.loading("please wait...");
      const dataToSend = {
        url: apiData.route,
        businessId: selectedBusiness._id,
        apiName: apiData.name,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/create`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(dataToSend),
          credentials: "include",
        }
      );
      const data = response.json();
      console.log({ data });
      toast.dismiss(toastId);
      if (response.ok) {
        toast.success("api route created successfully successfully");
        setApiData({ name: "", route: "" });
        return;
      }
      if (response.status === 403) {
        throw new Error("You don't have permission to do this");
      }
      toast.dismiss(toastId);
      throw new Error(
        data.message || `Something went wrong: ${response.status}`
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <h1 className="font-semibold text-xl mb-3">Add new API to monitor</h1>
      <div className=" flex flex-col lg:flex-row space-y-5 lg:space-x-10">
        <div className="label-input w-full flex flex-col">
          <label htmlFor="apiName" className="mb-2 font-light text-md">
            API name:
          </label>
          <input
            id="apiName"
            type="text"
            name="name"
            placeholder="API"
            value={apiData.name}
            onChange={handleChange}
            className="border-2 border-gray-600 h-10 rounded-2xl pl-2 p-1 w-full hover:cursor-pointer hover:border-gray-100  transition duration-200"
          />
        </div>
        <div className="label-input w-full flex flex-col ">
          <label htmlFor="route" className="mb-2 font-light text-md">
            Route:
          </label>
          <input
            id="route"
            type="text"
            name="route"
            placeholder="https://"
            value={apiData.route}
            onChange={handleChange}
            className="border-2 border-gray-600 h-10 rounded-2xl pl-2 p-1 w-full hover:cursor-pointer hover:border-gray-100  transition duration-200"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-final border-2 border-final mr-2 px-4 py-2 rounded-2xl text-primary font-medium  hover:cursor-pointer hover:bg-gray-900 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding api..." : "Add api"}
        </button>
      </div>
    </>
  );
};

export default AddApi;
