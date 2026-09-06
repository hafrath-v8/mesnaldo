import Link from "next/link"
import Layout from "../components/layout/Layout"

export default function Custom404() {
  return (
    <Layout
      title="Page Not Found | Mesnaldo"
      description="The page you are looking for could not be found."
    >
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="text-amber-400 font-bold mb-3">
            404
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Page Not Found
          </h1>

          <p className="text-gray-400 mb-8">
            The page you are looking for may have
            moved or no longer exists.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-xl bg-amber-500 text-black font-bold"
            >
              Back to Home
            </Link>

            <Link
              href="/goals"
              className="px-5 py-3 rounded-xl border border-white/10 text-white"
            >
              Compare Goals
            </Link>

            <Link
              href="/trophies"
              className="px-5 py-3 rounded-xl border border-white/10 text-white"
            >
              Compare Trophies
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}