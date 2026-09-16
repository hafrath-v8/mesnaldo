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

function safeNum(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function getAge(birthDate: string): number {
  const today = new Date()
  const birth = new Date(`${birthDate}T00:00:00`)

  let age = today.getFullYear() - birth.getFullYear()

  const birthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate())

  if (!birthdayPassed) age--

  return age
}

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
          <Image src={winner === "Messi" ? "/images/messi.webp" : "/images/ronaldo.webp"} alt={winner} fill sizes="32px" className="object-cover" />
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
                  <Image src={p.img} alt={p.name} fill sizes="36px" className="object-cover" />
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
          <Image src={winner === "Messi" ? "/images/messi.webp" : "/images/ronaldo.webp"} alt={winner} fill sizes="32px" className="object-cover" />
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
                  <Image src={p.img} alt={p.name} fill sizes="36px" className="object-cover" />
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
<Layout
        title="Messi vs Ronaldo: Goals, Assists, Trophies, Records & Career Stats"
        description="Compare Lionel Messi vs Cristiano Ronaldo career stats including goals, assists, appearances, trophies, Champions League, World Cup, international records, recent matches and more."
      >        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div> 
      </Layout>
    )
  }

  const scopeCards = scopes.slice(0, 8)
  const messiAge = getAge("1987-06-24")
  const ronaldoAge = getAge("1985-02-05")

  const radarRaw = [
    { stat: "Goals", ronaldo: safeNum(ronaldo.total_goals), messi: safeNum(messi.total_goals) },
    { stat: "Assists", ronaldo: safeNum(ronaldo.total_assists), messi: safeNum(messi.total_assists) },
    { stat: "Games", ronaldo: safeNum(ronaldo.total_games), messi: safeNum(messi.total_games) },
    { stat: "Wins", ronaldo: safeNum(ronaldo.total_wins), messi: safeNum(messi.total_wins) },
    { stat: "Trophies", ronaldo: TROPHIES.ronaldo.total, messi: TROPHIES.messi.total },
    { stat: "Left Foot", ronaldo: safeNum(ronaldo.left_foot_goals), messi: safeNum(messi.left_foot_goals) },
    { stat: "Right Foot", ronaldo: safeNum(ronaldo.right_foot_goals), messi: safeNum(messi.right_foot_goals) },
    { stat: "Headers", ronaldo: safeNum(ronaldo.header_goals), messi: safeNum(messi.header_goals) },
    { stat: "Free Kicks", ronaldo: safeNum(ronaldo.free_kick_goals), messi: safeNum(messi.free_kick_goals) },
    { stat: "Penalties", ronaldo: safeNum(ronaldo.penalties_scored), messi: safeNum(messi.penalties_scored) },
  ]
  const radarData = radarRaw.map(r => { const mx = Math.max(r.ronaldo, r.messi) || 1; return { ...r, ronaldo: +((r.ronaldo / mx) * 100).toFixed(1), messi: +((r.messi / mx) * 100).toFixed(1) } })
  const ronaldoAvg = (radarData.reduce((s, r) => s + r.ronaldo, 0) / radarData.length).toFixed(1)
  const messiAvg = (radarData.reduce((s, r) => s + r.messi, 0) / radarData.length).toFixed(1)

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
<Layout
      title="Messi vs Ronaldo: Goals, Assists, Trophies, Records & Career Stats"
      description="Compare Lionel Messi vs Cristiano Ronaldo career stats including goals, assists, appearances, trophies, Champions League, World Cup, international records, recent matches and more."
    >    
