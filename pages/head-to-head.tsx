// pages/head-to-head.tsx

import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { GetStaticProps } from "next"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"

import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"


/* =========================================================
   TYPES
========================================================= */

interface H2HMatch {
  id: string
  date: string
  competition: string
  round: string
  team_score: number
  opponent_score: number
  messi_team: string
  ronaldo_team: string
  messi_goals: number
  messi_assists: number
  ronaldo_goals: number
  ronaldo_assists: number
  venue: string
}

interface H2HPageProps {
  matches: H2HMatch[]
}

interface RawMatch {
  date?: string | null
  competition?: string | null
  round?: string | null
  team_score?: number | string | null
  opponent_score?: number | string | null
  team?: string | null
  opponent?: string | null
  goals?: number | string | null
  assists?: number | string | null
  venue?: string | null
  is_home?: boolean | null
}


/* =========================================================
   CONSTANTS
========================================================= */

const CARD_BASE =
  "bg-gray-900/80 border border-gray-700/60 rounded-2xl"

const SITE_URL = "https://mesnaldo.com"


/* =========================================================
   HELPERS
========================================================= */

function safeNum(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function safePercent(value: number, total: number): number {
  if (total <= 0) return 0
  return (value / total) * 100
}

function safeDateLabel(date: string): string {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date || "Unknown date"
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}


/* =========================================================
   PAGE
========================================================= */

export default function HeadToHead({
  matches,
}: H2HPageProps) {
  const [filter, setFilter] =
    useState<string>("all")

  const competitions =
    useMemo(() => {
      const values =
        matches
          .map(match => match.competition)
          .filter(Boolean)

      const unique =
        [...new Set(values)]

      unique.sort(
        (a, b) =>
          a.localeCompare(b)
      )

      return [
        "all",
        ...unique,
      ]
    }, [matches])


  const filteredMatches =
    useMemo(() => {
      if (filter === "all") {
        return matches
      }

      return matches.filter(
        match =>
          match.competition ===
          filter
      )
    }, [matches, filter])


  const stats =
    useMemo(() => {
      const total =
        filteredMatches.length

      const messiGoals =
        filteredMatches.reduce(
          (sum, match) =>
            sum +
            safeNum(
              match.messi_goals
            ),
          0
        )

      const ronaldoGoals =
        filteredMatches.reduce(
          (sum, match) =>
            sum +
            safeNum(
              match.ronaldo_goals
            ),
          0
        )

      const messiAssists =
        filteredMatches.reduce(
          (sum, match) =>
            sum +
            safeNum(
              match.messi_assists
            ),
          0
        )

      const ronaldoAssists =
        filteredMatches.reduce(
          (sum, match) =>
            sum +
            safeNum(
              match.ronaldo_assists
            ),
          0
        )

      /*
       * Important:
       * team_score / opponent_score are taken from Messi's
       * matched record in getStaticProps. Therefore:
       *
       * team_score > opponent_score = Messi's team won.
       * opponent_score > team_score = Ronaldo's team won.
       */

      const messiWins =
        filteredMatches.filter(
          match =>
            match.team_score >
            match.opponent_score
        ).length

      const ronaldoWins =
        filteredMatches.filter(
          match =>
            match.opponent_score >
            match.team_score
        ).length

      const draws =
        filteredMatches.filter(
          match =>
            match.team_score ===
            match.opponent_score
        ).length

      const messiContributions =
        messiGoals +
        messiAssists

      const ronaldoContributions =
        ronaldoGoals +
        ronaldoAssists

      return {
        total,
        messiGoals,
        ronaldoGoals,
        messiAssists,
        ronaldoAssists,
        messiWins,
        ronaldoWins,
        draws,
        messiContributions,
        ronaldoContributions,
      }
    }, [filteredMatches])


  const byYear =
    useMemo(() => {
      const years:
        Record<
          string,
          H2HMatch[]
        > = {}

      filteredMatches.forEach(
        match => {
          const parsed =
            new Date(
              match.date
            )

          const year =
            Number.isNaN(
              parsed.getTime()
            )
              ? "Unknown"
              : parsed
                  .getFullYear()
                  .toString()

          if (!years[year]) {
            years[year] = []
          }

          years[year].push(
            match
          )
        }
      )

      return Object.entries(
        years
      ).sort(
        ([a], [b]) =>
          Number(b) -
          Number(a)
      )
    }, [filteredMatches])


  const pageTitle =
    "Messi vs Ronaldo Head to Head: H2H Record, Wins, Goals & Results"

  const pageDescription =
    `Compare Lionel Messi vs Cristiano Ronaldo head to head across ${matches.length} direct meetings in the current Mesnaldo dataset, including wins, draws, goals, assists, El Clásico encounters, Champions League meetings and match-by-match results.`


  const faqItems = [
    {
      question:
        "How many times have Messi and Ronaldo played against each other?",
      answer:
        `The current Mesnaldo head-to-head dataset contains ${matches.length} direct meetings between Lionel Messi and Cristiano Ronaldo.`,
    },
    {
      question:
        "Who has more head-to-head wins, Messi or Ronaldo?",
      answer:
        `In the complete direct-match dataset, Messi's teams have ${matches.filter(match => match.team_score > match.opponent_score).length} wins and Ronaldo's teams have ${matches.filter(match => match.opponent_score > match.team_score).length} wins.`,
    },
    {
      question:
        "How many draws are there in Messi vs Ronaldo head-to-head matches?",
      answer:
        `There are ${matches.filter(match => match.team_score === match.opponent_score).length} draws in the current direct-match dataset.`,
    },
    {
      question:
        "Can I filter Messi vs Ronaldo head-to-head matches by competition?",
      answer:
        "Yes. The competition filter on this page recalculates meetings, wins, draws, goals and assists using only matches from the selected competition.",
    },
    {
      question:
        "Did Messi and Ronaldo play against each other in El Clásico?",
      answer:
        "Yes. Many of their most famous direct meetings came when Messi represented Barcelona and Ronaldo represented Real Madrid.",
    },
  ]


  const faqSchema = {
    "@context":
      "https://schema.org",
    "@type":
      "FAQPage",
    mainEntity:
      faqItems.map(
        item => ({
          "@type":
            "Question",
          name:
            item.question,
          acceptedAnswer: {
            "@type":
              "Answer",
            text:
              item.answer,
          },
        })
      ),
  }


  const breadcrumbSchema = {
    "@context":
      "https://schema.org",
    "@type":
      "BreadcrumbList",
    itemListElement: [
      {
        "@type":
          "ListItem",
        position:
          1,
        name:
          "Home",
        item:
          SITE_URL,
      },
      {
        "@type":
          "ListItem",
        position:
          2,
        name:
          "Messi vs Ronaldo Head to Head",
        item:
          `${SITE_URL}/head-to-head`,
      },
    ],
  }


  const webPageSchema = {
    "@context":
      "https://schema.org",
    "@type":
      "WebPage",
    name:
      pageTitle,
    description:
      pageDescription,
    url:
      `${SITE_URL}/head-to-head`,
    about: [
      {
        "@type":
          "Person",
        name:
          "Lionel Messi",
      },
      {
        "@type":
          "Person",
        name:
          "Cristiano Ronaldo",
      },
    ],
  }


  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <Head>
        <meta
          name="keywords"
          content="Messi vs Ronaldo head to head, Messi Ronaldo H2H, Messi vs Ronaldo wins, Messi vs Ronaldo goals against each other, Messi Ronaldo El Clasico, Messi Ronaldo Champions League head to head, Messi Ronaldo direct matches"
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:url"
          content={`${SITE_URL}/head-to-head`}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                faqSchema
              ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                breadcrumbSchema
              ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                webPageSchema
              ),
          }}
        />
      </Head>


      <div className="bg-black min-h-screen">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12 sm:space-y-16">


          {/* =================================================
              HERO
          ================================================= */}

          <header className="text-center">

            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">
              Direct Meetings • El Clásico • Europe
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Messi vs Ronaldo{" "}
              <span className="text-amber-400">
                Head to Head
              </span>
            </h1>

            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-7">
              Compare Lionel Messi and Cristiano Ronaldo in matches where they
              directly faced each other, including team results, goals, assists,
              competitions and match-by-match context.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-6">

              <Link
                href="/goals"
                className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
              >
                Career Goals
              </Link>

              <Link
                href="/career"
                className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
              >
                Career Comparison
              </Link>

              <Link
                href="/who-is-best"
                className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-xs text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
              >
                Who Is Better?
              </Link>

            </div>

          </header>


          {/* =================================================
              SCOREBOARD
          ================================================= */}

          <section>

            <div className={`${CARD_BASE} p-6 sm:p-8 lg:p-10`}>

              <div className="grid grid-cols-3 items-center">

                {/* Messi */}

                <div className="text-center">

                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-3 shadow-xl shadow-blue-500/20">

                    <Image
                      src="/images/messi.webp"
                      alt="Lionel Messi"
                      fill
                      sizes="80px"
                      className="object-cover"
                      priority
                      fetchPriority="high"
                    />

                  </div>

                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400">
                    {stats.messiWins}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Messi Team Wins
                  </p>

                </div>


                {/* Draws */}

                <div className="text-center">

                  <p className="text-3xl sm:text-4xl font-black text-amber-400">
                    {stats.draws}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Draws
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    {stats.total} matches
                  </p>

                </div>


                {/* Ronaldo */}

                <div className="text-center">

                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-3 shadow-xl shadow-red-500/20">

                    <Image
                      src="/images/ronaldo.webp"
                      alt="Cristiano Ronaldo"
                      fill
                      sizes="80px"
                      className="object-cover"
                      priority
                      fetchPriority="high"
                    />

                  </div>

                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-400">
                    {stats.ronaldoWins}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Ronaldo Team Wins
                  </p>

                </div>

              </div>


              {/* Progress */}

              <div className="mt-7 h-2 bg-gray-800 rounded-full overflow-hidden flex">

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width:
                      `${safePercent(stats.messiWins, stats.total)}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                  }}
                  className="h-full bg-blue-500"
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width:
                      `${safePercent(stats.draws, stats.total)}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.08,
                  }}
                  className="h-full bg-amber-500"
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width:
                      `${safePercent(stats.ronaldoWins, stats.total)}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="h-full bg-red-500"
                />

              </div>


              <div className="flex justify-between mt-2 text-[10px] text-gray-500">

                <span>
                  Messi {stats.messiWins}
                </span>

                <span>
                  Draws {stats.draws}
                </span>

                <span>
                  Ronaldo {stats.ronaldoWins}
                </span>

              </div>

            </div>


            {/* Stats */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">

              <div className={`${CARD_BASE} p-4 text-center`}>
                <p className="text-xl font-black text-blue-400">
                  {stats.messiGoals}
                </p>
                <p className="text-[10px] text-gray-500">
                  Messi Goals
                </p>
              </div>

              <div className={`${CARD_BASE} p-4 text-center`}>
                <p className="text-xl font-black text-red-400">
                  {stats.ronaldoGoals}
                </p>
                <p className="text-[10px] text-gray-500">
                  Ronaldo Goals
                </p>
              </div>

              <div className={`${CARD_BASE} p-4 text-center`}>
                <p className="text-xl font-black text-blue-400">
                  {stats.messiAssists}
                </p>
                <p className="text-[10px] text-gray-500">
                  Messi Assists
                </p>
              </div>

              <div className={`${CARD_BASE} p-4 text-center`}>
                <p className="text-xl font-black text-red-400">
                  {stats.ronaldoAssists}
                </p>
                <p className="text-[10px] text-gray-500">
                  Ronaldo Assists
                </p>
              </div>

            </div>

          </section>


          {/* =================================================
              MATCH LIST
          ================================================= */}

          <section>

            <SectionHeading
              title="Messi vs Ronaldo Match-by-Match Results"
              subtitle={`${filteredMatches.length} direct meetings shown`}
            />


            {/* Competition Filter */}

            <div className="flex flex-wrap justify-center gap-2 mb-7">

              {competitions.map(
                competition => (

                  <button
                    key={competition}
                    type="button"
                    onClick={() =>
                      setFilter(
                        competition
                      )
                    }
                    className={`px-4 py-2 text-xs rounded-full transition-all font-medium ${
                      filter ===
                      competition
                        ? "bg-white text-black"
                        : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-700"
                    }`}
                  >

                    {competition === "all"
                      ? "All"
                      : competition}

                  </button>

                )
              )}

            </div>


            {byYear.length === 0
              ? (
                <div className="text-center py-16">

                  <p className="text-gray-500">
                    No matches found.
                  </p>

                </div>
              )
              : (
                <div className="space-y-10">

                  {byYear.map(
                    ([year, yearMatches]) => (

                      <div key={year}>

                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">

                          <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />

                          {year}

                          <span className="text-xs text-gray-600 font-normal">
                            ({yearMatches.length} matches)
                          </span>

                        </h3>


                        <div className="space-y-2">

                          {yearMatches.map(
                            match => (

                              <div
                                key={match.id}
                                className={`${CARD_BASE} p-4 sm:p-5`}
                              >

                                {/* Date */}

                                <div className="flex items-center justify-between mb-3">

                                  <span className="text-[10px] text-gray-500">
                                    {match.competition || "Competition"}
                                  </span>

                                  <span className="text-[10px] text-gray-600">
                                    {safeDateLabel(match.date)}
                                  </span>

                                </div>


                                {/* Teams */}

                                <div className="flex items-center justify-center gap-3 sm:gap-5 mb-3">

                                  <div className="text-right flex-1">
                                    <span className="text-sm font-bold text-blue-400">
                                      {match.messi_team}
                                    </span>
                                  </div>

                                  <div className="text-center flex-shrink-0">

                                    <span
                                      className={`text-xl sm:text-2xl font-black ${
                                        match.team_score >
                                        match.opponent_score
                                          ? "text-blue-400"
                                          : match.team_score <
                                            match.opponent_score
                                          ? "text-red-400"
                                          : "text-amber-400"
                                      }`}
                                    >
                                      {match.team_score}
                                      {" - "}
                                      {match.opponent_score}
                                    </span>

                                  </div>

                                  <div className="text-left flex-1">
                                    <span className="text-sm font-bold text-red-400">
                                      {match.ronaldo_team}
                                    </span>
                                  </div>

                                </div>


                                {/* Individual Contributions */}

                                <div className="grid grid-cols-2 gap-3">

                                  <div className="bg-blue-500/5 rounded-xl p-3 text-center border border-blue-500/10">

                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 mx-auto mb-1">

                                      <Image
                                        src="/images/messi.png"
                                        alt="Lionel Messi"
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                      />

                                    </div>

                                    <p className="text-[10px] text-blue-400 font-bold">
                                      Messi
                                    </p>

                                    <div className="flex items-center justify-center gap-2 mt-1">

                                      {match.messi_goals > 0 && (
                                        <span className="text-xs text-emerald-400 font-bold">
                                          ⚽{match.messi_goals}
                                        </span>
                                      )}

                                      {match.messi_assists > 0 && (
                                        <span className="text-xs text-blue-400 font-bold">
                                          🅰{match.messi_assists}
                                        </span>
                                      )}

                                      {match.messi_goals === 0 &&
                                        match.messi_assists === 0 && (
                                          <span className="text-[10px] text-gray-600">
                                            —
                                          </span>
                                        )}

                                    </div>

                                  </div>


                                  <div className="bg-red-500/5 rounded-xl p-3 text-center border border-red-500/10">

                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-500/30 mx-auto mb-1">

                                      <Image
                                        src="/images/ronaldo.png"
                                        alt="Cristiano Ronaldo"
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                      />

                                    </div>

                                    <p className="text-[10px] text-red-400 font-bold">
                                      Ronaldo
                                    </p>

                                    <div className="flex items-center justify-center gap-2 mt-1">

                                      {match.ronaldo_goals > 0 && (
                                        <span className="text-xs text-emerald-400 font-bold">
                                          ⚽{match.ronaldo_goals}
                                        </span>
                                      )}

                                      {match.ronaldo_assists > 0 && (
                                        <span className="text-xs text-red-400 font-bold">
                                          🅰{match.ronaldo_assists}
                                        </span>
                                      )}

                                      {match.ronaldo_goals === 0 &&
                                        match.ronaldo_assists === 0 && (
                                          <span className="text-[10px] text-gray-600">
                                            —
                                          </span>
                                        )}

                                    </div>

                                  </div>

                                </div>


                                {/* Context */}

                                <div className="flex items-center justify-between mt-3">

                                  <span className="text-[10px] text-gray-600">
                                    {match.venue === "H"
                                      ? "🏟️ Messi team home"
                                      : match.venue === "A"
                                      ? "✈️ Messi team away"
                                      : "📍 Neutral / unspecified"}
                                  </span>

                                  <span className="text-[10px] text-gray-600">
                                    {match.round || ""}
                                  </span>

                                </div>

                              </div>

                            )
                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>
              )}

          </section>


          {/* =================================================
              SUPER SEO CONTENT
          ================================================= */}

          <section className="mt-20 pt-14 border-t border-gray-800/50">

            <article className="max-w-4xl mx-auto">

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
                Messi vs Ronaldo Head to Head: Complete H2H Comparison
              </h2>


              <div className="space-y-7 text-sm sm:text-[15px] text-gray-400 leading-8">

                <p>
                  The{" "}
                  <strong className="text-white">
                    Messi vs Ronaldo head-to-head
                  </strong>{" "}
                  comparison focuses on one of the most specific parts of football&apos;s
                  biggest individual rivalry: matches where Lionel Messi and Cristiano
                  Ronaldo were actually on opposite sides of the same fixture. This is
                  different from comparing their full careers, because both players were
                  competing under the same match conditions, against each other&apos;s teams,
                  on the same day.
                </p>

                <p>
                  Mesnaldo&apos;s head-to-head page uses the direct encounters represented
                  in its current match database. It compares team wins, draws, goals,
                  assists, goal contributions, competitions and individual match results.
                  The filter above also allows the available meetings to be separated by
                  competition.
                </p>


                {/* TOTAL */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Many Times Have Messi and Ronaldo Played Against Each Other?
                </h3>

                <p>
                  The current Mesnaldo dataset contains{" "}
                  <strong className="text-white">
                    {stats.total}
                  </strong>{" "}
                  direct encounters when the &quot;All&quot; competition filter is selected.
                  If another competition is selected, the totals on this page recalculate
                  automatically using only that subset of matches.
                </p>

                <p>
                  Most fans associate the rivalry with Barcelona vs Real Madrid, but
                  Messi and Ronaldo also crossed paths outside the league environment.
                  Their direct-match history therefore provides a useful way to study
                  specific chapters of the rivalry rather than relying only on complete
                  career totals.
                </p>


                {/* WINS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Head-to-Head Wins
                </h3>

                <p>
                  In the matches currently shown, Messi&apos;s teams have{" "}
                  <strong className="text-blue-400">
                    {stats.messiWins}
                  </strong>{" "}
                  wins, while Ronaldo&apos;s teams have{" "}
                  <strong className="text-red-400">
                    {stats.ronaldoWins}
                  </strong>{" "}
                  wins. The remaining{" "}
                  <strong className="text-amber-400">
                    {stats.draws}
                  </strong>{" "}
                  matches ended in draws.
                </p>

                {stats.messiWins >
                stats.ronaldoWins ? (
                  <p>
                    Messi currently holds the team-win advantage in the selected
                    direct-match sample by{" "}
                    <strong className="text-white">
                      {stats.messiWins -
                        stats.ronaldoWins}
                    </strong>{" "}
                    wins.
                  </p>
                ) : stats.ronaldoWins >
                  stats.messiWins ? (
                  <p>
                    Ronaldo currently holds the team-win advantage in the selected
                    direct-match sample by{" "}
                    <strong className="text-white">
                      {stats.ronaldoWins -
                        stats.messiWins}
                    </strong>{" "}
                    wins.
                  </p>
                ) : (
                  <p>
                    Messi and Ronaldo are currently level for team wins in the
                    selected direct-match sample.
                  </p>
                )}


                {/* GOALS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Who Scored More Goals in Messi vs Ronaldo Matches?
                </h3>

                <p>
                  Messi has scored{" "}
                  <strong className="text-blue-400">
                    {stats.messiGoals}
                  </strong>{" "}
                  goals in the selected direct encounters, while Ronaldo has scored{" "}
                  <strong className="text-red-400">
                    {stats.ronaldoGoals}
                  </strong>.
                </p>

                <p>
                  Head-to-head goals are especially interesting because they remove
                  some of the contextual differences created by playing in different
                  leagues, seasons and competitions. Both players were participating
                  in the same fixture, although the strength and performance of the
                  surrounding teams still matter.
                </p>


                {/* ASSISTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Head-to-Head Assists
                </h3>

                <p>
                  Messi has recorded{" "}
                  <strong className="text-blue-400">
                    {stats.messiAssists}
                  </strong>{" "}
                  assists in the selected direct meetings, compared with{" "}
                  <strong className="text-red-400">
                    {stats.ronaldoAssists}
                  </strong>{" "}
                  for Ronaldo.
                </p>

                <p>
                  Assist totals add another layer to the comparison because attacking
                  influence is not limited to scoring. However, historical assist
                  definitions can differ between data providers, so assist comparisons
                  are most useful when both players are measured using the same
                  methodology.
                </p>


                {/* G+A */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Goal Contributions in Direct Meetings
                </h3>

                <p>
                  Combining goals and assists, Messi has{" "}
                  <strong className="text-blue-400">
                    {stats.messiContributions}
                  </strong>{" "}
                  recorded goal contributions in the selected head-to-head matches,
                  while Ronaldo has{" "}
                  <strong className="text-red-400">
                    {stats.ronaldoContributions}
                  </strong>.
                </p>

                <p>
                  Goals plus assists provide a wider measure of direct attacking
                  output than goals alone, but they still do not represent every part
                  of performance. Dribbling, chance creation, ball progression,
                  defensive work and involvement earlier in a move require other
                  statistics.
                </p>


                {/* EL CLASICO */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo in El Clásico
                </h3>

                <p>
                  The Barcelona vs Real Madrid period is the defining chapter of the
                  Messi-Ronaldo head-to-head rivalry. During Ronaldo&apos;s years at Real
                  Madrid and Messi&apos;s long spell at Barcelona, the two regularly met
                  in one of world football&apos;s most watched club fixtures.
                </p>

                <p>
                  Those matches carried significance beyond the individual rivalry.
                  League positions, domestic trophies, European qualification,
                  momentum and the traditional Barcelona-Real Madrid rivalry all
                  influenced the context around each encounter.
                </p>


                {/* UCL */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Champions League Head to Head
                </h3>

                <p>
                  Messi and Ronaldo also faced each other in UEFA Champions League
                  football. These meetings are notable because the Champions League
                  formed a major part of both players&apos; European legacies and often
                  involved high-pressure knockout football.
                </p>

                <p>
                  Use the competition filter above to isolate Champions League
                  encounters whenever those matches are identified under that
                  competition name in the current dataset.
                </p>


                {/* INTERNATIONAL */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo International Head-to-Head Matches
                </h3>

                <p>
                  Their direct rivalry was not limited to club football. Messi
                  represented Argentina while Ronaldo represented Portugal, creating
                  a different tactical and competitive context when their national
                  teams met.
                </p>

                <p>
                  International matches should be evaluated separately from club
                  encounters because the players operated with different teammates,
                  coaches, systems and preparation schedules.
                </p>


                {/* COMPETITIONS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Head-to-Head Record by Competition
                </h3>

                <p>
                  The competition filter is important because all direct meetings are
                  not identical. A league match, cup tie, European knockout game and
                  international fixture can carry very different tactical demands and
                  competitive stakes.
                </p>

                <p>
                  When a competition is selected, Mesnaldo recalculates meetings,
                  Messi team wins, Ronaldo team wins, draws, goals and assists using
                  only the filtered matches. This makes it easier to answer specific
                  questions without mixing every encounter together.
                </p>


                {/* TEAM vs PLAYER */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Team Wins vs Individual Performance
                </h3>

                <p>
                  Head-to-head wins belong to teams, not individual players. A player
                  can score in a defeat, fail to score in a victory, create important
                  chances without recording an assist or influence a match in ways
                  that are not visible in basic box-score statistics.
                </p>

                <p>
                  For that reason, this page separates team outcomes from individual
                  goals and assists. The most useful interpretation considers both
                  parts of the comparison rather than using one number as definitive
                  proof of individual superiority.
                </p>


                {/* WHY IT MATTERS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Why the Messi vs Ronaldo Head-to-Head Rivalry Matters
                </h3>

                <p>
                  Messi and Ronaldo spent many of their peak years competing at the
                  same time, and for a major part of that period they represented
                  Barcelona and Real Madrid. That made their rivalry unusual:
                  two historically productive players were not only competing for
                  records and individual awards, but also meeting directly in major
                  fixtures.
                </p>

                <p>
                  Head-to-head statistics therefore offer a different perspective from
                  career goals, total assists, trophies or Ballon d&apos;Or awards. They
                  capture moments where the rivalry existed within the same match,
                  even though those matches represent only a small portion of each
                  player&apos;s full career.
                </p>


                {/* METHODOLOGY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Mesnaldo Identifies Direct Messi vs Ronaldo Matches
                </h3>

                <p>
                  Mesnaldo identifies direct encounters by matching Messi and Ronaldo
                  match records where the date is the same and each player&apos;s team
                  is listed as the opponent of the other player&apos;s team. The page
                  then combines the relevant goals and assists from both records.
                </p>

                <p>
                  The score, competition, round and venue displayed on this page are
                  taken from the matched Messi-side record. Because the comparison is
                  database-driven, totals can change if historical records are
                  corrected, competition labels are standardised or additional
                  matches are added.
                </p>


                {/* FAQ */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Messi vs Ronaldo Head-to-Head FAQ
                </h2>

                {faqItems.map(
                  item => (
                    <div
                      key={
                        item.question
                      }
                      className="mt-8"
                    >
                      <h3 className="text-lg font-bold text-white">
                        {item.question}
                      </h3>

                      <p className="mt-3">
                        {item.answer}
                      </p>
                    </div>
                  )
                )}


                {/* CONCLUSION */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Messi vs Ronaldo Direct Encounters: What the Numbers Show
                </h2>

                <p>
                  The Messi vs Ronaldo head-to-head record is one of the most
                  interesting ways to compare the two players because it focuses on
                  matches where they actually faced each other. Team wins, draws,
                  goals, assists and goal contributions each tell a different part
                  of that story.
                </p>

                <p>
                  The head-to-head record should not replace the wider career
                  comparison. Messi and Ronaldo built their legacies across hundreds
                  of matches, different leagues, international tournaments and
                  multiple phases of their careers. Direct meetings are best treated
                  as one important chapter within that larger debate.
                </p>

                <p>
                  For the broader comparison, explore Mesnaldo&apos;s{" "}
                  <Link
                    href="/goals"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    goals comparison
                  </Link>
                  ,{" "}
                  <Link
                    href="/assists"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    assists comparison
                  </Link>
                  ,{" "}
                  <Link
                    href="/trophies"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    trophies comparison
                  </Link>
                  ,{" "}
                  <Link
                    href="/career"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    career comparison
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/who-is-best"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    who-is-best analysis
                  </Link>
                  .
                </p>

              </div>

            </article>

          </section>

        </div>

      </div>

    </Layout>
  )
}


/* =========================================================
   STATIC DATA
   ISR is faster for navigation than fetching from Supabase
   on every request with getServerSideProps.
========================================================= */

export const getStaticProps:
  GetStaticProps<H2HPageProps> =
  async () => {
    try {
      const [
        messiResponse,
        ronaldoResponse,
      ] =
        await Promise.all([
          supabase
            .from("matches")
            .select(
              "date,competition,round,team_score,opponent_score,team,opponent,goals,assists,venue,is_home"
            )
            .eq("player_id", 1)
            .limit(2000),

          supabase
            .from("matches")
            .select(
              "date,competition,round,team_score,opponent_score,team,opponent,goals,assists,venue,is_home"
            )
            .eq("player_id", 2)
            .limit(2000),
        ])


      if (
        messiResponse.error
      ) {
        console.error(
          "H2H Messi fetch error:",
          messiResponse.error
        )
      }


      if (
        ronaldoResponse.error
      ) {
        console.error(
          "H2H Ronaldo fetch error:",
          ronaldoResponse.error
        )
      }


      const messiAll =
        (messiResponse.data ??
          []) as RawMatch[]

      const ronaldoAll =
        (ronaldoResponse.data ??
          []) as RawMatch[]


      /*
       * Build an indexed lookup instead of running .find()
       * over every Ronaldo row for every Messi row.
       */

      const ronaldoLookup =
        new Map<
          string,
          RawMatch
        >()


      ronaldoAll.forEach(
        match => {
          if (
            !match.date ||
            !match.team ||
            !match.opponent
          ) {
            return
          }

          const key =
            `${match.date}|${match.team}|${match.opponent}`

          ronaldoLookup.set(
            key,
            match
          )
        }
      )


      const h2hMap =
        new Map<
          string,
          H2HMatch
        >()


      messiAll.forEach(
        messiMatch => {
          if (
            !messiMatch.date ||
            !messiMatch.team ||
            !messiMatch.opponent
          ) {
            return
          }


          const lookupKey =
            `${messiMatch.date}|${messiMatch.opponent}|${messiMatch.team}`


          const ronaldoMatch =
            ronaldoLookup.get(
              lookupKey
            )


          if (
            !ronaldoMatch
          ) {
            return
          }


          const key =
            `${messiMatch.date}-${messiMatch.team}-${ronaldoMatch.team}`


          if (
            h2hMap.has(key)
          ) {
            return
          }


          const venue =
            messiMatch.venue ||
            (
              messiMatch.is_home ===
              true
                ? "H"
                : messiMatch.is_home ===
                  false
                ? "A"
                : "N"
            )


          h2hMap.set(
            key,
            {
              id:
                key,

              date:
                messiMatch.date,

              competition:
                messiMatch.competition ||
                "Unknown",

              round:
                messiMatch.round ||
                "",

              team_score:
                safeNum(
                  messiMatch.team_score
                ),

              opponent_score:
                safeNum(
                  messiMatch.opponent_score
                ),

              messi_team:
                messiMatch.team,

              ronaldo_team:
                ronaldoMatch.team ||
                messiMatch.opponent,

              messi_goals:
                safeNum(
                  messiMatch.goals
                ),

              messi_assists:
                safeNum(
                  messiMatch.assists
                ),

              ronaldo_goals:
                safeNum(
                  ronaldoMatch.goals
                ),

              ronaldo_assists:
                safeNum(
                  ronaldoMatch.assists
                ),

              venue,
            }
          )
        }
      )


      const h2hMatches =
        Array.from(
          h2hMap.values()
        )


      h2hMatches.sort(
        (a, b) =>
          new Date(
            b.date
          ).getTime() -
          new Date(
            a.date
          ).getTime()
      )


      return {
        props: {
          matches:
            h2hMatches,
        },

        revalidate:
          3600,
      }

    } catch (
      error
    ) {
      console.error(
        "Head-to-head page error:",
        error
      )

      return {
        props: {
          matches: [],
        },

        revalidate:
          300,
      }
    }
  }
