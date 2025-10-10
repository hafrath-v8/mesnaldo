"use client";
import { Inter } from "next/font/google";
import Footer from "../components/footer"
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function TrophiesPage() {
  // Updated with complete actual data from messivsronaldo.app
  const trophies = {
    ronaldo: {
      total: 35,
      breakdown: {
        club: 33,
        international: 2,
        individual: 56
      },
      majorTrophies: [
        { name: "UEFA Champions League", count: 5, rColor: 'text-red-400' },
        { name: "FIFA Club World Cup", count: 4, rColor: 'text-red-400' },
        { name: "UEFA Super Cup", count: 3, rColor: 'text-red-400' },
        { name: "UEFA European Championship", count: 1, rColor: 'text-red-400' },
        { name: "UEFA Nations League", count: 2, rColor: 'text-red-400' },
        { name: "Premier League", count: 3, rColor: 'text-red-400' },
        { name: "La Liga", count: 2, rColor: 'text-gray-400' },
        { name: "Serie A", count: 2, rColor: 'text-red-400' },
        { name: "Primeira Liga", count: 1, rColor: 'text-red-400' },
        { name: "FA Cup", count: 1, rColor: 'text-red-400' },
        { name: "EFL Cup", count: 2, rColor: 'text-red-400' },
        { name: "Community Shield", count: 2, rColor: 'text-red-400' },
        { name: "Copa del Rey", count: 2, rColor: 'text-gray-400' },
        { name: "Spanish Super Cup", count: 2, rColor: 'text-gray-400' },
        { name: "Coppa Italia", count: 1, rColor: 'text-red-400' },
        { name: "Italian Super Cup", count: 2, rColor: 'text-red-400' },
        { name: "Ballon d'Or", count: 5, rColor: 'text-gray-400' }
      ]
    },
    messi: {
      total: 44,
      breakdown: {
        club: 40,
        international: 4,
        individual: 79
      },
      majorTrophies: [
        { name: "UEFA Champions League", count: 4, mColor: 'text-gray-400' },
        { name: "FIFA Club World Cup", count: 3, mColor: 'text-gray-400' },
        { name: "UEFA Super Cup", count: 3, mColor: 'text-gray-400' },
        { name: "FIFA World Cup", count: 1, mColor: 'text-blue-400' },
        { name: "Copa América", count: 1, mColor: 'text-blue-400' },
        { name: "Finalissima", count: 1, mColor: 'text-blue-400' },
        { name: "Olympic Gold", count: 1, mColor: 'text-blue-400' },
        { name: "La Liga", count: 10, mColor: 'text-blue-400' },
        { name: "Copa del Rey", count: 7, mColor: 'text-blue-400' },
        { name: "Spanish Super Cup", count: 8, mColor: 'text-blue-400' },
        { name: "Ligue 1", count: 2, mColor: 'text-blue-400' },
        { name: "Trophée des Champions", count: 1, mColor: 'text-blue-400' },
        { name: "Leagues Cup", count: 1, mColor: 'text-blue-400' },
        { name: "Ballon d'Or", count: 8, mColor: 'text-blue-400' }
      ]
    }
  };

  // Combine major trophies for central comparison
  const combinedTrophies = [
      { name: "Ballon d'Or", ronaldo: 5, messi: 8 },
      { name: "UEFA Champions League", ronaldo: 5, messi: 4 },
      { name: "FIFA World Cup", ronaldo: 0, messi: 1 },
      { name: "Continental Championship", ronaldo: 2, messi: 1 }, // Euro vs Copa América
      { name: "Domestic League Titles", ronaldo: 8, messi: 12 }, // PL(3)+LaLiga(2)+SerieA(2)+Primeira(1) vs LaLiga(10)+Ligue1(2)
      { name: "FIFA Club World Cup", ronaldo: 4, messi: 3 },
      { name: "UEFA Super Cup", ronaldo: 3, messi: 3 },
      { name: "Domestic Cups", ronaldo: 7, messi: 7 }, // FA Cup(1)+EFL Cup(2)+Copa del Rey(2)+Coppa Italia(1)+Taça de Portugal(1) vs Copa del Rey(7)
      { name: "International Trophies", ronaldo: 2, messi: 4 }, // Euro+Nations League vs World Cup+Copa América+Finalissima+Olympic
  ].sort((a, b) => {
    // Sort by importance, putting individual awards (Ballon d'Or) and World Cup/UCL first
    const importance = {
        "Ballon d'Or": 10,
        "FIFA World Cup": 9,
        "UEFA Champions League": 8,
        "Continental Championship": 7,
        "International Trophies": 6,
    };
    return (importance[b.name] || 0) - (importance[a.name] || 0);
  });


  // Complete yearly achievements timeline from 2002-2025
  const yearlyAchievements = [
    { year: "2025", ronaldo: "Al Nassr - Saudi Pro League campaign, Arab Club Champions Cup defense", messi: "Inter Miami - MLS Cup pursuit, Leagues Cup defense" },
    { year: "2024", ronaldo: "Saudi Pro League, Arab Club Champions Cup, Saudi Super Cup", messi: "Leagues Cup, MLS Cup pursuit" },
    { year: "2023", ronaldo: "Saudi Pro League, Arab Club Champions Cup", messi: "Ballon d'Or, Leagues Cup, Ligue 1" },
    { year: "2022", ronaldo: "Premier League Top Scorer (Man Utd), FIFA World Cup", messi: "FIFA World Cup, Finalissima, Ligue 1, World Cup Golden Ball" },
    { year: "2021", ronaldo: "Serie A Top Scorer, Coppa Italia (Juventus), Euro 2020 Golden Boot", messi: "Copa América, Ballon d'Or, Copa América Best Player" },
    { year: "2020", ronaldo: "Serie A MVP, Team of the Year (Juventus), Serie A Top Scorer", messi: "La Liga, Pichichi Trophy (Barcelona)" },
    { year: "2019", ronaldo: "UEFA Nations League, Serie A (Juventus), Nations League Top Scorer", messi: "Ballon d'Or, European Golden Shoe, La Liga" },
    { year: "2018", ronaldo: "UEFA Champions League, FIFA Club World Cup (Real Madrid)", messi: "La Liga, Copa del Rey, European Golden Shoe" },
    { year: "2017", ronaldo: "UEFA Champions League, La Liga, Ballon d'Or, FIFA Club World Cup (Real Madrid)", messi: "Copa del Rey, European Golden Shoe" },
    { year: "2016", ronaldo: "UEFA Euro 2016, UEFA Champions League, Ballon d'Or, FIFA Club World Cup (Real Madrid)", messi: "Copa América, La Liga, Copa del Rey" },
    { year: "2015", ronaldo: "FIFA Club World Cup (Real Madrid)", messi: "UEFA Champions League, FIFA Club World Cup, Ballon d'Or, La Liga, Copa del Rey" },
    { year: "2014", ronaldo: "UEFA Champions League, FIFA Club World Cup, Ballon d'Or, Copa del Rey (Real Madrid)", messi: "La Liga, Copa del Rey, World Cup Golden Ball" },
    { year: "2013", ronaldo: "Ballon d'Or, UEFA Champions League (Real Madrid)", messi: "La Liga, European Golden Shoe" },
    { year: "2012", ronaldo: "La Liga, European Golden Shoe, Supercopa de España (Real Madrid)", messi: "Ballon d'Or, European Golden Shoe, Copa del Rey - 91 goals in calendar year" },
    { year: "2011", ronaldo: "Copa del Rey, European Golden Shoe (Real Madrid)", messi: "UEFA Champions League, La Liga, Ballon d'Or, FIFA Club World Cup, UEFA Super Cup" },
    { year: "2010", ronaldo: "No major trophies (Real Madrid)", messi: "Ballon d'Or, La Liga, European Golden Shoe, UEFA Super Cup" },
    { year: "2009", ronaldo: "Joined Real Madrid, Ballon d'Or (Man Utd)", messi: "Ballon d'Or, UEFA Champions League, La Liga, Copa del Rey, FIFA Club World Cup - First Ballon d'Or" },
    { year: "2008", ronaldo: "Ballon d'Or, UEFA Champions League, Premier League, FIFA Club World Cup (Man Utd)", messi: "Olympic Gold Medal, UEFA Champions League" },
    { year: "2007", ronaldo: "Premier League, PFA Players' Player of the Year (Man Utd)", messi: "Copa América final, Copa del Rey, Supercopa de España" },
    { year: "2006", ronaldo: "FIFA World Cup semi-final, Premier League, EFL Cup (Man Utd)", messi: "FIFA World Cup, UEFA Champions League, La Liga, Supercopa de España" },
    { year: "2005", ronaldo: "FA Cup, No major individual awards (Man Utd)", messi: "FIFA U-20 World Cup, La Liga, U-20 World Cup Golden Ball & Boot" },
    { year: "2004", ronaldo: "Euro 2004 final, FA Cup (Man Utd), Euro 2004 Team of Tournament", messi: "Barcelona debut, No major trophies" },
    { year: "2003", ronaldo: "Sporting CP debut, Joined Manchester United", messi: "Barcelona B, Youth development, FIFA U-20 World Cup qualification" },
    { year: "2002", ronaldo: "Sporting CP professional debut, Primeira Liga breakthrough", messi: "FC Barcelona youth academy, La Masia development" }
  ];

  return (
    // Base container with a subtle background gradient
    <div className={` bg-gray-900 w-full max-w-5xl mx-auto min-h-screen ${inter.className}`}>
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          
          {/* Header - Polished */}
          <div className="text-center mb-8 lg:mb-10 pb-4 border-b border-gray-700/50">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-wide">
              THE GOAT LEGACY
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Comprehensive Career Trophies &amp; Achievements Comparison
            </p>
          </div>

          {/* Summary Stats - Enhanced Visual Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            
            {/* Ronaldo Summary */}
            <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-red-800/30 shadow-xl shadow-red-900/10 transition-shadow hover:shadow-red-900/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-red-500">Cristiano Ronaldo</h2>
                  <p className="text-red-300 text-sm">Portugal • Forward • 2002-Present</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-extrabold text-white">{trophies.ronaldo.total}</div>
                  <div className="text-red-300 text-base font-semibold">Total Major Trophies</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-gray-700 pt-4">
                <div className="text-center bg-gray-700/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-400">{trophies.ronaldo.breakdown.club}</div>
                  <div className="text-gray-400 text-xs uppercase">Club Titles</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-400">{trophies.ronaldo.breakdown.international}</div>
                  <div className="text-gray-400 text-xs uppercase">International</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{trophies.ronaldo.breakdown.individual}</div>
                  <div className="text-gray-400 text-xs uppercase">Individual Awards</div>
                </div>
              </div>
            </div>

            {/* Messi Summary */}
            <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-blue-800/30 shadow-xl shadow-blue-900/10 transition-shadow hover:shadow-blue-900/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-blue-500">Lionel Messi</h2>
                  <p className="text-blue-300 text-sm">Argentina • Forward • 2004-Present</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-extrabold text-white">{trophies.messi.total}</div>
                  <div className="text-blue-300 text-base font-semibold">Total Major Trophies</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-gray-700 pt-4">
                <div className="text-center bg-gray-700/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">{trophies.messi.breakdown.club}</div>
                  <div className="text-gray-400 text-xs uppercase">Club Titles</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">{trophies.messi.breakdown.international}</div>
                  <div className="text-gray-400 text-xs uppercase">International</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{trophies.messi.breakdown.individual}</div>
                  <div className="text-gray-400 text-xs uppercase">Individual Awards</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Trophies Comparison - Central Table */}
          <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 mb-10 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🏆 Direct Major Honors Comparison</h3>
            
            <div className="w-full space-y-2">
                {/* Header Row */}
                <div className="grid grid-cols-3 text-sm font-extrabold text-gray-400 border-b border-gray-700/70 pb-2 mb-2 uppercase tracking-wider">
                    <div className="text-center text-red-400">Ronaldo</div>
                    <div className="text-center">Trophy</div>
                    <div className="text-center text-blue-400">Messi</div>
                </div>

                {/* Trophy Rows */}
                {combinedTrophies.map((item, index) => {
                    const ronaldoWon = item.ronaldo > item.messi;
                    const messiWon = item.messi > item.ronaldo;
                    const neutral = item.ronaldo === item.messi && item.ronaldo > 0;

                    const ronaldoClass = ronaldoWon ? 'text-red-400 font-bold' : (neutral ? 'text-amber-400' : 'text-gray-400');
                    const messiClass = messiWon ? 'text-blue-400 font-bold' : (neutral ? 'text-amber-400' : 'text-gray-400');
                    const trophyClass = ronaldoWon || messiWon ? 'text-white' : 'text-gray-300';

                    return (
                        <div key={index} className="grid grid-cols-3 items-center py-2 border-b border-gray-800 hover:bg-gray-700/20 rounded-md">
                            <div className="text-center">
                                <span className={ronaldoClass}>{item.ronaldo}</span>
                            </div>
                            <div className={`text-center text-sm font-medium ${trophyClass}`}>{item.name}</div>
                            <div className="text-center">
                                <span className={messiClass}>{item.messi}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>

          {/* Yearly Achievements Timeline - Complete Career Journey */}
          <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">📅 Complete Career Timeline (2002-2025)</h3>
            
            <div className="space-y-4 ">
              {yearlyAchievements.map((item, index) => (
                <div key={index} className="bg-gray-700/40 rounded-xl p-4 border border-gray-700">
                  
                  {/* Year Card - Top Center */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-amber-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm tracking-wider shadow-md">
                      {item.year}
                    </div>
                  </div>

                  {/* Stats Container - Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ronaldo Stats - Left */}
                    <div className="bg-red-900/15 rounded-lg p-3 border border-red-800/30">
                      <h4 className="font-semibold text-red-300 text-sm mb-2">Ronaldo's Milestones:</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.ronaldo}</p>
                    </div>

                    {/* Messi Stats - Right */}
                    <div className="bg-blue-900/15 rounded-lg p-3 border border-blue-800/30">
                      <h4 className="font-semibold text-blue-300 text-sm mb-2">Messi's Milestones:</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.messi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Key Statistics - Enhanced for Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gray-800/80 rounded-xl p-6 shadow-2xl border border-red-800/30">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-red-400 mb-2">{trophies.ronaldo.breakdown.individual}</div>
                <div className="text-gray-300 text-lg font-semibold">Individual Awards for Ronaldo</div>
                <div className="text-red-300 text-sm mt-2">Includes 5 Ballon d'Or, 4 European Golden Shoes, 3 UEFA Best Player awards</div>
              </div>
            </div>
            
            <div className="bg-gray-800/80 rounded-xl p-6 shadow-2xl border border-blue-800/30">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-blue-400 mb-2">{trophies.messi.breakdown.individual}</div>
                <div className="text-gray-300 text-lg font-semibold">Individual Awards for Messi</div>
                <div className="text-blue-300 text-sm mt-2">Includes record 8 Ballon d'Or, 6 European Golden Shoes, 2 World Cup Golden Balls</div>
              </div>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="mt-10 text-center border-t border-gray-700/50 pt-4">
            <p className="text-xs text-gray-500">
              Complete data sourced from messivsronaldo.app • Updated with 2024-2025 campaigns
            </p>
          </div>
          
        </div>
        <Footer/>
    </div>
  );
}