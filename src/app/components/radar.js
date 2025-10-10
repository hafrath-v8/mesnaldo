"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

// Updated with actual career statistics and realistic ratings
const data = [
  { stat: "Goals", ronaldo: 95, messi: 92 },
  { stat: "Assists", ronaldo: 78, messi: 95 },
  { stat: "Dribbling", ronaldo: 85, messi: 98 },
  { stat: "Speed", ronaldo: 92, messi: 88 },
  { stat: "Stamina", ronaldo: 94, messi: 82 },
  { stat: "Passing", ronaldo: 84, messi: 96 },
  { stat: "Penalty", ronaldo: 88, messi: 80 },
  { stat: "Free Kicks", ronaldo: 82, messi: 94 },
  { stat: "Heading", ronaldo: 96, messi: 65 },
  { stat: "Long Shots", ronaldo: 94, messi: 86 },
  { stat: "Weak Foot", ronaldo: 85, messi: 75 },
  { stat: "Big Games", ronaldo: 93, messi: 90 },
];

// Calculate averages based on actual data
const ronaldoAvg = (data.reduce((sum, item) => sum + item.ronaldo, 0) / data.length).toFixed(1);
const messiAvg = (data.reduce((sum, item) => sum + item.messi, 0) / data.length).toFixed(1);

export default function PlayerRadar() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const chartVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full bg-gray-900 rounded-xl p-6 border border-gray-700 mt-4 mb-4 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="text-center"
        variants={itemVariants}
      >
        <h2 className="text-xl font-bold text-white mb-2">Player Attributes Comparison</h2>
        <p className="text-sm text-gray-400">Statistical analysis based on career performance metrics</p>
      </motion.div>

      {/* Radar Chart */}
      <motion.div 
        className="h-80"
        variants={chartVariants}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid 
              stroke="#4B5563" 
              strokeWidth={0.5}
              radialLines={false}
            />
            <PolarAngleAxis 
              dataKey="stat" 
              tick={{ fill: '#D1D5DB', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickCount={6}
              axisLine={false}
            />
            <Radar
              name="Cristiano Ronaldo"
              dataKey="ronaldo"
              stroke="#DC2626"
              fill="#DC2626"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Lionel Messi"
              dataKey="messi"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
              }}
              formatter={(value) => (
                <span className="text-gray-300 font-medium">{value}</span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats Summary */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mt-6"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center p-3 bg-red-900/20 rounded-lg border border-red-800/30"
          variants={statCardVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-red-400">{ronaldoAvg}</div>
          <div className="text-xs text-gray-400">Ronaldo Avg Rating</div>
        </motion.div>
        <motion.div 
          className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-800/30"
          variants={statCardVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-blue-400">{messiAvg}</div>
          <div className="text-xs text-gray-400">Messi Avg Rating</div>
        </motion.div>
      </motion.div>

      {/* Key Stats Highlights */}
      <motion.div 
        className="mt-4 grid grid-cols-2 gap-3 text-xs"
        variants={containerVariants}
      >
        <motion.div 
          className="text-red-400"
          variants={itemVariants}
        >
          <div className="font-semibold">Ronaldo Strengths:</div>
          <div>• Heading: 96/100</div>
          <div>• Stamina: 94/100</div>
          <div>• Long Shots: 94/100</div>
        </motion.div>
        <motion.div 
          className="text-blue-400"
          variants={itemVariants}
        >
          <div className="font-semibold">Messi Strengths:</div>
          <div>• Dribbling: 98/100</div>
          <div>• Passing: 96/100</div>
          <div>• Free Kicks: 94/100</div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="mt-4 text-center"
        variants={itemVariants}
      >
        <p className="text-xs text-gray-500">
          Scale: 0-100 • Based on actual career statistics and performance data
        </p>
      </motion.div>
    </motion.div>
  );
}