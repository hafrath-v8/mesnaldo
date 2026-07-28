// pages/index.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { CareerStats, Match } from "../types"
import { GetStaticProps } from "next"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"
import { PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from "recharts"

const RadarChart = dynamic(() => import("recharts").then(mod => mod.RadarChart), { ssr: false })
import { Trophy, Award } from "lucide-react"


interface ScopeStats { goals: number; assists: number; apps: number }
interface ScopeEntry { key: string; label: string; messi: ScopeStats; ronaldo: ScopeStats; cardType: "full" | "goalsOnly" }
interface HomeProps { 
  messi: CareerStats | null
  ronaldo: CareerStats | null
  scopes: ScopeEntry[]
  messiRecent: Match[]
  ronaldoRecent: Match[]
  recentBlogs: any[]
}

const TROPHIES = { messi: { total: 48, league: 13, ucl: 4, wc: 1, cont: 2 }, ronaldo: { total: 37, league: 8, ucl: 5, wc: 0, cont: 1 } }
const BALLON = { messi: { total: 8, top2: 13, top3: 14, nom: 16 }, ronaldo: { total: 5, top2: 11, top3: 12, nom: 18 } }

const INT = new Set(["World Cup Qualifier","International Friendly","Copa America","World Cup","Finalissima","UEFA Euros","Euros Qualifier","Nations League","Confederations Cup"])
const USA_SAUDI = new Set(["MLS","MLS Cup","Leagues Cup","Champions Cup","US Open Cup","Saudi Pro League","Saudi King Cup","Saudi Super Cup","AFC Champions League","AFC Champions League 2","Arab Club Champions Cup"])
const LEAGUE = new Set(["La Liga","MLS","Ligue 1","Premier League","Saudi Pro League","Serie A","Primeira Liga"])
const UCL = new Set(["Champs League","Champions League"])
const WC = new Set(["World Cup"])

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl transition-all duration-300 hover:border-gray-600/70 hover:bg-gray-900/90"

function calcFull(rows: Match[]): ScopeStats {
  return { goals: rows.reduce((s,r)=>s+(r.goals||0),0), assists: rows.reduce((s,r)=>s+(r.assists||0),0), apps: rows.length }
}
function calcGoals(rows: Match[]): ScopeStats {
  return { goals: rows.reduce((s,r)=>s+(r.goals||0),0), assists: 0, apps: rows.length }
}

function buildScopes(mr: Match[], rr: Match[]): ScopeEntry[] {
  return [
    {key:"all", label:"All Time Career", messi:calcFull(mr), ronaldo:calcFull(rr), cardType:"full"},
    {key:"allNoUSA", label:"All Time Career (Excl. USA/Saudi)", messi:calcFull(mr.filter(r=>!USA_SAUDI.has(r.competition||""))), ronaldo:calcFull(rr.filter(r=>!USA_SAUDI.has(r.competition||""))), cardType:"full"},
    {key:"club", label:"All Time Club", messi:calcFull(mr.filter(r=>!INT.has(r.competition||""))), ronaldo:calcFull(rr.filter(r=>!INT.has(r.competition||""))), cardType:"full"},
    {key:"clubNoUSA", label:"All Time Club (Excl. USA/Saudi)", messi:calcFull(mr.filter(r=>!INT.has(r.competition||"")&&!USA_SAUDI.has(r.competition||""))), ronaldo:calcFull(rr.filter(r=>!INT.has(r.competition||"")&&!USA_SAUDI.has(r.competition||""))), cardType:"full"},
    {key:"league", label:"All Time League", messi:calcFull(mr.filter(r=>LEAGUE.has(r.competition||""))), ronaldo:calcFull(rr.filter(r=>LEAGUE.has(r.competition||""))), cardType:"full"},
    {key:"ucl", label:"All Time UEFA Champions League", messi:calcFull(mr.filter(r=>UCL.has(r.competition||""))), ronaldo:calcFull(rr.filter(r=>UCL.has(r.competition||""))), cardType:"full"},
    {key:"intl", label:"All Time Internationals", messi:calcFull(mr.filter(r=>INT.has(r.competition||""))), ronaldo:calcFull(rr.filter(r=>INT.has(r.competition||""))), cardType:"full"},
    {key:"wc", label:"World Cup", messi:calcGoals(mr.filter(r=>WC.has(r.competition||""))), ronaldo:calcGoals(rr.filter(r=>WC.has(r.competition||""))), cardType:"goalsOnly"},
  ]
}

function CardWrapper({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
      className={`relative w-full overflow-hidden ${CARD_BASE} p-5 sm:p-7 lg:p-8`}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-70" />
      {children}
    </motion.div>
  )
}

function FullCard({ label, messi, ronaldo, index }: { label: string; messi: ScopeStats; ronaldo: ScopeStats; index: number }) {
  if (messi.apps === 0 && ronaldo.apps === 0) return null
  const mGoalEff = messi.apps > 0 ? (messi.goals / messi.apps) * 100 : 0
  const mAssistEff = messi.apps > 0 ? (messi.assists / messi.apps) * 100 : 0
  const rGoalEff = ronaldo.apps > 0 ? (ronaldo.goals / ronaldo.apps) * 100 : 0
  const rAssistEff = ronaldo.apps > 0 ? (ronaldo.assists / ronaldo.apps) * 100 : 0
  const mTotal = mGoalEff + mAssistEff
  const rTotal = rGoalEff + rAssistEff
  const winner = mTotal >= rTotal ? "Messi" : "Ronaldo"
  const maxTotal = Math.max(mTotal, rTotal, 1)

  return (
    <CardWrapper index={index}>
      <div className="text-center mb-5 sm:mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">{label}</h2>
        <p className="text-[11px] sm:text-xs lg:text-sm text-gray-400">Goals + Assists per appearance</p>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 p-3 sm:p-4 bg-gray-800/60 rounded-xl border border-gray-700/50">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-amber-400/30">
          <Image src={winner === "Messi" ? "/images/messi.webp" : "/images/ronaldo.webp"} alt={winner} fill className="object-cover" />
        </div>
        <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-amber-400">Highest: <span className="font-semibold text-amber-300">{winner}</span> ({maxTotal.toFixed(1)}%)</span>
      </div>
      <div className="space-y-5 sm:space-y-6">
        {[
          { name: "Messi", img: "/images/messi.webp", goals: messi.goals, assists: messi.assists, apps: messi.apps, goalEff: mGoalEff, assistEff: mAssistEff, total: mTotal, gc: "bg-blue-500", ac: "bg-blue-700 " },
          { name: "Ronaldo", img: "/images/ronaldo.webp", goals: ronaldo.goals, assists: ronaldo.assists, apps: ronaldo.apps, goalEff: rGoalEff, assistEff: rAssistEff, total: rTotal, gc: "bg-red-500", ac: "bg-red-700" },
        ].map((p) => (
          <div key={p.name} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <span className="text-sm sm:text-base font-medium text-white truncate">{p.name}</span>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-white shrink-0">{p.total.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-5 sm:h-6 relative overflow-hidden border border-gray-700/30">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.goalEff}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }} className={`${p.gc} h-full absolute top-0 left-0 rounded-full`} />
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.assistEff}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 + 0.4 }} className={`${p.ac} h-full absolute top-0 left-0 rounded-full`} />
            </div>
            <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-[10px] sm:text-xs text-gray-400">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-1"><span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${p.gc}`} />{p.goals.toLocaleString()} goals</span>
                <span className="flex items-center gap-1"><span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${p.ac}`} />{p.assists.toLocaleString()} assists</span>
              </div>
              <span>{p.apps.toLocaleString()} apps</span>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  )
}

