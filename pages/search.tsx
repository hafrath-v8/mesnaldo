// pages/search.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/router"
import { ArrowRight, Goal, TrendingUp, Trophy, Crown, Target, Crosshair, Zap, Shield, Globe, Star, Search as SearchIcon, X, Sparkles, Clock, Users, Swords, Award, Command, CornerDownLeft, BarChart3, Timer, Footprints, Lightbulb } from "lucide-react"
import { runSearch, TRENDING, type SearchResult } from "../lib/search-engine"

interface SearchProps {
  query: string
  initialResults: SearchResult[]
  suggestions: string[]
  hint: string | null
}

const QUICK_STATS = [
  { label: "Goals", icon: Goal, query: "goals", color: "group-hover:text-emerald-400" },
  { label: "Assists", icon: TrendingUp, query: "assists", color: "group-hover:text-blue-400" },
  { label: "Trophies", icon: Trophy, query: "trophies", color: "group-hover:text-amber-400" },
  { label: "Ballon d'Or", icon: Crown, query: "ballon d'or", color: "group-hover:text-yellow-400" },
  { label: "Free Kicks", icon: Zap, query: "free kicks", color: "group-hover:text-purple-400" },
  { label: "Headers", icon: Shield, query: "headers", color: "group-hover:text-red-400" },
  { label: "Penalties", icon: Crosshair, query: "penalties", color: "group-hover:text-orange-400" },
  { label: "UCL", icon: Star, query: "champions league", color: "group-hover:text-blue-300" },
  { label: "World Cup", icon: Globe, query: "world cup", color: "group-hover:text-amber-300" },
  { label: "Records", icon: Target, query: "records", color: "group-hover:text-rose-400" },
]

const RECENT_ICONS: Record<string, any> = {
  "goals": Goal, "assists": TrendingUp, "trophies": Trophy, "ballon": Crown,
  "free kick": Zap, "headers": Shield, "penalties": Crosshair, "champions": Star,
  "world cup": Globe, "records": Target, "messi": Users, "ronaldo": Users,
  "head": Swords, "best": Award, "compare": ArrowRight, "stats": BarChart3,
  "minutes": Timer, "per game": Footprints,
}

const EXAMPLE_QUESTIONS = [
  "who has more goals messi or ronaldo",
  "messi free kick goals count",
  "ronaldo header goals",
  "compare penalties messi ronaldo",
  "messi vs ronaldo trophies",
  "who is better messi or ronaldo",
  "ballon d'or comparison",
  "champions league titles messi ronaldo",
]

