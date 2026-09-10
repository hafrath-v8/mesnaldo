// pages/poll.tsx

import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
import { GetServerSideProps } from "next"
import {
  motion,
  AnimatePresence,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  useState,
  useEffect,
} from "react"

import {
  Crown,
  Goal,
  Trophy,
  Award,
  Crosshair,
  ArrowRight,
} from "lucide-react"


/* =========================================================
   TYPES
========================================================= */

interface PlayerStats {
  goals: number
  assists: number
  games: number
}

interface PollPageProps {
  messiVotes: number
  ronaldoVotes: number
  messiStats?: PlayerStats
  ronaldoStats?: PlayerStats
}


/* =========================================================
   HELPERS
========================================================= */

function safeNum(
  value: any
): number {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : 0
}


/* =========================================================
   PAGE
========================================================= */

export default function Poll({
  messiVotes = 0,
  ronaldoVotes = 0,
  messiStats,
  ronaldoStats,
}: PollPageProps) {

  /* =======================================================
     SAFE PLAYER STATS
  ======================================================= */

  const safeMessiStats: PlayerStats = {
    goals:
      messiStats?.goals ?? 0,

    assists:
      messiStats?.assists ?? 0,

    games:
      messiStats?.games ?? 0,
  }

  const safeRonaldoStats: PlayerStats = {
    goals:
      ronaldoStats?.goals ?? 0,

    assists:
      ronaldoStats?.assists ?? 0,

    games:
      ronaldoStats?.games ?? 0,
  }


  /* =======================================================
     STATE
  ======================================================= */

  const [
    voted,
    setVoted,
  ] = useState<
    "messi" |
    "ronaldo" |
    null
  >(null)

  const [
    messiCount,
    setMessiCount,
  ] = useState(
    messiVotes
  )

  const [
    ronaldoCount,
    setRonaldoCount,
  ] = useState(
    ronaldoVotes
  )

  const [
    showResults,
    setShowResults,
  ] = useState(false)

  const [
    hasVoted,
    setHasVoted,
  ] = useState(false)

  const [
    animateBars,
    setAnimateBars,
  ] = useState(false)

  const [
    submitting,
    setSubmitting,
  ] = useState(false)

  const [
    voteError,
    setVoteError,
  ] = useState<string | null>(
    null
  )


  /* =======================================================
     LOAD SAVED LOCAL VOTE
  ======================================================= */

  useEffect(() => {

    const storedVote =
      localStorage.getItem(
        "goat-poll-vote"
      )

    if (
      storedVote === "messi" ||
      storedVote === "ronaldo"
    ) {

      setHasVoted(true)

      setVoted(
        storedVote
      )

      setShowResults(true)

      const timer =
        window.setTimeout(
          () =>
            setAnimateBars(
              true
            ),
          300
        )

      return () =>
        window.clearTimeout(
          timer
        )
    }

  }, [])


  /* =======================================================
     POLL VALUES
  ======================================================= */

  const totalVotes =
    messiCount +
    ronaldoCount

  const messiPercent =
    totalVotes > 0
      ? (
          (
            messiCount /
            totalVotes
          ) *
          100
        ).toFixed(1)
      : "50.0"

  const ronaldoPercent =
    totalVotes > 0
      ? (
          (
            ronaldoCount /
            totalVotes
          ) *
          100
        ).toFixed(1)
      : "50.0"

  const diff =
    Math.abs(
      messiCount -
      ronaldoCount
    )

  const winner =
    messiCount >
    ronaldoCount
      ? "messi"
      : ronaldoCount >
        messiCount
      ? "ronaldo"
      : "tie"


  /* =======================================================
     COMBINED CAREER VALUES
  ======================================================= */

  const combinedGoals =
    safeMessiStats.goals +
    safeRonaldoStats.goals

  const combinedAssists =
    safeMessiStats.assists +
    safeRonaldoStats.assists

  const combinedGames =
    safeMessiStats.games +
    safeRonaldoStats.games


  /* =======================================================
     STATIC TROPHIES / AWARDS
  ======================================================= */

  const messiTrophies = 48
  const ronaldoTrophies = 37

  const combinedTrophies =
    messiTrophies +
    ronaldoTrophies

  const messiBallonDor = 8
  const ronaldoBallonDor = 5

  const combinedBallonDor =
    messiBallonDor +
    ronaldoBallonDor


  /* =======================================================
     VOTE HANDLER
  ======================================================= */

  const handleVote =
    async (
      player:
        | "messi"
        | "ronaldo"
    ) => {

      if (
        hasVoted ||
        submitting
      ) {
        return
      }

      setSubmitting(true)
      setVoteError(null)

      try {

        const {
          error,
        } =
          await supabase
            .from(
              "poll_votes"
            )
            .insert({
              player,
            })

        if (error) {
          throw error
        }


        if (
          player ===
          "messi"
        ) {

          setMessiCount(
            (
              previous
            ) =>
              previous +
              1
          )

        } else {

          setRonaldoCount(
            (
              previous
            ) =>
              previous +
              1
          )

        }


        setVoted(
          player
        )

        setHasVoted(
          true
        )

        setShowResults(
          true
        )


        localStorage.setItem(
          "goat-poll-vote",
          player
        )


        window.setTimeout(
          () =>
            setAnimateBars(
              true
            ),
          300
        )

      } catch (
        error
      ) {

        console.error(
          "Vote error:",
          error
        )

        setVoteError(
          "Your vote could not be submitted. Please try again."
        )

      } finally {

        setSubmitting(
          false
        )

      }
    }


  /* =======================================================
     CLEAR LOCAL CHOICE
  ======================================================= */

  const handleReset =
    () => {

      localStorage.removeItem(
        "goat-poll-vote"
      )

      setHasVoted(false)
      setVoted(null)
      setShowResults(false)
      setAnimateBars(false)
      setVoteError(null)
    }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Layout
      title="Messi vs Ronaldo Poll: Vote for the GOAT & See Results"
      description="Vote for Lionel Messi or Cristiano Ronaldo in the GOAT debate and see current fan poll results alongside career goals, assists, trophies and Ballon d'Or totals."
    >
      <BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "Poll", url: "/poll" },
  ]}
