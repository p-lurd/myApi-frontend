import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export default function AIInsight() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);

  const fetchInsight = async () => {
    setLoading(true);
    setInsight(null);

    try {
      const res = await fetch(`${apiUrl}/api/monitoring/insight`);
      console.log({res})
      const data = await res.json();
      setInsight(data.message); 
    } catch (err) {
      console.log({err})
      setInsight("Failed to fetch insight ❌");
    } finally {
      // setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    fetchInsight();
  };

  return (
    <>
      {/* Card button */}
      <div
        onClick={handleOpen}
        className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 
                   text-white text-center py-4 px-7 rounded-xl shadow-md 
                   hover:scale-105 transition-transform"
      >
        Get AI Insight
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
            
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              AI Insight
            </h2>

            {loading ? (
              <div className="animate-pulse bg-gray-300 h-20 w-full rounded-md" />
            ) : (
              <p className="text-gray-700">{insight}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