export default function Search({ query, initialResults, suggestions, hint: initialHint }: SearchProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResult[]>(initialResults)
  const [hint, setHint] = useState<string | null>(initialHint)
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [hasSearched, setHasSearched] = useState(!!query)
  const [autocomplete, setAutocomplete] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem("mesnaldo-recent-searches")
    if (stored) setRecentSearches(JSON.parse(stored).slice(0, 5))
  }, [])

  // Live autocomplete fetch
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timer = setTimeout(() => {
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          .then(res => res.json())
          .then(data => setAutocomplete(data.autocomplete || []))
          .catch(() => setAutocomplete([]))
      }, 150)
      return () => clearTimeout(timer)
    } else {
      setAutocomplete([])
    }
  }, [searchQuery])

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setShowSuggestions(true)
      }
      if (e.key === "Escape") {
        inputRef.current?.blur()
        setShowSuggestions(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const suggestionItems = [
    ...(recentSearches.length > 0 ? recentSearches : []),
    ...autocomplete,
    ...suggestions,
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => Math.min(prev + 1, suggestionItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0 && suggestionItems[selectedSuggestionIndex]) {
        e.preventDefault()
        handleSearch(suggestionItems[selectedSuggestionIndex])
      } else {
        handleSearch(searchQuery)
      }
    }
  }

  const saveSearch = useCallback((q: string) => {
    const updated = [q, ...recentSearches.filter(s => s !== q)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("mesnaldo-recent-searches", JSON.stringify(updated))
  }, [recentSearches])

  const handleSearch = async (q: string) => {
    if (!q.trim()) return
    setLoading(true)
    setHasSearched(true)
    saveSearch(q.trim())
    setSearchQuery(q.trim())
    setSelectedSuggestionIndex(-1)
    setAutocomplete([])
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(q.trim())}`)

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
      const data = await res.json()
      setResults(data.results)
      setHint(data.hint || null)
    } catch {
      setResults([])
      setHint("Search failed. Please try again.")
    }
    setLoading(false)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const clearSearch = () => {
    setSearchQuery("")
    setResults([])
    setHint(null)
    setHasSearched(false)
    setSelectedSuggestionIndex(-1)
    setAutocomplete([])
    inputRef.current?.focus()
  }

  const getIconForResult = (result: SearchResult) => {
    if (result.type === "redirect" && result.title) {
      for (const [key, icon] of Object.entries(RECENT_ICONS)) {
        if (result.title.toLowerCase().includes(key)) return icon
      }
    }
    return Star
  }

  const showSuggestionDropdown = showSuggestions && !loading && (!hasSearched || (hasSearched && !results.length && !searchQuery))

  return (
    <Layout
      title={query ? `${query} - Mesnaldo Search` : "Search Mesnaldo - Messi vs Ronaldo Stats"}
      description="Search the most comprehensive Messi vs Ronaldo comparison platform. Ask anything about goals, assists, trophies, records, and more."
    >
      <div className="bg-black min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">

          {/* Hero */}
          <AnimatePresence mode="wait">
            {!hasSearched && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Search <span className="text-amber-400">Mesnaldo</span>
                </h1>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Ask anything about Messi vs Ronaldo. Stats, records, trophies — all from our verified database.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {EXAMPLE_QUESTIONS.slice(0, 4).map((q, i) => (
                    <button key={i} onClick={() => handleSearch(q)}
                      className="px-3 py-1.5 text-[11px] bg-gray-900/60 border border-gray-800 rounded-full text-gray-500 hover:text-amber-400 hover:border-amber-500/30 transition-all">
                      {q.length > 35 ? q.slice(0, 35) + "..." : q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Input */}
          <div className="relative">
            <motion.div 
              layout
              className="flex items-center bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden focus-within:border-amber-500/50 transition-all shadow-lg focus-within:shadow-amber-500/5"
            >
              <div className="pl-5 flex-shrink-0">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                ) : (
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSelectedSuggestionIndex(-1)
                  if (e.target.value.length > 0) setShowSuggestions(true)
                }}
                onFocus={() => {
                  if (!hasSearched || searchQuery) setShowSuggestions(true)
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder="Search stats, records, and comparisons..."
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none"
                autoComplete="off"
              />
              <div className="flex items-center gap-1 pr-2">
                {searchQuery && (
                  <button onClick={clearSearch} className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => handleSearch(searchQuery)}
                  disabled={loading || !searchQuery.trim()}
                  className="px-5 py-2.5 mr-2 bg-amber-500 text-black text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? "Searching..." : (
                    <>
                      <SearchIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Search</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Suggestions + Autocomplete Dropdown */}
            <AnimatePresence>
              {(showSuggestionDropdown || (autocomplete.length > 0 && searchQuery.length >= 2 && !loading)) && (
                <motion.div
                  ref={suggestionsRef}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden z-50 shadow-2xl"
                >
                  <div className="p-3 max-h-[400px] overflow-y-auto">

                    {/* Search for exact query */}
                    {searchQuery.length >= 2 && (
                      <button
                        onClick={() => handleSearch(searchQuery)}
                        className="w-full text-left px-3 py-2.5 mb-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <SearchIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-sm text-gray-300">
                              Search for <span className="text-amber-400">"{searchQuery}"</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-gray-600">
                            <span>Enter</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Smart Autocomplete Suggestions */}
                    {autocomplete.length > 0 && (
                      <div className="mb-2">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
                          <Lightbulb className="w-3 h-3 text-amber-400" /> Suggestions
                        </p>
                        {autocomplete.map((s, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleSearch(s)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                              selectedSuggestionIndex === i ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500/70 flex-shrink-0" />
                            <span className="truncate">{s}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between px-3 mb-1.5">
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> Recent
                          </p>
                          <button 
                            onClick={() => { setRecentSearches([]); localStorage.removeItem("mesnaldo-recent-searches") }}
                            className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                        {recentSearches.map((s, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleSearch(s)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                              selectedSuggestionIndex === autocomplete.length + i ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                            <span className="truncate">{s}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3" /> Popular
                      </p>
                      {suggestions.map((s, i) => {
                        const idx = autocomplete.length + recentSearches.length + i
                        return (
                          <button 
                            key={i} 
                            onClick={() => handleSearch(s)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                              selectedSuggestionIndex === idx ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            <TrendingUp className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                            <span className="truncate">{s}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Keyboard shortcuts footer */}
                  <div className="px-4 py-2.5 border-t border-gray-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-gray-600">
                      <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center text-[9px]">↑↓</span> Navigate</span>
                      <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center text-[9px]">↵</span> Select</span>
                      <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center text-[9px]">Esc</span> Close</span>
                    </div>
                    <span className="text-[10px] text-gray-600 flex items-center gap-1">
                      <Command className="w-3 h-3" />K to search
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hint */}
          <AnimatePresence>
            {!loading && hint && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs text-gray-500 italic text-center bg-gray-900/50 rounded-xl py-2 px-4 border border-gray-800/50">
                💡 {hint}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading */}
          <AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
                  <SearchIcon className="w-5 h-5 text-amber-400 absolute inset-0 m-auto" />
                </div>
                <p className="text-sm text-gray-500">Searching the database...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {!loading && results.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "<span className="text-white">{query}</span>"
                  </p>
                </div>
                
                {results.map((result, i) => {
                  const ResultIcon = getIconForResult(result)
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {result.type === "answer" && (
                        <div className="bg-gradient-to-br from-blue-500/5 via-amber-500/10 to-red-500/5 border border-amber-500/20 rounded-2xl p-5 sm:p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                              <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                            </div>
                            <div>
                              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Answer</p>
                            </div>
                          </div>
                          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{result.content}</p>

                          {result.stats && (
                            <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-gray-800/50">
                              <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10 text-center group hover:bg-blue-500/10 transition-colors">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-2.5 group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/10">
                                  <Image src="/images/messi.webp" alt="Lionel Messi" width={40} height={40} />
                                </div>
                                <p className="text-xl font-black text-blue-400">{result.stats.messi}</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">Lionel Messi</p>
                              </div>
                              <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10 text-center group hover:bg-red-500/10 transition-colors">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-2.5 group-hover:scale-105 transition-transform shadow-lg shadow-red-500/10">
                                  <Image src="/images/ronaldo.webp" alt="Cristiano Ronaldo" width={40} height={40} />
                                </div>
                                <p className="text-xl font-black text-red-400">{result.stats.ronaldo}</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">Cristiano Ronaldo</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {result.type === "redirect" && (
                        <Link href={result.href!}
                          className="flex items-center gap-4 bg-gray-900/60 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 hover:bg-gray-900/80 transition-all group">
                          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors shadow-lg shadow-amber-500/5">
                            <ResultIcon className="w-5 h-5 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{result.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{result.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                      )}
                    </motion.div>
                  )
                })}

                {/* Related Pages */}
                <div className="pt-4 mt-4 border-t border-gray-800/50">
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-3">Explore More</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { href: "/goals", label: "Goals" },
                      { href: "/assists", label: "Assists" },
                      { href: "/trophies", label: "Trophies" },
                      { href: "/honours", label: "Honours" },
                      { href: "/who-is-best", label: "Who's Best?" },
                      { href: "/head-to-head", label: "Head to Head" },
                      { href: "/records", label: "Records" },
                      { href: "/poll", label: "Vote" },
                    ].map(link => (
                      <Link key={link.href} href={link.href}
                        className="px-3 py-1.5 text-xs bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          <AnimatePresence>
            {!loading && !hasSearched && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {QUICK_STATS.map((stat, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleSearch(stat.query)}
                      className={`flex flex-col items-center gap-2.5 bg-gray-900/60 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-amber-500/30 hover:bg-gray-900/80 transition-all group ${stat.color}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-current transition-colors" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-gray-400 group-hover:text-white transition-colors text-center leading-tight">{stat.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          <AnimatePresence>
            {!loading && hasSearched && !results.length && query && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-5">
                <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto">
                  <SearchIcon className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-lg">No results for "<span className="text-white">{query}</span>"</p>
                  <p className="text-gray-600 text-sm mt-1">Try searching for goals, assists, trophies, or player names</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {["goals", "assists", "trophies", "ballon d'or", "free kicks", "who is better"].map(s => (
                    <button key={s} onClick={() => handleSearch(s)}
                      className="px-4 py-2 text-xs bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const raw = (query.q as string) || ""

  if (!raw.trim()) {
    return { props: { query: "", initialResults: [], suggestions: TRENDING, hint: null } }
  }

  const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
  const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()

  const { results, hint } = runSearch(raw, messi, ronaldo)

  return {
    props: {
      query: raw,
      initialResults: results,
      suggestions: TRENDING,
      hint,
    }
  }
}