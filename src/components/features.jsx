import statitics_bar from "../assets/statistics_bars.svg"
import statitics_graph from "../assets/statistics_graphs.svg"
import on_phone from "../assets/on_phone.svg"
import infographics from "../assets/infographics.svg"

const FeatureCard = ({ title, description, icon }) => {
    return (
      <div className="bg-quad rounded-lg overflow-hidden p-5">
        <div className="bg-gray-900 p-8 flex items-center justify-center h-38 md:h-48">
          <img src={icon} alt="" className="max-h-32 w-auto" />
        </div>
        <div className="py-3 md:py-6">
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    );
  };

const Features = () => {
    const features = [
        {
            title: "Real-time Monnitoring",
            description: "Continuous monitoring with second by second updates and notifications.",
            icon: statitics_bar
        },
        {
            title: "Automated Reports",
            description: "Insights into error rates, and uptime percentages.",
            icon: statitics_graph
        },
        {
            title: "Smart Alerts",
            description: "Multi-channel notifications when issues are detected",
            icon: on_phone
        },
        {
            title: "Powerful Analytics",
            description: "Performance metrics tracking with customizable dashboards",
            icon: infographics
        }
    ]
    return ( 
      <div className="w-full flex flex-col items-center md:items-start px-3 md:px-0">
        <div className="my-20 w-full">
            <h1 className="text-white font-semibold text-4xl mb-25 text-center">Key Features</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index)=>(
                    <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
            </div>
        </div>
        </div>
     );
}
 
export default Features;