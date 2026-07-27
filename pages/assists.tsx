// pages/assists.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AssistsPageProps {
  messi: any; ronaldo: any
  messiIntlAssists: number; ronaldoIntlAssists: number
  messiUclAssists: number; ronaldoUclAssists: number
  messiClubAssists: number; ronaldoClubAssists: number
  messiAssistsInWins: number; ronaldoAssistsInWins: number
  messiAssistsInDraws: number; ronaldoAssistsInDraws: number
  messiAssistsInLosses: number; ronaldoAssistsInLosses: number
  messiHomeAssists: number; ronaldoHomeAssists: number
  messiAwayAssists: number; ronaldoAwayAssists: number
  messiStarterAssists: number; ronaldoStarterAssists: number
  messiSuperSubAssists: number; ronaldoSuperSubAssists: number
  messiMultiAssistMatches: number; ronaldoMultiAssistMatches: number
  messiHatTrickAssists: number; ronaldoHatTrickAssists: number
  messiTeamBreakdown: { team: string; assists: number }[]
  ronaldoTeamBreakdown: { team: string; assists: number }[]
  messiGoalContributions: number; ronaldoGoalContributions: number
  messiAssistsPerGame: number; ronaldoAssistsPerGame: number
  messiMinutesPerAssist: number; ronaldoMinutesPerAssist: number
}

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"
const UCL_COMPETITIONS = ["Champs League", "Champions League", "Champions League Qualifying"]

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
            <Image src="/images/messi.png" alt="Messi" fill className="object-cover" />
          </div>
          <p className={`text-xl sm:text-2xl font-black ${winner === "messi" ? "text-blue-400" : "text-gray-400"}`}>{m.toLocaleString()}{suffix}</p>
          <p className="text-[10px] text-gray-600 mt-0.5">Messi</p>
          {winner === "messi" && <span className="text-[10px] text-amber-400">👑</span>}
        </div>
        <span className="text-xs text-gray-700 font-medium pt-6">vs</span>
        <div className="text-center flex-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-2 shadow-lg shadow-red-500/10">
            <Image src="/images/ronaldo.png" alt="Ronaldo" fill className="object-cover" />
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

