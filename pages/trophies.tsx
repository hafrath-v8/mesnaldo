// pages/trophies.tsx
import Layout from "../components/layout/Layout"
import { supabase } from "../lib/supabase"
import { GetStaticProps } from "next"
import { motion } from "framer-motion"
import Image from "next/image"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
import { Trophy, Star, Globe, Award, Medal, Users, Crown } from "lucide-react"

interface TrophiesPageProps {
  messi: any
  ronaldo: any
}

const CARD_BASE = "bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl"

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  )
}

const TROPHY_DATA = [
  { icon: Trophy, label: "League Titles", messi: 13, ronaldo: 8 },
  { icon: Star, label: "Champions League", messi: 4, ronaldo: 5 },
  { icon: Award, label: "Domestic Cup", messi: 8, ronaldo: 6 },
  { icon: Medal, label: "Domestic Super Cup", messi: 9, ronaldo: 7 },
  { icon: Medal, label: "UEFA Super Cup", messi: 3, ronaldo: 3 },
  { icon: Globe, label: "Club World Cup", messi: 3, ronaldo: 4 },
  { icon: Trophy, label: "Other Club Titles", messi: 2, ronaldo: 1 },
  { icon: Globe, label: "International", messi: 4, ronaldo: 3 },
  { icon: Users, label: "Other International", messi: 2, ronaldo: 0 },
]

export default function Trophies({ messi, ronaldo }: TrophiesPageProps) {
  if (!messi || !ronaldo) {
    return (
      <Layout title="Trophies">
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500 border-r-red-500 animate-spin" />
        </div>
      </Layout>
    )
  }

  const messiTotal = TROPHY_DATA.reduce((s, t) => s + t.messi, 0)
  const ronaldoTotal = TROPHY_DATA.reduce((s, t) => s + t.ronaldo, 0)
  const messiWins = TROPHY_DATA.filter(t => t.messi > t.ronaldo).length
  const ronaldoWins = TROPHY_DATA.filter(t => t.ronaldo > t.messi).length

  return (
<Layout 
title="Messi vs Ronaldo Trophies Comparison | Who Has More Trophies?"
  description="Messi vs Ronaldo trophy comparison: 48 vs 37 trophies. Compare La Liga, Champions League, World Cup, and every title won."> 
  <BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "Trophies", url: "/trophies" },
  ]}
