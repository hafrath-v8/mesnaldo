"use client";
import { motion } from "framer-motion";

export default function HeroHeader() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full bg-gray-900 rounded-t-lg border border-b-0 border-gray-700 py-4 px-4  "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl  mx-auto text-center">
        {/* Main Title */}
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight"
          variants={titleVariants}
        >
          <span className="text-white">MESSI </span>
          <span className="text-amber-500 mx-2 md:mx-4">VS</span>
          <span className="text-white">RONALDO</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base md:text-lg text-gray-300 mb-4 font-normal"
          variants={itemVariants}
        >
          The Ultimate Football Rivalry Analysis
        </motion.p>

        {/* Motto */}
        <motion.div 
          className="mt-2 pt-4 border-t border-gray-700 rounded-lg"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Analyzing every statistic in the greatest football rivalry of all time
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}