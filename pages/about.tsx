// pages/about.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
import { BarChart3, Goal, Crosshair, Trophy, Award, ClipboardList, Swords, Globe, TrendingUp, Vote, Smartphone, Star, DollarSign, Tv, Library, FileText, Shield, Eye, ArrowRight, Sparkles, Database, Users, Zap } from "lucide-react"

const STATS = [
  { icon: Goal, value: "Goals", label: "Career & Competition Data" },
  { icon: Crosshair, value: "Assists", label: "Detailed Comparisons" },
  { icon: Trophy, value: "Trophies", label: "Club & Country Honours" },
  { icon: Swords, value: "H2H", label: "Direct Meetings" },
]

const TIMELINE = [
  { year: "2023", title: "The Idea", desc: "Mesnaldo began as an idea for bringing Messi and Ronaldo statistics, achievements, records, and direct comparisons into one focused football platform." },
  { year: "2024", title: "Building the Data Structure", desc: "The project developed around structured match and career data, with dedicated sections for goals, assists, trophies, records, head-to-head meetings, and other comparison categories." },
  { year: "2025", title: "Mesnaldo Goes Live", desc: "The website launched with interactive comparison pages, visual statistics, player profiles, articles, and a community GOAT poll." },
  { year: "2026", title: "Improving the Platform", desc: "Mesnaldo continues to improve its data presentation, methodology, source transparency, editorial content, performance, and user experience." },
]

export default function About() {
  return (
    <Layout
      title="About Mesnaldo | Messi vs Ronaldo Statistics & Comparisons"
      description="Learn about Mesnaldo, an independent football statistics platform built to make Messi vs Ronaldo comparisons clearer through structured data, context, methodology, and interactive tools."
    >
      <BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]}
/>
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
                A dedicated <span className="text-amber-400">Messi vs Ronaldo</span> comparison platform
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                Mesnaldo brings career statistics, achievements, records, head-to-head data, visual comparisons, and football analysis together in one independent platform.
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
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">What Mesnaldo is</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Built to make the <span className="text-amber-400">comparison clearer</span>
                </h2>
                <div className="space-y-4 text-sm text-gray-400 leading-7">
                  <p>
                    Mesnaldo is an independent football comparison project focused on Lionel Messi and Cristiano Ronaldo. The goal is to organize the enormous amount of information surrounding their careers into pages that are easier to explore, compare, and understand.
                  </p>
                  <p>
                    Rather than reducing the debate to a single number, Mesnaldo separates different areas of performance — including goals, assists, trophies, records, career statistics, individual honours, and head-to-head meetings — and presents them with relevant context. Because football data can vary between providers, the site also explains its methodology and can revise figures when stronger information becomes available.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    { icon: Database, label: "Structured Data" },
                    { icon: Users, label: "Built for Football Fans" },
                    { icon: Zap, label: "Ongoing Updates" },
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
                { icon: Shield, title: "Consistency", desc: "Direct comparisons should use the same statistical scope and definition for both players wherever possible." },
                { icon: Eye, title: "Transparency", desc: "Definitions, limitations, and differences between data providers should be explained when they materially affect a comparison." },
                { icon: Globe, title: "Accessibility", desc: "Complex career data is organized into responsive pages, tables, charts, and explanations that football fans can explore across devices." },
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
                { icon: Trophy, title: "Trophy & Awards Comparison", desc: "Team honours and individual achievements organized into dedicated side-by-side comparisons." },
                { icon: TrendingUp, title: "Interactive Visualizations", desc: "Radar charts, bar graphs, pie charts, and complete career timelines." },
                { icon: Vote, title: "Community GOAT Poll", desc: "A fan poll where visitors can take part in the Messi vs Ronaldo debate and view the displayed results." },
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

          {/* How we work */}
          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">How we work</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Data, context, and transparency</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { icon: Database, title: "More than a scoreboard", desc: "A raw total rarely tells the whole story. Mesnaldo organizes statistics by relevant categories and uses tables, charts, filters, and written explanations to help readers understand what a number represents." },
                { icon: FileText, title: "Definitions can differ", desc: "Football databases do not always agree, particularly for categories such as assists and historical records. Figures produced under different definitions are not automatically interchangeable." },
                { icon: Shield, title: "Independent project", desc: "Mesnaldo is independent and is not affiliated with Messi, Ronaldo, their clubs, leagues, FIFA, UEFA, or the statistical providers referenced on the site." },
                { icon: ClipboardList, title: "Corrections are welcome", desc: "Football data can be corrected or reclassified. Visitors who notice a questionable figure can report the page and a supporting source so the statistic can be reviewed." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <item.icon className="w-7 h-7 text-amber-400 mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-7">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link href="/methodology" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-colors">
                Read our methodology <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900/60 border border-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:border-gray-700 transition-colors">
                Report a correction
              </Link>
            </div>
          </section>

          {/* Data Sources */}
          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Trusted data</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Our data sources</h2>
              <p className="text-sm text-gray-500 mt-2">Different source types are used according to the statistic being checked</p>
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

          {/* Editorial purpose */}
          <section>
            <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-8 sm:p-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Our editorial purpose</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Help readers explore the debate with context</h2>
              <div className="space-y-4 text-sm text-gray-400 leading-7">
                <p>Messi and Ronaldo have played in different teams, leagues, tactical systems, competitions, and stages of football history. Mesnaldo exists to make those careers easier to examine without pretending that every aspect of football can be reduced to one universal metric.</p>
                <p>Statistical pages focus on measurable information. Articles can add historical or analytical context, while the GOAT poll reflects visitor participation rather than an official Mesnaldo verdict. Readers can explore the evidence and form their own view.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-10 sm:p-14">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Explore the full comparison</h2>
              <p className="text-sm text-gray-400 mb-8">Explore the numbers, context, records, and achievements behind football&apos;s enduring Messi vs Ronaldo debate.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/goals" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                  Compare Goals <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/poll" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-colors">
                  Vote for GOAT
                </Link>
                <Link href="/methodology" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/60 border border-gray-800 text-gray-300 rounded-xl text-sm font-medium hover:border-gray-700 transition-colors">
                  Methodology
                </Link>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-center text-[11px] text-gray-600 max-w-xl mx-auto leading-relaxed">
            Mesnaldo is an independent platform. Not affiliated with any player, club, or governing body. 
            Statistics are compiled from publicly available football records and reference sources. Definitions and totals may differ between providers.
          </p>

        </div>
      </div>
    </Layout>
  )
}