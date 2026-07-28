// pages/poll.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Crown, Goal, Trophy, Award, Crosshair } from "lucide-react"
interface PollPageProps {
  messiVotes: number
  ronaldoVotes: number
}

export default function Poll({ messiVotes, ronaldoVotes }: PollPageProps) {
  const [voted, setVoted] = useState<string | null>(null)
  const [messiCount, setMessiCount] = useState(messiVotes)
  const [ronaldoCount, setRonaldoCount] = useState(ronaldoVotes)
  const [showResults, setShowResults] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [animateBars, setAnimateBars] = useState(false)

  useEffect(() => {
    const storedVote = localStorage.getItem("goat-poll-vote")
    if (storedVote) {
      setHasVoted(true)
      setVoted(storedVote)
      setShowResults(true)
      setTimeout(() => setAnimateBars(true), 300)
    }
  }, [])

  const totalVotes = messiCount + ronaldoCount
  const messiPercent = totalVotes > 0 ? ((messiCount / totalVotes) * 100).toFixed(1) : "50.0"
  const ronaldoPercent = totalVotes > 0 ? ((ronaldoCount / totalVotes) * 100).toFixed(1) : "50.0"
  const diff = Math.abs(messiCount - ronaldoCount)
  const winner = messiCount > ronaldoCount ? "messi" : ronaldoCount > messiCount ? "ronaldo" : "tie"

  const handleVote = async (player: string) => {
    if (hasVoted) return
    try {
      if (player === "messi") {
        await supabase.from("poll_votes").insert({ player: "messi" })
        setMessiCount(prev => prev + 1)
      } else {
        await supabase.from("poll_votes").insert({ player: "ronaldo" })
        setRonaldoCount(prev => prev + 1)
      }
      setVoted(player)
      setHasVoted(true)
      setShowResults(true)
      localStorage.setItem("goat-poll-vote", player)
      setTimeout(() => setAnimateBars(true), 300)
    } catch (error) {
      console.error("Vote error:", error)
    }
  }

  const handleReset = () => {
    localStorage.removeItem("goat-poll-vote")
    setHasVoted(false)
    setVoted(null)
    setShowResults(false)
    setAnimateBars(false)
  }

  return (
<Layout 
  title="GOAT Poll - Messi vs Ronaldo" 
  description="Vote for who is the GOAT: Messi or Ronaldo. See live poll results and join thousands of fans in football's greatest debate.">    
    <div className="bg-black min-h-screen">
        
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_50%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Fan Vote</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                Who is the <span className="text-amber-400">G.O.A.T</span>?
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Cast your vote. See what the world thinks.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">

          {showResults && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
              <p className="text-sm text-gray-400">
                <span className="text-white font-bold text-lg">{totalVotes.toLocaleString()}</span> total votes
              </p>
              {voted && (
                <p className="text-amber-400 text-xs mt-2 bg-amber-400/10 inline-block px-3 py-1 rounded-full">
                  ✓ You voted for <span className="font-bold">{voted === "messi" ? "Messi" : "Ronaldo"}</span>
                </p>
              )}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div key="vote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <motion.button whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote("messi")}
                  className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-2 border-blue-500/30 rounded-3xl p-7 sm:p-10 text-center hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-500/40 mx-auto mb-5 shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-1">Lionel Messi</h2>
                    <p className="text-blue-400 text-xs font-medium mb-5">🇦🇷 Argentina · Inter Miami</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {[{ v: "919", l: "Goals" },{ v: "8", l: "Ballon d'Or" },{ v: "48", l: "Trophies" }].map(s => (
                        <div key={s.l} className="bg-white/5 rounded-xl py-2.5">
                          <p className="text-base font-bold text-white">{s.v}</p>
                          <p className="text-[9px] text-gray-500">{s.l}</p>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-2xl font-bold text-sm group-hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30">
                      Vote Messi
                    </span>
                  </div>
                </motion.button>

                <motion.button whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote("ronaldo")}
                  className="bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-2 border-red-500/30 rounded-3xl p-7 sm:p-10 text-center hover:border-red-400/60 hover:shadow-2xl hover:shadow-red-500/15 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-red-500/40 mx-auto mb-5 shadow-2xl shadow-red-500/20 group-hover:scale-105 transition-transform">
                      <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-1">Cristiano Ronaldo</h2>
                    <p className="text-red-400 text-xs font-medium mb-5">🇵🇹 Portugal · Al Nassr</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {[{ v: "976", l: "Goals" },{ v: "5", l: "Ballon d'Or" },{ v: "37", l: "Trophies" }].map(s => (
                        <div key={s.l} className="bg-white/5 rounded-xl py-2.5">
                          <p className="text-base font-bold text-white">{s.v}</p>
                          <p className="text-[9px] text-gray-500">{s.l}</p>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-500 text-white rounded-2xl font-bold text-sm group-hover:bg-red-400 transition-all shadow-lg shadow-red-500/30">
                      Vote Ronaldo
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/20 rounded-3xl p-6 sm:p-8 text-center">
<Crown className="w-10 h-10 text-amber-400 mx-auto mb-3" />                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {winner === "messi" ? "Messi is leading!" : winner === "ronaldo" ? "Ronaldo is leading!" : "Dead even!"}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {winner !== "tie" ? `Leading by ${diff.toLocaleString()} vote${diff !== 1 ? "s" : ""}` : "Every vote counts!"}
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-3xl p-6 text-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-3">
                      <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                    </div>
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="8" />
                        <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#3B82F6" strokeWidth="8"
                          strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{ strokeDashoffset: animateBars ? (2 * Math.PI * 42) * (1 - Number(messiPercent) / 100) : 2 * Math.PI * 42 }}
                          transition={{ duration: 1.5, ease: "easeOut" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-black text-blue-400">{messiPercent}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-400 font-bold">Lionel Messi</p>
                    <p className="text-[10px] text-gray-500 mt-1">{messiCount.toLocaleString()} votes</p>
{winner === "messi" && <Crown className="w-5 h-5 text-amber-400 mx-auto mt-1" />}                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-3xl p-6 text-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-3">
                      <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                    </div>
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="8" />
                        <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#EF4444" strokeWidth="8"
                          strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{ strokeDashoffset: animateBars ? (2 * Math.PI * 42) * (1 - Number(ronaldoPercent) / 100) : 2 * Math.PI * 42 }}
                          transition={{ duration: 1.5, ease: "easeOut" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-black text-red-400">{ronaldoPercent}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-red-400 font-bold">Cristiano Ronaldo</p>
                    <p className="text-[10px] text-gray-500 mt-1">{ronaldoCount.toLocaleString()} votes</p>
{winner === "ronaldo" && <Crown className="w-5 h-5 text-amber-400 mx-auto mt-1" />}                  </motion.div>
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-blue-400 font-bold">Messi</span>
                    <span className="text-gray-500">{messiPercent}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: animateBars ? `${messiPercent}%` : "0%" }} transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1 mt-4">
                    <span className="text-red-400 font-bold">Ronaldo</span>
                    <span className="text-gray-500">{ronaldoPercent}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: animateBars ? `${ronaldoPercent}%` : "0%" }} transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button onClick={handleReset} className="text-xs text-gray-600 hover:text-gray-400 underline transition-colors">
                    Reset my vote
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-gray-800">
            {[
  { icon: Goal, label: "Combined Goals", value: "1,895" },
  { icon: Crosshair, label: "Combined Assists", value: "677" },
  { icon: Trophy, label: "Combined Trophies", value: "85" },
  { icon: Award, label: "Ballon d'Ors", value: "13" },
].map((stat, i) => {
  const StatIcon = stat.icon
  return (
    <div key={i} className="text-center p-4 bg-gray-900/30 rounded-2xl border border-gray-800">
      <StatIcon className="w-5 h-5 text-amber-400 mx-auto" />
      <p className="text-lg font-black text-white mt-1">{stat.value}</p>
      <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
    </div>
  )
})}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const MESSI_INITIAL = 436459
  const RONALDO_INITIAL = 686132

  try {
    const { count: messiLiveVotes } = await supabase
      .from("poll_votes")
      .select("*", { count: "exact", head: true })
      .eq("player", "messi")

    const { count: ronaldoLiveVotes } = await supabase
      .from("poll_votes")
      .select("*", { count: "exact", head: true })
      .eq("player", "ronaldo")

    const messiTotal = MESSI_INITIAL + (messiLiveVotes || 0)
    const ronaldoTotal = RONALDO_INITIAL + (ronaldoLiveVotes || 0)

    return { props: { messiVotes: messiTotal, ronaldoVotes: ronaldoTotal } }
  } catch (e) {
    console.error("Error:", e)
    return { props: { messiVotes: MESSI_INITIAL, ronaldoVotes: RONALDO_INITIAL } }
  }
}