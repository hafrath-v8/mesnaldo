"use client";
import { Inter } from "next/font/google";
import Art from "../components/interart"
import Footer from "../components/footer"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Helper function to determine the color for the winning stat
const getStatColor = (value, opponentValue, playerColor, neutralColor = 'text-gray-300') => {
    if (value === undefined) return 'text-gray-500';
    if (opponentValue === undefined) return playerColor;
    if (value > opponentValue) return playerColor + ' font-extrabold';
    if (value === opponentValue) return 'text-amber-300 font-bold';
    return neutralColor;
};

export default function ClubComparisonPage() {
  const clubCareer = {
    ronaldo: [
      { season: "2003", club: "Portugal", apps: 2, goals: 0, assists: 0, trophies: 1 },
      { season: "2004", club: "Portugal", apps: 16, goals: 7, assists: 7, trophies: 9 },
      { season: "2005", club: "Portugal", apps: 11, goals: 2, assists: 2, trophies: 16 },
      { season: "2006", club: "Portugal", apps: 14, goals: 6, assists: 1, trophies: 5 },
      { season: "2007", club: "Portugal", apps: 10, goals: 5, assists: 1, trophies: 0 },
      { season: "2008", club: "Portugal", apps: 8, goals: 1, assists: 1, trophies: 2 },
      { season: "2009", club: "Portugal", apps: 7, goals: 1, assists: 0, trophies: 3 },
      { season: "2010", club: "Portugal", apps: 11, goals: 3, assists: 4, trophies: 0 },
      { season: "2011", club: "Portugal", apps: 8, goals: 7, assists: 2, trophies: 0 },
      { season: "2012", club: "Portugal", apps: 13, goals: 5, assists: 2, trophies: 1 },
      { season: "2013", club: "Portugal", apps: 9, goals: 10, assists: 1, trophies: 0 },
      { season: "2014", club: "Portugal", apps: 9, goals: 5, assists: 1, trophies: 0 },
      { season: "2015", club: "Portugal", apps: 5, goals: 3, assists: 0, trophies: 0 },
      { season: "2016", club: "Portugal", apps: 13, goals: 13, assists: 2, trophies: 1 },
      { season: "2017", club: "Portugal", apps: 11, goals: 11, assists: 4, trophies: 0 },
      { season: "2018", club: "Portugal", apps: 7, goals: 6, assists: 1, trophies: 0 },
      { season: "2019", club: "Portugal", apps: 10, goals: 14, assists: 0, trophies: 0 },
      { season: "2020", club: "Portugal", apps: 6, goals: 3, assists: 1, trophies: 0 },
      { season: "2021", club: "Portugal", apps: 14, goals: 13, assists: 1, trophies: 0 },
      { season: "2022", club: "Portugal", apps: 12, goals: 3, assists: 2, trophies: 0 },
      { season: "2023", club: "Portugal", apps: 9, goals: 10, assists: 2, trophies: 0 },
      { season: "2024", club: "Portugal", apps: 12, goals: 7, assists: 2, trophies: 0 },
      { season: "2025", club: "Portugal", apps: 6, goals: 6, assists: 0, trophies: 0 },



    ],
    messi: [
      { season: "2003", club: "Argentina", apps: 0, goals: 0, assists: 0, trophies: 1 },
      { season: "2004", club: "Argentina", apps: 0, goals: 0, assists: 0, trophies: 35 },
      { season: "2005", club: "Argentina", apps: 5, goals: 0, assists: 1, trophies: 3 },
      { season: "2006", club: "Argentina", apps: 7, goals: 2, assists: 1, trophies: 1 },
      { season: "2007", club: "Argentina", apps: 14, goals: 6, assists: 4, trophies: 0 },
      { season: "2008", club: "Argentina", apps: 8, goals: 2, assists: 2, trophies: 0 },
      { season: "2009", club: "Argentina", apps: 10, goals: 3, assists: 1, trophies: 1 },
      { season: "2010", club: "Argentina", apps: 10, goals: 2, assists: 1, trophies: 0 },
      { season: "2011", club: "Argentina", apps: 13, goals: 4, assists: 9, trophies: 0 },
      { season: "2012", club: "Argentina", apps: 9, goals: 12, assists: 1, trophies: 0 },
      { season: "2013", club: "Argentina", apps: 7, goals: 6, assists: 4, trophies: 0 },
      { season: "2014", club: "Argentina", apps: 14, goals: 8, assists: 2, trophies: 1 },
      { season: "2015", club: "Argentina", apps: 8, goals: 4, assists: 3, trophies: 0 },
      { season: "2016", club: "Argentina", apps: 11, goals: 8, assists: 6, trophies: 0 },
      { season: "2017", club: "Argentina", apps: 7, goals: 4, assists: 0, trophies: 0 },
      { season: "2018", club: "Argentina", apps: 5, goals: 4, assists: 3, trophies: 0 },
      { season: "2019", club: "Argentina", apps: 10, goals: 5, assists: 2, trophies: 0 },
      { season: "2020", club: "Argentina", apps: 4, goals: 1, assists: 0, trophies: 0 },
      { season: "2021", club: "Argentina", apps: 16, goals: 9, assists: 5, trophies: 1 },
      { season: "2022", club: "Argentina", apps: 14, goals: 18, assists: 6, trophies: 1 },
      { season: "2023", club: "Argentina", apps: 8, goals: 8, assists: 1, trophies: 0 },
      { season: "2024", club: "Argentina", apps: 11, goals: 6, assists: 5, trophies: 0 },
      { season: "2025", club: "Argentina", apps: 3, goals: 2, assists: 0, trophies: 0 },
    ]
  };

  const careerTotals = {
    ronaldo: {
      apps: clubCareer.ronaldo.reduce((sum, s) => sum + s.apps, 0),
      goals: clubCareer.ronaldo.reduce((sum, s) => sum + s.goals, 0),
      assists: clubCareer.ronaldo.reduce((sum, s) => sum + s.assists, 0),
      trophies: clubCareer.ronaldo.reduce((sum, s) => sum + s.trophies, 0),
      clubs: [...new Set(clubCareer.ronaldo.map(s => s.club))].length,
      goalRatio: (clubCareer.ronaldo.reduce((sum, s) => sum + s.goals, 0) / clubCareer.ronaldo.reduce((sum, s) => sum + s.apps, 0)).toFixed(2),
      assistRatio: (clubCareer.ronaldo.reduce((sum, s) => sum + s.assists, 0) / clubCareer.ronaldo.reduce((sum, s) => sum + s.apps, 0)).toFixed(2)
    },
    messi: {
      apps: clubCareer.messi.reduce((sum, s) => sum + s.apps, 0),
      goals: clubCareer.messi.reduce((sum, s) => sum + s.goals, 0),
      assists: clubCareer.messi.reduce((sum, s) => sum + s.assists, 0),
      trophies: clubCareer.messi.reduce((sum, s) => sum + s.trophies, 0),
      clubs: [...new Set(clubCareer.messi.map(s => s.club))].length,
      goalRatio: (clubCareer.messi.reduce((sum, s) => sum + s.goals, 0) / clubCareer.messi.reduce((sum, s) => sum + s.apps, 0)).toFixed(2),
      assistRatio: (clubCareer.messi.reduce((sum, s) => sum + s.assists, 0) / clubCareer.messi.reduce((sum, s) => sum + s.apps, 0)).toFixed(2)
    }
  };

  const seasonComparison = [
    ...clubCareer.ronaldo.map(s => ({ ...s, player: "ronaldo" })),
    ...clubCareer.messi.map(s => ({ ...s, player: "messi" }))
  ]
    .reduce((acc, curr) => {
      const existing = acc.find(s => s.season === curr.season);
      if (existing) {
        existing[curr.player] = curr;
      } else {
        acc.push({ season: curr.season, [curr.player]: curr });
      }
      return acc;
    }, [])
    .sort((a, b) => b.season.localeCompare(a.season));

  const StatBar = ({ value, max, color, showValue = true }) => (
    <div className="flex items-center space-x-3">
      {showValue && <span className="text-white font-medium text-sm w-8">{value}</span>}
      <div className="flex-1 bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color} transition-width duration-500`} // Added transition
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    // Base layout with reduced max-width for better focus on desktop
    <div className={`w-full max-w-5xl mx-auto bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 ${inter.className}`}>

      {/* Header - Polished */}
      <div className="text-center mb-8 lg:mb-6 pb-4 border-b border-gray-700">
        <h1 className="text-3xl sm:text-4xl lg:text-3xl font-extrabold text-white mb-1 tracking-wider">
            INTERNATIONAL CAREER STATS
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
            year-by-year performance analysis of Ronaldo and Messi
        </p>
      </div>

      {/* Career Summary - Polished Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 lg:mb-8">
        
        {/* Ronaldo Summary */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-red-900/50 hover:shadow-red-900/50 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-500">Cristiano Ronaldo</h2>
              <p className="text-red-300 text-sm">{careerTotals.ronaldo.clubs} Team</p>
            </div>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
              {careerTotals.ronaldo.trophies} 🏆 Trophies
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400">{careerTotals.ronaldo.apps.toLocaleString()}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Apps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400">{careerTotals.ronaldo.goals.toLocaleString()}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400">{careerTotals.ronaldo.assists.toLocaleString()}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Assists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400">{careerTotals.ronaldo.goalRatio}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">G/A Ratio</div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-700/50">
            <div className="flex justify-between text-xs text-gray-300 font-semibold">
              <span>Goals per game</span>
              <span>{careerTotals.ronaldo.goalRatio}</span>
            </div>
            <StatBar value={parseFloat(careerTotals.ronaldo.goalRatio)} max={1} color="bg-red-500" showValue={false} />
            
            <div className="flex justify-between text-xs text-gray-300 font-semibold">
              <span>Assists per game</span>
              <span>{careerTotals.ronaldo.assistRatio}</span>
            </div>
            <StatBar value={parseFloat(careerTotals.ronaldo.assistRatio)} max={0.5} color="bg-red-500" showValue={false} />
          </div>
        </div>

        {/* Messi Summary */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-blue-900/50 hover:shadow-blue-900/50 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400">Lionel Messi</h2>
              <p className="text-blue-300 text-sm">{careerTotals.messi.clubs} Team</p>
            </div>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
              {careerTotals.messi.trophies} 🏆 Trophies
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{careerTotals.messi.apps.toLocaleString()}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Apps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{careerTotals.messi.goals.toLocaleString()}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{careerTotals.messi.assists.toLocaleString()}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Assists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{careerTotals.messi.goalRatio}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">G/A Ratio</div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-700/50">
            <div className="flex justify-between text-xs text-gray-300 font-semibold">
              <span>Goals per game</span>
              <span>{careerTotals.messi.goalRatio}</span>
            </div>
            <StatBar value={parseFloat(careerTotals.messi.goalRatio)} max={1} color="bg-blue-500" showValue={false} />
            
            <div className="flex justify-between text-xs text-gray-300 font-semibold">
              <span>Assists per game</span>
              <span>{careerTotals.messi.assistRatio}</span>
            </div>
            <StatBar value={parseFloat(careerTotals.messi.assistRatio)} max={0.5} color="bg-blue-500" showValue={false} />
          </div>
        </div>
      </div>

      {/* Season-by-Season Comparison - Polished Table Look */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-3">
            Season-by-Season Comparison
        </h2>
        <div className="space-y-4">
          {seasonComparison.map((seasonData, idx) => {
            const ronaldoStats = seasonData.ronaldo;
            const messiStats = seasonData.messi;
            
            return (
              <div key={idx} className="bg-gray-700/40 hover:bg-gray-700/60 transition-colors rounded-lg p-3 border border-gray-700"> {/* Reduced padding and cleaner background */}
                <h3 className="text-center md:text-2xl text-amber-400 font-extrabold mb-3 text-lg">{seasonData.season}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ronaldo Season */}
                  <div className={`p-3 rounded-lg border-l-4 ${ronaldoStats ? 'border-red-500 bg-red-900/10' : 'border-gray-500 bg-gray-700/30'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold ${ronaldoStats ? 'text-red-300' : 'text-gray-400'}`}>
                        {ronaldoStats?.club || "Not Active"}
                      </h4>
                      {ronaldoStats && (
                        <span className="bg-red-600/70 text-white px-2 py-1 rounded text-xs font-bold">
                          {ronaldoStats.trophies} 🏆
                        </span>
                      )}
                    </div>
                    
                    {ronaldoStats ? (
                      <div className="grid grid-cols-3 gap-2 text-sm md:text-xl">
                        <div className="text-center">
                          <div className="text-white font-bold">{ronaldoStats.apps}</div>
                          <div className="text-gray-400 text-xs">Apps</div>
                        </div>
                        <div className="text-center">
                          {/* Color logic applied */}
                          <div className={getStatColor(ronaldoStats.goals, messiStats?.goals, 'text-red-400')}>{ronaldoStats.goals}</div>
                          <div className="text-gray-400 text-xs">Goals</div>
                        </div>
                        <div className="text-center">
                          {/* Color logic applied */}
                          <div className={getStatColor(ronaldoStats.assists, messiStats?.assists, 'text-blue-400')}>{ronaldoStats.assists}</div>
                          <div className="text-gray-400 text-xs">Assists</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm text-center py-2 italic">-</div>
                    )}
                  </div>

                  {/* Messi Season */}
                  <div className={`p-3 rounded-lg border-l-4 ${messiStats ? 'border-blue-400 bg-blue-900/10' : 'border-gray-500 bg-gray-700/30'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold ${messiStats ? 'text-blue-300' : 'text-gray-400'}`}>
                        {messiStats?.club || "Not Active"}
                      </h4>
                      {messiStats && (
                        <span className="bg-blue-600/70 text-white px-2 py-1 rounded text-xs font-bold">
                          {messiStats.trophies} 🏆
                        </span>
                      )}
                    </div>
                    
                    {messiStats ? (
                      <div className="grid grid-cols-3 gap-2 text-sm md:text-xl">
                        <div className="text-center">
                          <div className="text-white font-bold">{messiStats.apps}</div>
                          <div className="text-gray-400 text-xs">Apps</div>
                        </div>
                        <div className="text-center">
                          {/* Color logic applied */}
                          <div className={getStatColor(messiStats.goals, ronaldoStats?.goals, 'text-red-400')}>{messiStats.goals}</div>
                          <div className="text-gray-400 text-xs">Goals</div>
                        </div>
                        <div className="text-center">
                          {/* Color logic applied */}
                          <div className={getStatColor(messiStats.assists, ronaldoStats?.assists, 'text-blue-400')}>{messiStats.assists}</div>
                          <div className="text-gray-400 text-xs">Assists</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm text-center py-2 italic">-</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Art/>
      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 border-t border-gray-700/50 pt-3">
          Data includes all official club competitions • Updated 2024
        </p>
      </div>
      <Footer/>
    </div>
  );
}