// pages/faq.tsx

import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetStaticProps } from "next"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
import { motion } from "framer-motion"
import { useState } from "react"

import Link from "next/link"
import Head from "next/head"

import {
  Rocket,
  BarChart3,
  Swords,
  Trophy,
  Monitor,
  Globe,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Star,
  Target,
} from "lucide-react"


/* =========================================================
   TYPES
========================================================= */

interface PlayerStats {
  goals: number
  assists: number
  games: number

  wins: number
  draws: number
  losses: number

  minutes: number

  penaltiesScored: number
  penaltiesMissed: number

  freeKicks: number

  headers: number
  leftFoot: number
  rightFoot: number
  outsideBox: number
}


interface FAQPageProps {
  messi?: PlayerStats
  ronaldo?: PlayerStats
}


interface FAQItem {
  q: string
  a: string
}


interface FAQCategory {
  category: string
  icon: any
  questions: FAQItem[]
}


/* =========================================================
   EMPTY PLAYER
========================================================= */

const EMPTY_PLAYER: PlayerStats = {
  goals: 0,
  assists: 0,
  games: 0,

  wins: 0,
  draws: 0,
  losses: 0,

  minutes: 0,

  penaltiesScored: 0,
  penaltiesMissed: 0,

  freeKicks: 0,

  headers: 0,
  leftFoot: 0,
  rightFoot: 0,
  outsideBox: 0,
}


/* =========================================================
   HELPERS
========================================================= */

function safeNum(
  value: unknown
): number {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}


function safeRate(
  value: number,
  total: number
): number {
  if (
    total <= 0
  ) {
    return 0
  }

  return value / total
}


function safePercent(
  value: number,
  total: number
): number {
  if (
    total <= 0
  ) {
    return 0
  }

  return (
    value /
    total
  ) *
    100
}


function normalizePlayer(
  player?: PlayerStats
): PlayerStats {
  return {
    goals:
      player?.goals ?? 0,

    assists:
      player?.assists ?? 0,

    games:
      player?.games ?? 0,

    wins:
      player?.wins ?? 0,

    draws:
      player?.draws ?? 0,

    losses:
      player?.losses ?? 0,

    minutes:
      player?.minutes ?? 0,

    penaltiesScored:
      player?.penaltiesScored ?? 0,

    penaltiesMissed:
      player?.penaltiesMissed ?? 0,

    freeKicks:
      player?.freeKicks ?? 0,

    headers:
      player?.headers ?? 0,

    leftFoot:
      player?.leftFoot ?? 0,

    rightFoot:
      player?.rightFoot ?? 0,

    outsideBox:
      player?.outsideBox ?? 0,
  }
}


/* =========================================================
   TROPHIES / AWARDS
========================================================= */

const TROPHIES = {
  messi: {
    total: 48,
    league: 13,
    ucl: 4,
    worldCup: 1,
  },

  ronaldo: {
    total: 37,
    league: 8,
    ucl: 5,
    worldCup: 0,
  },
}


const BALLON = {
  messi: {
    total: 8,
  },

  ronaldo: {
    total: 5,
  },
}


/* =========================================================
   BUILD FAQ DATA
========================================================= */

