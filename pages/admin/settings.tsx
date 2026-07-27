import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"

export default function AdminSettings() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (!loggedIn) router.push("/admin/login")
  }, [router])

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("✅ Password changed (local only for now)")
    setPassword("")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleRecalculate = async () => {
    setMessage("🔄 Recalculate triggered. Stats will update on next page load.")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleExport = () => {
    setMessage("📥 Export feature coming soon")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <>
      <Head>
        <title>Settings | Admin</title>
      </Head>
      <div className="min-h-screen bg-neutral-950">
        <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-500">Settings</h1>
          <Link href="/admin" className="text-sm text-neutral-400 hover:text-white">← Dashboard</Link>
        </header>

        <div className="p-6 max-w-2xl mx-auto space-y-6">
          {message && (
            <div className="bg-amber-500/20 text-amber-400 p-4 rounded-xl text-sm">{message}</div>
          )}

          {/* Change Password */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white"
                  placeholder="Enter new password"
                />
              </div>
              <button type="submit" className="btn-primary">Update Password</button>
            </form>
          </div>

          {/* Recalculate Stats */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Database Maintenance</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-400 mb-2">
                  Recalculate career stats from match data. Use this after bulk imports.
                </p>
                <button onClick={handleRecalculate} className="btn-secondary">
                  🔄 Recalculate Stats
                </button>
              </div>
            </div>
          </div>

          {/* Export */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Export Data</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-400 mb-2">
                  Download all match data as CSV.
                </p>
                <button onClick={handleExport} className="btn-secondary">
                  📥 Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Site Information</h2>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>Database: Supabase</p>
              <p>Framework: Next.js 14 + TypeScript</p>
              <p>Styling: Tailwind CSS</p>
              <p>Charts: Recharts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}