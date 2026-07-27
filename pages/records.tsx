// pages/records.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"

interface RecordItem {
  id: number
  player_id: number
  record_type: string
  category: string
  title: string
  description: string
  value: string
}

interface RecordsPageProps {
  records: RecordItem[]
}

export default function Records({ records }: RecordsPageProps) {
  const [activePlayer, setActivePlayer] = useState<"all" | 1 | 2>("all")
  const [activeType, setActiveType] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<"all" | "comparison">("all")

  const recordTypes = useMemo(() => [...new Set(records.map(r => r.record_type))], [records])

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (activePlayer !== "all" && r.player_id !== activePlayer) return false
      if (activeType !== "all" && r.record_type !== activeType) return false
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [records, activePlayer, activeType, search])

  const groupedRecords = useMemo(() => {
    const grouped: Record<string, RecordItem[]> = {}
    filteredRecords.forEach(r => {
      if (!grouped[r.category]) grouped[r.category] = []
      grouped[r.category].push(r)
    })
    return grouped
  }, [filteredRecords])

  const comparisonData = useMemo(() => {
    const categories = [...new Set(records.map(r => r.category))]
    return categories.map(cat => ({
      category: cat,
      messi: records.filter(r => r.category === cat && r.player_id === 1),
      ronaldo: records.filter(r => r.category === cat && r.player_id === 2),
    })).filter(d => d.messi.length > 0 || d.ronaldo.length > 0)
  }, [records])

  const messiCount = records.filter(r => r.player_id === 1).length
  const ronaldoCount = records.filter(r => r.player_id === 2).length
  const filteredCount = filteredRecords.length

  return (
    <Layout title="Records - Messi vs Ronaldo">
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-8">

          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">Milestones & Achievements</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              World <span className="text-amber-400">Records</span>
            </h1>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Complete collection of world records, European records, club records, and national team records.
            </p>
          </div>

          {/* STATS BAR */}
          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-blue-400">{messiCount}</p>
              <p className="text-[10px] text-gray-500">Messi</p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-amber-400">{records.length}</p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-red-400">{ronaldoCount}</p>
              <p className="text-[10px] text-gray-500">Ronaldo</p>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white">{filteredCount}</p>
              <p className="text-[10px] text-gray-500">Showing</p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setViewMode("all")}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${viewMode === "all" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                All Records
              </button>
              <button onClick={() => setViewMode("comparison")}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${viewMode === "comparison" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                Side by Side
              </button>
            </div>

            <div className="relative max-w-md mx-auto">
              <input type="text" placeholder="Search records..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">Clear</button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => setActivePlayer("all")}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${activePlayer === "all" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>All</button>
              <button onClick={() => setActivePlayer(1)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${activePlayer === 1 ? "bg-blue-500 text-white" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>Messi</button>
              <button onClick={() => setActivePlayer(2)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all font-medium ${activePlayer === 2 ? "bg-red-500 text-white" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>Ronaldo</button>
              <span className="text-gray-700 mx-1">|</span>
              <button onClick={() => setActiveType("all")}
                className={`px-3 py-1.5 text-[11px] sm:text-xs rounded-full transition-all ${activeType === "all" ? "bg-white text-black font-bold" : "text-gray-500 bg-gray-900 border border-gray-800 hover:text-gray-300"}`}>All Types</button>
              {recordTypes.map(type => (
                <button key={type} onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 text-[11px] sm:text-xs rounded-full transition-all ${activeType === type ? "bg-white text-black font-bold" : "text-gray-500 bg-gray-900 border border-gray-800 hover:text-gray-300"}`}>{type}</button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-600">Showing {filteredCount} of {records.length} records</p>

          {/* COMPARISON VIEW */}
          {viewMode === "comparison" && (
            <div className="space-y-8">
              {comparisonData.map(({ category, messi, ronaldo }) => (
                <div key={category} className="bg-gray-900/50 border border-gray-700/40 rounded-2xl p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-4 text-center">{category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-3 text-center">Messi</p>
                      {messi.length === 0 ? (
                        <p className="text-gray-600 text-xs text-center py-4">No records in this category</p>
                      ) : (
                        <div className="space-y-1.5">
                          {messi.map((r) => (
                            <div key={r.id} className="bg-gray-800/40 rounded-lg p-3">
                              <p className="text-xs text-gray-200 font-medium">{r.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] text-gray-500 truncate mr-2">{r.description}</span>
                                <span className="text-xs font-bold text-blue-400 flex-shrink-0">{r.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-3 text-center">Ronaldo</p>
                      {ronaldo.length === 0 ? (
                        <p className="text-gray-600 text-xs text-center py-4">No records in this category</p>
                      ) : (
                        <div className="space-y-1.5">
                          {ronaldo.map((r) => (
                            <div key={r.id} className="bg-gray-800/40 rounded-lg p-3">
                              <p className="text-xs text-gray-200 font-medium">{r.title}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] text-gray-500 truncate mr-2">{r.description}</span>
                                <span className="text-xs font-bold text-red-400 flex-shrink-0">{r.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ALL RECORDS VIEW */}
          {viewMode === "all" && (
            Object.keys(groupedRecords).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No records found</p>
                <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedRecords).map(([category, categoryRecords]) => (
                  <div key={category}>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2 sticky top-16 bg-black/95 py-2 z-10 backdrop-blur">
                      <span className={`w-2 h-2 rounded-full ${categoryRecords[0].player_id === 1 ? "bg-blue-400" : "bg-red-400"}`} />
                      {category}
                      <span className="text-xs text-gray-500 font-normal">({categoryRecords.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {categoryRecords.map((record, i) => (
                        <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}
                          className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 hover:border-gray-600/70 transition-all">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-200 font-medium">{record.title}</p>
                            {record.description && <p className="text-[11px] text-gray-500 mt-1">{record.description}</p>}
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${record.player_id === 1 ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                              {record.player_id === 1 ? "Messi" : "Ronaldo"}
                            </span>
                            {record.value && <span className="text-sm font-bold text-white whitespace-nowrap">{record.value}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-[10px] text-gray-600">Records updated regularly.</p>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: records } = await supabase
      .from("records")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    return { props: { records: records || [] } }
  } catch (e) {
    console.error("Error:", e)
    return { props: { records: [] } }
  }
}