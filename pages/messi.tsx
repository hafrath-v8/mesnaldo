// pages/messi.tsx

import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface MessiPageProps {
  careerStats: any
  allMatches: any[]
  clubBreakdown: {
    name: string
    apps: number
    goals: number
    assists: number
  }[]
  goalsByYear: {
    year: string
    goals: number
  }[]
  goalsByCompetition: {
    name: string
    goals: number
  }[]
  totalTrophies: number
}

function safeNum(val: any): number {
  return typeof val === "number" ? val : 0
}

function getAge(birthDate: string) {
  const today = new Date()
  const birth = new Date(birthDate)

  let age = today.getFullYear() - birth.getFullYear()

  const birthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate())

  if (!birthdayPassed) {
    age--
  }

  return age
}

// Fetch every Messi match using Supabase pagination
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

    if (error || !data || data.length === 0) {
      break
    }

    allRows = allRows.concat(data)

    if (data.length < pageSize) {
      break
    }

    from += pageSize
  }

  return allRows
}

/*
  This list contains both team trophies and individual honours.
  Therefore the UI uses "Honours" rather than only "Trophies".
*/
const HONOURS = [
  { name: "Ballon d'Or", count: 8, icon: "🏆" },
  { name: "FIFA The Best", count: 3, icon: "🏅" },
  { name: "European Golden Shoe", count: 6, icon: "👟" },
  { name: "La Liga", count: 10, icon: "🏟️" },
  { name: "Champions League", count: 4, icon: "⭐" },
  { name: "Copa del Rey", count: 7, icon: "🏆" },
  { name: "FIFA Club World Cup", count: 3, icon: "🌍" },
  { name: "UEFA Super Cup", count: 3, icon: "🛡️" },
  { name: "Supercopa de España", count: 8, icon: "🥇" },
  { name: "Ligue 1", count: 2, icon: "🏟️" },
  { name: "Leagues Cup", count: 1, icon: "🏆" },
  { name: "MLS Supporters' Shield", count: 1, icon: "🏟️" },
  { name: "MLS Cup", count: 1, icon: "🏆" },
  { name: "FIFA World Cup", count: 1, icon: "🌎" },
  { name: "Copa América", count: 2, icon: "🏅" },
  { name: "Finalissima", count: 1, icon: "🤝" },
  { name: "Olympic Gold Medal", count: 1, icon: "🥇" },
  { name: "FIFA U-20 World Cup", count: 1, icon: "🌟" },
  { name: "FIFA World Cup Golden Ball", count: 2, icon: "⚽" },
  {
    name: "Laureus Sportsman of the Year",
    count: 2,
    icon: "🏆",
  },
  { name: "Pichichi Trophy", count: 8, icon: "👟" },
  { name: "FIFA FIFPro World XI", count: 17, icon: "🌟" },
]

