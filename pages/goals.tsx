// pages/goals.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next" 
import { motion } from "framer-motion"
import Image from "next/image"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
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
  title="Messi vs Ronaldo Goals: Who Has Scored More? Complete Stats" 
  description="How many goals does Ronaldo have? Messi? Compare total career goals, goals per season, free kicks, penalties, headers, and every goal breakdown."> 
  <BreadcrumbSchema
      items={[
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Goals",
          url: "/goals",
        },
      ]}
    />
      <div className="bg-black">
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
{/* =========================================================
    SEO CONTENT SECTION - GOALS PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Goals: Complete Career Goal Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      {/* INTRODUCTION */}

      <p>
        The <strong className="text-white">Messi vs Ronaldo goals</strong>{" "}
        debate is one of the most discussed statistical comparisons in
        football history. Lionel Messi and Cristiano Ronaldo have spent
        more than two decades scoring at the highest level, producing
        extraordinary numbers for their clubs and national teams.
      </p>

      <p>
        Looking only at total goals, however, does not tell the complete
        story. A detailed comparison also needs to consider appearances,
        goals per game, minutes per goal, club goals, international goals,
        Champions League goals, non-penalty goals, penalties, free kicks,
        headers, knockout matches, finals and multi-goal performances.
      </p>

      <p>
        This page brings those goal-scoring categories together using the
        current statistics stored in the Mesnaldo database. Rather than
        relying on one headline number, you can compare how Messi and
        Ronaldo scored their goals, where they scored them and how
        efficiently they converted appearances into goals.
      </p>


      {/* TOTAL CAREER GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        How Many Career Goals Do Messi and Ronaldo Have?
      </h3>

      <p>
        According to the current career statistics used on this page,{" "}
        <strong className="text-blue-400">Lionel Messi</strong> has scored{" "}
        <strong className="text-white">
          {messiTotal.toLocaleString()}
        </strong>{" "}
        career goals, while{" "}
        <strong className="text-red-400">Cristiano Ronaldo</strong> has scored{" "}
        <strong className="text-white">
          {ronaldoTotal.toLocaleString()}
        </strong>.
      </p>

      {(() => {
        const difference = Math.abs(ronaldoTotal - messiTotal)

        if (ronaldoTotal === messiTotal) {
          return (
            <p>
              Messi and Ronaldo are currently level on total career goals
              according to the figures shown on this page.
            </p>
          )
        }

        const leader =
          ronaldoTotal > messiTotal ? "Cristiano Ronaldo" : "Lionel Messi"

        return (
          <p>
            Based on these totals,{" "}
            <strong className="text-white">{leader}</strong> currently leads
            the overall goal count by{" "}
            <strong className="text-white">
              {difference.toLocaleString()}
            </strong>{" "}
            goals. This difference should still be considered alongside the
            number of matches each player has played, because career totals
            are influenced by longevity as well as scoring efficiency.
          </p>
        )
      })()}


      {/* GOALS PER GAME */}

      {(() => {
        const messiGPG = messiTotal / messiGames
        const ronaldoGPG = ronaldoTotal / ronaldoGames

        return (
          <>
            <h3 className="text-xl font-bold text-white mt-10">
              Messi vs Ronaldo Goals Per Game
            </h3>

            <p>
              Goals per game gives additional context to raw career totals.
              Messi currently averages approximately{" "}
              <strong className="text-blue-400">
                {messiGPG.toFixed(3)}
              </strong>{" "}
              goals per appearance, while Ronaldo averages approximately{" "}
              <strong className="text-red-400">
                {ronaldoGPG.toFixed(3)}
              </strong>{" "}
              goals per appearance.
            </p>

            <p>
              Total goals and goals per game answer two different questions.
              Total goals reward accumulated production across an entire
              career, while goals per game measures how frequently each
              player scored when he appeared. Looking at both figures gives
              a more balanced view of their goal-scoring records.
            </p>
          </>
        )
      })()}


      {/* MINUTES PER GOAL */}

      {(() => {
        const messiMPG =
          messiTotal > 0 ? Math.round(messiMinutes / messiTotal) : 0

        const ronaldoMPG =
          ronaldoTotal > 0 ? Math.round(ronaldoMinutes / ronaldoTotal) : 0

        return (
          <>
            <h3 className="text-xl font-bold text-white mt-10">
              Messi vs Ronaldo Minutes Per Goal
            </h3>

            <p>
              Minutes per goal is another useful efficiency statistic because
              it considers actual playing time rather than appearances alone.
              Messi currently scores approximately once every{" "}
              <strong className="text-blue-400">
                {messiMPG.toLocaleString()} minutes
              </strong>,
              while Ronaldo scores approximately once every{" "}
              <strong className="text-red-400">
                {ronaldoMPG.toLocaleString()} minutes
              </strong>.
            </p>

            <p>
              Unlike most categories on this page, a lower minutes-per-goal
              figure represents greater scoring frequency because it means a
              player requires fewer minutes on the pitch to produce a goal.
            </p>
          </>
        )
      })()}


      {/* CLUB GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Club Goals
      </h3>

      <p>
        Club football accounts for the largest portion of both players&apos;
        careers. Messi currently has{" "}
        <strong className="text-blue-400">
          {messiClubGoals.toLocaleString()}
        </strong>{" "}
        club goals in the data used on this page, compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {ronaldoClubGoals.toLocaleString()}
        </strong>.
      </p>

      <p>
        These totals cover goals produced while representing their clubs
        across domestic leagues, cup competitions and continental football
        included in the database. Because both players have represented
        multiple teams and competitions during their careers, club totals are
        useful for separating professional club production from
        international-team goals.
      </p>


      {/* INTERNATIONAL GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo International Goals
      </h3>

      <p>
        International goal scoring is another major part of the rivalry.
        Lionel Messi has currently scored{" "}
        <strong className="text-blue-400">
          {messiIntlGoals.toLocaleString()}
        </strong>{" "}
        goals for Argentina according to the matches included in the database,
        while Cristiano Ronaldo has scored{" "}
        <strong className="text-red-400">
          {ronaldoIntlGoals.toLocaleString()}
        </strong>{" "}
        for Portugal.
      </p>

      <p>
        International goals come in a different competitive environment from
        club football. National teams play fewer matches, preparation periods
        are shorter and major international tournaments are separated by
        several years. For that reason, international goal totals should be
        considered as their own category rather than simply being absorbed
        into the overall career number.
      </p>


      {/* CHAMPIONS LEAGUE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Goals
      </h3>

      <p>
        The UEFA Champions League played a major role in establishing both
        Messi and Ronaldo among the greatest goal scorers in football
        history. In the Champions League competitions recognised by this
        page, Messi has{" "}
        <strong className="text-blue-400">
          {messiUclGoals.toLocaleString()}
        </strong>{" "}
        goals, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoUclGoals.toLocaleString()}
        </strong>.
      </p>

      <p>
        Champions League goals are particularly significant because they are
        scored against teams qualifying from Europe&apos;s strongest domestic
        competitions. Both players produced memorable group-stage and
        knockout performances, making their European records one of the most
        important parts of the overall comparison.
      </p>


      {/* COMPETITIVE GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Competitive Goals vs Friendly Goals
      </h3>

      <p>
        Not every match carries the same competitive importance. The current
        data separates goals scored in competitive fixtures from goals scored
        in international friendlies.
      </p>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {messiCompetitiveGoals.toLocaleString()}
        </strong>{" "}
        competitive goals and{" "}
        <strong className="text-blue-400">
          {messiFriendlyGoals.toLocaleString()}
        </strong>{" "}
        friendly goals. Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoCompetitiveGoals.toLocaleString()}
        </strong>{" "}
        competitive goals and{" "}
        <strong className="text-red-400">
          {ronaldoFriendlyGoals.toLocaleString()}
        </strong>{" "}
        friendly goals.
      </p>

      <p>
        Separating these categories provides useful context for supporters who
        prefer to compare goals scored in competitive fixtures independently
        from international friendly matches.
      </p>


      {/* NON PENALTY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Non-Penalty Goals
      </h3>

      <p>
        Non-penalty goals are frequently used when comparing elite scorers
        because they remove goals scored from the penalty spot and focus on
        other forms of finishing.
      </p>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messiNonPenaltyGoals.toLocaleString()}
        </strong>{" "}
        non-penalty goals, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoNonPenaltyGoals.toLocaleString()}
        </strong>.
        These figures are calculated by subtracting penalties scored from the
        overall career-goal total.
      </p>

      <p>
        Penalty goals are still legitimate official goals and should not
        simply be ignored. However, separating them allows a different
        question to be answered: how many goals did each player score through
        open play, free kicks and other non-penalty situations?
      </p>


      {/* PENALTIES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Penalty Goals
      </h3>

      <p>
        Penalties have contributed to the goal totals of both players.
        Messi has converted{" "}
        <strong className="text-blue-400">
          {safeNum(messi.penalties_scored).toLocaleString()}
        </strong>{" "}
        penalties in the current career dataset, while Ronaldo has converted{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.penalties_scored).toLocaleString()}
        </strong>.
      </p>

      <p>
        The current penalty-conversion figures on this page are{" "}
        <strong className="text-blue-400">
          {messiPenaltyConversion}%
        </strong>{" "}
        for Messi and{" "}
        <strong className="text-red-400">
          {ronaldoPenaltyConversion}%
        </strong>{" "}
        for Ronaldo. Conversion percentage gives useful context because
        scoring more penalties can partly reflect taking more attempts.
      </p>


      {/* FREE KICKS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Free Kick Goals
      </h3>

      <p>
        Direct free kicks became another recognizable part of both
        players&apos; careers. Messi currently has{" "}
        <strong className="text-blue-400">
          {safeNum(messi.free_kick_goals).toLocaleString()}
        </strong>{" "}
        free-kick goals, compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.free_kick_goals).toLocaleString()}
        </strong>.
      </p>

      <p>
        Their free-kick styles have also differed. Ronaldo became famous for
        powerful, low-spin strikes, particularly during the earlier stages of
        his career. Messi became closely associated with controlled curling
        shots designed to move over defensive walls and into the corners of
        the goal.
      </p>


      {/* LEFT & RIGHT FOOT */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Left-Foot and Right-Foot Goals
      </h3>

      <p>
        Breaking goals down by preferred foot clearly illustrates part of the
        stylistic difference between the two forwards. Messi has scored{" "}
        <strong className="text-blue-400">
          {safeNum(messi.left_foot_goals).toLocaleString()}
        </strong>{" "}
        goals with his left foot and{" "}
        <strong className="text-blue-400">
          {safeNum(messi.right_foot_goals).toLocaleString()}
        </strong>{" "}
        with his right.
      </p>

      <p>
        Ronaldo has recorded{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.right_foot_goals).toLocaleString()}
        </strong>{" "}
        right-footed goals and{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.left_foot_goals).toLocaleString()}
        </strong>{" "}
        left-footed goals.
      </p>

      <p>
        These totals reflect both their preferred finishing techniques and
        the positions from which they have typically attacked throughout
        their careers.
      </p>


      {/* HEADERS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Header Goals
      </h3>

      <p>
        Heading is one of the clearest areas in which their scoring profiles
        differ. Messi currently has{" "}
        <strong className="text-blue-400">
          {safeNum(messi.header_goals).toLocaleString()}
        </strong>{" "}
        headed goals, while Ronaldo has{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.header_goals).toLocaleString()}
        </strong>.
      </p>

      <p>
        Ronaldo&apos;s height, jumping ability, timing and aerial movement have
        made heading an important part of his career goal total. Messi has
        naturally relied less heavily on aerial scoring, with a greater
        proportion of his goals coming from his feet.
      </p>


      {/* INSIDE / OUTSIDE BOX */}

      <h3 className="text-xl font-bold text-white mt-10">
        Goals Inside and Outside the Penalty Area
      </h3>

      <p>
        Goal location can help explain how each player has created scoring
        opportunities. Messi currently has{" "}
        <strong className="text-blue-400">
          {safeNum(messi.inside_box_goals).toLocaleString()}
        </strong>{" "}
        goals from inside the penalty area and{" "}
        <strong className="text-blue-400">
          {safeNum(messi.outside_box_goals).toLocaleString()}
        </strong>{" "}
        from outside the box.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.inside_box_goals).toLocaleString()}
        </strong>{" "}
        goals from inside the box and{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.outside_box_goals).toLocaleString()}
        </strong>{" "}
        from outside the penalty area.
      </p>

      <p>
        Inside-the-box totals usually reflect movement, positioning and
        close-range finishing, while outside-the-box goals can highlight
        long-range shooting, free-space creation and striking technique.
      </p>


      {/* HAT TRICKS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Hat-Tricks
      </h3>

      <p>
        Hat-tricks are among the most memorable individual scoring
        performances in football. In the match data used on this page, Messi
        has recorded{" "}
        <strong className="text-blue-400">
          {messiHatTricks.toLocaleString()}
        </strong>{" "}
        matches with at least three goals, while Ronaldo has recorded{" "}
        <strong className="text-red-400">
          {ronaldoHatTricks.toLocaleString()}
        </strong>.
      </p>

      <p>
        Hat-trick totals illustrate a player&apos;s ability to dominate a single
        match through repeated finishing. Because this page calculates them
        from matches containing three or more goals, performances with four
        or more goals are included in this category as well.
      </p>


      {/* BRACES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Braces and Multi-Goal Matches
      </h3>

      <p>
        Scoring twice in a match is another useful measure of repeated
        match-winning output. Messi has{" "}
        <strong className="text-blue-400">
          {messiBraceCount.toLocaleString()}
        </strong>{" "}
        matches with exactly two goals, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoBraceCount.toLocaleString()}
        </strong>.
      </p>

      <p>
        When every match containing at least two goals is counted, Messi has{" "}
        <strong className="text-blue-400">
          {messiMultiGoalMatches.toLocaleString()}
        </strong>{" "}
        multi-goal matches and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoMultiGoalMatches.toLocaleString()}
        </strong>.
      </p>


      {/* KNOCKOUT */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Knockout Stage Goals
      </h3>

      <p>
        Goals in knockout matches receive special attention because a poor
        result can immediately end a team&apos;s tournament. Based on the
        knockout-round classifications used in the match database, Messi has{" "}
        <strong className="text-blue-400">
          {messiKnockoutGoals.toLocaleString()}
        </strong>{" "}
        knockout-stage goals and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoKnockoutGoals.toLocaleString()}
        </strong>.
      </p>

      <p>
        This category includes matches whose round descriptions identify
        finals, semi-finals, quarter-finals, round-of-16 style stages and
        other knockout or play-off rounds represented in the database.
      </p>


      {/* FINALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Goals in Finals
      </h3>

      <p>
        Finals represent some of the highest-pressure matches of a football
        career. Messi has scored{" "}
        <strong className="text-blue-400">
          {messiFinalsGoals.toLocaleString()}
        </strong>{" "}
        goals in matches identified as finals in the dataset, while Ronaldo
        has scored{" "}
        <strong className="text-red-400">
          {ronaldoFinalsGoals.toLocaleString()}
        </strong>.
      </p>

      <p>
        Finals goals are particularly memorable because they occur when
        trophies are directly at stake. However, they should be considered
        alongside appearances in finals, competition strength and overall
        knockout performance rather than interpreted in isolation.
      </p>


      {/* WINNING GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Winning Goals
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {messiWinningGoals.toLocaleString()}
        </strong>{" "}
        winning-goal performances according to the logic used by this page,
        compared with{" "}
        <strong className="text-red-400">
          {ronaldoWinningGoals.toLocaleString()}
        </strong>{" "}
        for Ronaldo.
      </p>

      <p>
        On this page, the winning-goal statistic is calculated from victories
        decided by a one-goal margin in which the player scored. It should
        therefore be understood as a specific match-data calculation rather
        than a universal definition of every possible match-winning goal.
      </p>


      {/* HOME / AWAY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Home and Away Goals
      </h3>

      <p>
        Venue splits can show whether scoring production changes between home
        and away matches. Messi has{" "}
        <strong className="text-blue-400">
          {messiHomeGoals.toLocaleString()}
        </strong>{" "}
        home goals and{" "}
        <strong className="text-blue-400">
          {messiAwayGoals.toLocaleString()}
        </strong>{" "}
        away goals in the available match records.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoHomeGoals.toLocaleString()}
        </strong>{" "}
        home goals and{" "}
        <strong className="text-red-400">
          {ronaldoAwayGoals.toLocaleString()}
        </strong>{" "}
        away goals.
      </p>

      <p>
        Away scoring can be particularly interesting because players often
        face different tactical conditions and less favourable crowd
        environments than they do at home.
      </p>


      {/* MATCH RESULT */}

      <h3 className="text-xl font-bold text-white mt-10">
        Goals in Wins, Draws and Losses
      </h3>

      <p>
        Another way to interpret goal scoring is by examining the final match
        result. Messi has scored{" "}
        <strong className="text-blue-400">
          {messiGoalsInWins.toLocaleString()}
        </strong>{" "}
        goals in wins,{" "}
        <strong className="text-blue-400">
          {messiGoalsInDraws.toLocaleString()}
        </strong>{" "}
        in draws and{" "}
        <strong className="text-blue-400">
          {messiGoalsInLosses.toLocaleString()}
        </strong>{" "}
        in defeats.
      </p>

      <p>
        Ronaldo has scored{" "}
        <strong className="text-red-400">
          {ronaldoGoalsInWins.toLocaleString()}
        </strong>{" "}
        goals in victories,{" "}
        <strong className="text-red-400">
          {ronaldoGoalsInDraws.toLocaleString()}
        </strong>{" "}
        in draws and{" "}
        <strong className="text-red-400">
          {ronaldoGoalsInLosses.toLocaleString()}
        </strong>{" "}
        in defeats.
      </p>

      <p>
        This does not directly measure how responsible a player was for a team
        result, but it adds useful context by showing how their goals are
        distributed across winning and non-winning performances.
      </p>


      {/* STARTER / SUB */}

      <h3 className="text-xl font-bold text-white mt-10">
        Goals as a Starter and Substitute
      </h3>

      <p>
        The match data also provides a view of goals relative to playing
        time. Messi has{" "}
        <strong className="text-blue-400">
          {messiStarterGoals.toLocaleString()}
        </strong>{" "}
        goals in matches classified by this page as starter-level playing
        time and{" "}
        <strong className="text-blue-400">
          {messiSuperSubGoals.toLocaleString()}
        </strong>{" "}
        goals in appearances of 30 minutes or fewer.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoStarterGoals.toLocaleString()}
        </strong>{" "}
        starter goals and{" "}
        <strong className="text-red-400">
          {ronaldoSuperSubGoals.toLocaleString()}
        </strong>{" "}
        goals in appearances lasting 30 minutes or fewer.
      </p>


      {/* DERBY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Derby Goals
      </h3>

      <p>
        Goals against major rivals are remembered differently from goals in
        ordinary league fixtures. Based on the derby opponents currently
        classified by this page, Messi has{" "}
        <strong className="text-blue-400">
          {messiDerbyGoals.toLocaleString()}
        </strong>{" "}
        derby goals and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoDerbyGoals.toLocaleString()}
        </strong>.
      </p>

      <p>
        Derby statistics can be useful for examining performance in
        high-profile rivalry matches, although definitions of which fixtures
        qualify as a derby can differ between datasets.
      </p>


      {/* SCORING STYLES */}

      <h3 className="text-xl font-bold text-white mt-10">
        How Messi and Ronaldo Score Differently
      </h3>

      <p>
        The numbers on this page highlight two different scoring profiles.
        Messi&apos;s goals have often been associated with close control,
        combination play, left-footed finishing, dribbling into central areas
        and precise placement. Ronaldo&apos;s scoring career has included
        powerful right-footed finishing, strong off-ball movement, aerial
        goals and repeated attacks into high-value positions inside the box.
      </p>

      <p>
        Those styles have also changed over time. Ronaldo developed from a
        wide dribbler into an increasingly penalty-area-focused scorer.
        Messi has operated as a winger, false nine, central attacker and
        deeper creator while remaining a high-volume goal scorer.
      </p>

      <p>
        That is why comparing only one type of goal can be misleading. Left
        foot, right foot, headers, penalties, free kicks, inside-box goals and
        outside-box goals all describe different parts of the same overall
        scoring record.
      </p>


      {/* HOW TO INTERPRET */}

      <h3 className="text-xl font-bold text-white mt-10">
        How to Interpret Messi vs Ronaldo Goal Statistics
      </h3>

      <p>
        No single goal statistic gives a complete answer to the Messi vs
        Ronaldo debate. Total goals reward longevity and accumulated output.
        Goals per game emphasise frequency. Minutes per goal measures scoring
        relative to actual playing time. Non-penalty goals reduce the effect
        of penalty-taking opportunities, while Champions League and knockout
        statistics focus on specific competitive environments.
      </p>

      <p>
        The fairest approach is therefore to compare several metrics at the
        same time. A player can lead one area while trailing another, and that
        does not make either statistic invalid. It simply means the two
        careers have produced different strengths.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Goals FAQ
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more career goals, Messi or Ronaldo?
      </h3>

      <p>
        The current statistics shown on Mesnaldo list Messi with{" "}
        <strong className="text-blue-400">
          {messiTotal.toLocaleString()}
        </strong>{" "}
        goals and Ronaldo with{" "}
        <strong className="text-red-400">
          {ronaldoTotal.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has the better goals-per-game ratio?
      </h3>

      <p>
        Based on the current career totals and appearances used by this page,
        Messi averages{" "}
        <strong className="text-blue-400">
          {(messiTotal / messiGames).toFixed(3)}
        </strong>{" "}
        goals per appearance and Ronaldo averages{" "}
        <strong className="text-red-400">
          {(ronaldoTotal / ronaldoGames).toFixed(3)}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more non-penalty goals?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messiNonPenaltyGoals.toLocaleString()}
        </strong>{" "}
        non-penalty goals compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {ronaldoNonPenaltyGoals.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more international goals?
      </h3>

      <p>
        In the international match data used by this page, Messi has{" "}
        <strong className="text-blue-400">
          {messiIntlGoals.toLocaleString()}
        </strong>{" "}
        goals for Argentina and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoIntlGoals.toLocaleString()}
        </strong>{" "}
        goals for Portugal.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Champions League goals?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {messiUclGoals.toLocaleString()}
        </strong>{" "}
        Champions League goals in the competitions recognised by this page,
        while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoUclGoals.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more hat-tricks?
      </h3>

      <p>
        The current match database produces{" "}
        <strong className="text-blue-400">
          {messiHatTricks.toLocaleString()}
        </strong>{" "}
        hat-trick matches for Messi and{" "}
        <strong className="text-red-400">
          {ronaldoHatTricks.toLocaleString()}
        </strong>{" "}
        for Ronaldo.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more free-kick goals?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {safeNum(messi.free_kick_goals).toLocaleString()}
        </strong>{" "}
        direct free-kick goals in the career dataset, while Ronaldo has{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.free_kick_goals).toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more headed goals?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {safeNum(messi.header_goals).toLocaleString()}
        </strong>{" "}
        headed goals, while Ronaldo has{" "}
        <strong className="text-red-400">
          {safeNum(ronaldo.header_goals).toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Are these Messi vs Ronaldo goal statistics dynamic?
      </h3>

      <p>
        Yes. The values displayed throughout this section come from the same
        career statistics and match-derived values supplied to the Goals
        page. When the underlying database is updated, the comparisons in
        this section use those updated values on the next server-rendered
        request.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Goal Scoring Comparison
      </h2>

      <p>
        Lionel Messi and Cristiano Ronaldo have produced two of the most
        remarkable scoring careers football has ever seen. Their enormous
        goal totals are only the beginning of the comparison. The differences
        become clearer when the numbers are divided into club goals,
        international goals, Champions League goals, non-penalty goals,
        penalties, free kicks, headers, knockout matches, finals and
        efficiency.
      </p>

      <p>
        One player may lead in overall volume while another performs better
        in a particular type of goal or efficiency measure. That is why this
        page is designed around multiple categories rather than a single
        winner.
      </p>

      <p>
        Mesnaldo&apos;s goal comparison lets you examine the data and decide
        which achievements matter most to you. As the careers continue and
        the underlying statistics change, the dynamic values displayed here
        can continue to reflect the latest data stored by the site.
      </p>

    </div>
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