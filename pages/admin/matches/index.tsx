import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { supabase } from "../../../lib/supabase"
import { Match } from "../../../types"
import { formatDate, resultColor, resultText } from "../../../lib/utils"

export default function AdminMatches() {
  const router = useRouter()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [page, setPage] = useState(1)
  const perPage = 25

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (!loggedIn) {
      router.push("/admin/login")
      return
    }

    async function fetchMatches() {
      const { data } = await supabase
        .from("matches")
        .select("*")
        .order("match_number", { ascending: false })
      setMatches((data as Match[]) || [])
      setLoading(false)
    }

    fetchMatches()
  }, [router])

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this match? This cannot be undone.")) return
    const { error } = await supabase.from("matches").delete().eq("id", id)
    if (!error) {
      setMatches(matches.filter((m) => m.id !== id))
    }
  }

  const filtered = matches
    .filter((m) => filter === "all" || (m.player_id === (filter === "messi" ? 1 : 2)))
    .slice((page - 1) * perPage, page * perPage)

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Manage Matches | Admin</title>
      </Head>
      <div className="min-h-screen bg-neutral-950">
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-500">All Matches</h1>
          <div className="flex gap-3">
            <Link href="/admin" className="text-sm text-neutral-400 hover:text-white">← Dashboard</Link>
            <Link href="/admin/matches/add" className="btn-primary text-sm">+ Add Match</Link>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1) }}
              className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white"
            >
              <option value="all">All Players</option>
              <option value="messi">Messi</option>
              <option value="ronaldo">Ronaldo</option>
            </select>
          </div>

          {/* Table */}
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 border-b border-neutral-800">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Player</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Competition</th>
                  <th className="pb-3 font-medium">Match</th>
                  <th className="pb-3 font-medium text-center">G</th>
                  <th className="pb-3 font-medium text-center">A</th>
                  <th className="pb-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                    <td className="py-3 text-neutral-500">{m.match_number}</td>
                    <td className="py-3">
                      <span className={m.player_id === 1 ? "text-sky-400" : "text-rose-400"}>
                        {m.player_id === 1 ? "Messi" : "Ronaldo"}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-400 text-xs">{formatDate(m.date)}</td>
                    <td className="py-3 text-xs">{m.competition}</td>
                    <td className="py-3 text-xs">{m.team} {m.team_score}-{m.opponent_score} {m.opponent}</td>
                    <td className="py-3 text-center font-bold">{m.goals}</td>
                    <td className="py-3 text-center">{m.assists}</td>
                    <td className="py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/admin/matches/${m.id}`}
                          className="text-xs px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="text-xs px-2 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
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
              Page {page}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(filtered.length / perPage)}
              className="btn-secondary text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}