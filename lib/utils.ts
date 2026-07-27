import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number with commas (1000 → 1,000)
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "0"
  return num.toLocaleString("en-US")
}

// Calculate win percentage
export function winPercent(wins: number, total: number): string {
  if (total === 0) return "0"
  return ((wins / total) * 100).toFixed(1)
}

// Get result badge color
export function resultColor(result: string): string {
  switch (result) {
    case "W": return "bg-emerald-500"
    case "D": return "bg-amber-500"
    case "L": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

// Result text
export function resultText(result: string): string {
  switch (result) {
    case "W": return "Win"
    case "D": return "Draw"
    case "L": return "Loss"
    default: return "-"
  }
}

// Format minutes per goal
export function minsPerGoal(mins: number, goals: number): string {
  if (goals === 0) return "0"
  return (mins / goals).toFixed(2)
}

// Format minutes per goal+assist
export function minsPerGA(mins: number, goals: number, assists: number): string {
  const total = goals + assists
  if (total === 0) return "0"
  return (mins / total).toFixed(2)
}

// Format date to readable string
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Get season from date string
export function getSeason(date: string): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  return month < 7 ? `${year - 1}/${year.toString().slice(2)}` : `${year}/${(year + 1).toString().slice(2)}`
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

// Safe access for potentially null career stats
export function safeStat(value: number | null | undefined, fallback: number = 0): number {
  return value ?? fallback
}