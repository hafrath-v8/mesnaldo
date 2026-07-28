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
    <Layout title="Career - Messi vs Ronaldo">
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
              <div className="relative w-6 h-6 rounded-full overflow-hidden"><Image src="/images/messi.png" alt="" fill className="object-cover" /></div>
              Messi
            </button>
            <button onClick={() => setActivePlayer("ronaldo")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activePlayer === "ronaldo" ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"
              }`}>
              <div className="relative w-6 h-6 rounded-full overflow-hidden"><Image src="/images/ronaldo.png" alt="" fill className="object-cover" /></div>
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