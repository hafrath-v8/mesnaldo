// pages/assists.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AssistsPageProps {
  messi: any; ronaldo: any
  messiIntlAssists: number; ronaldoIntlAssists: number
  messiUclAssists: number; ronaldoUclAssists: number
  messiClubAssists: number; ronaldoClubAssists: number
  messiAssistsInWins: number; ronaldoAssistsInWins: number
  messiAssistsInDraws: number; ronaldoAssistsInDraws: number
  messiAssistsInLosses: number; ronaldoAssistsInLosses: number
  messiHomeAssists: number; ronaldoHomeAssists: number
  messiAwayAssists: number; ronaldoAwayAssists: number
  messiStarterAssists: number; ronaldoStarterAssists: number
  messiSuperSubAssists: number; ronaldoSuperSubAssists: number
  messiMultiAssistMatches: number; ronaldoMultiAssistMatches: number
  messiHatTrickAssists: number; ronaldoHatTrickAssists: number
  messiTeamBreakdown: { team: string; assists: number }[]
  ronaldoTeamBreakdown: { team: string; assists: number }[]
  messiGoalContributions: number; ronaldoGoalContributions: number
  messiAssistsPerGame: number; ronaldoAssistsPerGame: number
  messiMinutesPerAssist: number; ronaldoMinutesPerAssist: number
}

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"
const UCL_COMPETITIONS = ["Champs League", "Champions League", "Champions League Qualifying"]

const MESSI_COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB", "#1D4ED8", "#1E40AF"]
const RONALDO_COLORS = ["#EF4444", "#F87171", "#FCA5A5", "#DC2626", "#B91C1C", "#991B1B"]

function safeNum(val: any): number { return typeof val === 'number' ? val : 0 }

function StatCard({ label, messiValue, ronaldoValue, suffix = "", lowerIsBetter = false }: {
  label: string; messiValue: number; ronaldoValue: number; suffix?: string; lowerIsBetter?: boolean
}) {
  const m = safeNum(messiValue)
  const r = safeNum(ronaldoValue)
  const messiWins = lowerIsBetter ? m < r : m > r
  const ronaldoWins = lowerIsBetter ? r < m : r > m
  const winner = messiWins ? "messi" : ronaldoWins ? "ronaldo" : "tie"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className={`${CARD_BASE} p-5 sm:p-6`}>
      <p className="text-xs text-gray-400 mb-4 text-center font-medium uppercase tracking-wider">{label}</p>
      <div className="flex items-center justify-center gap-5 sm:gap-8 mb-3">
        <div className="text-center flex-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-2 shadow-lg shadow-blue-500/10">
            <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
          </div>
          <p className={`text-xl sm:text-2xl font-black ${winner === "messi" ? "text-blue-400" : "text-gray-400"}`}>{m.toLocaleString()}{suffix}</p>
          <p className="text-[10px] text-gray-600 mt-0.5">Messi</p>
          {winner === "messi" && <span className="text-[10px] text-amber-400">👑</span>}
        </div>
        <span className="text-xs text-gray-700 font-medium pt-6">vs</span>
        <div className="text-center flex-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-2 shadow-lg shadow-red-500/10">
            <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
          </div>
          <p className={`text-xl sm:text-2xl font-black ${winner === "ronaldo" ? "text-red-400" : "text-gray-400"}`}>{r.toLocaleString()}{suffix}</p>
          <p className="text-[10px] text-gray-600 mt-0.5">Ronaldo</p>
          {winner === "ronaldo" && <span className="text-[10px] text-amber-400">👑</span>}
        </div>
      </div>
      {winner !== "tie" && (
        <p className={`text-center text-[10px] font-medium ${winner === "messi" ? "text-blue-400" : "text-red-400"}`}>
          {winner === "messi" ? "Messi" : "Ronaldo"} {lowerIsBetter ? "better" : "leads"} by {Math.abs(m - r).toLocaleString()}{suffix}
        </p>
      )}
    </motion.div>
  )
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  )
}