function GoalsOnlyCard({ label, messi, ronaldo, index }: { label: string; messi: ScopeStats; ronaldo: ScopeStats; index: number }) {
  if (messi.apps === 0 && ronaldo.apps === 0) return null
  const mGoalEff = messi.apps > 0 ? (messi.goals / messi.apps) * 100 : 0
  const rGoalEff = ronaldo.apps > 0 ? (ronaldo.goals / ronaldo.apps) * 100 : 0
  const winner = messi.goals >= ronaldo.goals ? "Messi" : "Ronaldo"
  const maxGoals = Math.max(messi.goals, ronaldo.goals, 1)
  const barMax = Math.max(mGoalEff, rGoalEff, 1) * 1.15

  return (
    <CardWrapper index={index}>
      <div className="text-center mb-5 sm:mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">{label}</h2>
        <p className="text-[11px] sm:text-xs lg:text-sm text-gray-400">Goals per appearance</p>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 p-3 sm:p-4 bg-gray-800/60 rounded-xl border border-gray-700/50">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-amber-400/30">
          <Image src={winner === "Messi" ? "/images/messi.webp" : "/images/ronaldo.webp"} alt={winner} fill className="object-cover" />
        </div>
        <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-amber-400">Most goals: <span className="font-semibold text-amber-300">{winner}</span> ({maxGoals.toLocaleString()})</span>
      </div>
      <div className="space-y-5 sm:space-y-6">
        {[
          { name: "Messi", img: "/images/messi.webp", goals: messi.goals, apps: messi.apps, goalEff: mGoalEff, gc: "bg-blue-500" },
          { name: "Ronaldo", img: "/images/ronaldo.webp", goals: ronaldo.goals, apps: ronaldo.apps, goalEff: rGoalEff, gc: "bg-red-500" },
        ].map((p) => (
          <div key={p.name} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <span className="text-sm sm:text-base font-medium text-white truncate">{p.name}</span>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-white shrink-0">{p.goalEff.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-5 sm:h-6 relative overflow-hidden border border-gray-700/30">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(p.goalEff / barMax) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }} className={`${p.gc} h-full absolute top-0 left-0 rounded-full`} />
            </div>
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${p.gc}`} />{p.goals.toLocaleString()} goals</span>
              <span>{p.apps.toLocaleString()} apps</span>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-8 sm:mb-10 lg:mb-14">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2">{subtitle}</p>}
    </div>
  )
}

async function fetchAllMatches(playerId: number) {
  const pageSize = 1000
  let allRows: any[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("matches").select("*").eq("player_id", playerId)
      .range(from, from + pageSize - 1).order("id", { ascending: true })
    if (error || !data || data.length === 0) break
    allRows = allRows.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return allRows
}

export default function Home({ messi, ronaldo, scopes, messiRecent, ronaldoRecent, recentBlogs }: HomeProps) {
  if (!messi || !ronaldo) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  const scopeCards = scopes.slice(0, 8)
  const messiAge = new Date().getFullYear() - 1987
  const ronaldoAge = new Date().getFullYear() - 1985

  const radarRaw = [
    { stat: "Goals", ronaldo: ronaldo.total_goals, messi: messi.total_goals },
    { stat: "Assists", ronaldo: ronaldo.total_assists, messi: messi.total_assists },
    { stat: "Games", ronaldo: ronaldo.total_games, messi: messi.total_games },
    { stat: "Wins", ronaldo: ronaldo.total_wins, messi: messi.total_wins },
    { stat: "Trophies", ronaldo: TROPHIES.ronaldo.total, messi: TROPHIES.messi.total },
    { stat: "Left Foot", ronaldo: ronaldo.left_foot_goals, messi: messi.left_foot_goals },
    { stat: "Right Foot", ronaldo: ronaldo.right_foot_goals, messi: messi.right_foot_goals },
    { stat: "Headers", ronaldo: ronaldo.header_goals, messi: messi.header_goals },
    { stat: "Free Kicks", ronaldo: ronaldo.free_kick_goals, messi: messi.free_kick_goals },
    { stat: "Penalties", ronaldo: ronaldo.penalties_scored, messi: messi.penalties_scored },
  ]
  const radarData = radarRaw.map(r => { const mx = Math.max(r.ronaldo, r.messi) || 1; return { ...r, ronaldo: +((r.ronaldo / mx) * 100).toFixed(1), messi: +((r.messi / mx) * 100).toFixed(1) } })
  const ronaldoAvg = (radarData.reduce((s, r) => s + r.ronaldo, 0) / radarData.length).toFixed(1)
  const messiAvg = (radarData.reduce((s, r) => s + r.messi, 0) / radarData.length).toFixed(1)

  const imgV = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }
  const statV = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.4 } } }
const vsV = { hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.6, type: "spring" as const } } }  
const pulseV = { pulse: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1], transition: { duration: 2, repeat: Infinity } } }

  const quickLinks = [
    { href: "/goals", label: "Goals" },
    { href: "/head-to-head", label: "H2H" },
    { href: "/trophies", label: "Trophies" },
    { href: "/career", label: "Career" },
    { href: "/messi", label: "Messi" },
    { href: "/ronaldo", label: "Ronaldo" },
    { href: "/records", label: "Records" },
    { href: "/poll", label: "Vote" },
  ]

  return (
    <Layout>
      <h1 className="sr-only">Lionel Messi vs Cristiano Ronaldo - Ultimate Career Comparison, Goals, Stats & Records</h1>
      <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900/95 to-black border-b border-gray-800/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(239,68,68,0.15),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(245,158,11,0.08),transparent_50%)]" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 z-10">
          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-10 sm:mb-14">
            <motion.div className="relative flex-shrink-0 group" initial="hidden" animate="visible" variants={imgV} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="absolute -inset-3 bg-red-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div className="bg-red-500 w-3 h-3 sm:w-4 sm:h-4 absolute -top-1.5 -right-1.5 rounded-full z-10 ring-2 ring-gray-900 shadow-lg shadow-red-500/50" variants={pulseV} animate="pulse" />
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-red-500/20 transition-all duration-300 group-hover:border-red-500/60 group-hover:shadow-red-500/30">
<Image src="/images/ronaldo.webp" alt="Ronaldo" width={288} height={288} sizes="(max-width: 768px) 50vw, 288px" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" priority />              </div>
            </motion.div>
            <motion.div className="flex flex-col items-center flex-shrink-0 px-2 sm:px-4" initial="hidden" animate="visible" variants={vsV}>
              <span className="relative text-3xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">VS</span>
            </motion.div>
            <motion.div className="relative shrink-0 group" initial="hidden" animate="visible" variants={imgV} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="absolute -inset-3 bg-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div className="bg-blue-500 w-3 h-3 sm:w-4 sm:h-4 absolute -top-1.5 -right-1.5 rounded-full z-10 ring-2 ring-gray-900 shadow-lg shadow-blue-500/50" variants={pulseV} animate="pulse" />
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-500/20 transition-all duration-300 group-hover:border-blue-500/60 group-hover:shadow-blue-500/30">
<Image src="/images/messi.webp" alt="Messi" width={288} height={288} sizes="(max-width: 768px) 50vw, 288px" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" priority />              </div>
            </motion.div>
          </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-4 max-w-2xl mx-auto place-items-center">            
  <motion.div className="text-center space-y-1.5" initial="hidden" animate="visible" variants={statV}>
    <h2 className="font-bold text-white text-sm sm:text-xl lg:text-2xl">Cristiano Ronaldo</h2>
    <p className="text-gray-400 text-xs sm:text-sm">{ronaldoAge} years</p>
    <p className="text-gray-500 text-xs sm:text-sm">🇵🇹 Portugal · Al Nassr</p>
  </motion.div>
  <div className="hidden sm:flex items-center justify-center">
    <div className="text-center space-y-1.5">
      <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Player</p>
      <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Age</p>
      <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Nation</p>
    </div>
  </div>
  <motion.div className="text-center space-y-1.5" initial="hidden" animate="visible" variants={statV}>
    <h2 className="font-bold text-white text-sm sm:text-xl lg:text-2xl">Lionel Messi</h2>
    <p className="text-gray-400 text-xs sm:text-sm">{messiAge} years</p>
    <p className="text-gray-500 text-xs sm:text-sm">🇦🇷 Argentina · Inter Miami</p>
  </motion.div>
</div>
        </div>
      </section>

      <div className="w-full bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12 sm:space-y-16 lg:space-y-20">

          {/* Existing sections unchanged */}
          <section>
            <SectionHeading title="Player Comparison" subtitle="Normalized across key career metrics" />
            <div className={`${CARD_BASE} p-5 sm:p-6 lg:p-8`}>
              <div className="h-72 sm:h-80 md:h-96 max-w-xl mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="#1f2937" strokeWidth={0.5} />
                    <PolarAngleAxis dataKey="stat" tick={{ fill: "#6b7280", fontSize: 11, fontWeight: 500 }} tickLine={false} />
                    <Radar name="Ronaldo" dataKey="ronaldo" stroke="#EF4444" fill="#EF4444" fillOpacity={0.12} strokeWidth={1.5} />
                    <Radar name="Messi" dataKey="messi" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.12} strokeWidth={1.5} />
                    <Legend wrapperStyle={{ paddingTop: "24px" }} iconType="circle" iconSize={8} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mt-6">
                <div className="text-center p-3 bg-red-500/10 rounded-xl border border-red-500/20"><p className="text-xl font-black text-red-400">{ronaldoAvg}</p><p className="text-[10px] text-gray-400 mt-1">Ronaldo Avg</p></div>
                <div className="text-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20"><p className="text-xl font-black text-blue-400">{messiAvg}</p><p className="text-[10px] text-gray-400 mt-1">Messi Avg</p></div>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading title="Performance Breakdown" subtitle="Filtered by competition scope" />
            {scopeCards.length === 0 ? (
              <div className={`${CARD_BASE} p-8 sm:p-10 text-center`}><p className="text-gray-400">Loading scope data...</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                {scopeCards.map((s, i) => s.cardType === "goalsOnly" ? <GoalsOnlyCard key={s.key} label={s.label} messi={s.messi} ronaldo={s.ronaldo} index={i} /> : <FullCard key={s.key} label={s.label} messi={s.messi} ronaldo={s.ronaldo} index={i} />)}
              </div>
            )}
          </section>

          <section>
            <SectionHeading title="Last 10 Matches" subtitle="Recent performances" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {[{ name: "Messi", matches: messiRecent || [], color: "blue", img: "/images/messi.webp" }, { name: "Ronaldo", matches: ronaldoRecent || [], color: "red", img: "/images/ronaldo.webp" }].map(({ name, matches, color, img }) => (
                <div key={name} className={`${CARD_BASE} p-5 sm:p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600"><Image src={img} alt={name} fill className="object-cover" /></div>
                    <h3 className={`text-lg font-bold ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{name}</h3>
                  </div>
                  <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                    {(!matches || matches.length === 0) ? <p className="text-gray-500 text-sm text-center py-8">No recent matches</p> :
                      matches.slice(0, 10).map((m, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 text-xs sm:text-sm py-2.5 px-3 rounded-lg hover:bg-gray-800/40">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${m.result === "W" ? "bg-emerald-500/20 text-emerald-400" : m.result === "D" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>{m.result || "?"}</span>
                            <div className="min-w-0"><p className="text-gray-200 truncate">vs {m.opponent || "?"}</p><p className="text-[10px] text-gray-500 truncate">{m.competition || ""}</p></div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {m.goals > 0 && <span className="text-emerald-400 font-bold text-xs">⚽{m.goals}</span>}
                            {m.assists > 0 && <span className="text-blue-400 font-bold text-xs">🅰{m.assists}</span>}
                            <p className="font-mono font-bold text-white text-xs">{m.team_score || 0}-{m.opponent_score || 0}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading title="Awards & Honours" subtitle="Silverware and individual accolades" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className={`${CARD_BASE} p-6 sm:p-7 lg:p-8`}>
<h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" />Career Trophies</h3>                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-500/5 rounded-xl p-4 text-center border border-blue-500/10"><p className="text-xs text-gray-500 mb-1">Messi</p><p className="text-3xl font-black text-blue-400">{TROPHIES.messi.total}</p></div>
                  <div className="bg-red-500/5 rounded-xl p-4 text-center border border-red-500/10"><p className="text-xs text-gray-500 mb-1">Ronaldo</p><p className="text-3xl font-black text-red-400">{TROPHIES.ronaldo.total}</p></div>
                </div>
                <div className="space-y-2">
                  {[{ label: "League Titles", m: TROPHIES.messi.league, r: TROPHIES.ronaldo.league },{ label: "Champions League", m: TROPHIES.messi.ucl, r: TROPHIES.ronaldo.ucl },{ label: "World Cup", m: TROPHIES.messi.wc, r: TROPHIES.ronaldo.wc },{ label: "Continental Cup", m: TROPHIES.messi.cont, r: TROPHIES.ronaldo.cont }].map((row, i) => (
                    <div key={i} className="flex items-center gap-3"><span className="text-sm text-gray-400 flex-1">{row.label}</span><span className={`text-sm font-bold ${row.m > row.r ? "text-blue-400" : "text-gray-500"}`}>{row.m}</span><span className="text-gray-700 text-xs">|</span><span className={`text-sm font-bold ${row.r > row.m ? "text-red-400" : "text-gray-500"}`}>{row.r}</span></div>
                  ))}
                </div>
              </div>
              <div className={`${CARD_BASE} p-6 sm:p-7 lg:p-8`}>
<h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><Award className="w-5 h-5 text-amber-400" />Ballon d&apos;Or</h3>                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-500/5 rounded-xl p-4 text-center border border-blue-500/10"><p className="text-xs text-gray-500 mb-1">Messi</p><p className="text-3xl font-black text-blue-400">{BALLON.messi.total}</p></div>
                  <div className="bg-red-500/5 rounded-xl p-4 text-center border border-red-500/10"><p className="text-xs text-gray-500 mb-1">Ronaldo</p><p className="text-3xl font-black text-red-400">{BALLON.ronaldo.total}</p></div>
                </div>
                <div className="space-y-2">
                  {[{ label: "Runner-Up", m: BALLON.messi.top2, r: BALLON.ronaldo.top2 },{ label: "Top 3", m: BALLON.messi.top3, r: BALLON.ronaldo.top3 },{ label: "Nominations", m: BALLON.messi.nom, r: BALLON.ronaldo.nom }].map((row, i) => (
                    <div key={i} className="flex items-center gap-3"><span className="text-sm text-gray-400 flex-1">{row.label}</span><span className={`text-sm font-bold ${row.m > row.r ? "text-blue-400" : "text-gray-500"}`}>{row.m}</span><span className="text-gray-700 text-xs">|</span><span className={`text-sm font-bold ${row.r > row.m ? "text-red-400" : "text-gray-500"}`}>{row.r}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── RECENT BLOG POSTS (NEW SECTION) ─── */}
          {recentBlogs && recentBlogs.length > 0 && (
            <section>
              <SectionHeading title="Latest Articles" subtitle="From the Mesnaldo Blog" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {recentBlogs.map((post: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden hover:border-gray-600/70 transition-all duration-300 h-full flex flex-col">
                        {post.featured_image && (
                          <div className="relative h-40 bg-gray-800 overflow-hidden">
                            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
                            <span className="text-amber-400 font-bold">{post.category}</span>
                            <span>·</span>
                            <span>{post.read_time} min read</span>
                          </div>
                          <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                          <div className="mt-3 pt-3 border-t border-gray-800/50">
                            <span className="text-[10px] text-gray-600">
                              {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                  View All Articles →
                </Link>
              </div>
            </section>
          )}

          <section>
            <SectionHeading title="Explore More" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="px-5 py-2.5 text-sm text-gray-400 bg-gray-900 border border-gray-800 rounded-full transition-all duration-300 hover:text-white hover:border-gray-600 hover:bg-gray-800/50">
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()

    const messiAll = await fetchAllMatches(1)
    const ronaldoAll = await fetchAllMatches(2)

    let scopes: ScopeEntry[] = []
    if (messiAll.length > 0 && ronaldoAll.length > 0) {
      scopes = buildScopes(messiAll as Match[], ronaldoAll as Match[])
    }

    const messiRecent = messiAll.slice(-10).reverse()
    const ronaldoRecent = ronaldoAll.slice(-10).reverse()

    // Fetch recent blog posts
    const { data: recentBlogs } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, category, featured_image, published_at, read_time")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3)

    if (scopes.length === 0 && messi && ronaldo) {
      scopes = [
        {key:"all", label:"All Time Career", messi:{goals:messi.total_goals, assists:messi.total_assists, apps:messi.total_games}, ronaldo:{goals:ronaldo.total_goals, assists:ronaldo.total_assists, apps:ronaldo.total_games}, cardType:"full"},
        {key:"club", label:"All Time Club", messi:{goals:807, assists:361, apps:964}, ronaldo:{goals:846, assists:231, apps:1127}, cardType:"full"},
        {key:"league", label:"All Time League", messi:{goals:520, assists:220, apps:680}, ronaldo:{goals:560, assists:160, apps:750}, cardType:"full"},
        {key:"ucl", label:"UEFA Champions League", messi:{goals:129, assists:45, apps:163}, ronaldo:{goals:145, assists:42, apps:187}, cardType:"full"},
        {key:"intl", label:"Internationals", messi:{goals:112, assists:55, apps:198}, ronaldo:{goals:130, assists:30, apps:203}, cardType:"full"},
        {key:"wc", label:"World Cup", messi:{goals:13, assists:8, apps:26}, ronaldo:{goals:8, assists:2, apps:22}, cardType:"goalsOnly"},
      ]
    }

    return { 
      props: JSON.parse(JSON.stringify({ 
        messi, ronaldo, scopes, messiRecent, ronaldoRecent, 
        recentBlogs: recentBlogs || [] 
      })), 
      revalidate: 3600 
    }
  } catch (e) {
    console.error("Error:", e)
    return { props: { messi: null, ronaldo: null, scopes: [], messiRecent: [], ronaldoRecent: [], recentBlogs: [] }, revalidate: 60 }
  }
}