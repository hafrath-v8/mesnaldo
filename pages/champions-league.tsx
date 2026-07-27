import Layout from "@/components/layout/Layout"
import StatCard from "@/components/ui/StatCard"
import ComparisonBar from "@/components/ui/ComparisonBar"
import { supabase } from "@/lib/supabase"
import { GetStaticProps } from "next"

interface UCLProps {
  messi: { games: number; goals: number; assists: number; titles: number }
  ronaldo: { games: number; goals: number; assists: number; titles: number }
}

export default function ChampionsLeague({ messi, ronaldo }: UCLProps) {
  return (
    <Layout title="Champions League | Messi vs Ronaldo">
      {/* ─── Hero ─── */}
      <section className="py-12 text-center">
        <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">Champions League</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-sky-400">{messi.goals}</span>
          <span className="text-neutral-600 mx-3">vs</span>
          <span className="text-rose-400">{ronaldo.goals}</span>
        </h1>
        <p className="text-neutral-500">Goals in Europe&apos;s elite competition</p>
      </section>

      {/* ─── Key Stats ─── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Messi Games" value={messi.games} />
        <StatCard label="Messi Goals" value={messi.goals} highlight />
        <StatCard label="Ronaldo Games" value={ronaldo.games} />
        <StatCard label="Ronaldo Goals" value={ronaldo.goals} highlight />
      </section>

      {/* ─── Comparison ─── */}
      <section className="card mb-8">
        <h2 className="section-title">UCL Comparison</h2>
        <ComparisonBar label="Goals" messiValue={messi.goals} ronaldoValue={ronaldo.goals} maxValue={Math.max(messi.goals, ronaldo.goals)} />
        <ComparisonBar label="Assists" messiValue={messi.assists} ronaldoValue={ronaldo.assists} maxValue={Math.max(messi.assists, ronaldo.assists)} />
        <ComparisonBar label="Games" messiValue={messi.games} ronaldoValue={ronaldo.games} maxValue={Math.max(messi.games, ronaldo.games)} />
        <ComparisonBar label="Titles" messiValue={messi.titles} ronaldoValue={ronaldo.titles} maxValue={Math.max(messi.titles, ronaldo.titles)} />
      </section>

      {/* ─── Title Cards ─── */}
      <section className="grid grid-cols-2 gap-4">
        <div className="card text-center">
          <p className="text-6xl mb-2">🏆</p>
          <p className="stat-label">Messi UCL Titles</p>
          <p className="stat-value text-sky-400">{messi.titles}</p>
          <p className="text-xs text-neutral-500 mt-1">2006, 2009, 2011, 2015</p>
        </div>
        <div className="card text-center">
          <p className="text-6xl mb-2">🏆</p>
          <p className="stat-label">Ronaldo UCL Titles</p>
          <p className="stat-value text-rose-400">{ronaldo.titles}</p>
          <p className="text-xs text-neutral-500 mt-1">2008, 2014, 2016, 2017, 2018</p>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: messiMatches } = await supabase
    .from("matches")
    .select("goals, assists, round")
    .eq("player_id", 1)
    .or("competition.eq.Champions League,competition.eq.Champs League")

  const { data: ronaldoMatches } = await supabase
    .from("matches")
    .select("goals, assists, round")
    .eq("player_id", 2)
    .or("competition.eq.Champions League,competition.eq.Champs League")

  const sum = (data: any[], field: string) => data?.reduce((acc, m) => acc + (m[field] || 0), 0) || 0

  return {
    props: {
      messi: {
        games: messiMatches?.length || 0,
        goals: sum(messiMatches || [], "goals"),
        assists: sum(messiMatches || [], "assists"),
        titles: 4,
      },
      ronaldo: {
        games: ronaldoMatches?.length || 0,
        goals: sum(ronaldoMatches || [], "goals"),
        assists: sum(ronaldoMatches || [], "assists"),
        titles: 5,
      },
    },
    revalidate: 3600,
  }
}