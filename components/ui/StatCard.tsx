interface StatCardProps {
  label: string
  value: string | number
  highlight?: boolean
  sub?: string
}

export default function StatCard({ label, value, highlight = false, sub }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-300 ${
        highlight
          ? "bg-amber-500/10 border border-amber-500/30"
          : "bg-neutral-900 border border-neutral-800"
      }`}
    >
      <p className="stat-label">{label}</p>
      <p className={`stat-value mt-1 ${highlight ? "text-amber-400" : "text-white"}`}>
        {value}
      </p>
      {sub && (
        <p className="text-xs text-neutral-500 mt-1">{sub}</p>
      )}
    </div>
  )
}