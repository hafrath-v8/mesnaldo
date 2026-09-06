import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { Trophy, Target, Zap, Shield, Star, Award, TrendingUp, Goal, Timer, Crosshair, Swords, Users, Crown, Medal, ChartBar, Flame, Rocket, Eye } from "lucide-react"

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
    big_chances_created: Crosshair,
    throughballs: Swords,
    non_penalty_goals: Goal,
    el_clasico_goals_assists: Crown,
    ucl_knockout_goals_assists: Flame,
    finals_goals_assists: Medal,
    total_goals_including_youth: Rocket,
  }

  const totalMessiWins = Object.entries(groupedStats).filter(([_, items]) => {
    const m = items.find(s => s.player_id === 1)
    const r = items.find(s => s.player_id === 2)
    return m && r && m.stat_value > r.stat_value
  }).length

  const totalRonaldoWins = Object.entries(groupedStats).filter(([_, items]) => {
    const m = items.find(s => s.player_id === 1)
    const r = items.find(s => s.player_id === 2)
    return m && r && m.stat_value > r.stat_value
  }).length

  return (
    <Layout 
      title="Messi vs Ronaldo Detailed Stats 2026 - Complete Head-to-Head Analysis"
      description="Compare Messi vs Ronaldo detailed stats: hat tricks, key passes, dribbles, xG, aerial duels, match ratings, Man of the Match awards, El Clasico records, UCL knockout stats, and more."
    >
      <div className="bg-black min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5">
              <ChartBar className="w-3.5 h-3.5 text-amber-400" />
              <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Advanced Analytics</p>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Messi vs Ronaldo <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Detailed Stats</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              The most comprehensive head-to-head comparison of Lionel Messi and Cristiano Ronaldo. Every advanced metric analyzed in detail.
            </p>
            
            {/* Quick Score */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl px-6 py-4">
                <p className="text-2xl font-black text-blue-400">{totalMessiWins}</p>
                <p className="text-[10px] text-gray-500 mt-1">Messi Leads</p>
              </div>
              <div className="text-gray-600 text-2xl font-black">vs</div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl px-6 py-4">
                <p className="text-2xl font-black text-red-400">{totalRonaldoWins}</p>
                <p className="text-[10px] text-gray-500 mt-1">Ronaldo Leads</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-5">
            {Object.entries(groupedStats).map(([statName, statItems], index) => {
              const messiStat = statItems.find(s => s.player_id === 1)
              const ronaldoStat = statItems.find(s => s.player_id === 2)
              if (!messiStat || !ronaldoStat) return null
              
              const Icon = iconMap[statName] || Star
              const messiWins = messiStat.stat_value > ronaldoStat.stat_value
              const ronaldoWins = ronaldoStat.stat_value > messiStat.stat_value
              const isTie = messiStat.stat_value === ronaldoStat.stat_value

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                  className={`${CARD_BASE} p-5 sm:p-7 hover:border-gray-600 transition-colors duration-300`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">{messiStat.stat_label}</h2>
                        <p className="text-[10px] text-gray-600 mt-0.5">Category #{index + 1}</p>
                      </div>
                    </div>
                    {!isTie && (
                      <span className={`text-[9px] px-3 py-1 rounded-full font-bold ${
                        messiWins ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {messiWins ? 'MESSI LEADS' : 'RONALDO LEADS'}
                      </span>
                    )}
                    {isTie && <span className="text-[9px] px-3 py-1 rounded-full font-bold bg-gray-500/10 text-gray-400">TIED</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    {/* Messi */}
                    <div className={`bg-blue-500/[0.03] rounded-xl p-4 sm:p-5 border-2 ${messiWins ? 'border-blue-500/40 shadow-lg shadow-blue-500/5' : 'border-blue-500/10'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500/40 flex-shrink-0">
                          <Image src="/images/messi.webp" alt="Lionel Messi" width={32} height={32} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-400">Lionel Messi</p>
                          <p className="text-[9px] text-gray-600">Argentina / Inter Miami</p>
                        </div>
                        {messiWins && <Crown className="w-4 h-4 text-blue-400 ml-auto" />}
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-white">
                        {messiStat.stat_value.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{messiStat.stat_label}</p>
                      {messiStat.stat_frequency && (
                        <p className="text-[10px] text-gray-600 mt-1 flex items-center gap-1">
                          <Timer className="w-3 h-3" /> {messiStat.stat_frequency}
                        </p>
                      )}
                      {messiStat.stat_percentage && (
                        <p className="text-[10px] text-gray-600 mt-0.5">{messiStat.stat_percentage}</p>
                      )}
                    </div>

                    {/* Ronaldo */}
                    <div className={`bg-red-500/[0.03] rounded-xl p-4 sm:p-5 border-2 ${ronaldoWins ? 'border-red-500/40 shadow-lg shadow-red-500/5' : 'border-red-500/10'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/40 flex-shrink-0">
                          <Image src="/images/ronaldo.webp" alt="Cristiano Ronaldo" width={32} height={32} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-red-400">Cristiano Ronaldo</p>
                          <p className="text-[9px] text-gray-600">Portugal / Al Nassr</p>
                        </div>
                        {ronaldoWins && <Crown className="w-4 h-4 text-red-400 ml-auto" />}
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-white">
                        {ronaldoStat.stat_value.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{ronaldoStat.stat_label}</p>
                      {ronaldoStat.stat_frequency && (
                        <p className="text-[10px] text-gray-600 mt-1 flex items-center gap-1">
                          <Timer className="w-3 h-3" /> {ronaldoStat.stat_frequency}
                        </p>
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

  {/* =========================================================
    LONG-FORM SEO / EDITORIAL ANALYSIS
    Messi vs Ronaldo Detailed Statistics
========================================================= */}

<section className="space-y-8 mt-12">

  <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-6 sm:p-10">

    <div className="prose prose-invert prose-sm max-w-none text-gray-400 text-sm leading-7">

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <h2 className="text-xl sm:text-2xl font-black text-white mb-5">
        Messi vs Ronaldo Stats: A Detailed Comparison of Two Football Legends
      </h2>

      <p>
        Lionel Messi and Cristiano Ronaldo have spent much of their careers
        being compared with one another, but a meaningful Messi vs Ronaldo
        comparison requires considerably more than looking at one number.
        Goals are obviously important, yet football performance also includes
        chance creation, dribbling, shooting, movement, aerial ability,
        consistency, efficiency and performances in important matches.
        That is why this page looks beyond the familiar career-goal debate
        and compares the two players across{" "}
        <strong className="text-white">
          {Object.keys(groupedStats).length} statistical categories
        </strong>.
      </p>

      <p>
        The purpose of this comparison is not to force every part of their
        careers into a single number. Messi and Ronaldo developed into
        different types of attackers and have influenced matches in different
        ways. Messi has frequently operated as both a scorer and creator,
        receiving the ball between midfield and attack, carrying possession
        forward and creating opportunities for teammates. Ronaldo's career,
        meanwhile, demonstrates an extraordinary combination of scoring
        volume, movement, physical ability, heading and penalty-area
        finishing.
      </p>

      <p>
        Looking at the statistics category by category therefore gives a much
        clearer picture. Instead of asking only "Who scored more?", we can ask
        more useful questions: Who created more chances? Who completed more
        dribbles? Who was stronger in the air? How do their non-penalty goals
        compare? What do their expected-goal numbers tell us? Who produced
        more goal contributions in finals, El Clasico matches and Champions
        League knockout games?
      </p>

      {(() => {
        const goals =
          groupedStats["total_goals_including_youth"]

        const m = goals?.find(s => s.player_id === 1)
        const r = goals?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <p>
            In the total-goals category currently stored in our database,
            including the scope represented by this statistic, Messi is listed
            with <strong className="text-blue-400">
              {m.stat_value.toLocaleString()}
            </strong>{" "}
            goals and Ronaldo with{" "}
            <strong className="text-red-400">
              {r.stat_value.toLocaleString()}
            </strong>.
            These totals provide useful career context, but they should be
            read alongside the more detailed categories below rather than
            being treated as the entire argument.
          </p>
        )
      })()}


      {/* =====================================================
          OVERALL COMPARISON
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo: What Does the Overall Statistical Comparison Show?
      </h3>

      <p>
        Across the statistics available on this page, Messi currently leads
        in{" "}
        <strong className="text-blue-400">
          {totalMessiWins}
        </strong>{" "}
        categories, while Ronaldo leads in{" "}
        <strong className="text-red-400">
          {totalRonaldoWins}
        </strong>.
        A category lead, however, should not automatically be interpreted as
        proof that one player is universally better. Different statistics
        measure different football skills, and not every category has the
        same importance.
      </p>

      <p>
        For example, a lead in successful dribbles describes something very
        different from a lead in aerial duels. Key passes measure a different
        part of attacking football from hat tricks. Expected goals describe
        chance quality rather than simply recording the final result. Big-game
        statistics add another layer because they examine what happened in
        specific competitive environments.
      </p>

      <p>
        The most useful way to read the Messi vs Ronaldo numbers is therefore
        to identify patterns. When several related statistics point in the
        same direction, they can help explain how each player has produced his
        impact. That gives us a more balanced picture than selecting whichever
        individual statistic supports a preferred conclusion.
      </p>


      {/* =====================================================
          GOAL SCORING
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo Goal-Scoring Statistics
      </h3>

      <p>
        Goal scoring is the natural starting point in almost every Messi vs
        Ronaldo debate. Both players reached scoring levels that made enormous
        seasonal totals appear normal for a generation of football supporters.
        Yet total goals alone cannot describe how those goals were produced.
        Shot volume, non-penalty goals, hat tricks and chance quality provide
        additional context.
      </p>

      {(() => {
        const npgM =
          groupedStats["non_penalty_goals"]?.find(s => s.player_id === 1)
        const npgR =
          groupedStats["non_penalty_goals"]?.find(s => s.player_id === 2)

        if (!npgM || !npgR) return null

        const diff = Math.abs(npgM.stat_value - npgR.stat_value)
        const leader =
          npgM.stat_value > npgR.stat_value
            ? "Messi"
            : npgR.stat_value > npgM.stat_value
              ? "Ronaldo"
              : null

        return (
          <>
            <h4 className="text-white font-bold mt-7">
              Messi vs Ronaldo Non-Penalty Goals
            </h4>

            <p>
              Removing penalties is one way of looking specifically at goals
              scored from open play and other non-penalty situations. In the
              data currently displayed here, Messi has{" "}
              <strong className="text-blue-400">
                {npgM.stat_value.toLocaleString()}
              </strong>{" "}
              non-penalty goals compared with Ronaldo's{" "}
              <strong className="text-red-400">
                {npgR.stat_value.toLocaleString()}
              </strong>.
              {leader
                ? ` That gives ${leader} a difference of ${diff.toLocaleString()} goals in this particular category.`
                : " The two players are level in this category."}
            </p>

            <p>
              Non-penalty goals are useful because penalty-taking
              opportunities can vary between teams, seasons and competitions.
              They should not be used to dismiss penalty goals, which still
              require technique and composure, but they offer another angle
              when comparing scoring output.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          SHOTS
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["total_shots"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["total_shots"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h4 className="text-white font-bold mt-7">
              Total Shots: How Often Have Messi and Ronaldo Attempted to Score?
            </h4>

            <p>
              Shooting volume helps put goal totals into context. According
              to the total-shot data available on this page, Messi has
              attempted{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              shots, while Ronaldo has attempted{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
              The raw total tells us how frequently each player has attempted
              to finish attacks across the period covered by the dataset.
            </p>

            <p>
              Shot totals become even more useful when considered together
              with goals, xG and non-penalty goals. A player may record a high
              number of shots because he attempts difficult efforts from
              distance, because his team creates a large number of chances
              for him, or simply because his role encourages him to finish
              attacks. For that reason, shooting volume should be interpreted
              as part of a larger attacking profile rather than in isolation.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          HAT TRICKS
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["hat_tricks"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["hat_tricks"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        const difference = Math.abs(m.stat_value - r.stat_value)

        return (
          <>
            <h4 className="text-white font-bold mt-7">
              Messi vs Ronaldo Hat Tricks
            </h4>

            <p>
              Hat tricks are among the clearest examples of a player taking
              control of the scoring in a single match. Messi currently has{" "}
              <strong className="text-blue-400">
                {m.stat_value}
              </strong>{" "}
              hat tricks in this dataset, compared with{" "}
              <strong className="text-red-400">
                {r.stat_value}
              </strong>{" "}
              for Ronaldo.
              {m.stat_value === r.stat_value
                ? " The two players are currently level by this measure."
                : ` The difference between them is ${difference} hat tricks.`}
            </p>

            <p>
              Hat-trick totals are particularly interesting in this rivalry
              because they demonstrate not only career longevity but also the
              frequency with which both players have produced explosive
              individual scoring performances. A hat trick can occur in very
              different circumstances, however, so the number is best used as
              one measure of high-output scoring rather than a complete
              measure of overall performance.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          PLAYMAKING
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo Playmaking and Chance Creation
      </h3>

      <p>
        One of the biggest limitations of a goals-only comparison is that it
        ignores everything an attacker does before the final shot. Creating
        chances, progressing the ball, finding teammates between defenders and
        playing the final pass are all major parts of attacking football.
        This is where statistics such as key passes, throughballs and big
        chances created become valuable.
      </p>

      {(() => {
        const m =
          groupedStats["key_passes"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["key_passes"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        const difference = Math.abs(m.stat_value - r.stat_value)
        const leader =
          m.stat_value > r.stat_value
            ? "Messi"
            : r.stat_value > m.stat_value
              ? "Ronaldo"
              : null

        return (
          <>
            <h4 className="text-white font-bold mt-7">
              Key Passes: Messi vs Ronaldo
            </h4>

            <p>
              Key passes measure passes that directly create a shooting
              opportunity for a teammate. The database currently records{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              key passes for Messi and{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>{" "}
              for Ronaldo.
              {leader
                ? ` ${leader} therefore leads this dataset by ${difference.toLocaleString()} key passes.`
                : " They are level according to the current data."}
            </p>

            <p>
              This category is especially important when evaluating players
              who occupy different attacking roles. A forward can influence a
              match without scoring by repeatedly creating opportunities for
              others. Key-pass data helps capture that contribution and gives
              more context to the traditional assist statistic, because a
              created chance does not always become a goal.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          THROUGH BALLS
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["throughballs"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["throughballs"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h4 className="text-white font-bold mt-7">
              Throughballs and Passing Vision
            </h4>

            <p>
              The throughball statistic gives another view of creativity.
              Messi is recorded with{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              in this category, while Ronaldo has{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
              Throughballs often require a player to recognise a run early
              and place the pass into a small area behind or between
              defenders.
            </p>

            <p>
              Unlike a simple completed-pass total, this type of statistic is
              more closely connected to attacking intent. It helps illustrate
              how often a player attempts to break defensive lines rather
              than merely retain possession.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          BIG CHANCES CREATED
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["big_chances_created"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["big_chances_created"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h4 className="text-white font-bold mt-7">
              Who Has Created More Big Chances?
            </h4>

            <p>
              Big chances created focus on opportunities where a teammate has
              a particularly strong possibility of scoring. Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              big chances created in the current dataset, compared with{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>{" "}
              for Ronaldo.
            </p>

            <p>
              When this number is viewed together with key passes and
              throughballs, it becomes possible to build a much richer picture
              of playmaking. Instead of relying only on assists — which depend
              on whether another player actually converts the chance — these
              categories focus more directly on the act of creating the
              opportunity.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          DRIBBLING
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo Dribbling Statistics
      </h3>

      <p>
        Dribbling is another area where raw goal totals cannot explain a
        player's complete attacking contribution. A successful dribble can
        eliminate a defender, break a pressing line, move the ball into the
        final third or create space for a shot or pass. For players who
        regularly receive possession against compact defences, this ability
        can fundamentally change the shape of an attack.
      </p>

      {(() => {
        const m =
          groupedStats["successful_dribbles"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["successful_dribbles"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        const difference = Math.abs(m.stat_value - r.stat_value)

        return (
          <>
            <p>
              In the successful-dribble data currently available, Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              successful dribbles and Ronaldo has{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
              {m.stat_value !== r.stat_value &&
                ` The numerical difference is ${difference.toLocaleString()} successful dribbles.`}
            </p>

            <p>
              This difference should also be understood in tactical context.
              The two players have not occupied identical positions throughout
              their careers. Their responsibilities changed with age, team,
              coach and competition. The statistic is therefore most useful
              for showing one dimension of their playing profiles rather than
              pretending they performed the same role.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          AERIAL
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo Aerial Ability
      </h3>

      {(() => {
        const m =
          groupedStats["aerial_duels_won"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["aerial_duels_won"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        const difference = Math.abs(m.stat_value - r.stat_value)

        return (
          <>
            <p>
              Aerial football presents a very different attacking challenge.
              In the aerial-duel category, Messi has won{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              duels, compared with Ronaldo's{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
              {m.stat_value !== r.stat_value &&
                ` The current difference is ${difference.toLocaleString()} aerial duels.`}
            </p>

            <p>
              Aerial statistics are useful because they capture a skill that
              is largely invisible in basic goal-and-assist comparisons.
              Timing, positioning, jumping ability, body control and the
              ability to compete with defenders all affect performance in the
              air. Ronaldo's aerial game has been a particularly recognizable
              element of his attacking profile, while Messi's attacking game
              has generally relied more heavily on ground-based combinations,
              close control and ball progression.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          xG
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo Expected Goals (xG)
      </h3>

      <p>
        Expected goals, commonly shortened to xG, attempts to estimate the
        quality of scoring chances rather than simply counting how many shots
        were taken. A high-quality chance close to goal normally receives a
        higher xG value than a difficult attempt from distance. This makes xG
        useful when studying finishing because it provides context for the
        opportunities a player receives.
      </p>

      {(() => {
        const m =
          groupedStats["xg"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["xg"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <p>
            For the period represented by the xG data in this database,
            Messi's expected-goal figure is{" "}
            <strong className="text-blue-400">
              {(m.stat_value / 100).toFixed(2)}
            </strong>,
            while Ronaldo's is{" "}
            <strong className="text-red-400">
              {(r.stat_value / 100).toFixed(2)}
            </strong>.
            These figures are most informative when compared with the
            corresponding goal totals for the same data scope.
          </p>
        )
      })()}

      <p>
        It is important not to read xG as a direct ranking of player quality.
        It describes the probability associated with chances and can vary
        according to the model and data provider. Nevertheless, when used
        carefully, it can help separate chance creation and shot selection
        from the eventual outcome of the shot.
      </p>


      {/* =====================================================
          xA - only displayed if present
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["xa"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["xa"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white text-lg font-bold mt-10">
              Messi vs Ronaldo Expected Assists (xA)
            </h3>

            <p>
              Expected assists, or xA, applies a similar idea to chance
              creation. Rather than judging a pass only by whether the
              receiving player scored, xA estimates the likelihood that the
              created opportunity would become a goal. Messi currently has an
              xA value of{" "}
              <strong className="text-blue-400">
                {(m.stat_value / 100).toFixed(2)}
              </strong>{" "}
              in this dataset, while Ronaldo's value is{" "}
              <strong className="text-red-400">
                {(r.stat_value / 100).toFixed(2)}
              </strong>.
            </p>

            <p>
              This is particularly valuable in a Messi vs Ronaldo comparison
              because assists alone can hide good creative work. A perfectly
              weighted pass may not become an assist if the teammate misses
              the chance. Expected assists provide another way of studying the
              quality of opportunities a player creates.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          MATCH RATINGS
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi vs Ronaldo Average Match Ratings
      </h3>

      {(() => {
        const m =
          groupedStats["average_rating"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["average_rating"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <p>
              Average match ratings attempt to combine several aspects of a
              player's performance into one overall score. In the rating data
              used here, Messi has an average of{" "}
              <strong className="text-blue-400">
                {(m.stat_value / 100).toFixed(2)}
              </strong>,
              compared with{" "}
              <strong className="text-red-400">
                {(r.stat_value / 100).toFixed(2)}
              </strong>{" "}
              for Ronaldo.
            </p>

            <p>
              Match ratings should always be interpreted carefully because
              rating systems can use different formulas. Their value is
              greatest when the same methodology has been applied consistently
              to both players. In that situation, the numbers provide another
              indicator of how regularly a player influences matches across
              several statistical areas.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          MAN OF THE MATCH
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["man_of_the_match"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["man_of_the_match"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white text-lg font-bold mt-10">
              Who Has More Man of the Match Awards: Messi or Ronaldo?
            </h3>

            <p>
              Man of the Match awards provide another way of examining
              individual influence. Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              awards in the current dataset, while Ronaldo has{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
            </p>

            <p>
              Unlike a goal total, a Man of the Match award can reflect many
              different types of performance. A player might earn recognition
              through goals, assists, dribbling, chance creation or sustained
              influence throughout the match. That makes this category useful
              when the objective is to look beyond finishing alone.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          EL CLASICO
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["el_clasico_goals_assists"]?.find(
            s => s.player_id === 1
          )
        const r =
          groupedStats["el_clasico_goals_assists"]?.find(
            s => s.player_id === 2
          )

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white text-lg font-bold mt-10">
              Messi vs Ronaldo El Clasico Goals and Assists
            </h3>

            <p>
              El Clasico occupies a unique place in the Messi-Ronaldo rivalry.
              During the years in which Messi represented Barcelona and
              Ronaldo represented Real Madrid, many of their direct meetings
              took place in one of football's most closely watched fixtures.
              According to the goal-contribution category used on this page,
              Messi recorded{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              El Clasico goals and assists, while Ronaldo recorded{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
            </p>

            <p>
              These matches are particularly relevant because both players
              were competing against elite opposition while also facing each
              other's clubs directly. El Clasico numbers therefore provide a
              focused look at their output within one of the defining
              competitive settings of their careers.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          CHAMPIONS LEAGUE
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["ucl_knockout_goals_assists"]?.find(
            s => s.player_id === 1
          )
        const r =
          groupedStats["ucl_knockout_goals_assists"]?.find(
            s => s.player_id === 2
          )

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white text-lg font-bold mt-10">
              Messi vs Ronaldo Champions League Knockout Statistics
            </h3>

            <p>
              The UEFA Champions League is another major part of any
              Messi-Ronaldo comparison. Knockout matches are especially
              interesting because one poor result can end a team's European
              campaign. In the Champions League knockout goal-contribution
              statistic stored here, Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              contributions and Ronaldo has{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
            </p>

            <p>
              Knockout totals do not tell us everything about the quality of
              an individual performance, but they provide a useful measure of
              direct attacking output during the elimination stages of the
              competition. They can be considered alongside overall European
              records, match context and the strength of opposition.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          FINALS
      ====================================================== */}

      {(() => {
        const m =
          groupedStats["finals_goals_assists"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["finals_goals_assists"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white text-lg font-bold mt-10">
              Messi vs Ronaldo Goals and Assists in Finals
            </h3>

            <p>
              Finals are often used when discussing a player's ability to
              deliver in decisive matches. Based on the finals category
              represented in this database, Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              goal contributions in finals, compared with Ronaldo's{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
            </p>

            <p>
              A finals comparison needs context because no two finals are
              identical. The opposition, competition, tactical role and
              number of finals played all matter. Even so, goals and assists
              in these matches remain an important part of understanding how
              both players contributed when trophies were directly at stake.
            </p>
          </>
        )
      })()}


      {/* =====================================================
          DIFFERENT PLAYING STYLES
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Why Messi and Ronaldo's Statistics Reflect Different Playing Styles
      </h3>

      <p>
        Perhaps the most interesting result of comparing dozens of statistics
        is that the numbers do not simply produce a winner. They describe two
        different football profiles. Messi's statistical identity is closely
        connected with ball involvement, dribbling, passing and chance
        creation as well as scoring. Ronaldo's profile is strongly associated
        with shooting, movement, aerial play and finishing, alongside the
        extraordinary volume of goals he has accumulated.
      </p>

      {(() => {
        const kpM =
          groupedStats["key_passes"]?.find(s => s.player_id === 1)
        const kpR =
          groupedStats["key_passes"]?.find(s => s.player_id === 2)

        const drM =
          groupedStats["successful_dribbles"]?.find(s => s.player_id === 1)
        const drR =
          groupedStats["successful_dribbles"]?.find(s => s.player_id === 2)

        const airM =
          groupedStats["aerial_duels_won"]?.find(s => s.player_id === 1)
        const airR =
          groupedStats["aerial_duels_won"]?.find(s => s.player_id === 2)

        if (!kpM || !kpR || !drM || !drR || !airM || !airR) return null

        return (
          <p>
            The contrast can be seen directly in the available numbers.
            Messi has{" "}
            <strong className="text-blue-400">
              {kpM.stat_value.toLocaleString()}
            </strong>{" "}
            key passes compared with Ronaldo's{" "}
            <strong className="text-red-400">
              {kpR.stat_value.toLocaleString()}
            </strong>,
            and{" "}
            <strong className="text-blue-400">
              {drM.stat_value.toLocaleString()}
            </strong>{" "}
            successful dribbles compared with{" "}
            <strong className="text-red-400">
              {drR.stat_value.toLocaleString()}
            </strong>.
            In aerial duels, the figures are{" "}
            <strong className="text-blue-400">
              {airM.stat_value.toLocaleString()}
            </strong>{" "}
            for Messi and{" "}
            <strong className="text-red-400">
              {airR.stat_value.toLocaleString()}
            </strong>{" "}
            for Ronaldo. Looking at these categories together is far more
            informative than treating any one of them as a standalone verdict.
          </p>
        )
      })()}


      {/* =====================================================
          LONGEVITY
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Longevity: An Essential Part of the Messi vs Ronaldo Debate
      </h3>

      <p>
        Another reason this comparison is unusual is its duration. Most great
        football rivalries are built around a few seasons or a limited number
        of direct meetings. Messi and Ronaldo remained central figures in
        elite football across different tactical eras, different teammates,
        different managers and different stages of their physical development.
      </p>

      <p>
        Longevity changes the meaning of cumulative statistics. Maintaining
        elite production over many seasons requires more than a brilliant
        peak. Players must adapt to age, injuries, tactical changes and new
        leagues. Messi's role evolved from a wide attacker into a central
        scorer, creator and deeper playmaker at different points. Ronaldo
        evolved from a highly direct wide player into an increasingly
        penalty-area-focused scorer.
      </p>

      <p>
        Those changes matter when reading career statistics. A number
        accumulated over an entire career may combine several versions of the
        same footballer. That is one reason why this page separates different
        categories rather than reducing everything to a single career total.
      </p>


      {/* =====================================================
          HOW TO INTERPRET DATA
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        How to Read Messi vs Ronaldo Statistics Correctly
      </h3>

      <p>
        Football statistics are most useful when their definitions and context
        are understood. A larger number does not automatically mean a player
        was better in every sense. Cumulative statistics are affected by the
        number of matches played. Percentage statistics measure something
        different from totals. Advanced metrics may also depend on the
        methodology and historical coverage of the data provider.
      </p>

      <p>
        Competition level is another consideration. League matches, domestic
        cups, international fixtures, Champions League games and finals
        present different circumstances. Team quality also affects the type
        and number of opportunities available to an attacker. The same is true
        of tactical responsibility: a player asked to create from deeper
        positions will naturally accumulate a different statistical profile
        from a striker positioned close to goal.
      </p>

      <p>
        For these reasons, the fairest comparison uses several related
        statistics together. Goals can be examined with shots and xG.
        Assists can be examined with key passes, throughballs and big chances
        created. Dribbling can be studied separately from aerial play. Big-game
        production can be evaluated through El Clasico, Champions League
        knockout and finals statistics.
      </p>


      {/* =====================================================
          CATEGORY SCORE
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Who Leads More Statistical Categories: Messi or Ronaldo?
      </h3>

      <p>
        Using the direct comparison system on this page, Messi currently leads
        in{" "}
        <strong className="text-blue-400">
          {totalMessiWins}
        </strong>{" "}
        categories and Ronaldo leads in{" "}
        <strong className="text-red-400">
          {totalRonaldoWins}
        </strong>.
        Any equal-value categories are treated separately rather than being
        awarded to either player.
      </p>

      {totalMessiWins > totalRonaldoWins ? (
        <p>
          Messi currently leads more of the statistical categories included
          in this dataset. That overall advantage should be interpreted
          alongside the individual categories themselves, because the size
          and meaning of each lead can differ considerably. His strongest
          areas in this comparison can be identified by looking at the
          playmaking, ball-carrying, scoring and match-influence sections
          above.
        </p>
      ) : totalRonaldoWins > totalMessiWins ? (
        <p>
          Ronaldo currently leads more of the statistical categories included
          in this dataset. The category count is useful as a quick summary,
          but the individual statistics provide the necessary context. His
          strongest advantages can be understood by examining the finishing,
          aerial, shooting and big-game sections above.
        </p>
      ) : (
        <p>
          The two players currently lead the same number of categories in this
          dataset. The tie reinforces the importance of examining individual
          metrics rather than relying only on an overall category score.
        </p>
      )}


      {/* =====================================================
          WHO IS BETTER?
      ====================================================== */}

      <h3 className="text-white text-lg font-bold mt-10">
        Messi or Ronaldo: Who Has Better Statistics?
      </h3>

      <p>
        There is no useful one-word answer unless the question first defines
        what "better statistics" means. If the focus is creativity, passing,
        dribbling and involvement in chance creation, one set of metrics
        becomes important. If the focus is finishing, aerial ability, shooting
        volume or particular scoring records, another set becomes more
        relevant.
      </p>

      <p>
        That is exactly why the Messi vs Ronaldo debate has survived for so
        long. Both players can produce extraordinary numbers while reaching
        them through noticeably different footballing strengths. Statistics
        can clarify the argument, but they are most valuable when they explain
        those differences instead of being used simply to declare a winner.
      </p>

      <p>
        The best approach is to use the comparison cards above to examine the
        areas that matter most to you. If you value chance creation, study key
        passes, throughballs and big chances created. If you want to compare
        one-on-one ability, look at successful dribbles. For finishing, examine
        goals, non-penalty goals, shots, hat tricks and xG. For important-match
        output, compare El Clasico, Champions League knockout and finals
        contributions.
      </p>


      {/* =====================================================
          QUICK DYNAMIC SUMMARY
      ====================================================== */}

      <div className="mt-10 bg-gray-800/40 border border-gray-700/50 rounded-2xl p-5 sm:p-7">

        <h3 className="text-white text-lg font-bold mt-0">
          Messi vs Ronaldo Stats at a Glance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

          {Object.entries(groupedStats)
            .slice(0, 10)
            .map(([key, items]) => {

              const m = items.find(s => s.player_id === 1)
              const r = items.find(s => s.player_id === 2)

              if (!m || !r) return null

              const winner =
                m.stat_value > r.stat_value
                  ? "Messi"
                  : r.stat_value > m.stat_value
                    ? "Ronaldo"
                    : "Tie"

              return (
                <div
                  key={key}
                  className="bg-gray-900/70 border border-gray-700/50 rounded-xl p-4"
                >
                  <p className="text-white font-semibold text-xs mb-3">
                    {m.stat_label}
                  </p>

                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">
                      Messi: {m.stat_value.toLocaleString()}
                    </span>

                    <span className="text-red-400">
                      Ronaldo: {r.stat_value.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-600 text-[10px] mt-3">
                    {winner === "Tie"
                      ? "Currently tied"
                      : `${winner} leads this category`}
                  </p>
                </div>
              )
            })}

        </div>

      </div>


      {/* =====================================================
          FAQ
      ====================================================== */}

      <h2 className="text-xl sm:text-2xl font-black text-white mt-12">
        Messi vs Ronaldo Stats FAQ
      </h2>


      <h3 className="text-white font-bold mt-7">
        Who has better overall stats, Messi or Ronaldo?
      </h3>

      <p>
        It depends on the statistic being compared. On this page Messi leads
        {` ${totalMessiWins} `}of the available categories and Ronaldo leads
        {` ${totalRonaldoWins} `}. The individual categories are more useful
        than the total score because they measure different abilities such as
        scoring, creativity, dribbling, aerial play and big-game production.
      </p>


      {(() => {
        const m =
          groupedStats["hat_tricks"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["hat_tricks"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white font-bold mt-7">
              Who has more hat tricks, Messi or Ronaldo?
            </h3>

            <p>
              According to the hat-trick data currently displayed on this
              page, Messi has{" "}
              <strong className="text-blue-400">{m.stat_value}</strong>{" "}
              and Ronaldo has{" "}
              <strong className="text-red-400">{r.stat_value}</strong>.
              {m.stat_value === r.stat_value
                ? " They are currently level."
                : ` ${m.stat_value > r.stat_value ? "Messi" : "Ronaldo"} leads this category.`}
            </p>
          </>
        )
      })()}


      {(() => {
        const m =
          groupedStats["successful_dribbles"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["successful_dribbles"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white font-bold mt-7">
              Who has more successful dribbles, Messi or Ronaldo?
            </h3>

            <p>
              The current database records{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              successful dribbles for Messi and{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>{" "}
              for Ronaldo. This statistic measures one-on-one ball progression
              rather than scoring output.
            </p>
          </>
        )
      })()}


      {(() => {
        const m =
          groupedStats["key_passes"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["key_passes"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white font-bold mt-7">
              Who has more key passes, Messi or Ronaldo?
            </h3>

            <p>
              Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              key passes in the dataset compared with Ronaldo's{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
              Key passes are particularly useful when comparing their
              playmaking because they record chances created for teammates.
            </p>
          </>
        )
      })()}


      {(() => {
        const m =
          groupedStats["aerial_duels_won"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["aerial_duels_won"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white font-bold mt-7">
              Who is better in the air, Messi or Ronaldo?
            </h3>

            <p>
              The aerial-duel data gives one measurable answer to that
              question. Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              aerial duels won and Ronaldo has{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
              Aerial performance is only one part of attacking football, but
              it highlights one of the clearest stylistic differences between
              the two players.
            </p>
          </>
        )
      })()}


      {(() => {
        const m =
          groupedStats["man_of_the_match"]?.find(s => s.player_id === 1)
        const r =
          groupedStats["man_of_the_match"]?.find(s => s.player_id === 2)

        if (!m || !r) return null

        return (
          <>
            <h3 className="text-white font-bold mt-7">
              Who has more Man of the Match awards?
            </h3>

            <p>
              Messi has{" "}
              <strong className="text-blue-400">
                {m.stat_value.toLocaleString()}
              </strong>{" "}
              Man of the Match awards in the current data and Ronaldo has{" "}
              <strong className="text-red-400">
                {r.stat_value.toLocaleString()}
              </strong>.
            </p>
          </>
        )
      })()}


      <h3 className="text-white font-bold mt-7">
        Are Messi and Ronaldo stats directly comparable?
      </h3>

      <p>
        They can be compared, but context matters. They have played different
        roles, competed in different leagues and teams, and changed their
        playing styles throughout long careers. The fairest approach is to
        compare multiple categories and understand what each statistic
        actually measures.
      </p>


      <h3 className="text-white font-bold mt-7">
        Why compare advanced Messi and Ronaldo statistics?
      </h3>

      <p>
        Advanced statistics reveal contributions that goals and assists alone
        cannot fully capture. Key passes describe chance creation, successful
        dribbles describe ball-carrying ability, aerial duels measure another
        physical dimension, while xG and xA add context to shooting and chance
        creation. Combining these metrics gives a more complete picture of
        each player's game.
      </p>


      <h3 className="text-white font-bold mt-7">
        How often are the statistics updated?
      </h3>

      <p>
        The figures displayed in this article are generated from the same
        statistical database used by the comparison cards above. When the
        underlying values are updated, the dynamic numbers in this analysis
        update with them. This keeps the written comparison connected to the
        statistics shown elsewhere on the page.
      </p>


      {/* =====================================================
          FINAL EDITORIAL CONCLUSION
      ====================================================== */}

      <h2 className="text-xl sm:text-2xl font-black text-white mt-12">
        Final Messi vs Ronaldo Statistical Analysis
      </h2>

      <p>
        After looking beyond the headline totals, the Messi vs Ronaldo debate
        becomes more interesting rather than less. The statistics show that
        greatness in football does not have to follow one template. A player
        can dominate through creativity, close control, passing and scoring,
        while another can build an extraordinary career through movement,
        finishing, physical qualities, aerial ability and relentless scoring
        production.
      </p>

      <p>
        Messi's numbers across creative and ball-progression categories help
        explain why his influence is often discussed in terms broader than
        goals alone. Ronaldo's scoring, shooting and aerial statistics help
        explain why he has remained one of football's most feared finishers
        across different teams and stages of his career. Where either player
        leads, the statistic should be viewed as evidence of a particular
        strength rather than proof that every other aspect of the debate has
        been settled.
      </p>

      <p>
        That is ultimately what makes a detailed statistical comparison more
        valuable than a simple argument about a single record. Goals matter.
        Assists matter. But so do key passes, dribbles, chance quality, aerial
        duels, match ratings and performances in important competitions.
        Looking at all of them together allows the careers of Lionel Messi and
        Cristiano Ronaldo to be understood with considerably more context.
      </p>

      <p>
        The comparison above will continue to reflect the values stored in the
        site's statistical database. Explore each category individually,
        compare the numbers and decide which qualities matter most to your own
        interpretation of the greatest-player debate.
      </p>

    </div>
  </div>
</section>

          {/* Bottom CTA */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-xl sm:text-2xl font-black text-white">Who Do You Think Is Better?</h2>
            <p className="text-gray-400 text-sm">Cast your vote in the world's biggest football debate</p>
            <a href="/poll" className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Vote Now
            </a>
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