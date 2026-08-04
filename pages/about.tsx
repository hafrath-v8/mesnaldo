// pages/about.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import { BarChart3, Goal, Crosshair, Trophy, Award, ClipboardList, Swords, Globe, TrendingUp, Vote, Smartphone, Star, DollarSign, Tv, Library, FileText, Shield, Eye, ArrowRight, Sparkles, Database, Users, Zap } from "lucide-react"

const STATS = [
  { icon: BarChart3, value: "2,492+", label: "Matches Tracked" },
  { icon: Goal, value: "1,895", label: "Combined Goals" },
  { icon: Crosshair, value: "677", label: "Combined Assists" },
  { icon: Trophy, value: "85", label: "Combined Trophies" },
  { icon: Award, value: "13", label: "Ballon d'Or Awards" },
  { icon: ClipboardList, value: "258+", label: "World Records" },
  { icon: Swords, value: "36", label: "H2H Matches" },
  { icon: Globe, value: "200+", label: "Countries Reached" },
]

const TIMELINE = [
  { year: "2023", title: "Project Founded", desc: "Mesnaldo was established by a team of football data analysts and developers who saw a need for a truly comprehensive Messi vs Ronaldo comparison platform." },
  { year: "2024", title: "Database Built", desc: "Our team compiled and verified over 2,400 match records, creating one of the most complete football statistics databases available." },
  { year: "2025", title: "Platform Launched", desc: "Mesnaldo went live with interactive charts, detailed comparisons, and the GOAT poll that thousands of fans have since voted in." },
  { year: "2026", title: "Continuous Growth", desc: "We now track 100+ individual awards, 258+ world records, and update statistics within hours of every match." },
]

export default function About() {
  return (
    <Layout
      title="About Mesnaldo | The Most Detailed Messi vs Ronaldo Comparison"
      description="Mesnaldo is the most comprehensive Messi vs Ronaldo comparison platform. Built by a dedicated team of football data analysts and developers. 2,490+ matches, 258+ records, 100+ awards."
    >
      <div className="bg-black min-h-screen">

        {/* Hero */}
        <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                About the platform
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                The most detailed <span className="text-amber-400">Messi vs Ronaldo</span> comparison
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                Built by a dedicated team of football data analysts, developers, and researchers who are committed to accuracy and detail.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Name origin */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 mb-16">
          <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Mess<span className="text-blue-400">i</span> + Ro<span className="text-red-400">naldo</span>
            </p>
            <p className="text-gray-500">= <span className="text-amber-400 font-bold text-xl">Mesnaldo</span></p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 space-y-24">

          {/* Who we are */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Who we are</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  A team dedicated to <span className="text-amber-400">football data</span>
                </h2>
                <div className="space-y-4 text-sm text-gray-400 leading-7">
                  <p>
                    Mesnaldo was founded by a team of football data analysts, software developers, and researchers who recognized a gap in how football statistics were presented online. Existing comparisons were often incomplete, outdated, or biased toward one player.
                  </p>
                  <p>
                    Our team built a centralized platform where every goal, assist, trophy, and record is tracked, verified against official sources, and updated regularly. We are committed to providing the most accurate and comprehensive Messi vs Ronaldo comparison available anywhere.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    { icon: Database, label: "Data Team" },
                    { icon: Users, label: "Researchers" },
                    { icon: Zap, label: "Real-time Updates" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-900/60 border border-gray-800 rounded-full px-4 py-2">
                      <item.icon className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs text-gray-400">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {STATS.slice(0, 4).map((stat, i) => {
                  const StatIcon = stat.icon
                  return (
                    <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 text-center">
                      <StatIcon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Our journey</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">How we built Mesnaldo</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gray-800 sm:-translate-x-px" />
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`relative pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:ml-auto' : 'sm:pl-12'}`}>
                    <div className={`absolute left-1.5 sm:left-auto ${i % 2 === 0 ? 'sm:right-0 sm:translate-x-1/2' : 'sm:left-0 sm:-translate-x-1/2'} top-1 w-4 h-4 rounded-full bg-amber-400 border-4 border-black`} />
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6">
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full">{item.year}</span>
                      <h3 className="text-base font-bold text-white mt-2 mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Our principles</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">What drives our work</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: "Verified Accuracy", desc: "Every statistic is cross-checked against multiple official sources. Data errors are corrected within 24 hours of being reported." },
                { icon: Eye, title: "Complete Transparency", desc: "We present the full picture — not selective statistics. Both players' achievements are displayed fairly and in proper context." },
                { icon: Globe, title: "Global Reach", desc: "Our platform serves football fans across 200+ countries, providing reliable comparisons accessible to everyone, everywhere." },
              ].map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center">
                  <v.icon className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Platform features</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">What you can do on Mesnaldo</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: BarChart3, title: "Comprehensive Statistics", desc: "Goals by body part, assists by competition, every performance metric that matters." },
                { icon: Swords, title: "Head to Head Analysis", desc: "All 36 meetings documented with full match details, scores, and context." },
                { icon: Trophy, title: "Trophy & Awards Comparison", desc: "Every team trophy and 100+ individual awards compared side by side." },
                { icon: TrendingUp, title: "Interactive Visualizations", desc: "Radar charts, bar graphs, pie charts, and complete career timelines." },
                { icon: Vote, title: "Global GOAT Poll", desc: "Thousands of votes cast. Live results updated in real-time." },
                { icon: Smartphone, title: "Fully Responsive Design", desc: "Optimized experience across mobile, tablet, and desktop devices." },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="group bg-gray-900/60 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                  <f.icon className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">{f.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Data Sources */}
          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Trusted data</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Our data sources</h2>
              <p className="text-sm text-gray-500 mt-2">Every statistic is verified against official sources before publication</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: "Official League Records", icon: FileText },
                { name: "UEFA", icon: Star },
                { name: "FIFA", icon: Globe },
                { name: "Opta Sports", icon: BarChart3 },
                { name: "IFFHS", icon: Award },
                { name: "Transfermarkt", icon: DollarSign },
                { name: "ESPN Stats", icon: Tv },
                { name: "RSSSF", icon: Library },
              ].map((s, i) => {
                const SourceIcon = s.icon
                return (
                  <div key={i} className="flex items-center gap-2 bg-gray-900/60 border border-gray-800 rounded-full px-4 py-2">
                    <SourceIcon className="w-4 h-4 text-amber-400/70" />
                    <span className="text-xs text-gray-400">{s.name}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-10 sm:p-14">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Explore the full comparison</h2>
              <p className="text-sm text-gray-400 mb-8">The most detailed Messi vs Ronaldo statistics are waiting for you.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/goals" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                  Compare Goals <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/poll" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-colors">
                  Vote for GOAT
                </Link>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-center text-[11px] text-gray-600 max-w-xl mx-auto leading-relaxed">
            Mesnaldo is an independent platform. Not affiliated with any player, club, or governing body. 
            All statistics compiled from publicly available official sources.
          </p>

        </div>
      </div>
    </Layout>
  )
}