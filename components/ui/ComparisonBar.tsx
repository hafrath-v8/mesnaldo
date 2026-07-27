interface ComparisonBarProps {
  label: string
  messiValue: number
  ronaldoValue: number
  maxValue: number
  unit?: string
  messiColor?: string
  ronaldoColor?: string
}

export default function ComparisonBar({
  label,
  messiValue,
  ronaldoValue,
  maxValue,
  unit = "",
  messiColor = "bg-sky-500",
  ronaldoColor = "bg-rose-500",
}: ComparisonBarProps) {
  const messiPercent = maxValue > 0 ? (messiValue / maxValue) * 100 : 0
  const ronaldoPercent = maxValue > 0 ? (ronaldoValue / maxValue) * 100 : 0
  const messiWins = messiValue > ronaldoValue
  const ronaldoWins = ronaldoValue > messiValue

  return (
    <div className="mb-5">
      {/* Labels */}
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${messiWins ? "text-sky-400" : "text-neutral-400"}`}>
          Messi {messiValue}{unit}
        </span>
        <span className="text-xs text-neutral-600 font-medium uppercase tracking-wider">{label}</span>
        <span className={`text-sm font-medium ${ronaldoWins ? "text-rose-400" : "text-neutral-400"}`}>
          {ronaldoValue}{unit} Ronaldo
        </span>
      </div>

      {/* Bar */}
      <div className="flex h-7 rounded-full overflow-hidden bg-neutral-800">
        <div
          className={`${messiColor} flex items-center justify-end pr-2 text-xs font-bold text-black transition-all duration-700`}
          style={{ width: `${messiPercent}%` }}
        >
          {messiPercent > 15 && messiValue}
        </div>
        <div
          className={`${ronaldoColor} flex items-center pl-2 text-xs font-bold text-white transition-all duration-700`}
          style={{ width: `${ronaldoPercent}%` }}
        >
          {ronaldoPercent > 15 && ronaldoValue}
        </div>
      </div>
    </div>
  )
}