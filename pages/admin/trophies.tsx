import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"

interface TrophyItem {
  name: string
  count: number
  category: string
}

export default function AdminTrophies() {
  const router = useRouter()
  const [messiTrophies, setMessiTrophies] = useState<TrophyItem[]>([
    { name: "Ballon d'Or", count: 8, category: "individual" },
    { name: "FIFA The Best", count: 3, category: "individual" },
    { name: "European Golden Boot", count: 6, category: "individual" },
    { name: "Champions League", count: 4, category: "club" },
    { name: "La Liga", count: 10, category: "club" },
    { name: "Ligue 1", count: 2, category: "club" },
    { name: "Copa del Rey", count: 7, category: "club" },
    { name: "Club World Cup", count: 3, category: "club" },
    { name: "UEFA Super Cup", count: 3, category: "club" },
    { name: "World Cup", count: 1, category: "international" },
    { name: "Copa America", count: 2, category: "international" },
    { name: "Finalissima", count: 1, category: "international" },
    { name: "Olympic Gold", count: 1, category: "international" },
    { name: "U20 World Cup", count: 1, category: "international" },
  ])

  const [ronaldoTrophies, setRonaldoTrophies] = useState<TrophyItem[]>([
    { name: "Ballon d'Or", count: 5, category: "individual" },
    { name: "FIFA The Best", count: 2, category: "individual" },
    { name: "European Golden Boot", count: 4, category: "individual" },
    { name: "Champions League", count: 5, category: "club" },
    { name: "Premier League", count: 3, category: "club" },
    { name: "La Liga", count: 2, category: "club" },
    { name: "Serie A", count: 2, category: "club" },
    { name: "FA Cup", count: 1, category: "club" },
    { name: "Copa del Rey", count: 2, category: "club" },
    { name: "Club World Cup", count: 4, category: "club" },
    { name: "UEFA Super Cup", count: 3, category: "club" },
    { name: "European Championship", count: 1, category: "international" },
    { name: "Nations League", count: 1, category: "international" },
  ])

  const [message, setMessage] = useState("")

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (!loggedIn) router.push("/admin/login")
  }, [router])

  const updateCount = (player: "messi" | "ronaldo", index: number, delta: number) => {
    if (player === "messi") {
      const updated = [...messiTrophies]
      updated[index].count = Math.max(0, updated[index].count + delta)
      setMessiTrophies(updated)
    } else {
      const updated = [...ronaldoTrophies]
      updated[index].count = Math.max(0, updated[index].count + delta)
      setRonaldoTrophies(updated)
    }
  }

  const handleSave = () => {
    localStorage.setItem("messi_trophies", JSON.stringify(messiTrophies))
    localStorage.setItem("ronaldo_trophies", JSON.stringify(ronaldoTrophies))
    setMessage("✅ Trophies saved!")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <>
      <Head>
        <title>Manage Trophies | Admin</title>
      </Head>
      <div className="min-h-screen bg-neutral-950">
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-500">Manage Trophies</h1>
          <div className="flex gap-3">
            <Link href="/admin" className="text-sm text-neutral-400 hover:text-white">← Dashboard</Link>
            <button onClick={handleSave} className="btn-primary text-sm">💾 Save Changes</button>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          {message && (
            <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-xl mb-6 text-sm">{message}</div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Messi Trophies */}
            <div className="card">
              <h2 className="text-xl font-bold text-sky-400 mb-4">🇦🇷 Messi Trophies</h2>
              <div className="space-y-2">
                {messiTrophies.map((t, i) => (
                  <div key={t.name} className="flex items-center justify-between bg-neutral-800 rounded-lg p-3">
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <span className="text-xs text-neutral-500">{t.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCount("messi", i, -1)} className="w-8 h-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm">-</button>
                      <span className="w-8 text-center font-bold">{t.count}</span>
                      <button onClick={() => updateCount("messi", i, 1)} className="w-8 h-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Total: {messiTrophies.reduce((sum, t) => sum + t.count, 0)}
              </p>
            </div>

            {/* Ronaldo Trophies */}
            <div className="card">
              <h2 className="text-xl font-bold text-rose-400 mb-4">🇵🇹 Ronaldo Trophies</h2>
              <div className="space-y-2">
                {ronaldoTrophies.map((t, i) => (
                  <div key={t.name} className="flex items-center justify-between bg-neutral-800 rounded-lg p-3">
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <span className="text-xs text-neutral-500">{t.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCount("ronaldo", i, -1)} className="w-8 h-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm">-</button>
                      <span className="w-8 text-center font-bold">{t.count}</span>
                      <button onClick={() => updateCount("ronaldo", i, 1)} className="w-8 h-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Total: {ronaldoTrophies.reduce((sum, t) => sum + t.count, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}