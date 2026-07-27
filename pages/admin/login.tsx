// pages/admin/login.tsx
import { useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import Head from "next/head"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simple authentication - replace with Supabase Auth later
    if (email === "admin@mesnaldo.app" && password === "mesnaldo2026") {
      localStorage.setItem("admin_auth", "true")
      router.push("/admin")
    } else {
      setError("Invalid credentials. Please try again.")
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Admin Login - Mesnaldo</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="bg-black min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-8">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white">Mesnaldo <span className="text-amber-400">Admin</span></h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to manage the website</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mesnaldo.app"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block font-medium">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-amber-500 text-black rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Default: admin@mesnaldo.app / mesnaldo2026
          </p>
        </motion.div>
      </div>
    </>
  )
}