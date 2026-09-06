import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


// ─────────────────────────────────────────────
// Tailwind class merger
// ─────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ─────────────────────────────────────────────
// Number helpers
// ─────────────────────────────────────────────

// Format number with commas (1000 → 1,000)
export function formatNumber(
  num: number | null | undefined
): string {
  if (
    num === null ||
    num === undefined ||
    !Number.isFinite(num)
  ) {
    return "0"
  }

  return num.toLocaleString("en-US")
}


// Safe access for potentially null stats
export function safeStat(
  value: number | null | undefined,
  fallback = 0
): number {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return fallback
  }

  return value
}


// ─────────────────────────────────────────────
// Percentage helpers
// ─────────────────────────────────────────────

// Calculate win percentage
export function winPercent(
  wins: number,
  total: number
): string {
  if (
    total <= 0 ||
    !Number.isFinite(wins) ||
    !Number.isFinite(total)
  ) {
    return "0.0"
  }

  return ((wins / total) * 100).toFixed(1)
}


// ─────────────────────────────────────────────
// Match result helpers
// ─────────────────────────────────────────────

// Get result badge color
export function resultColor(
  result: string | null | undefined
): string {
  switch (result?.toUpperCase()) {
    case "W":
      return "bg-emerald-500"

    case "D":
      return "bg-amber-500"

    case "L":
      return "bg-red-500"

    default:
      return "bg-gray-500"
  }
}


// Get readable result text
export function resultText(
  result: string | null | undefined
): string {
  switch (result?.toUpperCase()) {
    case "W":
      return "Win"

    case "D":
      return "Draw"

    case "L":
      return "Loss"

    default:
      return "-"
  }
}


// ─────────────────────────────────────────────
// Efficiency helpers
// ─────────────────────────────────────────────

// Minutes per goal
export function minsPerGoal(
  mins: number,
  goals: number
): string {
  if (
    goals <= 0 ||
    mins < 0 ||
    !Number.isFinite(mins) ||
    !Number.isFinite(goals)
  ) {
    return "-"
  }

  return (mins / goals).toFixed(2)
}


// Minutes per goal contribution
export function minsPerGA(
  mins: number,
  goals: number,
  assists: number
): string {
  const totalContributions = goals + assists

  if (
    totalContributions <= 0 ||
    mins < 0 ||
    !Number.isFinite(mins) ||
    !Number.isFinite(goals) ||
    !Number.isFinite(assists)
  ) {
    return "-"
  }

  return (mins / totalContributions).toFixed(2)
}


// ─────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────

// Format date to readable string
// Example: 18 Dec 2022
export function formatDate(
  date: string | null | undefined
): string {
  if (!date) {
    return "-"
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}


// Get European-style football season from date
// Example:
// 2024-03-10 → 2023/24
// 2024-08-10 → 2024/25
export function getSeason(
  date: string | null | undefined
): string {
  if (!date) {
    return "-"
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "-"
  }

  const year = parsedDate.getUTCFullYear()
  const month = parsedDate.getUTCMonth() + 1

  if (month < 7) {
    return `${year - 1}/${year.toString().slice(-2)}`
  }

  return `${year}/${(year + 1)
    .toString()
    .slice(-2)}`
}


// ─────────────────────────────────────────────
// Text helpers
// ─────────────────────────────────────────────

export function truncate(
  text: string,
  length: number
): string {
  if (!text) {
    return ""
  }

  if (length <= 0) {
    return ""
  }

  if (text.length <= length) {
    return text
  }

  return `${text.slice(0, length).trimEnd()}...`
}