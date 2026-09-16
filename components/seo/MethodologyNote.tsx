import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"

interface MethodologyNoteProps {
  title?: string
  text?: string
}

export default function MethodologyNote({
  title = "How are these statistics calculated?",
  text = "Football statistics can differ between providers because of competition scope, historical records and statistical definitions. Mesnaldo uses a consistent methodology and explains important differences when necessary.",
}: MethodologyNoteProps) {
  return (
    <aside
      aria-label="Mesnaldo statistics methodology"
      className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-amber-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-white mb-1.5">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-6">
            {text}
          </p>
          <Link
            href="/methodology"
            className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            View our methodology
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
