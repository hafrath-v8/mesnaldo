// pages/head-to-head.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useMemo } from "react"

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

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  )
}

export default function HeadToHead({ matches }: H2HPageProps) {
  const [filter, setFilter] = useState<string>("all")

  const competitions = useMemo(() => {
    const comps = [...new Set(matches.map(m => m.competition).filter(Boolean))]
    return ["all", ...comps.sort()]
  }, [matches])

  const filteredMatches = useMemo(() => {
    if (filter === "all") return matches
    return matches.filter(m => m.competition === filter)
  }, [matches, filter])

  const stats = useMemo(() => {
    const total = filteredMatches.length
    const messiGoals = filteredMatches.reduce((s, m) => s + (m.messi_goals || 0), 0)
    const ronaldoGoals = filteredMatches.reduce((s, m) => s + (m.ronaldo_goals || 0), 0)
    const messiAssists = filteredMatches.reduce((s, m) => s + (m.messi_assists || 0), 0)
    const ronaldoAssists = filteredMatches.reduce((s, m) => s + (m.ronaldo_assists || 0), 0)

    const messiWins = filteredMatches.filter(m => {
      const messiScore = m.messi_team === m.messi_team ? m.team_score : m.opponent_score
      const ronaldoScore = m.messi_team === m.messi_team ? m.opponent_score : m.team_score
      // Simply check if team_score > opponent_score and messi_team is the one that scored more
      return m.team_score > m.opponent_score
    }).length

    const ronaldoWins = filteredMatches.filter(m => m.opponent_score > m.team_score).length
    const draws = total - messiWins - ronaldoWins

    return { total, messiGoals, ronaldoGoals, messiAssists, ronaldoAssists, messiWins, ronaldoWins, draws }
  }, [filteredMatches])

  // Group by year
  const byYear = useMemo(() => {
    const years: Record<string, H2HMatch[]> = {}
    filteredMatches.forEach(m => {
      const year = new Date(m.date).getFullYear().toString()
      if (!years[year]) years[year] = []
      years[year].push(m)
    })
    return Object.entries(years).sort(([a], [b]) => Number(b) - Number(a))
  }, [filteredMatches])

  return (
<Layout 
title="Messi vs Ronaldo Head to Head | Complete H2H Stats & Results"
  description="All 36 head-to-head matches between Messi and Ronaldo. El Clásico, Champions League, and international encounters compared.">     
   <div className="bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12 sm:space-y-16">

          {/* HEADER */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">El Clásico & More</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Head to <span className="text-amber-400">Head</span>
            </h1>
            <p className="text-gray-500 mt-3 text-sm">
              {stats.total} direct encounters between the two legends
            </p>
          </div>

          {/* ─── SCOREBOARD ─── */}
          <section>
            <div className={`${CARD_BASE} p-6 sm:p-8 lg:p-10`}>
              <div className="grid grid-cols-3 items-center">
                {/* Messi */}
                <div className="text-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-3 shadow-xl shadow-blue-500/20">
                    <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                  </div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400">{stats.messiWins}</p>
                  <p className="text-xs text-gray-500 mt-1">Wins</p>
                </div>

                {/* Center */}
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black text-amber-400">{stats.draws}</p>
                  <p className="text-xs text-gray-500 mt-1">Draws</p>
                  <p className="text-sm text-gray-400 mt-3">{stats.total} matches</p>
                </div>

                {/* Ronaldo */}
                <div className="text-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-3 shadow-xl shadow-red-500/20">
                    <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                  </div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-400">{stats.ronaldoWins}</p>
                  <p className="text-xs text-gray-500 mt-1">Wins</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stats.messiWins / stats.total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500 rounded-full" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stats.draws / stats.total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-amber-500" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stats.ronaldoWins / stats.total) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-red-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                <span>Messi {stats.messiWins}</span>
                <span>Draws {stats.draws}</span>
                <span>Ronaldo {stats.ronaldoWins}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-blue-400">{stats.messiGoals}</p>
                <p className="text-[10px] text-gray-500">Messi Goals</p>
              </div>
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-red-400">{stats.ronaldoGoals}</p>
                <p className="text-[10px] text-gray-500">Ronaldo Goals</p>
              </div>
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-blue-400">{stats.messiAssists}</p>
                <p className="text-[10px] text-gray-500">Messi Assists</p>
              </div>
              <div className={`${CARD_BASE} p-3 text-center`}>
                <p className="text-xl font-black text-red-400">{stats.ronaldoAssists}</p>
                <p className="text-[10px] text-gray-500">Ronaldo Assists</p>
              </div>
            </div>
          </section>

          {/* ─── MATCH LIST ─── */}
          <section>
            <SectionHeading title="All Encounters" subtitle={`${filteredMatches.length} matches`} />

            {/* Competition Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {competitions.map(comp => (
                <button key={comp} onClick={() => setFilter(comp)}
                  className={`px-4 py-2 text-xs rounded-full transition-all font-medium ${filter === comp ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                  {comp === "all" ? "All" : comp}
                </button>
              ))}
            </div>

            {/* Matches by Year */}
            {byYear.length === 0 ? (
              <div className="text-center py-16"><p className="text-gray-500">No matches found</p></div>
            ) : (
              <div className="space-y-10">
                {byYear.map(([year, yearMatches]) => (
                  <div key={year}>
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      {year}
                      <span className="text-xs text-gray-600 font-normal">({yearMatches.length} matches)</span>
                    </h3>
                    <div className="space-y-2">
                      {yearMatches.map((match, i) => (
                        <motion.div key={match.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                          className={`${CARD_BASE} p-4 sm:p-5`}>

                          {/* Date & Competition */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-gray-500">{match.competition}</span>
                            <span className="text-[10px] text-gray-600">
                              {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>

                          {/* Teams & Score */}
                          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-3">
                            <div className="text-right flex-1">
                              <span className="text-sm font-bold text-blue-400">{match.messi_team}</span>
                            </div>
                            <div className="text-center flex-shrink-0">
                              <span className={`text-xl sm:text-2xl font-black ${match.team_score > match.opponent_score ? "text-blue-400" : match.team_score < match.opponent_score ? "text-red-400" : "text-amber-400"}`}>
                                {match.team_score} - {match.opponent_score}
                              </span>
                            </div>
                            <div className="text-left flex-1">
                              <span className="text-sm font-bold text-red-400">{match.ronaldo_team}</span>
                            </div>
                          </div>

                          {/* Player Stats */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-500/5 rounded-xl p-3 text-center border border-blue-500/10">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 mx-auto mb-1">
                                <Image src="/images/messi.png" alt="Messi" fill className="object-cover" />
                              </div>
                              <p className="text-[10px] text-blue-400 font-bold">Messi</p>
                              <div className="flex items-center justify-center gap-2 mt-1">
                                {match.messi_goals > 0 && <span className="text-xs text-emerald-400 font-bold">⚽{match.messi_goals}</span>}
                                {match.messi_assists > 0 && <span className="text-xs text-blue-400 font-bold">🅰{match.messi_assists}</span>}
                                {match.messi_goals === 0 && match.messi_assists === 0 && <span className="text-[10px] text-gray-600">—</span>}
                              </div>
                            </div>
                            <div className="bg-red-500/5 rounded-xl p-3 text-center border border-red-500/10">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-500/30 mx-auto mb-1">
                                <Image src="/images/ronaldo.png" alt="Ronaldo" fill className="object-cover" />
                              </div>
                              <p className="text-[10px] text-red-400 font-bold">Ronaldo</p>
                              <div className="flex items-center justify-center gap-2 mt-1">
                                {match.ronaldo_goals > 0 && <span className="text-xs text-emerald-400 font-bold">⚽{match.ronaldo_goals}</span>}
                                {match.ronaldo_assists > 0 && <span className="text-xs text-blue-400 font-bold">🅰{match.ronaldo_assists}</span>}
                                {match.ronaldo_goals === 0 && match.ronaldo_assists === 0 && <span className="text-[10px] text-gray-600">—</span>}
                              </div>
                            </div>
                          </div>

                          {/* Venue & Round */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] text-gray-600">
                              {match.venue === "H" ? "🏟️ Home" : match.venue === "A" ? "✈️ Away" : "📍 Neutral"}
                            </span>
                            <span className="text-[10px] text-gray-600">{match.round || ""}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
{/* =========================================================
    SEO CONTENT SECTION - HEAD TO HEAD PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Head to Head: Complete Direct Match Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      <p>
        The <strong className="text-white">Messi vs Ronaldo head-to-head</strong>{" "}
        comparison focuses only on matches in which Lionel Messi and Cristiano
        Ronaldo directly faced each other. Instead of comparing their entire
        careers, this page looks at the games where the two football legends
        were on opposite sides of the same match.
      </p>

      <p>
        These meetings include some of the most memorable matches of their
        careers, particularly during the Barcelona and Real Madrid rivalry,
        as well as encounters in European and international football.
      </p>

      <p>
        The comparison below uses the direct encounters currently available
        in the Mesnaldo match database and measures wins, draws, goals,
        assists and individual contributions from each player.
      </p>


      {/* TOTAL MEETINGS */}

      <h3 className="text-xl font-bold text-white mt-10">
        How Many Times Have Messi and Ronaldo Played Against Each Other?
      </h3>

      <p>
        In the current dataset, Messi and Ronaldo have faced each other{" "}
        <strong className="text-white">{stats.total}</strong>{" "}
        times in direct competitive encounters.
      </p>

      <p>
        These matches span different competitions and periods of their
        careers. The majority came during the years when Messi represented
        Barcelona and Ronaldo played for Real Madrid, when El Clásico became
        one of the defining fixtures of their rivalry.
      </p>


      {/* WINS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Head-to-Head Wins
      </h3>

      <p>
        Lionel Messi&apos;s teams have recorded{" "}
        <strong className="text-blue-400">{stats.messiWins}</strong>{" "}
        wins in the direct encounters currently shown on this page, while
        Cristiano Ronaldo&apos;s teams have recorded{" "}
        <strong className="text-red-400">{stats.ronaldoWins}</strong>.
      </p>

      <p>
        The remaining{" "}
        <strong className="text-amber-400">{stats.draws}</strong>{" "}
        matches ended in draws.
      </p>

      {stats.messiWins > stats.ronaldoWins ? (
        <p>
          Based on the current match data, Messi holds the advantage in
          head-to-head team victories by{" "}
          <strong className="text-white">
            {stats.messiWins - stats.ronaldoWins}
          </strong>{" "}
          wins.
        </p>
      ) : stats.ronaldoWins > stats.messiWins ? (
        <p>
          Based on the current match data, Ronaldo holds the advantage in
          head-to-head team victories by{" "}
          <strong className="text-white">
            {stats.ronaldoWins - stats.messiWins}
          </strong>{" "}
          wins.
        </p>
      ) : (
        <p>
          Messi and Ronaldo are currently level in direct-match team wins
          according to this dataset.
        </p>
      )}


      {/* GOALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Goals Against Each Other
      </h3>

      <p>
        Messi has scored{" "}
        <strong className="text-blue-400">{stats.messiGoals}</strong>{" "}
        goals in the direct encounters included here, while Ronaldo has scored{" "}
        <strong className="text-red-400">{stats.ronaldoGoals}</strong>.
      </p>

      <p>
        Head-to-head goals are especially interesting because they remove
        many of the differences created by playing in separate leagues or
        competitions. In these matches, both players were competing in the
        same fixture and under the same match conditions.
      </p>

      {stats.messiGoals > stats.ronaldoGoals ? (
        <p>
          Messi currently leads the direct scoring comparison by{" "}
          <strong className="text-white">
            {stats.messiGoals - stats.ronaldoGoals}
          </strong>{" "}
          goals.
        </p>
      ) : stats.ronaldoGoals > stats.messiGoals ? (
        <p>
          Ronaldo currently leads the direct scoring comparison by{" "}
          <strong className="text-white">
            {stats.ronaldoGoals - stats.messiGoals}
          </strong>{" "}
          goals.
        </p>
      ) : (
        <p>
          The two players are currently level for goals in their direct
          meetings.
        </p>
      )}


      {/* ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Assists in Head-to-Head Matches
      </h3>

      <p>
        Lionel Messi has registered{" "}
        <strong className="text-blue-400">{stats.messiAssists}</strong>{" "}
        assists in these direct meetings, while Cristiano Ronaldo has recorded{" "}
        <strong className="text-red-400">{stats.ronaldoAssists}</strong>.
      </p>

      <p>
        Assist totals provide additional context beyond goals because they
        capture chances created for teammates. This is useful when comparing
        the overall attacking contribution of Messi and Ronaldo in matches
        against each other.
      </p>


      {/* GOAL CONTRIBUTIONS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Head-to-Head Goal Contributions
      </h3>

      <p>
        Combining goals and assists, Messi has{" "}
        <strong className="text-blue-400">
          {stats.messiGoals + stats.messiAssists}
        </strong>{" "}
        recorded goal contributions in the direct encounters shown here,
        while Ronaldo has{" "}
        <strong className="text-red-400">
          {stats.ronaldoGoals + stats.ronaldoAssists}
        </strong>.
      </p>

      <p>
        Goal contributions give a broader measure of attacking influence,
        although they still do not capture every part of a player&apos;s
        performance, such as chance creation, dribbling, pressing or
        involvement earlier in an attacking move.
      </p>


      {/* EL CLASICO */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo in El Clásico
      </h3>

      <p>
        The Barcelona vs Real Madrid rivalry formed the most famous chapter of
        the Messi-Ronaldo head-to-head story. During Ronaldo&apos;s time at
        Real Madrid and Messi&apos;s years at Barcelona, the two regularly
        met in one of world football&apos;s biggest fixtures.
      </p>

      <p>
        El Clásico meetings could take place in domestic league competition,
        domestic cups and other competitions, meaning the rivalry was not
        limited to one tournament.
      </p>

      <p>
        The competition filter above allows visitors to isolate specific
        competitions from the complete head-to-head dataset and compare the
        resulting wins, goals, assists and match results.
      </p>


      {/* CHAMPIONS LEAGUE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Head to Head
      </h3>

      <p>
        Messi and Ronaldo also faced each other in UEFA Champions League
        football. These meetings are especially significant because the
        Champions League represented the highest level of European club
        competition during much of their peak rivalry.
      </p>

      <p>
        Their European encounters came in high-pressure knockout situations
        where qualification depended on performances across one or two legs.
        The competition filter can be used to view only Champions League
        meetings when they are included in the database.
      </p>


      {/* INTERNATIONAL */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo International Head-to-Head Matches
      </h3>

      <p>
        Their rivalry was not limited to club football. Messi representing
        Argentina and Ronaldo representing Portugal also created the
        possibility of direct international meetings.
      </p>

      <p>
        International encounters provide a different comparison because both
        players operate with different teammates, tactical systems and
        national-team environments from those they experienced at club level.
      </p>


      {/* MATCH BY MATCH */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Match-by-Match Results
      </h3>

      <p>
        The match list on this page provides more detail than an overall
        scoreboard. Each encounter includes the date, competition, score,
        teams, Messi&apos;s goals and assists, Ronaldo&apos;s goals and assists,
        venue and competition round when that information is available.
      </p>

      <p>
        Looking at individual matches helps explain how the overall numbers
        were produced and allows users to examine particular periods of the
        rivalry rather than relying only on career totals.
      </p>


      {/* COMPETITION FILTER */}

      <h3 className="text-xl font-bold text-white mt-10">
        Head-to-Head Record by Competition
      </h3>

      <p>
        Messi and Ronaldo did not meet under the same circumstances every
        time. Some encounters came in league matches, while others occurred
        in cup or European competition.
      </p>

      <p>
        Selecting a competition above recalculates the comparison using only
        matches from that competition. The number of meetings, wins, draws,
        goals and assists therefore changes dynamically with the selected
        filter.
      </p>


      {/* HEAD TO HEAD CONTEXT */}

      <h3 className="text-xl font-bold text-white mt-10">
        What Does the Head-to-Head Record Actually Tell Us?
      </h3>

      <p>
        Head-to-head statistics are useful because they compare Messi and
        Ronaldo within the same matches. However, team results should not be
        treated as purely individual statistics.
      </p>

      <p>
        A win or defeat depends on the full team, including teammates,
        tactics, substitutions and defensive performance. Messi and Ronaldo
        could both perform well individually even when their team did not win.
      </p>

      <p>
        For that reason, this page separates team results from individual
        goals and assists.
      </p>


      {/* TEAM WINS VS PLAYER PERFORMANCE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Team Wins vs Individual Performance
      </h3>

      <p>
        Head-to-head wins measure which player&apos;s team won more often, while
        goals and assists measure more direct individual attacking
        contributions.
      </p>

      <p>
        Neither should automatically replace the other. A player may score in
        a defeat, fail to score in a victory, or make an important contribution
        that is not reflected by goals and assists.
      </p>

      <p>
        The most useful approach is therefore to examine the match result and
        individual statistics together.
      </p>


      {/* RIVALRY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Why the Messi vs Ronaldo Head-to-Head Rivalry Matters
      </h3>

      <p>
        Messi and Ronaldo spent many of their peak years competing at the same
        time, and for a major part of that period they played for Barcelona
        and Real Madrid. That made their rivalry unusual because two of
        football&apos;s greatest players regularly met in direct competition.
      </p>

      <p>
        Their encounters became part of a wider rivalry involving domestic
        titles, Champions League success, individual awards and scoring
        records. Head-to-head matches therefore represent only one part of the
        overall Messi vs Ronaldo comparison, but they remain one of the most
        interesting parts of it.
      </p>


      {/* METHODOLOGY */}

      <h3 className="text-xl font-bold text-white mt-10">
        How Mesnaldo Identifies Messi vs Ronaldo Direct Meetings
      </h3>

      <p>
        Mesnaldo identifies direct encounters by matching games from the Messi
        and Ronaldo match datasets where the match date is the same and each
        player&apos;s team is listed as the opponent of the other player&apos;s
        team.
      </p>

      <p>
        Once a direct match is identified, the page uses Messi&apos;s match
        record to display the score, competition, round and venue while
        combining the goals and assists recorded for both players.
      </p>

      <p>
        This approach keeps the comparison tied to the available match data.
        If historical source data is corrected or expanded, the head-to-head
        totals can also change.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Head-to-Head FAQ
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        How many times have Messi and Ronaldo played against each other?
      </h3>

      <p>
        The current Mesnaldo database contains{" "}
        <strong className="text-white">{stats.total}</strong>{" "}
        direct encounters between Lionel Messi and Cristiano Ronaldo.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more head-to-head wins, Messi or Ronaldo?
      </h3>

      <p>
        Messi&apos;s teams have{" "}
        <strong className="text-blue-400">{stats.messiWins}</strong>{" "}
        wins, while Ronaldo&apos;s teams have{" "}
        <strong className="text-red-400">{stats.ronaldoWins}</strong>{" "}
        wins in the matches currently included on this page.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many draws are there between Messi and Ronaldo?
      </h3>

      <p>
        There are currently{" "}
        <strong className="text-amber-400">{stats.draws}</strong>{" "}
        draws in the direct-match dataset.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who scored more goals against each other?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">{stats.messiGoals}</strong>{" "}
        goals in the direct meetings shown here, while Ronaldo has{" "}
        <strong className="text-red-400">{stats.ronaldoGoals}</strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more assists in Messi vs Ronaldo matches?
      </h3>

      <p>
        Messi has recorded{" "}
        <strong className="text-blue-400">{stats.messiAssists}</strong>{" "}
        assists, compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">{stats.ronaldoAssists}</strong>{" "}
        in the current direct-match dataset.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Did Messi and Ronaldo play against each other in El Clásico?
      </h3>

      <p>
        Yes. A large part of their direct rivalry came when Messi played for
        Barcelona and Ronaldo represented Real Madrid. Those Barcelona vs
        Real Madrid fixtures became some of the most famous meetings between
        the two players.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Can I compare their head-to-head record by competition?
      </h3>

      <p>
        Yes. The competition filter on this page allows the available direct
        encounters to be separated by competition. The displayed wins, draws,
        goals and assists update based on the selected competition.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Direct Encounters
      </h2>

      <p>
        The Messi vs Ronaldo head-to-head record provides a unique way to
        compare the two players because it focuses on matches where they
        actually faced each other rather than separate career statistics.
      </p>

      <p>
        Their direct meetings include team wins, draws, goals, assists and
        some of the most memorable fixtures of the Barcelona-Real Madrid era.
        Each statistic tells a different part of the story, so the strongest
        comparison considers both the match results and the players&apos;
        individual contributions.
      </p>

      <p>
        Mesnaldo presents these encounters match by match and allows them to be
        filtered by competition, making it easier to explore how the rivalry
        developed across different stages and tournaments.
      </p>

    </div>
  </div>
</section>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch ALL matches for both players
    const { data: messiAll } = await supabase.from("matches").select("*").eq("player_id", 1).limit(2000)
    const { data: ronaldoAll } = await supabase.from("matches").select("*").eq("player_id", 2).limit(2000)

    if (!messiAll || !ronaldoAll) {
      return { props: { matches: [] } }
    }

    // Find H2H matches: same date + Messi's team vs Ronaldo's team
    const h2hMap = new Map<string, H2HMatch>()

    messiAll.forEach(messiMatch => {
      const ronaldoMatch = ronaldoAll.find(r =>
        r.date === messiMatch.date &&
        r.team === messiMatch.opponent &&
        r.opponent === messiMatch.team
      )

      if (ronaldoMatch) {
        const key = `${messiMatch.date}-${messiMatch.team}-${ronaldoMatch.team}`
        if (!h2hMap.has(key)) {
          h2hMap.set(key, {
            id: key,
            date: messiMatch.date,
            competition: messiMatch.competition,
            round: messiMatch.round || "",
            team_score: messiMatch.team_score || 0,
            opponent_score: messiMatch.opponent_score || 0,
            messi_team: messiMatch.team || "Unknown",
            ronaldo_team: ronaldoMatch.team || "Unknown",
            messi_goals: messiMatch.goals || 0,
            messi_assists: messiMatch.assists || 0,
            ronaldo_goals: ronaldoMatch.goals || 0,
            ronaldo_assists: ronaldoMatch.assists || 0,
            venue: messiMatch.venue || (messiMatch.is_home === true ? "H" : messiMatch.is_home === false ? "A" : "N"),
          })
        }
      }
    })

    const h2hMatches = Array.from(h2hMap.values())
    h2hMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    console.log(`✅ H2H matches found: ${h2hMatches.length}`)
    h2hMatches.forEach(m => console.log(`  ${m.date}: ${m.messi_team} vs ${m.ronaldo_team} | ${m.team_score}-${m.opponent_score} | M:${m.messi_goals}G/${m.messi_assists}A R:${m.ronaldo_goals}G/${m.ronaldo_assists}A`))

    return { props: { matches: h2hMatches } }
  } catch (e) {
    console.error("Error:", e)
    return { props: { matches: [] } }
  }
}