// pages/records.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
interface RecordItem {
  id: number
  player_id: number
  record_type: string
  category: string
  title: string
  description: string
  value: string
}

interface RecordsPageProps {
  records: RecordItem[]
}

export default function Records({ records }: RecordsPageProps) {
  const [activePlayer, setActivePlayer] = useState<"all" | 1 | 2>("all")
  const [activeType, setActiveType] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<"all" | "comparison">("all")

  const recordTypes = useMemo(() => [...new Set(records.map(r => r.record_type))], [records])

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (activePlayer !== "all" && r.player_id !== activePlayer) return false
      if (activeType !== "all" && r.record_type !== activeType) return false
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [records, activePlayer, activeType, search])

  const groupedRecords = useMemo(() => {
    const grouped: Record<string, RecordItem[]> = {}
    filteredRecords.forEach(r => {
      if (!grouped[r.category]) grouped[r.category] = []
      grouped[r.category].push(r)
    })
    return grouped
  }, [filteredRecords])

  const comparisonData = useMemo(() => {
    const categories = [...new Set(records.map(r => r.category))]
    return categories.map(cat => ({
      category: cat,
      messi: records.filter(r => r.category === cat && r.player_id === 1),
      ronaldo: records.filter(r => r.category === cat && r.player_id === 2),
    })).filter(d => d.messi.length > 0 || d.ronaldo.length > 0)
  }, [records])

  const messiCount = records.filter(r => r.player_id === 1).length
  const ronaldoCount = records.filter(r => r.player_id === 2).length
  const filteredCount = filteredRecords.length

  return (
   <Layout 
  title="Messi vs Ronaldo Records | Every Record, Guinness World Records & Achievements" 
  description="World records held by Messi and Ronaldo. Over 258 verified records including Ballon d'Or, Champions League, and international milestones.">
    <BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "Records", url: "/records" },
  ]}