function TeamBreakdownChart({ player, data, color, img }: { player: string; data: { team: string; assists: number }[]; color: string; img: string }) {
  const total = data.reduce((s, d) => s + d.assists, 0)
  const colors = color === "blue" ? MESSI_COLORS : RONALDO_COLORS
  return (
    <div className={`${CARD_BASE} p-5 sm:p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${color === "blue" ? "border-blue-500/30" : "border-red-500/30"}`}>
          <Image src={img} alt={player} fill className="object-cover" />
        </div>
        <div>
          <h3 className={`font-bold text-sm ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{player}</h3>
          <p className="text-[10px] text-gray-500">Assists by club/nation</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={2} dataKey="assists">
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
              <span className={`text-xs font-bold ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{d.assists}</span>
              <span className="text-[10px] text-gray-600">{((d.assists / total) * 100).toFixed(1)}%</span>
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
      .from("matches").select("assists, goals, team, competition, round, venue, result, minutes_played")
      .eq("player_id", playerId).range(from, from + pageSize - 1).order("id", { ascending: true })
    if (error || !data || data.length === 0) break
    allRows = allRows.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return allRows
}

export default function Assists(props: AssistsPageProps) {
  const { messi, ronaldo, messiIntlAssists, ronaldoIntlAssists, messiUclAssists, ronaldoUclAssists, messiClubAssists, ronaldoClubAssists, messiAssistsInWins, ronaldoAssistsInWins, messiAssistsInDraws, ronaldoAssistsInDraws, messiAssistsInLosses, ronaldoAssistsInLosses, messiHomeAssists, ronaldoHomeAssists, messiAwayAssists, ronaldoAwayAssists, messiStarterAssists, ronaldoStarterAssists, messiSuperSubAssists, ronaldoSuperSubAssists, messiMultiAssistMatches, ronaldoMultiAssistMatches, messiHatTrickAssists, ronaldoHatTrickAssists, messiTeamBreakdown, ronaldoTeamBreakdown, messiGoalContributions, ronaldoGoalContributions, messiAssistsPerGame, ronaldoAssistsPerGame, messiMinutesPerAssist, ronaldoMinutesPerAssist } = props

  if (!messi || !ronaldo) {
    return (
      <Layout title="Assists Comparison">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  const messiTotal = safeNum(messi.total_assists)
  const ronaldoTotal = safeNum(ronaldo.total_assists)
  const messiGames = safeNum(messi.total_games) || 1
  const ronaldoGames = safeNum(ronaldo.total_games) || 1
  const messiMinutes = safeNum(messi.total_minutes) || 1
  const ronaldoMinutes = safeNum(ronaldo.total_minutes) || 1

  return (
    <Layout title="Assists Comparison - Messi vs Ronaldo">
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-14 sm:space-y-16 lg:space-y-20">

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Assists Comparison</h1>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">Complete career playmaking statistics</p>
          </div>

          <section>
            <SectionHeading title="Total Career Assists" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <div className={`${CARD_BASE} p-6 sm:p-8 text-center`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-4 shadow-xl shadow-blue-500/20">
                  <Image src="/images/messi.png" alt="Messi" fill className="object-cover" />
                </div>
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-400">{messiTotal.toLocaleString()}</motion.p>
                <p className="text-xs text-gray-500 mt-2">Lionel Messi</p>
              </div>
              <div className={`${CARD_BASE} p-6 sm:p-8 text-center`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-4 shadow-xl shadow-red-500/20">
                  <Image src="/images/ronaldo.png" alt="Ronaldo" fill className="object-cover" />
                </div>
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-400">{ronaldoTotal.toLocaleString()}</motion.p>
                <p className="text-xs text-gray-500 mt-2">Cristiano Ronaldo</p>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading title="Assists by Competition" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Club Assists" messiValue={messiClubAssists} ronaldoValue={ronaldoClubAssists} />
              <StatCard label="International" messiValue={messiIntlAssists} ronaldoValue={ronaldoIntlAssists} />
              <StatCard label="Champions League" messiValue={messiUclAssists} ronaldoValue={ronaldoUclAssists} />
            </div>
          </section>

          <section>
            <SectionHeading title="Assists by Team" subtitle="Distribution across clubs & country" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <TeamBreakdownChart player="Lionel Messi" data={messiTeamBreakdown} color="blue" img="/images/messi.png" />
              <TeamBreakdownChart player="Cristiano Ronaldo" data={ronaldoTeamBreakdown} color="red" img="/images/ronaldo.png" />
            </div>
          </section>

          <section>
            <SectionHeading title="Assists by Match Result" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Assists in Wins" messiValue={messiAssistsInWins} ronaldoValue={ronaldoAssistsInWins} />
              <StatCard label="Assists in Draws" messiValue={messiAssistsInDraws} ronaldoValue={ronaldoAssistsInDraws} />
              <StatCard label="Assists in Losses" messiValue={messiAssistsInLosses} ronaldoValue={ronaldoAssistsInLosses} />
            </div>
          </section>

          <section>
            <SectionHeading title="Advanced Breakdown" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <StatCard label="Goal Contributions" messiValue={messiGoalContributions} ronaldoValue={ronaldoGoalContributions} />
              <StatCard label="Home Assists" messiValue={messiHomeAssists} ronaldoValue={ronaldoHomeAssists} />
              <StatCard label="Away Assists" messiValue={messiAwayAssists} ronaldoValue={ronaldoAwayAssists} />
              <StatCard label="Starter Assists" messiValue={messiStarterAssists} ronaldoValue={ronaldoStarterAssists} />
              <StatCard label="Super Sub Assists" messiValue={messiSuperSubAssists} ronaldoValue={ronaldoSuperSubAssists} />
              <StatCard label="Multi-Assist Matches" messiValue={messiMultiAssistMatches} ronaldoValue={ronaldoMultiAssistMatches} />
              <StatCard label="Hat-Trick Assists" messiValue={messiHatTrickAssists} ronaldoValue={ronaldoHatTrickAssists} />
            </div>
          </section>

          <section>
            <SectionHeading title="Efficiency" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Assists Per Game" messiValue={messiAssistsPerGame} ronaldoValue={ronaldoAssistsPerGame} />
              <StatCard label="Minutes Per Assist" messiValue={messiMinutesPerAssist} ronaldoValue={ronaldoMinutesPerAssist} suffix=" min" lowerIsBetter />
              <StatCard label="G+A Per Game" messiValue={+((safeNum(messi.total_goals) + messiTotal) / messiGames).toFixed(2)} ronaldoValue={+((safeNum(ronaldo.total_goals) + ronaldoTotal) / ronaldoGames).toFixed(2)} />
            </div>
          </section>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    const messiMatches = await fetchAllMatches(1)
    const ronaldoMatches = await fetchAllMatches(2)

    const sumAssists = (arr: any[]) => arr.reduce((s: number, m: any) => s + (m.assists || 0), 0)
    const messiIntlAssists = sumAssists(messiMatches.filter(m => m.team === "Argentina"))
    const ronaldoIntlAssists = sumAssists(ronaldoMatches.filter(m => m.team === "Portugal"))
    const messiUclAssists = sumAssists(messiMatches.filter(m => UCL_COMPETITIONS.includes(m.competition || "")))
    const ronaldoUclAssists = sumAssists(ronaldoMatches.filter(m => UCL_COMPETITIONS.includes(m.competition || "")))
    const messiClubAssists = (messi?.total_assists || 0) - messiIntlAssists
    const ronaldoClubAssists = (ronaldo?.total_assists || 0) - ronaldoIntlAssists
    const messiAssistsInWins = sumAssists(messiMatches.filter(m => m.result === "W"))
    const ronaldoAssistsInWins = sumAssists(ronaldoMatches.filter(m => m.result === "W"))
    const messiAssistsInDraws = sumAssists(messiMatches.filter(m => m.result === "D"))
    const ronaldoAssistsInDraws = sumAssists(ronaldoMatches.filter(m => m.result === "D"))
    const messiAssistsInLosses = sumAssists(messiMatches.filter(m => m.result === "L"))
    const ronaldoAssistsInLosses = sumAssists(ronaldoMatches.filter(m => m.result === "L"))
    const messiHomeAssists = sumAssists(messiMatches.filter(m => m.venue === "H" || m.is_home === true))
    const ronaldoHomeAssists = sumAssists(ronaldoMatches.filter(m => m.venue === "H" || m.is_home === true))
    const messiAwayAssists = sumAssists(messiMatches.filter(m => m.venue === "A" || m.is_home === false))
    const ronaldoAwayAssists = sumAssists(ronaldoMatches.filter(m => m.venue === "A" || m.is_home === false))
    const messiStarterAssists = sumAssists(messiMatches.filter(m => (m.minutes_played || 0) >= 45))
    const ronaldoStarterAssists = sumAssists(ronaldoMatches.filter(m => (m.minutes_played || 0) >= 45))
    const messiSuperSubAssists = sumAssists(messiMatches.filter(m => (m.minutes_played || 0) <= 30))
    const ronaldoSuperSubAssists = sumAssists(ronaldoMatches.filter(m => (m.minutes_played || 0) <= 30))
    const messiMultiAssistMatches = messiMatches.filter(m => (m.assists || 0) >= 2).length
    const ronaldoMultiAssistMatches = ronaldoMatches.filter(m => (m.assists || 0) >= 2).length
    const messiHatTrickAssists = messiMatches.filter(m => (m.assists || 0) >= 3).length
    const ronaldoHatTrickAssists = ronaldoMatches.filter(m => (m.assists || 0) >= 3).length
    const messiGoalContributions = (messi?.total_goals || 0) + (messi?.total_assists || 0)
    const ronaldoGoalContributions = (ronaldo?.total_goals || 0) + (ronaldo?.total_assists || 0)
    const messiAssistsPerGame = +((messi?.total_assists || 0) / (messi?.total_games || 1)).toFixed(2)
    const ronaldoAssistsPerGame = +((ronaldo?.total_assists || 0) / (ronaldo?.total_games || 1)).toFixed(2)
    const messiMinutesPerAssist = Math.round((messi?.total_minutes || 1) / (messi?.total_assists || 1))
    const ronaldoMinutesPerAssist = Math.round((ronaldo?.total_minutes || 1) / (ronaldo?.total_assists || 1))

    const getTeamBreakdown = (matches: any[]) => {
      const map: Record<string, number> = {}
      matches.forEach(m => { const t = m.team || "Unknown"; map[t] = (map[t] || 0) + (m.assists || 0) })
      return Object.entries(map).map(([team, assists]) => ({ team, assists })).sort((a, b) => b.assists - a.assists).slice(0, 6)
    }

    return {
      props: {
        messi, ronaldo, messiIntlAssists, ronaldoIntlAssists, messiUclAssists, ronaldoUclAssists,
        messiClubAssists, ronaldoClubAssists, messiAssistsInWins, ronaldoAssistsInWins,
        messiAssistsInDraws, ronaldoAssistsInDraws, messiAssistsInLosses, ronaldoAssistsInLosses,
        messiHomeAssists, ronaldoHomeAssists, messiAwayAssists, ronaldoAwayAssists,
        messiStarterAssists, ronaldoStarterAssists, messiSuperSubAssists, ronaldoSuperSubAssists,
        messiMultiAssistMatches, ronaldoMultiAssistMatches, messiHatTrickAssists, ronaldoHatTrickAssists,
        messiTeamBreakdown: getTeamBreakdown(messiMatches),
        ronaldoTeamBreakdown: getTeamBreakdown(ronaldoMatches),
        messiGoalContributions, ronaldoGoalContributions,
        messiAssistsPerGame, ronaldoAssistsPerGame,
        messiMinutesPerAssist, ronaldoMinutesPerAssist,
      },
    }
  } catch (e) {
    return {
      props: {
        messi: null, ronaldo: null, messiIntlAssists: 0, ronaldoIntlAssists: 0, messiUclAssists: 0, ronaldoUclAssists: 0,
        messiClubAssists: 0, ronaldoClubAssists: 0, messiAssistsInWins: 0, ronaldoAssistsInWins: 0,
        messiAssistsInDraws: 0, ronaldoAssistsInDraws: 0, messiAssistsInLosses: 0, ronaldoAssistsInLosses: 0,
        messiHomeAssists: 0, ronaldoHomeAssists: 0, messiAwayAssists: 0, ronaldoAwayAssists: 0,
        messiStarterAssists: 0, ronaldoStarterAssists: 0, messiSuperSubAssists: 0, ronaldoSuperSubAssists: 0,
        messiMultiAssistMatches: 0, ronaldoMultiAssistMatches: 0, messiHatTrickAssists: 0, ronaldoHatTrickAssists: 0,
        messiTeamBreakdown: [], ronaldoTeamBreakdown: [], messiGoalContributions: 0, ronaldoGoalContributions: 0,
        messiAssistsPerGame: 0, ronaldoAssistsPerGame: 0, messiMinutesPerAssist: 0, ronaldoMinutesPerAssist: 0,
      },
    }
  }
}