// pages/goals.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next" 
import { motion } from "framer-motion"
import Image from "next/image"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface GoalsPageProps {
  messi: any; ronaldo: any
  messiIntlGoals: number; ronaldoIntlGoals: number
  messiUclGoals: number; ronaldoUclGoals: number
  messiClubGoals: number; ronaldoClubGoals: number
  messiNonPenaltyGoals: number; ronaldoNonPenaltyGoals: number
  messiFriendlyGoals: number; ronaldoFriendlyGoals: number
  messiCompetitiveGoals: number; ronaldoCompetitiveGoals: number
  messiKnockoutGoals: number; ronaldoKnockoutGoals: number
  messiGroupStageGoals: number; ronaldoGroupStageGoals: number
  messiHatTricks: number; ronaldoHatTricks: number
  messiWinningGoals: number; ronaldoWinningGoals: number
  messiHomeGoals: number; ronaldoHomeGoals: number
  messiAwayGoals: number; ronaldoAwayGoals: number
  messiBraceCount: number; ronaldoBraceCount: number
  messiSuperSubGoals: number; ronaldoSuperSubGoals: number
  messiElClasicoGoals: number; ronaldoElClasicoGoals: number
  messiDerbyGoals: number; ronaldoDerbyGoals: number
  messiFinalsGoals: number; ronaldoFinalsGoals: number
  messiTeamBreakdown: { team: string; goals: number }[]
  ronaldoTeamBreakdown: { team: string; goals: number }[]
  messiPenaltyConversion: number; ronaldoPenaltyConversion: number
  messiGoalsInWins: number; ronaldoGoalsInWins: number
  messiGoalsInDraws: number; ronaldoGoalsInDraws: number
  messiGoalsInLosses: number; ronaldoGoalsInLosses: number
  messiMultiGoalMatches: number; ronaldoMultiGoalMatches: number
  messiStarterGoals: number; ronaldoStarterGoals: number
}

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"
const UCL_COMPETITIONS = ["Champs League", "Champions League", "Champions League Qualifying"]
const FRIENDLY_COMPETITIONS = ["International Friendly"]
const DERBY_MATCHES = new Set(["Real Madrid", "Atletico Madrid", "Espanyol", "Inter Milan", "AC Milan", "Manchester City", "Liverpool", "Barcelona"])
const FINALS_ROUNDS = ["Final", "final"]

const MESSI_COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB", "#1D4ED8", "#1E40AF"]
const RONALDO_COLORS = ["#EF4444", "#F87171", "#FCA5A5", "#DC2626", "#B91C1C", "#991B1B"]

function safeNum(val: any): number { return typeof val === 'number' ? val : 0 }

function StatCard({ label, messiValue, ronaldoValue, suffix = "", lowerIsBetter = false }: {
  label: string; messiValue: number; ronaldoValue: number; suffix?: string; lowerIsBetter?: boolean
}) {
  const m = safeNum(messiValue)
  const r = safeNum(ronaldoValue)
  const messiWins = lowerIsBetter ? m < r : m > r
  const ronaldoWins = lowerIsBetter ? r < m : r > m
  const winner = messiWins ? "messi" : ronaldoWins ? "ronaldo" : "tie"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className={`${CARD_BASE} p-5 sm:p-6`}>
      <p className="text-xs text-gray-400 mb-4 text-center font-medium uppercase tracking-wider">{label}</p>
      <div className="flex items-center justify-center gap-5 sm:gap-8 mb-3">
        <div className="text-center flex-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-2 shadow-lg shadow-blue-500/10">
            <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
          </div>
          <p className={`text-xl sm:text-2xl font-black ${winner === "messi" ? "text-blue-400" : "text-gray-400"}`}>{m.toLocaleString()}{suffix}</p>
          <p className="text-[10px] text-gray-600 mt-0.5">Messi</p>
          {winner === "messi" && <span className="text-[10px] text-amber-400">👑</span>}
        </div>
        <span className="text-xs text-gray-700 font-medium pt-6">vs</span>
        <div className="text-center flex-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-2 shadow-lg shadow-red-500/10">
            <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
          </div>
          <p className={`text-xl sm:text-2xl font-black ${winner === "ronaldo" ? "text-red-400" : "text-gray-400"}`}>{r.toLocaleString()}{suffix}</p>
          <p className="text-[10px] text-gray-600 mt-0.5">Ronaldo</p>
          {winner === "ronaldo" && <span className="text-[10px] text-amber-400">👑</span>}
        </div>
      </div>
      {winner !== "tie" && (
        <p className={`text-center text-[10px] font-medium ${winner === "messi" ? "text-blue-400" : "text-red-400"}`}>
          {winner === "messi" ? "Messi" : "Ronaldo"} {lowerIsBetter ? "better" : "leads"} by {Math.abs(m - r).toLocaleString()}{suffix}
        </p>
      )}
    </motion.div>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  )
}