<h1 className="sr-only">Messi vs Ronaldo: Who is Better? Complete Stats, Records & Career Comparison</h1>
      <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900/95 to-black border-b border-gray-800/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(239,68,68,0.15),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(245,158,11,0.08),transparent_50%)]" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 z-10">
          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-10 sm:mb-14">
            <div className="relative flex-shrink-0 group">
              <div className="absolute -inset-3 bg-red-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-red-500 w-3 h-3 sm:w-4 sm:h-4 absolute -top-1.5 -right-1.5 rounded-full z-10 ring-2 ring-gray-900 shadow-lg shadow-red-500/50" />
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-red-500/20 transition-all duration-300 group-hover:border-red-500/60 group-hover:shadow-red-500/30">
                <Image
                  src="/images/ronaldo.webp"
                  alt="Messi vs Ronaldo comparison - Cristiano Ronaldo"
                  width={288}
                  height={288}
                  sizes="(max-width: 639px) 128px, (max-width: 767px) 176px, (max-width: 1023px) 224px, 288px"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 px-2 sm:px-4">
              <span className="relative text-3xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">VS</span>
            </div>
            <div className="relative shrink-0 group">
              <div className="absolute -inset-3 bg-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-blue-500 w-3 h-3 sm:w-4 sm:h-4 absolute -top-1.5 -right-1.5 rounded-full z-10 ring-2 ring-gray-900 shadow-lg shadow-blue-500/50" />
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-500/20 transition-all duration-300 group-hover:border-blue-500/60 group-hover:shadow-blue-500/30">
                <Image
                  src="/images/messi.webp"
                  alt="Messi vs Ronaldo comparison - Lionel Messi"
                  width={288}
                  height={288}
                  sizes="(max-width: 639px) 128px, (max-width: 767px) 176px, (max-width: 1023px) 224px, 288px"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-4 max-w-2xl mx-auto place-items-center">
            <div className="text-center space-y-1.5">
              <h2 className="font-bold text-white text-sm sm:text-xl lg:text-2xl">Cristiano Ronaldo</h2>
              <p className="text-gray-400 text-xs sm:text-sm">{ronaldoAge} years</p>
              <p className="text-gray-500 text-xs sm:text-sm">🇵🇹 Portugal · Al Nassr</p>
            </div>
            <div className="hidden sm:flex items-center justify-center">
              <div className="text-center space-y-1.5">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Player</p>
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Age</p>
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Nation</p>
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <h2 className="font-bold text-white text-sm sm:text-xl lg:text-2xl">Lionel Messi</h2>
              <p className="text-gray-400 text-xs sm:text-sm">{messiAge} years</p>
              <p className="text-gray-500 text-xs sm:text-sm">🇦🇷 Argentina · Inter Miami</p>
            </div>
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
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600"><Image src={img} alt={name} fill sizes="40px" className="object-cover" /></div>
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
                {recentBlogs.map((post: any) => (
                  <div key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden hover:border-gray-600/70 transition-all duration-300 h-full flex flex-col">
                        {post.featured_image && (
                          <div className="relative h-40 bg-gray-800 overflow-hidden">
                            <Image
                              src={post.featured_image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
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
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                  View All Articles →
                </Link>
              </div>
            </section>
          )}
{/* =========================================================
    HOMEPAGE LONG-FORM SEO CONTENT
========================================================= */}

<div className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo: Complete Career Stats, Goals, Assists, Trophies & Records
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <p>
        <strong className="text-white">Lionel Messi vs Cristiano Ronaldo</strong>{" "}
        is a football comparison that has lasted across generations,
        competitions, clubs and countries. For well over a decade, the two
        players competed at the highest level while collecting extraordinary
        numbers in goals, assists, appearances, trophies and individual
        awards. Their rivalry became especially intense during their years in
        Spanish football, but the debate stretches far beyond Barcelona and
        Real Madrid.
      </p>

      <p>
        Mesnaldo is built around one simple idea: make it easier to compare
        the careers of{" "}
        <strong className="text-white">Lionel Messi and Cristiano Ronaldo</strong>{" "}
        without reducing the debate to a single statistic. Goals are
        important, but so are assists, efficiency, Champions League
        performances, international football, World Cup records, trophies,
        individual awards, penalties, free kicks, headers and many other
        parts of an attacking player's career.
      </p>

      <p>
        Instead of presenting one isolated number, this page combines several
        areas of their careers and lets you explore them side by side. The
        statistics shown throughout the site are connected to the underlying
        player and match data, allowing the comparison to reflect the values
        stored in the Mesnaldo database.
      </p>


      {/* =====================================================
          DYNAMIC CAREER OVERVIEW
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Career Stats
      </h3>

      <p>
        Career statistics provide the broadest starting point for comparing
        Messi and Ronaldo. Both players have accumulated enormous totals over
        exceptionally long careers, but the numbers become more meaningful
        when goals, assists and appearances are considered together.
      </p>

      <p>
        According to the current career data on Mesnaldo,{" "}
        <strong className="text-blue-400">Lionel Messi</strong> has{" "}
        <strong className="text-white">
          {messi.total_goals.toLocaleString()} goals
        </strong>{" "}
        and{" "}
        <strong className="text-white">
          {messi.total_assists.toLocaleString()} assists
        </strong>{" "}
        across{" "}
        <strong className="text-white">
          {messi.total_games.toLocaleString()} appearances
        </strong>.
        Cristiano Ronaldo currently has{" "}
        <strong className="text-white">
          {ronaldo.total_goals.toLocaleString()} goals
        </strong>,{" "}
        <strong className="text-white">
          {ronaldo.total_assists.toLocaleString()} assists
        </strong>{" "}
        and{" "}
        <strong className="text-white">
          {ronaldo.total_games.toLocaleString()} appearances
        </strong>.
      </p>

      <p>
        These raw totals already demonstrate the extraordinary longevity of
        both players, but they should not be read as the final answer to the
        Messi vs Ronaldo debate. One player may lead a cumulative category
        because of additional appearances, while another may have a stronger
        goals-per-game or goal-contribution rate. That is why the performance
        sections above also compare output relative to appearances.
      </p>


      {/* =====================================================
          GOAL CONTRIBUTIONS
      ====================================================== */}

      {(() => {
        const messiGA = messi.total_goals + messi.total_assists
        const ronaldoGA = ronaldo.total_goals + ronaldo.total_assists

        const messiRate =
          messi.total_games > 0 ? messiGA / messi.total_games : 0
        const ronaldoRate =
          ronaldo.total_games > 0 ? ronaldoGA / ronaldo.total_games : 0

        return (
          <>
            <h3 className="text-xl font-bold text-white mt-10">
              Messi vs Ronaldo Goals and Assists
            </h3>

            <p>
              Goals and assists together provide a broader measure of direct
              attacking contribution. Messi currently has{" "}
              <strong className="text-blue-400">
                {messiGA.toLocaleString()}
              </strong>{" "}
              combined goals and assists in the career data, while Ronaldo has{" "}
              <strong className="text-red-400">
                {ronaldoGA.toLocaleString()}
              </strong>.
            </p>

            <p>
              Relative to appearances, that represents approximately{" "}
              <strong className="text-blue-400">
                {messiRate.toFixed(2)}
              </strong>{" "}
              goal contributions per match for Messi and{" "}
              <strong className="text-red-400">
                {ronaldoRate.toFixed(2)}
              </strong>{" "}
              for Ronaldo. Comparing both totals and per-game output gives
              more context than simply looking at who has accumulated the
              larger career number.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          GOALS
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Goals: Who Has Scored More?
      </h3>

      <p>
        Goal scoring sits at the centre of the rivalry. Cristiano Ronaldo and
        Lionel Messi have both produced scoring totals that would represent
        several elite careers combined. Their goals have come in domestic
        leagues, continental competitions, domestic cups and international
        football.
      </p>

      {(() => {
        const difference = Math.abs(
          ronaldo.total_goals - messi.total_goals
        )

        const leader =
          messi.total_goals > ronaldo.total_goals
            ? "Messi"
            : ronaldo.total_goals > messi.total_goals
              ? "Ronaldo"
              : null

        return (
          <p>
            The current Mesnaldo career totals show Messi with{" "}
            <strong className="text-blue-400">
              {messi.total_goals.toLocaleString()}
            </strong>{" "}
            goals and Ronaldo with{" "}
            <strong className="text-red-400">
              {ronaldo.total_goals.toLocaleString()}
            </strong>.
            {leader
              ? ` ${leader} currently leads the overall career-goal total by ${difference.toLocaleString()} goals according to the data displayed here.`
              : " The two players are currently level in the overall career-goal total."}
          </p>
        )
      })()}

      <p>
        Total goals tell us who has scored more over the full period covered
        by the database, but scoring efficiency adds another layer. Comparing
        goals per appearance helps account for different numbers of matches,
        while separate sections for league, Champions League and
        international football show where those goals were scored.
      </p>


      {/* =====================================================
          GOALS PER GAME
      ====================================================== */}

      {(() => {
        const mRate =
          messi.total_games > 0
            ? messi.total_goals / messi.total_games
            : 0

        const rRate =
          ronaldo.total_games > 0
            ? ronaldo.total_goals / ronaldo.total_games
            : 0

        return (
          <>
            <h3 className="text-xl font-bold text-white mt-10">
              Messi vs Ronaldo Goals Per Game
            </h3>

            <p>
              Goals per appearance is useful because it measures scoring
              frequency rather than only career volume. Based on the current
              totals, Messi averages approximately{" "}
              <strong className="text-blue-400">
                {mRate.toFixed(3)}
              </strong>{" "}
              goals per appearance, while Ronaldo averages approximately{" "}
              <strong className="text-red-400">
                {rRate.toFixed(3)}
              </strong>.
            </p>

            <p>
              This does not make total goals irrelevant. Career volume and
              per-game efficiency answer different questions. One measures
              how much a player accumulated, while the other describes how
              frequently he scored during the appearances represented in the
              data.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          ASSISTS
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Assists and Playmaking
      </h3>

      {(() => {
        const difference = Math.abs(
          messi.total_assists - ronaldo.total_assists
        )

        return (
          <>
            <p>
              Goal scoring receives most of the attention, but assists are
              essential when comparing complete attacking contribution.
              Messi currently has{" "}
              <strong className="text-blue-400">
                {messi.total_assists.toLocaleString()}
              </strong>{" "}
              assists in the career database compared with Ronaldo's{" "}
              <strong className="text-red-400">
                {ronaldo.total_assists.toLocaleString()}
              </strong>.
              {messi.total_assists !== ronaldo.total_assists &&
                ` The difference between their current totals is ${difference.toLocaleString()} assists.`}
            </p>

            <p>
              Assist numbers are particularly important in this comparison
              because the two players have often occupied different attacking
              roles. Messi has frequently combined finishing with deeper
              creative involvement, while Ronaldo's later career became more
              heavily focused on movement and finishing around the penalty
              area.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          COMPETITION BREAKDOWN
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Comparing Messi and Ronaldo Across Different Competitions
      </h3>

      <p>
        A career total combines performances from very different environments.
        Mesnaldo therefore separates the comparison into multiple competition
        scopes, including all-time career, club football, domestic leagues,
        UEFA Champions League, international football and the FIFA World Cup.
        This makes it possible to study where each player's goals and assists
        were produced rather than treating every competition as identical.
      </p>


      {/* =====================================================
          DYNAMIC SCOPES
      ====================================================== */}

      {scopes
        .filter(
          s =>
            ["club", "league", "ucl", "intl", "wc"].includes(s.key) &&
            (s.messi.apps > 0 || s.ronaldo.apps > 0)
        )
        .map(scope => {

          const mGA = scope.messi.goals + scope.messi.assists
          const rGA = scope.ronaldo.goals + scope.ronaldo.assists

          const mGoalRate =
            scope.messi.apps > 0
              ? scope.messi.goals / scope.messi.apps
              : 0

          const rGoalRate =
            scope.ronaldo.apps > 0
              ? scope.ronaldo.goals / scope.ronaldo.apps
              : 0

          return (
            <div key={`seo-${scope.key}`} className="space-y-3">

              <h4 className="text-lg font-bold text-white">
                Messi vs Ronaldo — {scope.label}
              </h4>

              <p>
                In{" "}
                <strong className="text-white">
                  {scope.label}
                </strong>,
                Messi has recorded{" "}
                <strong className="text-blue-400">
                  {scope.messi.goals.toLocaleString()} goals
                </strong>

                {scope.cardType === "full" && (
                  <>
                    {" "}and{" "}
                    <strong className="text-blue-400">
                      {scope.messi.assists.toLocaleString()} assists
                    </strong>
                  </>
                )}

                {" "}across{" "}
                <strong className="text-white">
                  {scope.messi.apps.toLocaleString()} appearances
                </strong>.
                Ronaldo has{" "}
                <strong className="text-red-400">
                  {scope.ronaldo.goals.toLocaleString()} goals
                </strong>

                {scope.cardType === "full" && (
                  <>
                    {" "}and{" "}
                    <strong className="text-red-400">
                      {scope.ronaldo.assists.toLocaleString()} assists
                    </strong>
                  </>
                )}

                {" "}across{" "}
                <strong className="text-white">
                  {scope.ronaldo.apps.toLocaleString()} appearances
                </strong>.
              </p>

              <p>
                Their current scoring rates in this scope are approximately{" "}
                <strong className="text-blue-400">
                  {mGoalRate.toFixed(3)}
                </strong>{" "}
                goals per match for Messi and{" "}
                <strong className="text-red-400">
                  {rGoalRate.toFixed(3)}
                </strong>{" "}
                for Ronaldo.

                {scope.cardType === "full" &&
                  ` Their combined goal-and-assist totals in this category are ${mGA.toLocaleString()} for Messi and ${rGA.toLocaleString()} for Ronaldo.`}
              </p>

            </div>
          )
        })}


      {/* =====================================================
          CHAMPIONS LEAGUE
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Stats
      </h3>

      <p>
        The UEFA Champions League is one of the most important chapters of
        this rivalry. Both players produced historic performances in European
        competition and were central to teams that regularly reached the
        latter stages of the tournament. Comparing their Champions League
        appearances, goals, assists and trophies gives a more focused view
        than simply using overall career numbers.
      </p>

      <p>
        Ronaldo has won{" "}
        <strong className="text-red-400">
          {TROPHIES.ronaldo.ucl}
        </strong>{" "}
        Champions League titles according to the trophy data used on this
        page, while Messi has won{" "}
        <strong className="text-blue-400">
          {TROPHIES.messi.ucl}
        </strong>.
        Their European careers form one of the strongest arguments for why
        both belong among football's most successful players.
      </p>


      {/* =====================================================
          INTERNATIONAL
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo International Stats
      </h3>

      <p>
        International football adds another major dimension to the debate.
        Messi represents Argentina while Ronaldo represents Portugal, and both
        have spent many years as central figures for their national teams.
        International statistics include World Cup matches, continental
        tournaments, qualifiers, Nations League fixtures and other official
        national-team competitions represented by the database.
      </p>

      <p>
        Club statistics can be influenced by transfer decisions and league
        environments, while international football places players into a
        different tactical setting with fewer matches and less preparation
        time. That makes national-team performance an important independent
        part of the comparison.
      </p>


      {/* =====================================================
          WORLD CUP
      ====================================================== */}

      {(() => {
        const wc = scopes.find(s => s.key === "wc")

        if (!wc) return null

        return (
          <>
            <h3 className="text-xl font-bold text-white mt-10">
              Messi vs Ronaldo World Cup Stats
            </h3>

            <p>
              The FIFA World Cup carries unique importance because players
              receive only a limited number of opportunities to participate
              during their careers. In the World Cup matches included in the
              Mesnaldo database, Messi has{" "}
              <strong className="text-blue-400">
                {wc.messi.goals.toLocaleString()}
              </strong>{" "}
              goals in{" "}
              <strong className="text-white">
                {wc.messi.apps.toLocaleString()}
              </strong>{" "}
              appearances, while Ronaldo has{" "}
              <strong className="text-red-400">
                {wc.ronaldo.goals.toLocaleString()}
              </strong>{" "}
              goals in{" "}
              <strong className="text-white">
                {wc.ronaldo.apps.toLocaleString()}
              </strong>{" "}
              appearances.
            </p>

            <p>
              World Cup statistics represent only one part of their
              international careers, but the tournament's importance means
              performances there have played a major role in how the careers
              of both players are remembered.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          TROPHIES
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Trophies
      </h3>

      <p>
        Individual statistics describe what a player contributes on the
        pitch, while trophies record what his teams ultimately achieved.
        According to the trophy totals currently configured on this page,
        Messi has{" "}
        <strong className="text-blue-400">
          {TROPHIES.messi.total}
        </strong>{" "}
        career trophies and Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHIES.ronaldo.total}
        </strong>.
      </p>

      <p>
        Messi's total currently includes{" "}
        <strong className="text-white">
          {TROPHIES.messi.league} league titles
        </strong>,{" "}
        <strong className="text-white">
          {TROPHIES.messi.ucl} Champions League titles
        </strong>, a World Cup and other major honours represented by the
        site's trophy data. Ronaldo's total includes{" "}
        <strong className="text-white">
          {TROPHIES.ronaldo.league} league titles
        </strong>,{" "}
        <strong className="text-white">
          {TROPHIES.ronaldo.ucl} Champions League titles
        </strong>{" "}
        and his other domestic and international honours.
      </p>

      <p>
        Trophies should also be interpreted differently from individual
        statistics because football is a team sport. A great player can
        influence the probability of winning, but trophies also depend on
        teammates, managers, opposition and the competitive environment.
        They remain an important part of the debate, but they should be read
        alongside individual performance data rather than replacing it.
      </p>


      {/* =====================================================
          BALLON D'OR
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Ballon d&apos;Or Awards
      </h3>

      <p>
        The Ballon d&apos;Or rivalry became one of the defining features of
        the Messi-Ronaldo era. Messi has won{" "}
        <strong className="text-blue-400">
          {BALLON.messi.total}
        </strong>{" "}
        Ballon d&apos;Or awards in the data used by Mesnaldo, while Ronaldo
        has won{" "}
        <strong className="text-red-400">
          {BALLON.ronaldo.total}
        </strong>.
      </p>

      <p>
        The comparison extends beyond victories. Messi has been represented
        in the site's data with{" "}
        <strong className="text-white">
          {BALLON.messi.top2} top-two finishes
        </strong>{" "}
        and{" "}
        <strong className="text-white">
          {BALLON.messi.top3} top-three finishes
        </strong>,
        while Ronaldo has{" "}
        <strong className="text-white">
          {BALLON.ronaldo.top2} top-two finishes
        </strong>{" "}
        and{" "}
        <strong className="text-white">
          {BALLON.ronaldo.top3} top-three finishes
        </strong>.
        Their sustained presence near the top of individual award voting
        illustrates how long both remained among football's elite.
      </p>


      {/* =====================================================
          FOOTED GOALS
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Left Foot, Right Foot and Header Goals
      </h3>

      <p>
        Breaking goals down by body part helps reveal another major stylistic
        difference between Messi and Ronaldo. Messi currently has{" "}
        <strong className="text-blue-400">
          {messi.left_foot_goals.toLocaleString()}
        </strong>{" "}
        left-footed goals and{" "}
        <strong className="text-blue-400">
          {messi.right_foot_goals.toLocaleString()}
        </strong>{" "}
        right-footed goals in the career dataset. Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldo.left_foot_goals.toLocaleString()}
        </strong>{" "}
        with his left foot and{" "}
        <strong className="text-red-400">
          {ronaldo.right_foot_goals.toLocaleString()}
        </strong>{" "}
        with his right.
      </p>

      <p>
        In heading, Messi has{" "}
        <strong className="text-blue-400">
          {messi.header_goals.toLocaleString()}
        </strong>{" "}
        goals compared with Ronaldo's{" "}
        <strong className="text-red-400">
          {ronaldo.header_goals.toLocaleString()}
        </strong>.
        These numbers help explain the contrasting technical and physical
        profiles that have characterized their careers.
      </p>


      {/* =====================================================
          FREE KICKS
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Free Kick Goals
      </h3>

      <p>
        Direct free kicks represent a highly specialized type of scoring.
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messi.free_kick_goals.toLocaleString()}
        </strong>{" "}
        free-kick goals in the Mesnaldo career data, compared with Ronaldo's{" "}
        <strong className="text-red-400">
          {ronaldo.free_kick_goals.toLocaleString()}
        </strong>.
      </p>

      <p>
        Both players became famous for different free-kick techniques during
        their careers. Ronaldo was particularly associated with powerful,
        low-spin attempts during the earlier part of his career, while Messi
        became known for precise curling efforts over and around defensive
        walls. The numerical comparison shows how often those techniques
        ultimately produced goals.
      </p>


      {/* =====================================================
          PENALTIES
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Penalty Goals
      </h3>

      <p>
        Penalties are another important component of the total-goal
        comparison. Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldo.penalties_scored.toLocaleString()}
        </strong>{" "}
        penalties scored in the current career dataset, while Messi has{" "}
        <strong className="text-blue-400">
          {messi.penalties_scored.toLocaleString()}
        </strong>.
      </p>

      <p>
        Penalty totals should not automatically be removed from career
        statistics because penalties remain official goals and require
        execution under pressure. At the same time, comparing penalty and
        non-penalty output separately can provide additional context when
        studying open-play scoring.
      </p>


      {/* =====================================================
          DIFFERENT STYLES
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Two Different Paths to Football Greatness
      </h3>

      <p>
        The most interesting part of the Messi vs Ronaldo comparison is that
        their greatness has never looked identical. Messi's career has often
        combined elite scoring with creative involvement, close control,
        dribbling and passing. Ronaldo's career has featured extraordinary
        scoring volume, explosive movement, aerial ability, two-footed
        finishing and repeated adaptation to different tactical environments.
      </p>

      <p>
        Their roles also changed over time. Ronaldo began as a highly direct
        wide attacker before developing into an increasingly goal-focused
        forward. Messi played wide, centrally and in deeper creative
        positions at different stages of his career. Looking at their entire
        careers therefore means comparing not only two players but also
        several versions of each player.
      </p>


      {/* =====================================================
          LONGEVITY
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Longevity and Career Consistency
      </h3>

      <p>
        Longevity is one of the most remarkable parts of this rivalry.
        Accumulating elite numbers for a few seasons is difficult; maintaining
        world-class production over many years requires adaptation,
        durability and consistency. Both players continued to score and
        contribute after moving away from the clubs most closely associated
        with the peak of their rivalry.
      </p>

      <p>
        Career totals therefore measure more than a player's highest level.
        They also reflect the ability to remain productive across different
        managers, teammates, leagues and stages of physical development.
        This is one reason why appearance totals, efficiency rates and
        competition-specific statistics are all useful when evaluating the
        two careers.
      </p>


      {/* =====================================================
          HEAD TO HEAD
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Head-to-Head
      </h3>

      <p>
        Direct meetings between Messi and Ronaldo form one of the most
        memorable parts of their rivalry. Their most famous encounters came
        during the Barcelona-Real Madrid era, when El Clásico regularly placed
        two of the world's best teams — and two of the world's best players —
        directly against one another.
      </p>

      <p>
        Mesnaldo's dedicated head-to-head section allows fans to look beyond
        general career totals and focus specifically on matches where their
        teams faced each other. Goals, assists, team results and competition
        context can then be considered together rather than relying on memory
        or isolated highlights.
      </p>

      <div className="my-7">
        <Link
          href="/head-to-head"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold transition-colors"
        >
          View the complete Messi vs Ronaldo head-to-head comparison →
        </Link>
      </div>


      {/* =====================================================
          RECORDS
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Records
      </h3>

      <p>
        Both players hold an extraordinary collection of individual,
        club-level and international records. Some relate to total goals,
        others to individual competitions, consecutive scoring runs, awards
        or career milestones. Because records describe different
        achievements, a complete comparison is more useful than simply
        counting how many record headlines each player has.
      </p>

      <p>
        Mesnaldo separates records from the basic career-statistics section
        so that fans can explore them with the appropriate context. This
        helps distinguish a career total from a competition record, an
        individual award from a team trophy, and a longevity achievement from
        a single-season performance.
      </p>

      <div className="my-7">
        <Link
          href="/records"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold transition-colors"
        >
          Explore Messi vs Ronaldo records →
        </Link>
      </div>


      {/* =====================================================
          WHY STATS NEED CONTEXT
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Why Messi vs Ronaldo Statistics Need Context
      </h3>

      <p>
        Statistics are extremely useful, but football numbers should always
        be interpreted carefully. A raw total can be affected by the number
        of games played. An assist depends partly on a teammate converting
        the chance. Trophies depend on the strength of an entire team.
        International competitions occur less frequently than domestic
        leagues, and players do not necessarily occupy the same tactical role
        throughout their careers.
      </p>

      <p>
        This is why Mesnaldo presents multiple views of the rivalry. Career
        totals can be compared with per-game efficiency. Club numbers can be
        separated from international numbers. Champions League performance
        can be viewed independently from domestic leagues, while individual
        achievements can be studied separately from team trophies.
      </p>

      <p>
        The objective is not to manipulate statistics until one player wins
        every argument. The goal is to make the differences visible so fans
        can understand what each number actually represents.
      </p>


      {/* =====================================================
          WHO IS BETTER
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi or Ronaldo: Who Is Better?
      </h3>

      <p>
        The answer depends heavily on what a supporter values most. Someone
        who places greater weight on creative involvement, assisting,
        dribbling and all-round attacking participation may interpret the
        numbers differently from someone who prioritizes scoring volume,
        aerial ability, Champions League achievements or longevity.
      </p>

      <p>
        Statistics can make the debate more informed, but they cannot decide
        every football question automatically. Tactical responsibility,
        quality of opposition, teammates, era, competition and individual
        preference all influence how supporters interpret greatness.
      </p>

      <p>
        That is why the Messi vs Ronaldo debate continues even after thousands
        of matches and an enormous collection of records. The two careers
        offer different arguments for greatness, and the strongest comparison
        is one that examines those differences rather than pretending they do
        not exist.
      </p>


      {/* =====================================================
          POLL
      ====================================================== */}

      <h3 className="text-xl font-bold text-white mt-10">
        Vote in the Messi vs Ronaldo GOAT Poll
      </h3>

      <p>
        Statistics provide evidence, but football supporters will always have
        their own interpretation of the GOAT debate. Mesnaldo therefore also
        includes a community poll where visitors can choose between Lionel
        Messi and Cristiano Ronaldo and compare the current vote results.
      </p>

      <div className="my-7">
        <Link
          href="/poll"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold transition-colors"
        >
          Vote in the Messi vs Ronaldo GOAT poll →
        </Link>
      </div>


      {/* =====================================================
          FAQ
      ====================================================== */}

      <h2 className="text-2xl font-black text-white mt-14">
        Frequently Asked Questions About Messi vs Ronaldo
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more career goals, Messi or Ronaldo?
      </h3>

      <p>
        According to the current Mesnaldo career data, Messi has{" "}
        <strong className="text-blue-400">
          {messi.total_goals.toLocaleString()}
        </strong>{" "}
        goals and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldo.total_goals.toLocaleString()}
        </strong>.
        These figures are displayed dynamically from the career data used by
        the site.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more assists, Messi or Ronaldo?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messi.total_assists.toLocaleString()}
        </strong>{" "}
        career assists in the Mesnaldo dataset compared with Ronaldo's{" "}
        <strong className="text-red-400">
          {ronaldo.total_assists.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has won more Ballon d&apos;Or awards?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {BALLON.messi.total}
        </strong>{" "}
        Ballon d&apos;Or awards in the current comparison, while Ronaldo has{" "}
        <strong className="text-red-400">
          {BALLON.ronaldo.total}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Champions League titles?
      </h3>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHIES.ronaldo.ucl}
        </strong>{" "}
        Champions League titles in the trophy data used here, while Messi has{" "}
        <strong className="text-blue-400">
          {TROPHIES.messi.ucl}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more trophies, Messi or Ronaldo?
      </h3>

      <p>
        The current trophy totals on this page list Messi with{" "}
        <strong className="text-blue-400">
          {TROPHIES.messi.total}
        </strong>{" "}
        and Ronaldo with{" "}
        <strong className="text-red-400">
          {TROPHIES.ronaldo.total}
        </strong>.
        Trophy definitions can vary between statistical sources, so the
        comparison should use a consistent methodology for both players.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has scored more free kicks?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messi.free_kick_goals.toLocaleString()}
        </strong>{" "}
        free-kick goals in the site's career data, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldo.free_kick_goals.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has scored more penalties?
      </h3>

      <p>
        The current database lists Ronaldo with{" "}
        <strong className="text-red-400">
          {ronaldo.penalties_scored.toLocaleString()}
        </strong>{" "}
        penalties scored and Messi with{" "}
        <strong className="text-blue-400">
          {messi.penalties_scored.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has scored more headers?
      </h3>

      <p>
        Ronaldo currently has{" "}
        <strong className="text-red-400">
          {ronaldo.header_goals.toLocaleString()}
        </strong>{" "}
        headed goals in the Mesnaldo career data compared with Messi's{" "}
        <strong className="text-blue-400">
          {messi.header_goals.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Are Messi vs Ronaldo statistics updated?
      </h3>

      <p>
        The homepage statistics are generated from the player and match data
        fetched by the site. When those underlying database values are
        updated and the page regenerates, the dynamic numbers displayed in
        this section reflect the current stored data.
      </p>


      {/* =====================================================
          CONCLUSION
      ====================================================== */}

      <h2 className="text-2xl font-black text-white mt-14">
        The Complete Messi vs Ronaldo Comparison
      </h2>

      <p>
        Lionel Messi and Cristiano Ronaldo have built careers so large that
        comparing them through one statistic will always leave out important
        information. Career goals tell one story. Assists tell another.
        Champions League performance, international football, World Cups,
        trophies, Ballon d&apos;Or awards, free kicks, penalties, headers and
        scoring efficiency each add another part of the picture.
      </p>

      <p>
        Mesnaldo brings those different areas together so football fans can
        move beyond isolated social-media statistics and examine the rivalry
        category by category. The numbers above are not intended to tell fans
        what they must believe. They provide the information needed to make a
        more informed comparison.
      </p>

      <p>
        Whether you are researching{" "}
        <strong className="text-white">Messi vs Ronaldo goals</strong>,
        comparing{" "}
        <strong className="text-white">Messi vs Ronaldo assists</strong>,
        checking Champions League records, studying World Cup performances,
        comparing trophies or deciding who deserves the GOAT title, the rest
        of Mesnaldo provides dedicated pages for exploring each part of their
        careers in greater detail.
      </p>

    </div>
  </div>
</div>
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
    const { data: messi, error: messiError } = await supabase
      .from("career_stats")
      .select("*")
      .eq("player_id", 1)
      .maybeSingle()

    const { data: ronaldo, error: ronaldoError } = await supabase
      .from("career_stats")
      .select("*")
      .eq("player_id", 2)
      .maybeSingle()

    if (messiError) console.error("Messi career stats error:", messiError)
    if (ronaldoError) console.error("Ronaldo career stats error:", ronaldoError)

    const messiAll = await fetchAllMatches(1)
    const ronaldoAll = await fetchAllMatches(2)

    let scopes: ScopeEntry[] = []
    if (messiAll.length > 0 && ronaldoAll.length > 0) {
      scopes = buildScopes(messiAll as Match[], ronaldoAll as Match[])
    }

    const messiRecent = messiAll.slice(-10).reverse()
    const ronaldoRecent = ronaldoAll.slice(-10).reverse()

    // Fetch recent blog posts
    const { data: recentBlogs, error: blogError } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, category, featured_image, published_at, read_time")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3)

    if (blogError) {
      console.error("Homepage blog fetch error:", blogError)
    }

    if (scopes.length === 0 && messi && ronaldo) {
      // If match-level data is temporarily unavailable, do not invent
      // competition-specific figures. Show only the career totals that
      // actually came from career_stats.
      scopes = [
        {
          key: "all",
          label: "All Time Career",
          messi: {
            goals: safeNum(messi.total_goals),
            assists: safeNum(messi.total_assists),
            apps: safeNum(messi.total_games),
          },
          ronaldo: {
            goals: safeNum(ronaldo.total_goals),
            assists: safeNum(ronaldo.total_assists),
            apps: safeNum(ronaldo.total_games),
          },
          cardType: "full",
        },
      ]
    }

    return { 
      props: JSON.parse(JSON.stringify({ 
        messi, ronaldo, scopes, messiRecent, ronaldoRecent, 
        recentBlogs: recentBlogs || [] 
      })), 
      revalidate: 60
    }
  } catch (e) {
    console.error("Error:", e)
    return { props: { messi: null, ronaldo: null, scopes: [], messiRecent: [], ronaldoRecent: [], recentBlogs: [] }, revalidate: 60 }
  }
}