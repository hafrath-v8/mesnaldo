"use client";

import Script from 'next/script';

export default function ClubCareerArticle() {
  const internationalPageUrl = "/international-stats-messi-ronaldo";

  // Updated and more accurate club career data (2024 statistics)
  const clubCareerTotals = {
    ronaldo: {
      apps: 969,
      goals: 746,
      assists: 229,
      trophies: 34,
      clubs: 6,
      goalRatio: (746 / 969).toFixed(2),
      leagues: ["Premier League", "La Liga", "Serie A", "Saudi Pro League"],
      clubsList: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
      championsLeague: 5,
      goldenBoots: 4,
      ballonDors: 5,
      hatTricks: 60,
      penaltyGoals: 146,
      freeKickGoals: 58
    },
    messi: {
      apps: 897,
      goals: 714,
      assists: 338,
      trophies: 44,
      clubs: 4,
      goalRatio: (714 / 897).toFixed(2),
      leagues: ["La Liga", "Ligue 1", "MLS"],
      clubsList: ["Barcelona", "PSG", "Inter Miami"],
      championsLeague: 4,
      goldenBoots: 6,
      ballonDors: 8,
      hatTricks: 56,
      penaltyGoals: 108,
      freeKickGoals: 65
    }
  };

  const cr = clubCareerTotals.ronaldo;
  const lm = clubCareerTotals.messi;

  // Calculate additional metrics
  const totalContributions = {
    ronaldo: cr.goals + cr.assists,
    messi: lm.goals + lm.assists
  };

  const contributionPerGame = {
    ronaldo: (totalContributions.ronaldo / cr.apps).toFixed(2),
    messi: (totalContributions.messi / lm.apps).toFixed(2)
  };

  // Enhanced JSON-LD Schema for better SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Messi vs Ronaldo Club Career 2024: Complete Statistical Analysis & Comparison",
    "description": "Comprehensive statistical analysis of Lionel Messi vs Cristiano Ronaldo club careers. Detailed breakdown of goals, assists, trophies, Champions League records, and performance metrics across European leagues.",
    "image": "https://example.com/images/messi-ronaldo-club-comparison.jpg",
    "author": {
      "@type": "Person",
      "name": "Football Statistics Analysis"
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
      "populationGroup": "Professional Footballers"
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
            Messi vs Ronaldo Club Career 2024: Complete Statistical Analysis & Comparison
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ultimate statistical breakdown comparing <strong>Lionel Messi and Cristiano Ronaldo's club careers</strong> across 
            goals, assists, trophies, Champions League records, and performance metrics in Europe's top football leagues.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📊 Updated: December 2024</span>
            <span>⚽ Total Matches Analyzed: 1,866</span>
            <span>🏆 Trophies Compared: 78</span>
            <span>⭐ Ballon d'Or Awards: 13</span>
          </div>
        </header>

        {/* Key Stats Summary Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Ronaldo Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">Cristiano Ronaldo</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">5 Clubs • 4 Leagues • 19 Seasons • European Golden Boy</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white dark:bg-blue-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cr.goals}</div>
                <div className="text-xs text-blue-600 dark:text-blue-300">Total Goals</div>
              </div>
              <div className="bg-white dark:bg-blue-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cr.assists}</div>
                <div className="text-xs text-blue-600 dark:text-blue-300">Total Assists</div>
              </div>
              <div className="bg-white dark:bg-blue-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cr.apps}</div>
                <div className="text-xs text-blue-600 dark:text-blue-300">Appearances</div>
              </div>
              <div className="bg-white dark:bg-blue-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cr.trophies}</div>
                <div className="text-xs text-blue-600 dark:text-blue-300">Club Trophies</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Goal Ratio:</strong> {cr.goalRatio}/game • 
                <strong> UCL Titles:</strong> {cr.championsLeague} •
                <strong> Ballon d'Or:</strong> {cr.ballonDors}
              </div>
            </div>
          </div>
          
          {/* Messi Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-2">Lionel Messi</h3>
              <p className="text-orange-700 dark:text-orange-300 text-sm">3 Clubs • 3 Leagues • 20 Seasons • La Masia Graduate</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white dark:bg-orange-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{lm.goals}</div>
                <div className="text-xs text-orange-600 dark:text-orange-300">Total Goals</div>
              </div>
              <div className="bg-white dark:bg-orange-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{lm.assists}</div>
                <div className="text-xs text-orange-600 dark:text-orange-300">Total Assists</div>
              </div>
              <div className="bg-white dark:bg-orange-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{lm.apps}</div>
                <div className="text-xs text-orange-600 dark:text-orange-300">Appearances</div>
              </div>
              <div className="bg-white dark:bg-orange-800/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{lm.trophies}</div>
                <div className="text-xs text-orange-600 dark:text-orange-300">Club Trophies</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-orange-700 dark:text-orange-300">
                <strong>Goal Ratio:</strong> {lm.goalRatio}/game • 
                <strong> UCL Titles:</strong> {lm.championsLeague} •
                <strong> Ballon d'Or:</strong> {lm.ballonDors}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Metrics Comparison */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Performance Metrics & Statistical Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Goal Contributions</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-600 dark:text-blue-400">Ronaldo</span>
                    <span className="font-semibold">{totalContributions.ronaldo}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-orange-600 dark:text-orange-400">Messi</span>
                    <span className="font-semibold">{totalContributions.messi}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contributions</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">Ronaldo</span>
                  <span className="font-bold text-lg">{contributionPerGame.ronaldo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600 dark:text-orange-400 text-sm">Messi</span>
                  <span className="font-bold text-lg">{contributionPerGame.messi}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Assist Ratio</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">Ronaldo</span>
                  <span className="font-bold text-lg">{(cr.assists / cr.apps).toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600 dark:text-orange-400 text-sm">Messi</span>
                  <span className="font-bold text-lg">{(lm.assists / lm.apps).toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Statistical Insights */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Key Statistical Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{cr.hatTricks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ronaldo Hat-tricks</div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{lm.hatTricks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Messi Hat-tricks</div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{cr.penaltyGoals}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ronaldo Penalties</div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{lm.freeKickGoals}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Messi Free Kicks</div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals & Assists Analysis */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Goalscoring Analysis & Creative Impact Comparison</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <p className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <strong className="text-blue-900 dark:text-blue-100">Cristiano Ronaldo</strong> leads in total goal volume with 
              <strong> {cr.goals.toLocaleString()} club goals</strong> across 
              <strong> {cr.apps.toLocaleString()} appearances</strong>, maintaining a consistent scoring rate of 
              <strong> {cr.goalRatio} goals per game</strong>. His evolution from dynamic winger to elite center-forward 
              enabled this remarkable longevity across multiple top European leagues. Ronaldo's <strong>record-breaking 
              Champions League tally</strong> of 140 goals and unprecedented success in <strong>Premier League, La Liga, 
              and Serie A</strong> demonstrates his adaptability and world-class finishing ability.
            </p>
            
            <p className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
              <strong className="text-orange-900 dark:text-orange-100">Lionel Messi</strong> demonstrates superior efficiency with 
              <strong> {lm.goalRatio} goals per game</strong> from 
              <strong> {lm.goals.toLocaleString()} total goals</strong>. More significantly, Messi's creative output is exceptional with 
              <strong> {lm.assists.toLocaleString()} assists</strong> compared to Ronaldo's {cr.assists.toLocaleString()}, highlighting 
              his dual role as primary scorer and chief playmaker throughout his career. Messi's <strong>unparalleled technical 
              ability</strong> and <strong>vision on the field</strong> have resulted in a higher <strong>goal contribution rate</strong> and 
              more <strong>complete attacking profile</strong>.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg my-6">
              <h4 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-3">Statistical Dominance Analysis</h4>
              <p className="text-yellow-700 dark:text-yellow-300">
                The <strong>Messi vs Ronaldo debate</strong> showcases two distinct approaches to football excellence. 
                Ronaldo's <strong>physical dominance and aerial ability</strong> ({cr.hatTricks} hat-tricks) contrasts with 
                Messi's <strong>creative genius and playmaking</strong> ({lm.assists} assists). Their combined 
                <strong> 1,460 goals and 567 assists</strong> represent the most productive attacking partnership 
                in football history, albeit as rivals pushing each other to greater heights.
              </p>
            </div>
          </div>
        </section>

        {/* Career Trajectory & Longevity */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Career Trajectory & League Dominance Analysis</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-xl mb-3">Ronaldo's Football Journey</h4>
                <p className="mb-3">
                  Ronaldo's career is defined by successful adaptations across <strong>{cr.clubs} clubs</strong> in
                  {cr.leagues.map((league, index) => (
                    <span key={league}>
                      {index > 0 && index === cr.leagues.length - 1 ? ' and ' : index > 0 ? ', ' : ' '}
                      <strong>{league}</strong>
                    </span>
                  ))}. His unprecedented achievement of winning <strong>league titles in England, Spain, and Italy</strong> 
                  demonstrates remarkable versatility and adaptability to different footballing cultures and tactical systems.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {cr.clubsList.map(club => (
                    <li key={club}>{club}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-blue-600 dark:text-blue-400">
                  <strong>Key Achievement:</strong> Only player to win domestic leagues in three major European competitions
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 text-xl mb-3">Messi's Football Legacy</h4>
                <p className="mb-3">
                  Messi built his legacy primarily at <strong>FC Barcelona</strong>, achieving historic success before 
                  transitioning to PSG and Inter Miami. While representing fewer clubs ({lm.clubs}), his impact within 
                  each team's system produced unparalleled statistical consistency. Messi's <strong>20-year partnership 
                  with Barcelona</strong> resulted in the most successful player-club relationship in football history, 
                  revolutionizing the false nine position and modern attacking play.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {lm.clubsList.map(club => (
                    <li key={club}>{club}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-orange-600 dark:text-orange-400">
                  <strong>Key Achievement:</strong> Most goals for a single club in football history (672 for Barcelona)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trophy Comparison */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Silverware Analysis & Team Success Metrics</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 text-xl mb-3">Messi's Trophy Cabinet Analysis</h4>
                <p>
                  Messi holds the clear advantage in team trophies with <strong>{lm.trophies} major club honors</strong>, 
                  including 10 La Liga titles and 4 Champions League trophies with Barcelona. His 35 trophies with 
                  Barcelona alone represent one of the most successful player-club partnerships in football history. 
                  Messi's <strong>unprecedented trophy haul</strong> includes <strong>domestic dominance</strong> in Spain 
                  and successful transitions to <strong>Ligue 1 with PSG</strong> and <strong>MLS with Inter Miami</strong>, 
                  demonstrating his ability to win across different competitive environments.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-xl mb-3">Ronaldo's Trophy Achievements</h4>
                <p>
                  Ronaldo has collected <strong>{cr.trophies} club trophies</strong>, featuring league titles in three 
                  different top European leagues and 5 Champions League victories. His proven ability to drive success 
                  across multiple elite clubs underscores his adaptability and winning mentality. Ronaldo's 
                  <strong> Champions League dominance</strong> (5 titles) and success in <strong>multiple top leagues</strong> 
                  demonstrate his unique capacity to be the <strong>catalyst for team success</strong> in diverse footballing 
                  environments and tactical systems.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl mt-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Trophy Analysis Summary</h4>
              <p className="text-gray-700 dark:text-gray-300">
                While Messi leads in <strong>total trophy count</strong> ({lm.trophies} vs {cr.trophies}), Ronaldo's 
                achievement of winning <strong>major league titles in three different countries</strong> represents 
                a unique form of footballing versatility. Their combined <strong>78 major club trophies</strong> and 
                <strong> 9 Champions League titles</strong> demonstrate two different paths to sustained team success 
                at the highest level of professional football.
              </p>
            </div>
          </div>
        </section>

        {/* Statistical Conclusion */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Statistical Verdict & Performance Analysis</h2>
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/30 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 text-xl mb-3">Ronaldo: The Complete Goalscorer</h4>
              <p className="mb-4">
                <strong>Cristiano Ronaldo represents volume scoring and cross-league dominance</strong>, holding records for most 
                appearances and goals while proving effective in multiple tactical systems. His ability to maintain 
                elite performance across different leagues, styles, and teams is unprecedented in modern football. 
                Ronaldo's <strong>physical transformation, aerial dominance, and big-game mentality</strong> have made him 
                the prototype for the modern elite striker, combining technical ability with extraordinary athleticism 
                and relentless goalscoring instinct.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/30 p-6 rounded-lg">
              <h4 className="font-bold text-orange-900 dark:text-orange-100 text-xl mb-3">Messi: The Creative Maestro</h4>
              <p className="mb-4">
                <strong>Lionel Messi exemplifies efficiency and creative supremacy</strong>, maintaining a higher goals-per-game 
                ratio while nearly doubling Ronaldo's assist output. His trophy haul reflects sustained excellence 
                within optimized team structures, combined with unparalleled technical ability and vision. Messi's 
                <strong> revolutionary impact on modern attacking football</strong>, combined with his <strong>unmatched 
                dribbling ability and playmaking vision</strong>, has redefined what's possible for an attacking player 
                in terms of both goalscoring and creative output.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-r-lg mt-6">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3">The Ultimate Verdict</h4>
              <p className="text-purple-700 dark:text-purple-300">
                The <strong>Messi vs Ronaldo statistical comparison</strong> reveals two fundamentally different approaches 
                to footballing excellence. Ronaldo's legacy is built on <strong>adaptability, physical dominance, and 
                record-breaking volume</strong>, while Messi's is defined by <strong>technical genius, creative supremacy, 
                and unparalleled efficiency</strong>. Their simultaneous careers have provided football fans with the 
                most compelling individual rivalry in sports history, pushing both players to achieve statistical 
                heights previously thought impossible in modern football.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Linking & CTA */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Continue Your Football Analysis Journey</h3>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              This comprehensive statistical analysis covers only their club careers. For a complete picture of 
              the <strong>Messi vs Ronaldo debate</strong>, explore their international achievements, World Cup performances, 
              and national team records in our detailed international career comparison.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={"/International"} 
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                🌍 International Career Comparison
              </a>
              
            </div>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Data updated as of December 2024 • Sources: Official club statistics, UEFA, League records, FIFA • 
              Comprehensive statistical analysis of Messi and Ronaldo club careers
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white italic">
              "Both Cristiano Ronaldo and Lionel Messi have redefined football excellence through their record-breaking 
              club careers, each setting benchmarks in goalscoring, playmaking, and trophy collection that may endure 
              for generations of football players to come."
            </p>
          </div>
        </footer>
      </article>
    </>
  );
}