function TeamBreakdownChart({ player, data, color, img }: { player: string; data: { team: string; assists: number }[]; color: string; img: string }) {
  const total = data.reduce((s, d) => s + d.assists, 0)
  const colors = color === "blue" ? MESSI_COLORS : RONALDO_COLORS
  return (
    <div className={`${CARD_BASE} p-5 sm:p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${color === "blue" ? "border-blue-500/30" : "border-red-500/30"}`}>
          <Image src={img} alt={player} fill className="object-cover" />
        </div>
        <div>
          <h3 className={`font-bold text-sm ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{player}</h3>
          <p className="text-[10px] text-gray-500">Assists by club/nation</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={2} dataKey="assists">
                {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-1.5">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colors[i % colors.length] }} />
              <span className="text-xs text-gray-300 flex-1 truncate">{d.team}</span>
              <span className={`text-xs font-bold ${color === "blue" ? "text-blue-400" : "text-red-400"}`}>{d.assists}</span>
              <span className="text-[10px] text-gray-600">{((d.assists / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function fetchAllMatches(playerId: number) {
  const pageSize = 1000
  let allRows: any[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from("matches").select("assists, goals, team, competition, round, venue, result, minutes_played")
      .eq("player_id", playerId).range(from, from + pageSize - 1).order("id", { ascending: true })
    if (error || !data || data.length === 0) break
    allRows = allRows.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return allRows
}

export default function Assists(props: AssistsPageProps) {
  const { messi, ronaldo, messiIntlAssists, ronaldoIntlAssists, messiUclAssists, ronaldoUclAssists, messiClubAssists, ronaldoClubAssists, messiAssistsInWins, ronaldoAssistsInWins, messiAssistsInDraws, ronaldoAssistsInDraws, messiAssistsInLosses, ronaldoAssistsInLosses, messiHomeAssists, ronaldoHomeAssists, messiAwayAssists, ronaldoAwayAssists, messiStarterAssists, ronaldoStarterAssists, messiSuperSubAssists, ronaldoSuperSubAssists, messiMultiAssistMatches, ronaldoMultiAssistMatches, messiHatTrickAssists, ronaldoHatTrickAssists, messiTeamBreakdown, ronaldoTeamBreakdown, messiGoalContributions, ronaldoGoalContributions, messiAssistsPerGame, ronaldoAssistsPerGame, messiMinutesPerAssist, ronaldoMinutesPerAssist } = props

  if (!messi || !ronaldo) {
    return (
      <Layout title="Assists Comparison">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  const messiTotal = safeNum(messi.total_assists)
  const ronaldoTotal = safeNum(ronaldo.total_assists)
  const messiGames = safeNum(messi.total_games) || 1
  const ronaldoGames = safeNum(ronaldo.total_games) || 1
  const messiMinutes = safeNum(messi.total_minutes) || 1
  const ronaldoMinutes = safeNum(ronaldo.total_minutes) || 1

  return (
<Layout
  title="Messi vs Ronaldo Assists | Complete Assists Comparison"
  description="Compare Messi vs Ronaldo assists, including career assists, club and international assists, assist records, and detailed statistics updated for 2026."
>
        <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-14 sm:space-y-16 lg:space-y-20">

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Assists Comparison</h1>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">Complete career playmaking statistics</p>
          </div>

          <section>
            <SectionHeading title="Total Career Assists" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <div className={`${CARD_BASE} p-6 sm:p-8 text-center`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blue-500/40 mx-auto mb-4 shadow-xl shadow-blue-500/20">
                  <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                </div>
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-400">{messiTotal.toLocaleString()}</motion.p>
                <p className="text-xs text-gray-500 mt-2">Lionel Messi</p>
              </div>
              <div className={`${CARD_BASE} p-6 sm:p-8 text-center`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-red-500/40 mx-auto mb-4 shadow-xl shadow-red-500/20">
                  <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                </div>
                <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring" }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-400">{ronaldoTotal.toLocaleString()}</motion.p>
                <p className="text-xs text-gray-500 mt-2">Cristiano Ronaldo</p>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading title="Assists by Competition" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Club Assists" messiValue={messiClubAssists} ronaldoValue={ronaldoClubAssists} />
              <StatCard label="International" messiValue={messiIntlAssists} ronaldoValue={ronaldoIntlAssists} />
              <StatCard label="Champions League" messiValue={messiUclAssists} ronaldoValue={ronaldoUclAssists} />
            </div>
          </section>

          <section>
            <SectionHeading title="Assists by Team" subtitle="Distribution across clubs & country" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <TeamBreakdownChart player="Lionel Messi" data={messiTeamBreakdown} color="blue" img="/images/messi.webp" />
              <TeamBreakdownChart player="Cristiano Ronaldo" data={ronaldoTeamBreakdown} color="red" img="/images/ronaldo.webp" />
            </div>
          </section>

          <section>
            <SectionHeading title="Assists by Match Result" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Assists in Wins" messiValue={messiAssistsInWins} ronaldoValue={ronaldoAssistsInWins} />
              <StatCard label="Assists in Draws" messiValue={messiAssistsInDraws} ronaldoValue={ronaldoAssistsInDraws} />
              <StatCard label="Assists in Losses" messiValue={messiAssistsInLosses} ronaldoValue={ronaldoAssistsInLosses} />
            </div>
          </section>

          <section>
            <SectionHeading title="Advanced Breakdown" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <StatCard label="Goal Contributions" messiValue={messiGoalContributions} ronaldoValue={ronaldoGoalContributions} />
              <StatCard label="Home Assists" messiValue={messiHomeAssists} ronaldoValue={ronaldoHomeAssists} />
              <StatCard label="Away Assists" messiValue={messiAwayAssists} ronaldoValue={ronaldoAwayAssists} />
              <StatCard label="Starter Assists" messiValue={messiStarterAssists} ronaldoValue={ronaldoStarterAssists} />
              <StatCard label="Super Sub Assists" messiValue={messiSuperSubAssists} ronaldoValue={ronaldoSuperSubAssists} />
              <StatCard label="Multi-Assist Matches" messiValue={messiMultiAssistMatches} ronaldoValue={ronaldoMultiAssistMatches} />
              <StatCard label="Hat-Trick Assists" messiValue={messiHatTrickAssists} ronaldoValue={ronaldoHatTrickAssists} />
            </div>
          </section>

          <section>
            <SectionHeading title="Efficiency" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <StatCard label="Assists Per Game" messiValue={messiAssistsPerGame} ronaldoValue={ronaldoAssistsPerGame} />
              <StatCard label="Minutes Per Assist" messiValue={messiMinutesPerAssist} ronaldoValue={ronaldoMinutesPerAssist} suffix=" min" lowerIsBetter />
              <StatCard label="G+A Per Game" messiValue={+((safeNum(messi.total_goals) + messiTotal) / messiGames).toFixed(2)} ronaldoValue={+((safeNum(ronaldo.total_goals) + ronaldoTotal) / ronaldoGames).toFixed(2)} />
            </div>
          </section>
{/* =========================================================
    SEO CONTENT SECTION - ASSISTS PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Assists: Complete Career Playmaking Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      {/* INTRODUCTION */}

      <p>
        The <strong className="text-white">Messi vs Ronaldo assists</strong>{" "}
        comparison is one of the best ways to understand the creative side of
        their rivalry. Both Lionel Messi and Cristiano Ronaldo are known
        primarily for extraordinary goal-scoring careers, but they have also
        created a huge number of goals for teammates through passing, crossing,
        combination play and chance creation.
      </p>

      <p>
        Assists add another dimension to the Messi vs Ronaldo debate because
        football is not only about who finishes an attack. A complete attacking
        player can score goals while also creating them. Looking at career
        assists, assists per game, minutes per assist, club assists,
        international assists and Champions League assists gives a clearer
        picture of how involved each player has been in creating goals.
      </p>

      <p>
        This page uses the current assist data stored in Mesnaldo to compare
        Lionel Messi and Cristiano Ronaldo across several different
        playmaking categories. The statistics below come from the same player
        and match data used by the comparison cards above.
      </p>


      {/* TOTAL CAREER ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Total Career Assists
      </h3>

      <p>
        According to the current career statistics on this page,{" "}
        <strong className="text-blue-400">Lionel Messi</strong> has recorded{" "}
        <strong className="text-white">
          {messiTotal.toLocaleString()}
        </strong>{" "}
        career assists, while{" "}
        <strong className="text-red-400">Cristiano Ronaldo</strong> has{" "}
        <strong className="text-white">
          {ronaldoTotal.toLocaleString()}
        </strong>.
      </p>

      {(() => {
        const difference = Math.abs(messiTotal - ronaldoTotal)

        if (messiTotal === ronaldoTotal) {
          return (
            <p>
              Messi and Ronaldo are currently level in total assists according
              to the data displayed on this page.
            </p>
          )
        }

        const leader =
          messiTotal > ronaldoTotal ? "Lionel Messi" : "Cristiano Ronaldo"

        return (
          <p>
            Based on the current figures,{" "}
            <strong className="text-white">{leader}</strong> leads the career
            assist comparison by{" "}
            <strong className="text-white">
              {difference.toLocaleString()}
            </strong>{" "}
            assists. However, total assists should also be considered
            alongside appearances and playing time because the two players
            have played different numbers of matches.
          </p>
        )
      })()}


      {/* ASSISTS PER GAME */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Assists Per Game
      </h3>

      <p>
        Total assists measure career volume, while assists per game show how
        frequently each player creates a recorded goal for a teammate.
        Messi currently averages approximately{" "}
        <strong className="text-blue-400">
          {messiAssistsPerGame.toFixed(2)}
        </strong>{" "}
        assists per appearance, compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {ronaldoAssistsPerGame.toFixed(2)}
        </strong>.
      </p>

      <p>
        This comparison is useful because a player with more appearances may
        accumulate a higher raw total even if another player creates assists
        at a greater rate. Looking at both career totals and per-game numbers
        therefore provides more context.
      </p>


      {/* MINUTES PER ASSIST */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Minutes Per Assist
      </h3>

      <p>
        Minutes per assist measures how much playing time each player needs,
        on average, to register an assist. In the current career data, Messi
        records an assist approximately once every{" "}
        <strong className="text-blue-400">
          {messiMinutesPerAssist.toLocaleString()} minutes
        </strong>,
        while Ronaldo records one approximately every{" "}
        <strong className="text-red-400">
          {ronaldoMinutesPerAssist.toLocaleString()} minutes
        </strong>.
      </p>

      <p>
        Unlike total assists, lower is better in this category because fewer
        minutes per assist means the player creates assisted goals more
        frequently relative to actual playing time.
      </p>


      {/* CLUB ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Club Assists
      </h3>

      <p>
        Club football represents the largest portion of both players&apos;
        careers. Messi currently has{" "}
        <strong className="text-blue-400">
          {messiClubAssists.toLocaleString()}
        </strong>{" "}
        club assists in the data used by Mesnaldo, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoClubAssists.toLocaleString()}
        </strong>.
      </p>

      <p>
        Club assists include the creative contributions produced for the
        teams they have represented across domestic and continental
        competitions in the available dataset. Comparing this category
        separately from international football makes it easier to see where
        most of their career playmaking has taken place.
      </p>


      {/* INTERNATIONAL ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo International Assists
      </h3>

      <p>
        In international football, Messi currently has{" "}
        <strong className="text-blue-400">
          {messiIntlAssists.toLocaleString()}
        </strong>{" "}
        assists for Argentina in the matches represented in the database,
        while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoIntlAssists.toLocaleString()}
        </strong>{" "}
        assists for Portugal.
      </p>

      <p>
        International assists can be particularly interesting because
        national teams operate in a different environment from club football.
        Players spend less time training together, matches are less frequent,
        and major tournaments such as the World Cup and continental
        championships carry unique tactical pressures.
      </p>


      {/* UCL ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Assists
      </h3>

      <p>
        The UEFA Champions League was one of the defining competitions of the
        Messi-Ronaldo era. In the Champions League competitions recognised by
        this page, Messi has{" "}
        <strong className="text-blue-400">
          {messiUclAssists.toLocaleString()}
        </strong>{" "}
        assists and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoUclAssists.toLocaleString()}
        </strong>.
      </p>

      <p>
        Champions League assists highlight the creative contribution each
        player made against elite European opposition. These figures add
        important context to their Champions League goal totals because they
        measure not only finishing, but also direct involvement in creating
        goals for teammates.
      </p>


      {/* GOAL CONTRIBUTIONS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Goal Contributions
      </h3>

      <p>
        One of the best ways to combine scoring and playmaking is to look at
        total goal contributions, calculated as goals plus assists.
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messiGoalContributions.toLocaleString()}
        </strong>{" "}
        career goal contributions, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoGoalContributions.toLocaleString()}
        </strong>.
      </p>

      {(() => {
        const messiGAperGame =
          (safeNum(messi.total_goals) + messiTotal) / messiGames

        const ronaldoGAperGame =
          (safeNum(ronaldo.total_goals) + ronaldoTotal) / ronaldoGames

        return (
          <p>
            Relative to appearances, Messi currently averages approximately{" "}
            <strong className="text-blue-400">
              {messiGAperGame.toFixed(2)}
            </strong>{" "}
            goals plus assists per game, compared with Ronaldo&apos;s{" "}
            <strong className="text-red-400">
              {ronaldoGAperGame.toFixed(2)}
            </strong>.
            This combines scoring and assisting into one broad measure of
            direct attacking output.
          </p>
        )
      })()}


      {/* PLAYING STYLES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi and Ronaldo as Playmakers
      </h3>

      <p>
        The assist comparison also helps highlight differences in playing
        style. Lionel Messi has frequently operated as both a scorer and
        creator, dropping into deeper attacking positions to receive the ball,
        combine with teammates and make the final pass.
      </p>

      <p>
        Cristiano Ronaldo has also provided assists throughout his career,
        particularly during periods when he played as a winger or wide
        forward. As his role gradually became more focused on finishing and
        penalty-area movement, his creative responsibilities changed.
      </p>

      <p>
        This makes career assist totals especially useful when comparing the
        evolution of both players. Their final numbers reflect not only
        ability, but also tactical role, team structure, position and the
        different phases of their careers.
      </p>


      {/* ASSISTS BY RESULT */}

      <h3 className="text-xl font-bold text-white mt-10">
        Assists in Wins, Draws and Losses
      </h3>

      <p>
        Mesnaldo also separates assists according to the final result of the
        match. Messi has recorded{" "}
        <strong className="text-blue-400">
          {messiAssistsInWins.toLocaleString()}
        </strong>{" "}
        assists in wins,{" "}
        <strong className="text-blue-400">
          {messiAssistsInDraws.toLocaleString()}
        </strong>{" "}
        in draws and{" "}
        <strong className="text-blue-400">
          {messiAssistsInLosses.toLocaleString()}
        </strong>{" "}
        in defeats.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoAssistsInWins.toLocaleString()}
        </strong>{" "}
        assists in victories,{" "}
        <strong className="text-red-400">
          {ronaldoAssistsInDraws.toLocaleString()}
        </strong>{" "}
        in draws and{" "}
        <strong className="text-red-400">
          {ronaldoAssistsInLosses.toLocaleString()}
        </strong>{" "}
        in defeats.
      </p>

      <p>
        These values do not prove that an assist directly caused the final
        result, but they show how each player&apos;s creative contributions are
        distributed across different match outcomes.
      </p>


      {/* HOME AWAY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Home and Away Assists
      </h3>

      <p>
        Venue splits provide another way to examine playmaking consistency.
        Messi has{" "}
        <strong className="text-blue-400">
          {messiHomeAssists.toLocaleString()}
        </strong>{" "}
        home assists and{" "}
        <strong className="text-blue-400">
          {messiAwayAssists.toLocaleString()}
        </strong>{" "}
        away assists in the available match data.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoHomeAssists.toLocaleString()}
        </strong>{" "}
        home assists and{" "}
        <strong className="text-red-400">
          {ronaldoAwayAssists.toLocaleString()}
        </strong>{" "}
        away assists.
      </p>

      <p>
        Away matches can involve different tactical conditions, crowd
        pressure and game states, making home-versus-away splits an
        interesting additional comparison.
      </p>


      {/* MULTI ASSIST */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Multi-Assist Matches
      </h3>

      <p>
        Providing two or more assists in one match represents a particularly
        strong creative performance. Messi has recorded{" "}
        <strong className="text-blue-400">
          {messiMultiAssistMatches.toLocaleString()}
        </strong>{" "}
        matches with at least two assists in the available data, while
        Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoMultiAssistMatches.toLocaleString()}
        </strong>.
      </p>

      <p>
        These performances show occasions where a player influenced several
        scoring moves within the same match rather than producing only one
        final pass.
      </p>


      {/* HAT TRICK ASSISTS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Matches With Three or More Assists
      </h3>

      <p>
        An even rarer creative performance is producing at least three
        assists in a single match. Messi has{" "}
        <strong className="text-blue-400">
          {messiHatTrickAssists.toLocaleString()}
        </strong>{" "}
        such matches in the database, compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {ronaldoHatTrickAssists.toLocaleString()}
        </strong>.
      </p>

      <p>
        Because this statistic counts matches with three or more assists, a
        performance containing four assists would also be included.
      </p>


      {/* STARTER / SUB */}

      <h3 className="text-xl font-bold text-white mt-10">
        Assists as a Starter and Substitute
      </h3>

      <p>
        Playing time can also affect assist opportunities. Messi has{" "}
        <strong className="text-blue-400">
          {messiStarterAssists.toLocaleString()}
        </strong>{" "}
        assists in appearances classified by this page as starter-level
        playing time, and{" "}
        <strong className="text-blue-400">
          {messiSuperSubAssists.toLocaleString()}
        </strong>{" "}
        assists in appearances lasting 30 minutes or fewer.
      </p>

      <p>
        Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoStarterAssists.toLocaleString()}
        </strong>{" "}
        starter assists and{" "}
        <strong className="text-red-400">
          {ronaldoSuperSubAssists.toLocaleString()}
        </strong>{" "}
        assists in appearances of 30 minutes or fewer.
      </p>


      {/* ASSISTS BY TEAM */}

      <h3 className="text-xl font-bold text-white mt-10">
        Assists by Club and National Team
      </h3>

      <p>
        The team breakdown above shows where Messi and Ronaldo accumulated
        their assists across the clubs and national teams represented in the
        database. This helps show how their creative output changed as they
        moved between teams, leagues and tactical systems.
      </p>

      <p>
        A player&apos;s assist numbers are partly influenced by the quality and
        movement of teammates around him. Playing in a possession-heavy team
        can create different passing opportunities from playing in a direct
        counter-attacking system, so team context remains important when
        interpreting assist totals.
      </p>


      {/* WHAT COUNTS AS ASSIST */}

      <h3 className="text-xl font-bold text-white mt-10">
        Why Assist Statistics Can Differ Between Sources
      </h3>

      <p>
        Assist totals sometimes vary between football databases because not
        every provider applies exactly the same definition. Some competitions
        and historical records may classify deflections, rebounds, penalties
        won or goalkeeper touches differently.
      </p>

      <p>
        For that reason, the most reliable Messi vs Ronaldo comparison is one
        that uses a consistent dataset and methodology for both players. The
        numbers on this page should be read according to the match and career
        data stored by Mesnaldo rather than mixing totals from different
        providers.
      </p>


      {/* ASSIST VS GOAL */}

      <h3 className="text-xl font-bold text-white mt-10">
        Goals vs Assists: Which Matters More?
      </h3>

      <p>
        Goals and assists measure different parts of attacking football.
        Goals record the final action of a scoring move, while assists measure
        the final credited pass or action before the goal.
      </p>

      <p>
        A great scorer can decide games through finishing, while a great
        creator can repeatedly produce opportunities for teammates. Messi and
        Ronaldo have both combined these abilities, but the balance between
        scoring and assisting has differed throughout their careers.
      </p>

      <p>
        That is why goal contributions can be useful alongside separate goals
        and assists. They provide one combined number while still allowing
        visitors to examine where that attacking output came from.
      </p>


      {/* HOW TO INTERPRET */}

      <h3 className="text-xl font-bold text-white mt-10">
        How to Interpret Messi vs Ronaldo Assist Statistics
      </h3>

      <p>
        No single assist statistic should decide the entire comparison.
        Career assists measure total production. Assists per game account for
        appearances. Minutes per assist consider playing time, while
        competition-specific figures show where the assists were produced.
      </p>

      <p>
        Tactical role is also essential. A player operating deeper and
        receiving more possession may naturally have more opportunities to
        create chances than a forward whose primary responsibility is to
        finish attacks inside the penalty area.
      </p>

      <p>
        The best way to compare Messi and Ronaldo as creators is therefore to
        consider several categories together rather than looking only at one
        total.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Assists FAQ
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more career assists, Messi or Ronaldo?
      </h3>

      <p>
        According to the current Mesnaldo career data, Messi has{" "}
        <strong className="text-blue-400">
          {messiTotal.toLocaleString()}
        </strong>{" "}
        assists and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoTotal.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has the better assists-per-game rate?
      </h3>

      <p>
        Messi currently averages{" "}
        <strong className="text-blue-400">
          {messiAssistsPerGame.toFixed(2)}
        </strong>{" "}
        assists per game, while Ronaldo averages{" "}
        <strong className="text-red-400">
          {ronaldoAssistsPerGame.toFixed(2)}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more club assists?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messiClubAssists.toLocaleString()}
        </strong>{" "}
        club assists compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {ronaldoClubAssists.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more international assists?
      </h3>

      <p>
        In the national-team matches represented in this database, Messi has{" "}
        <strong className="text-blue-400">
          {messiIntlAssists.toLocaleString()}
        </strong>{" "}
        assists for Argentina and Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoIntlAssists.toLocaleString()}
        </strong>{" "}
        for Portugal.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Champions League assists?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messiUclAssists.toLocaleString()}
        </strong>{" "}
        Champions League assists in the competitions recognised by this page,
        while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoUclAssists.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more total goal contributions?
      </h3>

      <p>
        Messi currently has{" "}
        <strong className="text-blue-400">
          {messiGoalContributions.toLocaleString()}
        </strong>{" "}
        combined goals and assists, while Ronaldo has{" "}
        <strong className="text-red-400">
          {ronaldoGoalContributions.toLocaleString()}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who creates assists more frequently?
      </h3>

      <p>
        The minutes-per-assist statistic currently shows Messi at approximately{" "}
        <strong className="text-blue-400">
          {messiMinutesPerAssist.toLocaleString()} minutes
        </strong>{" "}
        per assist and Ronaldo at approximately{" "}
        <strong className="text-red-400">
          {ronaldoMinutesPerAssist.toLocaleString()} minutes
        </strong>{" "}
        per assist. In this category, the lower number represents the more
        frequent assist rate.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Are these Messi vs Ronaldo assist statistics updated dynamically?
      </h3>

      <p>
        Yes. The values in this section are rendered from the same career and
        match-derived assist data supplied to the page. When the underlying
        database changes, the server-rendered comparison reflects the current
        stored values on the next request.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Playmaking Comparison
      </h2>

      <p>
        The Messi vs Ronaldo rivalry is often described as a goal-scoring
        debate, but assists show that their attacking influence extends beyond
        finishing. Both players have created goals for teammates across club
        football, international competition and the Champions League.
      </p>

      <p>
        Total career assists provide the headline number, while assists per
        game, minutes per assist, multi-assist matches, home and away splits
        and goal contributions provide deeper context. Together, these
        statistics help explain how each player contributed to attacking
        football in different ways.
      </p>

      <p>
        Mesnaldo&apos;s assist comparison is designed to make those differences
        easy to explore. Rather than relying on a single statistic, visitors
        can compare the complete playmaking profile of Lionel Messi and
        Cristiano Ronaldo and decide which aspects of creative performance
        matter most to them.
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
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    const messiMatches = await fetchAllMatches(1)
    const ronaldoMatches = await fetchAllMatches(2)

    const sumAssists = (arr: any[]) => arr.reduce((s: number, m: any) => s + (m.assists || 0), 0)
    const messiIntlAssists = sumAssists(messiMatches.filter(m => m.team === "Argentina"))
    const ronaldoIntlAssists = sumAssists(ronaldoMatches.filter(m => m.team === "Portugal"))
    const messiUclAssists = sumAssists(messiMatches.filter(m => UCL_COMPETITIONS.includes(m.competition || "")))
    const ronaldoUclAssists = sumAssists(ronaldoMatches.filter(m => UCL_COMPETITIONS.includes(m.competition || "")))
    const messiClubAssists = (messi?.total_assists || 0) - messiIntlAssists
    const ronaldoClubAssists = (ronaldo?.total_assists || 0) - ronaldoIntlAssists
    const messiAssistsInWins = sumAssists(messiMatches.filter(m => m.result === "W"))
    const ronaldoAssistsInWins = sumAssists(ronaldoMatches.filter(m => m.result === "W"))
    const messiAssistsInDraws = sumAssists(messiMatches.filter(m => m.result === "D"))
    const ronaldoAssistsInDraws = sumAssists(ronaldoMatches.filter(m => m.result === "D"))
    const messiAssistsInLosses = sumAssists(messiMatches.filter(m => m.result === "L"))
    const ronaldoAssistsInLosses = sumAssists(ronaldoMatches.filter(m => m.result === "L"))
    const messiHomeAssists = sumAssists(messiMatches.filter(m => m.venue === "H" || m.is_home === true))
    const ronaldoHomeAssists = sumAssists(ronaldoMatches.filter(m => m.venue === "H" || m.is_home === true))
    const messiAwayAssists = sumAssists(messiMatches.filter(m => m.venue === "A" || m.is_home === false))
    const ronaldoAwayAssists = sumAssists(ronaldoMatches.filter(m => m.venue === "A" || m.is_home === false))
    const messiStarterAssists = sumAssists(messiMatches.filter(m => (m.minutes_played || 0) >= 45))
    const ronaldoStarterAssists = sumAssists(ronaldoMatches.filter(m => (m.minutes_played || 0) >= 45))
    const messiSuperSubAssists = sumAssists(messiMatches.filter(m => (m.minutes_played || 0) <= 30))
    const ronaldoSuperSubAssists = sumAssists(ronaldoMatches.filter(m => (m.minutes_played || 0) <= 30))
    const messiMultiAssistMatches = messiMatches.filter(m => (m.assists || 0) >= 2).length
    const ronaldoMultiAssistMatches = ronaldoMatches.filter(m => (m.assists || 0) >= 2).length
    const messiHatTrickAssists = messiMatches.filter(m => (m.assists || 0) >= 3).length
    const ronaldoHatTrickAssists = ronaldoMatches.filter(m => (m.assists || 0) >= 3).length
    const messiGoalContributions = (messi?.total_goals || 0) + (messi?.total_assists || 0)
    const ronaldoGoalContributions = (ronaldo?.total_goals || 0) + (ronaldo?.total_assists || 0)
    const messiAssistsPerGame = +((messi?.total_assists || 0) / (messi?.total_games || 1)).toFixed(2)
    const ronaldoAssistsPerGame = +((ronaldo?.total_assists || 0) / (ronaldo?.total_games || 1)).toFixed(2)
    const messiMinutesPerAssist = Math.round((messi?.total_minutes || 1) / (messi?.total_assists || 1))
    const ronaldoMinutesPerAssist = Math.round((ronaldo?.total_minutes || 1) / (ronaldo?.total_assists || 1))

    const getTeamBreakdown = (matches: any[]) => {
      const map: Record<string, number> = {}
      matches.forEach(m => { const t = m.team || "Unknown"; map[t] = (map[t] || 0) + (m.assists || 0) })
      return Object.entries(map).map(([team, assists]) => ({ team, assists })).sort((a, b) => b.assists - a.assists).slice(0, 6)
    }

    return {
      props: {
        messi, ronaldo, messiIntlAssists, ronaldoIntlAssists, messiUclAssists, ronaldoUclAssists,
        messiClubAssists, ronaldoClubAssists, messiAssistsInWins, ronaldoAssistsInWins,
        messiAssistsInDraws, ronaldoAssistsInDraws, messiAssistsInLosses, ronaldoAssistsInLosses,
        messiHomeAssists, ronaldoHomeAssists, messiAwayAssists, ronaldoAwayAssists,
        messiStarterAssists, ronaldoStarterAssists, messiSuperSubAssists, ronaldoSuperSubAssists,
        messiMultiAssistMatches, ronaldoMultiAssistMatches, messiHatTrickAssists, ronaldoHatTrickAssists,
        messiTeamBreakdown: getTeamBreakdown(messiMatches),
        ronaldoTeamBreakdown: getTeamBreakdown(ronaldoMatches),
        messiGoalContributions, ronaldoGoalContributions,
        messiAssistsPerGame, ronaldoAssistsPerGame,
        messiMinutesPerAssist, ronaldoMinutesPerAssist,
      },
    }
  } catch (e) {
    return {
      props: {
        messi: null, ronaldo: null, messiIntlAssists: 0, ronaldoIntlAssists: 0, messiUclAssists: 0, ronaldoUclAssists: 0,
        messiClubAssists: 0, ronaldoClubAssists: 0, messiAssistsInWins: 0, ronaldoAssistsInWins: 0,
        messiAssistsInDraws: 0, ronaldoAssistsInDraws: 0, messiAssistsInLosses: 0, ronaldoAssistsInLosses: 0,
        messiHomeAssists: 0, ronaldoHomeAssists: 0, messiAwayAssists: 0, ronaldoAwayAssists: 0,
        messiStarterAssists: 0, ronaldoStarterAssists: 0, messiSuperSubAssists: 0, ronaldoSuperSubAssists: 0,
        messiMultiAssistMatches: 0, ronaldoMultiAssistMatches: 0, messiHatTrickAssists: 0, ronaldoHatTrickAssists: 0,
        messiTeamBreakdown: [], ronaldoTeamBreakdown: [], messiGoalContributions: 0, ronaldoGoalContributions: 0,
        messiAssistsPerGame: 0, ronaldoAssistsPerGame: 0, messiMinutesPerAssist: 0, ronaldoMinutesPerAssist: 0,
      },
    }
  }
}