function buildFaqs(
  messi?: PlayerStats,
  ronaldo?: PlayerStats
): FAQCategory[] {

  const safeMessi =
    normalizePlayer(
      messi
    )

  const safeRonaldo =
    normalizePlayer(
      ronaldo
    )


  /* =======================================================
     DERIVED STATS
  ======================================================= */

  const messiGoalRate =
    safeRate(
      safeMessi.goals,
      safeMessi.games
    )

  const ronaldoGoalRate =
    safeRate(
      safeRonaldo.goals,
      safeRonaldo.games
    )


  const messiAssistRate =
    safeRate(
      safeMessi.assists,
      safeMessi.games
    )

  const ronaldoAssistRate =
    safeRate(
      safeRonaldo.assists,
      safeRonaldo.games
    )


  const messiGA =
    safeMessi.goals +
    safeMessi.assists

  const ronaldoGA =
    safeRonaldo.goals +
    safeRonaldo.assists


  const messiMinutesPerGoal =
    safeMessi.goals > 0 &&
    safeMessi.minutes > 0
      ? Math.round(
          safeMessi.minutes /
          safeMessi.goals
        )
      : 0


  const ronaldoMinutesPerGoal =
    safeRonaldo.goals > 0 &&
    safeRonaldo.minutes > 0
      ? Math.round(
          safeRonaldo.minutes /
          safeRonaldo.goals
        )
      : 0


  const messiPenaltyAttempts =
    safeMessi.penaltiesScored +
    safeMessi.penaltiesMissed

  const ronaldoPenaltyAttempts =
    safeRonaldo.penaltiesScored +
    safeRonaldo.penaltiesMissed


  const messiPenaltyRate =
    safePercent(
      safeMessi.penaltiesScored,
      messiPenaltyAttempts
    )

  const ronaldoPenaltyRate =
    safePercent(
      safeRonaldo.penaltiesScored,
      ronaldoPenaltyAttempts
    )


  /* =======================================================
     FAQ CONTENT
  ======================================================= */

  return [

    /* =====================================================
       GETTING STARTED
    ===================================================== */

    {
      category:
        "Getting Started",

      icon:
        Rocket,

      questions: [

        {
          q:
            "What is Mesnaldo?",

          a:
            "Mesnaldo is a football statistics website focused on comparing Lionel Messi and Cristiano Ronaldo. It brings together career totals, match-level data, goals, assists, trophies, records, head-to-head matches and other comparison categories so users can examine the rivalry from several different angles.",
        },

        {
          q:
            "Is Mesnaldo free to use?",

          a:
            "Yes. The public comparison pages can be browsed without creating an account or paying a subscription.",
        },

        {
          q:
            "Where should I start?",

          a:
            "The homepage gives a broad Messi vs Ronaldo overview. The Goals page focuses on scoring, Assists focuses on playmaking, Trophies compares team honours, Head to Head focuses on direct meetings, Career shows career progression, Records covers milestones, and the Poll lets visitors vote in the GOAT debate.",
        },

        {
          q:
            "How often are the statistics updated?",

          a:
            "The statistics shown by Mesnaldo reflect the values currently stored in its database. Pages using regenerated or server-rendered data will reflect new values after the underlying database records have been updated and the relevant page is refreshed or regenerated.",
        },

      ],
    },


    /* =====================================================
       DATA & ACCURACY
    ===================================================== */

    {
      category:
        "The Data & Accuracy",

      icon:
        BarChart3,

      questions: [

        {
          q:
            "Where does Mesnaldo's data come from?",

          a:
            "Mesnaldo stores career totals and individual match records in its own database. The site is designed to organise football statistics into a consistent Messi vs Ronaldo comparison format. Historical football statistics can sometimes differ between providers, especially assists and older match data.",
        },

        {
          q:
            "Why can football statistics differ between websites?",

          a:
            "Different providers may use different definitions for assists, friendly matches, competition classifications and historical records. Mesnaldo therefore aims to use a consistent methodology for both players rather than mixing incompatible definitions.",
        },

        {
          q:
            "What's the difference between career_stats and matches data?",

          a:
            "The career_stats table stores overall career totals such as goals, assists, appearances and other aggregate values. The matches table stores individual match records and is used for detailed competition filters and match-level breakdowns.",
        },

        {
          q:
            "How are goal types categorized?",

          a:
            "Where the required fields are available, Mesnaldo can separate goals by categories such as left foot, right foot, headers, penalties, free kicks and shooting location.",
        },

        {
          q:
            "How are club and international statistics separated?",

          a:
            "International statistics refer to national-team matches, while club statistics refer to matches played for clubs. Mesnaldo uses competition and match data to separate these scopes where possible.",
        },

      ],
    },


    /* =====================================================
       GOALS / ASSISTS
    ===================================================== */

    {
      category:
        "Goals, Assists & Statistics",

      icon:
        Target,

      questions: [

        {
          q:
            "Who has scored more career goals — Messi or Ronaldo?",

          a:
            `The current Mesnaldo career data records ${safeMessi.goals.toLocaleString()} goals for Lionel Messi and ${safeRonaldo.goals.toLocaleString()} goals for Cristiano Ronaldo. ${
              safeMessi.goals >
              safeRonaldo.goals
                ? `Messi currently leads by ${(safeMessi.goals - safeRonaldo.goals).toLocaleString()} goals.`
                : safeRonaldo.goals >
                  safeMessi.goals
                ? `Ronaldo currently leads by ${(safeRonaldo.goals - safeMessi.goals).toLocaleString()} goals.`
                : "Their current career goal totals are equal."
            }`,
        },

        {
          q:
            "How many career goals does Messi have?",

          a:
            `Lionel Messi currently has ${safeMessi.goals.toLocaleString()} career goals in the Mesnaldo dataset across ${safeMessi.games.toLocaleString()} appearances. His current scoring rate is approximately ${messiGoalRate.toFixed(3)} goals per appearance.${
              messiMinutesPerGoal > 0
                ? ` That equals approximately one goal every ${messiMinutesPerGoal} recorded minutes.`
                : ""
            }`,
        },

        {
          q:
            "How many career goals does Ronaldo have?",

          a:
            `Cristiano Ronaldo currently has ${safeRonaldo.goals.toLocaleString()} career goals in the Mesnaldo dataset across ${safeRonaldo.games.toLocaleString()} appearances. His current scoring rate is approximately ${ronaldoGoalRate.toFixed(3)} goals per appearance.${
              ronaldoMinutesPerGoal > 0
                ? ` That equals approximately one goal every ${ronaldoMinutesPerGoal} recorded minutes.`
                : ""
            }`,
        },

        {
          q:
            "Who has more assists?",

          a:
            `Messi currently has ${safeMessi.assists.toLocaleString()} recorded career assists compared with Ronaldo's ${safeRonaldo.assists.toLocaleString()}. Their current assist rates are approximately ${messiAssistRate.toFixed(3)} per appearance for Messi and ${ronaldoAssistRate.toFixed(3)} for Ronaldo.`,
        },

        {
          q:
            "Who has more goals and assists combined?",

          a:
            `The current Mesnaldo career data gives Messi ${messiGA.toLocaleString()} combined goals and assists and Ronaldo ${ronaldoGA.toLocaleString()}. Goals plus assists provide a broader measure of direct attacking contribution than goals alone.`,
        },

        {
          q:
            "Who has more free-kick goals?",

          a:
            `The current Mesnaldo career statistics record ${safeMessi.freeKicks.toLocaleString()} free-kick goals for Messi and ${safeRonaldo.freeKicks.toLocaleString()} for Ronaldo.`,
        },

        {
          q:
            "Who has scored more headers?",

          a:
            `The current dataset records ${safeMessi.headers.toLocaleString()} headed goals for Messi and ${safeRonaldo.headers.toLocaleString()} for Ronaldo.`,
        },

        {
          q:
            "Who has scored more penalties?",

          a:
            `Messi currently has ${safeMessi.penaltiesScored.toLocaleString()} recorded penalties scored from ${messiPenaltyAttempts.toLocaleString()} recorded attempts, while Ronaldo has ${safeRonaldo.penaltiesScored.toLocaleString()} scored from ${ronaldoPenaltyAttempts.toLocaleString()} attempts. Their current recorded conversion rates are approximately ${messiPenaltyRate.toFixed(1)}% for Messi and ${ronaldoPenaltyRate.toFixed(1)}% for Ronaldo.`,
        },

        {
          q:
            "Who has more left-footed goals?",

          a:
            `The current career data records ${safeMessi.leftFoot.toLocaleString()} left-footed goals for Messi and ${safeRonaldo.leftFoot.toLocaleString()} for Ronaldo.`,
        },

        {
          q:
            "Who has more right-footed goals?",

          a:
            `The current career data records ${safeMessi.rightFoot.toLocaleString()} right-footed goals for Messi and ${safeRonaldo.rightFoot.toLocaleString()} for Ronaldo.`,
        },

      ],
    },


    /* =====================================================
       TROPHIES
    ===================================================== */

    {
      category:
        "Trophies & Awards",

      icon:
        Trophy,

      questions: [

        {
          q:
            "Who has won more trophies overall?",

          a:
            `Using the team-trophy totals currently configured by Mesnaldo, Messi has ${TROPHIES.messi.total} trophies and Ronaldo has ${TROPHIES.ronaldo.total}. Trophy totals can vary depending on which competitions a source counts.`,
        },

        {
          q:
            "Who has more Champions League titles?",

          a:
            `Ronaldo has ${TROPHIES.ronaldo.ucl} Champions League titles in the trophy data currently used by Mesnaldo, while Messi has ${TROPHIES.messi.ucl}.`,
        },

        {
          q:
            "Who has more league titles?",

          a:
            `The current Mesnaldo trophy configuration lists Messi with ${TROPHIES.messi.league} league titles and Ronaldo with ${TROPHIES.ronaldo.league}.`,
        },

        {
          q:
            "How many Ballon d'Or awards has Messi won?",

          a:
            `Messi has won ${BALLON.messi.total} Ballon d'Or awards.`,
        },

        {
          q:
            "How many Ballon d'Or awards has Ronaldo won?",

          a:
            `Ronaldo has won ${BALLON.ronaldo.total} Ballon d'Or awards.`,
        },

        {
          q:
            "Who has more Ballon d'Or awards?",

          a:
            `Messi leads the Ballon d'Or comparison with ${BALLON.messi.total} awards compared with Ronaldo's ${BALLON.ronaldo.total}.`,
        },

        {
          q:
            "Are trophies and individual awards the same thing?",

          a:
            "No. Team trophies are won collectively by clubs or national teams, while individual awards recognise individual players. Mesnaldo separates these categories because combining them can create a misleading comparison.",
        },

      ],
    },


    /* =====================================================
       HEAD TO HEAD
    ===================================================== */

    {
      category:
        "Head to Head & The Rivalry",

      icon:
        Swords,

      questions: [

        {
          q:
            "How can I compare Messi and Ronaldo head to head?",

          a:
            "Mesnaldo has a dedicated Head to Head page that compares matches where Messi's and Ronaldo's teams directly faced each other. It includes results, goals, assists and competition context based on the meetings represented in the site's database.",
        },

        {
          q:
            "Were most Messi vs Ronaldo meetings El Clásico matches?",

          a:
            "A large part of their direct rivalry came during the period when Messi played for Barcelona and Ronaldo played for Real Madrid. Those El Clásico matches became the defining head-to-head period of the rivalry.",
        },

        {
          q:
            "Did Messi and Ronaldo ever play for the same club?",

          a:
            "No. Messi and Ronaldo never played together for the same club.",
        },

        {
          q:
            "Can I filter their direct meetings by competition?",

          a:
            "Yes. The Mesnaldo Head to Head page separates direct meetings by competition where that information is available in the match dataset.",
        },

      ],
    },


    /* =====================================================
       GOAT DEBATE
    ===================================================== */

    {
      category:
        "The GOAT Debate",

      icon:
        Star,

      questions: [

        {
          q:
            "Who is better — Messi or Ronaldo?",

          a:
            "There is no single statistic that objectively settles the debate. Messi's strongest arguments commonly include playmaking, assists, dribbling, Ballon d'Or success and international honours. Ronaldo's strongest arguments commonly include total scoring volume, aerial scoring, Champions League achievements, longevity and experience across several league environments.",
        },

        {
          q:
            "Who is the better goalscorer?",

          a:
            `The answer depends on the measurement. Current career totals are Messi ${safeMessi.goals.toLocaleString()} goals and Ronaldo ${safeRonaldo.goals.toLocaleString()} goals. Their current goals-per-appearance rates are ${messiGoalRate.toFixed(3)} for Messi and ${ronaldoGoalRate.toFixed(3)} for Ronaldo. Total goals measure career volume, while goals per appearance measure scoring frequency.`,
        },

        {
          q:
            "Who is the better playmaker?",

          a:
            `Assist totals provide one measurable part of playmaking. Messi currently has ${safeMessi.assists.toLocaleString()} assists compared with Ronaldo's ${safeRonaldo.assists.toLocaleString()} in the Mesnaldo career data. Passing, dribbling and chance creation require additional statistics beyond assists alone.`,
        },

        {
          q:
            "Who has the stronger Champions League record?",

          a:
            `Ronaldo holds the trophy advantage in the Champions League comparison used by this site, with ${TROPHIES.ronaldo.ucl} titles compared with Messi's ${TROPHIES.messi.ucl}. Both produced historically significant performances in the competition.`,
        },

        {
          q:
            "Who has the stronger international legacy?",

          a:
            "Messi's international career includes winning the FIFA World Cup and major South American honours with Argentina. Ronaldo's international career includes winning the European Championship and Nations League honours with Portugal. Their international cases emphasise different achievements.",
        },

        {
          q:
            "Why is the Messi vs Ronaldo debate still popular?",

          a:
            "Their careers overlapped for an unusually long period, they competed at the highest level at the same time, they developed different playing styles, and each leads important statistical and achievement categories.",
        },

      ],
    },


    /* =====================================================
       USING MESNALDO
    ===================================================== */

    {
      category:
        "Using Mesnaldo",

      icon:
        Monitor,

      questions: [

        {
          q:
            "How does the GOAT Poll work?",

          a:
            "Visitors can vote for Messi or Ronaldo. The selection is submitted to the poll database and is also stored in browser local storage so the same browser remembers the choice. Local storage is not a secure account-based anti-duplicate voting system.",
        },

        {
          q:
            "Are poll results proof of who is the GOAT?",

          a:
            "No. The poll represents visitor preference. It is not a scientific ranking and does not objectively prove which player is better.",
        },

        {
          q:
            "Can I compare specific competitions?",

          a:
            "Yes. Several Mesnaldo pages use competition filters or separate competition scopes. The exact filters depend on the page and the match data available.",
        },

        {
          q:
            "Can I view Messi and Ronaldo match histories?",

          a:
            "The individual Messi and Ronaldo profile pages contain match-history sections based on the records available in the Mesnaldo database.",
        },

        {
          q:
            "Does the website work on mobile?",

          a:
            "Yes. Mesnaldo uses a responsive design for phones, tablets and desktop screens.",
        },

        {
          q:
            "How can I report incorrect data?",

          a:
            "Use the Contact page to report a possible error. Include the statistic or match involved and, where possible, a source supporting the correction.",
        },

      ],
    },


    /* =====================================================
       ABOUT
    ===================================================== */

    {
      category:
        "About The Platform",

      icon:
        Globe,

      questions: [

        {
          q:
            "What is the purpose of Mesnaldo?",

          a:
            "Mesnaldo is designed to make the Messi vs Ronaldo comparison easier to explore by organising career totals, match data, records, trophies and other statistics into dedicated comparison pages.",
        },

        {
          q:
            "Is Mesnaldo an official FIFA or UEFA website?",

          a:
            "No. Mesnaldo is an independent football statistics and comparison website. It is not an official website of FIFA, UEFA, Lionel Messi, Cristiano Ronaldo or their clubs.",
        },

        {
          q:
            "Will Mesnaldo remain useful after Messi and Ronaldo retire?",

          a:
            "Yes. The website can continue as a historical archive of their careers, statistics, records, trophies and rivalry.",
        },

        {
          q:
            "How can I support Mesnaldo?",

          a:
            "You can use the site, share useful comparison pages and report possible data issues or suggestions through the Contact page.",
        },

      ],
    },

  ]
}


