// pages/methodology.tsx
import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, AlertTriangle, ArrowRight, Award, BarChart3, BookOpen, CalendarDays, CheckCircle2, Clock3, Crosshair, Database, FileCheck2, FileText, Flag, Goal, Globe, HelpCircle, Info, RefreshCw, Scale, ShieldCheck, Swords, Trophy } from "lucide-react"
import Layout from "../components/layout/Layout"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"

const SITE_URL = "https://mesnaldo.com"
const PAGE_URL = `${SITE_URL}/methodology`

const STAT_METHODS = [
  { icon: Goal, title: "Goals", text: "Goal totals are intended to represent senior first-team goals in the competitions and match categories covered by Mesnaldo. When a total is shown for a specific competition, club, season, or national team, only matches belonging to that scope are counted." },
  { icon: Crosshair, title: "Assists", text: "Assist totals require extra care because providers can use different definitions. Mesnaldo does not assume that every source will produce the same assist total. Where definitions or historical records differ, the figure should be interpreted according to the source and scope used for that comparison." },
  { icon: Activity, title: "Appearances", text: "Appearances are counted according to the scope displayed on the relevant page. Starts and substitute appearances may be presented separately where the underlying data supports that distinction." },
  { icon: Trophy, title: "Team Trophies", text: "Trophy comparisons are intended to count recognized senior team competitions within the stated scope. Team honours are kept separate from individual awards so that two different types of achievement are not presented as the same statistic." },
  { icon: Award, title: "Individual Awards", text: "Individual honours are categorized separately from team trophies. Where an award has rankings, nominations, or other placements, Mesnaldo aims to distinguish those from an outright win rather than treating every placement as the same achievement." },
  { icon: Flag, title: "International Statistics", text: "International statistics are separated from club statistics where appropriate. Competition filters and labels are used to make the scope clear, including whether a figure relates to a tournament, qualification campaign, or broader senior international record." },
  { icon: Swords, title: "Head-to-Head", text: "Head-to-head comparisons cover matches in which Messi and Ronaldo faced each other within the dataset used by Mesnaldo. Match results, goals and other displayed metrics are calculated from those qualifying meetings rather than from their overall careers." },
  { icon: BarChart3, title: "Derived Statistics", text: "Percentages, per-match rates, averages and other derived values are calculated from the underlying totals shown or stored for the relevant scope. Rounding can cause a displayed value to differ slightly from a calculation made with already-rounded numbers." },
]

const SOURCE_GROUPS = [
  { icon: Globe, title: "Competition & governing-body records", examples: "FIFA, UEFA and official competition or league records", text: "These are useful for competition results, official match records, tournament information, honours and other governing-body data." },
  { icon: Database, title: "Statistical databases", examples: "Established football statistics providers and historical databases", text: "These can provide detailed career, match and historical data that may not be presented in one place by a governing body." },
  { icon: FileText, title: "Club, league & match records", examples: "Official club, league and competition publications", text: "These are used when a statistic is best verified at the competition, club, season or individual-match level." },
  { icon: BookOpen, title: "Secondary references", examples: "Reputable sports publications and reference sources", text: "Secondary sources may be used for context or cross-checking, particularly when historical definitions or records require additional explanation." },
]

const PROCESS = [
  { number: "01", title: "Define the scope", text: "Before comparing a number, we identify what it represents: player, competition, season, club or international football, and the relevant statistical category." },
  { number: "02", title: "Check the underlying record", text: "The figure is checked against an appropriate source for that category. Important or disputed figures should be cross-checked where practical." },
  { number: "03", title: "Resolve definition differences", text: "If sources disagree, we examine whether the difference comes from scope, match classification, assist definitions, historical data, or another methodological choice." },
  { number: "04", title: "Publish with context", text: "Statistics are presented with labels, tables, filters or explanatory text so readers can understand what is being compared instead of seeing an isolated number." },
  { number: "05", title: "Review and correct", text: "Football data changes as matches are played and historical records can be corrected. Mesnaldo can update figures when newer or better-supported information becomes available." },
]

