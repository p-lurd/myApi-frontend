import { motion } from "motion/react";
const SmoothTypewriter = ({ text, delay = 0, className = "" }) => {
  return (
    <motion.span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: delay + (index * 0.05),
            duration: 0.8
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
export const SmoothWordWriter = () => {
  return (
    <div className="text-center max-w-4xl mx-auto px-4">
      <motion.h1 
        className="font-light text-2xl md:text-5xl flex flex-col items-center mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SmoothTypewriter 
          text="Real-Time API Monitoring &"
          delay={0}
          className="block"
        />
        <SmoothTypewriter 
          text="Uptime Tracking"
          delay={1}
          className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2"
        />
      </motion.h1>

      <motion.h3 
        className="font-extralight text-xs md:text-lg text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1.5 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Monitor API uptime, response times, and failures in real-time.
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-gray-400"
        >
          Get instant alerts, detailed logs, and historical insights to ensure
          your APIs stay reliable and performant.
        </motion.span>
      </motion.h3>
    </div>
  );
};