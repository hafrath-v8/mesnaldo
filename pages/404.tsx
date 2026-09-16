import Link from "next/link"
import Layout from "../components/layout/Layout"

export default function Custom404() {
  return (
    <Layout
      title="404 - Page Offside | Mesnaldo"
      description="This Mesnaldo page could not be found. Return to the Messi vs Ronaldo comparison."
    >
      <main className="relative min-h-[75vh] overflow-hidden bg-black flex items-center justify-center px-4 py-16">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
        </div>

        {/* Football pitch lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />

          <div className="absolute left-0 top-1/2 h-72 w-28 -translate-y-1/2 border border-l-0 border-white" />

          <div className="absolute right-0 top-1/2 h-72 w-28 -translate-y-1/2 border border-r-0 border-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-400">
            <span>⚽</span>
            VAR CHECK COMPLETE
          </div>

          {/* 404 */}
          <div className="relative mb-3">
            <h1 className="select-none text-[110px] sm:text-[150px] md:text-[190px] leading-[0.8] font-black tracking-tighter text-white">
              4
              <span className="inline-block text-amber-400">
                0
              </span>
              4
            </h1>
          </div>

          {/* Offside */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-red-500" />

            <span className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-black tracking-[0.25em] text-red-400">
              OFFSIDE
            </span>

            <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-red-500" />
          </div>

          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            This page is off the pitch.
          </h2>

          <p className="mx-auto mb-3 max-w-xl text-base sm:text-lg leading-relaxed text-gray-400">
            Even Messi and Ronaldo couldn&apos;t find this one.
          </p>

          <p className="mx-auto mb-9 max-w-xl text-sm text-gray-500">
            The page may have been moved, deleted, or the URL may be incorrect.
          </p>

          {/* Main actions */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="group rounded-xl bg-amber-400 px-6 py-3.5 font-black text-black transition duration-200 hover:bg-amber-300 hover:-translate-y-0.5"
            >
              ← Back to Home
            </Link>

            <Link
              href="/who-is-best"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-bold text-white transition duration-200 hover:border-amber-400/40 hover:bg-white/[0.08]"
            >
              Who&apos;s the GOAT? 🐐
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm">
            <Link
              href="/goals"
              className="text-gray-500 transition hover:text-amber-400"
            >
              Goals
            </Link>

            <span className="text-gray-800">•</span>

            <Link
              href="/assists"
              className="text-gray-500 transition hover:text-amber-400"
            >
              Assists
            </Link>

            <span className="text-gray-800">•</span>

            <Link
              href="/trophies"
              className="text-gray-500 transition hover:text-amber-400"
            >
              Trophies
            </Link>

            <span className="text-gray-800">•</span>

            <Link
              href="/records"
              className="text-gray-500 transition hover:text-amber-400"
            >
              Records
            </Link>

            <span className="text-gray-800">•</span>

            <Link
              href="/poll"
              className="text-gray-500 transition hover:text-amber-400"
            >
              GOAT Poll
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}