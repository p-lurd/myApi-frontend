import { useEffect, useState } from "react";

const StatusBoxes = ({ group }) => {
  const [data, setData] = useState([]);
  console.log("Received group prop:", group);
  useEffect(() => {
    if (group && Array.isArray(group)&& group.length > 0) {
        console.log("Setting data with:", group);
      setData(group);
    } else {
        console.log("Group is invalid:", group);
      }
  }, [group]);

  useEffect(() => {
    console.log(data)

  }, [data, group]);
  const TOTAL_BOXES = 30;
  // Build a fixed-size array (30), map responses into it, and pad the rest with null
  const statusBoxes = Array.from({ length: TOTAL_BOXES }).map((_, i) => data[i] || null);
  
  // Get color based on status
  const getStatusColor = (item) => {
    // console.log(item)
    if (!item) return "bg-gray-300"; // No response yet
    if (item.success && item.responsetime > 1500) return "bg-yellow-600"; // Delayed
    if (item.success) return "bg-green-600"; // Success
    return "bg-red-700"; // Failure
  };

  return (
    <div className="flex justify-center px-7 py-4 w-full">
        {/* <div className="flex gap-x-2 mx-6 w-full max-w-4xl border-2 border-amber-800 justify-center  px-3.5"> */}
      {statusBoxes.map((item, i) => (
        
        <div
          key={i}
          title={
            item
              ? `Success: ${item.success}, Time: ${item.responseTime}ms`
              : "No response"
          }
          className={`w-5 h-8 rounded-lg ${getStatusColor(item)} mr-1.5`}
        />
      ))}
    </div>
    // </div>
  );
};

export default StatusBoxes;

  