/>

      <div className="bg-black min-h-screen">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative border-b border-gray-800 overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_50%)]" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative">

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >

              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
                Fan Vote
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">

                Messi vs Ronaldo: Who is the{" "}

                <span className="text-amber-400">
                  G.O.A.T.
                </span>

                ?

              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">

                Cast your vote for Lionel Messi or Cristiano
                Ronaldo and compare your choice with the
                current Mesnaldo fan poll results.

              </p>

            </motion.div>

          </div>

        </section>


        {/* =================================================
            MAIN
        ================================================= */}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">


          {/* =================================================
              RESULT SUMMARY
          ================================================= */}

          {showResults && (

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="text-center"
            >

              <p className="text-sm text-gray-400">

                <span className="text-white font-bold text-lg">
                  {totalVotes.toLocaleString()}
                </span>{" "}

                total votes

              </p>


              {voted && (

                <p className="text-amber-400 text-xs mt-2 bg-amber-400/10 border border-amber-400/10 inline-block px-3 py-1 rounded-full">

                  ✓ You voted for{" "}

                  <span className="font-bold">
                    {voted ===
                    "messi"
                      ? "Messi"
                      : "Ronaldo"}
                  </span>

                </p>

              )}

            </motion.div>

          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {voteError && (

            <div className="max-w-lg mx-auto bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center">

              <p className="text-xs text-red-400">
                {voteError}
              </p>

            </div>

          )}


          {/* =================================================
              VOTE / RESULTS
          ================================================= */}

          <AnimatePresence
            mode="wait"
          >

            {!showResults ? (

              /* =============================================
                 VOTING CARDS
              ============================================= */

              <motion.div
                key="vote"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >


                {/* ===========================================
                    MESSI CARD
                =========================================== */}

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={
                    submitting
                  }
                  onClick={() =>
                    handleVote(
                      "messi"
                    )
                  }
                  className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-2 border-blue-500/30 rounded-3xl p-7 sm:p-10 text-center hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 group cursor-pointer relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="relative">

                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-blue-500/40 mx-auto mb-5 shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-transform">

                      <Image
                        src="/images/messi.webp"
                        alt="Lionel Messi"
                        fill
                        priority
                        className="object-cover"
                      />

                    </div>


                    <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
                      Lionel Messi
                    </h2>

                    <p className="text-blue-400 text-xs font-medium mb-5">
                      🇦🇷 Argentina · Inter Miami
                    </p>


                    <div className="grid grid-cols-3 gap-2 mb-6">

                      {[
                        {
                          v:
                            safeMessiStats.goals.toLocaleString(),
                          l:
                            "Goals",
                        },
                        {
                          v:
                            messiBallonDor.toString(),
                          l:
                            "Ballon d'Or",
                        },
                        {
                          v:
                            messiTrophies.toString(),
                          l:
                            "Trophies",
                        },
                      ].map(
                        (
                          stat
                        ) => (

                          <div
                            key={
                              stat.l
                            }
                            className="bg-white/5 rounded-xl py-2.5"
                          >

                            <p className="text-base font-bold text-white">
                              {stat.v}
                            </p>

                            <p className="text-[9px] text-gray-500">
                              {stat.l}
                            </p>

                          </div>

                        )
                      )}

                    </div>


                    <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-2xl font-bold text-sm group-hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30">

                      {submitting
                        ? "Submitting..."
                        : "Vote Messi"}

                    </span>

                  </div>

                </motion.button>


                {/* ===========================================
                    RONALDO CARD
                =========================================== */}

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={
                    submitting
                  }
                  onClick={() =>
                    handleVote(
                      "ronaldo"
                    )
                  }
                  className="bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-2 border-red-500/30 rounded-3xl p-7 sm:p-10 text-center hover:border-red-400/60 hover:shadow-2xl hover:shadow-red-500/15 transition-all duration-300 group cursor-pointer relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="relative">

                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-red-500/40 mx-auto mb-5 shadow-2xl shadow-red-500/20 group-hover:scale-105 transition-transform">

                      <Image
                        src="/images/ronaldo.webp"
                        alt="Cristiano Ronaldo"
                        fill
                        priority
                        className="object-cover"
                      />

                    </div>


                    <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
                      Cristiano Ronaldo
                    </h2>

                    <p className="text-red-400 text-xs font-medium mb-5">
                      🇵🇹 Portugal · Al Nassr
                    </p>


                    <div className="grid grid-cols-3 gap-2 mb-6">

                      {[
                        {
                          v:
                            safeRonaldoStats.goals.toLocaleString(),
                          l:
                            "Goals",
                        },
                        {
                          v:
                            ronaldoBallonDor.toString(),
                          l:
                            "Ballon d'Or",
                        },
                        {
                          v:
                            ronaldoTrophies.toString(),
                          l:
                            "Trophies",
                        },
                      ].map(
                        (
                          stat
                        ) => (

                          <div
                            key={
                              stat.l
                            }
                            className="bg-white/5 rounded-xl py-2.5"
                          >

                            <p className="text-base font-bold text-white">
                              {stat.v}
                            </p>

                            <p className="text-[9px] text-gray-500">
                              {stat.l}
                            </p>

                          </div>

                        )
                      )}

                    </div>


                    <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-500 text-white rounded-2xl font-bold text-sm group-hover:bg-red-400 transition-all shadow-lg shadow-red-500/30">

                      {submitting
                        ? "Submitting..."
                        : "Vote Ronaldo"}

                    </span>

                  </div>

                </motion.button>

              </motion.div>

            ) : (

              /* =============================================
                 RESULT VIEW
              ============================================= */

              <motion.div
                key="results"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="space-y-6"
              >


                {/* LEADER CARD */}

                <motion.div
                  initial={{
                    scale: 0.95,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/20 rounded-3xl p-6 sm:p-8 text-center"
                >

                  <Crown className="w-10 h-10 text-amber-400 mx-auto mb-3" />


                  <h2 className="text-xl sm:text-2xl font-black text-white">

                    {winner ===
                    "messi"
                      ? "Messi is leading!"
                      : winner ===
                        "ronaldo"
                      ? "Ronaldo is leading!"
                      : "The poll is tied!"}

                  </h2>


                  <p className="text-gray-400 text-sm mt-1">

                    {winner !==
                    "tie"
                      ? `Leading by ${diff.toLocaleString()} ${
                          diff === 1
                            ? "vote"
                            : "votes"
                        }`
                      : "Every vote counts."}

                  </p>

                </motion.div>


                {/* RESULTS GRID */}

                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">


                  {/* MESSI RESULT */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-3xl p-4 sm:p-6 text-center"
                  >

                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-3">

                      <Image
                        src="/images/messi.webp"
                        alt="Lionel Messi"
                        fill
                        className="object-cover"
                      />

                    </div>


                    <div className="relative w-24 h-24 mx-auto mb-3">

                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >

                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#1f2937"
                          strokeWidth="8"
                        />

                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${
                            2 *
                            Math.PI *
                            42
                          }`}
                          initial={{
                            strokeDashoffset:
                              2 *
                              Math.PI *
                              42,
                          }}
                          animate={{
                            strokeDashoffset:
                              animateBars
                                ? (
                                    2 *
                                    Math.PI *
                                    42
                                  ) *
                                  (
                                    1 -
                                    Number(
                                      messiPercent
                                    ) /
                                      100
                                  )
                                : 2 *
                                  Math.PI *
                                  42,
                          }}
                          transition={{
                            duration: 1.5,
                            ease:
                              "easeOut",
                          }}
                        />

                      </svg>


                      <div className="absolute inset-0 flex items-center justify-center">

                        <span className="text-xl font-black text-blue-400">
                          {messiPercent}%
                        </span>

                      </div>

                    </div>


                    <p className="text-xs text-blue-400 font-bold">
                      Lionel Messi
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1">
                      {messiCount.toLocaleString()} votes
                    </p>


                    {winner ===
                      "messi" && (

                      <Crown className="w-5 h-5 text-amber-400 mx-auto mt-2" />

                    )}

                  </motion.div>


                  {/* RONALDO RESULT */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-3xl p-4 sm:p-6 text-center"
                  >

                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-3">

                      <Image
                        src="/images/ronaldo.webp"
                        alt="Cristiano Ronaldo"
                        fill
                        className="object-cover"
                      />

                    </div>


                    <div className="relative w-24 h-24 mx-auto mb-3">

                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >

                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#1f2937"
                          strokeWidth="8"
                        />

                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${
                            2 *
                            Math.PI *
                            42
                          }`}
                          initial={{
                            strokeDashoffset:
                              2 *
                              Math.PI *
                              42,
                          }}
                          animate={{
                            strokeDashoffset:
                              animateBars
                                ? (
                                    2 *
                                    Math.PI *
                                    42
                                  ) *
                                  (
                                    1 -
                                    Number(
                                      ronaldoPercent
                                    ) /
                                      100
                                  )
                                : 2 *
                                  Math.PI *
                                  42,
                          }}
                          transition={{
                            duration: 1.5,
                            ease:
                              "easeOut",
                          }}
                        />

                      </svg>


                      <div className="absolute inset-0 flex items-center justify-center">

                        <span className="text-xl font-black text-red-400">
                          {ronaldoPercent}%
                        </span>

                      </div>

                    </div>


                    <p className="text-xs text-red-400 font-bold">
                      Cristiano Ronaldo
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1">
                      {ronaldoCount.toLocaleString()} votes
                    </p>


                    {winner ===
                      "ronaldo" && (

                      <Crown className="w-5 h-5 text-amber-400 mx-auto mt-2" />

                    )}

                  </motion.div>

                </div>


                {/* RESULT BARS */}

                <div className="space-y-3 max-w-lg mx-auto">

                  <div className="flex items-center justify-between text-xs mb-1">

                    <span className="text-blue-400 font-bold">
                      Messi
                    </span>

                    <span className="text-gray-500">
                      {messiPercent}%
                    </span>

                  </div>


                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width:
                          animateBars
                            ? `${messiPercent}%`
                            : "0%",
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5,
                      }}
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                    />

                  </div>


                  <div className="flex items-center justify-between text-xs mb-1 mt-4">

                    <span className="text-red-400 font-bold">
                      Ronaldo
                    </span>

                    <span className="text-gray-500">
                      {ronaldoPercent}%
                    </span>

                  </div>


                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width:
                          animateBars
                            ? `${ronaldoPercent}%`
                            : "0%",
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5,
                      }}
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                    />

                  </div>

                </div>


                {/* RESET */}

                <div className="text-center pt-2">

                  <button
                    onClick={
                      handleReset
                    }
                    className="text-xs text-gray-600 hover:text-gray-400 underline transition-colors"
                  >
                    Clear local vote choice
                  </button>

                  <p className="text-[10px] text-gray-700 mt-2">
                    This clears only the vote choice stored in this browser.
                  </p>

                </div>

              </motion.div>

            )}

          </AnimatePresence>


          {/* =================================================
              COMBINED CAREER STATS
          ================================================= */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-gray-800">

            {[
              {
                icon:
                  Goal,

                label:
                  "Combined Goals",

                value:
                  combinedGoals.toLocaleString(),
              },

              {
                icon:
                  Crosshair,

                label:
                  "Combined Assists",

                value:
                  combinedAssists.toLocaleString(),
              },

              {
                icon:
                  Trophy,

                label:
                  "Combined Trophies",

                value:
                  combinedTrophies.toLocaleString(),
              },

              {
                icon:
                  Award,

                label:
                  "Ballon d'Ors",

                value:
                  combinedBallonDor.toLocaleString(),
              },

            ].map(
              (
                stat
              ) => {

                const StatIcon =
                  stat.icon

                return (

                  <div
                    key={
                      stat.label
                    }
                    className="text-center p-4 bg-gray-900/30 rounded-2xl border border-gray-800"
                  >

                    <StatIcon className="w-5 h-5 text-amber-400 mx-auto" />

                    <p className="text-lg font-black text-white mt-1">
                      {stat.value}
                    </p>

                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {stat.label}
                    </p>

                  </div>

                )
              }
            )}

          </div>


          {/* =================================================
              INTERNAL LINKS
          ================================================= */}

          <div className="flex flex-wrap items-center justify-center gap-3">

            <Link
              href="/who-is-best"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs sm:text-sm text-amber-400 hover:bg-amber-500/20 transition-colors"
            >
              Full GOAT Comparison

              <ArrowRight className="w-4 h-4" />

            </Link>


            <Link
              href="/goals"
              className="px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
            >
              Compare Goals
            </Link>


            <Link
              href="/trophies"
              className="px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
            >
              Compare Trophies
            </Link>

          </div>


          {/* =================================================
              SEO CONTENT
          ================================================= */}

          <section className="mt-20 pt-14 border-t border-gray-800/50">

            <div className="max-w-4xl mx-auto">


              <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
                Messi vs Ronaldo GOAT Poll: Who Do Fans Choose?
              </h2>


              <div className="space-y-7 text-sm text-gray-400 leading-8">


                <p>

                  The{" "}

                  <strong className="text-white">
                    Messi vs Ronaldo GOAT debate
                  </strong>{" "}

                  remains one of the biggest discussions in football.
                  Lionel Messi and Cristiano Ronaldo have both produced
                  extraordinary careers filled with goals, assists,
                  trophies, individual awards and memorable performances.

                </p>


                <p>

                  This fan poll allows visitors to choose between the two
                  players and compare their opinion with the current poll
                  totals displayed by Mesnaldo.

                </p>


                {/* POLL TOTAL */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Current Messi vs Ronaldo Poll Results
                </h3>

                <p>

                  The poll currently displays{" "}

                  <strong className="text-white">
                    {totalVotes.toLocaleString()}
                  </strong>{" "}

                  combined votes.

                </p>


                <p>

                  Lionel Messi currently has{" "}

                  <strong className="text-blue-400">
                    {messiCount.toLocaleString()}
                  </strong>{" "}

                  votes, while Cristiano Ronaldo has{" "}

                  <strong className="text-red-400">
                    {ronaldoCount.toLocaleString()}
                  </strong>

                  .

                </p>


                {/* PERCENTAGE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Vote Percentage
                </h3>

                <p>

                  Messi currently holds{" "}

                  <strong className="text-blue-400">
                    {messiPercent}%
                  </strong>{" "}

                  of the displayed poll vote, while Ronaldo has{" "}

                  <strong className="text-red-400">
                    {ronaldoPercent}%
                  </strong>

                  .

                </p>


                {winner !==
                "tie" ? (

                  <p>

                    {winner ===
                    "messi"
                      ? "Messi"
                      : "Ronaldo"}{" "}

                    is currently leading by{" "}

                    <strong className="text-white">
                      {diff.toLocaleString()}
                    </strong>{" "}

                    {diff ===
                    1
                      ? "vote"
                      : "votes"}

                    .

                  </p>

                ) : (

                  <p>
                    The displayed poll result is currently tied.
                  </p>

                )}


                {/* CAREER GOALS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Career Goals
                </h3>

                <p>

                  The career statistics currently used by Mesnaldo record{" "}

                  <strong className="text-blue-400">
                    {safeMessiStats.goals.toLocaleString()}
                  </strong>{" "}

                  goals for Lionel Messi and{" "}

                  <strong className="text-red-400">
                    {safeRonaldoStats.goals.toLocaleString()}
                  </strong>{" "}

                  goals for Cristiano Ronaldo.

                </p>


                <p>

                  Together, they have{" "}

                  <strong className="text-white">
                    {combinedGoals.toLocaleString()}
                  </strong>{" "}

                  recorded career goals in the data currently used on the
                  site.

                </p>


                <Link
                  href="/goals"
                  className="inline-block text-amber-400 hover:underline"
                >
                  Compare Messi and Ronaldo goals →
                </Link>


                {/* ASSISTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Career Assists
                </h3>

                <p>

                  Messi currently has{" "}

                  <strong className="text-blue-400">
                    {safeMessiStats.assists.toLocaleString()}
                  </strong>{" "}

                  recorded assists, while Ronaldo has{" "}

                  <strong className="text-red-400">
                    {safeRonaldoStats.assists.toLocaleString()}
                  </strong>

                  .

                </p>


                <p>

                  Their combined assist total is{" "}

                  <strong className="text-white">
                    {combinedAssists.toLocaleString()}
                  </strong>

                  .

                </p>


                <Link
                  href="/assists"
                  className="inline-block text-amber-400 hover:underline"
                >
                  Compare Messi and Ronaldo assists →
                </Link>


                {/* APPEARANCES */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Career Appearances
                </h3>

                <p>

                  The current career statistics contain{" "}

                  <strong className="text-blue-400">
                    {safeMessiStats.games.toLocaleString()}
                  </strong>{" "}

                  appearances for Messi and{" "}

                  <strong className="text-red-400">
                    {safeRonaldoStats.games.toLocaleString()}
                  </strong>{" "}

                  appearances for Ronaldo.

                </p>


                <p>

                  Together this represents{" "}

                  <strong className="text-white">
                    {combinedGames.toLocaleString()}
                  </strong>{" "}

                  recorded career appearances.

                </p>


                {/* TROPHIES */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Trophies
                </h3>

                <p>

                  The trophy totals currently configured on Mesnaldo give
                  Messi{" "}

                  <strong className="text-blue-400">
                    {messiTrophies}
                  </strong>{" "}

                  team trophies and Ronaldo{" "}

                  <strong className="text-red-400">
                    {ronaldoTrophies}
                  </strong>

                  .

                </p>


                <p>

                  Their combined configured trophy total is{" "}

                  <strong className="text-white">
                    {combinedTrophies}
                  </strong>

                  .

                </p>


                <Link
                  href="/trophies"
                  className="inline-block text-amber-400 hover:underline"
                >
                  View the complete trophy comparison →
                </Link>


                {/* BALLON DOR */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Ballon d&apos;Or
                </h3>

                <p>

                  Lionel Messi has won{" "}

                  <strong className="text-blue-400">
                    {messiBallonDor}
                  </strong>{" "}

                  Ballon d&apos;Or awards, while Cristiano Ronaldo has won{" "}

                  <strong className="text-red-400">
                    {ronaldoBallonDor}
                  </strong>

                  .

                </p>


                <p>

                  Together they have won{" "}

                  <strong className="text-white">
                    {combinedBallonDor}
                  </strong>{" "}

                  Ballon d&apos;Or awards.

                </p>


                <Link
                  href="/honours"
                  className="inline-block text-amber-400 hover:underline"
                >
                  Compare their individual honours →
                </Link>


                {/* WHY MESSI */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Why Do Fans Vote for Messi?
                </h3>

                <p>

                  Messi supporters often point to his combination of
                  goalscoring, assists, dribbling, passing, playmaking,
                  individual awards and international success.

                </p>


                <p>

                  His ability to influence matches both as a scorer and a
                  creator is one of the strongest arguments used by fans who
                  choose Messi in the GOAT debate.

                </p>


                {/* WHY RONALDO */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Why Do Fans Vote for Ronaldo?
                </h3>

                <p>

                  Ronaldo supporters often focus on his career scoring
                  volume, Champions League record, aerial ability,
                  longevity and experience across several different league
                  environments.

                </p>


                <p>

                  His evolution from a wide attacker into a highly
                  specialised goalscorer is also central to the argument made
                  by many Ronaldo supporters.

                </p>


                {/* FULL COMPARISON */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Compare Messi and Ronaldo Before Voting
                </h3>

                <p>

                  A fan poll records preference, but the wider comparison
                  involves many different statistics and achievements.

                </p>


                <p>

                  Mesnaldo&apos;s main comparison page examines goals,
                  assists, Champions League success, international football,
                  individual awards, penalties, free kicks, headers,
                  trophies and other areas of their careers.

                </p>


                <Link
                  href="/who-is-best"
                  className="inline-flex items-center gap-2 text-amber-400 hover:underline"
                >
                  View the full Messi vs Ronaldo GOAT comparison

                  <ArrowRight className="w-4 h-4" />

                </Link>


                {/* HEAD TO HEAD */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Head-to-Head
                </h3>

                <p>

                  Another way to compare the two players is through matches
                  where they directly faced each other.

                </p>


                <p>

                  The Mesnaldo head-to-head page provides match results,
                  goals, assists and other information from the direct
                  meetings represented in the database.

                </p>


                <Link
                  href="/head-to-head"
                  className="inline-block text-amber-400 hover:underline"
                >
                  View Messi vs Ronaldo head-to-head →
                </Link>


                {/* HOW POLL WORKS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How the Mesnaldo Poll Works
                </h3>

                <p>

                  When a visitor votes for Messi or Ronaldo, the selected
                  player is inserted into the Mesnaldo poll database. After a
                  successful submission, the result displayed in the browser
                  is updated immediately.

                </p>


                <p>

                  The selected player is also saved in the browser using
                  local storage so that the same browser remembers the
                  choice.

                </p>


                <p>

                  Local storage is not a secure identity or authentication
                  system. Clearing the browser&apos;s stored data can remove
                  the local vote marker.

                </p>


                {/* FAQ */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Messi vs Ronaldo Poll FAQ
                </h2>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who is currently winning the poll?
                </h3>

                <p>

                  {winner ===
                  "messi" ? (
                    <>
                      Messi is currently leading with{" "}
                      <strong className="text-blue-400">
                        {messiCount.toLocaleString()}
                      </strong>{" "}
                      votes compared with Ronaldo&apos;s{" "}
                      <strong className="text-red-400">
                        {ronaldoCount.toLocaleString()}
                      </strong>
                      .
                    </>
                  ) : winner ===
                    "ronaldo" ? (
                    <>
                      Ronaldo is currently leading with{" "}
                      <strong className="text-red-400">
                        {ronaldoCount.toLocaleString()}
                      </strong>{" "}
                      votes compared with Messi&apos;s{" "}
                      <strong className="text-blue-400">
                        {messiCount.toLocaleString()}
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      Messi and Ronaldo currently have the same
                      displayed vote total.
                    </>
                  )}

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  What percentage voted for Messi?
                </h3>

                <p>

                  Messi currently has{" "}

                  <strong className="text-blue-400">
                    {messiPercent}%
                  </strong>{" "}

                  of the displayed vote.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  What percentage voted for Ronaldo?
                </h3>

                <p>

                  Ronaldo currently has{" "}

                  <strong className="text-red-400">
                    {ronaldoPercent}%
                  </strong>{" "}

                  of the displayed vote.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Are Messi and Ronaldo goal totals dynamic?
                </h3>

                <p>

                  Yes. Their career goal, assist and appearance totals on this
                  page are retrieved from the `career_stats` table.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Does the poll decide who is the GOAT?
                </h3>

                <p>

                  No. This is a fan preference poll. It does not objectively
                  prove that one player is better than the other.

                </p>


                {/* CONCLUSION */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Messi or Ronaldo: Cast Your Vote
                </h2>

                <p>

                  Messi and Ronaldo built historically extraordinary careers
                  through different strengths. Messi is widely associated
                  with playmaking, dribbling, creativity and goalscoring,
                  while Ronaldo is strongly associated with scoring volume,
                  movement, aerial ability and longevity.

                </p>


                <p>

                  Statistics can help explain their careers, but the GOAT
                  debate ultimately depends on which qualities and
                  achievements each supporter values most.

                </p>


                <p>

                  Review the comparison, choose your player and cast your
                  vote.

                </p>

              </div>

            </div>

          </section>

        </div>

      </div>

    </Layout>
  )
}


/* =========================================================
   SERVER SIDE PROPS
========================================================= */

export const getServerSideProps:
  GetServerSideProps =
  async () => {

    const MESSI_INITIAL =
      436459

    const RONALDO_INITIAL =
      586132


    try {

      /* =====================================================
         POLL COUNTS
      ===================================================== */

      const {
        count:
          messiLiveVotes,
        error:
          messiVoteError,
      } =
        await supabase
          .from(
            "poll_votes"
          )
          .select(
            "*",
            {
              count:
                "exact",
              head:
                true,
            }
          )
          .eq(
            "player",
            "messi"
          )


      const {
        count:
          ronaldoLiveVotes,
        error:
          ronaldoVoteError,
      } =
        await supabase
          .from(
            "poll_votes"
          )
          .select(
            "*",
            {
              count:
                "exact",
              head:
                true,
            }
          )
          .eq(
            "player",
            "ronaldo"
          )


      if (
        messiVoteError
      ) {

        console.error(
          "Messi vote count error:",
          messiVoteError
        )

      }


      if (
        ronaldoVoteError
      ) {

        console.error(
          "Ronaldo vote count error:",
          ronaldoVoteError
        )

      }


      const messiTotal =
        MESSI_INITIAL +
        (
          messiLiveVotes ??
          0
        )

      const ronaldoTotal =
        RONALDO_INITIAL +
        (
          ronaldoLiveVotes ??
          0
        )


      /* =====================================================
         MESSI CAREER DATA
      ===================================================== */

      const {
        data:
          messiCareer,
        error:
          messiCareerError,
      } =
        await supabase
          .from(
            "career_stats"
          )
          .select(
            "total_goals,total_assists,total_games"
          )
          .eq(
            "player_id",
            1
          )
          .maybeSingle()


      /* =====================================================
         RONALDO CAREER DATA
      ===================================================== */

      const {
        data:
          ronaldoCareer,
        error:
          ronaldoCareerError,
      } =
        await supabase
          .from(
            "career_stats"
          )
          .select(
            "total_goals,total_assists,total_games"
          )
          .eq(
            "player_id",
            2
          )
          .maybeSingle()


      if (
        messiCareerError
      ) {

        console.error(
          "Messi career stats error:",
          messiCareerError
        )

      }


      if (
        ronaldoCareerError
      ) {

        console.error(
          "Ronaldo career stats error:",
          ronaldoCareerError
        )

      }


      /* =====================================================
         SAFE MESSI STATS
      ===================================================== */

      const messiStats: PlayerStats = {

        goals:
          safeNum(
            messiCareer
              ?.total_goals
          ),

        assists:
          safeNum(
            messiCareer
              ?.total_assists
          ),

        games:
          safeNum(
            messiCareer
              ?.total_games
          ),
      }


      /* =====================================================
         SAFE RONALDO STATS
      ===================================================== */

      const ronaldoStats: PlayerStats = {

        goals:
          safeNum(
            ronaldoCareer
              ?.total_goals
          ),

        assists:
          safeNum(
            ronaldoCareer
              ?.total_assists
          ),

        games:
          safeNum(
            ronaldoCareer
              ?.total_games
          ),
      }


      /* =====================================================
         RETURN
      ===================================================== */

      return {
        props: {

          messiVotes:
            messiTotal,

          ronaldoVotes:
            ronaldoTotal,

          messiStats,

          ronaldoStats,
        },
      }

    } catch (
      error
    ) {

      console.error(
        "Poll page error:",
        error
      )


      return {
        props: {

          messiVotes:
            MESSI_INITIAL,

          ronaldoVotes:
            RONALDO_INITIAL,

          messiStats: {
            goals: 0,
            assists: 0,
            games: 0,
          },

          ronaldoStats: {
            goals: 0,
            assists: 0,
            games: 0,
          },
        },
      }

    }
  }