"use client";
import { Inter } from "next/font/google";
import Footer from "../components/footer";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ArticlePage() {
const [expandedArticle, setExpandedArticle] = useState(null);

  const articles = [
  
    {
  id: 3,
  title: "Portugal 2-2 Hungary: Szoboszlai's Last-Gasp Equalizer Denies Ronaldo Record Night",
  excerpt: "Dominik Szoboszlai scores dramatic 91st-minute equalizer as Hungary snatch draw against Portugal in World Cup qualifier",
  readTime: "5 min read",
  date: "Oct 15, 2025",
  category: "Match Report",
  stats: "2-2 Draw",
  content: `
    <h2>Dramatic Finish in Lisbon as Hungary Stun Portugal</h2>
    <p>In a thrilling World Cup qualifying match at Estádio José Alvalade, Dominik Szoboszlai scored a dramatic 91st-minute equalizer to secure a 2-2 draw for Hungary against Portugal, denying Cristiano Ronaldo what seemed certain to be a winning return to international duty.</p>
    
    <h3>Match Summary</h3>
    <p>The game started with a shock as Hungary took an early lead in the 8th minute through Attila Szalai, capitalizing on their set-piece strength. However, Cristiano Ronaldo responded with two first-half goals (22nd and 45+3rd minutes) to put Portugal ahead, taking his incredible World Cup qualifying tally to 41 goals in 50 appearances.</p>
    
    <p>Portugal dominated large periods of the game and hit the woodwork twice in the second half, but failed to kill off the match. Their complacency proved costly when Szoboszlai pounced in stoppage time to earn Hungary a deserved point.</p>
    
    <h3>Ronaldo's Record-Breaking Night</h3>
    <p>Cristiano Ronaldo's brace marked his 37th time scoring at least two goals for Portugal, with ten of those being hat-tricks. The 40-year-old superstar now has nine goals in eight meetings against Hungary, with only Luxembourg (11 goals in 11 games) conceding more to the legendary forward.</p>
    
    <p>Ronaldo's World Cup qualifying record now stands at 41 goals, extending his lead at the top of the all-time charts ahead of Carlos Ruiz (39), Lionel Messi (36), Ali Daei (35), and Robert Lewandowski (33).</p>
    
    <h3>Post-Match Reactions</h3>
    <p><strong>Dominik Szoboszlai</strong> told UEFA: "I couldn't get to the near post, so I went for the far one. I don't know how many legs the ball passed through to get to me, but it worked. After a start like that, there could be no other acceptable outcome for us."</p>
    
    <p><strong>Portugal coach Roberto Martínez</strong> expressed disappointment: "Hungary were strong at set pieces, but we controlled the first half. We started the second period well but couldn't finish the game off. In the last ten minutes, we played for the chance to qualify for the World Cup, and that changes who you are a little."</p>
    
    <p><strong>Portugal defender Nuno Mendes</strong> admitted: "After the second goal we slowed down the tempo and they profited. We tried to do what we trained for, but we failed. We need to stay focused and, in November, do things correctly."</p>
    
    <h3>Key Statistics</h3>
    <p>• This was the 16th meeting between the two nations, with Hungary still never beating Portugal<br>
    • Hungary have now scored from the 86th minute onwards in all four of their qualifiers<br>
    • Ronaldo's brace marked his 37th multi-goal game for Portugal<br>
    • Portugal hit the woodwork twice in the second half before Hungary's equalizer</p>
    
    <h3>Group F Implications</h3>
    <p>The draw leaves Portugal still well positioned to qualify for the World Cup, but the dropped points mean they'll need positive results in their November fixtures against Republic of Ireland and Armenia. Hungary, meanwhile, kept their qualification hopes alive and will fancy their chances in upcoming matches against Armenia and Ireland.</p>
    
    <p><strong>Attila Szalai</strong> emphasized Hungary's determination: "This was a great step, as was the win at home to Armenia. Now we have the final two games in November. We play Armenia away, then the last game in Budapest against Ireland. We want to win them both. It will be difficult, but second place is a realistic target."</p>
    
    <h3>Looking Ahead</h3>
    <p>Portugal will need to regroup quickly for their November qualifiers, where they'll face Republic of Ireland (November 14) and Armenia (November 16). The lessons from this dramatic draw will be crucial as they aim to secure their World Cup qualification.</p>
  `
},
    {
  id: 4,
  title: "Messi Masterclass: Argentina Thrash Puerto Rico 6-0 in Relocated Friendly",
  excerpt: "Lionel Messi provides two assists and creates constant danger as World Cup champions dominate Puerto Rico in Fort Lauderdale",
  readTime: "4 min read",
  date: "Oct 15, 2025",
  category: "Match Report",
  stats: "6-0 Victory",
  content: `
    <h2>Messi Shines in Fort Lauderdale Homecoming</h2>
    <p>Lionel Messi delivered a masterful performance in his Inter Miami home stadium, setting up two goals and orchestrating Argentina's 6-0 demolition of Puerto Rico in an international friendly that was relocated from Chicago to Fort Lauderdale just days before the match.</p>
    
    <h3>Match Dominance from World Champions</h3>
    <p>Argentina showed their class against the 155th-ranked Puerto Rico, with Alexis Mac Allister opening the scoring in the 14th minute and adding a second in the 36th minute. Gonzalo Montiel found the net in the 23rd minute, with Messi providing the assist through a perfectly weighted lob that showcased his exceptional vision and technique.</p>
    
    <p>The second half saw Argentina continue their dominance, with an own goal from Puerto Rico's Steven Echevarria in the 64th minute before Lautaro Martínez closed out the scoring with two late goals in the 79th and 84th minutes. Messi was instrumental in Martínez's second goal, delivering a clever back pass that demonstrated his unparalleled awareness and creativity.</p>
    
    <h3>Messi's Home Comforts</h3>
    <p>Playing at Chase Stadium, his home ground with Inter Miami, Messi looked completely at ease despite having sat out Argentina's previous friendly against Venezuela. Argentina manager Lionel Scaloni revealed his conversation with the captain: "Yesterday I asked him if he was ready to play, and he said yes. It's always a joy for us. He trained with us last week, and then we decided not to use him against Venezuela."</p>
    
    <p>Scaloni added, "I imagine both he and Rodrigo De Paul felt at home on the pitch where they play," highlighting the comfort level of his MLS-based players in familiar surroundings.</p>
    
    <h3>Unusual Match Circumstances</h3>
    <p>The friendly was surrounded by unusual circumstances, having been moved from Chicago to Fort Lauderdale amid reports of low ticket sales and concerns about immigration crackdowns in the Chicago area. Tickets were available for as low as $25 just hours before kickoff - a rare occurrence for any match featuring Messi.</p>
    
    <p>The stadium was approximately half-full at the start of the match but filled out more as the game progressed, with fans treated to a showcase of Argentina's attacking prowess ahead of next year's World Cup.</p>
    
    <h3>Puerto Rico's Brave Effort</h3>
    <p>Despite the lopsided scoreline, Puerto Rico showed moments of promise, including a remarkable eighth-minute attempt from Leandro Antonetti who spotted Argentina goalkeeper Emiliano Martínez off his line and launched a shot from beyond the midfield stripe that nearly caught out the Aston Villa keeper.</p>
    
    <p>Puerto Rico's lineup featured college players, including goalkeeper Sebastian Cutler from Villanova, who made several impressive saves including denying Messi twice in the second half. Cutler stopped a Messi header early after halftime and then made another excellent save on a 15-yard left-footed attempt in the 74th minute.</p>
    
    <h3>World Cup Preparations</h3>
    <p>This match served as crucial preparation for Argentina's World Cup defense, with the tournament scheduled to be played in the U.S., Mexico, and Canada from June 11 to July 19, 2026. The game took place amid political headlines, with President Donald Trump threatening to relocate World Cup matches from suburban Boston on the same day.</p>
    
    <h3>Key Performances</h3>
    <p><strong>Lionel Messi:</strong> Two assists, constant creative threat, and demonstrated perfect understanding with his teammates in his familiar Fort Lauderdale surroundings.</p>
    
    <p><strong>Alexis Mac Allister:</strong> Scored twice in the first half, showing his growing importance in the Argentine midfield.</p>
    
    <p><strong>Lautaro Martínez:</strong> Came off the bench to score twice, benefiting from Messi's creativity for his second goal.</p>
    
    <p><strong>Sebastian Cutler:</strong> The Villanova goalkeeper made several impressive saves despite the scoreline, including two denials of Messi.</p>
    
    <h3>Looking Ahead</h3>
    <p>Argentina will continue their World Cup preparations with this convincing victory providing positive momentum. The performance demonstrated the depth and quality available to Scaloni as they build toward defending their crown on North American soil next year.</p>
  `
},
    {
  id: 5,
  title: "MrBeast Meets Bollywood's Three Khans at Joy Forum 2025 in Historic Gathering",
  excerpt: "YouTube superstar MrBeast sparks collaboration rumors after posting photo with Shah Rukh Khan, Salman Khan, and Aamir Khan at Riyadh event",
  readTime: "5 min read",
  date: "Oct 17, 2025",
  category: "Entertainment",
  stats: "Historic Meeting",
  content: `
    <h2>Digital Meets Bollywood: MrBeast's Royal Encounter with the Three Khans</h2>
    <p>In a historic moment that bridges the gap between digital entertainment and traditional cinema, YouTube megastar MrBeast (Jimmy Donaldson) shared the stage and spotlight with Bollywood's legendary trio - Shah Rukh Khan, Salman Khan, and Aamir Khan - at the Joy 2025 Forum in Riyadh, Saudi Arabia.</p>
    
    <h3>The Viral Photo That Broke the Internet</h3>
    <p>MrBeast sent social media into a frenzy when he posted a photo on his Instagram Stories featuring himself alongside the three Khans, who represent the pinnacle of Indian cinema and haven't appeared together in this capacity for years. The caption that accompanied the photo - "Hey India, should we do something together?" - immediately sparked widespread speculation about a potential collaboration.</p>
    
    <p>The image quickly went viral across platforms, with particular excitement on X (formerly Twitter) and Reddit, where fans expressed their astonishment at seeing this rare gathering of entertainment royalty from both digital and traditional media spheres.</p>
    
    <h3>Social Media Erupts in Speculation</h3>
    <p>Fans from both the digital and Bollywood worlds flooded social media with reactions. One user captured the sentiment perfectly: "After Ambani, only Mr. Beast could achieve all three Ds!" referring to the rarity of getting all three Khans together. Another speculated about larger ambitions: "Is this the prologue for an international film?" while a third humorously commented: "Beauty and the Beast!"</p>
    
    <p>The meeting represents a significant moment in the convergence of digital and traditional entertainment, with MrBeast's global YouTube empire meeting the established stardom of Bollywood's most iconic figures.</p>
    
    <h3>Joy Forum 2025: Bridging Entertainment Worlds</h3>
    <p>The historic meeting took place at the Joy Forum 2025, an event dedicated to exploring the intersection of digital creativity and traditional stardom. MrBeast participated in a panel discussion titled "From Broadcast to Global: New Talents in Global Stardom" alongside fellow YouTube sensation IShowSpeed.</p>
    
    <p>Meanwhile, the Three Khans are scheduled to appear together on stage for a session titled "The Global Rise of Bollywood," making this one of the most anticipated moments of the event for Indian cinema enthusiasts worldwide.</p>
    
    <h3>MrBeast's Growing Indian Connection</h3>
    <p>This isn't MrBeast's first engagement with Indian culture and audience. Last November, he visited India alongside global influencers KSI, Logan Paul, and IShowSpeed to launch his Feastables brand. This repeated engagement demonstrates his strategic interest in the massive Indian market, both for audience growth and commercial collaborations.</p>
    
    <p>His question to Indian fans - "should we do something together?" - suggests he's actively considering projects that would resonate with the Indian audience, potentially leveraging the star power of the Khans for unprecedented cross-platform content.</p>
    
    <h3>What Could This Collaboration Mean?</h3>
    <p>While details remain speculative, the possibilities are intriguing. Potential collaborations could range from:</p>
    
    <p><strong>Content Creation:</strong> MrBeast-style challenge videos featuring the Khans<br>
    <strong>Philanthropic Initiatives:</strong> Large-scale charity projects combining their influence<br>
    <strong>Commercial Ventures:</strong> Joint business projects or brand collaborations<br>
    <strong>Entertainment Projects:</strong> Digital-first content that could later translate to traditional media</p>
    
    <h3>The Significance of the Three Khans Together</h3>
    <p>The gathering of Shah Rukh Khan, Salman Khan, and Aamir Khan is notable in itself, as the three superstars haven't shared screen space in Bollywood films for an extended period. Their collective appearance at Joy Forum 2025, combined with the MrBeast meeting, signals a new era of global entertainment collaborations that transcend traditional industry boundaries.</p>
    
    <h3>Looking Ahead</h3>
    <p>As the entertainment world watches closely, this meeting could mark the beginning of a new chapter in global content creation. The potential collaboration between digital's biggest star and Bollywood's most iconic figures represents the continuing evolution of entertainment, where platform boundaries blur and global audiences unite around compelling content.</p>
    
    <p>While nothing is confirmed, the mere fact that this meeting occurred - and was highlighted by MrBeast himself - suggests that conversations are happening behind the scenes that could lead to groundbreaking projects bridging Eastern and Western entertainment landscapes.</p>
  `
},
    {
      id: 6,
      title: "Messi vs Ronaldo League Performance: La Liga, Premier League Stats",
      excerpt: "Complete domestic league comparison across Spain, England, Italy, France and USA",
      readTime: "9 min read",
      date: "Dec 6, 2024",
      category: "League Performance",
      stats: "12 vs 7 League Titles",
      content: `
        <p>The domestic league performances of Messi and Ronaldo reveal fascinating contrasts in their career paths and adaptations to different football cultures. Messi has won 12 league titles throughout his career, comprising 10 La Liga trophies with Barcelona and 2 Ligue 1 titles with PSG. This remarkable haul demonstrates his consistent dominance in Spain and successful adaptation to French football later in his career. His loyalty to Barcelona for the majority of his career means all but two of his league titles came with one club.</p>
        
        <p>Ronaldo has collected 7 league titles across three different countries: 3 Premier League titles with Manchester United, 2 La Liga trophies with Real Madrid, and 2 Serie A titles with Juventus. This spread across Europe's top leagues showcases his adaptability and success in different football environments. His achievement of winning league titles in England, Spain, and Italy while being the top scorer in each league remains unmatched in football history.</p>
        
        <p>Their records in La Liga, where they competed directly for nine seasons, provide the clearest comparison of their domestic league prowess. Messi scored 474 goals in 520 La Liga appearances, giving him a ratio of 0.91 goals per game. Ronaldo, in his 292 La Liga matches for Real Madrid, scored 311 goals at a rate of 1.06 goals per game. While Ronaldo had the superior goals-per-game ratio during their time in Spain, Messi's greater longevity in the league allowed him to accumulate more total goals and break numerous La Liga records.</p>
        
        <p>Ronaldo's Premier League record shows 103 goals in 236 appearances across his two spells with Manchester United, averaging 0.44 goals per game. His first spell established him as one of the world's best players, while his return in 2021 demonstrated his enduring quality in what many consider the world's most physically demanding league. Messi, having never played in the Premier League, doesn't have this particular experience in his portfolio, though his success in other leagues remains unquestioned.</p>
      `
    },
   
    {
  id: 7,
  title: "Cristiano Ronaldo Opens Up in Explosive Interview with Piers Morgan",
  excerpt: "Ronaldo reveals untold truths about his career, Manchester United exit, and future ambitions in a candid conversation with Piers Morgan.",
  readTime: "6 min read",
  date: "Oct 19, 2025",
  category: "Exclusive Interview",
  stats: "Exclusive Insights",
  content: `
    <p>In a deeply revealing and emotional interview with British journalist Piers Morgan, Cristiano Ronaldo spoke openly about his football journey, personal struggles, and his ambitions for the future. The conversation, which has quickly gone viral across social media, offered fans a rare and unfiltered glimpse into the mindset of one of football’s greatest icons.</p>

    <p>During the interview, Ronaldo discussed the challenges he faced during his second spell at Manchester United, expressing disappointment with how the club handled internal matters and his eventual departure. He also touched on his relationships with teammates, coaching staff, and management, making several bold statements that have reignited debates in the football world.</p>

    <p>Ronaldo reflected on his motivation and discipline, saying that his competitive spirit and love for the game remain as strong as ever. “I’ve always believed in hard work, dedication, and self-belief. People see the goals, but they don’t see the sacrifices,” he said.</p>

    <p>The Portuguese superstar also opened up about his life beyond football — including family, legacy, and how he continues to inspire younger players around the world. Ronaldo emphasized the importance of maintaining mental strength and staying true to one’s values even in the face of criticism and adversity.</p>

    <p>Throughout the discussion, Piers Morgan’s questions touched on sensitive topics — from the state of modern football to Ronaldo’s view of media narratives surrounding him. Ronaldo’s responses were measured yet powerful, showcasing his maturity and self-awareness as he enters the later stages of his legendary career.</p>

    <p>The full interview is available on YouTube, offering fans the complete uncut version of this must-watch conversation: 
      <a href="https://www.youtube.com/watch?v=H3m1HmfXY3A" target="_blank">Watch the interview here</a>.
    </p>

    <p>This interview reaffirms Cristiano Ronaldo’s position not only as one of football’s most accomplished players but also as a global figure unafraid to speak his truth. His honesty and passion continue to inspire millions across the world, making this one of the most talked-about football interviews in recent memory.</p>
  `
}


    {
      id: 8,
      title: "Inter Miami CF: Complete Team Profile, Squad Analysis and 2025 Season Preview",
      excerpt: "Everything you need to know about Inter Miami CF - squad details, key players, transfers and season expectations",
      readTime: "6 min read",
      date: "Oct 19, 2025",
      category: "Team Profile",
      stats: "MLS 2025 Season",
      content: `
        <p>Inter Miami CF, the American professional soccer club based in Fort Lauderdale, Florida, continues to make waves in Major League Soccer under the guidance of coach Javier Mascherano. Founded on January 29, 2018, the club has rapidly established itself as one of the most exciting franchises in North American soccer, playing their home matches at the 21,550-capacity Chase Stadium.</p>
        
        <p>The 2025 season sees Inter Miami boasting a formidable squad featuring global superstar Lionel Messi, who remains the centerpiece of the team's ambitious project. Alongside Messi, the attacking lineup includes veteran striker Luis Suárez, providing one of the most experienced and lethal forward partnerships in MLS history. The recent addition of Argentine midfielder Rodrigo de Paul adds further quality and international experience to an already impressive roster.</p>
        
        <p>Inter Miami's current squad comprises 27 players with an average age of 26.3 years, reflecting a balanced mix of experienced veterans and promising young talent. The team features 22 foreign players, highlighting their international recruitment strategy, and includes 6 national team players who bring international tournament experience to the dressing room.</p>
        
        <p>The midfield is anchored by the experienced Sergio Busquets, whose reading of the game and distribution skills remain world-class. The defensive line is marshaled by former Barcelona teammate Jordi Alba, whose attacking overlaps and defensive awareness continue to be valuable assets. The goalkeeping department features William Yarbrough, Óscar Ustari, and Rocco Ríos Novo, providing strong competition for the starting spot.</p>
        
        <p>Inter Miami competes across multiple competitions in the 2025 season, including the MLS regular season, FIFA Club World Cup, CONCACAF Champions Cup, and Leagues Cup. Their next fixture sees them facing Nashville SC on October 18, 2025, in what promises to be an exciting MLS encounter. The team comes into this match with strong momentum, having recently secured an impressive 4-0 victory against Atlanta United.</p>
        
        <p>The club's transfer activity has been strategic and ambitious, with 12 new arrivals including Mateo Silvetti, Rodrigo de Paul, and William Yarbrough strengthening key areas of the squad. While experiencing 20 departures, including Benjamin Cremaschi, Drake Callender, and Federico Redondo, the overall quality of the squad has been maintained and enhanced for the challenges ahead.</p>
        
        <p>Under Mascherano's leadership, Inter Miami has developed an attractive, possession-based style of football that leverages the technical qualities of their star players. With Messi continuing to perform at an elite level and supported by a strong supporting cast, Inter Miami enters the 2025 season with genuine aspirations for silverware across all competitions.</p>
      `
    },

    {
      id: 9,
      title: "Messi Brace Leads Inter Miami to 3-1 Playoff Victory Over Nashville SC",
      excerpt: "Lionel Messi scores twice including dramatic stoppage-time goal to secure crucial MLS playoff win",
      readTime: "5 min read",
      date: "Oct 25, 2025",
      category: "Match Report",
      stats: "3-1 Victory",
      content: `
        <p>Inter Miami CF secured a crucial 3-1 victory over Nashville SC in their MLS playoff encounter at Chase Stadium, with Lionel Messi delivering a masterclass performance that included two crucial goals. The victory gives Inter Miami a significant advantage in the Best of 3 playoff series, putting them one win away from advancing to the next round.</p>
        
        <p>The home side started brightly and took the lead in the 19th minute when Messi opened the scoring, finishing a well-worked move assisted by veteran striker Luis Suárez. The first half saw Inter Miami controlling possession and creating the better chances, but they had to settle for a narrow 1-0 lead heading into halftime despite their dominance.</p>
        
        <p>The second half saw Inter Miami extend their advantage in the 62nd minute when young talent Tadeo Allende found the net, with Ian Fray providing the assist. The goal demonstrated the depth of quality in Inter Miami's squad, with the younger players stepping up alongside the experienced stars.</p>
        
        <p>As the match entered stoppage time, Messi sealed the victory with a dramatic 96th-minute goal, showcasing his enduring class and clutch performance ability. The Argentine maestro's brace ensured Inter Miami would take a comfortable lead into the next match of the playoff series.</p>
        
        <p>Nashville SC managed to pull one back in the 101st minute through Hany Mukhtar, but it proved to be nothing more than a consolation goal as Inter Miami saw out the remaining moments to secure a well-deserved 3-1 victory.</p>
        
        <p>The match statistics reflected Inter Miami's control throughout the game, with the home side enjoying the majority of possession and creating more clear-cut chances. Messi rightfully earned the Player of the Match award for his influential performance, which included two goals and constant threat to the Nashville defense.</p>
        
        <p>This victory continues Inter Miami's impressive record against Nashville SC, having now won 8 of their last 10 encounters. Under coach Javier Mascherano, the team has developed a strong understanding and tactical discipline that was evident throughout the match.</p>
        
        <p>The win puts Inter Miami in a commanding position in the playoff series, with the team needing just one more victory to advance. With Messi in such scintillating form and the supporting cast performing well, Inter Miami will be confident of progressing further in their quest for MLS Cup glory.</p>
      `
    },
    {
      id: 10,
      title: "Messi vs Ronaldo Advanced Stats: xG, Dribbling & Modern Metrics",
      excerpt: "Complete analysis using expected goals, progressive carries, and advanced football analytics",
      readTime: "7 min read",
      date: "Dec 10, 2024",
      category: "Advanced Stats",
      stats: "Data-Driven Analysis",
      content: `
        <p>Modern football analytics provide deeper insights into the performances of Messi and Ronaldo, revealing nuances that traditional statistics might miss. Expected Goals (xG) analysis shows both players significantly outperforming their expected numbers throughout their careers, indicating exceptional finishing quality. Messi has scored 821 goals from an xG of 658, meaning he's scored 163 more goals than the average player would be expected to score from the same chances. Ronaldo shows similar overperformance with 885 goals from 732 xG, exceeding expectations by 153 goals.</p>
        
        <p>The dribbling statistics highlight one of the most significant differences in their playing styles. Messi averages 3.7 successful dribbles per 90 minutes throughout his career, demonstrating his unparalleled ability to beat defenders and progress the ball through individual skill. Ronaldo, while still an effective dribbler particularly in his younger years, averages 1.8 successful dribbles per 90 minutes. This substantial difference reflects Messi's role as both primary creator and scorer, often initiating attacks from deeper positions.</p>
        
        <p>Progressive carries and passing metrics further emphasize their contrasting approaches to influencing games. Messi averages 12.3 progressive carries per 90 minutes, frequently driving Barcelona and Argentina forward through his dribbling and ball progression. He also completes 8.1 progressive passes per 90, consistently breaking defensive lines with his vision and passing range. Ronaldo averages 6.8 progressive carries and 4.3 progressive passes per 90, reflecting his more advanced positioning and focus on finishing moves rather than building them.</p>
        
        <p>Defensive contributions, while not the primary strength of either player, also show interesting patterns. Messi applies 15.2 pressures per 90 minutes compared to Ronaldo's 11.8 pressures per 90, indicating slightly more engagement in defensive actions. However, both players are primarily judged on their offensive output, and their defensive numbers reflect their roles as attacking focal points who conserve energy for creating and scoring goals. The advanced metrics collectively paint a picture of two all-time greats with distinct but equally effective approaches to dominating football matches.</p>
      `
    }
  ];

  const handleReadAnalysis = (articleId, number) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const handleCloseArticle = () => {
    setExpandedArticle(null);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto bg-gray-900 p-6 sm:p-8 ${inter.className}`}>
      
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Messi vs Ronaldo: Statistical Analysis</h1>
        <div className="w-20 h-1 bg-amber-400 mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">
          Comprehensive data-driven comparisons between two football legends
        </p>
      </div>

      {/* Articles Grid */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6">In-Depth Analysis Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 ${
                expandedArticle === article.id 
                  ? "border-amber-400 scale-100 z-10 relative" 
                  : "border-gray-700 hover:border-amber-400 hover:scale-[1.009]"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className=" text-amber-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {article.category}
                </span>
                <span className="text-gray-400 text-sm">{article.stats}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {article.title}
              </h3>
              
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex items-center text-gray-400 text-sm">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <button 
                  onClick={() => handleReadAnalysis(article.id)}
                  className="bg-amber-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-300 transition-colors text-sm"
                >
                  {expandedArticle === article.id ? "Close Article" : "Read Article"}
                </button>
              </div>

              {/* Expanded Article Content */}
              {expandedArticle === article.id && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div 
                    className="prose prose-invert max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleCloseArticle}
                      className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-sm"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 mb-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6">Our Analysis Methodology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Verified Data Sources</h3>
            <p className="text-gray-400 text-sm">Official statistics from FIFA, UEFA, and league databases</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fair Comparison</h3>
            <p className="text-gray-400 text-sm">Context-aware analysis considering different leagues and eras</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Deep Analysis</h3>
            <p className="text-gray-400 text-sm">Beyond basic stats to advanced metrics and performance impact</p>
          </div>
        </div>
      </div>

      {/* Article Tags */}
      <div className="text-center mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-gray-800 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-400 border-opacity-30">
            Messi vs Ronaldo
          </span>
          <span className="bg-gray-800 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-400 border-opacity-30">
            who is goat
          </span>
          <span className="bg-gray-800 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-400 border-opacity-30">
            Messi career Records
          </span>
          <span className="bg-gray-800 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-400 border-opacity-30">
            Ronaldo Career Records
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}