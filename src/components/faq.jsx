import React from "react";
import arrow_down from "../assets/arrow_down.svg";
import {motion, AnimatePresence} from "motion/react"

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const toggleDetail = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    const faqs = [
        {
            question: "What is weUp?",
            answer: "We are an API monitoring tool. We provide insightful information about your API."
        },
        {
            question: "How does weUp work?",
            answer: "We ping your route at specific intervals, analyze the response, and provide you and your users with insightful information."
        },
        {
            question: "What type of APIs can I monitor?",
            answer: "We currently only monitor REST APIs, but we are working to include more."
        },
        {
            question: "How do I start?",
            answer: "We provide users with a variety of customized options that fit their needs. Generally, you can sign up and list your APIs for us to monitor."
        }
    ];

    return (
        <div className="mt-10 md:px-16 flex flex-col items-center">
            <h1 className="text-center font-semibold text-3xl mb-25 md:mb-6">FAQs</h1>
            <div className="space-y-4 flex flex-col items-center w-full px-4 md:w-4/6">
                {faqs.map((faq, index) => (
                    <motion.div key={index} className="bg-gray-900 px-5 py-6 text-sm md:py-8 rounded-md w-full" initial={{y:-100, scale:1}} whileInView={{y:0, scale:1, transition:{duration:1.2}}}>
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDetail(index)}
                            role="button"
                            aria-expanded={openIndex === index}
                        >
                            <h2 className="font-medium">{faq.question}</h2>
                            <img
                                src={arrow_down}
                                alt="Toggle answer"
                                className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </div>
                        <AnimatePresence>
    {openIndex === index && (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
        >
            <motion.p className="mt-2 text-gray-400 pb-2">
                {faq.answer}
            </motion.p>
        </motion.div>
    )}
</AnimatePresence>

                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;




// import React from "react";
// import arrow_down from "../assets/arrow_down.svg";

// const FAQ = () => {
//     const [openIndex, setOpenIndex] = React.useState<Number | null>(null);
//   const faqs = [
//     {
//       question: "What is weUp?",
//       answer:
//         "We are an API monitoring tool. We provide insightful information about your API.",
//     },
//     {
//       question: "How does weUp work?",
//       answer:
//         "We ping your route at specific intervals, note and analuse the response, and provide you and your users with insightful information.",
//     },
//     {
//       question: "What type of APIs can I monitor?",
//       answer:
//         "We currently only monitor REST apis but we are working to include more.",
//     },
//     {
//       question: "How do I start?",
//       answer:
//         " We provide our users with a variety of cutomised options that fits their needs but generally you can signup and list your Apis for us to help you with.",
//     },
//   ];

//   const toggleDetail = (index) => {
//     setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
//   };
//   return (
//     <div className="mt-35">
//       <h1 className="text-center font-semibold text-3xl mb-5">FAQs</h1>
//       <div className="">
//         {faqs.map((faq, index) => (
//           <div className="mb-4" key={index}>
//             <div className="flex " onClick={() => toggleDetail(index)}>
//               <h1>{faq.question}</h1>
//               <img
//                 src={arrow_down}
//                 alt=""
//                 className={`transition-transform ${
//                   openIndex === index ? "rotate-180" : ""
//                 }`}
//               />
//             </div>
//             {openIndex === index && (
//               <p className="mt-2 text-gray-600">{faq.answer}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQ;
