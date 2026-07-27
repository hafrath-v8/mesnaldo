import Layout from "@/components/layout/Layout"
import { supabase } from "@/lib/supabase"
import { Match } from "@/types"
import { formatDate, resultColor, resultText } from "@/lib/utils"
import { GetServerSideProps } from "next"
import { useState } from "react"

interface MatchesProps {
  matches: Match[]
  total: number
}

export default function MessiMatches({ matches, total }: MatchesProps) {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 25

  const filtered = matches
    .filter((m) => filter === "all" || m.competition?.includes(filter))
    .filter((m) => !search || m.opponent?.toLowerCase().includes(search.toLowerCase()))
    .slice((page - 1) * perPage, page * perPage)

  const competitions = [...new Set(matches.map((m) => m.competition).filter(Boolean))].sort()

  return (
    <Layout title="Messi Match Log | All 1,162 Matches">
      <section className="py-8">
        <h1 className="text-3xl font-bold mb-2">Lionel Messi — Match Log</h1>
        <p className="text-neutral-500 mb-6">{total.toLocaleString()} career matches</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1) }}
            className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white"
          >
            <option value="all">All Competitions</option>
            {competitions.slice(0, 15).map((comp) => (
              <option key={comp} value={comp ?? ""}>{comp}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search opponent..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white flex-1 min-w-[200px]"
          />
        </div>

        {/* Table */}
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-500 border-b border-neutral-800">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Competition</th>
                <th className="pb-3 font-medium">Match</th>
                <th className="pb-3 font-medium text-center">Result</th>
                <th className="pb-3 font-medium text-center">G</th>
                <th className="pb-3 font-medium text-center">A</th>
                <th className="pb-3 font-medium text-center">Mins</th>
                <th className="pb-3 font-medium text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                  <td className="py-3 text-neutral-500">{m.match_number}</td>
                  <td className="py-3 text-neutral-400 text-xs">{formatDate(m.date)}</td>
                  <td className="py-3 text-xs">{m.competition}</td>
                  <td className="py-3 text-xs">
                    {m.team} {m.team_score}-{m.opponent_score} {m.opponent}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`${resultColor(m.result || "")} text-xs px-2 py-0.5 rounded-full text-white`}>
                      {resultText(m.result || "")}
                    </span>
                  </td>
                  <td className="py-3 text-center font-bold">{m.goals || "-"}</td>
                  <td className="py-3 text-center">{m.assists || "-"}</td>
                  <td className="py-3 text-center text-neutral-400">{m.minutes_played}&apos;</td>
                  <td className="py-3 text-center text-neutral-400">{m.rating || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn-secondary text-sm">
            Previous
          </button>
          <span className="px-4 py-2 text-neutral-400 text-sm">
            Page {page} of {Math.ceil(filtered.length / perPage)}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(filtered.length / perPage)}
            className="btn-secondary text-sm"
          >
            Next
          </button>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .eq("player_id", 1)
    .order("match_number", { ascending: false })

  return {
    props: {
      matches: matches as Match[],
      total: matches?.length || 0,
    },
  }
}