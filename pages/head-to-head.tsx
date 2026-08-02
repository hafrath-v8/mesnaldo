// pages/head-to-head.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useMemo } from "react"

interface H2HMatch {
  id: string
  date: string
  competition: string
  round: string
  team_score: number
  opponent_score: number
  messi_team: string
  ronaldo_team: string
  messi_goals: number
  messi_assists: number
  ronaldo_goals: number
  ronaldo_assists: number
  venue: string
}

interface H2HPageProps {
  matches: H2HMatch[]
}

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  )
}

export default function HeadToHead({ matches }: H2HPageProps) {
  const [filter, setFilter] = useState<string>("all")

  const competitions = useMemo(() => {
    const comps = [...new Set(matches.map(m => m.competition).filter(Boolean))]
    return ["all", ...comps.sort()]
  }, [matches])

  const filteredMatches = useMemo(() => {
    if (filter === "all") return matches
    return matches.filter(m => m.competition === filter)
  }, [matches, filter])

  const stats = useMemo(() => {
    const total = filteredMatches.length
    const messiGoals = filteredMatches.reduce((s, m) => s + (m.messi_goals || 0), 0)
    const ronaldoGoals = filteredMatches.reduce((s, m) => s + (m.ronaldo_goals || 0), 0)
    const messiAssists = filteredMatches.reduce((s, m) => s + (m.messi_assists || 0), 0)
    const ronaldoAssists = filteredMatches.reduce((s, m) => s + (m.ronaldo_assists || 0), 0)

    const messiWins = filteredMatches.filter(m => {
      const messiScore = m.messi_team === m.messi_team ? m.team_score : m.opponent_score
      const ronaldoScore = m.messi_team === m.messi_team ? m.opponent_score : m.team_score
      // Simply check if team_score > opponent_score and messi_team is the one that scored more
      return m.team_score > m.opponent_score
    }).length

    const ronaldoWins = filteredMatches.filter(m => m.opponent_score > m.team_score).length
    const draws = total - messiWins - ronaldoWins

    return { total, messiGoals, ronaldoGoals, messiAssists, ronaldoAssists, messiWins, ronaldoWins, draws }
  }, [filteredMatches])

  // Group by year
  const byYear = useMemo(() => {
    const years: Record<string, H2HMatch[]> = {}
    filteredMatches.forEach(m => {
      const year = new Date(m.date).getFullYear().toString()
      if (!years[year]) years[year] = []
      years[year].push(m)
    })
    return Object.entries(years).sort(([a], [b]) => Number(b) - Number(a))
  }, [filteredMatches])

  return (
<Layout 
title="Messi vs Ronaldo Head to Head | Complete H2H Stats & Results"
  description="All 36 head-to-head matches between Messi and Ronaldo. El Clásico, Champions League, and international encounters compared.">     
   <div className="bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12 sm:space-y-16">

          {/* HEADER */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">El Clásico & More</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Head to <span className="text-amber-400">Head</span>
            </h1>
            <p className="text-gray-500 mt-3 text-sm">
              {stats.total} direct encounters between the two legends
            </p>
          </div>

          {/* ─── SCOREBOARD ─── */}
          <section>
            <div className={`${CARD_BASE} p-6 sm:p-8 lg:p-10`}>
              <div className="grid grid-cols-3 items-center">
                {/* Messi */}
                <div className="text-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-3 shadow-xl shadow-blue-500/20">
                    <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                  </div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400">{stats.messiWins}</p>
                  <p className="text-xs text-gray-500 mt-1">Wins</p>
                </div>

                {/* Center */}
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-amber-400">{stats.draws}</p>
                  <p className="text-xs text-gray-500 mt-1">Draws</p>
                  <p className="text-sm text-gray-400 mt-3">{stats.total} matches</p>
                </div>

                {/* Ronaldo */}
                <div className="text-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-3 shadow-xl shadow-red-500/20">
                    <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                  </div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-400">{stats.ronaldoWins}</p>
                  <p className="text-xs text-gray-500 mt-1">Wins</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stats.messiWins / stats.total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500 rounded-full" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stats.draws / stats.total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-amber-500" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stats.ronaldoWins / stats.total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-red-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                <span>Messi {stats.messiWins}</span>
                <span>Draws {stats.draws}</span>
                <span>Ronaldo {stats.ronaldoWins}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-blue-400">{stats.messiGoals}</p>
                <p className="text-[10px] text-gray-500">Messi Goals</p>
              </div>
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-red-400">{stats.ronaldoGoals}</p>
                <p className="text-[10px] text-gray-500">Ronaldo Goals</p>
              </div>
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-blue-400">{stats.messiAssists}</p>
                <p className="text-[10px] text-gray-500">Messi Assists</p>
              </div>
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-red-400">{stats.ronaldoAssists}</p>
                <p className="text-[10px] text-gray-500">Ronaldo Assists</p>
              </div>
            </div>
          </section>

          {/* ─── MATCH LIST ─── */}
          <section>
            <SectionHeading title="All Encounters" subtitle={`${filteredMatches.length} matches`} />

            {/* Competition Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {competitions.map(comp => (
                <button key={comp} onClick={() => setFilter(comp)}
                  className={`px-4 py-2 text-xs rounded-full transition-all font-medium ${filter === comp ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                  {comp === "all" ? "All" : comp}
                </button>
              ))}
            </div>

            {/* Matches by Year */}
            {byYear.length === 0 ? (
              <div className="text-center py-16"><p className="text-gray-500">No matches found</p></div>
            ) : (
              <div className="space-y-10">
                {byYear.map(([year, yearMatches]) => (
                  <div key={year}>
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      {year}
                      <span className="text-xs text-gray-600 font-normal">({yearMatches.length} matches)</span>
                    </h3>
                    <div className="space-y-2">
                      {yearMatches.map((match, i) => (
                        <motion.div key={match.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                          className={`${CARD_BASE} p-4 sm:p-5`}>

                          {/* Date & Competition */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-gray-500">{match.competition}</span>
                            <span className="text-[10px] text-gray-600">
                              {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>

                          {/* Teams & Score */}
                          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-3">
                            <div className="text-right flex-1">
                              <span className="text-sm font-bold text-blue-400">{match.messi_team}</span>
                            </div>
                            <div className="text-center flex-shrink-0">
                              <span className={`text-xl sm:text-2xl font-black ${match.team_score > match.opponent_score ? "text-blue-400" : match.team_score < match.opponent_score ? "text-red-400" : "text-amber-400"}`}>
                                {match.team_score} - {match.opponent_score}
                              </span>
                            </div>
                            <div className="text-left flex-1">
                              <span className="text-sm font-bold text-red-400">{match.ronaldo_team}</span>
                            </div>
                          </div>

                          {/* Player Stats */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-500/5 rounded-xl p-3 text-center border border-blue-500/10">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 mx-auto mb-1">
                                <Image src="/images/messi.png" alt="Messi" fill className="object-cover" />
                              </div>
                              <p className="text-[10px] text-blue-400 font-bold">Messi</p>
                              <div className="flex items-center justify-center gap-2 mt-1">
                                {match.messi_goals > 0 && <span className="text-xs text-emerald-400 font-bold">⚽{match.messi_goals}</span>}
                                {match.messi_assists > 0 && <span className="text-xs text-blue-400 font-bold">🅰{match.messi_assists}</span>}
                                {match.messi_goals === 0 && match.messi_assists === 0 && <span className="text-[10px] text-gray-600">—</span>}
                              </div>
                            </div>
                            <div className="bg-red-500/5 rounded-xl p-3 text-center border border-red-500/10">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-500/30 mx-auto mb-1">
                                <Image src="/images/ronaldo.png" alt="Ronaldo" fill className="object-cover" />
                              </div>
                              <p className="text-[10px] text-red-400 font-bold">Ronaldo</p>
                              <div className="flex items-center justify-center gap-2 mt-1">
                                {match.ronaldo_goals > 0 && <span className="text-xs text-emerald-400 font-bold">⚽{match.ronaldo_goals}</span>}
                                {match.ronaldo_assists > 0 && <span className="text-xs text-blue-400 font-bold">🅰{match.ronaldo_assists}</span>}
                                {match.ronaldo_goals === 0 && match.ronaldo_assists === 0 && <span className="text-[10px] text-gray-600">—</span>}
                              </div>
                            </div>
                          </div>

                          {/* Venue & Round */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] text-gray-600">
                              {match.venue === "H" ? "🏟️ Home" : match.venue === "A" ? "✈️ Away" : "📍 Neutral"}
                            </span>
                            <span className="text-[10px] text-gray-600">{match.round || ""}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch ALL matches for both players
    const { data: messiAll } = await supabase.from("matches").select("*").eq("player_id", 1).limit(2000)
    const { data: ronaldoAll } = await supabase.from("matches").select("*").eq("player_id", 2).limit(2000)

    if (!messiAll || !ronaldoAll) {
      return { props: { matches: [] } }
    }

    // Find H2H matches: same date + Messi's team vs Ronaldo's team
    const h2hMap = new Map<string, H2HMatch>()

    messiAll.forEach(messiMatch => {
      const ronaldoMatch = ronaldoAll.find(r =>
        r.date === messiMatch.date &&
        r.team === messiMatch.opponent &&
        r.opponent === messiMatch.team
      )

      if (ronaldoMatch) {
        const key = `${messiMatch.date}-${messiMatch.team}-${ronaldoMatch.team}`
        if (!h2hMap.has(key)) {
          h2hMap.set(key, {
            id: key,
            date: messiMatch.date,
            competition: messiMatch.competition,
            round: messiMatch.round || "",
            team_score: messiMatch.team_score || 0,
            opponent_score: messiMatch.opponent_score || 0,
            messi_team: messiMatch.team || "Unknown",
            ronaldo_team: ronaldoMatch.team || "Unknown",
            messi_goals: messiMatch.goals || 0,
            messi_assists: messiMatch.assists || 0,
            ronaldo_goals: ronaldoMatch.goals || 0,
            ronaldo_assists: ronaldoMatch.assists || 0,
            venue: messiMatch.venue || (messiMatch.is_home === true ? "H" : messiMatch.is_home === false ? "A" : "N"),
          })
        }
      }
    })

    const h2hMatches = Array.from(h2hMap.values())
    h2hMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    console.log(`✅ H2H matches found: ${h2hMatches.length}`)
    h2hMatches.forEach(m => console.log(`  ${m.date}: ${m.messi_team} vs ${m.ronaldo_team} | ${m.team_score}-${m.opponent_score} | M:${m.messi_goals}G/${m.messi_assists}A R:${m.ronaldo_goals}G/${m.ronaldo_assists}A`))

    return { props: { matches: h2hMatches } }
  } catch (e) {
    console.error("Error:", e)
    return { props: { matches: [] } }
  }
}