/>
    <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-8">

          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">Milestones & Achievements</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              World <span className="text-amber-400">Records</span>
            </h1>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Complete collection of world records, European records, club records, and national team records.
            </p>
          </div>

          {/* STATS BAR */}
          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-blue-400">{messiCount}</p>
              <p className="text-[10px] text-gray-500">Messi</p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-amber-400">{records.length}</p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-red-400">{ronaldoCount}</p>
              <p className="text-[10px] text-gray-500">Ronaldo</p>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white">{filteredCount}</p>
              <p className="text-[10px] text-gray-500">Showing</p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setViewMode("all")}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${viewMode === "all" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                All Records
              </button>
              <button onClick={() => setViewMode("comparison")}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${viewMode === "comparison" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                Side by Side
              </button>
            </div>

            <div className="relative max-w-md mx-auto">
              <input type="text" placeholder="Search records..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">Clear</button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => setActivePlayer("all")}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${activePlayer === "all" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>All</button>
              <button onClick={() => setActivePlayer(1)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${activePlayer === 1 ? "bg-blue-500 text-white" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>Messi</button>
              <button onClick={() => setActivePlayer(2)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${activePlayer === 2 ? "bg-red-500 text-white" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>Ronaldo</button>
              <span className="text-gray-700 mx-1">|</span>
              <button onClick={() => setActiveType("all")}
                className={`px-3 py-1.5 text-[11px] sm:text-xs rounded-full transition-all ${activeType === "all" ? "bg-white text-black font-bold" : "text-gray-500 bg-gray-900 border border-gray-800 hover:text-gray-300"}`}>All Types</button>
              {recordTypes.map(type => (
                <button key={type} onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 text-[11px] sm:text-xs rounded-full transition-all ${activeType === type ? "bg-white text-black font-bold" : "text-gray-500 bg-gray-900 border border-gray-800 hover:text-gray-300"}`}>{type}</button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-600">Showing {filteredCount} of {records.length} records</p>

          {/* COMPARISON VIEW */}
          {viewMode === "comparison" && (
            <div className="space-y-8">
              {comparisonData.map(({ category, messi, ronaldo }) => (
                <div key={category} className="bg-gray-900/50 border border-gray-700/40 rounded-2xl p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-4 text-center">{category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-3 text-center">Messi</p>
                      {messi.length === 0 ? (
                        <p className="text-gray-600 text-xs text-center py-4">No records in this category</p>
                      ) : (
                        <div className="space-y-1.5">
                          {messi.map((r) => (
                            <div key={r.id} className="bg-gray-800/40 rounded-lg p-3">
                              <p className="text-xs text-gray-200 font-medium">{r.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] text-gray-500 truncate mr-2">{r.description}</span>
                                <span className="text-xs font-bold text-blue-400 flex-shrink-0">{r.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-3 text-center">Ronaldo</p>
                      {ronaldo.length === 0 ? (
                        <p className="text-gray-600 text-xs text-center py-4">No records in this category</p>
                      ) : (
                        <div className="space-y-1.5">
                          {ronaldo.map((r) => (
                            <div key={r.id} className="bg-gray-800/40 rounded-lg p-3">
                              <p className="text-xs text-gray-200 font-medium">{r.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] text-gray-500 truncate mr-2">{r.description}</span>
                                <span className="text-xs font-bold text-red-400 flex-shrink-0">{r.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ALL RECORDS VIEW */}
          {viewMode === "all" && (
            Object.keys(groupedRecords).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No records found</p>
                <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedRecords).map(([category, categoryRecords]) => (
                  <div key={category}>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2 sticky top-16 bg-black/95 py-2 z-10 backdrop-blur">
                      <span className={`w-2 h-2 rounded-full ${categoryRecords[0].player_id === 1 ? "bg-blue-400" : "bg-red-400"}`} />
                      {category}
                      <span className="text-xs text-gray-500 font-normal">({categoryRecords.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {categoryRecords.map((record, i) => (
                        <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}
                          className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 hover:border-gray-600/70 transition-all">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-200 font-medium">{record.title}</p>
                            {record.description && <p className="text-[11px] text-gray-500 mt-1">{record.description}</p>}
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${record.player_id === 1 ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                              {record.player_id === 1 ? "Messi" : "Ronaldo"}
                            </span>
                            {record.value && <span className="text-sm font-bold text-white whitespace-nowrap">{record.value}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-[10px] text-gray-600">Records updated regularly.</p>
          </div>
{/* =========================================================
    SEO CONTENT SECTION - RECORDS PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Records: Complete Career Record Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      <p>
        The <strong className="text-white">Messi vs Ronaldo records comparison</strong>{" "}
        brings together the major milestones and records associated with
        Lionel Messi and Cristiano Ronaldo across club football,
        international football and individual achievement.
      </p>

      <p>
        Instead of comparing only career goals or trophies, this page focuses
        on specific records and milestones. The records currently stored in
        the Mesnaldo database are organised by category and record type so
        visitors can explore the areas in which each player has established
        notable achievements.
      </p>

      <p>
        The current database contains{" "}
        <strong className="text-white">{records.length}</strong>{" "}
        active record entries, including{" "}
        <strong className="text-blue-400">{messiCount}</strong>{" "}
        associated with Messi and{" "}
        <strong className="text-red-400">{ronaldoCount}</strong>{" "}
        associated with Ronaldo.
      </p>


      {/* RECORD TOTALS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Record Totals
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">{messiCount}</strong>{" "}
        record entries in the Mesnaldo records database, while Ronaldo has{" "}
        <strong className="text-red-400">{ronaldoCount}</strong>.
      </p>

      <p>
        These totals should not automatically be treated as a simple measure
        of which player had the better career. Different records can vary
        greatly in importance, difficulty and historical significance.
      </p>

      <p>
        A major world record and a smaller competition-specific milestone are
        both individual record entries, even though their significance may be
        very different. For that reason, the category and description of each
        record are more informative than the raw total alone.
      </p>


      {/* WORLD RECORDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo World Records
      </h3>

      <p>
        Both Messi and Ronaldo have set records at the highest levels of
        football. Their careers include milestones connected with goals,
        appearances, major tournaments, individual awards, club competitions
        and international football.
      </p>

      <p>
        World-level records are particularly important because they compare a
        player against a much wider historical field rather than only players
        from one club, league or country.
      </p>

      <p>
        Use the record-type filters above to isolate the types of achievements
        available in the current database.
      </p>


      {/* EUROPEAN RECORDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        European Records
      </h3>

      <p>
        A large part of the Messi-Ronaldo rivalry developed in European
        football. Both players spent many of their peak seasons competing in
        major UEFA competitions and top European domestic leagues.
      </p>

      <p>
        Their European records therefore form an important part of the wider
        comparison. These records can relate to goals, appearances,
        tournament performances, scoring consistency or other achievements
        reached during their European careers.
      </p>


      {/* CLUB RECORDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Club Records
      </h3>

      <p>
        Club records measure achievements reached while representing teams
        such as Barcelona, Real Madrid, Manchester United, Juventus,
        Paris Saint-Germain, Inter Miami, Sporting CP and Al Nassr.
      </p>

      <p>
        Club-specific records are useful because they show how dominant a
        player was within the history of a particular team. A record may
        involve goals, appearances, assists, tournament performance or other
        milestones.
      </p>

      <p>
        Messi&apos;s long Barcelona career produced many records connected with
        one club, while Ronaldo&apos;s career spread major achievements across
        several clubs and leagues.
      </p>


      {/* INTERNATIONAL RECORDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo International Records
      </h3>

      <p>
        International football represents another major area of comparison.
        Messi&apos;s records with Argentina and Ronaldo&apos;s records with Portugal
        reflect careers played across international tournaments, qualifiers,
        friendlies and other national-team competitions.
      </p>

      <p>
        International records can include scoring milestones, appearances,
        tournament achievements and other national-team accomplishments.
      </p>

      <p>
        These records should be considered separately from club statistics
        because international football has a different schedule, competitive
        structure and number of matches.
      </p>


      {/* CHAMPIONS LEAGUE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Records
      </h3>

      <p>
        The UEFA Champions League was one of the most important competitions
        during the peak years of the Messi-Ronaldo rivalry.
      </p>

      <p>
        Both players produced major Champions League milestones through
        goals, appearances, knockout performances and long-term consistency.
        Records from this competition are especially significant because they
        were achieved against elite clubs from across Europe.
      </p>

      <p>
        Where Champions League records are present in the database, they can
        be explored through the available categories and filters above.
      </p>


      {/* GOAL RECORDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Goalscoring Records
      </h3>

      <p>
        Goalscoring records form a major part of both careers. Messi and
        Ronaldo reached extraordinary scoring milestones across domestic
        leagues, European competitions, international football and complete
        career totals.
      </p>

      <p>
        Some records measure total goals, while others relate to scoring in a
        particular competition, season, stage or sequence of matches.
      </p>

      <p>
        These distinctions are important because two records involving goals
        may measure very different achievements.
      </p>


      {/* AWARD RECORDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Individual Award Records
      </h3>

      <p>
        Messi and Ronaldo also hold records connected with individual
        recognition. These can include repeated wins, nominations or other
        milestones associated with major football awards.
      </p>

      <p>
        Individual award records are different from team trophies because
        they primarily recognise the performance or career of one player
        rather than the success of an entire club or national team.
      </p>


      {/* LONGEVITY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Longevity and Career Milestone Records
      </h3>

      <p>
        One of the defining features of both Messi and Ronaldo is longevity.
        Their careers remained at elite level across many seasons, allowing
        both players to reach milestones that require sustained performance
        over a long period.
      </p>

      <p>
        Appearance totals, long-term scoring records, repeated tournament
        participation and achievements across different stages of their
        careers all contribute to this aspect of the rivalry.
      </p>


      {/* DIFFERENT TYPES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Different Types of Messi and Ronaldo Records
      </h3>

      <p>
        Football records do not all measure the same thing. Some are based on
        career totals, while others apply only to one competition, league,
        club, national team or period of time.
      </p>

      <p>
        The record-type filters on this page make it possible to separate the
        available records rather than treating every achievement as one large
        undifferentiated list.
      </p>


      {/* CATEGORY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Records by Category
      </h3>

      <p>
        The records are grouped into categories so related achievements can
        be viewed together. This helps visitors explore specific parts of the
        Messi-Ronaldo debate instead of manually searching through the full
        record collection.
      </p>

      <p>
        Category grouping is particularly useful when several records concern
        the same competition, type of achievement or stage of a player&apos;s
        career.
      </p>


      {/* SIDE BY SIDE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Records Side by Side
      </h3>

      <p>
        The Side by Side view provides a direct category-based comparison.
        Messi&apos;s records and Ronaldo&apos;s records are displayed next to each
        other within the same category.
      </p>

      <p>
        This makes it easier to identify where one player has more recorded
        achievements in a particular area without moving between separate
        pages.
      </p>


      {/* SEARCH */}

      <h3 className="text-xl font-bold text-white mt-10">
        Search Messi and Ronaldo Records
      </h3>

      <p>
        The search feature allows specific records to be found using words
        from their titles or descriptions.
      </p>

      <p>
        Visitors can combine search with the Messi, Ronaldo and record-type
        filters to narrow the database to the records most relevant to their
        comparison.
      </p>


      {/* RECORD COUNT CONTEXT */}

      <h3 className="text-xl font-bold text-white mt-10">
        Does Having More Records Make One Player Better?
      </h3>

      <p>
        Not necessarily. Simply counting record entries does not measure the
        importance of each record.
      </p>

      <p>
        One historically significant career record may carry more weight than
        several smaller milestones. Different records also measure different
        skills, competitions and periods of a player&apos;s career.
      </p>

      <p>
        For that reason, Mesnaldo shows the title, description and value of
        each record rather than presenting the total number as a definitive
        answer to the Messi vs Ronaldo debate.
      </p>


      {/* RECORDS VS TROPHIES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Records vs Trophies
      </h3>

      <p>
        Records and trophies measure different aspects of football success.
        A trophy is won by a team or awarded to an individual, while a record
        describes a statistical or historical achievement.
      </p>

      <p>
        A player can therefore hold a record without receiving a trophy for
        it. Likewise, winning a trophy does not automatically create a record.
      </p>

      <p>
        These categories should remain separate when comparing the careers of
        Messi and Ronaldo.
      </p>


      {/* RECORDS VS AWARDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Records vs Individual Awards
      </h3>

      <p>
        Individual awards recognise player performance through a voting,
        judging or statistical process. Records instead identify a milestone
        or benchmark achieved in football history.
      </p>

      <p>
        Some individual awards can themselves become records when a player
        wins them more times than anyone else. However, the award and the
        resulting record are still conceptually different.
      </p>


      {/* DATABASE METHOD */}

      <h3 className="text-xl font-bold text-white mt-10">
        How the Mesnaldo Records Database Works
      </h3>

      <p>
        This page loads active records from the Mesnaldo records database.
        Each entry contains a player, record type, category, title,
        description and record value.
      </p>

      <p>
        The records can then be filtered by player or type, searched using
        their titles and descriptions, and grouped by category for easier
        comparison.
      </p>

      <p>
        Because the page is built from database entries, records can be
        corrected, expanded or deactivated when the underlying information
        needs to be updated.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Records FAQ
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        How many Messi and Ronaldo records are listed?
      </h3>

      <p>
        The current database contains{" "}
        <strong className="text-white">{records.length}</strong>{" "}
        active record entries in total.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many Messi records are listed?
      </h3>

      <p>
        There are currently{" "}
        <strong className="text-blue-400">{messiCount}</strong>{" "}
        record entries associated with Lionel Messi.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many Ronaldo records are listed?
      </h3>

      <p>
        There are currently{" "}
        <strong className="text-red-400">{ronaldoCount}</strong>{" "}
        record entries associated with Cristiano Ronaldo.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Can I compare Messi and Ronaldo records side by side?
      </h3>

      <p>
        Yes. Select the Side by Side view to display Messi and Ronaldo
        records next to each other within the same record categories.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Can I search for a specific record?
      </h3>

      <p>
        Yes. The search box checks the title and description of the active
        records and displays matching results.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Can the records be filtered?
      </h3>

      <p>
        Yes. Records can be filtered by Messi, Ronaldo or all players, and
        they can also be filtered using the record types stored in the
        database.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Does having more listed records prove who is better?
      </h3>

      <p>
        No. The total number of record entries does not measure the
        significance of each achievement. The type, competition, historical
        context and difficulty of each record should also be considered.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Records Comparison
      </h2>

      <p>
        The record books provide another perspective on the careers of Lionel
        Messi and Cristiano Ronaldo. Both players have reached extraordinary
        milestones across club football, international football and major
        competitions.
      </p>

      <p>
        Rather than relying only on the number of records, the strongest
        comparison looks at what each achievement represents and the context
        in which it was reached.
      </p>

      <p>
        Mesnaldo organises those achievements by player, type and category so
        visitors can explore the Messi vs Ronaldo record debate in greater
        detail.
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
    const { data: records } = await supabase
      .from("records")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    return { props: { records: records || [] } }
  } catch (e) {
    console.error("Error:", e)
    return { props: { records: [] } }
  }
}