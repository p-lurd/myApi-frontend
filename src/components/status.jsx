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
  // Build a fixed-size array (30), with nulls first followed by responses
const statusBoxes = Array.from({ length: TOTAL_BOXES }).map((_, i) => {
  const dataIndex = i - (TOTAL_BOXES - data.length);
  return dataIndex >= 0 ? data[dataIndex] : null;
});
  
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
  <div 
    className="flex w-full max-w-6xl min-w-[300px] justify-center" 
    style={{ 
      gap: "clamp(2px, 1vw, 10px)"  // Gap that grows from 2px to 10px
    }}
  >
    {statusBoxes.map((item, i) => (
      <div
        key={i}
        title={
          item
            ? `Success: ${item.success}, Time: ${item.responseTime}ms`
            : "No response"
        }
        className={`
          rounded-2xl 
          ${getStatusColor(item)}
          h-[15px] sm:h-[16px] md:h-[24px] lg:h-[32px] xl:h-[40px]
        `}
        style={{ 
          width: "clamp(6px, 1.3vw, 20px)",  // Width that grows from 6px to 16px
          // height: "clamp(7px, 7vh, 40px)"
        }}
      />
    ))}
  </div>
</div>
  );
};

export default StatusBoxes;

  