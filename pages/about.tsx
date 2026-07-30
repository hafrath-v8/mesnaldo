// pages/about.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { BarChart3, Goal, Crosshair, Trophy, Award, ClipboardList, Swords, Globe, TrendingUp, Vote, Smartphone, Star, DollarSign, Tv, Library, FileText } from "lucide-react"

const STATS = [
  { icon: BarChart3, value: "2,492+", label: "Matches Tracked" },
  { icon: Goal, value: "1,895", label: "Combined Goals" },
  { icon: Crosshair, value: "677", label: "Combined Assists" },
  { icon: Trophy, value: "85", label: "Combined Trophies" },
  { icon: Award, value: "13", label: "Ballon d'Or Awards" },
  { icon: ClipboardList, value: "258+", label: "World Records" },
  { icon: Swords, value: "36", label: "Head to Head Matches" },
  { icon: Globe, value: "200+", label: "Countries Reached" },
]

const FEATURES = [
  {
    icon: BarChart3,
    title: "Comprehensive Statistics",
    description: "Dive deep into every aspect of their careers. We track goals by body part, assists by competition, hat-tricks, free kicks, penalties, headers, and much more. Our database covers over 2,490 individual matches with detailed performance metrics."
  },
  {
    icon: Swords,
    title: "Head to Head Analysis",
    description: "Relive every single encounter between the two legends. All 36 matches are documented with full details — scores, goalscorers, assists, venues, and competition context. See who dominated El Clásico, who shined in Champions League finals, and who won the international battles."
  },
  {
    icon: Trophy,
    title: "Trophy Cabinet Comparison",
    description: "From league titles to World Cups, Ballon d'Or awards to Golden Shoes — compare their silverware side by side. Understand the context behind every trophy and what it means in the broader GOAT debate."
  },
  {
    icon: TrendingUp,
    title: "Interactive Visualizations",
    description: "Numbers tell a story, and our charts bring that story to life. Explore radar charts comparing their skills, bar graphs showing goal distributions, pie charts breaking down team contributions, and timeline views tracing their entire careers."
  },
  {
    icon: Vote,
    title: "Community Poll",
    description: "Cast your vote in the ultimate GOAT poll. See how the world votes and join thousands of football fans in the greatest debate in sports. Every vote counts, and the results might surprise you."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Built for every device. Whether you're on your phone during a match, on a tablet at a café, or on a desktop deep-diving into stats — Mesnaldo looks and works beautifully everywhere."
  },
]

const MISSION = [
  {
    title: "Our Story",
    content: "Mesnaldo was born from a simple question that has divided football fans for over a decade: who is truly the greatest of all time? What started as a personal project to settle debates among friends has grown into the most comprehensive Messi vs Ronaldo comparison platform on the internet. We're football fans first, data nerds second, and we believe that the beautiful game deserves beautiful statistics."
  },
  {
    title: "Our Mission",
    content: "We exist to provide the most accurate, comprehensive, and accessible comparison between Lionel Messi and Cristiano Ronaldo. In an era of hot takes and biased opinions, we let the data do the talking. Every stat on Mesnaldo is verified, every record is cross-referenced, and every comparison is designed to give you the full picture — not just cherry-picked numbers that support one side of the argument."
  },
  {
    title: "Why 'Mesnaldo'?",
    content: "The name is a simple portmanteau of Messi and Ronaldo — the two names that have defined football for a generation. It's short, memorable, and instantly tells you what this website is about. Just like the rivalry itself, the name represents the beautiful tension between two legends who pushed each other to unprecedented heights."
  },
  {
    title: "Our Promise",
    content: "We promise to remain impartial. We don't favor one player over the other. Our goal is to present the facts, provide context, and let you — the football fan — make up your own mind. We'll continue updating this website as long as both legends continue playing, and we'll preserve it as a historical archive long after they retire. This is football history, and we're honored to document it."
  },
]