export default function MessiProfile({
  careerStats,
  allMatches,
  clubBreakdown,
  goalsByYear,
  goalsByCompetition,
  totalTrophies,
}: MessiPageProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "matches" | "trophies" | "charts"
  >("overview")

  const [matchFilter, setMatchFilter] = useState("all")
  const [matchSearch, setMatchSearch] = useState("")
  const [matchSort, setMatchSort] = useState<
    "date-desc" | "date-asc" | "goals-desc"
  >("date-desc")

  const [matchPage, setMatchPage] = useState(1)

  const MATCHES_PER_PAGE = 25

  const totalGoals = safeNum(careerStats?.total_goals)
  const totalAssists = safeNum(careerStats?.total_assists)
  const totalGames = safeNum(careerStats?.total_games)
  const totalWins = safeNum(careerStats?.total_wins)
  const totalDraws = safeNum(careerStats?.total_draws)
  const totalLosses = safeNum(careerStats?.total_losses)

  const safeTotalGames = totalGames || 1
  const safeTotalGoals = totalGoals || 1

  const competitions = useMemo(() => {
    const comps = [
      ...new Set(
        allMatches
          .map((m) => m.competition)
          .filter(Boolean)
      ),
    ]

    return ["all", ...comps.sort()]
  }, [allMatches])

  const filteredMatches = useMemo(() => {
    let matches = [...allMatches]

    if (matchFilter !== "all") {
      matches = matches.filter(
        (m) => m.competition === matchFilter
      )
    }

    if (matchSearch) {
      const q = matchSearch.toLowerCase()

      matches = matches.filter(
        (m) =>
          (m.opponent || "").toLowerCase().includes(q) ||
          (m.competition || "").toLowerCase().includes(q) ||
          (m.team || "").toLowerCase().includes(q)
      )
    }

    if (matchSort === "date-desc") {
      matches.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
    } else if (matchSort === "date-asc") {
      matches.sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
    } else if (matchSort === "goals-desc") {
      matches.sort(
        (a, b) =>
          (b.goals || 0) - (a.goals || 0)
      )
    }

    return matches
  }, [
    allMatches,
    matchFilter,
    matchSearch,
    matchSort,
  ])

  const totalPages = Math.ceil(
    filteredMatches.length / MATCHES_PER_PAGE
  )

  const paginatedMatches = filteredMatches.slice(
    (matchPage - 1) * MATCHES_PER_PAGE,
    matchPage * MATCHES_PER_PAGE
  )

  const matchStats = useMemo(() => {
    const wins = filteredMatches.filter(
      (m) => m.result === "W"
    ).length

    const draws = filteredMatches.filter(
      (m) => m.result === "D"
    ).length

    const losses = filteredMatches.filter(
      (m) => m.result === "L"
    ).length

    const goals = filteredMatches.reduce(
      (sum, m) => sum + (m.goals || 0),
      0
    )

    const assists = filteredMatches.reduce(
      (sum, m) => sum + (m.assists || 0),
      0
    )

    return {
      wins,
      draws,
      losses,
      goals,
      assists,
      total: filteredMatches.length,
    }
  }, [filteredMatches])

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "matches",
      label: `Matches (${allMatches.length})`,
    },
    {
      id: "trophies",
      label: "Honours",
    },
    {
      id: "charts",
      label: "Charts",
    },
  ]

  const barcelona = clubBreakdown.find((team) =>
    team.name
      .toLowerCase()
      .includes("barcelona")
  )

  const argentina = clubBreakdown.find(
    (team) =>
      team.name.toLowerCase() === "argentina"
  )

  const psg = clubBreakdown.find(
    (team) =>
      team.name
        .toLowerCase()
        .includes("paris") ||
      team.name.toLowerCase().includes("psg")
  )

  const interMiami = clubBreakdown.find(
    (team) =>
      team.name
        .toLowerCase()
        .includes("inter miami")
  )

  const bestGoalYear =
    goalsByYear.length > 0
      ? [...goalsByYear].sort(
          (a, b) => b.goals - a.goals
        )[0]
      : null

  const topGoalCompetition =
    goalsByCompetition.length > 0
      ? goalsByCompetition[0]
      : null

  return (
    <Layout
      title="Lionel Messi Stats: Goals, Assists, Matches, Trophies & Career"
      description="Explore Lionel Messi career stats including total goals, assists, appearances, match history, Barcelona and Argentina records, goals by competition, trophies and season-by-season scoring."
    >
      <div className="bg-black">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative bg-gradient-to-b from-blue-900/20 via-gray-900 to-black border-b border-gray-800 overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_60%)]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left">

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-500/20 flex-shrink-0"
              >
                <Image
                  src="/images/messi.webp"
                  alt="Lionel Messi"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>

              <div>
                <p className="text-blue-400 text-sm font-bold mb-1">
                  🇦🇷 Argentina
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Lionel Messi
                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                  Forward · Inter Miami
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-gray-500">

                  <span>
                    Born: June 24, 1987 (
                    {getAge("1987-06-24")} yrs)
                  </span>

                  <span>·</span>

                  <span>
                    1.70m · Left Foot
                  </span>

                  <span>·</span>

                  <span>#10</span>

                </div>
              </div>
            </div>

            {/* HERO STATS */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">

              {[
                {
                  v: totalGoals.toLocaleString(),
                  l: "Goals",
                  c: "text-emerald-400",
                },
                {
                  v: totalAssists.toLocaleString(),
                  l: "Assists",
                  c: "text-blue-400",
                },
                {
                  v: totalGames.toLocaleString(),
                  l: "Games",
                  c: "text-white",
                },
                {
                  v: totalTrophies,
                  l: "Team Trophies",
                  c: "text-amber-400",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                  }}
                  className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center"
                >
                  <p
                    className={`text-2xl sm:text-3xl font-black ${stat.c}`}
                  >
                    {stat.v}
                  </p>

                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                    {stat.l}
                  </p>
                </motion.div>
              ))}

            </div>
          </div>
        </section>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">

          {/* TABS */}

          <div className="flex items-center gap-1 bg-gray-900/50 rounded-xl p-1 overflow-x-auto">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setMatchPage(1)
                }}
                className={`px-4 py-2 text-xs sm:text-sm whitespace-nowrap rounded-lg transition-all font-medium ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}

          </div>


          {/* =================================================
              OVERVIEW TAB
          ================================================= */}

          {activeTab === "overview" && (
            <div className="space-y-10">

              {/* TEAM BREAKDOWN */}

              <section>

                <h2 className="text-lg font-bold text-white mb-4">
                  Goals by Team
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                  {clubBreakdown.map((team, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: i * 0.05,
                      }}
                      className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 text-center"
                    >
                      <p className="text-xs text-gray-400 mb-2">
                        {team.name}
                      </p>

                      <p className="text-2xl font-black text-blue-400">
                        {team.goals.toLocaleString()}
                      </p>

                      <p className="text-[10px] text-gray-500 mt-1">
                        {team.apps.toLocaleString()} games ·{" "}
                        {team.assists.toLocaleString()} assists
                      </p>
                    </motion.div>
                  ))}

                </div>
              </section>


              {/* CAREER RECORD */}

              <section>

                <h2 className="text-lg font-bold text-white mb-4">
                  Career Record
                </h2>

                <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5">

                  <div className="grid grid-cols-3 gap-4 text-center">

                    <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">

                      <p className="text-2xl font-black text-emerald-400">
                        {totalWins.toLocaleString()}
                      </p>

                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                        Wins
                      </p>

                    </div>


                    <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/10">

                      <p className="text-2xl font-black text-amber-400">
                        {totalDraws.toLocaleString()}
                      </p>

                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                        Draws
                      </p>

                    </div>


                    <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10">

                      <p className="text-2xl font-black text-red-400">
                        {totalLosses.toLocaleString()}
                      </p>

                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                        Losses
                      </p>

                    </div>

                  </div>


                  {/* SAFE W/D/L BAR */}

                  <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">

                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: `${
                          (totalWins /
                            safeTotalGames) *
                          100
                        }%`,
                      }}
                    />

                    <div
                      className="h-full bg-amber-500"
                      style={{
                        width: `${
                          (totalDraws /
                            safeTotalGames) *
                          100
                        }%`,
                      }}
                    />

                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `${
                          (totalLosses /
                            safeTotalGames) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>
              </section>


              {/* GOALS BY COMPETITION */}

              <section>

                <h2 className="text-lg font-bold text-white mb-4">
                  Top Competitions
                </h2>

                <div className="space-y-2">

                  {goalsByCompetition
                    .slice(0, 8)
                    .map((comp, i) => (

                      <div
                        key={i}
                        className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-900/30"
                      >

                        <span className="text-sm text-gray-300 flex-1">
                          {comp.name}
                        </span>

                        <span className="text-sm font-bold text-blue-400">
                          {comp.goals.toLocaleString()}
                        </span>

                        <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">

                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            whileInView={{
                              width: `${
                                (comp.goals /
                                  safeTotalGoals) *
                                100
                              }%`,
                            }}
                            viewport={{
                              once: true,
                            }}
                            className="h-full bg-blue-500 rounded-full"
                          />

                        </div>
                      </div>
                    ))}

                </div>
              </section>

            </div>
          )}


          {/* =================================================
              MATCHES TAB
          ================================================= */}

          {activeTab === "matches" && (
            <div className="space-y-4">

              {/* MATCH STATS */}

              <div className="grid grid-cols-5 gap-2 text-center">

                <div className="bg-gray-900/60 rounded-xl p-3">
                  <p className="text-lg font-bold text-white">
                    {matchStats.total}
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Total
                  </p>
                </div>


                <div className="bg-emerald-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-emerald-400">
                    {matchStats.wins}
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Wins
                  </p>
                </div>


                <div className="bg-amber-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-amber-400">
                    {matchStats.draws}
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Draws
                  </p>
                </div>


                <div className="bg-red-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-red-400">
                    {matchStats.losses}
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Losses
                  </p>
                </div>


                <div className="bg-blue-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-blue-400">
                    {matchStats.goals}
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Goals
                  </p>
                </div>

              </div>


              {/* FILTERS */}

              <div className="flex flex-wrap items-center gap-2">

                <select
                  value={matchFilter}
                  onChange={(e) => {
                    setMatchFilter(e.target.value)
                    setMatchPage(1)
                  }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none"
                >

                  <option value="all">
                    All Competitions
                  </option>

                  {competitions
                    .filter(
                      (competition) =>
                        competition !== "all"
                    )
                    .map((competition) => (
                      <option
                        key={competition}
                        value={competition}
                      >
                        {competition}
                      </option>
                    ))}

                </select>


                <select
                  value={matchSort}
                  onChange={(e) => {
                    setMatchSort(
                      e.target.value as any
                    )
                    setMatchPage(1)
                  }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="date-desc">
                    Newest First
                  </option>

                  <option value="date-asc">
                    Oldest First
                  </option>

                  <option value="goals-desc">
                    Most Goals
                  </option>
                </select>


                <input
                  type="text"
                  placeholder="Search opponent..."
                  value={matchSearch}
                  onChange={(e) => {
                    setMatchSearch(e.target.value)
                    setMatchPage(1)
                  }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none flex-1 min-w-[150px]"
                />

              </div>


              {/* MATCH TABLE */}

              <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="border-b border-gray-700/50 bg-gray-800/30">

                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          #
                        </th>

                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          Date
                        </th>

                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          Competition
                        </th>

                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          Match
                        </th>

                        <th className="text-center py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          Result
                        </th>

                        <th className="text-center py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          G
                        </th>

                        <th className="text-center py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">
                          A
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {paginatedMatches.map(
                        (match, i) => (

                          <tr
                            key={match.id}
                            className="border-b border-gray-700/20 hover:bg-gray-800/20 transition-colors"
                          >

                            <td className="py-2.5 px-3 text-[10px] text-gray-600">
                              {(matchPage - 1) *
                                MATCHES_PER_PAGE +
                                i +
                                1}
                            </td>


                            <td className="py-2.5 px-3 text-xs text-gray-400 whitespace-nowrap">
                              {new Date(
                                match.date
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "2-digit",
                                }
                              )}
                            </td>


                            <td className="py-2.5 px-3 text-xs text-gray-400 max-w-[120px] truncate">
                              {match.competition}
                            </td>


                            <td className="py-2.5 px-3 text-xs text-gray-300">
                              {match.team}{" "}
                              <span className="text-gray-600">
                                vs
                              </span>{" "}
                              {match.opponent}
                            </td>


                            <td className="py-2.5 px-3 text-center">

                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  match.result === "W"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : match.result ===
                                      "D"
                                    ? "bg-amber-500/10 text-amber-400"
                                    : "bg-red-500/10 text-red-400"
                                }`}
                              >
                                {match.team_score}-
                                {
                                  match.opponent_score
                                }
                              </span>

                            </td>


                            <td className="py-2.5 px-3 text-center text-xs">

                              {match.goals > 0 ? (
                                <span className="text-emerald-400 font-bold">
                                  {match.goals}
                                </span>
                              ) : (
                                <span className="text-gray-600">
                                  -
                                </span>
                              )}

                            </td>


                            <td className="py-2.5 px-3 text-center text-xs">

                              {match.assists > 0 ? (
                                <span className="text-blue-400 font-bold">
                                  {match.assists}
                                </span>
                              ) : (
                                <span className="text-gray-600">
                                  -
                                </span>
                              )}

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>
              </div>


              {/* PAGINATION */}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">

                  <button
                    onClick={() =>
                      setMatchPage((page) =>
                        Math.max(
                          1,
                          page - 1
                        )
                      )
                    }
                    disabled={matchPage === 1}
                    className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 hover:text-white"
                  >
                    ← Prev
                  </button>


                  <span className="text-xs text-gray-500">
                    Page {matchPage} of{" "}
                    {totalPages}
                  </span>


                  <button
                    onClick={() =>
                      setMatchPage((page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                      )
                    }
                    disabled={
                      matchPage === totalPages
                    }
                    className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 hover:text-white"
                  >
                    Next →
                  </button>

                </div>
              )}

            </div>
          )}


          {/* =================================================
              HONOURS TAB
          ================================================= */}

          {activeTab === "trophies" && (

            <div className="space-y-5">

              <div className="text-center">

                <h2 className="text-xl font-black text-white">
                  Trophies & Individual Honours
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  Selected team trophies and individual
                  achievements from Messi&apos;s career.
                </p>

              </div>


              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

                {HONOURS.map((honour, i) => (

                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: i * 0.03,
                    }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 text-center"
                  >

                    <span className="text-2xl block mb-2">
                      {honour.icon}
                    </span>

                    <p className="text-xs text-gray-300">
                      {honour.name}
                    </p>

                    <p className="text-lg font-black text-blue-400">
                      {honour.count}x
                    </p>

                  </motion.div>

                ))}

              </div>

            </div>
          )}


          {/* =================================================
              CHARTS TAB
          ================================================= */}

          {activeTab === "charts" && (
            <div className="space-y-8">

              <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">

                <h3 className="text-sm font-bold text-white mb-4">
                  Goals by Year
                </h3>

                <div className="h-64 sm:h-72">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart data={goalsByYear}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1f2937"
                      />

                      <XAxis
                        dataKey="year"
                        tick={{
                          fill: "#6b7280",
                          fontSize: 11,
                        }}
                      />

                      <YAxis
                        tick={{
                          fill: "#6b7280",
                          fontSize: 11,
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          background: "#111827",
                          border:
                            "1px solid #374151",
                          borderRadius: "12px",
                        }}
                      />

                      <Bar
                        dataKey="goals"
                        fill="#3B82F6"
                        radius={[
                          6,
                          6,
                          0,
                          0,
                        ]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>
              </div>

            </div>
          )}


          {/* =================================================
              FOOTER NAV
          ================================================= */}

          <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-800">

            <Link
              href="/ronaldo"
              className="px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors"
            >
              View Ronaldo Profile →
            </Link>

          </div>


          {/* =================================================
              SEO CONTENT
          ================================================= */}

          <section className="mt-20 pt-14 border-t border-gray-800/50">

            <div className="max-w-4xl mx-auto">

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
                Lionel Messi Career Stats: Goals, Assists,
                Matches & Complete Profile
              </h2>


              <div className="space-y-7 text-sm text-gray-400 leading-8">

                <p>
                  This{" "}
                  <strong className="text-white">
                    Lionel Messi career profile
                  </strong>{" "}
                  brings together his goals, assists,
                  appearances, match results, team-by-team
                  statistics, competition records and career
                  achievements in one place.
                </p>

                <p>
                  Messi&apos;s career has included historic
                  periods with Barcelona and Argentina,
                  followed by spells with Paris Saint-Germain
                  and Inter Miami. His career is defined not
                  only by goalscoring but also by playmaking,
                  chance creation, dribbling and long-term
                  consistency.
                </p>

                <p>
                  According to the career statistics currently
                  used on this page, Messi has scored{" "}
                  <strong className="text-emerald-400">
                    {totalGoals.toLocaleString()}
                  </strong>{" "}
                  goals and provided{" "}
                  <strong className="text-blue-400">
                    {totalAssists.toLocaleString()}
                  </strong>{" "}
                  assists across{" "}
                  <strong className="text-white">
                    {totalGames.toLocaleString()}
                  </strong>{" "}
                  recorded matches.
                </p>


                {/* CAREER TOTALS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Career Statistics
                </h3>

                <p>
                  Messi&apos;s complete career numbers provide
                  a broad view of his attacking contribution
                  and longevity. The current Mesnaldo
                  statistics record{" "}
                  <strong className="text-white">
                    {totalGames.toLocaleString()}
                  </strong>{" "}
                  appearances,{" "}
                  <strong className="text-emerald-400">
                    {totalGoals.toLocaleString()}
                  </strong>{" "}
                  goals and{" "}
                  <strong className="text-blue-400">
                    {totalAssists.toLocaleString()}
                  </strong>{" "}
                  assists.
                </p>

                <p>
                  Appearances show longevity, goals represent
                  direct scoring output, while assists add
                  context to Messi&apos;s contribution as a
                  creator.
                </p>


                {/* GOALS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Many Career Goals Has Lionel Messi
                  Scored?
                </h3>

                <p>
                  Lionel Messi has{" "}
                  <strong className="text-emerald-400">
                    {totalGoals.toLocaleString()}
                  </strong>{" "}
                  goals according to the career statistics
                  currently displayed on this page.
                </p>

                <p>
                  His total includes goals recorded across the
                  teams and competitions represented in the
                  Mesnaldo match database. The detailed match
                  history can be used to examine when and
                  against whom those goals were scored.
                </p>


                {/* ASSISTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Career Assists
                </h3>

                <p>
                  Messi has recorded{" "}
                  <strong className="text-blue-400">
                    {totalAssists.toLocaleString()}
                  </strong>{" "}
                  assists in the career statistics currently
                  used on this page.
                </p>

                <p>
                  Assists are important when evaluating
                  Messi&apos;s career because his attacking
                  contribution has never been limited to
                  finishing. He has regularly combined
                  goalscoring with passing, vision and chance
                  creation.
                </p>


                {/* GOAL CONTRIBUTIONS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Career Goal Contributions
                </h3>

                <p>
                  Combining goals and assists gives Messi{" "}
                  <strong className="text-white">
                    {(
                      totalGoals +
                      totalAssists
                    ).toLocaleString()}
                  </strong>{" "}
                  recorded goal contributions in the current
                  career statistics.
                </p>

                <p>
                  Goal contributions provide a broader
                  attacking measurement than goals alone
                  because they include both finishing and the
                  final pass leading directly to a goal.
                </p>


                {/* GOALS PER GAME */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Goals Per Game
                </h3>

                <p>
                  Based on the totals displayed on this page,
                  Messi averages{" "}
                  <strong className="text-emerald-400">
                    {totalGames > 0
                      ? (
                          totalGoals /
                          totalGames
                        ).toFixed(3)
                      : "0.000"}
                  </strong>{" "}
                  goals per recorded appearance.
                </p>


                {/* ASSISTS PER GAME */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Assists Per Game
                </h3>

                <p>
                  Messi averages{" "}
                  <strong className="text-blue-400">
                    {totalGames > 0
                      ? (
                          totalAssists /
                          totalGames
                        ).toFixed(3)
                      : "0.000"}
                  </strong>{" "}
                  assists per recorded match.
                </p>

                <p>
                  Considering both goals per game and assists
                  per game helps show the balance between his
                  scoring and creative output.
                </p>


                {/* CAREER RESULTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Career Win Record
                </h3>

                <p>
                  The current career data records{" "}
                  <strong className="text-emerald-400">
                    {totalWins.toLocaleString()}
                  </strong>{" "}
                  wins,{" "}
                  <strong className="text-amber-400">
                    {totalDraws.toLocaleString()}
                  </strong>{" "}
                  draws and{" "}
                  <strong className="text-red-400">
                    {totalLosses.toLocaleString()}
                  </strong>{" "}
                  losses.
                </p>

                {totalGames > 0 && (
                  <p>
                    This represents a recorded win rate of
                    approximately{" "}
                    <strong className="text-white">
                      {(
                        (totalWins /
                          totalGames) *
                        100
                      ).toFixed(1)}
                      %
                    </strong>.
                  </p>
                )}

                <p>
                  Match results are team statistics rather
                  than purely individual achievements, but
                  they provide additional context for the
                  environments in which Messi produced his
                  goals and assists.
                </p>


                {/* TEAM BREAKDOWN */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Goals by Team
                </h3>

                <p>
                  Messi&apos;s available match records can be
                  broken down by team. The overview above
                  displays appearances, goals and assists for
                  each team represented in the database.
                </p>

                <p>
                  This makes it possible to compare his
                  statistical production across Barcelona,
                  Argentina, Paris Saint-Germain, Inter Miami
                  and other teams included in the data.
                </p>


                {/* BARCELONA */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Barcelona Career
                </h3>

                <p>
                  Barcelona represents the defining club
                  period of Messi&apos;s career. He developed
                  through the club&apos;s system before
                  becoming the central attacking figure of
                  one of the most successful periods in
                  Barcelona history.
                </p>

                <p>
                  During his Barcelona years, Messi combined
                  extraordinary goalscoring with playmaking,
                  close control and chance creation.
                </p>

                {barcelona && (
                  <p>
                    The current database contains{" "}
                    <strong className="text-white">
                      {barcelona.apps.toLocaleString()}
                    </strong>{" "}
                    Barcelona appearances,{" "}
                    <strong className="text-emerald-400">
                      {barcelona.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {barcelona.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>
                )}


                {/* ARGENTINA */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Argentina Career
                </h3>

                <p>
                  Messi&apos;s international career with
                  Argentina forms another major part of his
                  overall profile. His national-team career
                  includes goals, assists, tournament
                  appearances and major international
                  achievements.
                </p>

                {argentina && (
                  <p>
                    The current dataset contains{" "}
                    <strong className="text-white">
                      {argentina.apps.toLocaleString()}
                    </strong>{" "}
                    Argentina appearances, with{" "}
                    <strong className="text-emerald-400">
                      {argentina.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {argentina.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>
                )}


                {/* PSG */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Paris Saint-Germain Career
                </h3>

                <p>
                  After leaving Barcelona, Messi continued his
                  European career with Paris Saint-Germain.
                  The move placed him in Ligue 1 and provided
                  a different tactical environment after most
                  of his senior club career had been spent in
                  Spain.
                </p>

                {psg && (
                  <p>
                    His PSG record in the current database
                    contains{" "}
                    <strong className="text-white">
                      {psg.apps.toLocaleString()}
                    </strong>{" "}
                    appearances,{" "}
                    <strong className="text-emerald-400">
                      {psg.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {psg.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>
                )}


                {/* INTER MIAMI */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Inter Miami Career
                </h3>

                <p>
                  Messi later moved to Inter Miami, beginning
                  a new stage of his career in North American
                  football.
                </p>

                {interMiami && (
                  <p>
                    His current Inter Miami record in the
                    database contains{" "}
                    <strong className="text-white">
                      {interMiami.apps.toLocaleString()}
                    </strong>{" "}
                    appearances,{" "}
                    <strong className="text-emerald-400">
                      {interMiami.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {interMiami.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>
                )}


                {/* COMPETITION */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Goals by Competition
                </h3>

                <p>
                  Messi&apos;s goals are distributed across
                  domestic leagues, international football,
                  European competitions and cup tournaments.
                  The competition breakdown ranks
                  competitions using the goals currently
                  recorded in the database.
                </p>

                {topGoalCompetition && (
                  <p>
                    The competition with the largest Messi
                    goal total in the current dataset is{" "}
                    <strong className="text-white">
                      {topGoalCompetition.name}
                    </strong>
                    , with{" "}
                    <strong className="text-emerald-400">
                      {topGoalCompetition.goals.toLocaleString()}
                    </strong>{" "}
                    recorded goals.
                  </p>
                )}


                {/* CHAMPIONS LEAGUE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Champions League Career
                </h3>

                <p>
                  The UEFA Champions League forms one of the
                  most important parts of Messi&apos;s
                  European career. His performances in the
                  competition contributed heavily to his
                  reputation as one of the leading attacking
                  players of his generation.
                </p>

                <p>
                  Champions League performances can be
                  examined alongside his league,
                  international and domestic cup statistics
                  to understand how his scoring varied across
                  different competitions.
                </p>


                {/* YEARLY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Goals by Year
                </h3>

                <p>
                  The Goals by Year chart provides a visual
                  timeline of Messi&apos;s scoring output.
                  Instead of relying only on a final career
                  total, it shows how his goals were
                  distributed across different calendar
                  years.
                </p>

                {bestGoalYear && (
                  <p>
                    Among the calendar years represented in
                    the current database, Messi&apos;s highest
                    recorded total is{" "}
                    <strong className="text-emerald-400">
                      {bestGoalYear.goals}
                    </strong>{" "}
                    goals in{" "}
                    <strong className="text-white">
                      {bestGoalYear.year}
                    </strong>.
                  </p>
                )}


                {/* MATCH HISTORY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Complete Match History
                </h3>

                <p>
                  The Matches tab provides access to the
                  individual match records available for this
                  profile. Each row can include the date,
                  competition, teams, result, goals and
                  assists.
                </p>

                <p>
                  There are currently{" "}
                  <strong className="text-white">
                    {allMatches.length.toLocaleString()}
                  </strong>{" "}
                  Messi match records available on this page.
                </p>

                <p>
                  Matches can be filtered by competition,
                  searched by opponent, competition or team,
                  and sorted by date or goals scored.
                </p>


                {/* HONOURS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Trophies and Individual
                  Honours
                </h3>

                <p>
                  Messi&apos;s career includes major
                  achievements in club, international and
                  individual football. The Honours tab
                  provides a quick overview of selected team
                  trophies and individual achievements
                  configured for this profile.
                </p>

                <p>
                  Team trophies and individual awards should
                  be understood separately. League titles and
                  international tournaments measure team
                  success, while awards such as the
                  Ballon d&apos;Or recognise individual
                  performance.
                </p>


                {/* BALLON D'OR */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Ballon d&apos;Or Awards
                </h3>

                <p>
                  Messi&apos;s individual honours include
                  multiple Ballon d&apos;Or victories,
                  reflecting his sustained position among
                  football&apos;s leading players across
                  different periods of his career.
                </p>

                <p>
                  Individual awards provide one perspective
                  on his career, but they are most useful when
                  considered alongside match statistics,
                  trophies and performances across major
                  competitions.
                </p>


                {/* WORLD CUP */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi World Cup Career
                </h3>

                <p>
                  The FIFA World Cup forms an important part
                  of Messi&apos;s international legacy. His
                  World Cup career spans multiple tournaments
                  and contributes to the wider Argentina
                  statistics represented on this profile.
                </p>

                <p>
                  World Cup performances can be evaluated
                  through goals, assists, appearances, match
                  results and tournament achievements instead
                  of relying on one statistic alone.
                </p>


                {/* COPA AMERICA */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Copa América Career
                </h3>

                <p>
                  Copa América has also been a major part of
                  Messi&apos;s international career with
                  Argentina. His appearances in the
                  competition contribute to his international
                  goals, assists and overall tournament
                  record.
                </p>


                {/* PLAYING STYLE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Playing Style
                </h3>

                <p>
                  Messi&apos;s statistical profile reflects a
                  player capable of contributing from several
                  attacking roles. He has operated as a
                  winger, central attacker, false nine and
                  creative playmaker at different stages of
                  his career.
                </p>

                <p>
                  His left-footed finishing, close control,
                  dribbling, passing and chance creation mean
                  that goals alone provide only part of his
                  overall attacking profile.
                </p>


                {/* LONGEVITY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Lionel Messi Career Longevity
                </h3>

                <p>
                  Messi&apos;s longevity is demonstrated by
                  the number of seasons, matches and
                  competitions represented across his career.
                  Remaining productive through changing
                  teams, leagues and tactical roles has
                  allowed his overall goal and assist totals
                  to continue growing over a long period.
                </p>

                <p>
                  Long-term performance is best understood by
                  combining career totals with efficiency and
                  season-by-season production.
                </p>


                {/* METHODOLOGY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Lionel Messi Statistics Are Calculated
                  on Mesnaldo
                </h3>

                <p>
                  Mesnaldo uses individual match records to
                  create many of the breakdowns on this
                  profile. Match data is grouped by team,
                  competition and calendar year to generate
                  the corresponding statistics and charts.
                </p>

                <p>
                  Career totals displayed at the top of the
                  profile come from the career statistics
                  data used by the site, while the detailed
                  match section provides the available
                  match-level information.
                </p>

                <p>
                  Football statistics can differ between data
                  providers, particularly for historical
                  assists. The figures on this page should
                  therefore be understood according to the
                  methodology and match records used by
                  Mesnaldo.
                </p>


                {/* FAQ */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Lionel Messi Stats FAQ
                </h2>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many goals does Lionel Messi have?
                </h3>

                <p>
                  Messi currently has{" "}
                  <strong className="text-emerald-400">
                    {totalGoals.toLocaleString()}
                  </strong>{" "}
                  goals according to the career statistics
                  used on this page.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many assists does Lionel Messi have?
                </h3>

                <p>
                  Messi currently has{" "}
                  <strong className="text-blue-400">
                    {totalAssists.toLocaleString()}
                  </strong>{" "}
                  recorded assists in the Mesnaldo career
                  statistics.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many games has Lionel Messi played?
                </h3>

                <p>
                  The current career statistics display{" "}
                  <strong className="text-white">
                    {totalGames.toLocaleString()}
                  </strong>{" "}
                  Messi appearances.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  What is Lionel Messi&apos;s goals-per-game
                  ratio?
                </h3>

                <p>
                  Based on the totals currently displayed,
                  Messi averages approximately{" "}
                  <strong className="text-emerald-400">
                    {totalGames > 0
                      ? (
                          totalGoals /
                          totalGames
                        ).toFixed(3)
                      : "0.000"}
                  </strong>{" "}
                  goals per match.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many goal contributions does Messi
                  have?
                </h3>

                <p>
                  Combining the goals and assists displayed on
                  this page gives Messi{" "}
                  <strong className="text-white">
                    {(
                      totalGoals +
                      totalAssists
                    ).toLocaleString()}
                  </strong>{" "}
                  recorded goal contributions.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Does this page include Messi&apos;s match
                  history?
                </h3>

                <p>
                  Yes. The Matches tab currently contains{" "}
                  <strong className="text-white">
                    {allMatches.length.toLocaleString()}
                  </strong>{" "}
                  match records and allows them to be
                  filtered, searched, sorted and viewed across
                  multiple pages.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Can I see Messi&apos;s goals by team?
                </h3>

                <p>
                  Yes. The overview groups available match
                  records by team and displays Messi&apos;s
                  appearances, goals and assists for each one.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Can I see Messi&apos;s goals by competition?
                </h3>

                <p>
                  Yes. This profile calculates goals by
                  competition from the available match records
                  and displays the leading competitions in the
                  overview.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Does this page show Messi&apos;s goals by
                  year?
                </h3>

                <p>
                  Yes. The Charts tab groups Messi&apos;s
                  recorded goals by calendar year and displays
                  them in a career scoring chart.
                </p>


                {/* CONCLUSION */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Lionel Messi Complete Career Profile
                </h2>

                <p>
                  Lionel Messi&apos;s career combines elite
                  goalscoring with exceptional creative
                  production. His statistics across
                  Barcelona, Argentina, Paris Saint-Germain
                  and Inter Miami demonstrate longevity and
                  adaptability across different stages of his
                  career.
                </p>

                <p>
                  Goals explain only one part of his profile.
                  Assists, appearances, match results,
                  competition statistics, international
                  performances and long-term consistency
                  provide a broader picture.
                </p>

                <p>
                  This Mesnaldo profile brings those
                  statistics together with searchable match
                  history, team breakdowns, competition data
                  and yearly scoring trends to provide a
                  detailed overview of Lionel Messi&apos;s
                  career.
                </p>

              </div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  )
}


/* =========================================================
   SERVER SIDE DATA
========================================================= */

export const getServerSideProps: GetServerSideProps =
  async () => {
    try {
      const { data: careerStats } =
        await supabase
          .from("career_stats")
          .select("*")
          .eq("player_id", 1)
          .single()

      const allMatches =
        await fetchAllMatches(1)


      /* TEAM BREAKDOWN */

      const teamMap: Record<
        string,
        {
          apps: number
          goals: number
          assists: number
        }
      > = {}

      allMatches.forEach((match: any) => {
        const team =
          match.team || "Unknown"

        if (!teamMap[team]) {
          teamMap[team] = {
            apps: 0,
            goals: 0,
            assists: 0,
          }
        }

        teamMap[team].apps += 1

        teamMap[team].goals +=
          match.goals || 0

        teamMap[team].assists +=
          match.assists || 0
      })

      const clubBreakdown =
        Object.entries(teamMap)
          .map(([name, data]) => ({
            name,
            ...data,
          }))
          .sort(
            (a, b) =>
              b.apps - a.apps
          )


      /* GOALS BY CALENDAR YEAR */

      const yearMap: Record<
        string,
        number
      > = {}

      allMatches.forEach(
        (match: any) => {
          const year = new Date(
            match.date
          )
            .getFullYear()
            .toString()

          yearMap[year] =
            (yearMap[year] || 0) +
            (match.goals || 0)
        }
      )

      const goalsByYear =
        Object.entries(yearMap)
          .map(([year, goals]) => ({
            year,
            goals,
          }))
          .sort((a, b) =>
            a.year.localeCompare(
              b.year
            )
          )


      /* GOALS BY COMPETITION */

      const competitionMap: Record<
        string,
        number
      > = {}

      allMatches.forEach(
        (match: any) => {
          const competition =
            match.competition ||
            "Other"

          competitionMap[
            competition
          ] =
            (competitionMap[
              competition
            ] || 0) +
            (match.goals || 0)
        }
      )

      const goalsByCompetition =
        Object.entries(
          competitionMap
        )
          .map(([name, goals]) => ({
            name,
            goals,
          }))
          .sort(
            (a, b) =>
              b.goals - a.goals
          )
          .slice(0, 12)


      /*
        NOTE:
        This remains hardcoded because the original
        file does not currently retrieve Messi's team
        trophy total from Supabase.

        Later, connect this to your trophies database
        so you maintain the number in only one place.
      */
      const totalTrophies = 48


      return {
        props: {
          careerStats:
            careerStats || {},
          allMatches,
          clubBreakdown,
          goalsByYear,
          goalsByCompetition,
          totalTrophies,
        },
      }
    } catch (error) {
      console.error(
        "Messi profile error:",
        error
      )

      return {
        props: {
          careerStats: {},
          allMatches: [],
          clubBreakdown: [],
          goalsByYear: [],
          goalsByCompetition: [],
          totalTrophies: 0,
        },
      }
    }
  }