// pages/who-is-best.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Trophy, Star, Award, TrendingUp, Target, Timer, Footprints, ArrowRight, Crown, Goal, Crosshair, Shield, Zap, Users, Swords, Clock, TrendingDown, BarChart3, Globe } from "lucide-react"
interface ComparisonProps {
  messi: any
  ronaldo: any
}

function safeNum(val: any): number { return typeof val === 'number' ? val : 0 }

export default function WhoIsBest({ messi, ronaldo }: ComparisonProps) {
  const [activeEra, setActiveEra] = useState<string>("all")

  if (!messi || !ronaldo) {
    return (
      <Layout title="Who is the Best? Messi vs Ronaldo">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  // Core stats
  const mG = safeNum(messi.total_goals)
  const rG = safeNum(ronaldo.total_goals)
  const mA = safeNum(messi.total_assists)
  const rA = safeNum(ronaldo.total_assists)
  const mGames = safeNum(messi.total_games) || 1
  const rGames = safeNum(ronaldo.total_games) || 1
  const mMins = safeNum(messi.total_minutes) || 1
  const rMins = safeNum(ronaldo.total_minutes) || 1
  const mWins = safeNum(messi.total_wins)
  const rWins = safeNum(ronaldo.total_wins)
  const mDraws = safeNum(messi.total_draws)
  const rDraws = safeNum(ronaldo.total_draws)
  const mLosses = safeNum(messi.total_losses)
  const rLosses = safeNum(ronaldo.total_losses)
  const mPenS = safeNum(messi.penalties_scored)
  const rPenS = safeNum(ronaldo.penalties_scored)
  const mPenM = safeNum(messi.penalties_missed)
  const rPenM = safeNum(ronaldo.penalties_missed)
  const mFK = safeNum(messi.free_kick_goals)
  const rFK = safeNum(ronaldo.free_kick_goals)
  const mLeft = safeNum(messi.left_foot_goals)
  const rLeft = safeNum(ronaldo.left_foot_goals)
  const mRight = safeNum(messi.right_foot_goals)
  const rRight = safeNum(ronaldo.right_foot_goals)
  const mHead = safeNum(messi.header_goals)
  const rHead = safeNum(ronaldo.header_goals)
  const mInside = safeNum(messi.inside_box_goals)
  const rInside = safeNum(ronaldo.inside_box_goals)
  const mOutside = safeNum(messi.outside_box_goals)
  const rOutside = safeNum(ronaldo.outside_box_goals)

  const mPenConv = ((mPenS / (mPenS + mPenM || 1)) * 100).toFixed(1)
  const rPenConv = ((rPenS / (rPenS + rPenM || 1)) * 100).toFixed(1)
  const mWinRate = ((mWins / mGames) * 100).toFixed(1)
  const rWinRate = ((rWins / rGames) * 100).toFixed(1)

  const categories = [
    {
      title: "Goalscoring",
      icon: Goal,
      messiMain: `${mG.toLocaleString()} goals`,
      ronaldoMain: `${rG.toLocaleString()} goals`,
      messiSub: `${(mG / mGames).toFixed(2)} per game`,
      ronaldoSub: `${(rG / rGames).toFixed(2)} per game`,
      messiDetail: `Goal every ${Math.round(mMins / mG)} mins`,
      ronaldoDetail: `Goal every ${Math.round(rMins / rG)} mins`,
      bar1: (mG / rG) * 100,
      bar2: 100,
      verdictText: "Ronaldo is the highest-scoring footballer in history, sitting on 976 career goals. Messi answers with the better rate: 0.79 goals a game against Ronaldo's 0.73, and he finds the net once every 104 minutes compared to Ronaldo's 111. Volume favors Ronaldo, efficiency favors Messi — this is the tightest call on the board.",
      messiWins: false, ronaldoWins: true,
    },
    {
      title: "Assists & Creation",
      icon: TrendingUp,
      messiMain: `${mA.toLocaleString()} assists`,
      ronaldoMain: `${rA.toLocaleString()} assists`,
      messiSub: `${(mA / mGames).toFixed(2)} per game`,
      ronaldoSub: `${(rA / rGames).toFixed(2)} per game`,
      messiDetail: `${(mG + mA).toLocaleString()} goal contributions`,
      ronaldoDetail: `${(rG + rA).toLocaleString()} goal contributions`,
      bar1: 100,
      bar2: (rA / mA) * 100,
      verdictText: "Messi's 157-assist lead (418 to 261) is the widest gap of any category here, and combined goal contributions still favor him by exactly 100. It comes down to role: Messi drops deep and dictates play before the final pass, while Ronaldo's game has always been built around getting on the end of one.",
      messiWins: true, ronaldoWins: false,
    },
    {
      title: "Champions League",
      icon: Star,
      messiMain: "4 titles • 129 goals",
      ronaldoMain: "5 titles • 140 goals",
      messiSub: "40 assists in 163 games",
      ronaldoSub: "41 assists in 183 games",
      messiDetail: "6x top scorer award",
      ronaldoDetail: "7x top scorer award (record)",
      bar1: (4 / 5) * 100,
      bar2: 100,
      verdictText: "This is Ronaldo's competition. Five titles, including the Real Madrid three-peat, an all-time top-scorer record of 140 goals, and the record for most goals in a single campaign (17). Messi's four titles and 129 goals would headline anyone else's career — they just sit second here.",
      messiWins: false, ronaldoWins: true,
    },
    {
      title: "International Glory",
      icon: Trophy,
      messiMain: "World Cup • 2x Copa América",
      ronaldoMain: "Euros • 2x Nations League",
      messiSub: "125 goals • 65 assists",
      ronaldoSub: "146 goals • 37 assists",
      messiDetail: "4x Best Player at major tournaments",
      ronaldoDetail: "All-time international top scorer",
      bar1: 100,
      bar2: 50,
      verdictText: "A World Cup changes how a career is remembered, and Messi's 2022 run — capped by two goals in arguably the greatest final ever played — settled the one debate he hadn't won. He now holds six international trophies to Ronaldo's three. Ronaldo scores more for his country, but the World Cup tips this one to Messi.",
      messiWins: true, ronaldoWins: false,
    },
    {
      title: "Ballon d'Or & Individual Awards",
      icon: Award,
      messiMain: "8 Ballon d'Or • 8 FIFA Best",
      ronaldoMain: "5 Ballon d'Or • 5 FIFA Best",
      messiSub: "6 Golden Shoes • 14 top-3 finishes",
      ronaldoSub: "4 Golden Shoes • 12 top-3 finishes",
      messiDetail: "Most Ballon d'Or wins in history",
      ronaldoDetail: "Most nominations in history (18)",
      bar1: 100,
      bar2: (5 / 8) * 100,
      verdictText: "Eight Ballon d'Or wins is a record that may stand for good — Messi has been named the world's best player more often than anyone in the award's history. Ronaldo's five would be the benchmark in almost any other era; between 2008 and 2023 the two of them combined to win 13 of 15 editions.",
      messiWins: true, ronaldoWins: false,
    },
    {
      title: "Penalty Expertise",
      icon: Crosshair,
      messiMain: `${mPenS} scored • ${mPenM} missed`,
      ronaldoMain: `${rPenS} scored • ${rPenM} missed`,
      messiSub: `${mPenConv}% conversion rate`,
      ronaldoSub: `${rPenConv}% conversion rate`,
      messiDetail: `Takes fewer penalties overall`,
      ronaldoDetail: `184 scored — elite volume and consistency`,
      bar1: (parseFloat(mPenConv) / parseFloat(rPenConv)) * 100,
      bar2: 100,
      verdictText: `Ronaldo has both taken and converted more penalties (184 to 114) and does so at a slightly higher rate — ${rPenConv}% against Messi's ${mPenConv}%. He's stepped up in Champions League knockouts and shootouts alike. On volume and nerve from the spot, this one goes to Ronaldo.`,
      messiWins: false, ronaldoWins: true,
    },
    {
      title: "Free Kick Mastery",
      icon: Zap,
      messiMain: `${mFK} free kick goals`,
      ronaldoMain: `${rFK} free kick goals`,
      messiSub: "Elite conversion rate since 2017",
      ronaldoSub: "Knuckleball technique defined an era",
      messiDetail: "23 FK goals from 2017-2019 alone",
      ronaldoDetail: "21 FK goals from 2009-2011 alone",
      bar1: 100,
      bar2: (rFK / mFK) * 100,
      verdictText: "Messi has quietly overtaken Ronaldo on career free kicks, 72 to 65, after reinventing his technique in the back half of his career — he's now arguably the most feared dead-ball threat in the world. Ronaldo owned this category earlier on with his knuckleball strike, but the numbers have shifted.",
      messiWins: true, ronaldoWins: false,
    },
    {
      title: "Aerial Dominance",
      icon: Shield,
      messiMain: `${mHead} headed goals`,
      ronaldoMain: `${rHead} headed goals`,
      messiSub: `${((mHead / mG) * 100).toFixed(1)}% of total goals`,
      ronaldoSub: `${((rHead / rG) * 100).toFixed(1)}% of total goals`,
      messiDetail: "Impressive positioning at 1.70m",
      ronaldoDetail: "Unmatched leap and timing at 1.87m",
      bar1: (mHead / rHead) * 100,
      bar2: 100,
      verdictText: "The most lopsided category on this page. Ronaldo has scored more than 150 headers to Messi's 30-odd, built on a combination of height, timing, and hang time that few defenders in the world could match. There's no real argument to be made for Messi here.",
      messiWins: false, ronaldoWins: true,
    },
    {
      title: "Foot Variety",
      icon: Footprints,
      messiMain: `Left: ${mLeft.toLocaleString()} • Right: ${mRight.toLocaleString()}`,
      ronaldoMain: `Left: ${rLeft.toLocaleString()} • Right: ${rRight.toLocaleString()}`,
      messiSub: `${((mRight / mG) * 100).toFixed(1)}% with weaker foot`,
      ronaldoSub: `${((rLeft / rG) * 100).toFixed(1)}% with weaker foot`,
      messiDetail: "Legendary left foot — 772+ goals",
      ronaldoDetail: "Powerful right foot — 631+ goals",
      bar1: 100,
      bar2: 100,
      verdictText: "Messi's left foot might be the single most devastating individual weapon the sport has produced. Ronaldo, by contrast, is the more genuinely two-footed of the pair, scoring a higher share of his goals with his weaker side. Two different kinds of mastery — call it even.",
      messiWins: false, ronaldoWins: false,
    },
    {
      title: "Long-Range Shooting",
      icon: Target,
      messiMain: `${mOutside.toLocaleString()} outside box`,
      ronaldoMain: `${rOutside.toLocaleString()} outside box`,
      messiSub: `${((mOutside / mG) * 100).toFixed(1)}% of total goals`,
      ronaldoSub: `${((rOutside / rG) * 100).toFixed(1)}% of total goals`,
      messiDetail: "Curls into corners with precision",
      ronaldoDetail: "Powerful long-range drives",
      bar1: 100,
      bar2: 100,
      verdictText: "Both have made a habit of scoring the kind of goal that ends up in every highlight reel — Messi's curled finishes into the top corner, Ronaldo's driven strikes hit with real power. Their long-range numbers land close enough together that neither can really claim this one.",
      messiWins: false, ronaldoWins: false,
    },
    {
      title: "Win Rate & Consistency",
      icon: BarChart3,
      messiMain: `${mWins.toLocaleString()} wins in ${mGames.toLocaleString()} games`,
      ronaldoMain: `${rWins.toLocaleString()} wins in ${rGames.toLocaleString()} games`,
      messiSub: `${mWinRate}% win rate`,
      ronaldoSub: `${rWinRate}% win rate`,
      messiDetail: `${mDraws.toLocaleString()} draws • ${mLosses.toLocaleString()} losses`,
      ronaldoDetail: `${rDraws.toLocaleString()} draws • ${rLosses.toLocaleString()} losses`,
      bar1: (parseFloat(mWinRate) / parseFloat(rWinRate)) * 100,
      bar2: 100,
      verdictText: `Messi's ${mWinRate}% career win rate edges out Ronaldo's ${rWinRate}%. Both have spent nearly two decades at clubs built to win, which keeps their overall records close, but Messi has fewer losses (${mLosses.toLocaleString()} to ${rLosses.toLocaleString()}) despite a shorter career in terms of total games.`,
      messiWins: true, ronaldoWins: false,
    },
    {
      title: "League Versatility",
      icon: Globe,
      messiMain: "3 countries • 13 league titles",
      ronaldoMain: "4 countries • 8 league titles",
      messiSub: "La Liga, Ligue 1, MLS",
      ronaldoSub: "Premier League, La Liga, Serie A, Saudi",
      messiDetail: "Dominated La Liga for over a decade",
      ronaldoDetail: "Only player to win league in 4 top nations",
      bar1: 100,
      bar2: 100,
      verdictText: "Messi has more league titles overall (13 to 8) and spent over a decade running La Liga almost single-handedly. Ronaldo is the only player of his generation to win a top-flight title in four different countries, a genuinely rare kind of adaptability. Depth versus breadth — it's a wash.",
      messiWins: false, ronaldoWins: false,
    },
    {
      title: "Overall Trophies",
      icon: Crown,
      messiMain: "48 trophies",
      ronaldoMain: "37 trophies",
      messiSub: "World Cup • 4x UCL • 13 leagues",
      ronaldoSub: "Euros • 5x UCL • 8 leagues",
      messiDetail: "Most decorated in football history",
      ronaldoDetail: "Most UCL titles in modern era",
      bar1: 100,
      bar2: (37 / 48) * 100,
      verdictText: "Messi's cabinet is 11 trophies deeper, and the World Cup is the piece that tips it — it's the one prize that tends to settle arguments about legacy more than any other. Ronaldo has the edge in Champions Leagues, but across a full career, Messi's collection is the largest the sport has seen.",
      messiWins: true, ronaldoWins: false,
    },
  ]

  const messiWins = categories.filter(c => c.messiWins).length
  const ronaldoWins = categories.filter(c => c.ronaldoWins).length
  const tied = categories.filter(c => !c.messiWins && !c.ronaldoWins).length

  return (
    <Layout
      title="Messi vs Ronaldo: Who Is Better? 13 Categories Compared"
      description="Messi or Ronaldo — who's actually better? We break it down across 13 categories: goals, assists, Champions League, World Cups, Ballon d'Or, penalties, free kicks, headers, and more, using real career numbers."
    >
      <div className="bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12">

          {/* Header */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">The Ultimate Debate</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Who is the <span className="text-amber-400">Best</span>?
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Lionel Messi and Cristiano Ronaldo have been compared, argued over, and put on posters against each other for the better part of two decades, and there's still no clean answer. So instead of picking a side, we broke the argument into 13 categories — goals, assists, Champions League pedigree, international trophies, individual awards, penalties, free kicks, headers, and more — and let the numbers do the talking. Where you land is up to you.
            </p>
          </div>

          {/* Scoreboard */}
          <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-amber-400 to-red-500" />
            <div className="grid grid-cols-3 items-center text-center">
              <div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-3">
                  <Image src="/images/messi.webp" alt="Lionel Messi" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Messi leads in</p>
                <p className="text-2xl sm:text-3xl font-black text-blue-400">{messiWins}</p>
                <p className="text-[10px] text-gray-600">of {categories.length} categories</p>
              </div>
              <div>
                <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mx-auto" />
                <p className="text-lg sm:text-xl font-black text-white mt-2">VS</p>
              </div>
              <div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-3">
                  <Image src="/images/ronaldo.webp" alt="Cristiano Ronaldo" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Ronaldo leads in</p>
                <p className="text-2xl sm:text-3xl font-black text-red-400">{ronaldoWins}</p>
                <p className="text-[10px] text-gray-600">of {categories.length} categories</p>
              </div>
            </div>
            {tied > 0 && (
              <p className="text-center text-xs text-gray-500 mt-4">{tied} {tied === 1 ? 'category is' : 'categories are'} too close to call</p>
            )}
          </div>

          {/* Category Cards */}
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6 hover:border-gray-600/70 transition-colors"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <cat.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{cat.title}</h2>
                  <div className="ml-auto flex items-center gap-2">
                    {cat.messiWins && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-medium">Messi</span>}
                    {cat.ronaldoWins && <span className="text-[10px] bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full font-medium">Ronaldo</span>}
                    {!cat.messiWins && !cat.ronaldoWins && <span className="text-[10px] bg-gray-500/10 text-gray-400 px-2.5 py-1 rounded-full font-medium">Tie</span>}
                  </div>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Image src="/images/messi.webp" alt="" width={20} height={20} className="rounded-full" />
                      <p className="text-xs font-bold text-blue-400">Messi</p>
                    </div>
                    <p className="text-sm font-bold text-white">{cat.messiMain}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{cat.messiSub}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{cat.messiDetail}</p>
                  </div>
                  <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Image src="/images/ronaldo.webp" alt="" width={20} height={20} className="rounded-full" />
                      <p className="text-xs font-bold text-red-400">Ronaldo</p>
                    </div>
                    <p className="text-sm font-bold text-white">{cat.ronaldoMain}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{cat.ronaldoSub}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{cat.ronaldoDetail}</p>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(cat.bar1 / (cat.bar1 + cat.bar2)) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(cat.bar2 / (cat.bar1 + cat.bar2)) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-red-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Verdict */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{cat.verdictText}</p>
              </motion.div>
            ))}
          </div>

          {/* Final Verdict */}
          <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-8 sm:p-10 text-center">
            <Crown className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-black text-white mb-3">The Final Verdict</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto mb-2">
              Messi comes out ahead in <strong className="text-blue-400">{messiWins} categories</strong>. Ronaldo takes <strong className="text-red-400">{ronaldoWins}</strong>. {tied} {tied === 1 ? 'is' : 'are'} genuinely too close to split.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto mb-6">
              There's no tidy answer here, and honestly, that's the point. Messi is the more complete all-round footballer — a passer, a dribbler, and a finisher wrapped into one player who makes everyone around him better. Ronaldo is the purest goalscoring machine the game has produced, a player who has won titles in four different countries and set records that might never fall. Neither case cancels the other out. The real takeaway isn't who wins the argument — it's that we got to watch both of them play at the same time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/poll" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-bold hover:bg-amber-500/20 transition-colors">
                Cast Your Vote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/goals" className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                Compare Goals
              </Link>
              <Link href="/trophies" className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                Compare Trophies
              </Link>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 pt-10 border-t border-gray-800/50">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Messi vs Ronaldo: Breaking Down the GOAT Debate</h2>
              <div className="space-y-4 text-sm text-gray-400 leading-7">
                <p>
                  Ask ten football fans <strong className="text-white">who's better, Messi or Ronaldo</strong>, and you'll get ten different answers backed by ten different arguments. Both players have passed 900 career goals, cleaned out every trophy a club or country can offer, and racked up individual honors that used to be considered once-in-a-generation events — twice, in the same generation. Rather than settle it with an opinion, this page runs the comparison across 13 categories using each player's actual career numbers, so you can weigh it up for yourself.
                </p>
                <p>
                  <strong className="text-white">Lionel Messi</strong> is football's most decorated individual player, with 8 Ballon d'Or wins and a World Cup title that closed out the last gap in his résumé. His 919 goals paired with 418 assists tell the story of a player who spent as much time creating for others as he did scoring himself — a rare combination at this level of output.
                </p>
                <p>
                  <strong className="text-white">Cristiano Ronaldo</strong> holds the record for most goals scored by any player in the sport's history, at 976. Add five Champions League titles and league championships won in four separate countries, and you're looking at a level of longevity and adaptability that very few careers, in any sport, can match.
                </p>
                <p>
                  Want to go deeper on a specific angle? Check the <Link href="/goals" className="text-amber-400 hover:underline">full goals breakdown</Link>, the <Link href="/trophies" className="text-amber-400 hover:underline">trophy-by-trophy comparison</Link>, a look at <Link href="/honours" className="text-amber-400 hover:underline">100+ individual awards</Link>, or the record of <Link href="/head-to-head" className="text-amber-400 hover:underline">all 36 times they've played against each other</Link>. Then, once you've seen it all, <Link href="/poll" className="text-amber-400 hover:underline">cast your vote</Link> and add your name to the debate.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    return { props: { messi: messi || {}, ronaldo: ronaldo || {} } }
  } catch (e) {
    return { props: { messi: {}, ronaldo: {} } }
  }
}