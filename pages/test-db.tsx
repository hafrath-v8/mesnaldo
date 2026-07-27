import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function TestDB() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      // Test career_stats
      const { data: stats, error: statsError } = await supabase
        .from("career_stats")
        .select("*")
      
      console.log("career_stats:", stats)
      console.log("career_stats error:", statsError)

      // Test matches
      const { data: matches, error: matchesError } = await supabase
        .from("matches")
        .select("*")
        .limit(5)
      
      console.log("matches:", matches)
      console.log("matches error:", matchesError)

      setResult({ stats, matches })
      setError({ statsError, matchesError })
    }
    fetchData()
  }, [])

  return (
    <div style={{ padding: 40, color: "white", background: "#111", minHeight: "100vh" }}>
      <h1>Database Test</h1>
      
      <h2>Career Stats:</h2>
      {error?.statsError ? (
        <p style={{ color: "red" }}>Error: {error.statsError.message}</p>
      ) : result?.stats ? (
        <pre>{JSON.stringify(result.stats, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}

      <h2>Matches:</h2>
      {error?.matchesError ? (
        <p style={{ color: "red" }}>Error: {error.matchesError.message}</p>
      ) : result?.matches ? (
        <pre>{JSON.stringify(result.matches, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}