import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { supabase } from "../../../lib/supabase"
import { Match } from "../../../types"

export default function EditMatch() {
  const router = useRouter()
  const { id } = router.query

  const [form, setForm] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (!loggedIn) {
      router.push("/admin/login")
      return
    }
    if (id) fetchMatch()
  }, [id, router])

  const fetchMatch = async () => {
    const { data } = await supabase.from("matches").select("*").eq("id", id).single()
    setForm(data as Match)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!form) return
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked })
    } else if (type === "number") {
      setForm({ ...form, [name]: value === "" ? null : Number(value) })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setMessage("")

    const { error } = await supabase
      .from("matches")
      .update({
        player_id: form.player_id,
        match_number: form.match_number,
        date: form.date,
        competition: form.competition || null,
        round: form.round || null,
        venue: form.venue,
        team: form.team,
        opponent: form.opponent,
        team_score: form.team_score,
        opponent_score: form.opponent_score,
        goals: form.goals,
        assists: form.assists,
        minutes_played: form.minutes_played,
        rating: form.rating || null,
        shootout_info: form.shootout_info || null,
        is_home: form.venue === "H",
        result: form.result,
      })
      .eq("id", id)

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("✅ Match updated successfully!")
    }
    setSaving(false)
  }

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Edit Match #{form.match_number} | Admin</title>
      </Head>
      <div className="min-h-screen bg-neutral-950">
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-500">Edit Match #{form.match_number}</h1>
          <Link href="/admin/matches" className="text-sm text-neutral-400 hover:text-white">← All Matches</Link>
        </header>

        <div className="p-6 max-w-2xl mx-auto">
          <div className="card">
            {message && (
              <div className={`p-4 rounded-xl mb-6 text-sm ${message.includes("Error") ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Player</label>
                <select name="player_id" value={form.player_id} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white">
                  <option value={1}>Lionel Messi</option>
                  <option value={2}>Cristiano Ronaldo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Match #</label>
                  <input type="number" name="match_number" value={form.match_number} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Competition</label>
                  <input type="text" name="competition" value={form.competition || ""} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Round</label>
                  <input type="text" name="round" value={form.round || ""} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Team</label>
                  <input type="text" name="team" value={form.team} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Opponent</label>
                  <input type="text" name="opponent" value={form.opponent} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Team Score</label>
                  <input type="number" name="team_score" value={form.team_score} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Opponent Score</label>
                  <input type="number" name="opponent_score" value={form.opponent_score} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Goals</label>
                  <input type="number" name="goals" value={form.goals} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Assists</label>
                  <input type="number" name="assists" value={form.assists} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Minutes</label>
                  <input type="number" name="minutes_played" value={form.minutes_played || ""} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Rating</label>
                  <input type="text" name="rating" value={form.rating || ""} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">Result</label>
                <select name="result" value={form.result || "W"} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white">
                  <option value="W">Win</option>
                  <option value="D">Draw</option>
                  <option value="L">Loss</option>
                </select>
              </div>

              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? "Saving..." : "Update Match"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}