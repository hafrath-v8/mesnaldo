import Layout from "@/components/layout/Layout"
import ComparisonBar from "@/components/ui/ComparisonBar"
import StatCard from "@/components/ui/StatCard"
import { supabase } from "@/lib/supabase"
import { CareerStats, SeasonSummary } from "@/types"
import { GetStaticProps } from "next"
import { useState } from "react"

interface CompareProps {
  messi: CareerStats
  ronaldo: CareerStats
  messiSeasons: SeasonSummary[]
  ronaldoSeasons: SeasonSummary[]
}

export default function Compare({ messi, ronaldo, messiSeasons, ronaldoSeasons }: CompareProps) {
  const [selectedSeason, setSelectedSeason] = useState("all")

  const allSeasons = [...new Set([
    ...messiSeasons.map((s) => s.season),
    ...ronaldoSeasons.map((s) => s.season)
  ])].sort()

  const getSeasonStats = (seasons: SeasonSummary[], season: string) => {
    if (season === "all") {
      return seasons.reduce((acc, s) => ({
        games: acc.games + s.games,
        goals: acc.goals + s.goals,
        assists: acc.assists + s.assists,
      }), { games: 0, goals: 0, assists: 0 })
    }
    return seasons.find((s) => s.season === season) || { games: 0, goals: 0, assists: 0 }
  }

  const messiSeason = getSeasonStats(messiSeasons, selectedSeason)
  const ronaldoSeason = getSeasonStats(ronaldoSeasons, selectedSeason)

  return (
    <Layout title="Compare Tool | Messi vs Ronaldo">
      <section className="py-12">
        <h1 className="text-4xl font-bold mb-2">Compare Tool</h1>
        <p className="text-neutral-500 mb-8">Select a season to compare stats</p>

        {/* Season Selector */}
        <div className="card mb-8">
          <label className="stat-label mb-2 block">Select Season</label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full md:w-64 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white"
          >
            <option value="all">All Time</option>
            {allSeasons.map((season) => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </div>

        {/* Comparison */}
        {selectedSeason !== "all" ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <StatCard label="Games" value={`${messiSeason.games} - ${ronaldoSeason.games}`} />
              <StatCard label="Goals" value={`${messiSeason.goals} - ${ronaldoSeason.goals}`} highlight />
              <StatCard label="Assists" value={`${messiSeason.assists} - ${ronaldoSeason.assists}`} />
            </div>
            <div className="card">
              <ComparisonBar label="Goals" messiValue={messiSeason.goals} ronaldoValue={ronaldoSeason.goals} maxValue={Math.max(messiSeason.goals, ronaldoSeason.goals)} />
              <ComparisonBar label="Assists" messiValue={messiSeason.assists} ronaldoValue={ronaldoSeason.assists} maxValue={Math.max(messiSeason.assists, ronaldoSeason.assists)} />
              <ComparisonBar label="Games" messiValue={messiSeason.games} ronaldoValue={ronaldoSeason.games} maxValue={Math.max(messiSeason.games, ronaldoSeason.games)} />
            </div>
          </>
        ) : (
          <div className="card">
            <ComparisonBar label="Total Goals" messiValue={messi.total_goals} ronaldoValue={ronaldo.total_goals} maxValue={Math.max(messi.total_goals, ronaldo.total_goals)} />
            <ComparisonBar label="Total Assists" messiValue={messi.total_assists} ronaldoValue={ronaldo.total_assists} maxValue={Math.max(messi.total_assists, ronaldo.total_assists)} />
            <ComparisonBar label="Total Games" messiValue={messi.total_games} ronaldoValue={ronaldo.total_games} maxValue={Math.max(messi.total_games, ronaldo.total_games)} />
          </div>
        )}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
  const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()

  const getSeasons = async (playerId: number) => {
    const { data } = await supabase.from("matches").select("date, goals, assists").eq("player_id", playerId)
    const map = new Map<string, SeasonSummary>()
    data?.forEach((m) => {
      const d = new Date(m.date)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const season = month < 7 ? `${year - 1}/${String(year).slice(2)}` : `${year}/${String(year + 1).slice(2)}`
      const existing = map.get(season) || { season, games: 0, goals: 0, assists: 0, club: "" }
      existing.games++
      existing.goals += m.goals
      existing.assists += m.assists
      map.set(season, existing)
    })
    return Array.from(map.values()).sort((a, b) => a.season.localeCompare(b.season))
  }

  return {
    props: {
      messi: messi as CareerStats,
      ronaldo: ronaldo as CareerStats,
      messiSeasons: await getSeasons(1),
      ronaldoSeasons: await getSeasons(2),
    },
    revalidate: 3600,
  }
}