/* =========================================================
   PAGE
========================================================= */

export default function FAQ({
  messi,
  ronaldo,
}: FAQPageProps) {

  /* =======================================================
     SAFE PROPS
  ======================================================= */

  const safeMessi =
    normalizePlayer(
      messi
    )

  const safeRonaldo =
    normalizePlayer(
      ronaldo
    )


  /* =======================================================
     STATE
  ======================================================= */

  const [
    openCategory,
    setOpenCategory,
  ] = useState<
    string |
    null
  >(
    "Getting Started"
  )


  const [
    openQuestions,
    setOpenQuestions,
  ] = useState<
    Set<string>
  >(
    new Set()
  )


  /* =======================================================
     FAQ DATA
  ======================================================= */

  const FAQS =
    buildFaqs(
      safeMessi,
      safeRonaldo
    )


  /* =======================================================
     TOGGLE CATEGORY
  ======================================================= */

  const toggleCategory =
    (
      category:
        string
    ) => {

      setOpenCategory(
        previous =>
          previous ===
          category
            ? null
            : category
      )
    }


  /* =======================================================
     TOGGLE QUESTION
  ======================================================= */

  const toggleQuestion =
    (
      question:
        string
    ) => {

      setOpenQuestions(
        previous => {

          const next =
            new Set(
              previous
            )

          if (
            next.has(
              question
            )
          ) {
            next.delete(
              question
            )
          } else {
            next.add(
              question
            )
          }

          return next
        }
      )
    }


  /* =======================================================
     FAQ SCHEMA
  ======================================================= */

  const faqSchema = {

    "@context":
      "https://schema.org",

    "@type":
      "FAQPage",

    mainEntity:
      FAQS.flatMap(
        category =>
          category.questions.map(
            item => ({

              "@type":
                "Question",

              name:
                item.q,

              acceptedAnswer: {
                "@type":
                  "Answer",

                text:
                  item.a,
              },
            })
          )
      ),
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <Layout
      title="Messi vs Ronaldo FAQ: Goals, Stats, Trophies & GOAT Questions"
      description="Answers to common Messi vs Ronaldo questions about career goals, assists, trophies, Ballon d'Or awards, head-to-head matches, statistics, methodology and the GOAT debate."
    >
<BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]}
/>
      <Head>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                faqSchema
              ),
          }}
        />

      </Head>


      <div className="bg-black min-h-screen">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative border-b border-gray-800 overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%)]" />


          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative">

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
                Help Center
              </p>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">

                Messi vs Ronaldo{" "}

                <span className="text-amber-400">
                  FAQ
                </span>

              </h1>


              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">

                Answers to common questions about Messi,
                Ronaldo, their career statistics, trophies,
                records, the GOAT debate and how Mesnaldo
                organises its data.

              </p>

            </motion.div>

          </div>

        </section>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">


          {/* =================================================
              CATEGORY BUTTONS
          ================================================= */}

          <div className="flex flex-wrap gap-2 mb-10 justify-center">

            {FAQS.map(
              category => {

                const CatIcon =
                  category.icon

                return (

                  <button
                    key={
                      category.category
                    }
                    type="button"
                    onClick={() =>
                      setOpenCategory(
                        category.category
                      )
                    }
                    className={`flex items-center gap-2 px-5 py-2.5 text-xs rounded-full transition-all font-medium ${
                      openCategory ===
                      category.category
                        ? "bg-white text-black shadow-lg"
                        : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-700"
                    }`}
                  >

                    <CatIcon className="w-4 h-4" />

                    {
                      category.category
                    }

                  </button>

                )
              }
            )}

          </div>


          {/* =================================================
              FAQ LIST
          ================================================= */}

          <div className="space-y-3">

            {FAQS.map(
              (
                category,
                categoryIndex
              ) => {

                const CatIcon =
                  category.icon

                const isCategoryOpen =
                  openCategory ===
                  category.category


                return (

                  <motion.div
                    key={
                      category.category
                    }
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay:
                        categoryIndex *
                        0.05,
                    }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden"
                  >


                    {/* CATEGORY HEADER */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleCategory(
                          category.category
                        )
                      }
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-800/30 transition-colors"
                    >

                      <div className="flex items-center gap-3">

                        <CatIcon className="w-5 h-5 text-amber-400" />


                        <div>

                          <h2 className="text-base sm:text-lg font-bold text-white">
                            {
                              category.category
                            }
                          </h2>

                          <p className="text-[10px] text-gray-500 mt-0.5">

                            {
                              category.questions.length
                            }{" "}

                            {
                              category.questions.length ===
                              1
                                ? "question"
                                : "questions"
                            }

                          </p>

                        </div>

                      </div>


                      <motion.span
                        animate={{
                          rotate:
                            isCategoryOpen
                              ? 180
                              : 0,
                        }}
                        transition={{
                          duration:
                            0.3,
                        }}
                        className="text-gray-400"
                      >

                        <ChevronDown className="w-4 h-4" />

                      </motion.span>

                    </button>


                    {/* QUESTIONS */}

                    {isCategoryOpen && (

                      <div className="border-t border-gray-700/50">

                        {category.questions.map(
                          item => {

                            const isQuestionOpen =
                              openQuestions.has(
                                item.q
                              )


                            return (

                              <div
                                key={
                                  item.q
                                }
                                className="border-b border-gray-700/30 last:border-0"
                              >


                                {/* QUESTION BUTTON */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleQuestion(
                                      item.q
                                    )
                                  }
                                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-800/20 transition-colors group"
                                >

                                  <span
                                    className={`text-sm pr-4 transition-colors ${
                                      isQuestionOpen
                                        ? "text-amber-400 font-medium"
                                        : "text-gray-300 group-hover:text-white"
                                    }`}
                                  >

                                    {
                                      item.q
                                    }

                                  </span>


                                  <motion.span
                                    animate={{
                                      rotate:
                                        isQuestionOpen
                                          ? 180
                                          : 0,
                                    }}
                                    transition={{
                                      duration:
                                        0.3,
                                    }}
                                    className="text-gray-500 flex-shrink-0"
                                  >

                                    <ChevronDown className="w-3 h-3" />

                                  </motion.span>

                                </button>


                                {/* ANSWER */}

                                {isQuestionOpen && (

                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                      y: -5,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                    }}
                                    transition={{
                                      duration:
                                        0.25,
                                    }}
                                    className="px-4 sm:px-5 pb-5"
                                  >

                                    <p className="text-sm text-gray-400 leading-7">

                                      {
                                        item.a
                                      }

                                    </p>


                                    <div className="mt-4 pt-3 border-t border-gray-800/50">

                                      <div className="text-[10px] text-gray-600 flex flex-wrap items-center gap-2">

                                        <span>
                                          Was this helpful?
                                        </span>


                                        <button
                                          type="button"
                                          className="text-gray-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
                                        >

                                          <ThumbsUp className="w-3 h-3" />

                                          Yes

                                        </button>


                                        <button
                                          type="button"
                                          className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
                                        >

                                          <ThumbsDown className="w-3 h-3" />

                                          No

                                        </button>

                                      </div>

                                    </div>

                                  </motion.div>

                                )}

                              </div>

                            )
                          }
                        )}

                      </div>

                    )}

                  </motion.div>

                )
              }
            )}

          </div>


          {/* =================================================
              QUICK CAREER STATS
          ================================================= */}

          <section className="pt-12">

            <h2 className="text-xl font-bold text-white text-center mb-5">
              Current Career Totals
            </h2>


            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center">

                <p className="text-xl font-black text-blue-400">
                  {
                    safeMessi.goals.toLocaleString()
                  }
                </p>

                <p className="text-[10px] text-gray-500 mt-1">
                  Messi Goals
                </p>

              </div>


              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center">

                <p className="text-xl font-black text-red-400">
                  {
                    safeRonaldo.goals.toLocaleString()
                  }
                </p>

                <p className="text-[10px] text-gray-500 mt-1">
                  Ronaldo Goals
                </p>

              </div>


              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center">

                <p className="text-xl font-black text-blue-400">
                  {
                    safeMessi.assists.toLocaleString()
                  }
                </p>

                <p className="text-[10px] text-gray-500 mt-1">
                  Messi Assists
                </p>

              </div>


              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 text-center">

                <p className="text-xl font-black text-red-400">
                  {
                    safeRonaldo.assists.toLocaleString()
                  }
                </p>

                <p className="text-[10px] text-gray-500 mt-1">
                  Ronaldo Assists
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              INTERNAL LINKS
          ================================================= */}

          <section className="pt-10">

            <h2 className="text-xl font-bold text-white text-center mb-5">
              Explore the Messi vs Ronaldo Comparison
            </h2>


            <div className="flex flex-wrap justify-center gap-2">

              {[
                {
                  href:
                    "/goals",

                  label:
                    "Goals",
                },

                {
                  href:
                    "/assists",

                  label:
                    "Assists",
                },

                {
                  href:
                    "/trophies",

                  label:
                    "Trophies",
                },

                {
                  href:
                    "/head-to-head",

                  label:
                    "Head to Head",
                },

                {
                  href:
                    "/career",

                  label:
                    "Career",
                },

                {
                  href:
                    "/records",

                  label:
                    "Records",
                },

                {
                  href:
                    "/who-is-best",

                  label:
                    "Who Is Best?",
                },

                {
                  href:
                    "/poll",

                  label:
                    "GOAT Poll",
                },

              ].map(
                item => (

                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className="px-4 py-2 text-xs text-gray-400 bg-gray-900 border border-gray-800 rounded-full hover:text-white hover:border-gray-600 transition-colors"
                  >

                    {
                      item.label
                    }

                  </Link>

                )
              )}

            </div>

          </section>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="text-center py-12 mt-8 border-t border-gray-800">

            <MessageCircle className="w-10 h-10 text-amber-400 mx-auto mb-4" />


            <h2 className="text-xl font-bold text-white mb-2">
              Still have questions?
            </h2>


            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">

              Can&apos;t find what you&apos;re looking for?
              Contact Mesnaldo or learn more about the project.

            </p>


            <div className="flex flex-wrap items-center justify-center gap-3">

              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Contact Us
              </Link>


              <Link
                href="/about"
                className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors"
              >
                About Mesnaldo
              </Link>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  )
}


