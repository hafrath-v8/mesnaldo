// pages/trophies.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetStaticProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { Trophy, Star, Globe, Award, Medal, Users, Crown } from "lucide-react"

interface TrophiesPageProps {
  messi: any
  ronaldo: any
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

const TROPHY_DATA = [
  { icon: Trophy, label: "League Titles", messi: 13, ronaldo: 8 },
  { icon: Star, label: "Champions League", messi: 4, ronaldo: 5 },
  { icon: Globe, label: "Club World Cup", messi: 3, ronaldo: 4 },
  { icon: Award, label: "Domestic Cup", messi: 7, ronaldo: 6 },
  { icon: Medal, label: "Super Cup", messi: 11, ronaldo: 8 },
  { icon: Globe, label: "World Cup", messi: 1, ronaldo: 0 },
  { icon: Star, label: "Continental", messi: 2, ronaldo: 1 },
  { icon: Users, label: "Other Intl.", messi: 1, ronaldo: 1 },
]

export default function Trophies({ messi, ronaldo }: TrophiesPageProps) {
  if (!messi || !ronaldo) {
    return (
      <Layout title="Trophies">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  const messiTotal = TROPHY_DATA.reduce((s, t) => s + t.messi, 0)
  const ronaldoTotal = TROPHY_DATA.reduce((s, t) => s + t.ronaldo, 0)
  const messiWins = TROPHY_DATA.filter(t => t.messi > t.ronaldo).length
  const ronaldoWins = TROPHY_DATA.filter(t => t.ronaldo > t.messi).length

  return (
<Layout 
  title="Trophies Comparison - Messi vs Ronaldo" 
  description="Messi vs Ronaldo trophy comparison: 48 vs 37 trophies. Compare La Liga, Champions League, World Cup, and every title won.">      
  <div className="bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-16 sm:space-y-20">

          {/* ─── HEADER ─── */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">Silverware</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Trophies & <span className="text-amber-400">Awards</span>
            </h1>
          </div>

          {/* ─── SCOREBOARD ─── */}
          <div className={`${CARD_BASE} p-6 sm:p-8 lg:p-10`}>
            <div className="grid grid-cols-3 items-center">
              {/* Messi */}
              <div className="text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-3">
                  <Image src="/images/messi.png" alt="Messi" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Lionel Messi</p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-400">{messiTotal}</p>
                <p className="text-[10px] text-gray-600 mt-1">trophies</p>
              </div>

              {/* VS */}
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-amber-400/80">VS</p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-xs text-blue-400 font-bold">{messiWins} won</span>
                  <span className="text-[10px] text-gray-700">•</span>
                  <span className="text-xs text-red-400 font-bold">{ronaldoWins} won</span>
                </div>
              </div>

              {/* Ronaldo */}
              <div className="text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-3">
                  <Image src="/images/ronaldo.png" alt="Ronaldo" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Cristiano Ronaldo</p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-400">{ronaldoTotal}</p>
                <p className="text-[10px] text-gray-600 mt-1">trophies</p>
              </div>
            </div>

            {/* Difference bar */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] text-gray-600 w-12 text-right">Messi</span>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(messiTotal / (messiTotal + ronaldoTotal)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500 rounded-full" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(ronaldoTotal / (messiTotal + ronaldoTotal)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-red-500 rounded-full" />
              </div>
              <span className="text-[10px] text-gray-600 w-12 text-left">Ronaldo</span>
            </div>
          </div>

          {/* ─── TROPHY LIST ─── */}
          <section>
            <SectionHeading title="Trophy Cabinet" subtitle="Head to head comparison" />
            <div className="space-y-2">
              {TROPHY_DATA.map((item, i) => {
                const total = item.messi + item.ronaldo
                const messiPct = (item.messi / (total || 1)) * 100
                const ronaldoPct = (item.ronaldo / (total || 1)) * 100
                const TrophyIcon = item.icon

                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-gray-800/20 transition-colors group">
                    
                    {/* Label */}
                    <div className="w-40 sm:w-48 flex items-center gap-2 flex-shrink-0">
                      <TrophyIcon className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </div>

                    {/* Bar */}
                    <div className="flex-1 flex items-center gap-2">
                      <span className={`text-xs font-bold w-8 text-right ${item.messi > item.ronaldo ? "text-blue-400" : "text-gray-500"}`}>{item.messi}</span>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${messiPct}%` }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                          className="h-full bg-blue-500 rounded-full" />
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${ronaldoPct}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                          className="h-full bg-red-500 rounded-full" />
                      </div>
                      <span className={`text-xs font-bold w-8 ${item.ronaldo > item.messi ? "text-red-400" : "text-gray-500"}`}>{item.ronaldo}</span>
                    </div>

                    {/* Winner indicator */}
                    <div className="w-20 text-right flex-shrink-0">
                      {item.messi > item.ronaldo ? (
                        <span className="text-[10px] text-blue-400 font-medium">Messi +{item.messi - item.ronaldo}</span>
                      ) : item.ronaldo > item.messi ? (
                        <span className="text-[10px] text-red-400 font-medium">Ronaldo +{item.ronaldo - item.messi}</span>
                      ) : (
                        <span className="text-[10px] text-gray-600">Tied</span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* ─── BALLON D'OR ─── */}
          <section>
            <SectionHeading title="Ballon d'Or" subtitle="The ultimate individual prize" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <div className={`${CARD_BASE} p-6 text-center`}>
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(8)].map((_, i) => <Crown key={i} className="w-5 h-5 text-amber-400" />)}
                </div>
                <p className="text-4xl font-black text-blue-400">8</p>
                <p className="text-xs text-gray-500 mt-1">Lionel Messi</p>
                <p className="text-[10px] text-gray-600 mt-2">2009, 2010, 2011, 2012</p>
                <p className="text-[10px] text-gray-600">2015, 2019, 2021, 2023</p>
              </div>
              <div className={`${CARD_BASE} p-6 text-center`}>
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Crown key={i} className="w-5 h-5 text-amber-400" />)}
                </div>
                <p className="text-4xl font-black text-red-400">5</p>
                <p className="text-xs text-gray-500 mt-1">Cristiano Ronaldo</p>
                <p className="text-[10px] text-gray-600 mt-2">2008, 2013, 2014</p>
                <p className="text-[10px] text-gray-600">2016, 2017</p>
              </div>
            </div>
          </section>

          {/* ─── SUMMARY ROW ─── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { label: "Messi Total", value: messiTotal, color: "text-blue-400" },
              { label: "Ronaldo Total", value: ronaldoTotal, color: "text-red-400" },
              { label: "Messi Ballon d'Or", value: 8, color: "text-blue-400" },
              { label: "Ronaldo Ballon d'Or", value: 5, color: "text-red-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    return { props: { messi: messi || null, ronaldo: ronaldo || null }, revalidate: 3600 }
  } catch (e) {
    return { props: { messi: null, ronaldo: null }, revalidate: 60 }
  }
}