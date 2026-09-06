// pages/ronaldo.tsx

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


/* =========================================================
   TYPES
========================================================= */

interface RonaldoPageProps {
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


/* =========================================================
   HELPERS
========================================================= */

function safeNum(val: any): number {
  return typeof val === "number" ? val : 0
}


function getAge(birthDate: string) {
  const today = new Date()
  const birth = new Date(birthDate)

  let age =
    today.getFullYear() -
    birth.getFullYear()

  const birthdayPassed =
    today.getMonth() >
      birth.getMonth() ||
    (
      today.getMonth() ===
        birth.getMonth() &&
      today.getDate() >=
        birth.getDate()
    )

  if (!birthdayPassed) {
    age--
  }

  return age
}


/* =========================================================
   FETCH ALL MATCHES
========================================================= */

async function fetchAllMatches(
  playerId: number
) {
  const pageSize = 1000

  let allRows: any[] = []
  let from = 0

  while (true) {
    const { data, error } =
      await supabase
        .from("matches")
        .select("*")
        .eq(
          "player_id",
          playerId
        )
        .range(
          from,
          from + pageSize - 1
        )
        .order("date", {
          ascending: true,
        })

    if (
      error ||
      !data ||
      data.length === 0
    ) {
      break
    }

    allRows =
      allRows.concat(data)

    if (
      data.length <
      pageSize
    ) {
      break
    }

    from += pageSize
  }

  return allRows
}


/* =========================================================
   TROPHIES + INDIVIDUAL HONOURS

   This list contains both team trophies and individual
   awards, so the UI uses "Honours" rather than only
   "Trophies".
========================================================= */

const HONOURS = [
  {
    name: "Ballon d'Or",
    count: 5,
    icon: "🏆",
  },
  {
    name: "FIFA The Best",
    count: 2,
    icon: "🏅",
  },
  {
    name: "European Golden Shoe",
    count: 4,
    icon: "👟",
  },
  {
    name: "Premier League",
    count: 3,
    icon: "🏟️",
  },
  {
    name: "La Liga",
    count: 2,
    icon: "🏟️",
  },
  {
    name: "Serie A",
    count: 2,
    icon: "🏟️",
  },
  {
    name: "Champions League",
    count: 5,
    icon: "⭐",
  },
  {
    name: "FIFA Club World Cup",
    count: 4,
    icon: "🌍",
  },
  {
    name: "UEFA Super Cup",
    count: 3,
    icon: "🛡️",
  },
  {
    name: "FA Cup",
    count: 1,
    icon: "🏆",
  },
  {
    name: "Copa del Rey",
    count: 2,
    icon: "🏆",
  },
  {
    name: "Coppa Italia",
    count: 1,
    icon: "🏆",
  },
  {
    name: "League Cup (EFL)",
    count: 2,
    icon: "🏆",
  },
  {
    name: "Supercopa de España",
    count: 2,
    icon: "🥇",
  },
  {
    name: "Supercoppa Italiana",
    count: 2,
    icon: "🥇",
  },
  {
    name: "Taça de Portugal",
    count: 1,
    icon: "🏆",
  },
  {
    name: "Arab Club Champions Cup",
    count: 1,
    icon: "🏆",
  },
  {
    name: "UEFA European Championship",
    count: 1,
    icon: "🏆",
  },
  {
    name: "UEFA Nations League",
    count: 1,
    icon: "🌍",
  },
  {
    name: "FIFA Puskás Award",
    count: 1,
    icon: "⚽",
  },
  {
    name: "UEFA Best Player in Europe",
    count: 3,
    icon: "🏅",
  },
  {
    name: "FIFA FIFPro World XI",
    count: 15,
    icon: "🌟",
  },
]


/* =========================================================
   PAGE
========================================================= */

export default function RonaldoProfile({
  careerStats,
  allMatches,
  clubBreakdown,
  goalsByYear,
  goalsByCompetition,
  totalTrophies,
}: RonaldoPageProps) {

  const [
    activeTab,
    setActiveTab,
  ] = useState<
    | "overview"
    | "matches"
    | "trophies"
    | "charts"
  >("overview")


  /* =======================================================
     MATCH FILTERS
  ======================================================= */

  const [
    matchFilter,
    setMatchFilter,
  ] = useState("all")

  const [
    matchSearch,
    setMatchSearch,
  ] = useState("")

  const [
    matchSort,
    setMatchSort,
  ] = useState<
    | "date-desc"
    | "date-asc"
    | "goals-desc"
  >("date-desc")

  const [
    matchPage,
    setMatchPage,
  ] = useState(1)

  const MATCHES_PER_PAGE = 25


  /* =======================================================
     CAREER TOTALS
  ======================================================= */

  const totalGoals =
    safeNum(
      careerStats?.total_goals
    )

  const totalAssists =
    safeNum(
      careerStats?.total_assists
    )

  const totalGames =
    safeNum(
      careerStats?.total_games
    )

  const totalWins =
    safeNum(
      careerStats?.total_wins
    )

  const totalDraws =
    safeNum(
      careerStats?.total_draws
    )

  const totalLosses =
    safeNum(
      careerStats?.total_losses
    )


  /* =======================================================
     SAFE VALUES
  ======================================================= */

  const safeTotalGames =
    totalGames || 1

  const safeTotalGoals =
    totalGoals || 1


  /* =======================================================
     COMPETITIONS
  ======================================================= */

  const competitions =
    useMemo(() => {
      const comps = [
        ...new Set(
          allMatches
            .map(
              (m) =>
                m.competition
            )
            .filter(Boolean)
        ),
      ]

      return [
        "all",
        ...comps.sort(),
      ]
    }, [allMatches])


  /* =======================================================
     FILTER MATCHES
  ======================================================= */

  const filteredMatches =
    useMemo(() => {
      let matches = [
        ...allMatches,
      ]

      if (
        matchFilter !==
        "all"
      ) {
        matches =
          matches.filter(
            (m) =>
              m.competition ===
              matchFilter
          )
      }

      if (matchSearch) {
        const q =
          matchSearch
            .toLowerCase()

        matches =
          matches.filter(
            (m) =>
              (
                m.opponent ||
                ""
              )
                .toLowerCase()
                .includes(q) ||
              (
                m.competition ||
                ""
              )
                .toLowerCase()
                .includes(q) ||
              (
                m.team ||
                ""
              )
                .toLowerCase()
                .includes(q)
          )
      }


      if (
        matchSort ===
        "date-desc"
      ) {
        matches.sort(
          (a, b) =>
            new Date(
              b.date
            ).getTime() -
            new Date(
              a.date
            ).getTime()
        )
      } else if (
        matchSort ===
        "date-asc"
      ) {
        matches.sort(
          (a, b) =>
            new Date(
              a.date
            ).getTime() -
            new Date(
              b.date
            ).getTime()
        )
      } else if (
        matchSort ===
        "goals-desc"
      ) {
        matches.sort(
          (a, b) =>
            (b.goals || 0) -
            (a.goals || 0)
        )
      }

      return matches
    }, [
      allMatches,
      matchFilter,
      matchSearch,
      matchSort,
    ])


  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.ceil(
      filteredMatches.length /
        MATCHES_PER_PAGE
    )

  const paginatedMatches =
    filteredMatches.slice(
      (matchPage - 1) *
        MATCHES_PER_PAGE,
      matchPage *
        MATCHES_PER_PAGE
    )


  /* =======================================================
     FILTERED MATCH STATS
  ======================================================= */

  const matchStats =
    useMemo(() => {

      const wins =
        filteredMatches.filter(
          (m) =>
            m.result === "W"
        ).length

      const draws =
        filteredMatches.filter(
          (m) =>
            m.result === "D"
        ).length

      const losses =
        filteredMatches.filter(
          (m) =>
            m.result === "L"
        ).length

      const goals =
        filteredMatches.reduce(
          (sum, m) =>
            sum +
            (m.goals || 0),
          0
        )

      const assists =
        filteredMatches.reduce(
          (sum, m) =>
            sum +
            (m.assists ||
              0),
          0
        )

      return {
        wins,
        draws,
        losses,
        goals,
        assists,
        total:
          filteredMatches.length,
      }

    }, [filteredMatches])


  /* =======================================================
     TABS
  ======================================================= */

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


  /* =======================================================
     TEAM LOOKUPS
  ======================================================= */

  const sporting =
    clubBreakdown.find(
      (team) =>
        team.name
          .toLowerCase()
          .includes(
            "sporting"
          )
    )

  const manchesterUnited =
    clubBreakdown.find(
      (team) =>
        team.name
          .toLowerCase()
          .includes(
            "manchester united"
          )
    )

  const realMadrid =
    clubBreakdown.find(
      (team) =>
        team.name
          .toLowerCase()
          .includes(
            "real madrid"
          )
    )

  const juventus =
    clubBreakdown.find(
      (team) =>
        team.name
          .toLowerCase()
          .includes(
            "juventus"
          )
    )

  const alNassr =
    clubBreakdown.find(
      (team) =>
        team.name
          .toLowerCase()
          .includes(
            "al nassr"
          )
    )

  const portugal =
    clubBreakdown.find(
      (team) =>
        team.name
          .toLowerCase() ===
        "portugal"
    )


  /* =======================================================
     BEST YEAR
  ======================================================= */

  const bestGoalYear =
    goalsByYear.length > 0
      ? [...goalsByYear].sort(
          (a, b) =>
            b.goals -
            a.goals
        )[0]
      : null


  /* =======================================================
     TOP GOAL COMPETITION
  ======================================================= */

  const topGoalCompetition =
    goalsByCompetition.length >
    0
      ? goalsByCompetition[0]
      : null


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Layout
      title="Cristiano Ronaldo Stats: Goals, Assists, Matches, Trophies & Career"
      description="Explore Cristiano Ronaldo career stats including total goals, assists, appearances, match history, Real Madrid and Portugal records, goals by competition, trophies and yearly scoring."
    >
      <div className="bg-black">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative bg-gradient-to-b from-red-900/20 via-gray-900 to-black border-b border-gray-800 overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.1),transparent_60%)]" />

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
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-red-500/20 flex-shrink-0"
              >
                <Image
                  src="/images/ronaldo.webp"
                  alt="Cristiano Ronaldo"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>


              <div>

                <p className="text-red-400 text-sm font-bold mb-1">
                  🇵🇹 Portugal
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Cristiano Ronaldo
                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                  Forward · Al Nassr
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-gray-500">

                  <span>
                    Born: February 5,
                    1985 (
                    {getAge(
                      "1985-02-05"
                    )}{" "}
                    yrs)
                  </span>

                  <span>·</span>

                  <span>
                    1.87m · Right Foot
                  </span>

                  <span>·</span>

                  <span>#7</span>

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
              ].map(
                (
                  stat,
                  i
                ) => (

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
                      delay:
                        0.3 +
                        i * 0.1,
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

                )
              )}

            </div>

          </div>

        </section>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">


          {/* =================================================
              TABS
          ================================================= */}

          <div className="flex items-center gap-1 bg-gray-900/50 rounded-xl p-1 overflow-x-auto">

            {tabs.map(
              (tab) => (

                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(
                      tab.id as any
                    )

                    setMatchPage(
                      1
                    )
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm whitespace-nowrap rounded-lg transition-all font-medium ${
                    activeTab ===
                    tab.id
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>

              )
            )}

          </div>


          {/* =================================================
              OVERVIEW TAB
          ================================================= */}

          {activeTab ===
            "overview" && (

            <div className="space-y-10">


              {/* GOALS BY TEAM */}

              <section>

                <h2 className="text-lg font-bold text-white mb-4">
                  Goals by Team
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                  {clubBreakdown.map(
                    (
                      team,
                      i
                    ) => (

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
                          delay:
                            i *
                            0.05,
                        }}
                        className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 text-center"
                      >

                        <p className="text-xs text-gray-400 mb-2">
                          {
                            team.name
                          }
                        </p>

                        <p className="text-2xl font-black text-red-400">
                          {team.goals.toLocaleString()}
                        </p>

                        <p className="text-[10px] text-gray-500 mt-1">
                          {team.apps.toLocaleString()}{" "}
                          games ·{" "}
                          {team.assists.toLocaleString()}{" "}
                          assists
                        </p>

                      </motion.div>

                    )
                  )}

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


                  {/* SAFE RESULT BAR */}

                  <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">

                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: `${
                          (
                            totalWins /
                            safeTotalGames
                          ) *
                          100
                        }%`,
                      }}
                    />

                    <div
                      className="h-full bg-amber-500"
                      style={{
                        width: `${
                          (
                            totalDraws /
                            safeTotalGames
                          ) *
                          100
                        }%`,
                      }}
                    />

                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `${
                          (
                            totalLosses /
                            safeTotalGames
                          ) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>

              </section>


              {/* TOP COMPETITIONS */}

              <section>

                <h2 className="text-lg font-bold text-white mb-4">
                  Top Competitions
                </h2>

                <div className="space-y-2">

                  {goalsByCompetition
                    .slice(
                      0,
                      8
                    )
                    .map(
                      (
                        comp,
                        i
                      ) => (

                        <div
                          key={i}
                          className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-900/30"
                        >

                          <span className="text-sm text-gray-300 flex-1">
                            {
                              comp.name
                            }
                          </span>

                          <span className="text-sm font-bold text-red-400">
                            {comp.goals.toLocaleString()}
                          </span>

                          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">

                            <motion.div
                              initial={{
                                width: 0,
                              }}
                              whileInView={{
                                width: `${
                                  (
                                    comp.goals /
                                    safeTotalGoals
                                  ) *
                                  100
                                }%`,
                              }}
                              viewport={{
                                once: true,
                              }}
                              className="h-full bg-red-500 rounded-full"
                            />

                          </div>

                        </div>

                      )
                    )}

                </div>

              </section>

            </div>

          )}


          {/* =================================================
              MATCHES TAB
          ================================================= */}

          {activeTab ===
            "matches" && (

            <div className="space-y-4">


              {/* MATCH STATS */}

              <div className="grid grid-cols-5 gap-2 text-center">

                <div className="bg-gray-900/60 rounded-xl p-3">
                  <p className="text-lg font-bold text-white">
                    {
                      matchStats.total
                    }
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Total
                  </p>
                </div>


                <div className="bg-emerald-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-emerald-400">
                    {
                      matchStats.wins
                    }
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Wins
                  </p>
                </div>


                <div className="bg-amber-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-amber-400">
                    {
                      matchStats.draws
                    }
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Draws
                  </p>
                </div>


                <div className="bg-red-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-red-400">
                    {
                      matchStats.losses
                    }
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Losses
                  </p>
                </div>


                <div className="bg-blue-500/5 rounded-xl p-3">
                  <p className="text-lg font-bold text-blue-400">
                    {
                      matchStats.goals
                    }
                  </p>
                  <p className="text-[9px] text-gray-500">
                    Goals
                  </p>
                </div>

              </div>


              {/* FILTERS */}

              <div className="flex flex-wrap items-center gap-2">

                <select
                  value={
                    matchFilter
                  }
                  onChange={(
                    e
                  ) => {
                    setMatchFilter(
                      e.target
                        .value
                    )

                    setMatchPage(
                      1
                    )
                  }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none"
                >

                  <option value="all">
                    All Competitions
                  </option>

                  {competitions
                    .filter(
                      (
                        competition
                      ) =>
                        competition !==
                        "all"
                    )
                    .map(
                      (
                        competition
                      ) => (

                        <option
                          key={
                            competition
                          }
                          value={
                            competition
                          }
                        >
                          {
                            competition
                          }
                        </option>

                      )
                    )}

                </select>


                <select
                  value={
                    matchSort
                  }
                  onChange={(
                    e
                  ) => {
                    setMatchSort(
                      e.target
                        .value as any
                    )

                    setMatchPage(
                      1
                    )
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
                  value={
                    matchSearch
                  }
                  onChange={(
                    e
                  ) => {
                    setMatchSearch(
                      e.target
                        .value
                    )

                    setMatchPage(
                      1
                    )
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
                        (
                          match,
                          i
                        ) => (

                          <tr
                            key={
                              match.id
                            }
                            className="border-b border-gray-700/20 hover:bg-gray-800/20 transition-colors"
                          >

                            <td className="py-2.5 px-3 text-[10px] text-gray-600">

                              {(matchPage -
                                1) *
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
                                  month:
                                    "short",
                                  day:
                                    "numeric",
                                  year:
                                    "2-digit",
                                }
                              )}

                            </td>


                            <td className="py-2.5 px-3 text-xs text-gray-400 max-w-[120px] truncate">
                              {
                                match.competition
                              }
                            </td>


                            <td className="py-2.5 px-3 text-xs text-gray-300">

                              {
                                match.team
                              }{" "}

                              <span className="text-gray-600">
                                vs
                              </span>{" "}

                              {
                                match.opponent
                              }

                            </td>


                            <td className="py-2.5 px-3 text-center">

                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  match.result ===
                                  "W"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : match.result ===
                                      "D"
                                    ? "bg-amber-500/10 text-amber-400"
                                    : "bg-red-500/10 text-red-400"
                                }`}
                              >
                                {
                                  match.team_score
                                }
                                -
                                {
                                  match.opponent_score
                                }
                              </span>

                            </td>


                            <td className="py-2.5 px-3 text-center text-xs">

                              {match.goals >
                              0 ? (

                                <span className="text-emerald-400 font-bold">
                                  {
                                    match.goals
                                  }
                                </span>

                              ) : (

                                <span className="text-gray-600">
                                  -
                                </span>

                              )}

                            </td>


                            <td className="py-2.5 px-3 text-center text-xs">

                              {match.assists >
                              0 ? (

                                <span className="text-blue-400 font-bold">
                                  {
                                    match.assists
                                  }
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
                      setMatchPage(
                        (
                          page
                        ) =>
                          Math.max(
                            1,
                            page -
                              1
                          )
                      )
                    }
                    disabled={
                      matchPage ===
                      1
                    }
                    className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 hover:text-white"
                  >
                    ← Prev
                  </button>


                  <span className="text-xs text-gray-500">
                    Page{" "}
                    {matchPage}{" "}
                    of{" "}
                    {totalPages}
                  </span>


                  <button
                    onClick={() =>
                      setMatchPage(
                        (
                          page
                        ) =>
                          Math.min(
                            totalPages,
                            page +
                              1
                          )
                      )
                    }
                    disabled={
                      matchPage ===
                      totalPages
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

          {activeTab ===
            "trophies" && (

            <div className="space-y-5">

              <div className="text-center">

                <h2 className="text-xl font-black text-white">
                  Trophies & Individual
                  Honours
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  Selected team trophies
                  and individual
                  achievements from
                  Cristiano Ronaldo&apos;s
                  career.
                </p>

              </div>


              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

                {HONOURS.map(
                  (
                    honour,
                    i
                  ) => (

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
                        delay:
                          i *
                          0.03,
                      }}
                      className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 text-center"
                    >

                      <span className="text-2xl block mb-2">
                        {
                          honour.icon
                        }
                      </span>

                      <p className="text-xs text-gray-300">
                        {
                          honour.name
                        }
                      </p>

                      <p className="text-lg font-black text-red-400">
                        {
                          honour.count
                        }
                        x
                      </p>

                    </motion.div>

                  )
                )}

              </div>

            </div>

          )}


          {/* =================================================
              CHARTS TAB
          ================================================= */}

          {activeTab ===
            "charts" && (

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

                    <BarChart
                      data={
                        goalsByYear
                      }
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1f2937"
                      />

                      <XAxis
                        dataKey="year"
                        tick={{
                          fill:
                            "#6b7280",
                          fontSize: 11,
                        }}
                      />

                      <YAxis
                        tick={{
                          fill:
                            "#6b7280",
                          fontSize: 11,
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          background:
                            "#111827",
                          border:
                            "1px solid #374151",
                          borderRadius:
                            "12px",
                        }}
                      />

                      <Bar
                        dataKey="goals"
                        fill="#EF4444"
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
              href="/messi"
              className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              View Messi Profile →
            </Link>

          </div>


          {/* =================================================
              SEO CONTENT SECTION
          ================================================= */}

          <section className="mt-20 pt-14 border-t border-gray-800/50">

            <div className="max-w-4xl mx-auto">

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
                Cristiano Ronaldo Career Stats:
                Goals, Assists, Matches &
                Complete Profile
              </h2>


              <div className="space-y-7 text-sm text-gray-400 leading-8">


                {/* INTRO */}

                <p>
                  This{" "}
                  <strong className="text-white">
                    Cristiano Ronaldo career
                    profile
                  </strong>{" "}
                  brings together his goals,
                  assists, appearances, match
                  history, team statistics,
                  competition records and
                  career achievements in one
                  place.
                </p>

                <p>
                  Ronaldo&apos;s senior career
                  has taken him through
                  Sporting CP, Manchester
                  United, Real Madrid,
                  Juventus and Al Nassr,
                  alongside a long
                  international career with
                  Portugal.
                </p>

                <p>
                  According to the career
                  statistics currently used on
                  this page, Ronaldo has scored{" "}
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


                {/* CAREER STATS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Career
                  Statistics
                </h3>

                <p>
                  Ronaldo&apos;s overall career
                  statistics provide a broad
                  view of his goalscoring,
                  creative contribution and
                  longevity. The current
                  Mesnaldo career statistics
                  contain{" "}
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
                  Appearances provide context
                  for longevity, while goals
                  and assists show different
                  parts of Ronaldo&apos;s direct
                  attacking contribution.
                </p>


                {/* GOALS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Many Career Goals Has
                  Cristiano Ronaldo Scored?
                </h3>

                <p>
                  Cristiano Ronaldo has{" "}
                  <strong className="text-emerald-400">
                    {totalGoals.toLocaleString()}
                  </strong>{" "}
                  goals according to the career
                  statistics currently
                  displayed on this page.
                </p>

                <p>
                  His goal total combines the
                  competitions and teams
                  represented in the Mesnaldo
                  data. The match history can
                  be used to explore individual
                  games, opponents, results and
                  scoring performances.
                </p>


                {/* ASSISTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Career
                  Assists
                </h3>

                <p>
                  Ronaldo currently has{" "}
                  <strong className="text-blue-400">
                    {totalAssists.toLocaleString()}
                  </strong>{" "}
                  assists according to the
                  career statistics used on
                  this page.
                </p>

                <p>
                  Although Ronaldo is most
                  strongly associated with
                  goalscoring, assists provide
                  additional context for the
                  chances and goals he has
                  created for teammates.
                </p>


                {/* GOAL CONTRIBUTIONS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Career Goal
                  Contributions
                </h3>

                <p>
                  Combining the goals and
                  assists displayed on this
                  page gives Ronaldo{" "}
                  <strong className="text-white">
                    {(
                      totalGoals +
                      totalAssists
                    ).toLocaleString()}
                  </strong>{" "}
                  recorded goal contributions.
                </p>

                <p>
                  Goal contributions provide a
                  wider attacking measurement
                  than goals alone because they
                  include both scoring and
                  direct assists.
                </p>


                {/* GOALS PER GAME */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Goals Per
                  Game
                </h3>

                <p>
                  Based on the current totals,
                  Ronaldo averages{" "}
                  <strong className="text-emerald-400">
                    {totalGames > 0
                      ? (
                          totalGoals /
                          totalGames
                        ).toFixed(3)
                      : "0.000"}
                  </strong>{" "}
                  goals per recorded
                  appearance.
                </p>

                <p>
                  Goals per game gives
                  additional context to the raw
                  career goal total by
                  considering the number of
                  appearances required to
                  produce those goals.
                </p>


                {/* ASSISTS PER GAME */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Assists Per
                  Game
                </h3>

                <p>
                  Ronaldo averages{" "}
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
                  Looking at both goals and
                  assists per appearance helps
                  provide a more complete
                  picture of his attacking
                  production.
                </p>


                {/* RESULTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Career Win
                  Record
                </h3>

                <p>
                  The career data currently
                  records{" "}
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

                {totalGames >
                  0 && (

                  <p>
                    This represents a recorded
                    win rate of approximately{" "}
                    <strong className="text-white">
                      {(
                        (
                          totalWins /
                          totalGames
                        ) *
                        100
                      ).toFixed(1)}
                      %
                    </strong>.
                  </p>

                )}

                <p>
                  Wins and losses are team
                  results rather than purely
                  individual statistics, but
                  they add useful context to
                  the match environments in
                  which Ronaldo produced his
                  goals and assists.
                </p>


                {/* TEAM BREAKDOWN */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Goals by
                  Team
                </h3>

                <p>
                  Ronaldo&apos;s career records
                  can be grouped by the teams
                  represented in the match
                  database. The overview above
                  displays appearances, goals
                  and assists for each team.
                </p>

                <p>
                  This makes it possible to
                  compare his output across
                  Sporting CP, Manchester
                  United, Real Madrid,
                  Juventus, Al Nassr and
                  Portugal.
                </p>


                {/* SPORTING */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Sporting CP
                  Career
                </h3>

                <p>
                  Sporting CP represents the
                  beginning of Ronaldo&apos;s
                  senior club career. His
                  performances in Portugal
                  helped establish him as one
                  of Europe&apos;s most
                  promising young attackers
                  before his move to
                  Manchester United.
                </p>

                {sporting && (

                  <p>
                    The current database
                    contains{" "}
                    <strong className="text-white">
                      {sporting.apps.toLocaleString()}
                    </strong>{" "}
                    Sporting appearances,{" "}
                    <strong className="text-emerald-400">
                      {sporting.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {sporting.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>

                )}


                {/* MANCHESTER UNITED */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Manchester
                  United Career
                </h3>

                <p>
                  Ronaldo&apos;s career at
                  Manchester United included
                  two separate spells. His
                  first period in England was
                  especially important in his
                  development from a wide
                  attacking player into an
                  elite goalscorer.
                </p>

                {manchesterUnited && (

                  <p>
                    The current match database
                    contains{" "}
                    <strong className="text-white">
                      {manchesterUnited.apps.toLocaleString()}
                    </strong>{" "}
                    Manchester United
                    appearances,{" "}
                    <strong className="text-emerald-400">
                      {manchesterUnited.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {manchesterUnited.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>

                )}


                {/* REAL MADRID */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Real Madrid
                  Career
                </h3>

                <p>
                  Real Madrid represents one of
                  the most productive periods
                  of Ronaldo&apos;s career. His
                  time in Spain produced
                  extraordinary scoring totals
                  across La Liga, the Champions
                  League and other
                  competitions.
                </p>

                <p>
                  This period also formed the
                  central years of his direct
                  rivalry with Lionel Messi,
                  particularly through La Liga
                  and El Clásico.
                </p>

                {realMadrid && (

                  <p>
                    His Real Madrid record in
                    the current database
                    contains{" "}
                    <strong className="text-white">
                      {realMadrid.apps.toLocaleString()}
                    </strong>{" "}
                    appearances,{" "}
                    <strong className="text-emerald-400">
                      {realMadrid.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {realMadrid.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>

                )}


                {/* JUVENTUS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Juventus
                  Career
                </h3>

                <p>
                  Ronaldo later moved to
                  Juventus, adding Serie A to
                  the major domestic leagues
                  represented in his career.
                </p>

                <p>
                  His Juventus period provides
                  another example of his
                  ability to maintain high
                  scoring production after
                  changing clubs, countries and
                  tactical environments.
                </p>

                {juventus && (

                  <p>
                    The current dataset
                    contains{" "}
                    <strong className="text-white">
                      {juventus.apps.toLocaleString()}
                    </strong>{" "}
                    Juventus appearances,{" "}
                    <strong className="text-emerald-400">
                      {juventus.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {juventus.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>

                )}


                {/* AL NASSR */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Al Nassr
                  Career
                </h3>

                <p>
                  Ronaldo&apos;s move to Al
                  Nassr began another stage of
                  his career and extended his
                  professional record into
                  Saudi Arabian football.
                </p>

                {alNassr && (

                  <p>
                    His Al Nassr record in the
                    current database contains{" "}
                    <strong className="text-white">
                      {alNassr.apps.toLocaleString()}
                    </strong>{" "}
                    appearances,{" "}
                    <strong className="text-emerald-400">
                      {alNassr.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {alNassr.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>

                )}


                {/* PORTUGAL */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Portugal
                  Career
                </h3>

                <p>
                  Ronaldo&apos;s international
                  career with Portugal is a
                  major part of his overall
                  profile. His national-team
                  record spans numerous
                  international tournaments,
                  qualification campaigns and
                  other international matches.
                </p>

                {portugal && (

                  <p>
                    The current dataset
                    contains{" "}
                    <strong className="text-white">
                      {portugal.apps.toLocaleString()}
                    </strong>{" "}
                    Portugal appearances,{" "}
                    <strong className="text-emerald-400">
                      {portugal.goals.toLocaleString()}
                    </strong>{" "}
                    goals and{" "}
                    <strong className="text-blue-400">
                      {portugal.assists.toLocaleString()}
                    </strong>{" "}
                    assists.
                  </p>

                )}

                <p>
                  International football has a
                  different schedule and
                  competitive structure from
                  club football, so Portugal
                  statistics are most useful
                  when examined alongside the
                  club breakdown rather than
                  being treated identically.
                </p>


                {/* COMPETITIONS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Goals by
                  Competition
                </h3>

                <p>
                  Ronaldo&apos;s career goals
                  are distributed across
                  domestic leagues, European
                  competitions, international
                  football and domestic cup
                  tournaments.
                </p>

                <p>
                  The competition breakdown
                  above ranks competitions
                  according to the number of
                  Ronaldo goals currently
                  stored in the Mesnaldo match
                  database.
                </p>

                {topGoalCompetition && (

                  <p>
                    The competition with the
                    largest Ronaldo goal total
                    in the current dataset is{" "}
                    <strong className="text-white">
                      {
                        topGoalCompetition.name
                      }
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
                  Cristiano Ronaldo Champions
                  League Career
                </h3>

                <p>
                  The UEFA Champions League is
                  one of the most significant
                  competitions in
                  Ronaldo&apos;s career. His
                  performances across multiple
                  clubs helped make European
                  competition a central part of
                  his football legacy.
                </p>

                <p>
                  Champions League statistics
                  can be compared with his
                  domestic league and
                  international records to see
                  how his scoring production
                  changed across different
                  levels of competition.
                </p>


                {/* GOALS BY YEAR */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Goals by
                  Year
                </h3>

                <p>
                  The Goals by Year chart
                  provides a visual view of
                  Ronaldo&apos;s scoring output
                  across his career.
                </p>

                <p>
                  Looking at yearly scoring
                  helps identify high-output
                  periods and shows how his
                  production developed through
                  different teams and stages of
                  his career.
                </p>

                {bestGoalYear && (

                  <p>
                    Among the calendar years
                    represented in the current
                    database, Ronaldo&apos;s
                    highest recorded total is{" "}
                    <strong className="text-emerald-400">
                      {
                        bestGoalYear.goals
                      }
                    </strong>{" "}
                    goals in{" "}
                    <strong className="text-white">
                      {
                        bestGoalYear.year
                      }
                    </strong>.
                  </p>

                )}


                {/* MATCH HISTORY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Complete
                  Match History
                </h3>

                <p>
                  The Matches tab provides
                  access to the individual
                  match records used for many
                  of the breakdowns on this
                  profile.
                </p>

                <p>
                  There are currently{" "}
                  <strong className="text-white">
                    {allMatches.length.toLocaleString()}
                  </strong>{" "}
                  Ronaldo match records
                  available on this page.
                </p>

                <p>
                  Each match can include the
                  date, competition, teams,
                  result, goals and assists.
                  Visitors can filter the
                  matches by competition,
                  search by opponent or team,
                  and sort the records by date
                  or goals.
                </p>


                {/* HONOURS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Trophies
                  and Individual Honours
                </h3>

                <p>
                  Ronaldo&apos;s career includes
                  both team trophies and major
                  individual achievements. The
                  Honours tab provides a quick
                  overview of selected
                  achievements currently
                  configured for this profile.
                </p>

                <p>
                  Team trophies and individual
                  awards measure different
                  aspects of success. League
                  titles and international
                  competitions are team
                  achievements, while honours
                  such as the Ballon d&apos;Or
                  recognise individual
                  performance.
                </p>


                {/* BALLON D'OR */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Ballon
                  d&apos;Or Awards
                </h3>

                <p>
                  Ronaldo&apos;s individual
                  career achievements include
                  multiple Ballon d&apos;Or
                  victories earned across his
                  years at the highest level of
                  European football.
                </p>

                <p>
                  Individual awards provide
                  another perspective on his
                  career, but they should be
                  considered alongside his
                  goals, assists, appearances,
                  trophies and performances in
                  major competitions.
                </p>


                {/* EURO */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo European
                  Championship Career
                </h3>

                <p>
                  The UEFA European
                  Championship has been an
                  important part of
                  Ronaldo&apos;s international
                  career with Portugal.
                </p>

                <p>
                  His performances across
                  multiple European
                  Championships contribute to
                  his wider international
                  appearance, scoring and
                  tournament record.
                </p>


                {/* NATIONS LEAGUE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo UEFA
                  Nations League Career
                </h3>

                <p>
                  The UEFA Nations League is
                  another competition
                  represented within
                  Ronaldo&apos;s Portugal
                  career. Performances in this
                  tournament form part of his
                  overall international
                  statistics and achievements.
                </p>


                {/* PLAYING STYLE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Playing
                  Style
                </h3>

                <p>
                  Ronaldo&apos;s role changed
                  considerably throughout his
                  career. He developed from a
                  wide attacker known for
                  dribbling and direct running
                  into a more specialised
                  goalscorer.
                </p>

                <p>
                  His attacking profile has
                  included right-footed
                  finishing, heading, movement
                  inside the penalty area,
                  long-range shooting,
                  penalties and set pieces.
                </p>

                <p>
                  These changes make
                  career-long statistics
                  particularly interesting
                  because they cover several
                  different versions of
                  Ronaldo as an attacking
                  player.
                </p>


                {/* LONGEVITY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Career
                  Longevity
                </h3>

                <p>
                  Longevity is one of the
                  defining features of
                  Ronaldo&apos;s career. He has
                  remained professionally
                  active across several
                  decades, leagues, clubs and
                  international tournaments.
                </p>

                <p>
                  Career longevity is not
                  measured only by the number
                  of seasons played. Continued
                  appearances and attacking
                  production are also
                  important when assessing how
                  long a player remained
                  effective.
                </p>


                {/* DIFFERENT LEAGUES */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Cristiano Ronaldo Across
                  Different Leagues
                </h3>

                <p>
                  Ronaldo&apos;s career has
                  included football in
                  Portugal, England, Spain,
                  Italy and Saudi Arabia.
                </p>

                <p>
                  Moving between leagues
                  introduces different
                  opponents, tactical systems,
                  schedules and playing
                  environments. This gives his
                  club career a broad
                  geographical and competitive
                  range.
                </p>


                {/* METHODOLOGY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Cristiano Ronaldo
                  Statistics Are Calculated on
                  Mesnaldo
                </h3>

                <p>
                  Mesnaldo uses individual
                  match records to generate
                  many of the breakdowns on
                  this profile.
                </p>

                <p>
                  Match data is grouped by team,
                  competition and calendar year
                  to generate the corresponding
                  team statistics, competition
                  rankings and yearly scoring
                  chart.
                </p>

                <p>
                  The headline career totals
                  come from the career
                  statistics data used by the
                  site, while the detailed
                  match section displays the
                  available match-level
                  records.
                </p>

                <p>
                  Football statistics,
                  particularly historical
                  assists, can vary between
                  data providers. Figures
                  should therefore be
                  understood according to the
                  methodology and records used
                  by Mesnaldo.
                </p>


                {/* FAQ */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Cristiano Ronaldo Stats FAQ
                </h2>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many goals does Cristiano
                  Ronaldo have?
                </h3>

                <p>
                  Ronaldo currently has{" "}
                  <strong className="text-emerald-400">
                    {totalGoals.toLocaleString()}
                  </strong>{" "}
                  goals according to the career
                  statistics displayed on this
                  page.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many assists does
                  Cristiano Ronaldo have?
                </h3>

                <p>
                  Ronaldo currently has{" "}
                  <strong className="text-blue-400">
                    {totalAssists.toLocaleString()}
                  </strong>{" "}
                  recorded assists in the
                  Mesnaldo career statistics.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  How many games has Cristiano
                  Ronaldo played?
                </h3>

                <p>
                  The career statistics
                  currently display{" "}
                  <strong className="text-white">
                    {totalGames.toLocaleString()}
                  </strong>{" "}
                  Ronaldo appearances.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  What is Cristiano
                  Ronaldo&apos;s goals-per-game
                  ratio?
                </h3>

                <p>
                  Based on the totals currently
                  displayed, Ronaldo averages
                  approximately{" "}
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
                  How many goal contributions
                  does Ronaldo have?
                </h3>

                <p>
                  Combining the goals and
                  assists currently displayed
                  gives Ronaldo{" "}
                  <strong className="text-white">
                    {(
                      totalGoals +
                      totalAssists
                    ).toLocaleString()}
                  </strong>{" "}
                  recorded goal contributions.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Does this page include
                  Ronaldo&apos;s match history?
                </h3>

                <p>
                  Yes. The Matches tab contains{" "}
                  <strong className="text-white">
                    {allMatches.length.toLocaleString()}
                  </strong>{" "}
                  available Ronaldo match
                  records that can be searched,
                  filtered and sorted.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Can I see Ronaldo&apos;s goals
                  by club and Portugal?
                </h3>

                <p>
                  Yes. The overview groups
                  available match records by
                  team and displays appearances,
                  goals and assists for each
                  club or national team
                  represented in the data.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Can I see Ronaldo&apos;s goals
                  by competition?
                </h3>

                <p>
                  Yes. The profile calculates
                  goals by competition using
                  the available match records
                  and displays the leading
                  competitions in the overview.
                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Does this page show
                  Ronaldo&apos;s goals by year?
                </h3>

                <p>
                  Yes. The Charts tab groups
                  Ronaldo&apos;s recorded goals
                  by calendar year and displays
                  them in a career scoring
                  chart.
                </p>


                {/* CONCLUSION */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Cristiano Ronaldo Complete
                  Career Profile
                </h2>

                <p>
                  Cristiano Ronaldo&apos;s
                  career combines extraordinary
                  goalscoring, longevity and
                  success across multiple
                  football environments.
                </p>

                <p>
                  His career statistics across
                  Sporting CP, Manchester
                  United, Real Madrid, Juventus,
                  Al Nassr and Portugal provide
                  a broad view of a career that
                  has extended across different
                  leagues, competitions and
                  generations.
                </p>

                <p>
                  Goals are the most prominent
                  part of Ronaldo&apos;s
                  statistical profile, but
                  appearances, assists, match
                  results, competition
                  breakdowns and yearly
                  production add important
                  context.
                </p>

                <p>
                  This Mesnaldo profile brings
                  those statistics together
                  with searchable match history,
                  team breakdowns, competition
                  data and yearly scoring trends
                  to provide a detailed overview
                  of Cristiano Ronaldo&apos;s
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
   SERVER-SIDE DATA
========================================================= */

export const getServerSideProps:
  GetServerSideProps =
  async () => {

    try {

      /* =====================================================
         CAREER STATS
      ===================================================== */

      const {
        data: careerStats,
      } = await supabase
        .from("career_stats")
        .select("*")
        .eq(
          "player_id",
          2
        )
        .single()


      /* =====================================================
         ALL MATCHES
      ===================================================== */

      const allMatches =
        await fetchAllMatches(
          2
        )


      /* =====================================================
         TEAM BREAKDOWN
      ===================================================== */

      const teamMap: Record<
        string,
        {
          apps: number
          goals: number
          assists: number
        }
      > = {}


      allMatches.forEach(
        (match: any) => {

          const team =
            match.team ||
            "Unknown"

          if (
            !teamMap[team]
          ) {
            teamMap[team] = {
              apps: 0,
              goals: 0,
              assists: 0,
            }
          }

          teamMap[team].apps +=
            1

          teamMap[team].goals +=
            match.goals ||
            0

          teamMap[team].assists +=
            match.assists ||
            0
        }
      )


      const clubBreakdown =
        Object.entries(
          teamMap
        )
          .map(
            ([
              name,
              data,
            ]) => ({
              name,
              ...data,
            })
          )
          .sort(
            (
              a,
              b
            ) =>
              b.apps -
              a.apps
          )


      /* =====================================================
         GOALS BY YEAR
      ===================================================== */

      const yearMap: Record<
        string,
        number
      > = {}


      allMatches.forEach(
        (match: any) => {

          const year =
            new Date(
              match.date
            )
              .getFullYear()
              .toString()

          yearMap[year] =
            (
              yearMap[
                year
              ] ||
              0
            ) +
            (
              match.goals ||
              0
            )
        }
      )


      const goalsByYear =
        Object.entries(
          yearMap
        )
          .map(
            ([
              year,
              goals,
            ]) => ({
              year,
              goals,
            })
          )
          .sort(
            (
              a,
              b
            ) =>
              a.year.localeCompare(
                b.year
              )
          )


      /* =====================================================
         GOALS BY COMPETITION
      ===================================================== */

      const competitionMap:
        Record<
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
            (
              competitionMap[
                competition
              ] ||
              0
            ) +
            (
              match.goals ||
              0
            )
        }
      )


      const goalsByCompetition =
        Object.entries(
          competitionMap
        )
          .map(
            ([
              name,
              goals,
            ]) => ({
              name,
              goals,
            })
          )
          .sort(
            (
              a,
              b
            ) =>
              b.goals -
              a.goals
          )
          .slice(
            0,
            12
          )


      /*
        This remains hardcoded because the current page
        does not retrieve Ronaldo's team-trophy total
        from a dedicated trophy source.

        Do not calculate this by summing HONOURS because
        HONOURS contains individual awards as well.
      */

      const totalTrophies =
        37


      return {
        props: {
          careerStats:
            careerStats ||
            {},

          allMatches,

          clubBreakdown,

          goalsByYear,

          goalsByCompetition,

          totalTrophies,
        },
      }

    } catch (
      error
    ) {

      console.error(
        "Ronaldo profile error:",
        error
      )

      return {
        props: {
          careerStats: {},
          allMatches: [],
          clubBreakdown: [],
          goalsByYear: [],
          goalsByCompetition:
            [],
          totalTrophies: 0,
        },
      }

    }
  }