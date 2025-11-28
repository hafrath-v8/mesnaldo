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
      <div className="max-w-4xl h-20 md:h-30 mx-auto text-center">
        
      </div>
    </motion.div>
  );
}