"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Bio() {
  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const vsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`w-full bg-gray-900 rounded-b-lg border border-gray-700 border-t-0 p-3 sm:p-4 ${inter.className}`}>
      {/* Top player images and VS */}
      <div className="flex max-w-4xl mx-auto justify-between items-center">
        {/* Ronaldo */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <motion.div 
            className="bg-red-600 w-4 absolute right-0 h-4 rounded-full"
            variants={pulseVariants}
            animate="pulse"
          />
          <Image
            src="/rony.png"
            alt="Cristiano Ronaldo"
            className="w-40 h-40 sm:w-50 sm:h-50 md:w-65 md:h-65 lg:w-75 lg:h-75 rounded-lg border-2 border-red-600/30"
            width={160}
            height={160}
          />
        </motion.div>

        {/* VS */}
        <motion.span 
          className="text-amber-400 text-sm sm:text-lg md:text-2xl font-extrabold tracking-wide"
          initial="hidden"
          animate="visible"
          variants={vsVariants}
        >
          VS
        </motion.span>

        {/* Messi */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <motion.div 
            className="bg-blue-400 w-4 absolute right-0 h-4 rounded-full"
            variants={pulseVariants}
            animate="pulse"
          />
          <Image
            src="/messi.png"
            alt="Lionel Messi"
            className="w-40 h-40 sm:w-50 sm:h-50 md:w-65 md:h-65 lg:w-75 lg:h-75 rounded-lg border-2 border-blue-400/30"
            width={160}
            height={160}
          />
        </motion.div>
      </div>

      {/* Player stats */}
      <div className="max-w-4xl mt-[-10] sm:mt-[-20] gap-3 mx-auto flex justify-between sm:text-lg text-sm">
        {/* Ronaldo stats */}
        <motion.div 
          className="flex items-end w-40 sm:w-50 md:w-65 lg:w-75 mt-6 flex-col"
          initial="hidden"
          animate="visible"
          variants={statsVariants}
          transition={{ delay: 0.2 }}
        >
          <span className="font-semibold text-gray-100">Cristiano Ronaldo</span>
          <span className="text-gray-300">40</span>
          <span className="text-gray-300">Portugal</span>
        </motion.div>

        {/* Labels */}
        <motion.div 
          className="flex items-center text-amber-400 mt-6 flex-col"
          initial="hidden"
          animate="visible"
          variants={statsVariants}
          transition={{ delay: 0.3 }}
        >
          <span className="font-medium">NAME</span>
          <span className="font-medium">AGE</span>
          <span className="font-medium">NATION</span>
        </motion.div>

        {/* Messi stats */}
        <motion.div 
          className="flex w-40 sm:w-50 md:w-65 lg:w-75 mt-6 flex-col"
          initial="hidden"
          animate="visible"
          variants={statsVariants}
          transition={{ delay: 0.4 }}
        >
          <span className="font-semibold text-gray-100">Lionel Messi</span>
          <span className="text-gray-300">37</span>
          <span className="text-gray-300">Argentina</span>
        </motion.div>
      </div>
    </div>
  );
}