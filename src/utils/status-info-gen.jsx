import success from "../assets/success.svg";
import warning from "../assets/warning.svg";
import error from "../assets/error.svg";

export const getStatusInfo = (response) => {
  if (!response) {
    return {
        text: "No Data",
        icon: <img src={error} alt="Error Icon" className="w-4.5 mr-1" />,
        priority: 0
      };
  }

  if (response.success && response.responsetime > 1500) {
    return {
      text: "Partial Outage",
      icon: <img src={warning} alt="Warning Icon" className="w-4.5 mr-1" />,
      priority: 2
    };
  }

  if (!response.success) {
    return {
      text: "Major Outage",
      icon: <img src={error} alt="Error Icon" className="w-4.5 mr-1" />,
      priority: 3
    };
  }

  return {
    text: "System Operational",
    icon: <img src={success} alt="Success Icon" className="w-4.5 mr-1" />,
    priority: 1
  };
};

  