/>     
  <div className="bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-16 sm:space-y-20">

          {/* ─── HEADER ─── */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">Silverware</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Trophies & <span className="text-amber-400">Awards</span>
            </h1>
          </div>

          {/* ─── SCOREBOARD ─── */}
          <div className={`${CARD_BASE} p-6 sm:p-8 lg:p-10`}>
            <div className="grid grid-cols-3 items-center">
              {/* Messi */}
              <div className="text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500/30 mx-auto mb-3">
                  <Image src="/images/messi.webp" alt="Messi" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Lionel Messi</p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-400">{messiTotal}</p>
                <p className="text-[10px] text-gray-600 mt-1">trophies</p>
              </div>

              {/* VS */}
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-amber-400/80">VS</p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-xs text-blue-400 font-bold">{messiWins} won</span>
                  <span className="text-[10px] text-gray-700">•</span>
                  <span className="text-xs text-red-400 font-bold">{ronaldoWins} won</span>
                </div>
              </div>

              {/* Ronaldo */}
              <div className="text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto mb-3">
                  <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Cristiano Ronaldo</p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-400">{ronaldoTotal}</p>
                <p className="text-[10px] text-gray-600 mt-1">trophies</p>
              </div>
            </div>

            {/* Difference bar */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] text-gray-600 w-12 text-right">Messi</span>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(messiTotal / (messiTotal + ronaldoTotal)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500 rounded-full" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(ronaldoTotal / (messiTotal + ronaldoTotal)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-red-500 rounded-full" />
              </div>
              <span className="text-[10px] text-gray-600 w-12 text-left">Ronaldo</span>
            </div>
          </div>

          {/* ─── TROPHY LIST ─── */}
          <section>
            <SectionHeading title="Trophy Cabinet" subtitle="Head to head comparison" />
            <div className="space-y-2">
              {TROPHY_DATA.map((item, i) => {
                const total = item.messi + item.ronaldo
                const messiPct = (item.messi / (total || 1)) * 100
                const ronaldoPct = (item.ronaldo / (total || 1)) * 100
                const TrophyIcon = item.icon

                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-gray-800/20 transition-colors group">
                    
                    {/* Label */}
                    <div className="w-40 sm:w-48 flex items-center gap-2 flex-shrink-0">
                      <TrophyIcon className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </div>

                    {/* Bar */}
                    <div className="flex-1 flex items-center gap-2">
                      <span className={`text-xs font-bold w-8 text-right ${item.messi > item.ronaldo ? "text-blue-400" : "text-gray-500"}`}>{item.messi}</span>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden flex">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${messiPct}%` }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                          className="h-full bg-blue-500 rounded-full" />
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${ronaldoPct}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                          className="h-full bg-red-500 rounded-full" />
                      </div>
                      <span className={`text-xs font-bold w-8 ${item.ronaldo > item.messi ? "text-red-400" : "text-gray-500"}`}>{item.ronaldo}</span>
                    </div>

                    {/* Winner indicator */}
                    <div className="w-20 text-right flex-shrink-0">
                      {item.messi > item.ronaldo ? (
                        <span className="text-[10px] text-blue-400 font-medium">Messi +{item.messi - item.ronaldo}</span>
                      ) : item.ronaldo > item.messi ? (
                        <span className="text-[10px] text-red-400 font-medium">Ronaldo +{item.ronaldo - item.messi}</span>
                      ) : (
                        <span className="text-[10px] text-gray-600">Tied</span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* ─── BALLON D'OR ─── */}
          <section>
            <SectionHeading title="Ballon d'Or" subtitle="The ultimate individual prize" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <div className={`${CARD_BASE} p-6 text-center`}>
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(8)].map((_, i) => <Crown key={i} className="w-5 h-5 text-amber-400" />)}
                </div>
                <p className="text-4xl font-black text-blue-400">8</p>
                <p className="text-xs text-gray-500 mt-1">Lionel Messi</p>
                <p className="text-[10px] text-gray-600 mt-2">2009, 2010, 2011, 2012</p>
                <p className="text-[10px] text-gray-600">2015, 2019, 2021, 2023</p>
              </div>
              <div className={`${CARD_BASE} p-6 text-center`}>
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Crown key={i} className="w-5 h-5 text-amber-400" />)}
                </div>
                <p className="text-4xl font-black text-red-400">5</p>
                <p className="text-xs text-gray-500 mt-1">Cristiano Ronaldo</p>
                <p className="text-[10px] text-gray-600 mt-2">2008, 2013, 2014</p>
                <p className="text-[10px] text-gray-600">2016, 2017</p>
              </div>
            </div>
          </section>

          {/* ─── SUMMARY ROW ─── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { label: "Messi Total", value: messiTotal, color: "text-blue-400" },
              { label: "Ronaldo Total", value: ronaldoTotal, color: "text-red-400" },
              { label: "Messi Ballon d'Or", value: 8, color: "text-blue-400" },
              { label: "Ronaldo Ballon d'Or", value: 5, color: "text-red-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
{/* =========================================================
    SEO CONTENT SECTION - TROPHIES PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Trophies: Complete Career Honours Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      {/* INTRODUCTION */}

      <p>
        The <strong className="text-white">Messi vs Ronaldo trophies</strong>{" "}
        comparison is one of the most important parts of the wider debate
        between Lionel Messi and Cristiano Ronaldo. Individual statistics such
        as goals and assists show personal performance, while trophies show
        what each player achieved with his clubs and national team.
      </p>

      <p>
        Both players have won major honours across domestic football,
        continental competition and international football. Their trophy
        cabinets include league titles, Champions League trophies, domestic
        cups, super cups, Club World Cups and international honours.
      </p>

      <p>
        This page compares those achievements category by category rather than
        relying only on one total number. That makes it easier to understand
        where Messi and Ronaldo built their trophy records and which types of
        competitions contributed most to their overall success.
      </p>


      {/* TOTAL TROPHIES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Who Has More Trophies, Messi or Ronaldo?
      </h3>

      <p>
        According to the trophy categories currently included on this page,{" "}
        <strong className="text-blue-400">Lionel Messi</strong> has won{" "}
        <strong className="text-white">{messiTotal}</strong>{" "}
        trophies, while{" "}
        <strong className="text-red-400">Cristiano Ronaldo</strong> has won{" "}
        <strong className="text-white">{ronaldoTotal}</strong>.
      </p>

      {(() => {
        const difference = Math.abs(messiTotal - ronaldoTotal)

        if (messiTotal === ronaldoTotal) {
          return (
            <p>
              Messi and Ronaldo are currently level in the total trophy count
              used on this page.
            </p>
          )
        }

        const leader =
          messiTotal > ronaldoTotal ? "Lionel Messi" : "Cristiano Ronaldo"

        return (
          <p>
            Based on these totals,{" "}
            <strong className="text-white">{leader}</strong> currently leads
            the comparison by{" "}
            <strong className="text-white">{difference}</strong>{" "}
            trophies.
          </p>
        )
      })()}

      <p>
        Total trophies provide a simple overview, but they should not be the
        only way to compare two careers. Different competitions have different
        formats, levels of difficulty and numbers of available trophies, so
        examining each category separately gives better context.
      </p>


      {/* LEAGUE TITLES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo League Titles
      </h3>

      <p>
        Domestic league titles reward consistency across an entire season.
        In the trophy data used on this page, Messi has won{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "League Titles")?.messi ?? 0}
        </strong>{" "}
        league titles, while Ronaldo has won{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "League Titles")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        League trophies are especially valuable because they are usually won
        over a long campaign rather than a short knockout tournament.
        Success requires consistency over many matches against a full domestic
        field.
      </p>

      <p>
        Messi built much of his league success during his long spell in Spain
        and later added domestic honours elsewhere. Ronaldo won league titles
        across several major European leagues during different stages of his
        career.
      </p>


      {/* CHAMPIONS LEAGUE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Titles
      </h3>

      <p>
        The UEFA Champions League is one of the most prestigious trophies in
        club football and played a major role in both careers.
      </p>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Champions League")?.messi ?? 0}
        </strong>{" "}
        Champions League titles in the comparison, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Champions League")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        Champions League trophies carry particular significance because they
        require success against leading clubs from across Europe. Both Messi
        and Ronaldo also produced many of their most memorable individual
        performances in this competition.
      </p>


      {/* DOMESTIC CUP */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Domestic Cup Trophies
      </h3>

      <p>
        Domestic cup competitions add another dimension to a player&apos;s
        trophy record because they usually follow a knockout format.
        Messi currently has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Domestic Cup")?.messi ?? 0}
        </strong>{" "}
        domestic cup titles in this comparison, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Domestic Cup")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        Unlike league competitions, one poor result can end a domestic cup
        run. That makes knockout trophies a different test of consistency and
        high-pressure performance.
      </p>


      {/* DOMESTIC SUPER CUP */}

      <h3 className="text-xl font-bold text-white mt-10">
        Domestic Super Cup Titles
      </h3>

      <p>
        Messi has won{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Domestic Super Cup")?.messi ?? 0}
        </strong>{" "}
        domestic super cup titles in the data shown here, compared with{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Domestic Super Cup")?.ronaldo ?? 0}
        </strong>{" "}
        for Ronaldo.
      </p>

      <p>
        Super cups usually bring together winners of major domestic
        competitions and are often played over one or two matches. Although
        they are shorter competitions, they remain recognised team honours.
      </p>


      {/* UEFA SUPER CUP */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo UEFA Super Cup Titles
      </h3>

      <p>
        The UEFA Super Cup is played between winners of Europe&apos;s major
        continental club competitions. Messi currently has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "UEFA Super Cup")?.messi ?? 0}
        </strong>{" "}
        UEFA Super Cup titles, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "UEFA Super Cup")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        This category shows another area where both players were part of
        successful European club teams during their peak years.
      </p>


      {/* CLUB WORLD CUP */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Club World Cup Titles
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Club World Cup")?.messi ?? 0}
        </strong>{" "}
        Club World Cup titles in the current comparison, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Club World Cup")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        The Club World Cup brings together continental champions from
        different regions, allowing successful clubs to compete for a global
        title.
      </p>


      {/* OTHER CLUB TITLES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Other Club Trophies
      </h3>

      <p>
        The current dataset also includes additional club honours outside the
        main categories. Messi has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Other Club Titles")?.messi ?? 0}
        </strong>{" "}
        other club titles, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Other Club Titles")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        Keeping these honours in a separate category helps avoid mixing
        competitions with different structures while still including them in
        the overall trophy total used by the page.
      </p>


      {/* INTERNATIONAL */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo International Trophies
      </h3>

      <p>
        International trophies are a major part of the Messi vs Ronaldo
        comparison because national-team competitions provide a completely
        different environment from club football.
      </p>

      <p>
        In the international category shown on this page, Messi has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "International")?.messi ?? 0}
        </strong>{" "}
        trophies, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "International")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        International tournaments are played less frequently than club
        competitions, which makes opportunities to win major national-team
        trophies much more limited.
      </p>


      {/* OTHER INTERNATIONAL */}

      <h3 className="text-xl font-bold text-white mt-10">
        Other International Honours
      </h3>

      <p>
        The trophy table also contains a separate category for other
        international honours. Messi currently has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Other International")?.messi ?? 0}
        </strong>{" "}
        in this category, compared with Ronaldo&apos;s{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Other International")?.ronaldo ?? 0}
        </strong>.
      </p>

      <p>
        Separating these from the primary international category makes the
        breakdown easier to understand and allows visitors to see how the
        final totals are constructed.
      </p>


      {/* CATEGORY WINS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Who Leads More Trophy Categories?
      </h3>

      <p>
        Looking beyond total trophies, Messi currently leads{" "}
        <strong className="text-blue-400">{messiWins}</strong>{" "}
        trophy categories in the comparison, while Ronaldo leads{" "}
        <strong className="text-red-400">{ronaldoWins}</strong>.
      </p>

      <p>
        Some categories can also be tied. This category-by-category view is
        useful because it shows that a player&apos;s trophy advantage may be
        concentrated in certain competitions rather than being identical
        across every type of honour.
      </p>


      {/* BALLON D'OR */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Ballon d&apos;Or Awards
      </h3>

      <p>
        Team trophies measure collective success, while the Ballon d&apos;Or
        represents individual recognition. Lionel Messi has won{" "}
        <strong className="text-blue-400">8 Ballon d&apos;Or awards</strong>,
        while Cristiano Ronaldo has won{" "}
        <strong className="text-red-400">5</strong>.
      </p>

      <p>
        Messi&apos;s victories came in 2009, 2010, 2011, 2012, 2015, 2019,
        2021 and 2023. Ronaldo won the award in 2008, 2013, 2014, 2016 and
        2017.
      </p>

      <p>
        The Ballon d&apos;Or should not be added directly to the team-trophy
        count because it is an individual award rather than a competition
        trophy. It is more useful to display it separately, as this page does.
      </p>


      {/* TEAM VS INDIVIDUAL */}

      <h3 className="text-xl font-bold text-white mt-10">
        Team Trophies vs Individual Awards
      </h3>

      <p>
        Trophy comparisons can become misleading when team competitions and
        individual awards are mixed together. League titles, Champions League
        trophies and international tournaments are won by teams, while awards
        such as the Ballon d&apos;Or recognise individual performance.
      </p>

      <p>
        That is why Mesnaldo separates the overall trophy cabinet from the
        Ballon d&apos;Or section. Both are relevant to the Messi vs Ronaldo
        debate, but they answer different questions.
      </p>


      {/* WHAT TROPHIES TELL US */}

      <h3 className="text-xl font-bold text-white mt-10">
        What Do Trophy Totals Tell Us?
      </h3>

      <p>
        Trophy totals provide evidence of sustained success, but they should
        always be interpreted with context. Football is a team sport, so an
        individual player does not control every factor that determines
        whether a competition is won.
      </p>

      <p>
        Team quality, coaching, injuries, competition format and the strength
        of opponents all influence trophy outcomes. A player can perform at an
        exceptional level without winning every competition.
      </p>

      <p>
        For that reason, trophies are most useful when combined with
        individual statistics such as goals, assists, records and performance
        in important matches.
      </p>


      {/* DIFFERENT CAREER PATHS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Different Career Paths, Different Trophy Records
      </h3>

      <p>
        Messi and Ronaldo built their careers in different ways. Messi spent
        the majority of his prime years with one dominant club before later
        playing in other leagues, while Ronaldo experienced major trophy runs
        across several clubs and countries.
      </p>

      <p>
        Those different paths affect the types and number of competitions
        available to each player. Comparing trophy categories therefore gives
        more information than simply comparing the final total.
      </p>


      {/* WHY TROPHIES MATTER */}

      <h3 className="text-xl font-bold text-white mt-10">
        Why Trophies Matter in the Messi vs Ronaldo Debate
      </h3>

      <p>
        Trophies are important because the ultimate objective of competitive
        football is to win. Players are remembered not only for individual
        skill and statistics, but also for the teams and title-winning
        campaigns they helped shape.
      </p>

      <p>
        At the same time, using trophies alone to judge individual ability can
        oversimplify the debate. Football requires eleven players, and even
        the greatest individual performances depend partly on the quality of
        the team around them.
      </p>

      <p>
        A balanced comparison therefore considers both collective honours and
        individual production.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Trophies FAQ
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more trophies, Messi or Ronaldo?
      </h3>

      <p>
        Based on the trophy categories currently counted on this page, Messi
        has{" "}
        <strong className="text-blue-400">{messiTotal}</strong>{" "}
        trophies and Ronaldo has{" "}
        <strong className="text-red-400">{ronaldoTotal}</strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many trophies does Messi have?
      </h3>

      <p>
        The current Mesnaldo trophy breakdown gives Lionel Messi{" "}
        <strong className="text-blue-400">{messiTotal}</strong>{" "}
        trophies across the team-title categories included on this page.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many trophies does Ronaldo have?
      </h3>

      <p>
        Cristiano Ronaldo currently has{" "}
        <strong className="text-red-400">{ronaldoTotal}</strong>{" "}
        trophies according to the categories included in this comparison.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Champions League trophies?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "Champions League")?.messi ?? 0}
        </strong>{" "}
        Champions League titles, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "Champions League")?.ronaldo ?? 0}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more league titles?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {TROPHY_DATA.find(t => t.label === "League Titles")?.messi ?? 0}
        </strong>{" "}
        league titles in the current comparison, while Ronaldo has{" "}
        <strong className="text-red-400">
          {TROPHY_DATA.find(t => t.label === "League Titles")?.ronaldo ?? 0}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Ballon d&apos;Or awards?
      </h3>

      <p>
        Lionel Messi has won{" "}
        <strong className="text-blue-400">8 Ballon d&apos;Or awards</strong>,
        while Cristiano Ronaldo has won{" "}
        <strong className="text-red-400">5</strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Is the Ballon d&apos;Or counted as a trophy here?
      </h3>

      <p>
        No. The total trophy count on this page is calculated from the team
        trophy categories in the trophy table. Ballon d&apos;Or awards are
        displayed separately because they are individual honours.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Are all trophies equally important?
      </h3>

      <p>
        No. Different competitions have different formats, prestige and
        difficulty. A Champions League, domestic league or major international
        tournament cannot automatically be treated as identical to a super
        cup or shorter competition. The category breakdown therefore provides
        more context than the total alone.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Trophy Comparison
      </h2>

      <p>
        Lionel Messi and Cristiano Ronaldo have built two extraordinary trophy
        cabinets through years of success at club and international level.
        Their honours include domestic leagues, European competitions,
        domestic cups, super cups, global club competitions and
        international tournaments.
      </p>

      <p>
        The total trophy count gives a useful starting point, but the deeper
        comparison comes from examining each category separately. League
        titles show season-long consistency, Champions League trophies show
        continental success, domestic cups reflect knockout performance and
        international titles represent achievement with the national team.
      </p>

      <p>
        Mesnaldo&apos;s trophy comparison presents those categories side by
        side so visitors can understand how each player built his career
        honours rather than judging the debate from one number alone.
      </p>

    </div>
  </div>
</section>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: messi } = await supabase.from("career_stats").select("*").eq("player_id", 1).single()
    const { data: ronaldo } = await supabase.from("career_stats").select("*").eq("player_id", 2).single()
    return { props: { messi: messi || null, ronaldo: ronaldo || null }, revalidate: 3600 }
  } catch (e) {
    return { props: { messi: null, ronaldo: null }, revalidate: 60 }
  }
}