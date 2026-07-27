import { Player, CareerStats } from "@/types"
import { formatNumber, minsPerGoal } from "@/lib/utils"

interface PlayerCardProps {
  player: Player
  stats: CareerStats
  color: "blue" | "red"
}

export default function PlayerCard({ player, stats, color }: PlayerCardProps) {
  const isBlue = color === "blue"

  const gradient = isBlue
    ? "from-sky-500/20 to-sky-600/5 border-sky-500/30"
    : "from-rose-500/20 to-rose-600/5 border-rose-500/30"

  const textColor = isBlue ? "text-sky-400" : "text-rose-400"
  const bgBadge = isBlue ? "bg-sky-500/20 text-sky-400" : "bg-rose-500/20 text-rose-400"

  return (
    <div className={`card bg-gradient-to-br ${gradient} border`}>
      {/* Player Name */}
      <h2 className={`text-2xl font-bold ${textColor} mb-6`}>{player.name}</h2>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="stat-label">Games</p>
          <p className="text-xl font-bold">{formatNumber(stats.total_games)}</p>
        </div>
        <div>
          <p className="stat-label">Goals</p>
          <p className="text-xl font-bold">{stats.total_goals}</p>
        </div>
        <div>
          <p className="stat-label">Assists</p>
          <p className="text-xl font-bold">{stats.total_assists}</p>
        </div>
        <div>
          <p className="stat-label">Mins/Goal</p>
          <p className="text-xl font-bold">{minsPerGoal(stats.total_minutes, stats.total_goals)}</p>
        </div>
      </div>

      {/* Win/Loss */}
      <div className="flex gap-2 mb-6">
        <span className="badge-win">{stats.total_wins}W</span>
        <span className="badge-draw">{stats.total_draws}D</span>
        <span className="badge-loss">{stats.total_losses}L</span>
      </div>

      {/* Mini Stats */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">Left Foot</span>
          <span className={textColor}>{stats.left_foot_goals}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Right Foot</span>
          <span className={textColor}>{stats.right_foot_goals}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Headers</span>
          <span className={textColor}>{stats.header_goals}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Free Kicks</span>
          <span className={textColor}>{stats.free_kick_goals}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Penalties</span>
          <span className={textColor}>{stats.penalties_scored}</span>
        </div>
      </div>
    </div>
  )
}