"use client";
import Image from "next/image";

export default function InternationalAllTime() {
  const players = [
    { 
      name: "Messi", 
      tournament: "International Career",
      apps: 195, 
      goals: 114, 
      assists: 60,
      goalColor: "bg-blue-400", 
      assistColor: "bg-blue-600",
      img: "/messi.png" 
    },
    { 
      name: "Ronaldo", 
      tournament: "International Career",
      apps: 226, 
      goals: 143, 
      assists: 37,
      goalColor: "bg-red-400", 
      assistColor: "bg-red-600",
      img: "/rony.png" 
    },
  ];

  // Calculate percentages
  const playersWithStats = players.map(player => ({
    ...player,
    goalPercentage: player.apps > 0 ? (player.goals / player.apps) * 100 : 0,
    assistPercentage: player.apps > 0 ? (player.assists / player.apps) * 100 : 0,
    totalPercentage: player.apps > 0 ? ((player.goals + player.assists) / player.apps) * 100 : 0,
  }));

  const winner = playersWithStats.reduce((prev, curr) =>
    curr.totalPercentage > prev.totalPercentage ? curr : prev
  );

  return (
    <div className="w-full mb-4 max-w-5xl mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700">

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-white mb-1">All-Time International Efficiency</h2>
        <p className="text-sm text-gray-400">Goals & assists per appearance</p>
      </div>

      {/* Winner */}
      <div className="flex items-center justify-center gap-3 mb-4 p-3 bg-gray-800 rounded-lg">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={winner.img}
            alt={winner.name}
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-amber-400">
          Highest efficiency: <span className="font-semibold">{winner.name}</span> ({winner.totalPercentage.toFixed(1)}%)
        </span>
      </div>

      {/* Players */}
      <div className="space-y-6">
        {playersWithStats.map((player) => (
          <div key={player.name} className="space-y-3">
            {/* Player Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                  <Image
                    src={player.img}
                    alt={player.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-medium text-white">{player.name}</span>
                  <p className="text-xs text-gray-400">{player.tournament}</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-white">
                {player.totalPercentage.toFixed(1)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden">
                <div className="w-full h-6 bg-gray-600"></div>
                
                <div 
                  className={`${player.goalColor} h-6 absolute top-0 left-0 rounded-full`}
                  style={{ width: `${player.goalPercentage}%` }}
                ></div>
                
                <div 
                  className={`${player.assistColor} h-6 absolute top-0 left-0 rounded-full`}
                  style={{ width: `${player.assistPercentage}%` }}
                ></div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded ${player.goalColor}`}></div>
                    <span>{player.goals} goals</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded ${player.assistColor}`}></div>
                    <span>{player.assists} assists</span>
                  </div>
                </div>
                <span>{player.apps} apps</span>
              </div>

              {/* Efficiencies */}
              <div className="text-center text-xs text-gray-300 pt-1">
                Goal: {player.goalPercentage.toFixed(1)}% • Assist: {player.assistPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
