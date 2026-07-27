import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { supabase } from "../../../lib/supabase"

export default function AddMatch() {
  const router = useRouter()

  const [form, setForm] = useState({
    player_id: 1,
    match_number: 0,
    date: "",
    competition: "",
    round: "",
    venue: "H",
    team: "",
    opponent: "",
    team_score: 0,
    opponent_score: 0,
    goals: 0,
    assists: 0,
    minutes_played: 90,
    rating: "",
    shootout_info: "",
    is_home: true,
    result: "W",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (!loggedIn) {
      router.push("/admin/login")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked })
    } else if (type === "number") {
      setForm({ ...form, [name]: Number(value) })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.from("matches").insert({
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
      rating: form.rating ? parseFloat(form.rating) : null,
      shootout_info: form.shootout_info || null,
      is_home: form.venue === "H",
      result: form.result,
    })

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("✅ Match added successfully!")
      // Reset form
      setForm({
        ...form,
        match_number: form.match_number + 1,
        team_score: 0,
        opponent_score: 0,
        goals: 0,
        assists: 0,
        rating: "",
        shootout_info: "",
      })
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Add Match | Admin</title>
      </Head>
      <div className="min-h-screen bg-neutral-950">
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-500">Add New Match</h1>
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
              {/* Player */}
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Player</label>
                <select name="player_id" value={form.player_id} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white">
                  <option value={1}>Lionel Messi</option>
                  <option value={2}>Cristiano Ronaldo</option>
                </select>
              </div>

              {/* Match Number & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Match #</label>
                  <input type="number" name="match_number" value={form.match_number} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              {/* Competition & Round */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Competition</label>
                  <input type="text" name="competition" value={form.competition} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Round</label>
                  <input type="text" name="round" value={form.round} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Venue</label>
                <select name="venue" value={form.venue} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white">
                  <option value="H">Home</option>
                  <option value="A">Away</option>
                  <option value="N">Neutral</option>
                </select>
              </div>

              {/* Teams */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Team</label>
                  <input type="text" name="team" value={form.team} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Opponent</label>
                  <input type="text" name="opponent" value={form.opponent} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Team Score</label>
                  <input type="number" name="team_score" value={form.team_score} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Opponent Score</label>
                  <input type="number" name="opponent_score" value={form.opponent_score} onChange={handleChange} required className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              {/* Goals & Assists */}
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

              {/* Minutes & Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Minutes Played</label>
                  <input type="number" name="minutes_played" value={form.minutes_played} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Rating</label>
                  <input type="text" name="rating" value={form.rating} onChange={handleChange} placeholder="e.g. 7.5" className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              {/* Result */}
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Result</label>
                <select name="result" value={form.result} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white">
                  <option value="W">Win</option>
                  <option value="D">Draw</option>
                  <option value="L">Loss</option>
                </select>
              </div>

              {/* Shootout */}
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Shootout Info (optional)</label>
                <input type="text" name="shootout_info" value={form.shootout_info} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Saving..." : "Save Match"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}