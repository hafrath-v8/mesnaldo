"use client";
import { Inter } from "next/font/google";
import Footer from "../components/footer";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ArticlePage() {
const [expandedArticle, setExpandedArticle] = useState(null);

  const articles = [
    {
  id: 1,
  title: "Honor's Robot Phone Concept Features Fold-Out Camera Arm - Full Details",
  excerpt: "Honor unveils groundbreaking Robot Phone concept with AI-enabled gimbal camera that unfolds from the phone's rear",
  readTime: "6 min read",
  date: "Oct 15, 2025",
  category: "Tech Innovation",
  stats: "AI Camera Robot",
  content: `
    <h2>Honor's Revolutionary Robot Phone Concept</h2>
    <p>Honor has announced what it's calling the "Robot Phone," a concept device with an AI-enabled, gimbal-mounted camera that unfolds from the phone's rear and can shoot photos and film video in any direction. The phone — so far only seen in CGI form in a teaser video — looks like a typical, albeit thick, smartphone, but hides revolutionary technology within.</p>
    
    <h3>The Fold-Out Camera Arm</h3>
    <p>Instead of an Honor logo, the device bears an alpha symbol, representing the company's "Alpha Plan" corporate vision. The main giveaway that something's extraordinary is the chunky camera module, split into two parts. From here, a camera arm unfolds with a cartoonish giggle (it really does giggle, at least in the video), revealing that the main camera can flip up to take selfies, but also to shoot from a variety of positions and angles, seemingly moving under its own direction.</p>
    
    <p>This makes the Robot Phone a more advanced successor to the likes of 2019's Asus Zenfone 6, which flipped its main cameras up and over to take selfie shots. However, Honor's implementation appears significantly more sophisticated, with the flexible orientation meaning it can film even when the phone is lying down or positioned in various ways.</p>
    
    <h3>DJI Osmo Pocket Inspiration</h3>
    <p>The camera system looks for all the world like the mini gimbal camera on top of the DJI Osmo Pocket, though Honor's video suggests it's been imbued with enough intelligence to frame photographs, soothe babies, and even gaze in astonished wonderment at the stars above. As Dominic Preston notes, "Have you ever wanted a DJI Osmo Pocket built into your phone?" - that's essentially what Honor is promising with this concept.</p>
    
    <h3>AI-Powered Emotional Companion</h3>
    <p>"With the Robot Phone, Honor envisions the future phone as more than just a tool," the company wrote in a press release. "It becomes an emotional companion that senses, adapts, and evolves autonomously like a robot, enriching its users' lives with love, joy, and wisdom." This represents a significant shift from smartphones as mere communication devices to intelligent companions that actively participate in users' lives.</p>
    
    <h3>Current Status and Availability</h3>
    <p>As of October 2025, the Robot Phone remains a concept device shown only in CGI form. Honor has confirmed that we'll find out more about the Robot Phone — and potentially get the chance to see it in the flesh — when the company reveals more at Mobile World Congress next spring. The Robot Phone served as Honor's "One more thing..." announcement at the end of a more typical launch event for Honor's two Magic 8 flagship phones.</p>
    
    <h3>What We Know So Far</h3>
    <p>The device appears to be a thick smartphone when the camera arm is stowed away, maintaining a relatively normal appearance until the robotic features are activated. The camera arm folds neatly into the main camera module when not in use, suggesting thoughtful engineering despite the advanced functionality. While specific technical specifications remain under wraps, the concept clearly points toward a future where smartphones become more interactive and autonomous.</p>
    
    <p><em>Reported by Dominic Preston, News Editor with over a decade's experience in journalism. Previously worked at Android Police and Tech Advisor.</em></p>
  `
},
   {
  id: 2,
  title: "Vivo X300 Review: Dimensity 9500 Powerhouse with 200MP Camera System",
  excerpt: "Vivo's latest flagship boasts MediaTek's 3nm Dimensity 9500, 200MP triple camera, and exceptional battery life",
  readTime: "7 min read",
  date: "Oct 17, 2025",
  category: "Flagship Review",
  stats: "200MP Camera",
  content: `
    <h2>Vivo X300: The New Android Powerhouse</h2>
    <p>Released on October 17, 2025, the Vivo X300 represents the company's most ambitious flagship to date, packing cutting-edge technology into a sleek 8mm thick body weighing just 190g. With its revolutionary camera system and MediaTek's latest 3nm chipset, this device aims to compete with the best smartphones in the market.</p>
    
    <h3>Display and Design Excellence</h3>
    <p>The Vivo X300 features a stunning 6.31-inch LTPO AMOLED display with 1216 x 2640 pixel resolution, delivering an impressive 460 PPI density. What truly sets this screen apart is its incredible 4500 nits peak brightness – one of the highest in any smartphone currently available. The 120Hz refresh rate combined with 2160Hz PWM dimming ensures smooth scrolling while reducing eye strain during extended use.</p>
    
    <p>Built with an aluminum alloy frame and glass back, the X300 maintains premium construction while achieving IP68/IP69 dust and water resistance. This means the device can withstand high-pressure water jets and immersion up to 1.5 meters for 30 minutes, offering superior protection compared to standard IP68 ratings.</p>
    
    <h3>Performance: MediaTek Dimensity 9500 Unleashed</h3>
    <p>At the heart of the Vivo X300 lies the MediaTek Dimensity 9500, built on an advanced 3nm process. The octa-core CPU configuration features a groundbreaking 1x4.21 GHz C1-Ultra core, 3x3.5 GHz C1-Premium cores, and 4x2.7 GHz C1-Pro cores, delivering exceptional performance while maintaining power efficiency.</p>
    
    <p>Paired with the Arm G1-Ultra GPU and up to 16GB of RAM, the X300 handles everything from intensive gaming to multitasking with ease. The device runs Android 16 with Vivo's OriginOS 6 skin, promising up to 4 major Android upgrades – ensuring long-term software support.</p>
    
    <h3>Camera System: 200MP Photography Revolution</h3>
    <p>The triple camera setup represents Vivo's most ambitious imaging system yet. The primary 200MP sensor features an f/1.7 aperture, 1/1.4" sensor size, and OIS stabilization, capturing exceptional detail in various lighting conditions. The 50MP periscope telephoto lens offers 3x optical zoom with OIS, while the 50MP ultrawide camera covers a 119-degree field of view.</p>
    
    <p>Vivo continues its partnership with Zeiss, incorporating Zeiss optics and T* lens coating to reduce reflections and improve light transmission. The camera system supports 4K video recording at up to 120fps with gyro-EIS stabilization, and even 4K@120fps HDR video capture – a feature typically found in professional cameras.</p>
    
    <h3>Battery and Charging</h3>
    <p>The Vivo X300 packs a substantial 6040mAh Si/C Li-Ion battery, achieving an impressive 52:15 hours of endurance rating. With 90W wired charging and 40W wireless charging capabilities, users can quickly power up their device while enjoying all-day battery life. The battery is rated for 1200 charge cycles, ensuring long-term reliability.</p>
    
    <h3>Storage and Connectivity</h3>
    <p>Available in multiple configurations ranging from 256GB to 1TB of UFS 4.1 storage, the X300 caters to all user needs. While there's no microSD card slot, the ample internal storage options should satisfy most users. Connectivity features include Wi-Fi 7 support, Bluetooth 5.4 with aptX HD and LHDC 5 codecs, and comprehensive positioning systems including GPS, GLONASS, BDS, GALILEO, QZSS, and NavIC.</p>
    
    <h3>Pricing and Availability</h3>
    <p>Priced at approximately 530 EUR, the Vivo X300 offers exceptional value considering its premium specifications. Available in Black, Blue, Red, Purple, and Pink color options, the device combines style with substance. According to EU labeling, the X300 achieves Class A energy efficiency, Class B free fall resistance (surviving 180 falls), and Class C repairability rating.</p>
    
    <h3>Verdict</h3>
    <p>The Vivo X300 stands as a compelling flagship alternative, particularly for photography enthusiasts and power users. With its revolutionary 200MP camera system, cutting-edge Dimensity 9500 processor, and exceptional battery life, it delivers a complete premium experience at a competitive price point. The device successfully bridges the gap between innovation and practicality, making it one of the most exciting releases of 2025.</p>
  `
},
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
      title: "Messi vs Ronaldo Hat-tricks: Complete Analysis of Triple Goals",
      excerpt: "Detailed breakdown of all hat-tricks, big game performances and clutch moments",
      readTime: "6 min read",
      date: "Dec 7, 2024",
      category: "Big Games",
      stats: "57 vs 63 Hat-tricks",
      content: `
        <p>The ability to score hat-tricks consistently separates truly great players from the merely excellent, and both Messi and Ronaldo have demonstrated this skill throughout their careers. Ronaldo currently leads this particular category with 63 official hat-tricks across all competitions, while Messi follows closely with 57 hat-tricks. This six-hat-trick difference reflects Ronaldo's slightly greater volume of goals and his incredible consistency across multiple leagues and competitions.</p>
        
        <p>Breaking down their hat-tricks by competition reveals interesting patterns. Ronaldo holds the record for most international hat-tricks with 10 for Portugal, demonstrating his ability to single-handedly dominate matches for his national team. Messi has scored 3 international hat-tricks for Argentina, with all three coming in important World Cup qualifying matches and friendlies. At club level, Messi has 54 hat-tricks compared to Ronaldo's 51, though Ronaldo's are spread across more clubs and leagues.</p>
        
        <p>Both players have scored eight Champions League hat-tricks, sharing the record for most in the competition's history. These European performances often came on the biggest stages against elite opposition, with Messi's hat-trick against Bayern Munich and Ronaldo's treble against Atlético Madrid standing out as particularly memorable. Their ability to produce these explosive scoring performances in crucial matches has defined their careers and terrified defenders across Europe.</p>
        
        <p>When examining hat-trick frequency, Messi averages one every 17.7 games throughout his career, while Ronaldo averages one every 19.1 games. This slight edge in frequency for Messi reflects his incredible efficiency and ability to score goals in clusters. Both rates are unprecedented in modern football and demonstrate their status as once-in-a-generation goal-scorers. The consistency with which both players have produced these multi-goal performances over nearly two decades remains one of the most remarkable aspects of their legendary rivalry.</p>
      `
    },
    {
      id: 8,
      title: "Messi vs Ronaldo Free-kicks: Set Piece Statistics & Techniques",
      excerpt: "Complete analysis of free-kick goals, success rates, and technical comparison",
      readTime: "5 min read",
      date: "Dec 8, 2024",
      category: "Set Pieces",
      stats: "65 vs 60 Free-kick Goals",
      content: `
        <p>The free-kick prowess of Messi and Ronaldo represents one of the most fascinating technical comparisons in their entire rivalry, with both players developing distinct and highly effective methods from dead-ball situations. Messi currently leads this category with 65 free-kick goals throughout his career, compared to Ronaldo's 60 direct free-kick conversions. This five-goal advantage for Messi comes despite Ronaldo having taken more attempts throughout his career.</p>
        
        <p>When examining success rates, the difference becomes more pronounced. Messi converts approximately 8.5% of his free-kick attempts, having scored 65 goals from roughly 765 attempts. Ronaldo's success rate stands at around 6.2%, with 60 goals coming from approximately 970 attempts. This higher efficiency for Messi reflects his technical approach focused on precision and placement rather than pure power.</p>
        
        <p>Their technical approaches to free-kicks could hardly be more different. Messi employs a precision-based technique that emphasizes exceptional curl, dip, and placement. He typically targets areas of the goal that are physically impossible for goalkeepers to reach, using his impeccable technique to bend the ball around walls and into the corners. Ronaldo, in contrast, revolutionized free-kick taking with his powerful knuckleball technique that creates unpredictable movement in the air, making it extremely difficult for goalkeepers to judge the ball's trajectory.</p>
        
        <p>Their effectiveness from different ranges also varies significantly. Messi is most dangerous from 20-25 yards, where his accuracy and placement are virtually unstoppable. Some of his most memorable free-kicks, including his last-minute winner against Real Madrid in 2017, came from this optimal range. Ronaldo poses a threat from much greater distances, often scoring from 25-35 yards out where his powerful technique can overwhelm goalkeepers. Both approaches have produced iconic moments that will live long in football memory, demonstrating that there are multiple paths to free-kick mastery at the highest level.</p>
      `
    },
    {
      id: 9,
      title: "Messi vs Ronaldo Longevity: Career Evolution & Age Analysis",
      excerpt: "Complete timeline analysis of their career evolution and sustained excellence",
      readTime: "8 min read",
      date: "Dec 9, 2024",
      category: "Career Analysis",
      stats: "20+ Years Excellence",
      content: `
        <p>The career longevity of Messi and Ronaldo represents one of their most remarkable achievements, with both players maintaining world-class performance levels across more than two decades of professional football. Messi made his professional debut for Barcelona in 2003 at just 16 years old and continues to perform at an elite level with Inter Miami in 2024. Ronaldo's professional journey began even earlier with Sporting Lisbon in 2002, and he remains a dominant force with Al Nassr at 39 years old. This sustained excellence across 20+ years is unprecedented in modern football.</p>
        
        <p>Analyzing their peak performance periods reveals interesting patterns in their career arcs. Messi's absolute peak occurred between ages 22-28 from 2009-2015, during which he scored an incredible 379 goals in just six seasons. This period included his record-breaking 91 goals in a calendar year in 2012 and four consecutive Ballon d'Or wins. Ronaldo's peak came slightly later in his career between ages 28-33 from 2013-2018, where he scored 316 goals while leading Real Madrid to four Champions League titles in five seasons.</p>
        
        <p>Their ability to adapt and evolve their games as they aged demonstrates their football intelligence and dedication. Messi transitioned from an explosive winger in his early years to a false nine during his peak, and eventually to a deeper-lying playmaker in his later career. This evolution allowed him to maintain his creative influence even as his physical attributes naturally declined. Ronaldo transformed from a tricky, skills-based winger to a complete forward, and finally to a pure penalty-box predator focused on maximizing his goal-scoring efficiency.</p>
        
        <p>Their late-career achievements are particularly impressive given the physical demands of modern football. Messi won his eighth Ballon d'Or at age 36 after leading Argentina to World Cup glory, while Ronaldo continues to score at a remarkable rate in his late 30s, netting over 100 goals after turning 35. Both players have redefined what's possible in terms of career length and late-career performance, setting new standards for future generations of footballers.</p>
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