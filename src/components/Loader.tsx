import React from 'react';
import { motion } from 'motion/react';

const Loader: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-12">
      <div className="relative h-16 w-16">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="h-full w-full bg-blue-600 opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360],
            borderRadius: ["50%", "20%", "50%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="absolute inset-0 m-auto h-8 w-8 bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Loader;
