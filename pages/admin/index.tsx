// pages/admin/index.tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabase"
import { motion } from "framer-motion"
import Head from "next/head"
import Image from "next/image"

interface Match {
  id: number; player_id: number; match_number: number; date: string; competition: string
  round: string; venue: string; team: string; opponent: string; team_score: number
  opponent_score: number; goals: number; assists: number; minutes_played: number
  rating: number | null; shootout_info: string | null; is_home: boolean; result: string
}

interface CareerStats {
  id: number; player_id: number; total_games: number; total_goals: number; total_assists: number
  total_wins: number; total_draws: number; total_losses: number; total_minutes: number
  penalties_scored: number; penalties_missed: number; free_kick_goals: number
  outside_box_goals: number; inside_box_goals: number; left_foot_goals: number
  right_foot_goals: number; header_goals: number; other_goals: number
}

interface RecordItem {
  id: number; player_id: number; record_type: string; category: string
  title: string; description: string; value: string; is_active: boolean; sort_order: number
}

interface BlogPost {
  id: number; title: string; slug: string; excerpt: string; content: string
  featured_image: string; author: string; category: string; tags: string[]
  is_published: boolean; is_featured: boolean; published_at: string; read_time: string; views: number
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState({ matches: 0, records: 0, blogs: 0, votes: 0 })
  const router = useRouter()

  // Match states
  const [matches, setMatches] = useState<Match[]>([])
  const [matchSearch, setMatchSearch] = useState("")
  const [matchFilter, setMatchFilter] = useState("all")
  const [matchPage, setMatchPage] = useState(1)
  const [editingMatch, setEditingMatch] = useState<Match | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const MATCHES_PER_PAGE = 20

  // Player states
  const [careerStats, setCareerStats] = useState<CareerStats[]>([])
  const [editingPlayer, setEditingPlayer] = useState<CareerStats | null>(null)

  // Record states
  const [records, setRecords] = useState<RecordItem[]>([])
  const [recordSearch, setRecordSearch] = useState("")
  const [recordFilter, setRecordFilter] = useState("all")
  const [editingRecord, setEditingRecord] = useState<RecordItem | null>(null)
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [deleteRecordConfirm, setDeleteRecordConfirm] = useState<number | null>(null)
  const [newRecord, setNewRecord] = useState({ player_id: 1, record_type: "World", category: "", title: "", description: "", value: "", sort_order: 0 })

  // Blog states
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [deleteBlogConfirm, setDeleteBlogConfirm] = useState<number | null>(null)
  const [newBlog, setNewBlog] = useState({
    title: "", slug: "", excerpt: "", content: "", featured_image: "",
    author: "Mesnaldo Team", category: "Analysis", tags: [] as string[],
    is_published: true, is_featured: false, read_time: "5",
  })
  const [tagInput, setTagInput] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Poll states
  const [pollData, setPollData] = useState({ messiVotes: 0, ronaldoVotes: 0, messiLive: 0, ronaldoLive: 0 })
  const [pollResetConfirm, setPollResetConfirm] = useState(false)