/* =========================================================
   STATIC PROPS
========================================================= */

export const getStaticProps:
  GetStaticProps<FAQPageProps> =
  async () => {

    try {

      /* =====================================================
         MESSI DATA
      ===================================================== */

      const {
        data: messiData,
        error: messiError,
      } = await supabase
        .from("career_stats")
        .select(`
          total_goals,
          total_assists,
          total_games,
          total_wins,
          total_draws,
          total_losses,
          total_minutes,
          penalties_scored,
          penalties_missed,
          free_kick_goals,
          header_goals,
          left_foot_goals,
          right_foot_goals,
          outside_box_goals
        `)
        .eq("player_id", 1)
        .maybeSingle()


      /* =====================================================
         RONALDO DATA
      ===================================================== */

      const {
        data: ronaldoData,
        error: ronaldoError,
      } = await supabase
        .from("career_stats")
        .select(`
          total_goals,
          total_assists,
          total_games,
          total_wins,
          total_draws,
          total_losses,
          total_minutes,
          penalties_scored,
          penalties_missed,
          free_kick_goals,
          header_goals,
          left_foot_goals,
          right_foot_goals,
          outside_box_goals
        `)
        .eq("player_id", 2)
        .maybeSingle()


      /* =====================================================
         ERRORS
      ===================================================== */

      if (
        messiError
      ) {
        console.error(
          "FAQ Messi stats error:",
          messiError
        )
      }


      if (
        ronaldoError
      ) {
        console.error(
          "FAQ Ronaldo stats error:",
          ronaldoError
        )
      }


      /* =====================================================
         NORMALIZE MESSI
      ===================================================== */

      const messi:
        PlayerStats = {

        goals:
          safeNum(
            messiData
              ?.total_goals
          ),

        assists:
          safeNum(
            messiData
              ?.total_assists
          ),

        games:
          safeNum(
            messiData
              ?.total_games
          ),

        wins:
          safeNum(
            messiData
              ?.total_wins
          ),

        draws:
          safeNum(
            messiData
              ?.total_draws
          ),

        losses:
          safeNum(
            messiData
              ?.total_losses
          ),

        minutes:
          safeNum(
            messiData
              ?.total_minutes
          ),

        penaltiesScored:
          safeNum(
            messiData
              ?.penalties_scored
          ),

        penaltiesMissed:
          safeNum(
            messiData
              ?.penalties_missed
          ),

        freeKicks:
          safeNum(
            messiData
              ?.free_kick_goals
          ),

        headers:
          safeNum(
            messiData
              ?.header_goals
          ),

        leftFoot:
          safeNum(
            messiData
              ?.left_foot_goals
          ),

        rightFoot:
          safeNum(
            messiData
              ?.right_foot_goals
          ),

        outsideBox:
          safeNum(
            messiData
              ?.outside_box_goals
          ),
      }


      /* =====================================================
         NORMALIZE RONALDO
      ===================================================== */

      const ronaldo:
        PlayerStats = {

        goals:
          safeNum(
            ronaldoData
              ?.total_goals
          ),

        assists:
          safeNum(
            ronaldoData
              ?.total_assists
          ),

        games:
          safeNum(
            ronaldoData
              ?.total_games
          ),

        wins:
          safeNum(
            ronaldoData
              ?.total_wins
          ),

        draws:
          safeNum(
            ronaldoData
              ?.total_draws
          ),

        losses:
          safeNum(
            ronaldoData
              ?.total_losses
          ),

        minutes:
          safeNum(
            ronaldoData
              ?.total_minutes
          ),

        penaltiesScored:
          safeNum(
            ronaldoData
              ?.penalties_scored
          ),

        penaltiesMissed:
          safeNum(
            ronaldoData
              ?.penalties_missed
          ),

        freeKicks:
          safeNum(
            ronaldoData
              ?.free_kick_goals
          ),

        headers:
          safeNum(
            ronaldoData
              ?.header_goals
          ),

        leftFoot:
          safeNum(
            ronaldoData
              ?.left_foot_goals
          ),

        rightFoot:
          safeNum(
            ronaldoData
              ?.right_foot_goals
          ),

        outsideBox:
          safeNum(
            ronaldoData
              ?.outside_box_goals
          ),
      }


      /* =====================================================
         RETURN
      ===================================================== */

      return {

        props: {
          messi,
          ronaldo,
        },

        revalidate:
          60,
      }

    } catch (
      error
    ) {

      console.error(
        "FAQ page error:",
        error
      )


      return {

        props: {

          messi: {
            ...EMPTY_PLAYER,
          },

          ronaldo: {
            ...EMPTY_PLAYER,
          },
        },

        revalidate:
          60,
      }
    }
  }