// pages/faq.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { Rocket, BarChart3, Swords, Trophy, Monitor, Globe, ChevronDown, ThumbsUp, ThumbsDown, MessageCircle, Star, Target, Users } from "lucide-react"

const FAQS = [
  {
    category: "Getting Started",
    icon: Rocket,
    questions: [
      {
        q: "What is Mesnaldo and what makes it different from other football stats websites?",
        a: "Mesnaldo is the most comprehensive data-driven comparison platform for the Messi vs Ronaldo debate. Unlike other websites that give you a table of numbers and call it a day, we track every single goal, assist, trophy, record, and head-to-head encounter with interactive charts, detailed breakdowns, and historical context. You can explore goals by body part, assists by competition, compare specific seasons, and relive all 36 times they faced each other. Every statistic is verified against official sources before publication. If you spot an error, we fix it within 24 hours."
      },
      {
        q: "Is Mesnaldo free to use? Do I need to create an account?",
        a: "Completely free. No account required, no paywalls, no hidden fees. You can browse every page, explore every statistic, and vote in the GOAT poll without signing up for anything. We believe football statistics should be available to everyone."
      },
      {
        q: "How do I find what I'm looking for on this site?",
        a: "The navigation bar at the top covers every major section. Home gives you the complete overview with radar charts and recent matches. Goals breaks down every type of goal they've scored. Assists covers playmaking. Trophies compares silverware. Head to Head documents all 36 meetings. Career shows season-by-season timelines. Records lists over 258 verified achievements. Honours compares 100+ individual awards. And the Poll lets you cast your GOAT vote. Every page has filters — click around and explore."
      },
      {
        q: "How often is the data updated?",
        a: "Within hours of any match featuring Messi or Ronaldo. Our team monitors every game and updates the database as soon as the final whistle blows. Stat pages are rebuilt regularly to reflect the latest numbers."
      },
    ]
  },
  {
    category: "The Data & Accuracy",
    icon: BarChart3,
    questions: [
      {
        q: "Where does your data come from and how do I know it's accurate?",
        a: "We source from multiple verified channels: official league databases (La Liga, Premier League, Serie A, Ligue 1, MLS, Saudi Pro League), UEFA official records, FIFA tournament archives, and reputable statistics providers including Opta and IFFHS. Every match in our database includes date, competition, venue, opponent, goals, assists, minutes played, and result. Each data point is cross-referenced against at least one other source before being published."
      },
      {
        q: "How are goals categorized by body part?",
        a: "Every goal is classified by three attributes: body part (left foot, right foot, header, other), location (inside box, outside box), and situation (open play, penalty, free kick). These come from official match reports and verified video footage. So a left-footed volley from outside the box in open play gets all three tags. This lets us create breakdowns like 'Messi has scored 772 left-footed goals including 108 from outside the box.'"
      },
      {
        q: "What's the difference between career_stats and matches data?",
        a: "The career_stats table contains verified totals — total goals, games, penalties scored, and so on. The matches table has every individual match record. The career_stats totals are always the source of truth for overall numbers. We use the matches table for detailed breakdowns and filters."
      },
      {
        q: "How do you define club goals versus international goals?",
        a: "International goals are scored for the national team — Argentina for Messi, Portugal for Ronaldo. This includes World Cups, continental championships, qualifiers, Nations League, and friendlies. Club goals are everything else — Barcelona, Real Madrid, PSG, Juventus, Inter Miami, Al Nassr, and all other clubs. We calculate club goals as total goals minus international goals."
      },
    ]
  },
  {
    category: "Goals, Assists & Statistics",
    icon: Target,
    questions: [
      {
        q: "Who has scored more career goals — Messi or Ronaldo?",
        a: "Cristiano Ronaldo leads with 976 career goals compared to Lionel Messi's 919. Ronaldo has played more matches (1,330 vs 1,162), which partly explains the gap. Messi has a slightly better goals-per-game ratio (0.79 vs 0.73) and significantly more assists (418 vs 261). When you combine goals and assists, the gap narrows considerably."
      },
      {
        q: "How many goals has Messi scored in his career?",
        a: "Lionel Messi has scored 919 career goals for club and country as of 2026. This includes 794 club goals and 125 international goals for Argentina. He averages 0.79 goals per game and scores every 104 minutes."
      },
      {
        q: "How many goals has Ronaldo scored in his career?",
        a: "Cristiano Ronaldo has scored 976 career goals, the most in football history. He has 830 club goals and 146 international goals for Portugal. He averages 0.73 goals per game and scores every 111 minutes."
      },
      {
        q: "Who has more assists?",
        a: "Messi has significantly more assists — 418 compared to Ronaldo's 261. This reflects Messi's more creative playing style. He averages 0.36 assists per game compared to Ronaldo's 0.20. In the Champions League, the numbers are much closer: Messi 40 assists, Ronaldo 41."
      },
      {
        q: "Who has more hat-tricks?",
        a: "Ronaldo has 66 career hat-tricks compared to Messi's 61. In terms of frequency, Messi scores a hat-trick every 19.1 games, Ronaldo every 20.2 games. In the Champions League, both have 8 hat-tricks each."
      },
    ]
  },
  {
    category: "Trophies & Awards",
    icon: Trophy,
    questions: [
      {
        q: "Who has won more trophies overall?",
        a: "Lionel Messi leads with 48 career trophies compared to Cristiano Ronaldo's 37. Messi's collection includes 13 league titles, 4 Champions League titles, the World Cup, 2 Copa América titles, and an Olympic gold medal. Ronaldo has 8 league titles across four countries, 5 Champions League titles, and the European Championship with Portugal."
      },
      {
        q: "Who has more Champions League titles?",
        a: "Cristiano Ronaldo has 5 Champions League titles (1 with Manchester United, 4 with Real Madrid) compared to Messi's 4 (all with Barcelona). Ronaldo also holds the record for most Champions League goals (140) and has been top scorer 7 times."
      },
      {
        q: "How many Ballon d'Or awards has Messi won?",
        a: "Lionel Messi has won a record 8 Ballon d'Or awards (2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023). He also holds records for most consecutive wins (4) and most top-3 finishes (14 times)."
      },
      {
        q: "How many Ballon d'Or awards has Ronaldo won?",
        a: "Cristiano Ronaldo has won 5 Ballon d'Or awards (2008, 2013, 2014, 2016, 2017). He holds the record for most nominations (18 times) and has finished in the top 3 twelve times."
      },
      {
        q: "Who has more individual awards?",
        a: "Messi leads in total individual honours. Visit our Honours page for a complete comparison of 100+ individual awards including Ballon d'Or, FIFA Best, Golden Shoe, Pichichi, Champions League top scorer, and more."
      },
    ]
  },
  {
    category: "Head to Head & The Rivalry",
    icon: Swords,
    questions: [
      {
        q: "How many times have Messi and Ronaldo played against each other?",
        a: "They have faced each other 36 times across all competitions. The record stands at Messi 16 wins, Ronaldo 11 wins, and 9 draws. Matches span La Liga, Champions League, Copa del Rey, Supercopa de España, and international friendlies."
      },
      {
        q: "Who has scored more goals in head-to-head matches?",
        a: "The goal tally in their 36 meetings is remarkably close. For the exact numbers, visit our Head to Head page where every match is documented with goals, assists, scores, venues, and competition context."
      },
      {
        q: "What was their first match against each other?",
        a: "Their first competitive meeting was the 2007-08 Champions League semi-final between Manchester United (Ronaldo) and Barcelona (Messi). Their most recent was a 2023 friendly between PSG (Messi) and an All-Star team including Ronaldo."
      },
      {
        q: "Which competition has hosted the most Messi vs Ronaldo matches?",
        a: "La Liga leads with 18 encounters during the El Clásico era (2009-2018). The Champions League hosted 6 meetings, Copa del Rey 5, Supercopa de España 5, and international friendlies account for the rest."
      },
      {
        q: "Did they ever play on the same team?",
        a: "Never at club level. They spent their entire careers on opposite sides, which is precisely what made their rivalry so compelling. The closest was friendly charity matches and FIFA FIFPro World XI selections."
      },
    ]
  },
  {
    category: "The GOAT Debate",
    icon: Star,
    questions: [
      {
        q: "Who is actually the better player — Messi or Ronaldo?",
        a: "This is the question that has divided football fans for over 15 years, and the honest answer depends on what you value most. Messi supporters point to his superior playmaking, better goals-per-game ratio, World Cup victory, and more Ballon d'Or awards. Ronaldo supporters highlight his higher total goal count, Champions League dominance, success across four different leagues, and unmatched international scoring record. Both players have achieved things that may never be replicated. Our website exists to give you all the data so you can make your own informed decision."
      },
      {
        q: "Who is better at international level?",
        a: "Both have exceptional international records. Messi has won the World Cup, 2 Copa América titles, a Finalissima, and an Olympic gold medal. He has 125 goals in 207 games. Ronaldo has won the European Championship and the Nations League, and is the all-time leading international goalscorer with 146 goals in 233 games. Messi has more international trophies and individual tournament awards; Ronaldo has more goals."
      },
      {
        q: "Who has performed better in big matches?",
        a: "Ronaldo is widely regarded as the more decisive big-game player, particularly in the Champions League knockout stages where he has scored 67 goals compared to Messi's 49. Messi, however, has scored in two Champions League finals and delivered in multiple World Cup knockout matches including two goals in the 2022 final. Both have proven themselves on the biggest stages repeatedly."
      },
      {
        q: "Who has more world records?",
        a: "Both hold numerous Guinness World Records. Messi holds records for most Ballon d'Or awards (8), most goals in a calendar year (91), and most goals for a single club. Ronaldo holds records for most international goals (146), most Champions League goals (140), and most goals in top-level football. Visit our Records page for the full list of 258+ verified records."
      },
    ]
  },
  {
    category: "Using Mesnaldo",
    icon: Monitor,
    questions: [
      {
        q: "How does the GOAT Poll work?",
        a: "Cast one vote for who you believe is the GOAT. Your vote is saved in your browser's local storage, limiting you to one vote per device. Results show live counts and percentages. A 'Reset my vote' option is available if you change your mind."
      },
      {
        q: "Can I compare specific seasons or filter by competition?",
        a: "Yes. Most stat pages have filters. On Goals, you can filter by competition type. On Career, you can view season-by-season breakdowns. The Head to Head page lets you filter by competition. Player profile pages have search and filter for match histories."
      },
      {
        q: "Does the site work on mobile?",
        a: "Yes, fully responsive. Every page, chart, and table is optimized for phones, tablets, and desktops."
      },
      {
        q: "How can I report an error?",
        a: "Visit our Contact page. We take accuracy seriously and typically respond to corrections within 24-48 hours. Many of our best improvements have come from user feedback."
      },
    ]
  },
  {
    category: "About The Platform",
    icon: Globe,
    questions: [
      {
        q: "Who built Mesnaldo?",
        a: "Mesnaldo was built by a dedicated team of football data analysts, software developers, and researchers committed to creating the most accurate and comprehensive Messi vs Ronaldo comparison platform available. Our data is verified against multiple official sources, and we update within hours of every match."
      },
      {
        q: "How long will this website be maintained?",
        a: "We track every remaining match of both players' careers. Even after they retire, Mesnaldo will remain as a historical archive — a permanent record of football's greatest rivalry."
      },
      {
        q: "How can I support Mesnaldo?",
        a: "Use the site, share it with fellow fans, link to our stats in discussions, and follow us on Instagram and Facebook. If you're interested in contributing, reach out through our Contact page."
      },
    ]
  },
]

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>("Getting Started")
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const toggleQuestion = (question: string) => {
    const newSet = new Set(openQuestions)
    if (newSet.has(question)) {
      newSet.delete(question)
    } else {
      newSet.add(question)
    }
    setOpenQuestions(newSet)
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.flatMap(category => 
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a.replace(/<[^>]*>/g, '')
        }
      }))
    )
  }

  return (
    <Layout 
      title="Messi vs Ronaldo FAQ: Who is Better? Stats, Records & GOAT Debate" 
      description="Who is better Messi or Ronaldo? How many goals does Ronaldo have? Who has more trophies? Get answers to the most asked questions about football's greatest rivalry."
    >
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="bg-black min-h-screen">
        
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Help Center</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                Frequently Asked <span className="text-amber-400">Questions</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about the Messi vs Ronaldo debate, our data, and how to use Mesnaldo.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">

          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {FAQS.map(cat => {
              const CatIcon = cat.icon
              return (
                <button key={cat.category} onClick={() => setOpenCategory(cat.category)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs rounded-full transition-all font-medium ${
                    openCategory === cat.category 
                      ? "bg-white text-black shadow-lg" 
                      : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-700"
                  }`}>
                  <CatIcon className="w-4 h-4" />
                  {cat.category}
                </button>
              )
            })}
          </div>

          <div className="space-y-3">
            {FAQS.map((category, catIndex) => (
              <motion.div key={category.category} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.05 }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden">
                
                <button onClick={() => toggleCategory(category.category)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-3">
                    {(() => { const CatIcon = category.icon; return <CatIcon className="w-5 h-5 text-amber-400" /> })()}
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white">{category.category}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">{category.questions.length} questions</p>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: openCategory === category.category ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                {openCategory === category.category && (
                  <div className="border-t border-gray-700/50">
                    {category.questions.map((item, i) => (
                      <div key={i} className="border-b border-gray-700/30 last:border-0">
                        <button onClick={() => toggleQuestion(item.q)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-800/20 transition-colors group">
                          <span className={`text-sm pr-4 transition-colors ${openQuestions.has(item.q) ? "text-amber-400 font-medium" : "text-gray-300 group-hover:text-white"}`}>
                            {item.q}
                          </span>
                          <motion.span animate={{ rotate: openQuestions.has(item.q) ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gray-500 flex-shrink-0">
                            <ChevronDown className="w-3 h-3" />
                          </motion.span>
                        </button>
                        
                        {openQuestions.has(item.q) && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }}
                            className="px-4 sm:px-5 pb-5">
                            <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                            <div className="mt-3 pt-3 border-t border-gray-800/50">
                              <p className="text-[10px] text-gray-600 flex items-center">
                                Was this helpful? 
                                <button className="ml-2 text-gray-500 hover:text-emerald-400 transition-colors flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Yes</button>
                                <button className="ml-2 text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"><ThumbsDown className="w-3 h-3" /> No</button>
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center py-12 mt-8 border-t border-gray-800">
            <MessageCircle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll respond within 24-48 hours.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/contact" className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                Contact Us
              </Link>
              <Link href="/about" className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                About Mesnaldo
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}