  const [newMatch, setNewMatch] = useState({
    player_id: 1, match_number: 0, date: "", competition: "", round: "", venue: "H",
    team: "", opponent: "", team_score: 0, opponent_score: 0, goals: 0, assists: 0,
    minutes_played: 90, rating: null as number | null, shootout_info: "", is_home: true, result: "W",
  })

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth !== "true") router.push("/admin/login")
    else { setAuthenticated(true); fetchStats() }
  }, [])

  const fetchStats = async () => {
    const { count: mc } = await supabase.from("matches").select("*", { count: "exact", head: true })
    const { count: rc } = await supabase.from("records").select("*", { count: "exact", head: true })
    const { count: bc } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })
    const { count: vc } = await supabase.from("poll_votes").select("*", { count: "exact", head: true })
    setStats({ matches: mc || 0, records: rc || 0, blogs: bc || 0, votes: vc || 0 })
  }

  const fetchMatches = async () => { const { data } = await supabase.from("matches").select("*").order("date", { ascending: false }).limit(500); setMatches(data || []) }
  const fetchCareerStats = async () => { const { data } = await supabase.from("career_stats").select("*"); setCareerStats(data || []) }
  const fetchRecords = async () => { const { data } = await supabase.from("records").select("*").order("sort_order", { ascending: true }).limit(500); setRecords(data || []) }
  const fetchBlogPosts = async () => { const { data } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false }); setBlogPosts(data || []) }
  
  const fetchPollData = async () => {
    const { data: initial } = await supabase.from("vote_counts").select("*")
    const messiInit = initial?.find((c: any) => c.player === "messi")?.initial_count || 436459
    const ronaldoInit = initial?.find((c: any) => c.player === "ronaldo")?.initial_count || 586132
    const { count: ml } = await supabase.from("poll_votes").select("*", { count: "exact", head: true }).eq("player", "messi")
    const { count: rl } = await supabase.from("poll_votes").select("*", { count: "exact", head: true }).eq("player", "ronaldo")
    setPollData({ messiVotes: messiInit, ronaldoVotes: ronaldoInit, messiLive: ml || 0, ronaldoLive: rl || 0 })
  }

  useEffect(() => {
    if (activeTab === "matches") fetchMatches()
    if (activeTab === "players") fetchCareerStats()
    if (activeTab === "records") fetchRecords()
    if (activeTab === "blog") fetchBlogPosts()
    if (activeTab === "poll") fetchPollData()
  }, [activeTab])

  const resetNewMatch = () => { setNewMatch({ player_id: 1, match_number: 0, date: "", competition: "", round: "", venue: "H", team: "", opponent: "", team_score: 0, opponent_score: 0, goals: 0, assists: 0, minutes_played: 90, rating: null, shootout_info: "", is_home: true, result: "W" }) }

  // Match CRUD
  const handleAddMatch = async (e: React.FormEvent) => {
    e.preventDefault()
    let result = newMatch.result
    if (newMatch.team_score > newMatch.opponent_score) result = "W"
    else if (newMatch.team_score < newMatch.opponent_score) result = "L"
    else result = "D"
    const matchData = { ...newMatch, result, rating: newMatch.rating || null, shootout_info: newMatch.shootout_info || null }
    const { error } = await supabase.from("matches").insert(matchData)
    if (!error) { setShowAddForm(false); resetNewMatch(); fetchMatches(); fetchStats() }
    else alert("Error: " + error.message)
  }

  const handleUpdateMatch = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editingMatch) return
    let result = editingMatch.result
    if (editingMatch.team_score > editingMatch.opponent_score) result = "W"
    else if (editingMatch.team_score < editingMatch.opponent_score) result = "L"
    else result = "D"
    const { error } = await supabase.from("matches").update({ ...editingMatch, result }).eq("id", editingMatch.id)
    if (!error) { setEditingMatch(null); fetchMatches(); fetchStats() }
    else alert("Error: " + error.message)
  }

  const handleDeleteMatch = async (id: number) => { await supabase.from("matches").delete().eq("id", id); setDeleteConfirm(null); fetchMatches(); fetchStats() }

  // Player CRUD
  const handleUpdatePlayer = async (e: React.FormEvent) => { e.preventDefault(); if (!editingPlayer) return; const { error } = await supabase.from("career_stats").update(editingPlayer).eq("id", editingPlayer.id); if (!error) { setEditingPlayer(null); fetchCareerStats() } else alert("Error: " + error.message) }

  // Record CRUD
  const handleAddRecord = async (e: React.FormEvent) => { e.preventDefault(); const { error } = await supabase.from("records").insert(newRecord); if (!error) { setShowAddRecord(false); setNewRecord({ player_id: 1, record_type: "World", category: "", title: "", description: "", value: "", sort_order: 0 }); fetchRecords(); fetchStats() } else alert("Error: " + error.message) }
  const handleUpdateRecord = async (e: React.FormEvent) => { e.preventDefault(); if (!editingRecord) return; const { error } = await supabase.from("records").update(editingRecord).eq("id", editingRecord.id); if (!error) { setEditingRecord(null); fetchRecords(); fetchStats() } else alert("Error: " + error.message) }
  const handleDeleteRecord = async (id: number) => { await supabase.from("records").delete().eq("id", id); setDeleteRecordConfirm(null); fetchRecords(); fetchStats() }

  // Blog CRUD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0]; if (!file) return
    setImageUploading(true)
    const fileName = `blog-${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from("blog-images").upload(fileName, file)
    if (!error) {
      const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName)
      if (isEdit && editingBlog) { setEditingBlog({ ...editingBlog, featured_image: urlData.publicUrl }) }
      else { setNewBlog({ ...newBlog, featured_image: urlData.publicUrl }) }
      setImagePreview(urlData.publicUrl)
    } else { alert("Upload error: " + error.message) }
    setImageUploading(false)
  }

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    const slug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const { error } = await supabase.from("blog_posts").insert({ ...newBlog, slug, published_at: new Date().toISOString() })
    if (!error) { setShowAddBlog(false); setNewBlog({ title: "", slug: "", excerpt: "", content: "", featured_image: "", author: "Mesnaldo Team", category: "Analysis", tags: [], is_published: true, is_featured: false, read_time: "5" }); setImagePreview(null); fetchBlogPosts(); fetchStats() }
    else alert("Error: " + error.message)
  }

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editingBlog) return
    const slug = editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const { error } = await supabase.from("blog_posts").update({ ...editingBlog, slug }).eq("id", editingBlog.id)
    if (!error) { setEditingBlog(null); setImagePreview(null); fetchBlogPosts() }
    else alert("Error: " + error.message)
  }

  const handleDeleteBlog = async (id: number) => { await supabase.from("blog_posts").delete().eq("id", id); setDeleteBlogConfirm(null); fetchBlogPosts(); fetchStats() }

  const addTag = (isEdit: boolean) => { if (!tagInput.trim()) return; if (isEdit && editingBlog) { setEditingBlog({ ...editingBlog, tags: [...(editingBlog.tags || []), tagInput.trim()] }) } else { setNewBlog({ ...newBlog, tags: [...newBlog.tags, tagInput.trim()] }) }; setTagInput("") }
  const removeTag = (tag: string, isEdit: boolean) => { if (isEdit && editingBlog) { setEditingBlog({ ...editingBlog, tags: editingBlog.tags.filter(t => t !== tag) }) } else { setNewBlog({ ...newBlog, tags: newBlog.tags.filter(t => t !== tag) }) } }

  // Poll actions
  const handleResetPoll = async () => { await supabase.from("poll_votes").delete().neq("id", 0); setPollResetConfirm(false); fetchPollData(); fetchStats() }
  const handleLogout = () => { localStorage.removeItem("admin_auth"); router.push("/admin/login") }

  if (!authenticated) return null

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "matches", label: "⚽ Matches" },
    { id: "players", label: "👤 Players" },
    { id: "records", label: "📋 Records" },
    { id: "blog", label: "📝 Blog" },
    { id: "poll", label: "🗳️ Poll" },
  ]

  const filteredMatches = matches.filter(m => { if (matchFilter !== "all" && m.player_id !== parseInt(matchFilter)) return false; if (matchSearch) { const q = matchSearch.toLowerCase(); return (m.team || "").toLowerCase().includes(q) || (m.opponent || "").toLowerCase().includes(q) || (m.competition || "").toLowerCase().includes(q) } return true })
  const paginatedMatches = filteredMatches.slice((matchPage - 1) * MATCHES_PER_PAGE, matchPage * MATCHES_PER_PAGE)
  const totalMatchPages = Math.ceil(filteredMatches.length / MATCHES_PER_PAGE)

  const filteredRecords = records.filter(r => { if (recordFilter !== "all" && r.player_id !== parseInt(recordFilter)) return false; if (recordSearch) { const q = recordSearch.toLowerCase(); return (r.title || "").toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q) } return true })

  const updateFormField = (field: string, value: any, isEdit: boolean) => { if (isEdit && editingMatch) { setEditingMatch({ ...editingMatch, [field]: value }) } else { setNewMatch({ ...newMatch, [field]: value }) } }
  const getFormValue = (field: string, isEdit: boolean) => { if (isEdit && editingMatch) return (editingMatch as any)[field]; return (newMatch as any)[field] }

  const matchFormFields = [
    { label: "Player", field: "player_id", type: "select", options: [{ v: 1, l: "Messi" }, { v: 2, l: "Ronaldo" }], col: "half" },
    { label: "Match #", field: "match_number", type: "number", col: "half" },
    { label: "Date", field: "date", type: "date", required: true, col: "half" },
    { label: "Competition", field: "competition", type: "text", required: true, col: "half" },
    { label: "Round", field: "round", type: "text", col: "half" },
    { label: "Venue", field: "venue", type: "select", options: [{ v: "H", l: "Home" }, { v: "A", l: "Away" }, { v: "N", l: "Neutral" }], col: "half" },
    { label: "Team", field: "team", type: "text", required: true, col: "half" },
    { label: "Opponent", field: "opponent", type: "text", required: true, col: "half" },
    { label: "Team Score", field: "team_score", type: "number", required: true, col: "third" },
    { label: "Opponent Score", field: "opponent_score", type: "number", required: true, col: "third" },
    { label: "Result", field: "result", type: "select", options: [{ v: "W", l: "Win" }, { v: "D", l: "Draw" }, { v: "L", l: "Loss" }], col: "third" },
    { label: "Goals", field: "goals", type: "number", col: "third" },
    { label: "Assists", field: "assists", type: "number", col: "third" },
    { label: "Minutes Played", field: "minutes_played", type: "number", col: "third" },
    { label: "Home Game?", field: "is_home", type: "select", options: [{ v: true, l: "Yes" }, { v: false, l: "No" }], col: "third" },
    { label: "Rating", field: "rating", type: "number", col: "third" },
    { label: "Shootout Info", field: "shootout_info", type: "text", col: "full" },
  ]

  return (
    <>
      <Head><title>Admin Panel - Mesnaldo</title><meta name="robots" content="noindex, nofollow" /></Head>
      <div className="bg-black min-h-screen flex">
        
        {/* Sidebar */}
        <div className="w-56 bg-gray-900 border-r border-gray-800 p-4 flex flex-col flex-shrink-0">
          <div className="mb-8"><h1 className="text-lg font-black text-white">Mesnaldo <span className="text-amber-400">Admin</span></h1><p className="text-[10px] text-gray-600 mt-1">v2.0</p></div>
          <nav className="space-y-1 flex-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>{tab.label}</button>
            ))}
          </nav>
          <div className="pt-4 border-t border-gray-800">
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-white block mb-2">🌐 View Website</a>
            <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 transition-colors">🚪 Logout</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto max-h-screen">
          
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { v: stats.matches.toLocaleString(), l: "Matches", c: "text-blue-400", bg: "bg-blue-500/5", b: "border-blue-500/10" },
                  { v: stats.records.toLocaleString(), l: "Records", c: "text-amber-400", bg: "bg-amber-500/5", b: "border-amber-500/10" },
                  { v: stats.blogs.toLocaleString(), l: "Blog Posts", c: "text-purple-400", bg: "bg-purple-500/5", b: "border-purple-500/10" },
                  { v: stats.votes.toLocaleString(), l: "Poll Votes", c: "text-emerald-400", bg: "bg-emerald-500/5", b: "border-emerald-500/10" },
                ].map((s, i) => (<div key={i} className={`${s.bg} border ${s.b} rounded-2xl p-6`}><p className={`text-3xl font-black ${s.c}`}>{s.v}</p><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {[{ action: () => { setActiveTab("matches"); setShowAddForm(true) }, label: "➕ Add New Match" },{ action: () => { setActiveTab("blog"); setShowAddBlog(true) }, label: "📝 Add Blog Post" },{ action: () => { setActiveTab("records"); setShowAddRecord(true) }, label: "📋 Add New Record" },{ action: () => setActiveTab("players"), label: "👤 Edit Player Stats" }].map((btn, i) => (<button key={i} onClick={btn.action} className="w-full text-left px-4 py-2.5 bg-gray-800 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-gray-700">{btn.label}</button>))}
                  </div>
                </div>
                <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-3">System Info</h3>
                  <div className="space-y-2 text-xs">
                    {[{ l: "Matches", v: `✅ ${stats.matches}` },{ l: "Records", v: `✅ ${stats.records}` },{ l: "Blog Posts", v: `✅ ${stats.blogs}` },{ l: "Last Updated", v: new Date().toLocaleDateString() }].map((row, i) => (<div key={i} className="flex justify-between py-1.5 border-b border-gray-800 last:border-0"><span className="text-gray-400">{row.l}</span><span className="text-emerald-400">{row.v}</span></div>))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATCHES TAB */}
          {activeTab === "matches" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-white">Match Management</h2><p className="text-xs text-gray-500 mt-1">{filteredMatches.length} matches</p></div><button onClick={() => { setShowAddForm(!showAddForm); if (showAddForm) resetNewMatch() }} className="px-4 py-2 bg-white text-black rounded-xl text-sm font-bold">{showAddForm ? "✕ Cancel" : "➕ Add Match"}</button></div>
              {(showAddForm || editingMatch) && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-4">{editingMatch ? `Edit Match #${editingMatch.id}` : "Add Match"}</h3>
                  <form onSubmit={editingMatch ? handleUpdateMatch : handleAddMatch} className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {matchFormFields.map(f => (<div key={f.field} className={f.col === "half" ? "md:col-span-3" : f.col === "third" ? "md:col-span-2" : "md:col-span-6"}><label className="text-[10px] text-gray-500 block mb-1">{f.label}{f.required && <span className="text-red-400">*</span>}</label>{f.type === "select" ? <select value={getFormValue(f.field, !!editingMatch)} onChange={(e) => updateFormField(f.field, f.field === "player_id" || f.field === "is_home" ? (f.field === "is_home" ? e.target.value === "true" : parseInt(e.target.value)) : e.target.value, !!editingMatch)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">{f.options?.map(o => <option key={String(o.v)} value={String(o.v)}>{o.l}</option>)}</select> : <input type={f.type} required={f.required} value={getFormValue(f.field, !!editingMatch) ?? ""} onChange={(e) => updateFormField(f.field, f.type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value, !!editingMatch)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white" />}</div>))}
                    <div className="col-span-full flex gap-2 justify-end pt-3 border-t border-gray-700/50"><button type="button" onClick={() => { setShowAddForm(false); setEditingMatch(null); resetNewMatch() }} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-xs">Cancel</button><button type="submit" className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold">{editingMatch ? "Update" : "Add"}</button></div>
                  </form>
                </motion.div>
              )}
              <div className="flex items-center gap-3"><input type="text" placeholder="Search..." value={matchSearch} onChange={(e) => { setMatchSearch(e.target.value); setMatchPage(1) }} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white w-48" /><select value={matchFilter} onChange={(e) => { setMatchFilter(e.target.value); setMatchPage(1) }} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white"><option value="all">All</option><option value="1">Messi</option><option value="2">Ronaldo</option></select></div>
              <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl overflow-hidden overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-gray-700/50 bg-gray-800/30">{["ID","P","Match #","Date","Match","Score","G","A","Result","⚡"].map(h=><th key={h} className="text-left py-2 px-2 text-[10px] text-gray-500 uppercase">{h}</th>)}</tr></thead><tbody>{paginatedMatches.map(m=>(<tr key={m.id} className="border-b border-gray-700/20 hover:bg-gray-800/20"><td className="py-1.5 px-2 text-[10px] text-gray-600">{m.id}</td><td className="py-1.5 px-2 text-[10px] font-bold">{m.player_id===1?<span className="text-blue-400">M</span>:<span className="text-red-400">R</span>}</td><td className="py-1.5 px-2 text-[10px] text-gray-500">{m.match_number||"-"}</td><td className="py-1.5 px-2 text-[10px] text-gray-400">{m.date?.slice(0,10)}</td><td className="py-1.5 px-2 text-[10px] text-gray-300 max-w-[120px] truncate">{m.team} vs {m.opponent}</td><td className="py-1.5 px-2 text-[10px] text-white font-bold">{m.team_score}-{m.opponent_score}</td><td className="py-1.5 px-2 text-center text-[10px] text-emerald-400">{m.goals||0}</td><td className="py-1.5 px-2 text-center text-[10px] text-blue-400">{m.assists||0}</td><td className="py-1.5 px-2 text-center"><span className={`text-[10px] px-1.5 py-0.5 rounded-full ${m.result==="W"?"bg-emerald-500/10 text-emerald-400":m.result==="D"?"bg-amber-500/10 text-amber-400":"bg-red-500/10 text-red-400"}`}>{m.result}</span></td><td className="py-1.5 px-2 text-center"><button onClick={()=>setEditingMatch(m)} className="text-blue-400 text-xs mr-1">✏️</button><button onClick={()=>setDeleteConfirm(m.id)} className="text-red-400 text-xs">🗑️</button></td></tr>))}</tbody></table></div>
              {totalMatchPages>1&&(<div className="flex justify-center gap-2"><button onClick={()=>setMatchPage(p=>Math.max(1,p-1))} disabled={matchPage===1} className="px-3 py-1 text-xs rounded-lg bg-gray-800 text-gray-400 disabled:opacity-30">←</button><span className="text-xs text-gray-500">{matchPage}/{totalMatchPages}</span><button onClick={()=>setMatchPage(p=>Math.min(totalMatchPages,p+1))} disabled={matchPage===totalMatchPages} className="px-3 py-1 text-xs rounded-lg bg-gray-800 text-gray-400 disabled:opacity-30">→</button></div>)}
              {deleteConfirm&&(<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"><div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full"><p className="text-white font-bold mb-2">Delete Match?</p><div className="flex gap-2 justify-end"><button onClick={()=>setDeleteConfirm(null)} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-xs">Cancel</button><button onClick={()=>handleDeleteMatch(deleteConfirm)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold">Delete</button></div></div></div>)}
            </div>
          )}

          {/* PLAYERS TAB */}
          {activeTab === "players" && (
            <div className="space-y-4"><h2 className="text-xl font-bold text-white">Player Management</h2>
              {editingPlayer && (<div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6"><h3 className="text-sm font-bold text-white mb-4">Editing: {editingPlayer.player_id===1?"Messi":"Ronaldo"}</h3><form onSubmit={handleUpdatePlayer} className="grid grid-cols-2 md:grid-cols-4 gap-3">{Object.keys(editingPlayer).filter(k=>!["id","player_id","created_at","updated_at","avg_rating"].includes(k)).map(k=>(<div key={k}><label className="text-[10px] text-gray-500 block mb-1 capitalize">{k.replace(/_/g," ")}</label><input type="number" value={(editingPlayer as any)[k]||0} onChange={(e)=>setEditingPlayer({...editingPlayer,[k]:parseInt(e.target.value)||0})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white" /></div>))}<div className="col-span-full flex gap-2 justify-end pt-3 border-t border-gray-700/50"><button type="button" onClick={()=>setEditingPlayer(null)} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-xs">Cancel</button><button type="submit" className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold">Save</button></div></form></div>)}
              <div className="grid grid-cols-2 gap-4">{careerStats.map(p=>(<div key={p.id} className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-5"><div className="flex items-center justify-between mb-3"><h3 className={`text-sm font-bold ${p.player_id===1?"text-blue-400":"text-red-400"}`}>{p.player_id===1?"🇦🇷 Messi":"🇵🇹 Ronaldo"}</h3><button onClick={()=>setEditingPlayer(p)} className="text-xs text-blue-400">✏️ Edit</button></div><div className="grid grid-cols-3 gap-2 text-center text-xs">{[{v:p.total_goals,l:"Goals"},{v:p.total_assists,l:"Assists"},{v:p.total_games,l:"Games"}].map((s,i)=>(<div key={i} className="bg-gray-800/30 rounded-lg py-2"><p className="font-bold text-white">{s.v?.toLocaleString()}</p><p className="text-[9px] text-gray-500">{s.l}</p></div>))}</div></div>))}</div>
            </div>
          )}

          {/* RECORDS TAB */}
          {activeTab === "records" && (
            <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-white">Records</h2><button onClick={()=>setShowAddRecord(!showAddRecord)} className="px-4 py-2 bg-white text-black rounded-xl text-sm font-bold">{showAddRecord?"Cancel":"➕ Add"}</button></div>
              {(showAddRecord||editingRecord)&&(<div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6"><h3 className="text-sm font-bold text-white mb-4">{editingRecord?"Edit":"Add"} Record</h3><form onSubmit={editingRecord?handleUpdateRecord:handleAddRecord} className="grid grid-cols-2 gap-3">{[{l:"Player",k:"player_id",t:"select",o:[{v:1,l:"Messi"},{v:2,l:"Ronaldo"}]},{l:"Type",k:"record_type",t:"select",o:["World","European","Spanish","English","Italian","Saudi","Club","National"].map(v=>({v,l:v}))},{l:"Category",k:"category",t:"text"},{l:"Title",k:"title",t:"text"},{l:"Description",k:"description",t:"text"},{l:"Value",k:"value",t:"text"}].map(f=>(<div key={f.k}><label className="text-[10px] text-gray-500 block mb-1">{f.l}</label>{f.t==="select"?<select value={editingRecord?(editingRecord as any)[f.k]:(newRecord as any)[f.k]} onChange={(e)=>editingRecord?setEditingRecord({...editingRecord,[f.k]:f.k==="player_id"?parseInt(e.target.value):e.target.value}):setNewRecord({...newRecord,[f.k]:f.k==="player_id"?parseInt(e.target.value):e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">{f.o?.map((o:any)=><option key={o.v} value={o.v}>{o.l}</option>)}</select>:<input type="text" value={editingRecord?(editingRecord as any)[f.k]:(newRecord as any)[f.k]} onChange={(e)=>editingRecord?setEditingRecord({...editingRecord,[f.k]:e.target.value}):setNewRecord({...newRecord,[f.k]:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white" />}</div>))}<div className="col-span-2 flex gap-2 justify-end pt-3 border-t border-gray-700/50"><button type="button" onClick={()=>{setShowAddRecord(false);setEditingRecord(null)}} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-xs">Cancel</button><button type="submit" className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold">{editingRecord?"Update":"Add"}</button></div></form></div>)}
              <div className="flex items-center gap-3"><input type="text" placeholder="Search..." value={recordSearch} onChange={(e)=>setRecordSearch(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white w-48" /><select value={recordFilter} onChange={(e)=>setRecordFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white"><option value="all">All</option><option value="1">Messi</option><option value="2">Ronaldo</option></select></div>
              <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl overflow-hidden overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-gray-700/50 bg-gray-800/30">{["ID","P","Type","Category","Title","Value","⚡"].map(h=><th key={h} className="text-left py-2 px-3 text-[10px] text-gray-500 uppercase">{h}</th>)}</tr></thead><tbody>{filteredRecords.map(r=>(<tr key={r.id} className="border-b border-gray-700/20 hover:bg-gray-800/20"><td className="py-1.5 px-3 text-[10px] text-gray-600">{r.id}</td><td className="py-1.5 px-3 text-[10px]">{r.player_id===1?<span className="text-blue-400 font-bold">M</span>:<span className="text-red-400 font-bold">R</span>}</td><td className="py-1.5 px-3 text-[10px] text-gray-400">{r.record_type}</td><td className="py-1.5 px-3 text-[10px] text-gray-400">{r.category}</td><td className="py-1.5 px-3 text-[10px] text-gray-300 max-w-[200px] truncate">{r.title}</td><td className="py-1.5 px-3 text-[10px] text-white font-bold">{r.value}</td><td className="py-1.5 px-3 text-center"><button onClick={()=>setEditingRecord(r)} className="text-blue-400 text-xs mr-1">✏️</button><button onClick={()=>setDeleteRecordConfirm(r.id)} className="text-red-400 text-xs">🗑️</button></td></tr>))}</tbody></table></div>
            </div>
          )}

          {/* BLOG TAB */}
          {activeTab === "blog" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-white">Blog Management</h2><p className="text-xs text-gray-500 mt-1">{blogPosts.length} posts</p></div><button onClick={()=>setShowAddBlog(!showAddBlog)} className="px-4 py-2 bg-white text-black rounded-xl text-sm font-bold">{showAddBlog?"✕ Cancel":"➕ Add Post"}</button></div>
              {(showAddBlog||editingBlog)&&(<div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6"><h3 className="text-sm font-bold text-white mb-4">{editingBlog?"Edit Post":"Add New Post"}</h3><form onSubmit={editingBlog?handleUpdateBlog:handleAddBlog} className="grid grid-cols-2 gap-3">
                {[{l:"Title",k:"title",t:"text",col:"full",req:true},{l:"Category",k:"category",t:"select",o:["Analysis","News","Records","Opinion","History","Comparison"].map(v=>({v,l:v})),col:"half"},{l:"Read Time",k:"read_time",t:"text",col:"half"},{l:"Author",k:"author",t:"text",col:"half"},{l:"Published?",k:"is_published",t:"select",o:[{v:true,l:"Yes"},{v:false,l:"No (Draft)"}],col:"half"},{l:"Featured?",k:"is_featured",t:"select",o:[{v:true,l:"Yes"},{v:false,l:"No"}],col:"half"}].map(f=>(<div key={f.k} className={f.col==="full"?"col-span-2":""}><label className="text-[10px] text-gray-500 block mb-1">{f.l}{f.req&&<span className="text-red-400">*</span>}</label>{f.t==="select"?<select value={editingBlog?(editingBlog as any)[f.k]:(newBlog as any)[f.k]} onChange={(e)=>editingBlog?setEditingBlog({...editingBlog,[f.k]:f.k==="is_published"||f.k==="is_featured"?e.target.value==="true":e.target.value}):setNewBlog({...newBlog,[f.k]:f.k==="is_published"||f.k==="is_featured"?e.target.value==="true":e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">{f.o?.map((o:any)=><option key={String(o.v)} value={String(o.v)}>{o.l}</option>)}</select>:<input type={f.t} value={editingBlog?(editingBlog as any)[f.k]:(newBlog as any)[f.k]} onChange={(e)=>editingBlog?setEditingBlog({...editingBlog,[f.k]:e.target.value}):setNewBlog({...newBlog,[f.k]:e.target.value})} required={f.req} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white" />}</div>))}
                <div className="col-span-2"><label className="text-[10px] text-gray-500 block mb-1">Featured Image</label><input type="file" accept="image/*" onChange={(e)=>handleImageUpload(e,!!editingBlog)} className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-white hover:file:bg-gray-600" />{imageUploading&&<p className="text-[10px] text-amber-400 mt-1">Uploading...</p>}<div className="flex gap-2 mt-2">{(imagePreview||editingBlog?.featured_image||newBlog.featured_image)&&<div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-800"><Image src={imagePreview||editingBlog?.featured_image||newBlog.featured_image} alt="Preview" fill className="object-cover" /></div>}<input type="text" value={editingBlog?editingBlog.featured_image:newBlog.featured_image} onChange={(e)=>editingBlog?setEditingBlog({...editingBlog,featured_image:e.target.value}):setNewBlog({...newBlog,featured_image:e.target.value})} placeholder="Or paste image URL" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white" /></div></div>
                {[{l:"Excerpt",k:"excerpt",t:"textarea",col:"full",req:true},{l:"Content (HTML)",k:"content",t:"textarea",col:"full",req:true,rows:8}].map(f=>(<div key={f.k} className="col-span-2"><label className="text-[10px] text-gray-500 block mb-1">{f.l}{f.req&&<span className="text-red-400">*</span>}</label><textarea value={editingBlog?(editingBlog as any)[f.k]:(newBlog as any)[f.k]} onChange={(e)=>editingBlog?setEditingBlog({...editingBlog,[f.k]:e.target.value}):setNewBlog({...newBlog,[f.k]:e.target.value})} rows={f.rows||3} required={f.req} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white resize-none" /></div>))}
                <div className="col-span-2"><label className="text-[10px] text-gray-500 block mb-1">Tags</label><div className="flex items-center gap-2 mb-2"><input type="text" value={tagInput} onChange={(e)=>setTagInput(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"){e.preventDefault();addTag(!!editingBlog)}}} placeholder="Add tag and press Enter" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white" /><button type="button" onClick={()=>addTag(!!editingBlog)} className="px-3 py-1.5 bg-gray-700 text-white rounded-lg text-xs">Add</button></div><div className="flex flex-wrap gap-1.5">{(editingBlog?editingBlog.tags:newBlog.tags)?.map(tag=>(<span key={tag} className="text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full flex items-center gap-1">{tag}<button type="button" onClick={()=>removeTag(tag,!!editingBlog)} className="text-gray-500 hover:text-red-400">×</button></span>))}</div></div>
                <div className="col-span-2 flex gap-2 justify-end pt-3 border-t border-gray-700/50"><button type="button" onClick={()=>{setShowAddBlog(false);setEditingBlog(null);setImagePreview(null)}} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-xs">Cancel</button><button type="submit" className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold">{editingBlog?"Update":"Add Post"}</button></div>
              </form></div>)}
              <div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl overflow-hidden overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-gray-700/50 bg-gray-800/30">{["ID","Title","Category","Status","Views","Date","⚡"].map(h=><th key={h} className="text-left py-2 px-3 text-[10px] text-gray-500 uppercase">{h}</th>)}</tr></thead><tbody>{blogPosts.map(p=>(<tr key={p.id} className="border-b border-gray-700/20 hover:bg-gray-800/20"><td className="py-1.5 px-3 text-[10px] text-gray-600">{p.id}</td><td className="py-1.5 px-3 text-[10px] text-gray-300 max-w-[200px] truncate">{p.title}</td><td className="py-1.5 px-3 text-[10px] text-gray-400">{p.category}</td><td className="py-1.5 px-3"><span className={`text-[10px] px-2 py-0.5 rounded-full ${p.is_published?"bg-emerald-500/10 text-emerald-400":"bg-gray-500/10 text-gray-400"}`}>{p.is_published?"Published":"Draft"}</span></td><td className="py-1.5 px-3 text-[10px] text-gray-500">{p.views||0}</td><td className="py-1.5 px-3 text-[10px] text-gray-500">{p.published_at?.slice(0,10)}</td><td className="py-1.5 px-3 text-center"><button onClick={()=>{setEditingBlog(p);setImagePreview(null)}} className="text-blue-400 text-xs mr-1">✏️</button><button onClick={()=>setDeleteBlogConfirm(p.id)} className="text-red-400 text-xs">🗑️</button></td></tr>))}</tbody></table></div>
              {deleteBlogConfirm&&(<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"><div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full"><p className="text-white font-bold mb-2">Delete Post?</p><div className="flex gap-2 justify-end"><button onClick={()=>setDeleteBlogConfirm(null)} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-xs">Cancel</button><button onClick={()=>handleDeleteBlog(deleteBlogConfirm)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold">Delete</button></div></div></div>)}
            </div>
          )}

          {/* POLL TAB */}
          {activeTab === "poll" && (
            <div className="space-y-6"><h2 className="text-xl font-bold text-white">Poll Management</h2><div className="grid grid-cols-2 gap-4"><div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6"><h3 className="text-sm font-bold text-white mb-4">Vote Counts</h3><div className="space-y-3 text-sm"><div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10"><div className="flex justify-between"><span className="text-blue-400 font-bold">Messi</span><span className="text-white font-bold text-lg">{pollData.messiVotes.toLocaleString()}</span></div><div className="flex justify-between text-xs"><span className="text-gray-500">Live</span><span className="text-gray-400">+{pollData.messiLive.toLocaleString()}</span></div></div><div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10"><div className="flex justify-between"><span className="text-red-400 font-bold">Ronaldo</span><span className="text-white font-bold text-lg">{pollData.ronaldoVotes.toLocaleString()}</span></div><div className="flex justify-between text-xs"><span className="text-gray-500">Live</span><span className="text-gray-400">+{pollData.ronaldoLive.toLocaleString()}</span></div></div><div className="border-t border-gray-700 pt-3 flex justify-between"><span className="text-white font-bold">Total</span><span className="text-white font-bold text-lg">{(pollData.messiVotes+pollData.ronaldoVotes).toLocaleString()}</span></div></div></div><div className="bg-gray-900/80 border border-gray-700/60 rounded-2xl p-6"><h3 className="text-sm font-bold text-white mb-4">Actions</h3><button onClick={()=>setPollResetConfirm(true)} className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-bold hover:bg-red-500/20 mb-4">🗑️ Reset Live Votes</button><p className="text-[10px] text-gray-600">Only deletes live votes. Initial counts remain.</p></div></div>
              {pollResetConfirm&&(<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"><div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full"><p className="text-white font-bold text-lg mb-2">Reset Votes?</p><div className="flex gap-3 justify-end"><button onClick={()=>setPollResetConfirm(false)} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm">Cancel</button><button onClick={handleResetPoll} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold">Reset</button></div></div></div>)}
            </div>
          )}

        </div>
      </div>
    </>
  )
}