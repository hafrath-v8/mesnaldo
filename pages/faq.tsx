// pages/faq.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { Rocket, BarChart3, Swords, Trophy, Monitor, Globe, ChevronDown, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"

const FAQS = [
  {
    category: "Getting Started",
    icon: Rocket,
    questions: [
      {
        q: "What exactly is Messi vs Ronaldo and why should I care?",
        a: "Think of Messi vs Ronaldo as the ultimate football Bible for the greatest debate in sports history. We've built the most comprehensive, data-driven comparison platform that tracks every single goal, assist, trophy, record, and head-to-head encounter between Lionel Messi and Cristiano Ronaldo. Whether you're Team Messi, Team Ronaldo, or just a football fanatic who loves diving deep into stats, this is your home. We don't just show you numbers — we tell the story behind them with interactive charts, detailed breakdowns, and historical context that you won't find anywhere else."
      },
      {
        q: "Is this just another stats website? What makes it different?",
        a: "Absolutely not. While other websites might give you a table of numbers, we give you the full picture. Every statistic is interactive — you can click, filter, compare, and explore. Want to see Messi's goals by body part? Done. Curious how Ronaldo performs in knockout matches versus group stages? We've got it. Want to re-live every single El Clásico where both legends faced off? We have all 36 matches catalogued with minute-by-minute details. Plus, our data is verified against official sources and updated regularly. This isn't just a website — it's a living archive of football history."
      },
      {
        q: "How do I navigate this website to find what I'm looking for?",
        a: "We've designed the site to be intuitive. The navigation bar at the top gives you quick access to all major sections: Home (overview comparison), Goals (deep dive into scoring stats), Assists (playmaking breakdown), Trophies (silverware comparison), Head to Head (direct encounters), Career (season-by-season timeline), Records (world records and milestones), and Poll (cast your GOAT vote). Each page has filters and interactive elements. If you're ever lost, just hit the Home button — it gives you the complete overview at a glance."
      },
      {
        q: "Is this website free to use? Do I need to create an account?",
        a: "100% free. No account required. No paywalls. No hidden fees. We built this for the love of football and the community. You can browse every page, explore every stat, and even vote in our GOAT poll without signing up. We believe football statistics should be accessible to everyone, not locked behind subscription walls."
      },
    ]
  },
  {
    category: "The Data Behind the Scenes",
    icon: BarChart3,
    questions: [
      {
        q: "Where does all this data come from? How do I know it's accurate?",
        a: "Great question — accuracy is our obsession. Our data is sourced from multiple verified channels: official league databases (La Liga, Premier League, Serie A, Ligue 1, MLS, Saudi Pro League), UEFA official records, FIFA tournament archives, and reputable football statistics providers like Opta and IFFHS. Every match entry in our database includes the date, competition, venue, opponent, goals scored, assists, minutes played, and result. Our team cross-references data points across multiple sources before they're published. If you ever spot something that doesn't look right, we have a correction process — just reach out and we'll investigate within 24 hours."
      },
      {
        q: "How do you categorize goals? What counts as a 'left foot' goal versus a 'right foot' goal?",
        a: "Every goal in our database is classified by multiple attributes: body part (left foot, right foot, header, other), location (inside the box, outside the box), and situation (open play, penalty, free kick). These classifications come from official match reports, verified video footage, and statistical agencies. For example, a left-footed volley from outside the box during open play gets tagged with all three attributes. This granular approach lets us create detailed breakdowns like 'Messi has scored 772 left-footed goals, including 108 from outside the box and 72 from free kicks.' The level of detail is what makes our comparison truly comprehensive."
      },
      {
        q: "What's the difference between 'career_stats' and 'matches' data? Which one is more accurate?",
        a: "Think of it this way: the 'career_stats' table is like the official scoreboard — it contains the verified, authoritative totals for each player (total goals, total games, penalties scored, etc.). The 'matches' table is like the detailed play-by-play — it has every individual match record. Sometimes the matches table might not have 100% of historical data (especially for very old matches where detailed breakdowns weren't recorded), so the career_stats totals should always be considered the source of truth for overall numbers. We use the matches table for detailed breakdowns and filters, and career_stats for the big-picture totals."
      },
      {
        q: "How are 'International Goals' different from 'Club Goals'?",
        a: "This is one of our most common questions. International goals are scored when the player is representing their national team — Argentina for Messi, Portugal for Ronaldo. This includes FIFA World Cup matches, continental championships (Copa América, UEFA Euros), World Cup qualifiers, Nations League matches, and international friendlies. Club goals are everything else — goals scored for Barcelona, Real Madrid, PSG, Juventus, Inter Miami, Al Nassr, and all other club teams throughout their careers. We calculate club goals as: Total Goals minus International Goals = Club Goals. This gives you the most accurate split."
      },
      {
        q: "How often is the data refreshed? Can I see real-time updates?",
        a: "Our data is updated within hours of matches being played. When Messi scores for Inter Miami or Ronaldo finds the net for Al Nassr, our team updates the database promptly. The website fetches fresh data on every page load for key sections like the Poll, while detailed stat pages are rebuilt periodically for performance. We're exploring real-time updates for live match days — stay tuned!"
      },
    ]
  },
  {
    category: "The Rivalry Decoded",
    icon: Swords,
    questions: [
      {
        q: "How many times have Messi and Ronaldo actually played against each other? What's the head-to-head record?",
        a: "As of our latest data, Messi and Ronaldo have faced each other 36 times across all competitions. The head-to-head record stands at: Messi 16 wins, Ronaldo 11 wins, and 9 draws. These matches span multiple competitions — La Liga (when Messi was at Barcelona and Ronaldo at Real Madrid), the Champions League, Copa del Rey, Supercopa de España, and even international friendlies (Argentina vs Portugal). The most famous encounters are the El Clásico matches, but they've also met when Messi was at PSG and Ronaldo at Al Nassr. Every single one of these 36 matches is documented on our Head to Head page with full details — scores, goalscorers, assists, venues, and more."
      },
      {
        q: "Who has scored more goals in Messi vs Ronaldo matches?",
        a: "In their 36 direct encounters, the goal tally is incredibly close — as you'd expect from the two greatest players ever. For the exact numbers, we recommend visiting the Head to Head page where you can see a match-by-match breakdown with both players' goal and assist counts for every single game. It's fascinating to see how they performed against each other on the biggest stages."
      },
      {
        q: "What was their first match against each other? And their most recent?",
        a: "Their first competitive encounter was in the 2007-08 Champions League semi-final between Manchester United (Ronaldo) and Barcelona (Messi). Their most recent meeting was a friendly between Paris Saint-Germain (Messi) and an All-Star team including Ronaldo in 2023. The full timeline of all 36 matches is available on our Head to Head page, sorted chronologically so you can trace their rivalry from beginning to present day."
      },
      {
        q: "Which competition has hosted the most Messi vs Ronaldo matches?",
        a: "La Liga leads the way with 18 encounters during the peak El Clásico era (2009-2018). The Champions League hosted 6 meetings, the Copa del Rey saw 5, the Supercopa de España had 5, and international friendlies account for the remaining matches. This distribution shows how their rivalry was primarily defined by the Barcelona-Real Madrid dynamic during those incredible La Liga seasons."
      },
      {
        q: "Did they ever play together on the same team?",
        a: "No — Messi and Ronaldo have never played on the same club team. They've spent their entire careers on opposite sides, which is exactly what makes their rivalry so compelling. The closest they came to being teammates was in friendly charity matches and FIFA FIFPro World XI selections. Some fans have dreamed of what it would look like if they'd ever joined forces — but their rivalry is what made football so special for over 15 years."
      },
    ]
  },
  {
    category: "Records, Trophies & The GOAT Debate",
    icon: Trophy,
    questions: [
      {
        q: "Who has won more Ballon d'Or awards?",
        a: "Lionel Messi has won 8 Ballon d'Or awards (2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023) — the most in football history. Cristiano Ronaldo has won 5 (2008, 2013, 2014, 2016, 2017). Messi also holds records for most consecutive Ballon d'Or wins (4 from 2009-2012), most appearances in the top 3 (14 times), and being the only player to win the award in three different decades. Ronaldo holds the record for most Ballon d'Or nominations (18 times). Both players dominated the award for over a decade — from 2008 to 2023, they won 13 of the 15 Ballon d'Or awards between them."
      },
      {
        q: "Who has scored more total career goals?",
        a: "Cristiano Ronaldo currently leads with 976 career goals, while Lionel Messi has 919 goals. Ronaldo has played more matches (1,330 vs 1,162) which partially explains the gap. However, Messi has a better goals-per-game ratio and significantly more assists (416 vs 261). When you factor in goal contributions (goals + assists), the numbers get much closer: Messi 1,335 vs Ronaldo 1,237. This is why the GOAT debate is so complex — it depends on which metrics you value most."
      },
      {
        q: "Who has more trophies?",
        a: "Messi leads with 48 career trophies compared to Ronaldo's 37. This includes club trophies (league titles, Champions Leagues, domestic cups, etc.) and international trophies (World Cup, Copa América, UEFA Euros, Nations League). Messi's trophy cabinet includes the 2022 FIFA World Cup and two Copa América titles. Ronaldo's includes the 2016 UEFA European Championship and the 2019 UEFA Nations League. Both have achieved the ultimate prizes for their countries."
      },
      {
        q: "What world records does each player hold?",
        a: "Both players hold numerous Guinness World Records and football records. Messi holds records for: most Ballon d'Or awards (8), most goals in a calendar year (91 in 2012), most goals for a single club (672 for Barcelona), most assists in World Cup history (12), and many more. Ronaldo holds records for: most international goals (146), most Champions League goals (140), most goals in top-level competition (976), most international caps (233), and many others. Our Records page has the complete list with over 200 verified records between them."
      },
      {
        q: "So... who is actually the GOAT?",
        a: "Ah, the billion-dollar question! The honest answer is: it depends on what you value most. Messi fans point to his superior playmaking (more assists), better goals-per-game ratio, World Cup victory, and more Ballon d'Or awards. Ronaldo fans highlight his higher total goal count, Champions League dominance, success across four different leagues, and unmatched international scoring record. The beauty of this debate is that there's no wrong answer — both players have transcended the sport and achieved things that may never be replicated. Our website gives you all the data to make your own informed decision. And if you feel strongly about it — head over to our Poll page and cast your vote!"
      },
    ]
  },
  {
    category: "Using the Website",
    icon: Monitor,
    questions: [
      {
        q: "How does the Poll work? Can I vote more than once?",
        a: "The Poll lets you cast one vote for who you believe is the GOAT. Your vote is saved in your browser's local storage, which means you can only vote once per device. The results show live vote counts and percentages, including our initial seed votes that reflect the broader football community's sentiment. If you want to change your vote, there's a 'Reset my vote' option available after you've voted. The poll is meant to be fun and engaging — it's not a scientific survey, just a way for fans to show their support."
      },
      {
        q: "Can I compare specific seasons or filter by competition?",
        a: "Absolutely! Most of our stat pages have filter options. On the Goals page, you can filter by competition type (club vs international, league vs Champions League). On the Career page, you can view season-by-season breakdowns and switch between timeline and club views. The Head to Head page lets you filter by competition to see only El Clásico matches, Champions League encounters, or international friendlies. The Matches tab on player profiles has powerful search and filter capabilities. We've designed every page to be interactive — click around and explore!"
      },
      {
        q: "Is the website mobile-friendly?",
        a: "Yes! We've built the entire website to be fully responsive. Whether you're on a phone, tablet, or desktop, the experience is optimized for your screen size. Charts resize, tables become scrollable, and cards stack properly on smaller screens. We believe football stats should be accessible wherever you are — at the stadium, on the couch, or in the middle of a heated debate with friends."
      },
      {
        q: "Can I download the data or access an API?",
        a: "We don't currently offer a public API or bulk data downloads, but we're considering it for future updates. If you're a researcher, journalist, or content creator who needs data access, please reach out through our Contact page. We're always happy to collaborate with people who share our passion for football statistics."
      },
      {
        q: "How can I report an error or suggest an improvement?",
        a: "We love hearing from our users! If you spot an error in our data, have a suggestion for a new feature, or just want to say hello, visit our Contact page. We take data accuracy seriously and typically respond to corrections within 24-48 hours. Many of our best features have come from user suggestions — so don't be shy!"
      },
    ]
  },
  {
    category: "The Bigger Picture",
    icon: Globe,
    questions: [
      {
        q: "How long will this website be maintained?",
        a: "As long as the beautiful game is played! Both Messi and Ronaldo are still active, and we're committed to tracking every remaining match of their legendary careers. Even after they retire, this website will remain as a historical archive — a digital museum of football's greatest rivalry. We're continuously adding new features, improving the design, and expanding our data coverage."
      },
      {
        q: "What happens when they retire? Will the website still be relevant?",
        a: "Absolutely. In fact, retirement will make the comparison even more meaningful because we'll have their complete, final career statistics. The Messi vs Ronaldo debate will continue for decades — just like people still debate Pelé vs Maradona vs Cruyff. This website will serve as the definitive historical record of their careers, with every goal, assist, trophy, and record preserved for future generations of football fans."
      },
      {
        q: "How can I support this project?",
        a: "The best way to support us is by using the website, sharing it with fellow football fans, and engaging with our content. Spread the word on social media, link to our stats in your debates, and let people know this resource exists. If you're interested in contributing data, writing articles, or helping with development, reach out through our Contact page. This is a community-driven project, and every bit of support helps!"
      },
      {
        q: "Is this the most complete Messi vs Ronaldo comparison on the internet?",
        a: "We believe so, and our users tell us the same. With over 2,400+ matches catalogued, 200+ world records documented, 36 head-to-head encounters analyzed, and interactive tools that let you explore the data in ways no other website offers — yes, this is the most comprehensive comparison available. But we're not complacent. We're always working to make it even better. If you find something missing, let us know!"
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

  // Schema for SEO
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
  description="Who is better Messi or Ronaldo? How many goals does Ronaldo have? Get answers to the most asked questions about football's greatest rivalry with complete stats.">
      
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <meta name="keywords" content="Messi vs Ronaldo FAQ, football comparison questions, GOAT debate FAQ, Messi Ronaldo stats explained, football statistics help" />
      </Head>

      <div className="bg-black min-h-screen">
        
        {/* ─── HERO ─── */}
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Help Center</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                Frequently Asked <span className="text-amber-400">Questions</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about the ultimate football comparison platform — from how we collect our data to understanding the greatest rivalry in sports history.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ CONTENT ─── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">

          {/* Category Quick Links */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {FAQS.map(cat => {
              const CatIcon = cat.icon
              return (
                <button key={cat.category} onClick={() => { setOpenCategory(cat.category) }}
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

          {/* Questions */}
          <div className="space-y-3">
            {FAQS.map((category, catIndex) => (
              <motion.div key={category.category} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.05 }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden">
                
                {/* Category Header */}
                <button onClick={() => toggleCategory(category.category)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-3">
                    {(() => { const CatIcon = category.icon; return <CatIcon className="w-5 h-5 text-amber-400" /> })()}
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white">{category.category}</h2>
                      <p className="text-[10px] text-gray-500 mt-0.5">{category.questions.length} questions</p>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: openCategory === category.category ? 180 : 0 }} transition={{ duration: 0.3 }}
                    className="text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                {/* Questions List */}
                {openCategory === category.category && (
                  <div className="border-t border-gray-700/50">
                    {category.questions.map((item, i) => (
                      <div key={i} className="border-b border-gray-700/30 last:border-0">
                        <button onClick={() => toggleQuestion(item.q)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-800/20 transition-colors group">
                          <span className={`text-sm pr-4 transition-colors ${openQuestions.has(item.q) ? "text-amber-400 font-medium" : "text-gray-300 group-hover:text-white"}`}>
                            {item.q}
                          </span>
                          <motion.span animate={{ rotate: openQuestions.has(item.q) ? 180 : 0 }} transition={{ duration: 0.3 }}
                            className="text-gray-500 flex-shrink-0">
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

          {/* Still have questions */}
          <div className="text-center py-12 mt-8 border-t border-gray-800">
            <MessageCircle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/contact" className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                Contact Us
              </Link>
              <Link href="/about" className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors">
                About Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}