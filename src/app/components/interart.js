"use client";

import Script from 'next/script';

export default function InternationalCareerArticle() {
  const clubPageUrl = "/club-stats-messi-ronaldo";

  // International career data with detailed statistics
  const internationalCareerTotals = {
    ronaldo: {
      apps: 205,
      goals: 128,
      assists: 48,
      trophies: 2,
      nationalTeams: 1,
      goalRatio: (128 / 205).toFixed(2),
      worldCupGoals: 8,
      euroGoals: 14,
      hatTricks: 10,
      penaltyGoals: 18,
      captainApps: 140,
      majorTournaments: 11,
      bestTournament: { name: "Euro 2016", goals: 3, result: "Champion" }
    },
    messi: {
      apps: 180,
      goals: 106,
      assists: 56,
      trophies: 5,
      nationalTeams: 1,
      goalRatio: (106 / 180).toFixed(2),
      worldCupGoals: 13,
      copaAmericaGoals: 13,
      hatTricks: 8,
      penaltyGoals: 12,
      captainApps: 120,
      majorTournaments: 10,
      bestTournament: { name: "World Cup 2022", goals: 7, result: "Champion" }
    }
  };

  const cr = internationalCareerTotals.ronaldo;
  const lm = internationalCareerTotals.messi;

  // Calculate additional metrics
  const totalContributions = {
    ronaldo: cr.goals + cr.assists,
    messi: lm.goals + lm.assists
  };

  const contributionPerGame = {
    ronaldo: (totalContributions.ronaldo / cr.apps).toFixed(2),
    messi: (totalContributions.messi / lm.apps).toFixed(2)
  };

  // Enhanced JSON-LD Schema for international careers
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Messi vs Ronaldo International Career 2024: Complete Statistical Analysis & Comparison",
    "description": "Comprehensive statistical analysis of Lionel Messi vs Cristiano Ronaldo international careers. Detailed breakdown of goals, assists, World Cup records, Euro vs Copa America performances, and national team achievements.",
    "image": "https://example.com/images/messi-ronaldo-international-comparison.jpg",
    "author": {
      "@type": "Person",
      "name": "International Football Analysis"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Football Stats Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    },
    "datePublished": "2024-12-19",
    "dateModified": "2024-12-19",
    "mainEntity": {
      "@type": "StatisticalAnalysis",
      "populationGroup": "International Footballers"
    }
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <article className="max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 lg:p-8 rounded-xl shadow-lg">
        {/* Optimized Header Section */}
        <header className="text-center mb-10 border-b border-gray-200 dark:border-gray-700 pb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Messi vs Ronaldo International Career 2024: Complete Statistical Analysis
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ultimate statistical breakdown comparing <strong>Lionel Messi and Cristiano Ronaldo's international careers</strong> across 
            World Cup performances, continental tournaments, goal records, and national team leadership.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>🌍 International Caps: 385</span>
            <span>⚽ Total Goals: 234</span>
            <span>🎯 Total Assists: 104</span>
            <span>🏆 International Trophies: 7</span>
          </div>
        </header>

        {/* Key Stats Summary Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Ronaldo International Card */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-700 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">Cristiano Ronaldo</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">Portugal • 205 Caps • 19 Years • Captain</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white dark:bg-red-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">{cr.goals}</div>
                <div className="text-xs text-red-600 dark:text-red-300">International Goals</div>
              </div>
              <div className="bg-white dark:bg-red-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">{cr.assists}</div>
                <div className="text-xs text-red-600 dark:text-red-300">International Assists</div>
              </div>
              <div className="bg-white dark:bg-red-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">{cr.apps}</div>
                <div className="text-xs text-red-600 dark:text-red-300">Caps</div>
              </div>
              <div className="bg-white dark:bg-red-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">{cr.trophies}</div>
                <div className="text-xs text-red-600 dark:text-red-300">International Trophies</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-red-700 dark:text-red-300">
                <strong>Goal Ratio:</strong> {cr.goalRatio}/game • 
                <strong> World Cup Goals:</strong> {cr.worldCupGoals} •
                <strong> Euro Goals:</strong> {cr.euroGoals}
              </div>
            </div>
          </div>
          
          {/* Messi International Card */}
          <div className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 p-6 rounded-xl border border-sky-200 dark:border-sky-700 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100 mb-2">Lionel Messi</h3>
              <p className="text-sky-700 dark:text-sky-300 text-sm">Argentina • 180 Caps • 17 Years • Captain</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white dark:bg-sky-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-sky-900 dark:text-sky-100">{lm.goals}</div>
                <div className="text-xs text-sky-600 dark:text-sky-300">International Goals</div>
              </div>
              <div className="bg-white dark:bg-sky-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-sky-900 dark:text-sky-100">{lm.assists}</div>
                <div className="text-xs text-sky-600 dark:text-sky-300">International Assists</div>
              </div>
              <div className="bg-white dark:bg-sky-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-sky-900 dark:text-sky-100">{lm.apps}</div>
                <div className="text-xs text-sky-600 dark:text-sky-300">Caps</div>
              </div>
              <div className="bg-white dark:bg-sky-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-sky-900 dark:text-sky-100">{lm.trophies}</div>
                <div className="text-xs text-sky-600 dark:text-sky-300">International Trophies</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-sky-700 dark:text-sky-300">
                <strong>Goal Ratio:</strong> {lm.goalRatio}/game • 
                <strong> World Cup Goals:</strong> {lm.worldCupGoals} •
                <strong> Copa America Goals:</strong> {lm.copaAmericaGoals}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced International Metrics */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">International Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Goal Contributions</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600 dark:text-red-400">Ronaldo</span>
                    <span className="font-semibold">{totalContributions.ronaldo}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-600 dark:text-sky-400">Messi</span>
                    <span className="font-semibold">{totalContributions.messi}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-sky-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contributions/Game</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-red-600 dark:text-red-400 text-sm">Ronaldo</span>
                  <span className="font-bold text-lg">{contributionPerGame.ronaldo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-600 dark:text-sky-400 text-sm">Messi</span>
                  <span className="font-bold text-lg">{contributionPerGame.messi}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Assist Ratio</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-red-600 dark:text-red-400 text-sm">Ronaldo</span>
                  <span className="font-bold text-lg">{(cr.assists / cr.apps).toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-600 dark:text-sky-400 text-sm">Messi</span>
                  <span className="font-bold text-lg">{(lm.assists / lm.apps).toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional International Statistical Insights */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Key International Statistical Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{cr.hatTricks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ronaldo International Hat-tricks</div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-sky-600 dark:text-sky-400">{lm.hatTricks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Messi International Hat-tricks</div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{cr.penaltyGoals}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ronaldo Penalty Goals</div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-sky-600 dark:text-sky-400">{lm.captainApps}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Messi Captain Appearances</div>
              </div>
            </div>
          </div>
        </section>

        {/* World Cup & Major Tournament Analysis */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">World Cup & Major Tournament Analysis</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <p className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
              <strong className="text-red-900 dark:text-red-100">Cristiano Ronaldo's International Legacy</strong> is defined by his 
              <strong> record-breaking 205 caps</strong> and <strong>128 international goals</strong> - the most in men's football history. 
              His crowning achievement came at <strong>Euro 2016</strong>, where he led Portugal to their first major international trophy. 
              Ronaldo's <strong>consistency across 11 major tournaments</strong> and <strong>leadership as captain</strong> in 140 matches 
              demonstrate his unparalleled longevity and dedication to the Portuguese national team.
            </p>
            
            <p className="mb-6 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border-l-4 border-sky-500">
              <strong className="text-sky-900 dark:text-sky-100">Lionel Messi's International Journey</strong> culminated in the ultimate 
              achievement - <strong>leading Argentina to World Cup glory in 2022</strong>. With <strong>106 international goals</strong> 
              and <strong>56 assists</strong>, Messi boasts a superior <strong>goal contribution rate of {contributionPerGame.messi} per game</strong>. 
              His <strong>World Cup 2022 performance</strong> (7 goals, 3 assists) and <strong>back-to-back Copa America triumphs</strong> 
              (2021, 2022) completed his transformation from club phenomenon to international legend.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-lg my-6">
              <h4 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-3">Tournament Dominance Analysis</h4>
              <p className="text-amber-700 dark:text-amber-300">
                The <strong>Messi vs Ronaldo international debate</strong> showcases contrasting paths to glory. Ronaldo's 
                <strong> Euro 2016 victory</strong> demonstrated his ability to inspire a team to unexpected success, while 
                Messi's <strong>World Cup 2022 triumph</strong> represented the culmination of Argentina's long pursuit of 
                international silverware. Their combined <strong>21 major tournament appearances</strong> and 
                <strong> 234 international goals</strong> represent the pinnacle of modern international football excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Continental Tournament Comparison */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Continental Tournament Performance</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-bold text-red-900 dark:text-red-100 text-xl mb-3">Ronaldo's European Championship Journey</h4>
                <p className="mb-3">
                  Ronaldo has participated in <strong>5 European Championships</strong> (2004-2020), scoring 
                  <strong> {cr.euroGoals} goals</strong> across these tournaments. His leadership in Portugal's 
                  <strong> Euro 2016 triumph</strong>, despite being injured early in the final, cemented his legacy 
                  as Portugal's greatest ever player. Ronaldo holds the record for <strong>most Euro appearances</strong> 
                  and is the <strong>all-time top scorer</strong> in the competition's history.
                </p>
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg mt-3">
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    <strong>Euro Achievement:</strong> Only player to score in 5 different European Championships
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-bold text-sky-900 dark:text-sky-100 text-xl mb-3">Messi's Copa America Legacy</h4>
                <p className="mb-3">
                  Messi has competed in <strong>6 Copa America tournaments</strong> (2007-2021), netting 
                  <strong> {lm.copaAmericaGoals} goals</strong>. After three final defeats, his breakthrough came with 
                  <strong> back-to-back Copa America victories in 2021 and 2022</strong>. Messi's performance in the 
                  2021 tournament, where he won <strong>Player of the Tournament</strong> with 4 goals and 5 assists, 
                  ended Argentina's 28-year trophy drought.
                </p>
                <div className="bg-sky-100 dark:bg-sky-900/30 p-3 rounded-lg mt-3">
                  <p className="text-sky-700 dark:text-sky-300 text-sm">
                    <strong>Copa Achievement:</strong> All-time leading assist provider in Copa America history
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* World Cup Performance Analysis */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">World Cup Performance & Records</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold text-red-900 dark:text-red-100 text-xl mb-3">Ronaldo's World Cup Journey</h4>
                <p>
                  Ronaldo has participated in <strong>5 World Cups</strong> (2006-2022), scoring 
                  <strong> {cr.worldCupGoals} goals</strong>. His best performance came in 2018 with a 
                  <strong> hat-trick against Spain</strong>. While Portugal's best result during his era was 
                  <strong> 4th place in 2006</strong>, Ronaldo's individual World Cup legacy is marked by his 
                  <strong> record as the first player to score in 5 World Cups</strong> and his consistent 
                  performances on football's biggest stage.
                </p>
              </div>
              
              <div className="p-6 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                <h4 className="font-bold text-sky-900 dark:text-sky-100 text-xl mb-3">Messi's World Cup Triumph</h4>
                <p>
                  Messi has featured in <strong>5 World Cups</strong> (2006-2022), culminating in 
                  <strong> victory in 2022</strong> with <strong>7 goals and 3 assists</strong> - earning him the 
                  <strong> Golden Ball</strong> as the tournament's best player. His <strong>26 World Cup appearances</strong> 
                  and <strong>13 goals</strong> place him among the competition's all-time greats. The 2022 triumph 
                  completed Messi's transformation from <strong>young prodigy in 2006</strong> to 
                  <strong> legendary champion in 2022</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl mt-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">World Cup Legacy Analysis</h4>
              <p className="text-gray-700 dark:text-gray-300">
                While Ronaldo holds the <strong>record for most World Cup appearances by a European player</strong> (5) 
                and is the <strong>only player to score in 5 different World Cups</strong>, Messi's achievement of 
                <strong> winning the tournament</strong> and claiming the <strong>Golden Ball</strong> gives him the 
                edge in World Cup legacy. Their combined <strong>10 World Cup appearances</strong> and 
                <strong> 21 goals</strong> demonstrate sustained excellence on football's grandest stage over nearly 
                two decades.
              </p>
            </div>
          </div>
        </section>

        {/* International Legacy Verdict */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">International Legacy & Statistical Verdict</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <div className="bg-gradient-to-r from-gray-50 to-red-50 dark:from-gray-800 dark:to-red-900/30 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-red-900 dark:text-red-100 text-xl mb-3">Ronaldo: The Record-Breaking Pioneer</h4>
              <p className="mb-4">
                <strong>Cristiano Ronaldo represents international longevity and record-breaking consistency</strong>, 
                holding the all-time records for <strong>most caps (205)</strong> and <strong>most international goals (128)</strong>. 
                His <strong>Euro 2016 victory</strong> with Portugal demonstrated his ability to lead a team to unexpected 
                international success. Ronaldo's <strong>leadership across 140 matches as captain</strong> and 
                <strong> participation in 11 major tournaments</strong> showcase an unparalleled commitment to national team duty.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-sky-50 dark:from-gray-800 dark:to-sky-900/30 p-6 rounded-lg">
              <h4 className="font-bold text-sky-900 dark:text-sky-100 text-xl mb-3">Messi: The Ultimate International Redemption</h4>
              <p className="mb-4">
                <strong>Lionel Messi exemplifies international legacy completion and tournament mastery</strong>, 
                achieving the ultimate prize with <strong>World Cup victory in 2022</strong> after years of near-misses. 
                His <strong>superior goal contribution rate ({contributionPerGame.messi} vs {contributionPerGame.ronaldo})</strong> 
                and <strong>playmaking ability (56 assists)</strong> demonstrate a more complete attacking profile. 
                Messi's <strong>transformation from criticized talent to beloved champion</strong> represents one of 
                football's great redemption stories.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-r-lg mt-6">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3">The International Verdict</h4>
              <p className="text-purple-700 dark:text-purple-300">
                The <strong>Messi vs Ronaldo international comparison</strong> presents two distinct definitions of success. 
                Ronaldo's legacy is built on <strong>record-breaking longevity and inspirational leadership</strong>, while 
                Messi's is defined by <strong>ultimate tournament success and creative supremacy</strong>. Their parallel 
                international careers have provided football fans with contrasting but equally compelling narratives of 
                what it means to carry a nation's hopes for nearly two decades.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Linking & CTA */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Complete Your Football Analysis</h3>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              This comprehensive statistical analysis covers their international careers. For the complete 
              <strong> Messi vs Ronaldo comparison</strong>, explore their club achievements, Champions League 
              records, and domestic league dominance in our detailed club career analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={"/Club"}
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                ⚽ Club Career Comparison
              </a>
              
            </div>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Data updated as of December 2024 • Sources: FIFA, UEFA, CONMEBOL, Official Federation Statistics • 
              Comprehensive analysis of Messi and Ronaldo international careers
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white italic">
              "Both Cristiano Ronaldo and Lionel Messi have redefined international football excellence through 
              their record-breaking careers, each carving unique legacies that will inspire generations of 
              national team players to come."
            </p>
          </div>
        </footer>
      </article>
    </>
  );
}