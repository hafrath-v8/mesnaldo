"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GoalsVsAssists() {
  const players = [
    { 
      name: "Messi", 
      apps: 1125, 
      goals: 884, 
      assists: 392,
      goalColor: "bg-blue-400", 
      assistColor: "bg-blue-600",
      img: "/messi.png" 
    },
    { 
      name: "Ronaldo", 
      apps: 1289, 
      goals: 946, 
      assists: 258,
      goalColor: "bg-red-400", 
      assistColor: "bg-red-600",
      img: "/rony.png" 
    },
  ];

  // Calculate percentages
  const playersWithStats = players.map(player => ({
    ...player,
    goalPercentage: (player.goals / player.apps) * 100,
    assistPercentage: (player.assists / player.apps) * 100,
    totalPercentage: ((player.goals + player.assists) / player.apps) * 100
  }));

  const winner = playersWithStats.reduce((prev, curr) => 
    curr.totalPercentage > prev.totalPercentage ? curr : prev
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const barVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-ful mb-4 max-w-5xl mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-4"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold text-white mb-1">All Time With SPL,MLS</h2>
        <p className="text-sm text-gray-400">Contributions per appearance</p>
      </motion.div>

      {/* Winner Indicator */}
      <motion.div 
        className="flex items-center justify-center gap-3 mb-4 p-3 bg-gray-800 rounded-lg"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="w-8 h-8 rounded-full overflow-hidden"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={winner.img}
            alt={winner.name}
            width={32}
            height={32}
            className="object-cover"
          />
        </motion.div>
        <span className="text-sm font-medium text-amber-400">
          Highest efficiency: <span className="font-semibold">{winner.name}</span> ({winner.totalPercentage.toFixed(1)}%)
        </span>
      </motion.div>

      {/* Comparison */}
      <div className="space-y-6">
        {playersWithStats.map((player, index) => (
          <motion.div 
            key={player.name} 
            className="space-y-3"
            variants={itemVariants}
          >
            {/* Player Info */}
            <motion.div 
              className="flex items-center justify-between"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-full overflow-hidden border border-gray-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={player.img}
                    alt={player.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </motion.div>
                <span className="font-medium text-white">{player.name}</span>
              </div>
              <motion.span 
                className="text-lg font-semibold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                {player.totalPercentage.toFixed(1)}%
              </motion.span>
            </motion.div>

            {/* Progress Bar Stack */}
            <div className="space-y-1">
              {/* Base Layer - Appearances */}
              <motion.div 
                className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden"
                variants={progressVariants}
              >
                {/* Full width representing total appearances */}
                <div className="w-full h-6 bg-gray-600"></div>
                
                {/* Goals Layer - on top of appearances */}
                <motion.div 
                  className={`${player.goalColor} h-6 absolute top-0 left-0 rounded-full transition-all duration-500`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                  style={{ width: `${player.goalPercentage}%` }}
                ></motion.div>
                
                {/* Assists Layer - on top of goals */}
                <motion.div 
                  className={`${player.assistColor} h-6 absolute top-0 left-0 rounded-full transition-all duration-500`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                  style={{ width: `${player.assistPercentage}%` }}
                ></motion.div>
              </motion.div>

              {/* Stats Breakdown */}
              <motion.div 
                className="flex justify-between text-xs text-gray-400"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-3 h-3 rounded ${player.goalColor}`}></div>
                    <span>{player.goals} goals</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-3 h-3 rounded ${player.assistColor}`}></div>
                    <span>{player.assists} assists</span>
                  </motion.div>
                </div>
                <span>{player.apps} appearances</span>
              </motion.div>

              {/* Efficiency Stats */}
              <motion.div 
                className="text-center text-xs text-gray-300 pt-1"
                variants={itemVariants}
              >
                Goal efficiency: {player.goalPercentage.toFixed(1)}% • 
                Assist efficiency: {player.assistPercentage.toFixed(1)}%
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}