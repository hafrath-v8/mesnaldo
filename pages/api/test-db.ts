import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: players, error: playersError } = await supabase.from("players").select("*")
  const { data: stats, error: statsError } = await supabase.from("career_stats").select("*")
  const { count, error: countError } = await supabase.from("matches").select("*", { count: "exact", head: true })

  res.json({
    players: players,
    playersError: playersError?.message || null,
    stats: stats,
    statsError: statsError?.message || null,
    matchCount: count,
    countError: countError?.message || null,
  })
}