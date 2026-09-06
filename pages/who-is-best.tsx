// pages/who-is-best.tsx

import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import {
  Trophy,
  Star,
  Award,
  TrendingUp,
  Target,
  Footprints,
  ArrowRight,
  Crown,
  Goal,
  Crosshair,
  Shield,
  Zap,
  BarChart3,
  Globe,
} from "lucide-react"


/* =========================================================
   TYPES
========================================================= */

interface ComparisonProps {
  messi: any
  ronaldo: any
}


/* =========================================================
   HELPERS
========================================================= */

function safeNum(value: any): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : 0
}


function safeRatio(
  value: number,
  total: number
): number {
  if (!total || total <= 0) return 0

  return value / total
}


function safePercent(
  value: number,
  total: number
): number {
  if (!total || total <= 0) return 0

  return (value / total) * 100
}


function comparisonBars(
  first: number,
  second: number
) {
  if (first === 0 && second === 0) {
    return {
      bar1: 50,
      bar2: 50,
    }
  }

  const max = Math.max(
    first,
    second,
    1
  )

  return {
    bar1:
      (first / max) *
      100,

    bar2:
      (second / max) *
      100,
  }
}


/* =========================================================
   PAGE
========================================================= */

export default function WhoIsBest({
  messi,
  ronaldo,
}: ComparisonProps) {

  /* =======================================================
     EMPTY DATA STATE
  ======================================================= */

  if (!messi || !ronaldo) {
    return (
      <Layout
        title="Messi vs Ronaldo: Who Is Better?"
        description="Compare Lionel Messi and Cristiano Ronaldo across career goals, assists, trophies, Champions League success, international football and individual awards."
      >
        <div className="flex items-center justify-center min-h-screen bg-black">

          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />

        </div>
      </Layout>
    )
  }


  /* =======================================================
     CORE CAREER STATS
  ======================================================= */

  const mG =
    safeNum(
      messi.total_goals
    )

  const rG =
    safeNum(
      ronaldo.total_goals
    )

  const mA =
    safeNum(
      messi.total_assists
    )

  const rA =
    safeNum(
      ronaldo.total_assists
    )

  const mGames =
    safeNum(
      messi.total_games
    )

  const rGames =
    safeNum(
      ronaldo.total_games
    )

  const mMins =
    safeNum(
      messi.total_minutes
    )

  const rMins =
    safeNum(
      ronaldo.total_minutes
    )

  const mWins =
    safeNum(
      messi.total_wins
    )

  const rWins =
    safeNum(
      ronaldo.total_wins
    )

  const mDraws =
    safeNum(
      messi.total_draws
    )

  const rDraws =
    safeNum(
      ronaldo.total_draws
    )

  const mLosses =
    safeNum(
      messi.total_losses
    )

  const rLosses =
    safeNum(
      ronaldo.total_losses
    )


  /* =======================================================
     PENALTIES
  ======================================================= */

  const mPenS =
    safeNum(
      messi.penalties_scored
    )

  const rPenS =
    safeNum(
      ronaldo.penalties_scored
    )

  const mPenM =
    safeNum(
      messi.penalties_missed
    )

  const rPenM =
    safeNum(
      ronaldo.penalties_missed
    )


  /* =======================================================
     FREE KICKS
  ======================================================= */

  const mFK =
    safeNum(
      messi.free_kick_goals
    )

  const rFK =
    safeNum(
      ronaldo.free_kick_goals
    )


  /* =======================================================
     BODY PART
  ======================================================= */

  const mLeft =
    safeNum(
      messi.left_foot_goals
    )

  const rLeft =
    safeNum(
      ronaldo.left_foot_goals
    )

  const mRight =
    safeNum(
      messi.right_foot_goals
    )

  const rRight =
    safeNum(
      ronaldo.right_foot_goals
    )

  const mHead =
    safeNum(
      messi.header_goals
    )

  const rHead =
    safeNum(
      ronaldo.header_goals
    )


  /* =======================================================
     GOAL LOCATION
  ======================================================= */

  const mOutside =
    safeNum(
      messi.outside_box_goals
    )

  const rOutside =
    safeNum(
      ronaldo.outside_box_goals
    )


  /* =======================================================
     DERIVED VALUES
  ======================================================= */

  const mGoalRate =
    safeRatio(
      mG,
      mGames
    )

  const rGoalRate =
    safeRatio(
      rG,
      rGames
    )

  const mAssistRate =
    safeRatio(
      mA,
      mGames
    )

  const rAssistRate =
    safeRatio(
      rA,
      rGames
    )

  const mGoalContributions =
    mG + mA

  const rGoalContributions =
    rG + rA


  const mMinutesPerGoal =
    mG > 0 && mMins > 0
      ? Math.round(
          mMins / mG
        )
      : 0

  const rMinutesPerGoal =
    rG > 0 && rMins > 0
      ? Math.round(
          rMins / rG
        )
      : 0


  const mPenaltyAttempts =
    mPenS + mPenM

  const rPenaltyAttempts =
    rPenS + rPenM


  const mPenConv =
    safePercent(
      mPenS,
      mPenaltyAttempts
    )

  const rPenConv =
    safePercent(
      rPenS,
      rPenaltyAttempts
    )


  const mWinRate =
    safePercent(
      mWins,
      mGames
    )

  const rWinRate =
    safePercent(
      rWins,
      rGames
    )


  const mHeaderPercent =
    safePercent(
      mHead,
      mG
    )

  const rHeaderPercent =
    safePercent(
      rHead,
      rG
    )


  const mWeakFootPercent =
    safePercent(
      mRight,
      mG
    )

  const rWeakFootPercent =
    safePercent(
      rLeft,
      rG
    )


  const mOutsidePercent =
    safePercent(
      mOutside,
      mG
    )

  const rOutsidePercent =
    safePercent(
      rOutside,
      rG
    )


  /* =======================================================
     VISUAL BAR VALUES
  ======================================================= */

  const goalBars =
    comparisonBars(
      mG,
      rG
    )

  const assistBars =
    comparisonBars(
      mA,
      rA
    )

  const penaltyBars =
    comparisonBars(
      mPenConv,
      rPenConv
    )

  const freeKickBars =
    comparisonBars(
      mFK,
      rFK
    )

  const headerBars =
    comparisonBars(
      mHead,
      rHead
    )

  const outsideBars =
    comparisonBars(
      mOutside,
      rOutside
    )

  const winRateBars =
    comparisonBars(
      mWinRate,
      rWinRate
    )


  /* =======================================================
     DYNAMIC CATEGORY WINNERS
  ======================================================= */

  const goalMessiWins =
    mG > rG

  const goalRonaldoWins =
    rG > mG

  const assistMessiWins =
    mA > rA

  const assistRonaldoWins =
    rA > mA

  const penaltyMessiWins =
    mPenConv >
    rPenConv

  const penaltyRonaldoWins =
    rPenConv >
    mPenConv

  const freeKickMessiWins =
    mFK > rFK

  const freeKickRonaldoWins =
    rFK > mFK

  const headerMessiWins =
    mHead > rHead

  const headerRonaldoWins =
    rHead > mHead

  const outsideMessiWins =
    mOutside > rOutside

  const outsideRonaldoWins =
    rOutside > mOutside

  const winRateMessiWins =
    mWinRate >
    rWinRate

  const winRateRonaldoWins =
    rWinRate >
    mWinRate


  /* =======================================================
     COMPARISON CATEGORIES

     Some historic competition/trophy values remain
     editorial data because this page currently fetches
     only the career_stats table.
  ======================================================= */

  const categories = [

    /* -----------------------------------------------------
       1. GOALSCORING
    ----------------------------------------------------- */

    {
      title:
        "Goalscoring",

      icon:
        Goal,

      messiMain:
        `${mG.toLocaleString()} goals`,

      ronaldoMain:
        `${rG.toLocaleString()} goals`,

      messiSub:
        `${mGoalRate.toFixed(2)} per game`,

      ronaldoSub:
        `${rGoalRate.toFixed(2)} per game`,

      messiDetail:
        mMinutesPerGoal > 0
          ? `Goal every ${mMinutesPerGoal} minutes`
          : "Minutes-per-goal unavailable",

      ronaldoDetail:
        rMinutesPerGoal > 0
          ? `Goal every ${rMinutesPerGoal} minutes`
          : "Minutes-per-goal unavailable",

      bar1:
        goalBars.bar1,

      bar2:
        goalBars.bar2,

      verdictText:
        `The current Mesnaldo career data gives Messi ${mG.toLocaleString()} goals and Ronaldo ${rG.toLocaleString()}. Ronaldo's case in this category is built around career scoring volume, while Messi's efficiency can be assessed through his ${mGoalRate.toFixed(2)} goals per game compared with Ronaldo's ${rGoalRate.toFixed(2)}. Raw totals and scoring rate answer slightly different questions, so both are worth considering.`,

      messiWins:
        goalMessiWins,

      ronaldoWins:
        goalRonaldoWins,
    },


    /* -----------------------------------------------------
       2. ASSISTS
    ----------------------------------------------------- */

    {
      title:
        "Assists & Creation",

      icon:
        TrendingUp,

      messiMain:
        `${mA.toLocaleString()} assists`,

      ronaldoMain:
        `${rA.toLocaleString()} assists`,

      messiSub:
        `${mAssistRate.toFixed(2)} per game`,

      ronaldoSub:
        `${rAssistRate.toFixed(2)} per game`,

      messiDetail:
        `${mGoalContributions.toLocaleString()} goal contributions`,

      ronaldoDetail:
        `${rGoalContributions.toLocaleString()} goal contributions`,

      bar1:
        assistBars.bar1,

      bar2:
        assistBars.bar2,

      verdictText:
        `This category measures direct creation. Messi currently has ${mA.toLocaleString()} assists in the career statistics used by this site, compared with Ronaldo's ${rA.toLocaleString()}. Combining goals and assists gives Messi ${mGoalContributions.toLocaleString()} recorded goal contributions and Ronaldo ${rGoalContributions.toLocaleString()}.`,

      messiWins:
        assistMessiWins,

      ronaldoWins:
        assistRonaldoWins,
    },


    /* -----------------------------------------------------
       3. CHAMPIONS LEAGUE
    ----------------------------------------------------- */

    {
      title:
        "Champions League",

      icon:
        Star,

      messiMain:
        "4 titles • 129 goals",

      ronaldoMain:
        "5 titles • 140 goals",

      messiSub:
        "Elite European record",

      ronaldoSub:
        "Historic scoring record",

      messiDetail:
        "Multiple title-winning campaigns",

      ronaldoDetail:
        "Five Champions League titles",

      bar1:
        80,

      bar2:
        100,

      verdictText:
        "The Champions League is one of Ronaldo's strongest categories. He finished his European Cup career with more goals and more titles than Messi. Messi's record remains historically elite, but Ronaldo holds the clearer numerical advantage in this competition.",

      messiWins:
        false,

      ronaldoWins:
        true,
    },


    /* -----------------------------------------------------
       4. INTERNATIONAL
    ----------------------------------------------------- */

    {
      title:
        "International Glory",

      icon:
        Trophy,

      messiMain:
        "World Cup • Copa América",

      ronaldoMain:
        "European Championship • Nations League",

      messiSub:
        "Major international honours",

      ronaldoSub:
        "Major European honours",

      messiDetail:
        "World Cup champion with Argentina",

      ronaldoDetail:
        "European champion with Portugal",

      bar1:
        100,

      bar2:
        75,

      verdictText:
        "Both players built major international careers. Messi's résumé includes the FIFA World Cup and Copa América, while Ronaldo's includes the UEFA European Championship and Nations League success. Because the World Cup carries unique historical weight, this comparison gives Messi the edge in international team honours.",

      messiWins:
        true,

      ronaldoWins:
        false,
    },


    /* -----------------------------------------------------
       5. INDIVIDUAL AWARDS
    ----------------------------------------------------- */

    {
      title:
        "Ballon d'Or & Individual Awards",

      icon:
        Award,

      messiMain:
        "8 Ballon d'Or",

      ronaldoMain:
        "5 Ballon d'Or",

      messiSub:
        "6 European Golden Shoes",

      ronaldoSub:
        "4 European Golden Shoes",

      messiDetail:
        "Record Ballon d'Or total",

      ronaldoDetail:
        "Five Ballon d'Or victories",

      bar1:
        100,

      bar2:
        62.5,

      verdictText:
        "Messi leads the Ballon d'Or comparison by eight wins to five. Ronaldo's five victories place him among the most decorated individual players in football history, but Messi has the stronger numerical record in the game's most famous individual award.",

      messiWins:
        true,

      ronaldoWins:
        false,
    },


    /* -----------------------------------------------------
       6. PENALTIES
    ----------------------------------------------------- */

    {
      title:
        "Penalty Expertise",

      icon:
        Crosshair,

      messiMain:
        `${mPenS.toLocaleString()} scored • ${mPenM.toLocaleString()} missed`,

      ronaldoMain:
        `${rPenS.toLocaleString()} scored • ${rPenM.toLocaleString()} missed`,

      messiSub:
        `${mPenConv.toFixed(1)}% conversion rate`,

      ronaldoSub:
        `${rPenConv.toFixed(1)}% conversion rate`,

      messiDetail:
        `${mPenaltyAttempts.toLocaleString()} recorded attempts`,

      ronaldoDetail:
        `${rPenaltyAttempts.toLocaleString()} recorded attempts`,

      bar1:
        penaltyBars.bar1,

      bar2:
        penaltyBars.bar2,

      verdictText:
        `From the penalty data currently stored on Mesnaldo, Messi has converted ${mPenConv.toFixed(1)}% of his recorded attempts while Ronaldo has converted ${rPenConv.toFixed(1)}%. Ronaldo has also taken substantially more penalties across his career, so this category considers both efficiency and volume.`,

      messiWins:
        penaltyMessiWins,

      ronaldoWins:
        penaltyRonaldoWins,
    },


    /* -----------------------------------------------------
       7. FREE KICKS
    ----------------------------------------------------- */

    {
      title:
        "Free Kick Mastery",

      icon:
        Zap,

      messiMain:
        `${mFK.toLocaleString()} free-kick goals`,

      ronaldoMain:
        `${rFK.toLocaleString()} free-kick goals`,

      messiSub:
        "Left-footed placement and curl",

      ronaldoSub:
        "Power and knuckleball technique",

      messiDetail:
        "Set-piece specialist",

      ronaldoDetail:
        "Set-piece specialist",

      bar1:
        freeKickBars.bar1,

      bar2:
        freeKickBars.bar2,

      verdictText:
        `The current database records ${mFK.toLocaleString()} direct free-kick goals for Messi and ${rFK.toLocaleString()} for Ronaldo. Both developed very different set-piece techniques: Messi became known for curl and placement, while Ronaldo became famous for powerful and dipping strikes.`,

      messiWins:
        freeKickMessiWins,

      ronaldoWins:
        freeKickRonaldoWins,
    },


    /* -----------------------------------------------------
       8. HEADERS
    ----------------------------------------------------- */

    {
      title:
        "Aerial Dominance",

      icon:
        Shield,

      messiMain:
        `${mHead.toLocaleString()} headed goals`,

      ronaldoMain:
        `${rHead.toLocaleString()} headed goals`,

      messiSub:
        `${mHeaderPercent.toFixed(1)}% of goals`,

      ronaldoSub:
        `${rHeaderPercent.toFixed(1)}% of goals`,

      messiDetail:
        "Strong movement despite smaller stature",

      ronaldoDetail:
        "Elite leap, timing and aerial power",

      bar1:
        headerBars.bar1,

      bar2:
        headerBars.bar2,

      verdictText:
        `Aerial scoring strongly favours Ronaldo in the current data. Messi has ${mHead.toLocaleString()} recorded headed goals, while Ronaldo has ${rHead.toLocaleString()}. Ronaldo's height, timing, movement and jumping ability made heading a much larger part of his scoring profile.`,

      messiWins:
        headerMessiWins,

      ronaldoWins:
        headerRonaldoWins,
    },


    /* -----------------------------------------------------
       9. FOOT VARIETY
    ----------------------------------------------------- */

    {
      title:
        "Foot Variety",

      icon:
        Footprints,

      messiMain:
        `Left: ${mLeft.toLocaleString()} • Right: ${mRight.toLocaleString()}`,

      ronaldoMain:
        `Left: ${rLeft.toLocaleString()} • Right: ${rRight.toLocaleString()}`,

      messiSub:
        `${mWeakFootPercent.toFixed(1)}% with right foot`,

      ronaldoSub:
        `${rWeakFootPercent.toFixed(1)}% with left foot`,

      messiDetail:
        "Dominant left-foot scoring profile",

      ronaldoDetail:
        "More balanced two-footed scoring profile",

      bar1:
        100,

      bar2:
        100,

      verdictText:
        "Messi's left foot is the dominant weapon in his scoring profile, while Ronaldo has traditionally produced a greater share of goals with his weaker foot. This category highlights two different strengths rather than providing a simple overall winner.",

      messiWins:
        false,

      ronaldoWins:
        false,
    },


    /* -----------------------------------------------------
       10. OUTSIDE BOX
    ----------------------------------------------------- */

    {
      title:
        "Long-Range Shooting",

      icon:
        Target,

      messiMain:
        `${mOutside.toLocaleString()} outside-box goals`,

      ronaldoMain:
        `${rOutside.toLocaleString()} outside-box goals`,

      messiSub:
        `${mOutsidePercent.toFixed(1)}% of total goals`,

      ronaldoSub:
        `${rOutsidePercent.toFixed(1)}% of total goals`,

      messiDetail:
        "Placement and curled finishes",

      ronaldoDetail:
        "Powerful long-range shooting",

      bar1:
        outsideBars.bar1,

      bar2:
        outsideBars.bar2,

      verdictText:
        `The current data records ${mOutside.toLocaleString()} outside-the-box goals for Messi and ${rOutside.toLocaleString()} for Ronaldo. Messi often relies on placement and curl, while Ronaldo's long-range reputation was built heavily around power and striking technique.`,

      messiWins:
        outsideMessiWins,

      ronaldoWins:
        outsideRonaldoWins,
    },


    /* -----------------------------------------------------
       11. WIN RATE
    ----------------------------------------------------- */

    {
      title:
        "Win Rate & Consistency",

      icon:
        BarChart3,

      messiMain:
        `${mWins.toLocaleString()} wins in ${mGames.toLocaleString()} games`,

      ronaldoMain:
        `${rWins.toLocaleString()} wins in ${rGames.toLocaleString()} games`,

      messiSub:
        `${mWinRate.toFixed(1)}% win rate`,

      ronaldoSub:
        `${rWinRate.toFixed(1)}% win rate`,

      messiDetail:
        `${mDraws.toLocaleString()} draws • ${mLosses.toLocaleString()} losses`,

      ronaldoDetail:
        `${rDraws.toLocaleString()} draws • ${rLosses.toLocaleString()} losses`,

      bar1:
        winRateBars.bar1,

      bar2:
        winRateBars.bar2,

      verdictText:
        `The current career records give Messi a ${mWinRate.toFixed(1)}% win rate and Ronaldo a ${rWinRate.toFixed(1)}% win rate. Win percentage is partly influenced by team quality and competition level, so it should be treated as supporting context rather than a purely individual performance statistic.`,

      messiWins:
        winRateMessiWins,

      ronaldoWins:
        winRateRonaldoWins,
    },


    /* -----------------------------------------------------
       12. LEAGUE VERSATILITY
    ----------------------------------------------------- */

    {
      title:
        "League Versatility",

      icon:
        Globe,

      messiMain:
        "Spain • France • USA",

      ronaldoMain:
        "Portugal • England • Spain • Italy • Saudi Arabia",

      messiSub:
        "Barcelona, PSG and Inter Miami",

      ronaldoSub:
        "Sporting, United, Madrid, Juventus and Al Nassr",

      messiDetail:
        "Long-term dominance in La Liga",

      ronaldoDetail:
        "Success across several league environments",

      bar1:
        100,

      bar2:
        100,

      verdictText:
        "Messi spent the largest part of his club career building extraordinary continuity at Barcelona before later playing in France and the United States. Ronaldo moved through a wider range of domestic leagues and tactical environments. Messi offers greater continuity at one elite club, while Ronaldo offers broader league variety.",

      messiWins:
        false,

      ronaldoWins:
        false,
    },


    /* -----------------------------------------------------
       13. TEAM TROPHIES
    ----------------------------------------------------- */

    {
      title:
        "Overall Team Trophies",

      icon:
        Crown,

      messiMain:
        "48 configured trophies",

      ronaldoMain:
        "37 configured trophies",

      messiSub:
        "Includes club and international team honours",

      ronaldoSub:
        "Includes club and international team honours",

      messiDetail:
        "Higher total in current Mesnaldo trophy data",

      ronaldoDetail:
        "Stronger Champions League title total",

      bar1:
        100,

      bar2:
        (37 / 48) *
        100,

      verdictText:
        "Using the trophy totals currently configured on Mesnaldo, Messi leads Ronaldo in overall team trophies. Ronaldo holds the advantage in Champions League titles, while Messi's wider team-honour total is higher. Trophy counting can vary by methodology, so the individual competitions should also be examined.",

      messiWins:
        true,

      ronaldoWins:
        false,
    },
  ]


  /* =======================================================
     SCOREBOARD
  ======================================================= */

  const messiWins =
    categories.filter(
      (category) =>
        category.messiWins
    ).length

  const ronaldoWins =
    categories.filter(
      (category) =>
        category.ronaldoWins
    ).length

  const tied =
    categories.filter(
      (category) =>
        !category.messiWins &&
        !category.ronaldoWins
    ).length


  /* =======================================================
     OVERALL DYNAMIC COMPARISON VALUES
  ======================================================= */

  const goalDifference =
    Math.abs(
      mG - rG
    )

  const assistDifference =
    Math.abs(
      mA - rA
    )

  const contributionDifference =
    Math.abs(
      mGoalContributions -
      rGoalContributions
    )


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Layout
      title="Messi vs Ronaldo: Who Is Better? 13 Categories Compared"
      description="Messi vs Ronaldo: who is better? Compare Lionel Messi and Cristiano Ronaldo across goals, assists, Champions League, international success, Ballon d'Or awards, penalties, free kicks, headers, trophies and more."
    >
      <div className="bg-black min-h-screen">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12">


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="text-center">

            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
              The Ultimate Debate
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">

              Messi vs Ronaldo: Who is the{" "}

              <span className="text-amber-400">
                Best
              </span>
              ?

            </h1>

            <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">

              Lionel Messi and Cristiano Ronaldo have been
              compared for more than a generation. Instead
              of trying to settle the debate with one
              statistic, this page compares them across{" "}

              <strong className="text-white">
                {categories.length} categories
              </strong>

              , including goals, assists, Champions League
              performance, international achievements,
              individual awards, penalties, free kicks,
              headers, win rate and trophies.

            </p>

          </div>


          {/* =================================================
              SCOREBOARD
          ================================================= */}

          <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-amber-400 to-red-500" />

            <div className="grid grid-cols-3 items-center text-center">


              {/* MESSI */}

              <div>

                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-3">

                  <Image
                    src="/images/messi.webp"
                    alt="Lionel Messi"
                    fill
                    priority
                    className="object-cover"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Messi leads in
                </p>

                <p className="text-2xl sm:text-3xl font-black text-blue-400">
                  {messiWins}
                </p>

                <p className="text-[10px] text-gray-600">
                  of {categories.length} categories
                </p>

              </div>


              {/* VS */}

              <div>

                <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mx-auto" />

                <p className="text-lg sm:text-xl font-black text-white mt-2">
                  VS
                </p>

              </div>


              {/* RONALDO */}

              <div>

                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-3">

                  <Image
                    src="/images/ronaldo.webp"
                    alt="Cristiano Ronaldo"
                    fill
                    priority
                    className="object-cover"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Ronaldo leads in
                </p>

                <p className="text-2xl sm:text-3xl font-black text-red-400">
                  {ronaldoWins}
                </p>

                <p className="text-[10px] text-gray-600">
                  of {categories.length} categories
                </p>

              </div>

            </div>


            {tied > 0 && (

              <p className="text-center text-xs text-gray-500 mt-4">

                {tied}{" "}

                {tied === 1
                  ? "category is"
                  : "categories are"}{" "}

                too close to call

              </p>

            )}

          </div>


          {/* =================================================
              CATEGORY CARDS
          ================================================= */}

          <div className="space-y-4">

            {categories.map(
              (
                category,
                i
              ) => {

                const combinedBar =
                  category.bar1 +
                  category.bar2

                const messiBarWidth =
                  combinedBar > 0
                    ? (
                        category.bar1 /
                        combinedBar
                      ) *
                      100
                    : 50

                const ronaldoBarWidth =
                  combinedBar > 0
                    ? (
                        category.bar2 /
                        combinedBar
                      ) *
                      100
                    : 50


                return (

                  <motion.div
                    key={
                      category.title
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
                        i *
                        0.03,
                    }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6 hover:border-gray-600/70 transition-colors"
                  >


                    {/* CATEGORY HEADER */}

                    <div className="flex items-center gap-4 mb-4">

                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">

                        <category.icon className="w-5 h-5 text-amber-400" />

                      </div>

                      <h2 className="text-lg font-bold text-white">
                        {category.title}
                      </h2>


                      <div className="ml-auto flex items-center gap-2">

                        {category.messiWins && (

                          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-medium">
                            Messi
                          </span>

                        )}


                        {category.ronaldoWins && (

                          <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-medium">
                            Ronaldo
                          </span>

                        )}


                        {!category.messiWins &&
                          !category.ronaldoWins && (

                          <span className="text-[10px] bg-gray-500/10 text-gray-400 border border-gray-500/20 px-2.5 py-1 rounded-full font-medium">
                            Tie
                          </span>

                        )}

                      </div>

                    </div>


                    {/* PLAYER COMPARISON */}

                    <div className="grid grid-cols-2 gap-4 mb-4">


                      {/* MESSI */}

                      <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">

                        <div className="flex items-center gap-2 mb-2">

                          <Image
                            src="/images/messi.webp"
                            alt="Lionel Messi"
                            width={20}
                            height={20}
                            className="rounded-full"
                          />

                          <p className="text-xs font-bold text-blue-400">
                            Messi
                          </p>

                        </div>

                        <p className="text-sm font-bold text-white">
                          {category.messiMain}
                        </p>

                        <p className="text-[10px] text-gray-500 mt-1">
                          {category.messiSub}
                        </p>

                        <p className="text-[10px] text-gray-600 mt-0.5">
                          {category.messiDetail}
                        </p>

                      </div>


                      {/* RONALDO */}

                      <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10">

                        <div className="flex items-center gap-2 mb-2">

                          <Image
                            src="/images/ronaldo.webp"
                            alt="Cristiano Ronaldo"
                            width={20}
                            height={20}
                            className="rounded-full"
                          />

                          <p className="text-xs font-bold text-red-400">
                            Ronaldo
                          </p>

                        </div>

                        <p className="text-sm font-bold text-white">
                          {category.ronaldoMain}
                        </p>

                        <p className="text-[10px] text-gray-500 mt-1">
                          {category.ronaldoSub}
                        </p>

                        <p className="text-[10px] text-gray-600 mt-0.5">
                          {category.ronaldoDetail}
                        </p>

                      </div>

                    </div>


                    {/* VISUAL BAR */}

                    <div className="flex items-center gap-2 mb-3">

                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width:
                              `${messiBarWidth}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.8,
                          }}
                          className="h-full bg-blue-500"
                        />

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width:
                              `${ronaldoBarWidth}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2,
                          }}
                          className="h-full bg-red-500"
                        />

                      </div>

                    </div>


                    {/* VERDICT */}

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {category.verdictText}
                    </p>

                  </motion.div>

                )
              }
            )}

          </div>


          {/* =================================================
              FINAL VERDICT
          ================================================= */}

          <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-8 sm:p-10 text-center">

            <Crown className="w-10 h-10 text-amber-400 mx-auto mb-4" />

            <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
              The Final Verdict
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto mb-3">

              In this{" "}

              {categories.length}
              -category comparison, Messi leads in{" "}

              <strong className="text-blue-400">
                {messiWins}
              </strong>{" "}

              categories, Ronaldo leads in{" "}

              <strong className="text-red-400">
                {ronaldoWins}
              </strong>

              , and{" "}

              <strong className="text-white">
                {tied}
              </strong>{" "}

              {tied === 1
                ? "category is"
                : "categories are"}{" "}

              treated as ties.

            </p>

            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto mb-6">

              The result should not be treated as a mathematical
              proof of who is the greatest footballer. Each
              category measures something different and the
              importance given to goals, creativity, trophies,
              international success, longevity or individual
              awards depends on what a supporter values most.
              Messi and Ronaldo built historically great careers
              in different ways.

            </p>


            <div className="flex flex-wrap items-center justify-center gap-3">

              <Link
                href="/poll"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-bold hover:bg-amber-500/20 transition-colors"
              >
                Cast Your Vote

                <ArrowRight className="w-4 h-4" />

              </Link>


              <Link
                href="/goals"
                className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors"
              >
                Compare Goals
              </Link>


              <Link
                href="/trophies"
                className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors"
              >
                Compare Trophies
              </Link>

            </div>

          </div>


          {/* =================================================
              LONG SEO CONTENT
          ================================================= */}

          <section className="mt-20 pt-14 border-t border-gray-800/50">

            <div className="max-w-4xl mx-auto">

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
                Messi vs Ronaldo: Who Is Better?
              </h2>


              <div className="space-y-7 text-sm text-gray-400 leading-8">


                {/* INTRODUCTION */}

                <p>

                  The{" "}

                  <strong className="text-white">
                    Messi vs Ronaldo GOAT debate
                  </strong>{" "}

                  has lasted for much of the modern football era.
                  Lionel Messi and Cristiano Ronaldo dominated
                  goalscoring charts, major competitions,
                  individual awards and football discussions for
                  years, but determining who is better depends
                  heavily on which parts of football performance
                  are considered most important.

                </p>


                <p>

                  This page compares Messi and Ronaldo across{" "}

                  <strong className="text-white">
                    {categories.length} different categories
                  </strong>

                  . Rather than judging the debate from career
                  goals alone, the comparison also considers
                  assists, efficiency, Champions League success,
                  international achievements, Ballon d&apos;Or
                  awards, penalties, free kicks, headers,
                  long-range goals, win rate, league experience
                  and overall team trophies.

                </p>


                {/* CAREER NUMBERS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Career Statistics
                </h3>

                <p>

                  The career statistics currently used by
                  Mesnaldo record{" "}

                  <strong className="text-blue-400">
                    {mG.toLocaleString()}
                  </strong>{" "}

                  goals for Lionel Messi and{" "}

                  <strong className="text-red-400">
                    {rG.toLocaleString()}
                  </strong>{" "}

                  for Cristiano Ronaldo.

                </p>


                <p>

                  Messi has{" "}

                  <strong className="text-blue-400">
                    {mA.toLocaleString()}
                  </strong>{" "}

                  recorded assists, while Ronaldo has{" "}

                  <strong className="text-red-400">
                    {rA.toLocaleString()}
                  </strong>

                  . Their total recorded goal contributions are
                  therefore{" "}

                  <strong className="text-blue-400">
                    {mGoalContributions.toLocaleString()}
                  </strong>{" "}

                  for Messi and{" "}

                  <strong className="text-red-400">
                    {rGoalContributions.toLocaleString()}
                  </strong>{" "}

                  for Ronaldo.

                </p>


                {/* GOALS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Who Has More Goals: Messi or Ronaldo?
                </h3>

                <p>

                  According to the career totals currently used
                  on this page,{" "}

                  {mG > rG ? (
                    <>
                      Messi leads Ronaldo by{" "}
                      <strong className="text-white">
                        {goalDifference.toLocaleString()}
                      </strong>{" "}
                      goals.
                    </>
                  ) : rG > mG ? (
                    <>
                      Ronaldo leads Messi by{" "}
                      <strong className="text-white">
                        {goalDifference.toLocaleString()}
                      </strong>{" "}
                      goals.
                    </>
                  ) : (
                    <>
                      Messi and Ronaldo currently have the same
                      recorded career goal total.
                    </>
                  )}

                </p>


                <p>

                  Career goals reward both scoring ability and
                  longevity. A player who plays more matches has
                  more opportunities to increase his total, which
                  is why goals per game provides additional
                  context.

                </p>


                {/* EFFICIENCY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Goals Per Game
                </h3>

                <p>

                  Messi currently averages{" "}

                  <strong className="text-blue-400">
                    {mGoalRate.toFixed(3)}
                  </strong>{" "}

                  goals per recorded match, while Ronaldo
                  averages{" "}

                  <strong className="text-red-400">
                    {rGoalRate.toFixed(3)}
                  </strong>

                  .

                </p>


                <p>

                  Goals per game measures scoring efficiency
                  differently from the total goal count. Career
                  totals reward volume and longevity, while
                  scoring rate shows how frequently a player
                  scores relative to appearances.

                </p>


                {/* ASSISTS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Who Has More Assists: Messi or Ronaldo?
                </h3>

                <p>

                  Messi currently has{" "}

                  <strong className="text-blue-400">
                    {mA.toLocaleString()}
                  </strong>{" "}

                  recorded assists compared with Ronaldo&apos;s{" "}

                  <strong className="text-red-400">
                    {rA.toLocaleString()}
                  </strong>

                  .

                </p>


                {mA !== rA && (

                  <p>

                    The difference is{" "}

                    <strong className="text-white">
                      {assistDifference.toLocaleString()}
                    </strong>{" "}

                    assists.

                  </p>

                )}


                <p>

                  This is one of the categories that highlights
                  the difference between their attacking roles.
                  Messi has frequently operated as both a scorer
                  and primary creator, while Ronaldo&apos;s
                  evolution increasingly focused on movement,
                  finishing and occupying dangerous scoring
                  positions.

                </p>


                {/* GOAL CONTRIBUTIONS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Goal Contributions
                </h3>

                <p>

                  Combining goals and assists gives Messi{" "}

                  <strong className="text-blue-400">
                    {mGoalContributions.toLocaleString()}
                  </strong>{" "}

                  recorded goal contributions and Ronaldo{" "}

                  <strong className="text-red-400">
                    {rGoalContributions.toLocaleString()}
                  </strong>

                  .

                </p>


                {mGoalContributions !== rGoalContributions && (

                  <p>

                    The difference between their current
                    goals-plus-assists totals is{" "}

                    <strong className="text-white">
                      {contributionDifference.toLocaleString()}
                    </strong>

                    .

                  </p>

                )}


                {/* CHAMPIONS LEAGUE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo in the Champions League
                </h3>

                <p>

                  The UEFA Champions League is one of
                  Ronaldo&apos;s strongest areas in the debate.
                  He won five Champions League titles and
                  finished his career in the competition with a
                  higher goal total than Messi.

                </p>


                <p>

                  Messi also built one of the greatest Champions
                  League careers ever, winning the competition
                  four times and producing an elite scoring
                  record. The difference is that Ronaldo holds
                  the clearer advantage in both Champions League
                  goals and titles.

                </p>


                <p>

                  For a more focused comparison, visit the{" "}

                  <Link
                    href="/goals"
                    className="text-amber-400 hover:underline"
                  >
                    Messi vs Ronaldo goals comparison
                  </Link>

                  .

                </p>


                {/* INTERNATIONAL */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo International Career
                </h3>

                <p>

                  International football produces another major
                  contrast. Messi&apos;s Argentina career
                  includes the FIFA World Cup and Copa América,
                  while Ronaldo&apos;s Portugal career includes
                  the UEFA European Championship and Nations
                  League success.

                </p>


                <p>

                  Ronaldo&apos;s international case is strongly
                  connected with scoring volume and longevity.
                  Messi&apos;s case combines international
                  production with the World Cup, which carries
                  exceptional historical significance when
                  careers are compared.

                </p>


                {/* BALLON D'OR */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Ballon d&apos;Or
                </h3>

                <p>

                  Messi has won the Ballon d&apos;Or eight times,
                  while Ronaldo has won it five times. Both totals
                  are extraordinary, but Messi holds the record
                  advantage in this category.

                </p>


                <p>

                  Individual awards are useful evidence of how
                  players were evaluated during their careers,
                  but they should not be treated as the only
                  measurement of football performance.

                </p>


                <Link
                  href="/honours"
                  className="inline-block text-amber-400 hover:underline"
                >
                  View the full individual awards comparison →
                </Link>


                {/* PENALTIES */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Penalties
                </h3>

                <p>

                  The current data records{" "}

                  <strong className="text-blue-400">
                    {mPenS.toLocaleString()}
                  </strong>{" "}

                  scored penalties for Messi from{" "}

                  <strong className="text-white">
                    {mPenaltyAttempts.toLocaleString()}
                  </strong>{" "}

                  recorded attempts.

                </p>


                <p>

                  Ronaldo has{" "}

                  <strong className="text-red-400">
                    {rPenS.toLocaleString()}
                  </strong>{" "}

                  scored penalties from{" "}

                  <strong className="text-white">
                    {rPenaltyAttempts.toLocaleString()}
                  </strong>{" "}

                  recorded attempts.

                </p>


                <p>

                  This produces a conversion rate of{" "}

                  <strong className="text-blue-400">
                    {mPenConv.toFixed(1)}%
                  </strong>{" "}

                  for Messi and{" "}

                  <strong className="text-red-400">
                    {rPenConv.toFixed(1)}%
                  </strong>{" "}

                  for Ronaldo in the current database.

                </p>


                {/* FREE KICKS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Free-Kick Goals
                </h3>

                <p>

                  The career statistics currently contain{" "}

                  <strong className="text-blue-400">
                    {mFK.toLocaleString()}
                  </strong>{" "}

                  free-kick goals for Messi and{" "}

                  <strong className="text-red-400">
                    {rFK.toLocaleString()}
                  </strong>{" "}

                  for Ronaldo.

                </p>


                <p>

                  Their techniques were very different.
                  Ronaldo&apos;s early free kicks became famous
                  for power, dip and the knuckleball technique,
                  while Messi developed into a specialist in
                  placement, curl and accuracy over defensive
                  walls.

                </p>


                {/* HEADERS */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Headers
                </h3>

                <p>

                  Heading is one of the clearest stylistic
                  differences between the two players. The
                  current data gives Messi{" "}

                  <strong className="text-blue-400">
                    {mHead.toLocaleString()}
                  </strong>{" "}

                  headed goals and Ronaldo{" "}

                  <strong className="text-red-400">
                    {rHead.toLocaleString()}
                  </strong>

                  .

                </p>


                <p>

                  Ronaldo&apos;s greater height, jumping ability,
                  timing and movement in the penalty area made
                  aerial finishing a far more significant part of
                  his scoring profile.

                </p>


                {/* FOOT */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi Left Foot vs Ronaldo Right Foot
                </h3>

                <p>

                  Messi&apos;s scoring profile is dominated by
                  his left foot. Ronaldo&apos;s preferred foot is
                  his right, although his career shows a greater
                  proportion of scoring with his weaker foot.

                </p>


                <p>

                  The current data records{" "}

                  <strong className="text-blue-400">
                    {mLeft.toLocaleString()}
                  </strong>{" "}

                  Messi goals with his left foot and{" "}

                  <strong className="text-red-400">
                    {rRight.toLocaleString()}
                  </strong>{" "}

                  Ronaldo goals with his right.

                </p>


                {/* LONG RANGE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Long-Range Goals
                </h3>

                <p>

                  The database currently records{" "}

                  <strong className="text-blue-400">
                    {mOutside.toLocaleString()}
                  </strong>{" "}

                  outside-the-box goals for Messi and{" "}

                  <strong className="text-red-400">
                    {rOutside.toLocaleString()}
                  </strong>{" "}

                  for Ronaldo.

                </p>


                <p>

                  Messi&apos;s long-range goals are often
                  associated with curled placement, while Ronaldo
                  produced many of his most memorable long-range
                  strikes through power and direct shooting.

                </p>


                {/* WIN RATE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Career Win Rate
                </h3>

                <p>

                  Messi&apos;s current career data shows{" "}

                  <strong className="text-blue-400">
                    {mWins.toLocaleString()}
                  </strong>{" "}

                  wins from{" "}

                  <strong className="text-white">
                    {mGames.toLocaleString()}
                  </strong>{" "}

                  matches, producing a{" "}

                  <strong className="text-blue-400">
                    {mWinRate.toFixed(1)}%
                  </strong>{" "}

                  win rate.

                </p>


                <p>

                  Ronaldo has{" "}

                  <strong className="text-red-400">
                    {rWins.toLocaleString()}
                  </strong>{" "}

                  wins from{" "}

                  <strong className="text-white">
                    {rGames.toLocaleString()}
                  </strong>{" "}

                  matches, producing a{" "}

                  <strong className="text-red-400">
                    {rWinRate.toFixed(1)}%
                  </strong>{" "}

                  win rate.

                </p>


                <p>

                  Win rate depends heavily on the strength of
                  teammates, opposition, competition and club
                  environment, so it should not be interpreted as
                  a purely individual statistic.

                </p>


                {/* LEAGUE DIFFERENCE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Across Different Leagues
                </h3>

                <p>

                  Messi spent the defining part of his club
                  career at Barcelona before later playing for
                  Paris Saint-Germain and Inter Miami. That gives
                  his career a strong foundation of continuity,
                  especially in La Liga.

                </p>


                <p>

                  Ronaldo&apos;s career moved through Sporting
                  CP, Manchester United, Real Madrid, Juventus and
                  Al Nassr. This gives him experience across more
                  domestic league systems and tactical
                  environments.

                </p>


                <p>

                  Neither path automatically proves superiority.
                  Messi&apos;s case emphasises extraordinarily
                  deep dominance in one primary environment,
                  while Ronaldo&apos;s case emphasises adaptation
                  across a wider number of leagues.

                </p>


                {/* TROPHIES */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Who Has More Trophies: Messi or Ronaldo?
                </h3>

                <p>

                  In the trophy totals currently configured on
                  Mesnaldo, Messi has{" "}

                  <strong className="text-blue-400">
                    48
                  </strong>{" "}

                  team trophies and Ronaldo has{" "}

                  <strong className="text-red-400">
                    37
                  </strong>

                  .

                </p>


                <p>

                  Trophy totals can depend on methodology,
                  particularly around smaller or non-standard
                  competitions. The individual competitions
                  should therefore be checked instead of relying
                  only on the final total.

                </p>


                <Link
                  href="/trophies"
                  className="inline-block text-amber-400 hover:underline"
                >
                  Compare Messi and Ronaldo trophies →
                </Link>


                {/* PLAYING STYLE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Playing Style
                </h3>

                <p>

                  Their statistical differences are connected
                  closely to their playing styles. Messi has
                  frequently combined scoring with ball
                  progression, passing, chance creation and
                  dribbling. At different points he has played as
                  a winger, false nine, central attacker and
                  creative playmaker.

                </p>


                <p>

                  Ronaldo&apos;s career evolved from a
                  dribble-heavy wide attacker into a more direct
                  and specialised goalscorer. Movement,
                  finishing, aerial ability and positioning in
                  the penalty area became increasingly important
                  parts of his game.

                </p>


                <p>

                  That difference explains why Messi tends to
                  have the stronger assist and creative profile,
                  while Ronaldo performs especially strongly in
                  career scoring volume, aerial goals and certain
                  Champions League measures.

                </p>


                {/* LONGEVITY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Longevity
                </h3>

                <p>

                  Both players demonstrated exceptional
                  longevity. Maintaining elite-level output over
                  so many seasons is a major reason their career
                  totals reached levels that were previously
                  difficult to imagine.

                </p>


                <p>

                  Ronaldo&apos;s career contains more recorded
                  appearances in the current data, while Messi
                  has remained exceptionally productive across
                  his own long career. Comparing total games with
                  goals-per-game and assists-per-game helps
                  separate longevity from efficiency.

                </p>


                {/* WHO IS MORE COMPLETE */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Who Is the More Complete Player?
                </h3>

                <p>

                  The answer depends on what &quot;complete&quot;
                  means. If it means combining elite scoring with
                  passing, creation, dribbling and playmaking,
                  Messi has a particularly strong case.

                </p>


                <p>

                  If completeness is interpreted as scoring in
                  different ways, playing across numerous league
                  environments, producing exceptional aerial
                  numbers and sustaining huge scoring totals over
                  a longer match volume, Ronaldo has a strong
                  case of his own.

                </p>


                <p>

                  This is why reducing the comparison to one
                  number usually produces a weak answer. Their
                  careers overlap, but their strongest qualities
                  are not identical.

                </p>


                {/* HEAD TO HEAD */}

                <h3 className="text-xl font-bold text-white mt-10">
                  Messi vs Ronaldo Head to Head
                </h3>

                <p>

                  Another way to examine the rivalry is through
                  matches in which Messi and Ronaldo directly
                  faced each other.

                </p>


                <p>

                  The Mesnaldo head-to-head page compares the
                  direct meetings available in the database,
                  including wins, draws, goals, assists and
                  match-by-match results.

                </p>


                <Link
                  href="/head-to-head"
                  className="inline-block text-amber-400 hover:underline"
                >
                  View Messi vs Ronaldo head-to-head →
                </Link>


                {/* METHODOLOGY */}

                <h3 className="text-xl font-bold text-white mt-10">
                  How Mesnaldo Compares Messi and Ronaldo
                </h3>

                <p>

                  The dynamic career values used on this page
                  come from the Mesnaldo career statistics
                  dataset. This includes career goals, assists,
                  appearances, minutes, wins, draws, losses,
                  penalties, free kicks and several scoring
                  breakdowns.

                </p>


                <p>

                  Some competition and honour categories use
                  editorial career values because the current
                  `career_stats` table does not contain every
                  trophy and competition statistic required for
                  those sections.

                </p>


                <p>

                  Football statistics can differ between data
                  providers, particularly historical assist
                  totals and the classification of some
                  competitions. For that reason, comparisons
                  should always be interpreted according to the
                  methodology of the dataset being used.

                </p>


                {/* FAQ */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Messi vs Ronaldo FAQ
                </h2>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who is better, Messi or Ronaldo?
                </h3>

                <p>

                  There is no objective formula that can
                  definitively answer the question. Messi leads
                  several creative, individual-award and overall
                  trophy measures, while Ronaldo leads or
                  performs especially strongly in career scoring
                  volume, aerial scoring and Champions League
                  history. The answer depends on which
                  achievements and qualities are valued most.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more career goals?
                </h3>

                <p>

                  The current Mesnaldo career data shows Messi
                  with{" "}

                  <strong className="text-blue-400">
                    {mG.toLocaleString()}
                  </strong>{" "}

                  goals and Ronaldo with{" "}

                  <strong className="text-red-400">
                    {rG.toLocaleString()}
                  </strong>

                  .

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more career assists?
                </h3>

                <p>

                  Messi currently has{" "}

                  <strong className="text-blue-400">
                    {mA.toLocaleString()}
                  </strong>{" "}

                  recorded assists, while Ronaldo has{" "}

                  <strong className="text-red-400">
                    {rA.toLocaleString()}
                  </strong>

                  .

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more goal contributions?
                </h3>

                <p>

                  Messi currently has{" "}

                  <strong className="text-blue-400">
                    {mGoalContributions.toLocaleString()}
                  </strong>{" "}

                  combined goals and assists, compared with
                  Ronaldo&apos;s{" "}

                  <strong className="text-red-400">
                    {rGoalContributions.toLocaleString()}
                  </strong>

                  .

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more Ballon d&apos;Or awards?
                </h3>

                <p>

                  Messi has eight Ballon d&apos;Or wins, while
                  Ronaldo has five.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more Champions League titles?
                </h3>

                <p>

                  Ronaldo won five Champions League titles,
                  while Messi won four.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who is better at headers?
                </h3>

                <p>

                  Ronaldo has the stronger aerial scoring record.
                  The current database contains{" "}

                  <strong className="text-red-400">
                    {rHead.toLocaleString()}
                  </strong>{" "}

                  Ronaldo headed goals compared with{" "}

                  <strong className="text-blue-400">
                    {mHead.toLocaleString()}
                  </strong>{" "}

                  for Messi.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more free-kick goals?
                </h3>

                <p>

                  The current Mesnaldo statistics record{" "}

                  <strong className="text-blue-400">
                    {mFK.toLocaleString()}
                  </strong>{" "}

                  free-kick goals for Messi and{" "}

                  <strong className="text-red-400">
                    {rFK.toLocaleString()}
                  </strong>{" "}

                  for Ronaldo.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Who has more trophies?
                </h3>

                <p>

                  Using the team-trophy totals currently
                  configured on Mesnaldo, Messi has 48 and
                  Ronaldo has 37. Trophy-counting methodology can
                  vary, so the detailed trophy page provides the
                  better comparison.

                </p>


                <h3 className="text-lg font-bold text-white mt-8">
                  Can I vote for Messi or Ronaldo?
                </h3>

                <p>

                  Yes. After reviewing the statistics and
                  categories on this page, visit the Mesnaldo
                  poll and choose which player you consider the
                  greatest.

                </p>


                <Link
                  href="/poll"
                  className="inline-flex items-center gap-2 text-amber-400 hover:underline font-medium"
                >
                  Vote in the Messi vs Ronaldo poll

                  <ArrowRight className="w-4 h-4" />
                </Link>


                {/* CONCLUSION */}

                <h2 className="text-2xl font-black text-white mt-14">
                  Messi or Ronaldo: The GOAT Debate
                </h2>

                <p>

                  Lionel Messi and Cristiano Ronaldo reached
                  extraordinary levels through different
                  footballing strengths. Messi&apos;s career
                  combines scoring with elite creativity,
                  dribbling and playmaking. Ronaldo&apos;s career
                  combines enormous scoring volume with aerial
                  dominance, movement, longevity and success
                  across several football environments.

                </p>


                <p>

                  Statistics can show who leads individual
                  categories, but they cannot decide how much
                  each category should matter. A supporter who
                  values creativity may reach a different
                  conclusion from someone who values scoring
                  volume, Champions League success or league
                  adaptability.

                </p>


                <p>

                  The most useful way to approach the Messi vs
                  Ronaldo debate is therefore not to search for
                  one perfect statistic. Compare the goals,
                  assists, efficiency, trophies, international
                  careers, individual awards and playing styles,
                  then decide which combination matters most to
                  you.

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
   SERVER-SIDE DATA
========================================================= */

export const getServerSideProps:
  GetServerSideProps =
  async () => {

    try {

      const {
        data: messi,
        error: messiError,
      } = await supabase
        .from("career_stats")
        .select("*")
        .eq(
          "player_id",
          1
        )
        .single()


      const {
        data: ronaldo,
        error: ronaldoError,
      } = await supabase
        .from("career_stats")
        .select("*")
        .eq(
          "player_id",
          2
        )
        .single()


      if (
        messiError ||
        ronaldoError
      ) {

        console.error(
          "Who-is-best data error:",
          {
            messiError,
            ronaldoError,
          }
        )

      }


      return {
        props: {
          messi:
            messi || {},

          ronaldo:
            ronaldo || {},
        },
      }

    } catch (
      error
    ) {

      console.error(
        "Who-is-best page error:",
        error
      )


      return {
        props: {
          messi: {},
          ronaldo: {},
        },
      }

    }
  }