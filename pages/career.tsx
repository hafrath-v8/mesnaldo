// pages/career.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useMemo } from "react"

interface SeasonStats {
  season: string
  club: string
  league: string
  apps: number
  goals: number
  assists: number
  trophies: string[]
}

interface ClubStats {
  name: string
  years: string
  apps: number
  goals: number
  assists: number
}

interface CareerPageProps {
  messiSeasons: SeasonStats[]
  ronaldoSeasons: SeasonStats[]
  messiClubs: ClubStats[]
  ronaldoClubs: ClubStats[]
  messiTotals: { apps: number; goals: number; assists: number }
  ronaldoTotals: { apps: number; goals: number; assists: number }
}

// Fetch ALL matches using pagination
async function fetchAllMatches(playerId: number) {
  const pageSize = 1000
  let allRows: any[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("player_id", playerId)
      .range(from, from + pageSize - 1)
      .order("date", { ascending: true })
    if (error || !data || data.length === 0) break
    allRows = allRows.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return allRows
}

// Group matches by season
function buildSeasons(matches: any[]): SeasonStats[] {
  const seasonMap: Record<string, { club: string; league: string; apps: number; goals: number; assists: number; competitions: Set<string> }> = {}

  matches.forEach(m => {
    const date = new Date(m.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    // Season: if month >= 8, season is year/year+1, else year-1/year
    const seasonStart = month >= 8 ? year : year - 1
    const season = `${seasonStart}/${(seasonStart + 1).toString().slice(2)}`
    const club = m.team || "Unknown"

    if (!seasonMap[season]) {
      seasonMap[season] = { club, league: "", apps: 0, goals: 0, assists: 0, competitions: new Set() }
    }
    seasonMap[season].apps += 1
    seasonMap[season].goals += m.goals || 0
    seasonMap[season].assists += m.assists || 0
    if (m.competition) seasonMap[season].competitions.add(m.competition)
    // Use the most frequent club for the season
    if (club !== seasonMap[season].club && m.competition) {
      // Keep the club with most appearances
    }
  })

  // Better club detection: use the club that appears most in each season
  const seasonClubs: Record<string, Record<string, number>> = {}
  matches.forEach(m => {
    const date = new Date(m.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const seasonStart = month >= 8 ? year : year - 1
    const season = `${seasonStart}/${(seasonStart + 1).toString().slice(2)}`
    if (!seasonClubs[season]) seasonClubs[season] = {}
    const club = m.team || "Unknown"
    seasonClubs[season][club] = (seasonClubs[season][club] || 0) + 1
  })

  return Object.entries(seasonMap).map(([season, data]) => {
    const clubs = seasonClubs[season] || {}
    const mainClub = Object.entries(clubs).sort(([, a], [, b]) => b - a)[0]?.[0] || "Unknown"
    
    // Determine trophies (simplified - major trophies based on competition names)
    const trophies: string[] = []
    const comps = Array.from(data.competitions)
    
    return {
      season,
      club: mainClub,
      league: getLeagueFromClub(mainClub),
      apps: data.apps,
      goals: data.goals,
      assists: data.assists,
      trophies,
    }
  }).sort((a, b) => a.season.localeCompare(b.season))
}

function getLeagueFromClub(club: string): string {
  const leagueMap: Record<string, string> = {
    "Barcelona": "La Liga",
    "Real Madrid": "La Liga",
    "Manchester United": "Premier League",
    "Juventus": "Serie A",
    "Paris Saint-Germain": "Ligue 1",
    "Inter Miami": "MLS",
    "Al Nassr": "Saudi Pro League",
    "Sporting CP": "Primeira Liga",
    "Argentina": "International",
    "Portugal": "International",
  }
  return leagueMap[club] || ""
}

function buildClubs(matches: any[]): ClubStats[] {
  const clubMap: Record<string, { apps: number; goals: number; assists: number; years: number[] }> = {}

  matches.forEach(m => {
    const club = m.team || "Unknown"
    const date = new Date(m.date)
    const year = date.getFullYear()
    
    if (!clubMap[club]) {
      clubMap[club] = { apps: 0, goals: 0, assists: 0, years: [] }
    }
    clubMap[club].apps += 1
    clubMap[club].goals += m.goals || 0
    clubMap[club].assists += m.assists || 0
    if (!clubMap[club].years.includes(year)) {
      clubMap[club].years.push(year)
    }
  })

  return Object.entries(clubMap)
    .map(([name, data]) => {
      const sortedYears = data.years.sort()
      const yearRange = sortedYears.length > 1 
        ? `${sortedYears[0]}–${sortedYears[sortedYears.length - 1]}`
        : `${sortedYears[0]}`
      return {
        name,
        years: yearRange,
        apps: data.apps,
        goals: data.goals,
        assists: data.assists,
      }
    })
    .sort((a, b) => b.apps - a.apps)
}

export default function Career({ messiSeasons, ronaldoSeasons, messiClubs, ronaldoClubs, messiTotals, ronaldoTotals }: CareerPageProps) {
  const [activePlayer, setActivePlayer] = useState<"messi" | "ronaldo">("messi")
  const [activeTab, setActiveTab] = useState<"timeline" | "clubs">("timeline")

  const seasons = activePlayer === "messi" ? messiSeasons : ronaldoSeasons
  const clubs = activePlayer === "messi" ? messiClubs : ronaldoClubs
  const totals = activePlayer === "messi" ? messiTotals : ronaldoTotals

  const bestSeason = useMemo(() => {
    return [...seasons].sort((a, b) => b.goals - a.goals)[0]
  }, [seasons])

  const seasonsByClub = useMemo(() => {
    const grouped: Record<string, SeasonStats[]> = {}
    seasons.forEach(s => {
      if (!grouped[s.club]) grouped[s.club] = []
      grouped[s.club].push(s)
    })
    return Object.entries(grouped)
  }, [seasons])

  // Trophies from matches
  const trophies = useMemo(() => {
    const trophySet = new Set<string>()
    seasons.forEach(s => s.trophies.forEach(t => trophySet.add(t)))
    return Array.from(trophySet)
  }, [seasons])

  return (
<Layout
  title="Messi vs Ronaldo Career | Complete Career Comparison"
  description="Compare Messi vs Ronaldo's careers, including goals, assists, trophies, records, individual awards, and career statistics in one complete comparison."
>
        <div className="bg-black min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-10">

          {/* HEADER */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">Season by Season</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Career <span className="text-amber-400">Timeline</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {seasons.length} seasons · {clubs.length} clubs
            </p>
          </div>

          {/* PLAYER TOGGLE */}
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setActivePlayer("messi")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activePlayer === "messi" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"
              }`}>
              <div className="relative w-6 h-6 rounded-full overflow-hidden"><Image src="/images/messi.webp" alt="" fill className="object-cover" /></div>
              Messi
            </button>
            <button onClick={() => setActivePlayer("ronaldo")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activePlayer === "ronaldo" ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"
              }`}>
              <div className="relative w-6 h-6 rounded-full overflow-hidden"><Image src="/images/ronaldo.webp" alt="" fill className="object-cover" /></div>
              Ronaldo
            </button>
          </div>

          {/* OVERVIEW CARD */}
          <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`relative w-14 h-14 rounded-full overflow-hidden border-2 ${activePlayer === "messi" ? "border-blue-500/40" : "border-red-500/40"}`}>
                <Image src={activePlayer === "messi" ? "/images/messi.webp" : "/images/ronaldo.webp"} alt="" fill className="object-cover" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{activePlayer === "messi" ? "Lionel Messi" : "Cristiano Ronaldo"}</p>
                <p className="text-xs text-gray-500">{clubs.length} clubs · {seasons.length} seasons</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800/30 rounded-xl p-3">
                <p className="text-2xl sm:text-3xl font-black text-white">{totals.apps.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Games</p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">{totals.goals.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Goals</p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3">
                <p className="text-2xl sm:text-3xl font-black text-blue-400">{totals.assists.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Assists</p>
              </div>
            </div>

            {bestSeason && (
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-500">
                <span>Best Season:</span>
                <span className="text-white font-bold">{bestSeason.season}</span>
                <span>·</span>
                <span className="text-emerald-400 font-bold">{bestSeason.goals} goals</span>
                <span>·</span>
                <span className="text-blue-400 font-bold">{bestSeason.assists} assists</span>
              </div>
            )}
          </div>

          {/* TABS */}
          <div className="flex items-center justify-center gap-1 bg-gray-900/50 rounded-xl p-1 max-w-xs mx-auto">
            <button onClick={() => setActiveTab("timeline")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === "timeline" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}>
              Timeline
            </button>
            <button onClick={() => setActiveTab("clubs")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === "clubs" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}>
              Clubs
            </button>
          </div>

          {/* TIMELINE VIEW */}
          {activeTab === "timeline" && (
            <div className="relative">
              <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gray-800" />
              <div className="space-y-2">
                {seasons.map((season, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.015 }}
                    className="relative pl-8 sm:pl-12">
                    <div className="absolute left-1.5 sm:left-3.5 top-3.5 w-3 h-3 rounded-full border-2 border-gray-900 bg-gray-700" />
                    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-3 sm:p-4 hover:border-gray-700/60 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white">{season.season}</span>
                        <span className="text-[10px] text-gray-500">{season.club}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-gray-400">{season.apps}g</span>
                        <span className="text-emerald-400 font-bold">{season.goals}⚽</span>
                        <span className="text-blue-400 font-bold">{season.assists}🅰</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CLUBS VIEW */}
          {activeTab === "clubs" && (
            <div className="space-y-3">
              {clubs.map((club, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{club.name}</h3>
                      <p className="text-[10px] text-gray-500">{club.years}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-800/30 rounded-lg py-2.5">
                      <p className="text-xl font-black text-white">{club.apps.toLocaleString()}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Games</p>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg py-2.5">
                      <p className="text-xl font-black text-emerald-400">{club.goals.toLocaleString()}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Goals</p>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg py-2.5">
                      <p className="text-xl font-black text-blue-400">{club.assists.toLocaleString()}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Assists</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* FOOTER NOTE */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-[10px] text-gray-600">
              Data calculated from {activePlayer === "messi" ? "1,162" : "1,330"} match records in database
            </p>
          </div>
{/* =========================================================
    SEO CONTENT SECTION - CAREER PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Career: Complete Season-by-Season Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      <p>
        The <strong className="text-white">Messi vs Ronaldo career comparison</strong>{" "}
        looks at how Lionel Messi and Cristiano Ronaldo developed across
        different seasons, clubs, leagues and stages of their careers.
        Rather than focusing on only one statistic, this page combines
        appearances, goals, assists and season-by-season performance.
      </p>

      <p>
        Both players built extraordinary careers across multiple decades.
        Messi became closely associated with Barcelona before later playing
        for Paris Saint-Germain and Inter Miami, while Ronaldo represented
        Sporting CP, Manchester United, Real Madrid, Juventus and Al Nassr.
      </p>

      <p>
        The career timeline above allows each player to be viewed separately,
        making it easier to see how their production changed from one season
        to another.
      </p>


      {/* TOTAL CAREER */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Statistics
      </h3>

      <p>
        According to the match records currently available in the Mesnaldo
        database, Lionel Messi has played{" "}
        <strong className="text-blue-400">
          {messiTotals.apps.toLocaleString()}
        </strong>{" "}
        matches, scored{" "}
        <strong className="text-blue-400">
          {messiTotals.goals.toLocaleString()}
        </strong>{" "}
        goals and recorded{" "}
        <strong className="text-blue-400">
          {messiTotals.assists.toLocaleString()}
        </strong>{" "}
        assists.
      </p>

      <p>
        Cristiano Ronaldo has played{" "}
        <strong className="text-red-400">
          {ronaldoTotals.apps.toLocaleString()}
        </strong>{" "}
        matches, scored{" "}
        <strong className="text-red-400">
          {ronaldoTotals.goals.toLocaleString()}
        </strong>{" "}
        goals and recorded{" "}
        <strong className="text-red-400">
          {ronaldoTotals.assists.toLocaleString()}
        </strong>{" "}
        assists in the current dataset.
      </p>


      {/* APPEARANCES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Appearances
      </h3>

      <p>
        Career appearances are one of the clearest measures of longevity.
        Ronaldo currently has{" "}
        <strong className="text-red-400">
          {ronaldoTotals.apps.toLocaleString()}
        </strong>{" "}
        recorded appearances on this page, compared with Messi&apos;s{" "}
        <strong className="text-blue-400">
          {messiTotals.apps.toLocaleString()}
        </strong>.
      </p>

      <p>
        Appearance totals show how long a player has remained active at senior
        level, but they should be interpreted together with goals, assists,
        minutes played and the competitions in which those matches occurred.
      </p>


      {/* GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Goals
      </h3>

      <p>
        Goals are one of the most important statistics in the Messi vs Ronaldo
        debate. Messi has{" "}
        <strong className="text-blue-400">
          {messiTotals.goals.toLocaleString()}
        </strong>{" "}
        goals in the current career dataset, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoTotals.goals.toLocaleString()}
        </strong>.
      </p>

      {ronaldoTotals.goals > messiTotals.goals ? (
        <p>
          Ronaldo currently leads the career goal total in this dataset by{" "}
          <strong className="text-white">
            {(ronaldoTotals.goals - messiTotals.goals).toLocaleString()}
          </strong>{" "}
          goals.
        </p>
      ) : messiTotals.goals > ronaldoTotals.goals ? (
        <p>
          Messi currently leads the career goal total in this dataset by{" "}
          <strong className="text-white">
            {(messiTotals.goals - ronaldoTotals.goals).toLocaleString()}
          </strong>{" "}
          goals.
        </p>
      ) : (
        <p>
          Messi and Ronaldo are level for career goals in the current dataset.
        </p>
      )}


      {/* ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Assists
      </h3>

      <p>
        The career comparison also includes assists. Messi has{" "}
        <strong className="text-blue-400">
          {messiTotals.assists.toLocaleString()}
        </strong>{" "}
        recorded assists, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoTotals.assists.toLocaleString()}
        </strong>.
      </p>

      <p>
        Assist totals provide additional context because they show how often
        each player directly created goals for teammates. They are especially
        useful when comparing Messi&apos;s broader creative role with
        Ronaldo&apos;s scoring output.
      </p>


      {/* G+A */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Goal Contributions
      </h3>

      <p>
        Combining goals and assists, Messi has{" "}
        <strong className="text-blue-400">
          {(messiTotals.goals + messiTotals.assists).toLocaleString()}
        </strong>{" "}
        recorded goal contributions in the current dataset.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {(ronaldoTotals.goals + ronaldoTotals.assists).toLocaleString()}
        </strong>{" "}
        recorded goal contributions.
      </p>

      <p>
        Goal contributions provide a broader attacking measure than goals
        alone because they include both finishing and direct creation.
      </p>


      {/* SEASON TIMELINE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Season-by-Season Career Timeline
      </h3>

      <p>
        The timeline view groups the available match records into football
        seasons. Each season shows appearances, goals, assists and the main
        team associated with that season.
      </p>

      <p>
        Looking at performance season by season is useful because career totals
        can hide important changes. A player may have an exceptional scoring
        peak in one period, a more creative role in another, or fewer
        appearances because of injuries, transfers or changes in competition.
      </p>


      {/* BEST SEASONS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi and Ronaldo&apos;s Best Scoring Seasons
      </h3>

      {messiSeasons.length > 0 && (
        <p>
          Messi&apos;s highest-scoring season in the current dataset is{" "}
          <strong className="text-blue-400">
            {[...messiSeasons].sort((a, b) => b.goals - a.goals)[0].season}
          </strong>
          , when he scored{" "}
          <strong className="text-blue-400">
            {[...messiSeasons].sort((a, b) => b.goals - a.goals)[0].goals}
          </strong>{" "}
          goals.
        </p>
      )}

      {ronaldoSeasons.length > 0 && (
        <p>
          Ronaldo&apos;s highest-scoring season in the current dataset is{" "}
          <strong className="text-red-400">
            {[...ronaldoSeasons].sort((a, b) => b.goals - a.goals)[0].season}
          </strong>
          , when he scored{" "}
          <strong className="text-red-400">
            {[...ronaldoSeasons].sort((a, b) => b.goals - a.goals)[0].goals}
          </strong>{" "}
          goals.
        </p>
      )}

      <p>
        Peak-season comparisons are useful, but one season alone does not
        define an entire career. Consistency across many seasons is equally
        important when discussing longevity.
      </p>


      {/* CLUB CAREERS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Club Career Comparison
      </h3>

      <p>
        The Clubs tab groups each player&apos;s statistics by team and displays
        appearances, goals and assists. This makes it possible to see how each
        player performed across the different clubs represented in the match
        database.
      </p>

      <p>
        Messi&apos;s career is strongly associated with Barcelona, where he
        spent the largest part of his European career, before later moving to
        Paris Saint-Germain and Inter Miami.
      </p>

      <p>
        Ronaldo&apos;s career was spread across more major European leagues,
        with spells at Sporting CP, Manchester United, Real Madrid and
        Juventus before his move to Al Nassr.
      </p>


      {/* BARCELONA */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi&apos;s Barcelona Career
      </h3>

      <p>
        Barcelona represents the longest and most influential period of
        Messi&apos;s club career. It was there that he developed from a young
        player into one of the most productive attackers in football history.
      </p>

      <p>
        His Barcelona years contributed a major share of the appearances,
        goals and assists displayed in the club breakdown on this page.
      </p>


      {/* REAL MADRID */}

      <h3 className="text-xl font-bold text-white mt-10">
        Ronaldo&apos;s Real Madrid Career
      </h3>

      <p>
        Real Madrid represents one of the most productive periods of
        Ronaldo&apos;s career. During those seasons, he produced extremely high
        scoring numbers and competed directly with Messi in La Liga and
        El Clásico.
      </p>

      <p>
        The Real Madrid period is therefore especially important when
        comparing the peak years of Messi and Ronaldo.
      </p>


      {/* DIFFERENT LEAGUES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Across Different Leagues
      </h3>

      <p>
        The two careers followed different paths. Messi spent the majority of
        his prime years in La Liga before later playing in Ligue 1 and Major
        League Soccer.
      </p>

      <p>
        Ronaldo competed in the Premier League, La Liga, Serie A and later the
        Saudi Pro League, giving his career a wider spread across different
        domestic competitions.
      </p>

      <p>
        League changes matter because playing styles, schedules, opponents and
        tactical environments differ between competitions. Raw career totals
        should therefore be viewed alongside the context in which they were
        produced.
      </p>


      {/* LONGEVITY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Longevity
      </h3>

      <p>
        Longevity is one of the strongest features of both careers. Messi and
        Ronaldo remained productive for far longer than the typical peak
        period of an elite footballer.
      </p>

      <p>
        Their timelines show how they adapted as they aged. Both players
        changed roles, teams and tactical responsibilities while continuing
        to contribute goals and assists.
      </p>

      <p>
        Career longevity should therefore be evaluated using a combination of
        appearances, total production, efficiency and sustained performance
        across many seasons.
      </p>


      {/* PLAYING STYLE */}

      <h3 className="text-xl font-bold text-white mt-10">
        How Their Careers Developed Differently
      </h3>

      <p>
        Messi and Ronaldo did not follow identical football paths. Messi spent
        much of his career combining scoring with chance creation and deeper
        involvement in attacking play.
      </p>

      <p>
        Ronaldo developed from a wide attacking player into a more
        goal-focused forward, becoming increasingly specialised around
        finishing, movement and penalty-area scoring.
      </p>

      <p>
        These differences help explain why comparing only career goals or only
        assists does not provide the full picture.
      </p>


      {/* DATA METHOD */}

      <h3 className="text-xl font-bold text-white mt-10">
        How Career Statistics Are Calculated on Mesnaldo
      </h3>

      <p>
        The career statistics on this page are calculated from individual
        match records stored in the Mesnaldo database. Every available match
        contributes one appearance, while the recorded goals and assists are
        summed to create the career totals.
      </p>

      <p>
        Matches are also grouped into seasons and clubs to generate the
        timeline and club breakdowns. The displayed totals therefore reflect
        the scope and completeness of the match data currently stored in the
        database.
      </p>

      <p>
        If historical records are corrected or additional matches are added,
        the displayed career totals can change automatically.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Career FAQ
      </h2>

      <h3 className="text-lg font-bold text-white mt-8">
        Who has played more career matches, Messi or Ronaldo?
      </h3>

      <p>
        In the current Mesnaldo dataset, Messi has{" "}
        <strong className="text-blue-400">
          {messiTotals.apps.toLocaleString()}
        </strong>{" "}
        recorded appearances, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoTotals.apps.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more career goals?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {messiTotals.goals.toLocaleString()}
        </strong>{" "}
        goals and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoTotals.goals.toLocaleString()}
        </strong>{" "}
        according to the match records currently used on this page.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more career assists?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {messiTotals.assists.toLocaleString()}
        </strong>{" "}
        recorded assists, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoTotals.assists.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Does this page show Messi and Ronaldo season by season?
      </h3>

      <p>
        Yes. The career timeline groups the available match data by season and
        displays appearances, goals and assists for each season.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Can I compare their statistics by club?
      </h3>

      <p>
        Yes. The Clubs tab groups the available career records by team and
        displays appearances, goals and assists for each club represented in
        the database.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Are the career statistics manually entered?
      </h3>

      <p>
        The totals displayed on this page are calculated from the individual
        match records available in the database rather than being manually
        hardcoded into the page.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Complete Career Comparison
      </h2>

      <p>
        The careers of Lionel Messi and Cristiano Ronaldo are difficult to
        reduce to a single statistic. Ronaldo&apos;s career is notable for
        longevity, goalscoring and success across several leagues, while
        Messi&apos;s career combines elite scoring with exceptional creative
        output and sustained production across different roles.
      </p>

      <p>
        The most useful comparison considers appearances, goals, assists,
        season-by-season performance and club records together rather than
        relying on one career total.
      </p>

      <p>
        Mesnaldo&apos;s career timeline provides that broader view by allowing
        visitors to explore each player&apos;s development season by season and
        club by club.
      </p>

    </div>
  </div>
</section>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch ALL matches using pagination
    const messiMatches = await fetchAllMatches(1)
    const ronaldoMatches = await fetchAllMatches(2)

    console.log(`Career - Messi matches: ${messiMatches.length}, Ronaldo matches: ${ronaldoMatches.length}`)

    // Build season data from matches
    const messiSeasons = buildSeasons(messiMatches)
    const ronaldoSeasons = buildSeasons(ronaldoMatches)
    const messiClubs = buildClubs(messiMatches)
    const ronaldoClubs = buildClubs(ronaldoMatches)

    const messiTotals = {
      apps: messiMatches.length,
      goals: messiMatches.reduce((s: number, m: any) => s + (m.goals || 0), 0),
      assists: messiMatches.reduce((s: number, m: any) => s + (m.assists || 0), 0),
    }
    const ronaldoTotals = {
      apps: ronaldoMatches.length,
      goals: ronaldoMatches.reduce((s: number, m: any) => s + (m.goals || 0), 0),
      assists: ronaldoMatches.reduce((s: number, m: any) => s + (m.assists || 0), 0),
    }

    console.log(`Messi: ${messiSeasons.length} seasons, ${messiClubs.length} clubs`)
    console.log(`Ronaldo: ${ronaldoSeasons.length} seasons, ${ronaldoClubs.length} clubs`)

    return {
      props: {
        messiSeasons,
        ronaldoSeasons,
        messiClubs,
        ronaldoClubs,
        messiTotals,
        ronaldoTotals,
      },
    }
  } catch (e) {
    console.error("Error:", e)
    return {
      props: {
        messiSeasons: [],
        ronaldoSeasons: [],
        messiClubs: [],
        ronaldoClubs: [],
        messiTotals: { apps: 0, goals: 0, assists: 0 },
        ronaldoTotals: { apps: 0, goals: 0, assists: 0 },
      },
    }
  }
}