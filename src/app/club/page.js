"use client";
import { Inter } from "next/font/google";
import Art from "../components/clubart";
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
      { season: "2002-2003", club: "Sporting CP", apps: 31, goals: 5, assists: 4, trophies: 1 },
      { season: "2003-2004", club: "Manchester United", apps: 40, goals: 6, assists: 6, trophies: 9 },
      { season: "2004-2005", club: "Manchester United", apps: 50, goals: 9, assists: 8, trophies: 16 },
      { season: "2005-2006", club: "Manchester United", apps: 47, goals: 12, assists: 8, trophies: 5 },
      { season: "2006-2007", club: "Manchester United", apps: 53, goals: 23, assists: 14, trophies: 0 },
      { season: "2007-2008", club: "Manchester United", apps: 49, goals: 42, assists: 7, trophies: 2 },
      { season: "2007-2008", club: "Manchester United", apps: 49, goals: 42, assists: 7, trophies: 2 },
      { season: "2008-2009", club: "Real Madrid", apps: 55, goals: 26, assists: 7, trophies: 1 },
      { season: "2009-2010", club: "Real Madrid", apps: 35, goals: 33, assists: 8, trophies: 0 },
      { season: "2010-2011", club: "Real Madrid", apps: 54, goals: 53, assists: 16, trophies: 1 },  
      { season: "2011-2012", club: "Real Madrid", apps: 55, goals: 60, assists: 15, trophies: 1 },
      { season: "2012-2013", club: "Real Madrid", apps: 55, goals: 55, assists: 12, trophies: 0 },
      { season: "2013-2014", club: "Real Madrid", apps: 47, goals: 51, assists: 14, trophies: 2 },
      { season: "2014-2015", club: "Real Madrid", apps: 54, goals: 61, assists: 21, trophies: 1 },
      { season: "2015-2016", club: "Real Madrid", apps: 48, goals: 51, assists: 15, trophies: 2 },
      { season: "2016-2017", club: "Real Madrid", apps: 46, goals: 42, assists: 11, trophies: 2 },
      { season: "2017-2018", club: "Real Madrid", apps: 44, goals: 44, assists: 8, trophies: 1 },
      { season: "2018-2019", club: "Juventus", apps: 43, goals: 28, assists: 10, trophies: 2 },
      { season: "2019-2020", club: "Juventus", apps: 46, goals: 37, assists: 5, trophies: 2 },
      { season: "2020-2021", club: "Juventus", apps: 36, goals: 36, assists: 5, trophies: 1 },
      { season: "2021-2022", club: "Manchester United", apps: 39, goals: 24, assists: 3, trophies: 0 },
      { season: "2022-2023", club: "Al Nassr/Manchester United", apps: 35, goals: 17, assists: 4, trophies: 1 },
      { season: "2023", club: "Al Nassr", apps: 55, goals: 47, assists: 15, trophies: 1 },
      { season: "2023-2024", club: "Al Nassr", apps: 51, goals: 50, assists: 13, trophies: 0 },
      { season: "2024", club: "Al Nassr", apps: 39, goals: 36, assists: 5, trophies: 1 },
      { season: "2024-2025", club: "Al Nassr", apps: 41, goals: 35, assists: 4, trophies: 1 },
      { season: "2025", club: "Al Nassr", apps: 39, goals: 32, assists: 13, trophies: 1 },
      { season: "2025-2026", club: "Inter Miami", apps: 6, goals: 5, assists: 1, trophies: 1 },


    ],
    messi: [
      { season: "2004-2005", club: "FC Barcelona", apps: 9, goals: 1, assists: 0, trophies: 1 },
      { season: "2005-2006", club: "FC Barcelona", apps: 25, goals: 8, assists: 3, trophies: 35 },
      { season: "2006-2007", club: "FC Barcelona", apps: 36, goals: 17, assists: 3, trophies: 3 },
      { season: "2007-2008", club: "FC Barcelona", apps: 40, goals: 16, assists: 13, trophies: 2 },
      { season: "2008-2009", club: "FC Barcelona", apps: 51, goals: 38, assists: 18, trophies: 6 },
      { season: "2009-2010", club: "FC Barcelona", apps: 53, goals: 47, assists: 11, trophies: 3 },
      { season: "2010-2011", club: "FC Barcelona", apps: 55, goals: 53, assists: 23, trophies: 4 },
      { season: "2011-2012", club: "FC Barcelona", apps: 60, goals: 73, assists: 30, trophies: 3 },
      { season: "2012-2013", club: "FC Barcelona", apps: 50, goals: 60, assists: 15, trophies: 2 },
      { season: "2013-2014", club: "FC Barcelona", apps: 46, goals: 41, assists: 14, trophies: 1 },
      { season: "2014-2015", club: "FC Barcelona", apps: 57, goals: 58, assists: 27, trophies: 6 },
      { season: "2015-2016", club: "FC Barcelona", apps: 49, goals: 41, assists: 23, trophies: 2 },
      { season: "2016-2017", club: "FC Barcelona", apps: 52, goals: 54, assists: 16, trophies: 3 },
      { season: "2017-2018", club: "FC Barcelona", apps: 54, goals: 45, assists: 18, trophies: 3 },
      { season: "2018-2019", club: "FC Barcelona", apps: 50, goals: 51, assists: 19, trophies: 2 },
      { season: "2019-2020", club: "FC Barcelona", apps: 44, goals: 31, assists: 25, trophies: 2 },
      { season: "2020-2021", club: "FC Barcelona", apps: 47, goals: 38, assists: 12, trophies: 1 },
      { season: "2021-2022", club: "Paris Saint-Germain", apps: 34, goals: 11, assists: 14, trophies: 3 },
      { season: "2022-2023", club: "Paris Saint-Germain", apps: 41, goals: 21, assists: 20, trophies: 1 },
      { season: "2023", club: "Inter Miami/Paris Saint-Germain", apps: 36, goals: 20, assists: 11, trophies: 1 },
      { season: "2023-2024", club: "Inter Miami", apps: 29, goals: 25, assists: 16, trophies: 1 },
      { season: "2024", club: "Inter Miami", apps: 25, goals: 23, assists: 13, trophies: 1 },
      { season: "2024-2025", club: "Inter Miami", apps: 39, goals: 33, assists: 9, trophies: 1 },
      { season: "2025", club: "Inter Miami", apps: 39, goals: 32, assists: 13, trophies: 1 },
      { season: "2025-2026", club: "Inter Miami", apps: 10, goals: 8, assists: 6, trophies: 1 }




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
            CLUB CAREER STATS
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
            Season-by-season performance analysis of Ronaldo and Messi
        </p>
      </div>

      {/* Career Summary - Polished Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 lg:mb-8">
        
        {/* Ronaldo Summary */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-red-900/50 hover:shadow-red-900/50 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-500">Cristiano Ronaldo</h2>
              <p className="text-red-300 text-sm">{careerTotals.ronaldo.clubs} Clubs</p>
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
              <p className="text-blue-300 text-sm">{careerTotals.messi.clubs} Clubs</p>
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

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 border-t border-gray-700/50 pt-3">
          Data includes all official club competitions • Updated 2024
        </p>
      </div>
      <Art/>
      <Footer/>
    </div>
  );
}