import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { Trophy, Target, Zap, Shield, Star, Award, TrendingUp, Goal, Timer } from "lucide-react"

interface DetailedStatsProps {
  stats: any[]
}

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"

export default function DetailedStats({ stats }: DetailedStatsProps) {
  // Group stats by name
  const groupedStats: Record<string, any[]> = {}
  stats.forEach(s => {
    if (!groupedStats[s.stat_name]) groupedStats[s.stat_name] = []
    groupedStats[s.stat_name].push(s)
  })

  const iconMap: Record<string, any> = {
    hat_tricks: Trophy,
    key_passes: Target,
    successful_dribbles: Zap,
    aerial_duels_won: Shield,
    average_rating: Star,
    man_of_the_match: Award,
    total_shots: Goal,
    xg: TrendingUp,
    big_chances_created: Target,
    throughballs: Zap,
    non_penalty_goals: Goal,
  }

  return (
    <Layout 
      title="Messi vs Ronaldo Detailed Stats - Complete Breakdown"
      description="Compare detailed stats between Messi and Ronaldo: hat tricks, key passes, dribbles, xG, aerial duels, match ratings, Man of the Match awards, and more."
    >
      <div className="bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Detailed Stats</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Messi vs Ronaldo <span className="text-amber-400">Detailed Stats</span>
            </h1>
            <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">
              Compare advanced performance metrics including hat tricks, key passes, dribbles, xG, and more.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="space-y-4">
            {Object.entries(groupedStats).map(([statName, statItems], index) => {
              const messiStat = statItems.find(s => s.player_id === 1)
              const ronaldoStat = statItems.find(s => s.player_id === 2)
              if (!messiStat || !ronaldoStat) return null
              
              const Icon = iconMap[statName] || Star
              const messiWins = messiStat.stat_value > ronaldoStat.stat_value
              const ronaldoWins = ronaldoStat.stat_value > messiStat.stat_value

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className={`${CARD_BASE} p-5 sm:p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <h2 className="text-base font-bold text-white">{messiStat.stat_label}</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Messi */}
                    <div className={`bg-blue-500/5 rounded-xl p-4 border ${messiWins ? 'border-blue-500/30' : 'border-blue-500/10'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-500/30 flex-shrink-0">
                          <Image src="/images/messi.webp" alt="" width={24} height={24} />
                        </div>
                        <p className="text-xs font-bold text-blue-400">Messi</p>
                        {messiWins && <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full ml-auto">Better</span>}
                      </div>
                      <p className="text-xl font-black text-white">
                        {messiStat.stat_value.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{messiStat.stat_label}</p>
                      {messiStat.stat_frequency && (
                        <p className="text-[10px] text-gray-600 mt-0.5">{messiStat.stat_frequency}</p>
                      )}
                      {messiStat.stat_percentage && (
                        <p className="text-[10px] text-gray-600 mt-0.5">{messiStat.stat_percentage}</p>
                      )}
                    </div>

                    {/* Ronaldo */}
                    <div className={`bg-red-500/5 rounded-xl p-4 border ${ronaldoWins ? 'border-red-500/30' : 'border-red-500/10'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-red-500/30 flex-shrink-0">
                          <Image src="/images/ronaldo.webp" alt="" width={24} height={24} />
                        </div>
                        <p className="text-xs font-bold text-red-400">Ronaldo</p>
                        {ronaldoWins && <span className="text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full ml-auto">Better</span>}
                      </div>
                      <p className="text-xl font-black text-white">
                        {ronaldoStat.stat_value.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{ronaldoStat.stat_label}</p>
                      {ronaldoStat.stat_frequency && (
                        <p className="text-[10px] text-gray-600 mt-0.5">{ronaldoStat.stat_frequency}</p>
                      )}
                      {ronaldoStat.stat_percentage && (
                        <p className="text-[10px] text-gray-600 mt-0.5">{ronaldoStat.stat_percentage}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: stats } = await supabase
    .from("detailed_stats")
    .select("*")
    .order("stat_name", { ascending: true })

  return {
    props: {
      stats: stats || [],
    },
  }
}