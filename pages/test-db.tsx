import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"

export default function TestDB({ data }: any) {
  return (
    <div style={{ background: "#111", color: "#fff", padding: "40px", fontFamily: "monospace" }}>
      <h1>🗳️ Poll Tables Test</h1>
      
      <div style={{ background: "#1f2937", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2 style={{ color: "#fbbf24" }}>📊 vote_counts table</h2>
        <p>Rows: {data.voteCounts?.length || 0}</p>
        <pre>{JSON.stringify(data.voteCounts, null, 2)}</pre>
        {data.voteCounts?.length === 0 && (
          <p style={{ color: "red" }}>❌ Empty! Run: INSERT INTO vote_counts (player, initial_count) VALUES ('messi', 500000), ('ronaldo', 600000);</p>
        )}
      </div>

      <div style={{ background: "#1f2937", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2 style={{ color: "#fbbf24" }}>🗳️ poll_votes table</h2>
        <p>Total rows: {data.pollCount}</p>
        <h3>By player:</h3>
        <p>🔵 Messi: {data.messiCount} votes</p>
        <p>🔴 Ronaldo: {data.ronaldoCount} votes</p>
        <h3>Last 10 votes:</h3>
        <pre>{JSON.stringify(data.pollVotes?.slice(-10), null, 2)}</pre>
      </div>

      <div style={{ background: "#1f2937", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2 style={{ color: "#fbbf24" }}>🧮 Final Calculation</h2>
        <p>Messi: {data.messiInit?.toLocaleString()} (initial) + {data.messiCount} (live) = <strong style={{ color: "#3B82F6" }}>{data.messiTotal?.toLocaleString()}</strong></p>
        <p>Ronaldo: {data.ronaldoInit?.toLocaleString()} (initial) + {data.ronaldoCount} (live) = <strong style={{ color: "#EF4444" }}>{data.ronaldoTotal?.toLocaleString()}</strong></p>
      </div>

      <p style={{ color: data.error ? "red" : "green" }}>
        {data.error ? `Error: ${data.error}` : "Connected ✅"}
      </p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // vote_counts
    const { data: voteCounts, error: vcError } = await supabase.from("vote_counts").select("*")
    
    // poll_votes
    const { data: pollVotes, error: pvError, count: pollCount } = await supabase.from("poll_votes").select("*", { count: "exact" })
    
    // Counts by player
    const { count: messiCount } = await supabase.from("poll_votes").select("*", { count: "exact", head: true }).eq("player", "messi")
    const { count: ronaldoCount } = await supabase.from("poll_votes").select("*", { count: "exact", head: true }).eq("player", "ronaldo")

    const messiInit = voteCounts?.find((c: any) => c.player === "messi")?.initial_count || 0
    const ronaldoInit = voteCounts?.find((c: any) => c.player === "ronaldo")?.initial_count || 0

    return {
      props: {
        data: {
          voteCounts: voteCounts || [],
          pollVotes: pollVotes || [],
          pollCount: pollCount || 0,
          messiCount: messiCount || 0,
          ronaldoCount: ronaldoCount || 0,
          messiInit,
          ronaldoInit,
          messiTotal: messiInit + (messiCount || 0),
          ronaldoTotal: ronaldoInit + (ronaldoCount || 0),
          error: vcError?.message || pvError?.message || null,
        },
      },
    }
  } catch (e: any) {
    return {
      props: {
        data: {
          voteCounts: [],
          pollVotes: [],
          pollCount: 0,
          messiCount: 0,
          ronaldoCount: 0,
          messiInit: 0,
          ronaldoInit: 0,
          messiTotal: 0,
          ronaldoTotal: 0,
          error: e.message,
        },
      },
    }
  }
}