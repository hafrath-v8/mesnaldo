import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Image from "next/image"
import { Trophy, Award, Star, Medal, ChevronDown, Crown } from "lucide-react"
import { useState } from "react"

const MAJOR_AWARDS = [
  { title: "Ballon d'Or", icon: Trophy, messi: { count: 8, details: "2009, 2010, 2011, 2012*, 2015*, 2019, 2021, 2023", years: [2009,2010,2011,2012,2015,2019,2021,2023] }, ronaldo: { count: 5, details: "2008, 2013*, 2014*, 2016, 2017", years: [2008,2013,2014,2016,2017] }, note: "*Merged with FIFA World Player of the Year" },
  { title: "FIFA The Best / World Player of the Year", icon: Award, messi: { count: 8, details: "2009, 2010, 2011, 2012, 2015, 2019, 2022, 2023", years: [2009,2010,2011,2012,2015,2019,2022,2023] }, ronaldo: { count: 5, details: "2008, 2013, 2014, 2016, 2017", years: [2008,2013,2014,2016,2017] } },
  { title: "European Golden Shoe", icon: Star, messi: { count: 6, details: "2010 (34), 2012 (50), 2013 (46), 2017 (37), 2018 (34), 2019 (36)", years: [2010,2012,2013,2017,2018,2019] }, ronaldo: { count: 4, details: "2008 (31), 2011 (40), 2014 (31), 2015 (48)", years: [2008,2011,2014,2015] } },
  { title: "FIFA World Cup Golden Ball", icon: Medal, messi: { count: 2, details: "2014, 2022", years: [2014,2022] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "FIFA World Cup Silver Ball", icon: Medal, messi: { count: 1, details: "2026", years: [2026] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "FIFA World Cup Silver Boot", icon: Star, messi: { count: 2, details: "2022, 2026", years: [2022,2026] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "FIFA World Player of the Year 2nd Place", icon: Award, messi: { count: 7, details: "2007, 2008, 2013, 2014, 2016, 2017, 2021", years: [2007,2008,2013,2014,2016,2017,2021] }, ronaldo: { count: 6, details: "2009, 2011, 2012, 2015, 2018, 2020", years: [2009,2011,2012,2015,2018,2020] } },
  { title: "FIFA World Player of the Year 3rd Place", icon: Award, messi: { count: 1, details: "2020", years: [2020] }, ronaldo: { count: 2, details: "2007, 2019", years: [2007,2019] } },
  { title: "FIFA The Best Special Award", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2021 (International goals record)", years: [2021] } },
  { title: "Copa América Golden Ball", icon: Trophy, messi: { count: 2, details: "2015, 2021", years: [2015,2021] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Copa América Golden Boot", icon: Star, messi: { count: 1, details: "2021", years: [2021] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Copa América Best Young Player", icon: Star, messi: { count: 1, details: "2007", years: [2007] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "UEFA Euros Golden Boot", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2021", years: [2021] } },
  { title: "UEFA Euros Silver Boot", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2016", years: [2016] } },
  { title: "UEFA Nations League Finals Golden Boot", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2019", years: [2019] } },
  { title: "UEFA Nations League Goal of the Tournament", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2019", years: [2019] } },
  { title: "Champions League Top Scorer", icon: Star, messi: { count: 6, details: "2008/09, 2009/10, 2010/11, 2011/12, 2014/15, 2018/19", years: [2009,2010,2011,2012,2015,2019] }, ronaldo: { count: 7, details: "2007/08, 2012/13, 2013/14, 2014/15, 2015/16, 2016/17, 2017/18", years: [2008,2013,2014,2015,2016,2017,2018] } },
  { title: "La Liga Top Scorer (Pichichi)", icon: Trophy, messi: { count: 8, details: "2009/10, 2011/12, 2012/13, 2016/17, 2017/18, 2018/19, 2019/20, 2020/21", years: [2010,2012,2013,2017,2018,2019,2020,2021] }, ronaldo: { count: 3, details: "2010/11, 2013/14, 2014/15", years: [2011,2014,2015] } },
  { title: "Premier League Top Scorer", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2007/08", years: [2008] } },
  { title: "Serie A Top Scorer", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2020/21", years: [2021] } },
  { title: "MLS Top Scorer", icon: Star, messi: { count: 1, details: "2025", years: [2025] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Saudi Pro League Top Scorer", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 2, details: "2023/24, 2024/25", years: [2024,2025] } },
  { title: "Ballon d'Or 2nd Place (Silver Ball)", icon: Award, messi: { count: 5, details: "2008, 2013, 2014, 2016, 2017", years: [2008,2013,2014,2016,2017] }, ronaldo: { count: 6, details: "2007, 2009, 2011, 2012, 2015, 2018", years: [2007,2009,2011,2012,2015,2018] } },
  { title: "Ballon d'Or 3rd Place (Bronze Ball)", icon: Award, messi: { count: 1, details: "2007", years: [2007] }, ronaldo: { count: 1, details: "2019", years: [2019] } },
  { title: "Ballon d'Or Dream Team", icon: Star, messi: { count: 1, details: "2020", years: [2020] }, ronaldo: { count: 1, details: "2020", years: [2020] } },
  { title: "Ballon d'Or Nominations", icon: Star, messi: { count: 16, details: "2006-2019, 2021, 2023", years: [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2021,2023] }, ronaldo: { count: 18, details: "2004-2019, 2021, 2022", years: [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2021,2022] } },
  { title: "Golden Boy", icon: Star, messi: { count: 1, details: "2005", years: [2005] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Bravo Award", icon: Award, messi: { count: 1, details: "2007", years: [2007] }, ronaldo: { count: 1, details: "2004", years: [2004] } },
  { title: "FIFA U20 World Cup Golden Ball", icon: Medal, messi: { count: 1, details: "2005", years: [2005] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "FIFA U20 World Cup Golden Boot", icon: Star, messi: { count: 1, details: "2005", years: [2005] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Laureus Sportsman of the Year", icon: Trophy, messi: { count: 2, details: "2020, 2023", years: [2020,2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "L'Équipe Champion of Champions", icon: Trophy, messi: { count: 2, details: "2011, 2022", years: [2011,2022] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "World Soccer Best Player", icon: Trophy, messi: { count: 6, details: "2009, 2011, 2012, 2015, 2019, 2022", years: [2009,2011,2012,2015,2019,2022] }, ronaldo: { count: 5, details: "2008, 2013, 2014, 2016, 2017", years: [2008,2013,2014,2016,2017] } },
  { title: "Onze d'Or", icon: Award, messi: { count: 4, details: "2009, 2011, 2012, 2019", years: [2009,2011,2012,2019] }, ronaldo: { count: 2, details: "2008, 2017", years: [2008,2017] } },
  { title: "Globe Soccer Best Player", icon: Trophy, messi: { count: 1, details: "2015", years: [2015] }, ronaldo: { count: 6, details: "2011, 2014, 2016, 2017, 2018, 2019", years: [2011,2014,2016,2017,2018,2019] } },
  { title: "Globe Soccer Best Player of the Century", icon: Trophy, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2001-2020", years: [2020] } },
  { title: "Globe Soccer Top Goal Scorer of All Time", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2021", years: [2021] } },
  { title: "TIME Athlete of the Year", icon: Star, messi: { count: 1, details: "2023", years: [2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "UEFA Club Footballer of the Year", icon: Award, messi: { count: 1, details: "2009", years: [2009] }, ronaldo: { count: 1, details: "2008", years: [2008] } },
  { title: "UEFA Best Player in Europe", icon: Award, messi: { count: 2, details: "2010/11, 2014/15", years: [2011,2015] }, ronaldo: { count: 3, details: "2013/14, 2015/16, 2016/17", years: [2014,2016,2017] } },
  { title: "UEFA Best Forward in Europe", icon: Star, messi: { count: 2, details: "2008/09, 2018/19", years: [2009,2019] }, ronaldo: { count: 3, details: "2007/08, 2016/17, 2017/18", years: [2008,2017,2018] } },
  { title: "La Liga Best Player", icon: Trophy, messi: { count: 6, details: "2008/09, 2009/10, 2010/11, 2011/12, 2012/13, 2014/15", years: [2009,2010,2011,2012,2013,2015] }, ronaldo: { count: 1, details: "2013/14", years: [2014] } },
  { title: "La Liga Best Forward", icon: Star, messi: { count: 7, details: "2008/09, 2009/10, 2010/11, 2011/12, 2012/13, 2014/15, 2015/16", years: [2009,2010,2011,2012,2013,2015,2016] }, ronaldo: { count: 1, details: "2013/14", years: [2014] } },
  { title: "Trofeo Alfredo Di Stefano", icon: Trophy, messi: { count: 7, details: "2008/09, 2009/10, 2010/11, 2014/15, 2016/17, 2017/18, 2018/19", years: [2009,2010,2011,2015,2017,2018,2019] }, ronaldo: { count: 4, details: "2011/12, 2012/13, 2013/14, 2015/16", years: [2012,2013,2014,2016] } },
  { title: "Mundo Deportivo La Liga MVP", icon: Award, messi: { count: 3, details: "2017/18, 2018/19, 2019/20", years: [2018,2019,2020] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "La Liga Fans Five-Star Player", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2014/15", years: [2015] } },
  { title: "La Liga Most Valuable Player", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2012/13", years: [2013] } },
  { title: "La Liga Best Goal", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2013/14", years: [2014] } },
  { title: "Ligue 1 Best Foreign Player", icon: Award, messi: { count: 1, details: "2022/23", years: [2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Serie A Footballer of the Year", icon: Trophy, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 2, details: "2019, 2020", years: [2019,2020] } },
  { title: "Serie A Best Forward", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 2, details: "2019, 2020", years: [2019,2020] } },
  { title: "Serie A MVP", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2018/19", years: [2019] } },
  { title: "Serie A Best Striker", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2020/21", years: [2021] } },
  { title: "Premier League Player of the Season", icon: Trophy, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 2, details: "2006/07, 2007/08", years: [2007,2008] } },
  { title: "PFA Players' Player of the Year", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 2, details: "2006/07, 2007/08", years: [2007,2008] } },
  { title: "FWA Footballer of the Year", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 2, details: "2006/07, 2007/08", years: [2007,2008] } },
  { title: "Premier League Young Player of the Year", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2006/07", years: [2007] } },
  { title: "MLS MVP Award", icon: Trophy, messi: { count: 2, details: "2024, 2025", years: [2024,2025] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "FIFA Club World Cup Golden Ball", icon: Medal, messi: { count: 2, details: "2009, 2011", years: [2009,2011] }, ronaldo: { count: 1, details: "2016", years: [2016] } },
  { title: "FIFA Club World Cup Silver Ball", icon: Medal, messi: { count: 1, details: "2015", years: [2015] }, ronaldo: { count: 3, details: "2008, 2014, 2017", years: [2008,2014,2017] } },
  { title: "FIFA Puskás Award", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2009", years: [2009] } },
  { title: "FIFA Puskás Award Nominations", icon: Star, messi: { count: 7, details: "2010, 2011, 2012, 2015, 2016, 2018, 2019", years: [2010,2011,2012,2015,2016,2018,2019] }, ronaldo: { count: 2, details: "2009, 2018", years: [2009,2018] } },
  { title: "UEFA.com Goal of the Season", icon: Star, messi: { count: 4, details: "2014/15, 2015/16, 2018/19, 2022/23", years: [2015,2016,2019,2023] }, ronaldo: { count: 2, details: "2017/18, 2019/20", years: [2018,2020] } },
  { title: "FIFPro World XI Appearances", icon: Award, messi: { count: 17, details: "2007-2023", years: [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023] }, ronaldo: { count: 15, details: "2007-2021", years: [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021] } },
  { title: "IFFHS World's Best Playmaker", icon: Star, messi: { count: 5, details: "2015, 2016, 2017, 2019, 2022", years: [2015,2016,2017,2019,2022] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "IFFHS Best Top Goal Scorer", icon: Star, messi: { count: 2, details: "2012, 2016", years: [2012,2016] }, ronaldo: { count: 5, details: "2011, 2013, 2014, 2015, 2023", years: [2011,2013,2014,2015,2023] } },
  { title: "IFFHS Best International Goal Scorer", icon: Star, messi: { count: 3, details: "2011, 2012, 2022", years: [2011,2012,2022] }, ronaldo: { count: 5, details: "2013, 2014, 2016, 2017, 2019", years: [2013,2014,2016,2017,2019] } },
  { title: "IFFHS Best Top Division Goal Scorer", icon: Star, messi: { count: 4, details: "2012, 2013, 2017, 2018", years: [2012,2013,2017,2018] }, ronaldo: { count: 3, details: "2014, 2015, 2020", years: [2014,2015,2020] } },
  { title: "IFFHS Best Player (since 2020)", icon: Award, messi: { count: 1, details: "2022", years: [2022] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "IFFHS Best Player of the Decade", icon: Award, messi: { count: 1, details: "2011-2020", years: [2020] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Olimpia de Plata (Argentine POTY)", icon: Award, messi: { count: 16, details: "2005, 2007-2017, 2019-2023", years: [2005,2007,2008,2009,2010,2011,2012,2013,2015,2016,2017,2019,2020,2021,2022,2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Olimpia de Oro (Argentine Sportsperson)", icon: Trophy, messi: { count: 4, details: "2011, 2021, 2022, 2023", years: [2011,2021,2022,2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "CNID Best Portuguese Athlete Abroad", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 10, details: "2007-2018", years: [2007,2008,2009,2011,2012,2013,2015,2016,2017,2018] } },
  { title: "Quinas de Ouro (Portugal POTY)", icon: Trophy, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 5, details: "2015, 2016, 2017, 2018, 2019", years: [2015,2016,2017,2018,2019] } },
  { title: "Globo de Ouro Portuguese Sportsman", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 11, details: "2007-2019", years: [2007,2008,2009,2011,2012,2014,2015,2016,2017,2018,2019] } },
  { title: "Golden Foot", icon: Award, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2020", years: [2020] } },
  { title: "Marca Leyenda", icon: Trophy, messi: { count: 1, details: "2009", years: [2009] }, ronaldo: { count: 1, details: "2019", years: [2019] } },
  { title: "Marca Most Titles of All Time", icon: Award, messi: { count: 1, details: "2024", years: [2024] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Marca Champions League No 1 Award", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2016", years: [2016] } },
  { title: "Guardian Top 100 Best Player", icon: Star, messi: { count: 6, details: "2012, 2013, 2015, 2017, 2019, 2022", years: [2012,2013,2015,2017,2019,2022] }, ronaldo: { count: 2, details: "2014, 2016", years: [2014,2016] } },
  { title: "CONMEBOL Baton of Football", icon: Award, messi: { count: 1, details: "2023", years: [2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Leagues Cup Best Player", icon: Trophy, messi: { count: 1, details: "2023", years: [2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Leagues Cup Golden Boot", icon: Star, messi: { count: 1, details: "2023", years: [2023] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "Arab Club Champions Cup Golden Boot", icon: Star, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "2023", years: [2023] } },
  { title: "FIFPro Young Player of the Year", icon: Star, messi: { count: 1, details: "2006", years: [2006] }, ronaldo: { count: 0, details: "—", years: [] } },
  { title: "FPF Best Portuguese Player of All Time", icon: Crown, messi: { count: 0, details: "—", years: [] }, ronaldo: { count: 1, details: "All time", years: [] } },
  { title: "Argentine Athlete of the Decade", icon: Award, messi: { count: 1, details: "2010-2020", years: [2020] }, ronaldo: { count: 0, details: "—", years: [] } },
]

export default function Awards() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <Layout 
      title="Individual Honours - Messi vs Ronaldo | 100+ Awards Compared"
      description="Every individual honour: Ballon d'Or (8-5), FIFA Best, Golden Shoe, Pichichi, Champions League top scorer, and 100+ more. Complete Messi vs Ronaldo honours comparison."
    >
      <div className="bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          
         {/* Title Card */}
{/* Title Card - Professional */}
<div className="relative rounded-2xl overflow-hidden mb-12 bg-gray-900/90 border border-gray-800">
  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/60 via-amber-400/60 to-red-500/60" />
  
  <div className="p-8 sm:p-10">
    
    {/* Top Section */}
    <div className="flex items-center justify-center gap-6 mb-10">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-blue-500/40" />
      <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.25em] font-medium">Honours Comparison</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-red-500/20 to-red-500/40" />
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-7 items-center gap-4 max-w-2xl mx-auto">
      
      {/* Messi Column */}
      <div className="col-span-3 text-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <Image src="/images/messi.webp" alt="Messi" fill className="object-cover grayscale-[20%]" />
          </div>
        </div>
        <div>
          <p className="text-sm sm:text-base font-bold text-white tracking-tight">Lionel Messi</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Argentina</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-[10px] text-gray-600">8x Ballon d'Or</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="col-span-1 flex flex-col items-center">
        <div className="w-px h-6 bg-gradient-to-b from-blue-500/30 via-amber-400/30 to-red-500/30" />
        <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center my-2">
          <span className="text-xs font-black text-amber-400">VS</span>
        </div>
        <div className="w-px h-6 bg-gradient-to-b from-red-500/30 via-amber-400/30 to-blue-500/30" />
      </div>

      {/* Ronaldo Column */}
      <div className="col-span-3 text-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-red-500/20" />
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <Image src="/images/ronaldo.webp" alt="Ronaldo" fill className="object-cover grayscale-[20%]" />
          </div>
        </div>
        <div>
          <p className="text-sm sm:text-base font-bold text-white tracking-tight">Cristiano Ronaldo</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Portugal</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="w-1 h-1 rounded-full bg-red-400" />
            <span className="text-[10px] text-gray-600">5x Ballon d'Or</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Stats Bar */}
    <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-gray-800/50">
      <div className="text-center">
        <p className="text-lg font-bold text-blue-400">
          {MAJOR_AWARDS.filter(a => a.messi.count > a.ronaldo.count).length}
        </p>
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">Messi</p>
      </div>
      <div className="w-px h-8 bg-gray-800" />
      <div className="text-center">
        <p className="text-lg font-bold text-gray-400">
          {MAJOR_AWARDS.filter(a => a.messi.count === a.ronaldo.count).length}
        </p>
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">Tied</p>
      </div>
      <div className="w-px h-8 bg-gray-800" />
      <div className="text-center">
        <p className="text-lg font-bold text-red-400">
          {MAJOR_AWARDS.filter(a => a.ronaldo.count > a.messi.count).length}
        </p>
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">Ronaldo</p>
      </div>
    </div>

  </div>
</div>

          {/* Awards List */}
          <div className="space-y-1.5">
            {MAJOR_AWARDS.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.008 }}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center gap-4 py-4 px-5 sm:px-6 rounded-xl hover:bg-gray-900/50 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <award.icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/70" />
                  </div>
                  <span className="text-sm sm:text-[15px] text-gray-300 flex-1 truncate font-medium">{award.title}</span>
                  <span className={`text-sm sm:text-base font-bold w-10 text-center tabular-nums ${award.messi.count > award.ronaldo.count ? 'text-blue-400' : 'text-gray-500'}`}>{award.messi.count}</span>
                  <span className="text-[11px] text-gray-700 font-medium">—</span>
                  <span className={`text-sm sm:text-base font-bold w-10 text-center tabular-nums ${award.ronaldo.count > award.messi.count ? 'text-red-400' : 'text-gray-500'}`}>{award.ronaldo.count}</span>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-transform duration-200 flex-shrink-0 ${expanded === i ? 'rotate-180' : ''}`} />
                </button>

                {expanded === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-4 sm:mx-6 mb-2 px-5 sm:px-6 py-4 sm:py-5 bg-gray-900/50 rounded-xl border border-gray-800/50">
                    {award.note && <p className="text-[11px] sm:text-xs text-amber-400/70 mb-4">{award.note}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="bg-blue-500/5 rounded-xl p-4 sm:p-5 border border-blue-500/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex-shrink-0 border border-blue-500/30">
                            <Image src="/images/messi.webp" alt="" width={28} height={28} />
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-blue-400">Lionel Messi</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{award.messi.details}</p>
                      </div>
                      <div className="bg-red-500/5 rounded-xl p-4 sm:p-5 border border-red-500/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex-shrink-0 border border-red-500/30">
                            <Image src="/images/ronaldo.webp" alt="" width={28} height={28} />
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-red-400">Cristiano Ronaldo</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{award.ronaldo.details}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
{/* SEO Content Section */}
<div className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-3xl">
    
    {/* Section Title */}
    <div className="mb-10">
      <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
        Messi vs Ronaldo Individual Awards
      </h2>
      <p className="text-sm text-gray-500">
        The complete record of football's two most decorated players
      </p>
    </div>

    {/* Two Column Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
      
      {/* Messi Column */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-blue-500/30 flex-shrink-0">
            <Image src="/images/messi.webp" alt="Messi" width={28} height={28} className="object-cover" />
          </div>
          <h3 className="text-base font-bold text-blue-400">Lionel Messi</h3>
        </div>
        <p className="text-sm text-gray-400 leading-7">
          Lionel Messi has won a record <strong className="text-white">8 Ballon d'Or awards</strong> — the most in football history — spanning 2009, 2010, 2011, 2012, 2015, 2019, 2021, and 2023. He also holds <strong className="text-white">8 FIFA World Player of the Year / The Best awards</strong>, making him the most decorated individual player the sport has ever seen.
        </p>
        <p className="text-sm text-gray-400 leading-7 mt-4">
          Messi has claimed the <strong className="text-white">European Golden Shoe 6 times</strong>, the <strong className="text-white">Pichichi (La Liga top scorer) 8 times</strong>, and the <strong className="text-white">Champions League top scorer award 6 times</strong>. On the international stage, he won <strong className="text-white">2 FIFA World Cup Golden Balls</strong> (2014, 2022), <strong className="text-white">2 Copa América Golden Balls</strong>, and the <strong className="text-white">Laureus World Sportsman of the Year award twice</strong>.
        </p>
        <p className="text-sm text-gray-400 leading-7 mt-4">
          With <strong className="text-white">17 FIFPro World XI appearances</strong>, <strong className="text-white">16 Olimpia de Plata awards</strong>, and numerous other individual honours, Messi's trophy cabinet stands alone at the pinnacle of football history.
        </p>
      </div>

      {/* Ronaldo Column */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-red-500/30 flex-shrink-0">
            <Image src="/images/ronaldo.webp" alt="Ronaldo" width={28} height={28} className="object-cover" />
          </div>
          <h3 className="text-base font-bold text-red-400">Cristiano Ronaldo</h3>
        </div>
        <p className="text-sm text-gray-400 leading-7">
          Cristiano Ronaldo has won <strong className="text-white">5 Ballon d'Or awards</strong> (2008, 2013, 2014, 2016, 2017) and <strong className="text-white">5 FIFA World Player of the Year / The Best awards</strong>. He is the <strong className="text-white">Champions League all-time top scorer</strong> with 140+ goals and has won the <strong className="text-white">UCL top scorer award a record 7 times</strong>.
        </p>
        <p className="text-sm text-gray-400 leading-7 mt-4">
          Ronaldo has claimed the <strong className="text-white">European Golden Shoe 4 times</strong>, the <strong className="text-white">Pichichi 3 times</strong>, and made history as the <strong className="text-white">first player to win league top scorer awards</strong> in the Premier League, La Liga, and Serie A. He also won the <strong className="text-white">UEFA Euros Golden Boot in 2021</strong> and the <strong className="text-white">Globe Soccer Best Player award 6 times</strong>.
        </p>
        <p className="text-sm text-gray-400 leading-7 mt-4">
          With <strong className="text-white">15 FIFPro World XI appearances</strong>, the <strong className="text-white">Guinness World Record for most international goals</strong> (135+), and <strong className="text-white">5 Portuguese Player of the Year awards</strong>, Ronaldo's individual legacy is cemented across four different countries.
        </p>
      </div>
    </div>

    {/* Bottom Summary */}
    <div className="mt-14 pt-10 border-t border-gray-800/50">
      <h3 className="text-lg font-bold text-amber-400 mb-5">
        The Verdict: Who Has More Individual Awards?
      </h3>
      <div className="space-y-4 text-sm text-gray-400 leading-7">
        <p>
          When comparing <strong className="text-white">Messi vs Ronaldo individual awards</strong>, Messi leads in the most prestigious categories — Ballon d'Or (8-5), FIFA Best (8-5), European Golden Shoes (6-4), and La Liga top scorer titles (8-3). His dominance in playmaking is reflected in his <strong className="text-white">5 IFFHS Best Playmaker awards</strong>, a category Ronaldo has never won.
        </p>
        <p>
          However, Ronaldo holds the edge in <strong className="text-white">Champions League top scorer awards (7-6)</strong>, <strong className="text-white">Globe Soccer Awards (6-1)</strong>, and league-specific honours across <strong className="text-white">four different countries</strong> — a testament to his remarkable versatility. He also leads in <strong className="text-white">Ballon d'Or nominations (18-16)</strong>.
        </p>
        <p>
          Ultimately, Messi holds more individual awards overall, but both players have accumulated trophy collections that may never be surpassed. The debate over individual superiority depends on which honours you value most — but one thing is certain: <strong className="text-white">football has never seen two players this decorated compete in the same era.</strong>
        </p>
      </div>
    </div>

  </div>
</div>
        </div>
      </div>
    </Layout>
  )
}