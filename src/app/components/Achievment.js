"use client";
import { Trophy, Globe, Flag, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
export default function AllTimeTrophies() {
  const players = [
    {
      name: "Messi",
      img: "/messi.png",
      trophies: [
        { title: "Total Trophies", count: 44, icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
        { title: "International", count: 4, icon: <Globe className="w-5 h-5 text-blue-400" /> },
        { title: "Ballon d'Or", count: 8, icon: <Award className="w-5 h-5 text-amber-500" /> },
        { title: "Golden Boot", count: 6, icon: <Flag className="w-5 h-5 text-red-400" /> },
      ],
    },
    {
      name: "Ronaldo",
      img: "/rony.png",
      trophies: [
        { title: "Total Trophies", count: 35, icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
        { title: "International", count: 2, icon: <Globe className="w-5 h-5 text-blue-400" /> },
        { title: "Ballon d'Or", count: 5, icon: <Award className="w-5 h-5 text-amber-500" /> },
        { title: "Golden Boot", count: 4, icon: <Flag className="w-5 h-5 text-red-400" /> },
      ],
    },
  ];

  return (
    <div className="w-full mb-6 max-w-5xl mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">All-Time Trophies & Awards</h2>
        <p className="text-sm text-gray-400">Major trophies & individual honors</p>
      </div>

      {/* Players */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {players.map((player) => (
          <div key={player.name} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">{player.name}</h3>

            <div className="grid grid-cols-2 gap-4">
              {player.trophies.map((trophy, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center bg-gray-700 p-3 rounded-lg"
                >
                  {trophy.icon}
                  <span className="text-white font-bold text-lg">{trophy.count}</span>
                  <span className="text-xs text-gray-400 text-center">{trophy.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Single Footer Link */}
      <div className="flex justify-center">
        <Link
          href="/Achievments"
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
    </div>
  );
}