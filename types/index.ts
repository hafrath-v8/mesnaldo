// ─── Player ───
export interface Player {
  id: number
  name: string
  full_name: string
  slug: string
  nationality: string
  birth_date: string
  height_cm: number
  position: string
  image_url: string | null
}

// ─── Career Stats ───
export interface CareerStats {
  id: number
  player_id: number
  total_games: number
  total_goals: number
  total_assists: number
  total_wins: number
  total_draws: number
  total_losses: number
  total_minutes: number
  penalties_scored: number
  penalties_missed: number
  free_kick_goals: number
  outside_box_goals: number
  inside_box_goals: number
  left_foot_goals: number
  right_foot_goals: number
  header_goals: number
  other_goals: number
  avg_rating: number | null
}

// ─── Match ───
export interface Match {
  id: number
  player_id: number
  match_number: number
  date: string
  competition: string | null
  round: string | null
  venue: string | null
  team: string
  opponent: string
  team_score: number
  opponent_score: number
  goals: number
  assists: number
  minutes_played: number | null
  rating: number | null
  shootout_info: string | null
  is_home: boolean
  result: string | null
}

// ─── Competition Stats ───
export interface CompetitionStats {
  competition: string
  goals: number
  assists: number
  games: number
}

// ─── H2H Match ───
export interface H2HMatch {
  date: string
  competition: string
  messi_team: string
  ronaldo_team: string
  messi_score: number
  ronaldo_score: number
  messi_goals: number
  ronaldo_goals: number
  messi_assists: number
  ronaldo_assists: number
}

// ─── Season Summary ───
export interface SeasonSummary {
  season: string
  games: number
  goals: number
  assists: number
  club: string
}

// ─── Trophy ───
export interface Trophy {
  id: number
  player_id: number
  trophy_name: string
  category: 'individual' | 'club' | 'international'
  count: number
  years_won: string
  icon: string
  sort_order: number
}