export default function Methodology() {
  const schema = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${PAGE_URL}#webpage`, url: PAGE_URL,
    name: "Mesnaldo Methodology | How Messi vs Ronaldo Statistics Are Calculated",
    description: "Learn how Mesnaldo defines, compares, verifies and updates Messi vs Ronaldo goals, assists, appearances, trophies, awards, records and head-to-head statistics.",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Mesnaldo" },
    about: [{ "@type": "Thing", name: "Football statistics" }, { "@type": "Person", name: "Lionel Messi" }, { "@type": "Person", name: "Cristiano Ronaldo" }],
    inLanguage: "en", dateModified: "2026-09-16",
  }

  return (
    <Layout title="Mesnaldo Methodology | How Messi vs Ronaldo Stats Are Calculated" description="Learn how Mesnaldo defines, compares, verifies and updates Messi vs Ronaldo goals, assists, appearances, trophies, awards, records and head-to-head statistics.">
      <Head><script key="methodology-webpage-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></Head>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Methodology", url: "/methodology" }]} />

      <div className="bg-black min-h-screen">
        <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 font-medium mb-6"><ShieldCheck className="w-3.5 h-3.5" />Data methodology</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">How Mesnaldo handles <span className="text-amber-400">football statistics</span></h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">A transparent guide to how we define, compare, calculate and review the statistics used across our Messi vs Ronaldo comparisons.</p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 space-y-24">
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Why this page exists</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">The same statistic can have <span className="text-amber-400">different definitions</span></h2>
                <div className="space-y-4 text-sm text-gray-400 leading-7">
                  <p>Football statistics are not always as simple as one number. Different databases can classify matches differently, use different assist definitions, update historical records at different times, or apply different rules to individual awards and competitions.</p>
                  <p>Mesnaldo therefore aims to make the scope of a comparison clear. A career total should not be silently compared with a competition-only total, and an assist figure from one definition should not automatically be treated as identical to a figure produced under another definition.</p>
                  <p>This methodology explains the general rules behind the statistics displayed on Mesnaldo. Where a particular page uses a more specific scope or definition, the information on that page should take precedence.</p>
                </div>
              </div>
              <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-8">
                <Info className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">A comparison is only useful when its scope is clear</h3>
                <p className="text-sm text-gray-400 leading-7">When reading a Mesnaldo statistic, check the category, competition, season and labels around it. These details define what the number represents and help prevent unlike statistics from being compared as though they were identical.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-10">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Statistical definitions</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white">What our main statistics mean</h2>
              <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto leading-6">These principles provide a consistent starting point across Mesnaldo while allowing individual pages to explain special cases when necessary.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STAT_METHODS.map((item, i) => {
                const Icon = item.icon
                return <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <Icon className="w-7 h-7 text-amber-400 mb-4" /><h3 className="text-base font-bold text-white mb-2">{item.title}</h3><p className="text-xs sm:text-sm text-gray-400 leading-6">{item.text}</p>
                </motion.div>
              })}
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-amber-400" /></div>
                <div><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Important example</p><h2 className="text-xl sm:text-2xl font-black text-white mb-3">Why assist totals may differ</h2>
                  <div className="space-y-3 text-sm text-gray-400 leading-7"><p>Assists are one of the clearest examples of a statistic that can vary between providers. A provider may use its own rules for rebounds, deflections, penalties won, own-goal situations or other actions leading to a goal.</p><p>For that reason, Mesnaldo should not combine assist figures from incompatible definitions without context. If two reputable sources disagree, the difference does not automatically mean that one database is wrong; the underlying definition and match coverage must first be checked.</p></div>
                  <Link href="/assists" className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors">Explore the assists comparison<ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-10"><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Source approach</p><h2 className="text-2xl sm:text-3xl font-black text-white">How sources are selected</h2><p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto leading-6">No single source is automatically the best source for every football statistic. The appropriate source depends on what is being verified.</p></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOURCE_GROUPS.map((source, i) => {
                const Icon = source.icon
                return <motion.div key={source.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6"><Icon className="w-7 h-7 text-amber-400 mb-4" /><h3 className="text-base font-bold text-white mb-1">{source.title}</h3><p className="text-[11px] text-amber-400/80 mb-3">{source.examples}</p><p className="text-xs sm:text-sm text-gray-400 leading-6">{source.text}</p></motion.div>
              })}
            </div>
            <div className="mt-5 bg-gray-900/40 border border-gray-800 rounded-2xl p-5 sm:p-6"><p className="text-sm text-gray-400 leading-7"><strong className="text-white">Source priority:</strong> Mesnaldo aims to prefer records that are closest to the competition or statistic being verified. Established statistical databases can then be used for detailed or historical data, while reputable secondary references can add context and help identify disagreements that need further checking.</p></div>
          </section>

          <section>
            <div className="text-center mb-10"><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Verification workflow</p><h2 className="text-2xl sm:text-3xl font-black text-white">From a raw number to a published comparison</h2></div>
            <div className="space-y-3">
              {PROCESS.map((step, i) => <motion.div key={step.number} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-4 sm:gap-6 bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6"><div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-black text-amber-400">{step.number}</div><div><h3 className="text-sm sm:text-base font-bold text-white mb-1.5">{step.title}</h3><p className="text-xs sm:text-sm text-gray-400 leading-6">{step.text}</p></div></motion.div>)}
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-7"><Scale className="w-8 h-8 text-amber-400 mb-4" /><h2 className="text-xl font-black text-white mb-3">When sources disagree</h2><div className="space-y-3 text-sm text-gray-400 leading-7"><p>A disagreement is investigated before assuming that one total is incorrect. Common causes include different competition scopes, match classifications, statistical definitions, historical corrections and update timing.</p><p>When a difference cannot be cleanly reconciled, the better approach is to identify the relevant definition or limitation rather than present uncertain data as an undisputed fact.</p></div></div>
              <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-7"><RefreshCw className="w-8 h-8 text-amber-400 mb-4" /><h2 className="text-xl font-black text-white mb-3">Updates and historical corrections</h2><div className="space-y-3 text-sm text-gray-400 leading-7"><p>Career statistics are not static while a player remains active. Pages can be updated after new matches, awards or official record changes are incorporated into the underlying data.</p><p>Historical figures can also change when an authoritative record is corrected. Where appropriate, Mesnaldo may revise an older figure rather than preserve information that is no longer supported.</p></div></div>
            </div>
          </section>

          <section>
            <div className="text-center mb-10"><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Reading the data</p><h2 className="text-2xl sm:text-3xl font-black text-white">Context matters as much as the total</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: CalendarDays, title: "Time period", text: "Check whether a figure is career-wide, seasonal, annual or limited to a particular competition period." },
                { icon: Flag, title: "Competition scope", text: "Club, international, league, continental and tournament statistics should be compared within the scope stated on the page." },
                { icon: HelpCircle, title: "Definition", text: "For categories such as assists, records and awards, the definition used can materially affect the final total." },
              ].map((item, i) => {
                const Icon = item.icon
                return <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center"><Icon className="w-8 h-8 text-amber-400 mx-auto mb-4" /><h3 className="text-base font-bold text-white mb-2">{item.title}</h3><p className="text-xs text-gray-400 leading-relaxed">{item.text}</p></motion.div>
              })}
            </div>
          </section>

          <section>
            <div className="text-center mb-10"><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Editorial principles</p><h2 className="text-2xl sm:text-3xl font-black text-white">Comparison without changing the numbers to fit a conclusion</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, title: "Same standard", text: "The same statistical definition and scope should be applied to both players within a direct comparison." },
                { icon: FileCheck2, title: "Separate fact & interpretation", text: "Statistical totals should be distinguishable from editorial explanation, interpretation and fan opinion." },
                { icon: CheckCircle2, title: "Correct when necessary", text: "A published figure can be corrected when stronger evidence shows that the previous value or classification was inaccurate." },
              ].map((item, i) => {
                const Icon = item.icon
                return <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center"><Icon className="w-8 h-8 text-amber-400 mx-auto mb-4" /><h3 className="text-base font-bold text-white mb-2">{item.title}</h3><p className="text-xs text-gray-400 leading-relaxed">{item.text}</p></motion.div>
              })}
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-r from-blue-500/5 via-amber-500/10 to-red-500/5 border border-gray-800 rounded-3xl p-8 sm:p-10"><div className="max-w-3xl mx-auto text-center"><FileCheck2 className="w-9 h-9 text-amber-400 mx-auto mb-4" /><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Corrections policy</p><h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Found a statistic that needs checking?</h2><p className="text-sm text-gray-400 leading-7">Football databases can contain errors and different sources can disagree. If you believe a Mesnaldo statistic is inaccurate, send the page URL, the figure in question and, when possible, a reliable source supporting the correction. The information can then be reviewed against the scope and methodology used on that page.</p><Link href="/contact" className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">Report a data issue<ArrowRight className="w-4 h-4" /></Link></div></div>
          </section>

          <section>
            <div className="text-center mb-8"><p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Explore the data</p><h2 className="text-2xl sm:text-3xl font-black text-white">See the methodology in context</h2></div>
            <div className="flex flex-wrap justify-center gap-3">
              {[{ href: "/goals", label: "Goals" }, { href: "/assists", label: "Assists" }, { href: "/trophies", label: "Trophies" }, { href: "/records", label: "Records" }, { href: "/career", label: "Career" }, { href: "/head-to-head", label: "Head to Head" }, { href: "/detailed-stats", label: "Detailed Stats" }].map((item) => <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 bg-gray-900/60 border border-gray-800 rounded-full px-4 py-2 text-xs text-gray-400 hover:text-amber-400 hover:border-gray-700 transition-colors">{item.label}<ArrowRight className="w-3 h-3" /></Link>)}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center text-[11px] text-gray-600"><span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />Methodology last reviewed: September 16, 2026</span><span className="hidden sm:inline">•</span><span>Mesnaldo is an independent football comparison platform.</span></div>
          <p className="text-center text-[11px] text-gray-600 max-w-2xl mx-auto leading-relaxed">Mesnaldo is not affiliated with Lionel Messi, Cristiano Ronaldo, their clubs, leagues, FIFA, UEFA, or other governing bodies. Statistical providers and organizations may use definitions that differ from those used elsewhere. Source names mentioned on Mesnaldo identify reference sources and do not imply endorsement or affiliation.</p>
        </div>
      </div>
    </Layout>
  )
}
