import Layout from "@/components/layout/Layout"
import StatCard from "@/components/ui/StatCard"
import ComparisonBar from "@/components/ui/ComparisonBar"
import { supabase } from "@/lib/supabase"
import { GetStaticProps } from "next"

interface InternationalProps {
  messi: { games: number; goals: number; assists: number; wcGoals: number; caGoals: number }
  ronaldo: { games: number; goals: number; assists: number; wcGoals: number; euroGoals: number }
}

export default function International({ messi, ronaldo }: InternationalProps) {
  return (
    <Layout title="International Career | Messi vs Ronaldo">
      {/* ─── Hero ─── */}
      <section className="py-12 text-center">
        <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">
          Argentina 🇦🇷 vs Portugal 🇵🇹
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-sky-400">{messi.goals}</span>
          <span className="text-neutral-600 mx-3">vs</span>
          <span className="text-rose-400">{ronaldo.goals}</span>
        </h1>
        <p className="text-neutral-500">International goals</p>
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
        <h2 className="section-title">International Comparison</h2>
        <ComparisonBar label="Total Goals" messiValue={messi.goals} ronaldoValue={ronaldo.goals} maxValue={Math.max(messi.goals, ronaldo.goals)} />
        <ComparisonBar label="Total Assists" messiValue={messi.assists} ronaldoValue={ronaldo.assists} maxValue={Math.max(messi.assists, ronaldo.assists)} />
        <ComparisonBar label="Total Games" messiValue={messi.games} ronaldoValue={ronaldo.games} maxValue={Math.max(messi.games, ronaldo.games)} />
      </section>

      {/* ─── Tournament Breakdown ─── */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-bold text-sky-400 mb-4">🇦🇷 Messi</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">World Cup Goals</span>
              <span className="font-bold">{messi.wcGoals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Copa America Goals</span>
              <span className="font-bold">{messi.caGoals}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <p className="text-sm text-neutral-500">
              🏆 World Cup 2022 | 🏆 Copa America 2021, 2024
            </p>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-bold text-rose-400 mb-4">🇵🇹 Ronaldo</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">World Cup Goals</span>
              <span className="font-bold">{ronaldo.wcGoals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Euros Goals</span>
              <span className="font-bold">{ronaldo.euroGoals}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <p className="text-sm text-neutral-500">
              🏆 Euro 2016 | 🏆 Nations League 2019
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: messiIntl } = await supabase
    .from("matches")
    .select("goals, assists, competition")
    .eq("player_id", 1)
    .eq("team", "Argentina")

  const { data: ronaldoIntl } = await supabase
    .from("matches")
    .select("goals, assists, competition")
    .eq("player_id", 2)
    .eq("team", "Portugal")

  const sum = (data: any[], field: string) => data?.reduce((acc, m) => acc + (m[field] || 0), 0) || 0
  const sumComp = (data: any[], comp: string) =>
    data?.filter((m) => m.competition?.includes(comp)).reduce((acc, m) => acc + (m.goals || 0), 0) || 0

  return {
    props: {
      messi: {
        games: messiIntl?.length || 0,
        goals: sum(messiIntl || [], "goals"),
        assists: sum(messiIntl || [], "assists"),
        wcGoals: sumComp(messiIntl || [], "World Cup"),
        caGoals: sumComp(messiIntl || [], "Copa America"),
      },
      ronaldo: {
        games: ronaldoIntl?.length || 0,
        goals: sum(ronaldoIntl || [], "goals"),
        assists: sum(ronaldoIntl || [], "assists"),
        wcGoals: sumComp(ronaldoIntl || [], "World Cup"),
        euroGoals: sumComp(ronaldoIntl || [], "UEFA Euros"),
      },
    },
    revalidate: 3600,
  }
}