export default function About() {
  return (
    <Layout title="About Mesnaldo - The Ultimate Messi vs Ronaldo Comparison"
      description="Learn about Mesnaldo — the most comprehensive Lionel Messi vs Cristiano Ronaldo comparison platform. Our mission, story, and why we built the ultimate football statistics website.">
      
      <Head>
        <meta name="keywords" content="Mesnaldo, Messi vs Ronaldo website, football comparison platform, about Mesnaldo, football statistics website, GOAT debate platform" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Mesnaldo",
          "description": "Mesnaldo is the most comprehensive Messi vs Ronaldo comparison platform on the internet. We track every goal, assist, trophy, and record.",
          "url": "https://messivsronaldo.app/about"
        }) }} />
      </Head>

      <div className="bg-black min-h-screen">
        
        {/* ─── HERO ─── */}
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.05),transparent_50%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Our Story</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                About <span className="text-amber-400">Mesnaldo</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                The world&apos;s most comprehensive Messi vs Ronaldo comparison platform. Built by football fans, for football fans.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── NAME EXPLANATION ─── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1">
          <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Mess<span className="text-blue-400">i</span> + Ro<span className="text-red-400">naldo</span>
            </p>
            <p className="text-gray-500 text-sm">= <span className="text-amber-400 font-bold text-lg">Mesnaldo</span></p>
            <p className="text-gray-400 text-xs mt-3 max-w-md mx-auto">
              A simple portmanteau that captures the essence of football&apos;s greatest rivalry. Two names, one legacy, forever linked in history.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

          {/* ─── MISSION ─── */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MISSION.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-6 sm:p-7">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── STATS ─── */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Mesnaldo by the Numbers</h2>
              <p className="text-sm text-gray-500 mt-2">The scale of what we&apos;ve built</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((stat, i) => {
                const StatIcon = stat.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 text-center hover:border-gray-600/70 transition-colors">
                    <StatIcon className="w-7 h-7 text-amber-400 mx-auto mb-2" />
                    <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* ─── FEATURES ─── */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white">What Makes Mesnaldo Special</h2>
              <p className="text-sm text-gray-500 mt-2">More than just numbers — a complete experience</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feature, i) => {
                const FeatureIcon = feature.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6 hover:border-gray-600/70 transition-colors">
                    <FeatureIcon className="w-7 h-7 text-amber-400 mb-3" />
                    <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* ─── DATA SOURCES ─── */}
          <section>
            <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 text-center">Our Data Sources</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                We take data accuracy seriously. Every statistic on Mesnaldo is sourced from verified, reputable databases and cross-referenced before publication.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {[
                  { name: "Official League Records", icon: FileText },
                  { name: "UEFA Official Data", icon: Star },
                  { name: "FIFA Archives", icon: Globe },
                  { name: "Opta Sports", icon: BarChart3 },
                  { name: "IFFHS Statistics", icon: Award },
                  { name: "Transfermarkt", icon: DollarSign },
                  { name: "ESPN Stats", icon: Tv },
                  { name: "RSSSF Archive", icon: Library },
                ].map((source, i) => {
                  const SourceIcon = source.icon
                  return (
                    <div key={i} className="bg-gray-800/30 rounded-xl p-3">
                      <SourceIcon className="w-5 h-5 text-amber-400 mx-auto" />
                      <p className="text-[11px] text-gray-400 mt-1">{source.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ─── DISCLAIMER ─── */}
          <section>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
                <span className="text-white font-bold">Disclaimer:</span> Mesnaldo is an independent, fan-made project. We are not affiliated with, endorsed by, or connected to Lionel Messi, Cristiano Ronaldo, their respective clubs, FIFA, UEFA, or any football governing body. All player images and names are used for identification purposes only. Statistics are compiled from publicly available data sources and are believed to be accurate but may contain unintentional errors. This website is for informational and entertainment purposes only.
              </p>
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section className="text-center py-8 border-t border-gray-800">
            <h2 className="text-2xl font-black text-white mb-3">Ready to Explore?</h2>
            <p className="text-sm text-gray-400 mb-6">Dive into the most comprehensive football comparison ever created.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/goals" className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                Explore Goals
              </Link>
              <Link href="/head-to-head" className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                Head to Head
              </Link>
              <Link href="/poll" className="px-6 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-colors">
                Cast Your Vote
              </Link>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  )
}