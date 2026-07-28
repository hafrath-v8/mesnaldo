// pages/ronaldo.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RonaldoPageProps {
  careerStats: any
  allMatches: any[]
  clubBreakdown: { name: string; apps: number; goals: number; assists: number }[]
  goalsByYear: { year: string; goals: number }[]
  goalsByCompetition: { name: string; goals: number }[]
  totalTrophies: number
}

function safeNum(val: any): number { return typeof val === 'number' ? val : 0 }

async function fetchAllMatches(playerId: number) {
  const pageSize = 1000
  let allRows: any[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("matches").select("*").eq("player_id", playerId)
      .range(from, from + pageSize - 1).order("date", { ascending: true })
    if (error || !data || data.length === 0) break
    allRows = allRows.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return allRows
}

const TROPHIES = [
  { name: "Ballon d'Or", count: 5, icon: "🏆" },
  { name: "FIFA The Best", count: 2, icon: "🏅" },
  { name: "European Golden Shoe", count: 4, icon: "👟" },
  { name: "Premier League", count: 3, icon: "🏟️" },
  { name: "La Liga", count: 2, icon: "🏟️" },
  { name: "Serie A", count: 2, icon: "🏟️" },
  { name: "Champions League", count: 5, icon: "⭐" },
  { name: "FIFA Club World Cup", count: 4, icon: "🌍" },
  { name: "UEFA Super Cup", count: 3, icon: "🛡️" },
  { name: "FA Cup", count: 1, icon: "🏆" },
  { name: "Copa del Rey", count: 2, icon: "🏆" },
  { name: "Coppa Italia", count: 1, icon: "🏆" },
  { name: "League Cup (EFL)", count: 2, icon: "🏆" },
  { name: "Supercopa de España", count: 2, icon: "🥇" },
  { name: "Supercoppa Italiana", count: 2, icon: "🥇" },
  { name: "Taça de Portugal", count: 1, icon: "🏆" },
  { name: "Arab Club Champions Cup", count: 1, icon: "🏆" },
  { name: "UEFA European Championship", count: 1, icon: "🏆" },
  { name: "UEFA Nations League", count: 1, icon: "🌍" },
  { name: "FIFA Puskás Award", count: 1, icon: "⚽" },
  { name: "UEFA Best Player in Europe", count: 3, icon: "🏅" },
  { name: "FIFA FIFPro World XI", count: 15, icon: "🌟" },
]

export default function RonaldoProfile({ careerStats, allMatches, clubBreakdown, goalsByYear, goalsByCompetition, totalTrophies }: RonaldoPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "matches" | "trophies" | "charts">("overview")
  const [matchFilter, setMatchFilter] = useState("all")
  const [matchSearch, setMatchSearch] = useState("")
  const [matchSort, setMatchSort] = useState<"date-desc" | "date-asc" | "goals-desc">("date-desc")
  const [matchPage, setMatchPage] = useState(1)
  const MATCHES_PER_PAGE = 25

  const totalGoals = safeNum(careerStats?.total_goals)
  const totalAssists = safeNum(careerStats?.total_assists)
  const totalGames = safeNum(careerStats?.total_games)
  const totalWins = safeNum(careerStats?.total_wins)
  const totalDraws = safeNum(careerStats?.total_draws)
  const totalLosses = safeNum(careerStats?.total_losses)

  const competitions = useMemo(() => {
    const comps = [...new Set(allMatches.map(m => m.competition).filter(Boolean))]
    return ["all", ...comps.sort()]
  }, [allMatches])

  const filteredMatches = useMemo(() => {
    let matches = [...allMatches]
    if (matchFilter !== "all") matches = matches.filter(m => m.competition === matchFilter)
    if (matchSearch) {
      const q = matchSearch.toLowerCase()
      matches = matches.filter(m => 
        (m.opponent || "").toLowerCase().includes(q) ||
        (m.competition || "").toLowerCase().includes(q) ||
        (m.team || "").toLowerCase().includes(q)
      )
    }
    if (matchSort === "date-desc") matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    else if (matchSort === "date-asc") matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    else if (matchSort === "goals-desc") matches.sort((a, b) => (b.goals || 0) - (a.goals || 0))
    return matches
  }, [allMatches, matchFilter, matchSearch, matchSort])

  const totalPages = Math.ceil(filteredMatches.length / MATCHES_PER_PAGE)
  const paginatedMatches = filteredMatches.slice((matchPage - 1) * MATCHES_PER_PAGE, matchPage * MATCHES_PER_PAGE)

  const matchStats = useMemo(() => {
    const wins = filteredMatches.filter(m => m.result === "W").length
    const draws = filteredMatches.filter(m => m.result === "D").length
    const losses = filteredMatches.filter(m => m.result === "L").length
    const goals = filteredMatches.reduce((s, m) => s + (m.goals || 0), 0)
    const assists = filteredMatches.reduce((s, m) => s + (m.assists || 0), 0)
    return { wins, draws, losses, goals, assists, total: filteredMatches.length }
  }, [filteredMatches])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "matches", label: `Matches (${allMatches.length})` },
    { id: "trophies", label: "Trophies" },
    { id: "charts", label: "Charts" },
  ]

  return (
<Layout 
  title="Cristiano Ronaldo - Complete Profile, Stats & Career History" 
  description="Complete Cristiano Ronaldo profile: career stats, goals, assists, trophies, match history, and season-by-season breakdown. The definitive Ronaldo statistics page.">     
   <div className="bg-black">
        
        {/* ─── HERO ─── */}
        <section className="relative bg-gradient-to-b from-red-900/20 via-gray-900 to-black border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.1),transparent_60%)]" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-red-500/20 flex-shrink-0">
                <Image src="/images/ronaldo.png" alt="Cristiano Ronaldo" fill className="object-cover" />
              </motion.div>
              <div>
                <p className="text-red-400 text-sm font-bold mb-1">🇵🇹 Portugal</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Cristiano Ronaldo</h1>
                <p className="text-gray-400 mt-2 text-lg">Forward · Al Nassr</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                  <span>Born: February 5, 1985 (40 yrs)</span>
                  <span>·</span>
                  <span>1.87m · Right Foot</span>
                  <span>·</span>
                  <span>#7</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
              {[
                { v: totalGoals.toLocaleString(), l: "Goals", c: "text-emerald-400" },
                { v: totalAssists.toLocaleString(), l: "Assists", c: "text-blue-400" },
                { v: totalGames.toLocaleString(), l: "Games", c: "text-white" },
                { v: totalTrophies, l: "Trophies", c: "text-amber-400" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center">
                  <p className={`text-2xl sm:text-3xl font-black ${s.c}`}>{s.v}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">

          {/* ─── TABS ─── */}
          <div className="flex items-center gap-1 bg-gray-900/50 rounded-xl p-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id as any); setMatchPage(1) }}
                className={`px-4 py-2 text-xs sm:text-sm whitespace-nowrap rounded-lg transition-all font-medium ${
                  activeTab === tab.id ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && (
            <div className="space-y-10">
              <section>
                <h2 className="text-lg font-bold text-white mb-4">Goals by Team</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {clubBreakdown.map((club, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 text-center">
                      <p className="text-xs text-gray-400 mb-2">{club.name}</p>
                      <p className="text-2xl font-black text-red-400">{club.goals.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{club.apps} games · {club.assists} assists</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-4">Career Record</h2>
                <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
                      <p className="text-2xl font-black text-emerald-400">{totalWins.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Wins</p>
                    </div>
                    <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/10">
                      <p className="text-2xl font-black text-amber-400">{totalDraws.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Draws</p>
                    </div>
                    <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10">
                      <p className="text-2xl font-black text-red-400">{totalLosses.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Losses</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: `${(totalWins / totalGames) * 100}%` }} />
                    <div className="h-full bg-amber-500" style={{ width: `${(totalDraws / totalGames) * 100}%` }} />
                    <div className="h-full bg-red-500" style={{ width: `${(totalLosses / totalGames) * 100}%` }} />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-4">Top Competitions</h2>
                <div className="space-y-2">
                  {goalsByCompetition.slice(0, 8).map((comp, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-900/30">
                      <span className="text-sm text-gray-300 flex-1">{comp.name}</span>
                      <span className="text-sm font-bold text-red-400">{comp.goals}</span>
                      <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${(comp.goals / totalGoals) * 100}%` }} viewport={{ once: true }} className="h-full bg-red-500 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ─── MATCHES TAB ─── */}
          {activeTab === "matches" && (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="bg-gray-900/60 rounded-xl p-3"><p className="text-lg font-bold text-white">{matchStats.total}</p><p className="text-[9px] text-gray-500">Total</p></div>
                <div className="bg-emerald-500/5 rounded-xl p-3"><p className="text-lg font-bold text-emerald-400">{matchStats.wins}</p><p className="text-[9px] text-gray-500">Wins</p></div>
                <div className="bg-amber-500/5 rounded-xl p-3"><p className="text-lg font-bold text-amber-400">{matchStats.draws}</p><p className="text-[9px] text-gray-500">Draws</p></div>
                <div className="bg-red-500/5 rounded-xl p-3"><p className="text-lg font-bold text-red-400">{matchStats.losses}</p><p className="text-[9px] text-gray-500">Losses</p></div>
                <div className="bg-blue-500/5 rounded-xl p-3"><p className="text-lg font-bold text-blue-400">{matchStats.goals}</p><p className="text-[9px] text-gray-500">Goals</p></div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select value={matchFilter} onChange={(e) => { setMatchFilter(e.target.value); setMatchPage(1) }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none">
                  <option value="all">All Competitions</option>
                  {competitions.filter(c => c !== "all").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={matchSort} onChange={(e) => { setMatchSort(e.target.value as any); setMatchPage(1) }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none">
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="goals-desc">Most Goals</option>
                </select>
                <input type="text" placeholder="Search opponent..." value={matchSearch}
                  onChange={(e) => { setMatchSearch(e.target.value); setMatchPage(1) }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none flex-1 min-w-[150px]" />
              </div>

              <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700/50 bg-gray-800/30">
                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">#</th>
                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">Competition</th>
                        <th className="text-left py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">Match</th>
                        <th className="text-center py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">Result</th>
                        <th className="text-center py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">G</th>
                        <th className="text-center py-2.5 px-3 text-[10px] text-gray-500 uppercase tracking-wider">A</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedMatches.map((m, i) => (
                        <tr key={m.id} className="border-b border-gray-700/20 hover:bg-gray-800/20 transition-colors">
                          <td className="py-2.5 px-3 text-[10px] text-gray-600">{(matchPage - 1) * MATCHES_PER_PAGE + i + 1}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-400 whitespace-nowrap">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-400 max-w-[120px] truncate">{m.competition}</td>
                          <td className="py-2.5 px-3 text-xs text-gray-300">{m.team} <span className="text-gray-600">vs</span> {m.opponent}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.result === "W" ? "bg-emerald-500/10 text-emerald-400" : m.result === "D" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{m.team_score}-{m.opponent_score}</span>
                          </td>
                          <td className="py-2.5 px-3 text-center text-xs">{m.goals > 0 ? <span className="text-emerald-400 font-bold">{m.goals}</span> : <span className="text-gray-600">-</span>}</td>
                          <td className="py-2.5 px-3 text-center text-xs">{m.assists > 0 ? <span className="text-blue-400 font-bold">{m.assists}</span> : <span className="text-gray-600">-</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => setMatchPage(p => Math.max(1, p - 1))} disabled={matchPage === 1} className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 hover:text-white">← Prev</button>
                  <span className="text-xs text-gray-500">Page {matchPage} of {totalPages}</span>
                  <button onClick={() => setMatchPage(p => Math.min(totalPages, p + 1))} disabled={matchPage === totalPages} className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-30 hover:text-white">Next →</button>
                </div>
              )}
            </div>
          )}

          {/* ─── TROPHIES TAB ─── */}
          {activeTab === "trophies" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TROPHIES.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 text-center">
                  <span className="text-2xl block mb-2">{t.icon}</span>
                  <p className="text-xs text-gray-300">{t.name}</p>
                  <p className="text-lg font-black text-red-400">{t.count}x</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* ─── CHARTS TAB ─── */}
          {activeTab === "charts" && (
            <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">
              <h3 className="text-sm font-bold text-white mb-4">Goals by Year</h3>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={goalsByYear}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "12px" }} />
                    <Bar dataKey="goals" fill="#EF4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-800">
            <Link href="/messi" className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400 hover:bg-blue-500/20 transition-colors">
              View Messi Profile →
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: careerStats } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    const allMatches = await fetchAllMatches(2)

    const clubMap: Record<string, { apps: number; goals: number; assists: number }> = {}
    allMatches.forEach((m: any) => {
      const team = m.team || "Unknown"
      if (!clubMap[team]) clubMap[team] = { apps: 0, goals: 0, assists: 0 }
      clubMap[team].apps += 1
      clubMap[team].goals += m.goals || 0
      clubMap[team].assists += m.assists || 0
    })
    const clubBreakdown = Object.entries(clubMap).map(([name, data]) => ({ name, ...data }))

    const yearMap: Record<string, number> = {}
    allMatches.forEach((m: any) => {
      const year = new Date(m.date).getFullYear().toString()
      yearMap[year] = (yearMap[year] || 0) + (m.goals || 0)
    })
    const goalsByYear = Object.entries(yearMap).map(([year, goals]) => ({ year, goals })).sort((a, b) => a.year.localeCompare(b.year))

    const compMap: Record<string, number> = {}
    allMatches.forEach((m: any) => {
      const comp = m.competition || "Other"
      compMap[comp] = (compMap[comp] || 0) + (m.goals || 0)
    })
    const goalsByCompetition = Object.entries(compMap).map(([name, goals]) => ({ name, goals })).sort((a, b) => b.goals - a.goals).slice(0, 12)

    return {
      props: { careerStats: careerStats || {}, allMatches, clubBreakdown, goalsByYear, goalsByCompetition, totalTrophies: 37 },
    }
  } catch (e) {
    return { props: { careerStats: {}, allMatches: [], clubBreakdown: [], goalsByYear: [], goalsByCompetition: [], totalTrophies: 0 } }
  }
}