function TeamBreakdownChart({ player, data, color, img }: { player: string; data: { team: string; goals: number }[]; color: string; img: string }) {
  const total = data.reduce((s, d) => s + d.goals, 0)
  const colors = color === "blue" ? MESSI_COLORS : RONALDO_COLORS
  return (
    <div className={`${CARD_BASE} p-5 sm:p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${color === "blue" ? "border-blue-500/30" : "border-red-500/30"}`}>
          <Image src={img} alt={player} fill className="object-cover" />
        </div>
        <div>
          <h3 className={`font-bold text-sm ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{player}</h3>
          <p className="text-[10px] text-gray-500">Goals by club/nation played for</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={2} dataKey="goals">
                {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-1.5">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colors[i % colors.length] }} />
              <span className="text-xs text-gray-300 flex-1 truncate">{d.team}</span>
              <span className={`text-xs font-bold ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{d.goals}</span>
              <span className="text-[10px] text-gray-600">{((d.goals / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function fetchAllMatches(playerId: number) {
  const pageSize = 1000
  let allRows: any[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("matches").select("goals, team, competition, opponent, round, venue, result, team_score, opponent_score, minutes_played")
      .eq("player_id", playerId).range(from, from + pageSize - 1).order("id", { ascending: true })
    if (error || !data || data.length === 0) break
    allRows = allRows.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return allRows
}

export default function Goals(props: GoalsPageProps) {
  const { messi, ronaldo, messiIntlGoals, ronaldoIntlGoals, messiUclGoals, ronaldoUclGoals, messiClubGoals, ronaldoClubGoals, messiNonPenaltyGoals, ronaldoNonPenaltyGoals, messiFriendlyGoals, ronaldoFriendlyGoals, messiCompetitiveGoals, ronaldoCompetitiveGoals, messiKnockoutGoals, ronaldoKnockoutGoals, messiGroupStageGoals, ronaldoGroupStageGoals, messiHatTricks, ronaldoHatTricks, messiWinningGoals, ronaldoWinningGoals, messiHomeGoals, ronaldoHomeGoals, messiAwayGoals, ronaldoAwayGoals, messiBraceCount, ronaldoBraceCount, messiSuperSubGoals, ronaldoSuperSubGoals, messiDerbyGoals, ronaldoDerbyGoals, messiFinalsGoals, ronaldoFinalsGoals, messiTeamBreakdown, ronaldoTeamBreakdown, messiPenaltyConversion, ronaldoPenaltyConversion, messiGoalsInWins, ronaldoGoalsInWins, messiGoalsInDraws, ronaldoGoalsInDraws, messiGoalsInLosses, ronaldoGoalsInLosses, messiMultiGoalMatches, ronaldoMultiGoalMatches, messiStarterGoals, ronaldoStarterGoals } = props

  if (!messi || !ronaldo) {
    return (
      <Layout title="Goals Comparison">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  const messiTotal = safeNum(messi.total_goals)
  const ronaldoTotal = safeNum(ronaldo.total_goals)
  const messiGames = safeNum(messi.total_games) || 1
  const ronaldoGames = safeNum(ronaldo.total_games) || 1
  const messiMinutes = safeNum(messi.total_minutes) || 1
  const ronaldoMinutes = safeNum(ronaldo.total_minutes) || 1

  const goalTypeData = [
    { name: "Left Foot", messi: safeNum(messi.left_foot_goals), ronaldo: safeNum(ronaldo.left_foot_goals) },
    { name: "Right Foot", messi: safeNum(messi.right_foot_goals), ronaldo: safeNum(ronaldo.right_foot_goals) },
    { name: "Headers", messi: safeNum(messi.header_goals), ronaldo: safeNum(ronaldo.header_goals) },
    { name: "Penalties", messi: safeNum(messi.penalties_scored), ronaldo: safeNum(ronaldo.penalties_scored) },
    { name: "Free Kicks", messi: safeNum(messi.free_kick_goals), ronaldo: safeNum(ronaldo.free_kick_goals) },
    { name: "Inside Box", messi: safeNum(messi.inside_box_goals), ronaldo: safeNum(ronaldo.inside_box_goals) },
    { name: "Outside Box", messi: safeNum(messi.outside_box_goals), ronaldo: safeNum(ronaldo.outside_box_goals) },
  ]

  return (
<Layout 
  title="Goals Comparison - Messi vs Ronaldo" 
  description="Compare Messi vs Ronaldo goals: total career goals, goals per season, free kicks, penalties, headers, and every goal breakdown.">      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-14 sm:space-y-16 lg:space-y-20">

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Goals Comparison</h1>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">Complete career goal statistics</p>
          </div>

          {/* Total Goals */}
          <section>
            <SectionHeading title="Total Career Goals" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <div className={`${CARD_BASE} p-6 sm:p-8 text-center`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-4 shadow-xl shadow-blue-500/20">
                  <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                </div>
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-400">{messiTotal.toLocaleString()}</motion.p>
                <p className="text-xs text-gray-500 mt-2">Lionel Messi</p>
              </div>
              <div className={`${CARD_BASE} p-6 sm:p-8 text-center`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-4 shadow-xl shadow-red-500/20">
                  <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                </div>
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-400">{ronaldoTotal.toLocaleString()}</motion.p>
                <p className="text-xs text-gray-500 mt-2">Cristiano Ronaldo</p>
              </div>
            </div>
          </section>

          {/* Competition */}
          <section>
            <SectionHeading title="Goals by Competition" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Club Goals" messiValue={messiClubGoals} ronaldoValue={ronaldoClubGoals} />
              <StatCard label="International" messiValue={messiIntlGoals} ronaldoValue={ronaldoIntlGoals} />
              <StatCard label="Champions League" messiValue={messiUclGoals} ronaldoValue={ronaldoUclGoals} />
            </div>
          </section>

          {/* Team Breakdown Pie Charts */}
          <section>
            <SectionHeading title="Goals by Team" subtitle="Distribution across clubs & country" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <TeamBreakdownChart player="Lionel Messi" data={messiTeamBreakdown} color="blue" img="/images/messi.webp" />
              <TeamBreakdownChart player="Cristiano Ronaldo" data={ronaldoTeamBreakdown} color="red" img="/images/ronaldo.webp" />
            </div>
          </section>

          {/* Goals by Match Result */}
          <section>
            <SectionHeading title="Goals by Match Result" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Goals in Wins" messiValue={messiGoalsInWins} ronaldoValue={ronaldoGoalsInWins} />
              <StatCard label="Goals in Draws" messiValue={messiGoalsInDraws} ronaldoValue={ronaldoGoalsInDraws} />
              <StatCard label="Goals in Losses" messiValue={messiGoalsInLosses} ronaldoValue={ronaldoGoalsInLosses} />
            </div>
          </section>

          {/* Advanced Breakdown */}
          <section>
            <SectionHeading title="Advanced Breakdown" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <StatCard label="Non-Penalty Goals" messiValue={messiNonPenaltyGoals} ronaldoValue={ronaldoNonPenaltyGoals} />
              <StatCard label="Penalty Conversion" messiValue={messiPenaltyConversion} ronaldoValue={ronaldoPenaltyConversion} suffix="%" />
              <StatCard label="Competitive Goals" messiValue={messiCompetitiveGoals} ronaldoValue={ronaldoCompetitiveGoals} />
              <StatCard label="Friendly Goals" messiValue={messiFriendlyGoals} ronaldoValue={ronaldoFriendlyGoals} />
              <StatCard label="Hat-Tricks" messiValue={messiHatTricks} ronaldoValue={ronaldoHatTricks} />
              <StatCard label="Braces (2 goals)" messiValue={messiBraceCount} ronaldoValue={ronaldoBraceCount} />
              <StatCard label="Multi-Goal Matches" messiValue={messiMultiGoalMatches} ronaldoValue={ronaldoMultiGoalMatches} />
              <StatCard label="Winning Goals" messiValue={messiWinningGoals} ronaldoValue={ronaldoWinningGoals} />
              <StatCard label="Starter Goals" messiValue={messiStarterGoals} ronaldoValue={ronaldoStarterGoals} />
              <StatCard label="Super Sub Goals" messiValue={messiSuperSubGoals} ronaldoValue={ronaldoSuperSubGoals} />
              <StatCard label="Home Goals" messiValue={messiHomeGoals} ronaldoValue={ronaldoHomeGoals} />
              <StatCard label="Away Goals" messiValue={messiAwayGoals} ronaldoValue={ronaldoAwayGoals} />
              <StatCard label="Derby Goals" messiValue={messiDerbyGoals} ronaldoValue={ronaldoDerbyGoals} />
              <StatCard label="Finals Goals" messiValue={messiFinalsGoals} ronaldoValue={ronaldoFinalsGoals} />
              <StatCard label="Knockout Stage" messiValue={messiKnockoutGoals} ronaldoValue={ronaldoKnockoutGoals} />
            </div>
          </section>

          {/* Goal Types */}
          <section>
            <SectionHeading title="Goals by Type" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <StatCard label="Left Foot" messiValue={safeNum(messi.left_foot_goals)} ronaldoValue={safeNum(ronaldo.left_foot_goals)} />
              <StatCard label="Right Foot" messiValue={safeNum(messi.right_foot_goals)} ronaldoValue={safeNum(ronaldo.right_foot_goals)} />
              <StatCard label="Headers" messiValue={safeNum(messi.header_goals)} ronaldoValue={safeNum(ronaldo.header_goals)} />
              <StatCard label="Penalties" messiValue={safeNum(messi.penalties_scored)} ronaldoValue={safeNum(ronaldo.penalties_scored)} />
              <StatCard label="Free Kicks" messiValue={safeNum(messi.free_kick_goals)} ronaldoValue={safeNum(ronaldo.free_kick_goals)} />
              <StatCard label="Inside Box" messiValue={safeNum(messi.inside_box_goals)} ronaldoValue={safeNum(ronaldo.inside_box_goals)} />
              <StatCard label="Outside Box" messiValue={safeNum(messi.outside_box_goals)} ronaldoValue={safeNum(ronaldo.outside_box_goals)} />
            </div>
          </section>

          {/* Chart */}
          <section>
            <SectionHeading title="Visual Comparison" />
            <div className={`${CARD_BASE} p-5 sm:p-6 lg:p-8`}>
              <div className="h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={goalTypeData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "12px" }} />
                    <Bar dataKey="messi" name="Messi" fill="#3B82F6" radius={[0, 6, 6, 0]} barSize={20} />
                    <Bar dataKey="ronaldo" name="Ronaldo" fill="#EF4444" radius={[0, 6, 6, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Efficiency */}
          <section>
            <SectionHeading title="Efficiency" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-lg mx-auto">
              <StatCard label="Goals Per Game" messiValue={+(messiTotal / messiGames).toFixed(2)} ronaldoValue={+(ronaldoTotal / ronaldoGames).toFixed(2)} />
              <StatCard label="Minutes Per Goal" messiValue={Math.round(messiMinutes / messiTotal)} ronaldoValue={Math.round(ronaldoMinutes / ronaldoTotal)} suffix=" min" lowerIsBetter />
            </div>
          </section>

        </div>
      </div>
    </Layout>
  )
}

// pages/goals.tsx - Change the export at the bottom

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    const messiMatches = await fetchAllMatches(1)
    const ronaldoMatches = await fetchAllMatches(2)

    const sumGoals = (arr: any[]) => arr.reduce((s: number, m: any) => s + (m.goals || 0), 0)
    const messiIntlGoals = sumGoals(messiMatches.filter(m => m.team === "Argentina"))
    const ronaldoIntlGoals = sumGoals(ronaldoMatches.filter(m => m.team === "Portugal"))
    const messiUclGoals = sumGoals(messiMatches.filter(m => UCL_COMPETITIONS.includes(m.competition || "")))
    const ronaldoUclGoals = sumGoals(ronaldoMatches.filter(m => UCL_COMPETITIONS.includes(m.competition || "")))
    const messiClubGoals = (messi?.total_goals || 0) - messiIntlGoals
    const ronaldoClubGoals = (ronaldo?.total_goals || 0) - ronaldoIntlGoals
    const messiNonPenaltyGoals = (messi?.total_goals || 0) - (messi?.penalties_scored || 0)
    const ronaldoNonPenaltyGoals = (ronaldo?.total_goals || 0) - (ronaldo?.penalties_scored || 0)
    const messiPenaltyConversion = +(((messi?.penalties_scored || 0) / ((messi?.penalties_scored || 0) + (messi?.penalties_missed || 0))) * 100).toFixed(1)
    const ronaldoPenaltyConversion = +(((ronaldo?.penalties_scored || 0) / ((ronaldo?.penalties_scored || 0) + (ronaldo?.penalties_missed || 0))) * 100).toFixed(1)
    const messiGoalsInWins = sumGoals(messiMatches.filter(m => m.result === "W"))
    const ronaldoGoalsInWins = sumGoals(ronaldoMatches.filter(m => m.result === "W"))
    const messiGoalsInDraws = sumGoals(messiMatches.filter(m => m.result === "D"))
    const ronaldoGoalsInDraws = sumGoals(ronaldoMatches.filter(m => m.result === "D"))
    const messiGoalsInLosses = sumGoals(messiMatches.filter(m => m.result === "L"))
    const ronaldoGoalsInLosses = sumGoals(ronaldoMatches.filter(m => m.result === "L"))
    const messiMultiGoalMatches = messiMatches.filter(m => (m.goals || 0) >= 2).length
    const ronaldoMultiGoalMatches = ronaldoMatches.filter(m => (m.goals || 0) >= 2).length
    const messiStarterGoals = sumGoals(messiMatches.filter(m => (m.minutes_played || 0) >= 45))
    const ronaldoStarterGoals = sumGoals(ronaldoMatches.filter(m => (m.minutes_played || 0) >= 45))
    const messiFriendlyGoals = sumGoals(messiMatches.filter(m => FRIENDLY_COMPETITIONS.includes(m.competition || "")))
    const ronaldoFriendlyGoals = sumGoals(ronaldoMatches.filter(m => FRIENDLY_COMPETITIONS.includes(m.competition || "")))
    const messiCompetitiveGoals = (messi?.total_goals || 0) - messiFriendlyGoals
    const ronaldoCompetitiveGoals = (ronaldo?.total_goals || 0) - ronaldoFriendlyGoals
    const isKnockout = (r: string) => ["Final", "Semi", "Quarter", "Round of", "R16", "QF", "SF", "Play-off"].some(k => (r || "").toLowerCase().includes(k.toLowerCase()))
    const messiKnockoutGoals = sumGoals(messiMatches.filter(m => isKnockout(m.round || "")))
    const ronaldoKnockoutGoals = sumGoals(ronaldoMatches.filter(m => isKnockout(m.round || "")))
    const messiGroupStageGoals = sumGoals(messiMatches.filter(m => (m.round || "").toLowerCase().includes("group")))
    const ronaldoGroupStageGoals = sumGoals(ronaldoMatches.filter(m => (m.round || "").toLowerCase().includes("group")))
    const messiHatTricks = messiMatches.filter(m => (m.goals || 0) >= 3).length
    const ronaldoHatTricks = ronaldoMatches.filter(m => (m.goals || 0) >= 3).length
    const messiBraceCount = messiMatches.filter(m => (m.goals || 0) === 2).length
    const ronaldoBraceCount = ronaldoMatches.filter(m => (m.goals || 0) === 2).length
    const messiWinningGoals = messiMatches.filter(m => m.result === "W" && (m.team_score || 0) - (m.opponent_score || 0) === 1 && (m.goals || 0) > 0).length
    const ronaldoWinningGoals = ronaldoMatches.filter(m => m.result === "W" && (m.team_score || 0) - (m.opponent_score || 0) === 1 && (m.goals || 0) > 0).length
    const messiHomeGoals = sumGoals(messiMatches.filter(m => m.venue === "H" || m.is_home === true))
    const ronaldoHomeGoals = sumGoals(ronaldoMatches.filter(m => m.venue === "H" || m.is_home === true))
    const messiAwayGoals = sumGoals(messiMatches.filter(m => m.venue === "A" || m.is_home === false))
    const ronaldoAwayGoals = sumGoals(ronaldoMatches.filter(m => m.venue === "A" || m.is_home === false))
    const messiSuperSubGoals = sumGoals(messiMatches.filter(m => (m.minutes_played || 0) <= 30))
    const ronaldoSuperSubGoals = sumGoals(ronaldoMatches.filter(m => (m.minutes_played || 0) <= 30))
    const messiDerbyGoals = sumGoals(messiMatches.filter(m => DERBY_MATCHES.has(m.opponent || "")))
    const ronaldoDerbyGoals = sumGoals(ronaldoMatches.filter(m => DERBY_MATCHES.has(m.opponent || "")))
    const messiFinalsGoals = sumGoals(messiMatches.filter(m => FINALS_ROUNDS.some(f => (m.round || "").toLowerCase().includes(f.toLowerCase()))))
    const ronaldoFinalsGoals = sumGoals(ronaldoMatches.filter(m => FINALS_ROUNDS.some(f => (m.round || "").toLowerCase().includes(f.toLowerCase()))))

    const getTeamBreakdown = (matches: any[]) => {
      const map: Record<string, number> = {}
      matches.forEach(m => { const t = m.team || "Unknown"; map[t] = (map[t] || 0) + (m.goals || 0) })
      return Object.entries(map).map(([team, goals]) => ({ team, goals })).sort((a, b) => b.goals - a.goals).slice(0, 6)
    }

    return {
      props: {
        messi, ronaldo, messiIntlGoals, ronaldoIntlGoals, messiUclGoals, ronaldoUclGoals,
        messiClubGoals, ronaldoClubGoals, messiNonPenaltyGoals, ronaldoNonPenaltyGoals,
        messiFriendlyGoals, ronaldoFriendlyGoals, messiCompetitiveGoals, ronaldoCompetitiveGoals,
        messiKnockoutGoals, ronaldoKnockoutGoals, messiGroupStageGoals, ronaldoGroupStageGoals,
        messiHatTricks, ronaldoHatTricks, messiWinningGoals, ronaldoWinningGoals,
        messiHomeGoals, ronaldoHomeGoals, messiAwayGoals, ronaldoAwayGoals,
        messiBraceCount, ronaldoBraceCount, messiSuperSubGoals, ronaldoSuperSubGoals,
        messiElClasicoGoals: 0, ronaldoElClasicoGoals: 0,
        messiDerbyGoals, ronaldoDerbyGoals, messiFinalsGoals, ronaldoFinalsGoals,
        messiTeamBreakdown: getTeamBreakdown(messiMatches),
        ronaldoTeamBreakdown: getTeamBreakdown(ronaldoMatches),
        messiPenaltyConversion, ronaldoPenaltyConversion,
        messiGoalsInWins, ronaldoGoalsInWins,
        messiGoalsInDraws, ronaldoGoalsInDraws,
        messiGoalsInLosses, ronaldoGoalsInLosses,
        messiMultiGoalMatches, ronaldoMultiGoalMatches,
        messiStarterGoals, ronaldoStarterGoals,
      },
    }
  } catch (e) {
    return {
      props: {
        messi: null, ronaldo: null, messiIntlGoals: 0, ronaldoIntlGoals: 0, messiUclGoals: 0, ronaldoUclGoals: 0,
        messiClubGoals: 0, ronaldoClubGoals: 0, messiNonPenaltyGoals: 0, ronaldoNonPenaltyGoals: 0,
        messiFriendlyGoals: 0, ronaldoFriendlyGoals: 0, messiCompetitiveGoals: 0, ronaldoCompetitiveGoals: 0,
        messiKnockoutGoals: 0, ronaldoKnockoutGoals: 0, messiGroupStageGoals: 0, ronaldoGroupStageGoals: 0,
        messiHatTricks: 0, ronaldoHatTricks: 0, messiWinningGoals: 0, ronaldoWinningGoals: 0,
        messiHomeGoals: 0, ronaldoHomeGoals: 0, messiAwayGoals: 0, ronaldoAwayGoals: 0,
        messiBraceCount: 0, ronaldoBraceCount: 0, messiSuperSubGoals: 0, ronaldoSuperSubGoals: 0,
        messiElClasicoGoals: 0, ronaldoElClasicoGoals: 0, messiDerbyGoals: 0, ronaldoDerbyGoals: 0,
        messiFinalsGoals: 0, ronaldoFinalsGoals: 0, messiTeamBreakdown: [], ronaldoTeamBreakdown: [],
        messiPenaltyConversion: 0, ronaldoPenaltyConversion: 0,
        messiGoalsInWins: 0, ronaldoGoalsInWins: 0, messiGoalsInDraws: 0, ronaldoGoalsInDraws: 0,
        messiGoalsInLosses: 0, ronaldoGoalsInLosses: 0, messiMultiGoalMatches: 0, ronaldoMultiGoalMatches: 0,
        messiStarterGoals: 0, ronaldoStarterGoals: 0,
      },
    }
  }
}