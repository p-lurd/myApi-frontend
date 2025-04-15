import React from 'react';
import ArrowRightIcon from "../assets/arrow.svg";
import bg2Url from "../assets/bg2.svg"
const Works = () => {
    const steps = [
        {
          number: 1,
          title: "Connect",
          descriptionParts: ["Add API endpoints and", "group in environments"]
        },
        {
          number: 2,
          title: "Configure",
          descriptionParts: ["Set up monitoring", "parameters"]
        },
        {
          number: 3,
          title: "Monitor", 
          descriptionParts: ["Track performance in", "real-time"]
        },
        {
          number: 4,
          title: "Respond",
          descriptionParts: ["Get notified and resolve", "issues quickly"]
        }
      ];
    
      return (
        <div className="py-16 px-4 md:px-8"
        style={{ backgroundImage: `url(${bg2Url})` }}
        >
          <h2 className="text-white text-center text-3xl md:text-4xl font-semibold mb-12">How it Works</h2>
          
          <div className="flex flex-col md:flex-row justify-evenly items-center max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center mb-8 md:mb-0">
                  <div className="bg-white text-gray-900 w-22 h-22 md:w-30 md:h-30 rounded-full flex items-center justify-center md:text-3xl font-semibold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-white text-sm md:text-xl font-light md:font-medium mb-2">{step.title}</h3>
                  <p className="text-white text-center max-w-xs font-extralight text-xs md:text-sm md:font-medium">
                    {step.descriptionParts[0]}
                    <br />
                    {step.descriptionParts[1]}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block transform rotate-0">
                    <img src={ArrowRightIcon} alt="" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
}
 
export default Works;