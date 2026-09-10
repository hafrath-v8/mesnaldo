import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Image from "next/image"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"
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
title="Messi vs Ronaldo Individual Awards | 100+ Honours Compared"
      description="Every individual honour: Ballon d'Or (8-5), FIFA Best, Golden Shoe, Pichichi, Champions League top scorer, and 100+ more. Complete Messi vs Ronaldo honours comparison."
    >
      <BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "Honours", url: "/honours" },
  ]}
/>
      <div className="bg-black min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          
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
{/* =========================================================
    SEO CONTENT SECTION - INDIVIDUAL AWARDS PAGE
========================================================= */}

<section className="mt-20 pt-14 border-t border-gray-800/50">
  <div className="max-w-4xl mx-auto">

    <h2 className="text-2xl sm:text-3xl font-black text-white mb-7 text-center">
      Messi vs Ronaldo Individual Awards: Complete Career Honours Comparison
    </h2>

    <div className="space-y-7 text-sm text-gray-400 leading-8">

      {/* INTRO */}

      <p>
        The <strong className="text-white">Messi vs Ronaldo individual awards</strong>{" "}
        comparison shows how often Lionel Messi and Cristiano Ronaldo have been
        recognised for their personal performances throughout their careers.
        While team trophies measure collective success, individual awards focus
        more directly on the achievements of the player.
      </p>

      <p>
        Both football legends have collected major honours across world,
        continental, league and tournament competitions. Their individual
        records include Ballon d&apos;Or awards, FIFA player awards, European
        Golden Shoes, league top-scorer awards, UEFA honours, World Cup
        individual awards and many other recognitions.
      </p>

      <p>
        This page compares those awards category by category so that the
        Messi vs Ronaldo debate can be examined beyond goals, assists and team
        trophies.
      </p>


      {/* BALLON D'OR */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Ballon d&apos;Or Awards
      </h3>

      <p>
        The Ballon d&apos;Or is one of the most recognised individual awards in
        football. Lionel Messi has won{" "}
        <strong className="text-blue-400">8 Ballon d&apos;Or awards</strong>,
        while Cristiano Ronaldo has won{" "}
        <strong className="text-red-400">5</strong>.
      </p>

      <p>
        Messi&apos;s victories came in 2009, 2010, 2011, 2012, 2015, 2019,
        2021 and 2023. Ronaldo won in 2008, 2013, 2014, 2016 and 2017.
      </p>

      <p>
        These awards show the remarkable length of their rivalry. Both players
        repeatedly returned to the highest level of individual recognition
        across different stages of their careers.
      </p>


      {/* FIFA BEST */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo FIFA Best Player Awards
      </h3>

      <p>
        FIFA&apos;s major individual player awards are another important part of
        the comparison. According to the categories listed on this page,
        Messi has{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(
            a => a.title === "FIFA The Best / World Player of the Year"
          )?.messi.count ?? 0}
        </strong>{" "}
        wins in this combined category, while Ronaldo has{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(
            a => a.title === "FIFA The Best / World Player of the Year"
          )?.ronaldo.count ?? 0}
        </strong>.
      </p>

      <p>
        FIFA&apos;s award structure has changed over time, so historical
        comparisons should always consider the name and format of the award in
        each era rather than treating every season as identical.
      </p>


      {/* GOLDEN SHOE */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo European Golden Shoe Awards
      </h3>

      <p>
        The European Golden Shoe recognises the leading league scorer across
        European domestic competitions. Messi has won{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "European Golden Shoe")?.messi.count ?? 0}
        </strong>{" "}
        European Golden Shoes, while Ronaldo has won{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "European Golden Shoe")?.ronaldo.count ?? 0}
        </strong>.
      </p>

      <p>
        This award is especially useful in the Messi vs Ronaldo comparison
        because it reflects league scoring performance across multiple seasons
        rather than a single tournament.
      </p>


      {/* WORLD CUP */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo World Cup Individual Awards
      </h3>

      <p>
        World Cup individual awards highlight performances on football&apos;s
        biggest international stage. The awards listed on this page include
        categories such as the FIFA World Cup Golden Ball, Silver Ball and
        Silver Boot.
      </p>

      <p>
        Messi has multiple World Cup individual honours recorded in the
        comparison, while Ronaldo has fewer in these specific categories.
        Tournament awards should be considered separately from career-long
        awards because they reflect performance during one competition rather
        than an entire season.
      </p>


      {/* INTERNATIONAL */}

      <h3 className="text-xl font-bold text-white mt-10">
        International Tournament Individual Awards
      </h3>

      <p>
        The page also includes individual honours from major international
        competitions. Messi&apos;s list contains Copa América awards, while
        Ronaldo&apos;s includes European Championship and UEFA Nations League
        honours.
      </p>

      <p>
        These categories are not directly identical because Messi represents
        Argentina in CONMEBOL competitions and Ronaldo represents Portugal in
        UEFA competitions. They are best interpreted as evidence of individual
        performance within each player&apos;s international environment.
      </p>


      {/* UCL TOP SCORER */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo Champions League Top Scorer Awards
      </h3>

      <p>
        Cristiano Ronaldo has finished as Champions League top scorer{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "Champions League Top Scorer")
            ?.ronaldo.count ?? 0}
        </strong>{" "}
        times in the comparison, while Messi has done so{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "Champions League Top Scorer")
            ?.messi.count ?? 0}
        </strong>{" "}
        times.
      </p>

      <p>
        This category is particularly significant because both players were
        dominant Champions League scorers during much of the same era.
      </p>


      {/* DOMESTIC TOP SCORERS */}

      <h3 className="text-xl font-bold text-white mt-10">
        League Top Scorer Awards
      </h3>

      <p>
        Domestic top-scorer awards provide another direct comparison of their
        finishing ability. Messi has multiple Pichichi awards from La Liga,
        while Ronaldo&apos;s career includes top-scorer honours in La Liga,
        the Premier League, Serie A and the Saudi Pro League.
      </p>

      <p>
        The page also records Messi&apos;s MLS top-scorer achievement. These
        awards show how the two players continued to produce scoring success
        across different leagues and stages of their careers.
      </p>


      {/* UEFA AWARDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo UEFA Individual Awards
      </h3>

      <p>
        UEFA awards provide recognition specifically for performances in
        European football. The comparison includes UEFA Club Footballer of
        the Year, UEFA Best Player in Europe and UEFA Best Forward in Europe.
      </p>

      <p>
        Messi and Ronaldo both won major UEFA individual awards during their
        peak years, showing how strongly their rivalry shaped European club
        football.
      </p>


      {/* LEAGUE PLAYER AWARDS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Domestic League Player of the Year Awards
      </h3>

      <p>
        Individual success was not limited to global awards. Messi earned
        numerous La Liga player and forward awards, while Ronaldo collected
        major honours in the Premier League, La Liga and Serie A.
      </p>

      <p>
        These league-specific awards help show how each player was viewed
        within the domestic competitions where he played rather than only at
        the global level.
      </p>


      {/* FIFPRO */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo FIFPro World XI Appearances
      </h3>

      <p>
        FIFPro World XI selections provide another measure of long-term elite
        recognition. Messi has{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "FIFPro World XI Appearances")
            ?.messi.count ?? 0}
        </strong>{" "}
        appearances listed on this page, while Ronaldo has{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "FIFPro World XI Appearances")
            ?.ronaldo.count ?? 0}
        </strong>.
      </p>

      <p>
        Repeated inclusion in an elite world team is useful when discussing
        longevity because it shows that both players remained among the most
        highly rated footballers over many seasons.
      </p>


      {/* IFFHS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo IFFHS Awards
      </h3>

      <p>
        The page also compares several IFFHS honours, including best
        playmaker, top goalscorer, international goalscorer and top-division
        goalscorer awards.
      </p>

      <p>
        These categories highlight different strengths. Some reward creative
        production, while others focus on goals across club or international
        football.
      </p>


      {/* PUSKAS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Messi vs Ronaldo FIFA Puskás Award
      </h3>

      <p>
        Cristiano Ronaldo has won the FIFA Puskás Award{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "FIFA Puskás Award")
            ?.ronaldo.count ?? 0}
        </strong>{" "}
        time in the comparison, while Messi has{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "FIFA Puskás Award")
            ?.messi.count ?? 0}
        </strong>{" "}
        wins.
      </p>

      <p>
        The page also records Puskás Award nominations separately, which is
        useful because winning the award and simply reaching the final
        nomination stages are different achievements.
      </p>


      {/* PLAYMAKING */}

      <h3 className="text-xl font-bold text-white mt-10">
        Playmaking Awards
      </h3>

      <p>
        Individual awards can also reveal differences in playing style. Messi
        has several IFFHS World&apos;s Best Playmaker honours in the current
        dataset, reflecting his role not only as a scorer but also as a
        creator.
      </p>

      <p>
        Ronaldo&apos;s award profile contains a particularly strong collection
        of goalscoring and forward-related honours, reflecting the evolution
        of his career toward becoming one of football&apos;s most prolific
        finishers.
      </p>


      {/* LONGEVITY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Longevity of Messi and Ronaldo&apos;s Individual Success
      </h3>

      <p>
        One of the most remarkable aspects of this comparison is the length of
        time both players remained competitive for major individual honours.
        Their awards span many years, leagues, clubs and international
        tournaments.
      </p>

      <p>
        This long period of recognition is important because peak performance
        for one or two seasons is different from maintaining elite standards
        across a large part of a career.
      </p>


      {/* CATEGORY LEADERS */}

      <h3 className="text-xl font-bold text-white mt-10">
        Who Leads More Individual Award Categories?
      </h3>

      <p>
        Across the award categories currently listed on this page, Messi leads{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.filter(a => a.messi.count > a.ronaldo.count).length}
        </strong>{" "}
        categories, Ronaldo leads{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.filter(a => a.ronaldo.count > a.messi.count).length}
        </strong>,
        and{" "}
        <strong className="text-white">
          {MAJOR_AWARDS.filter(a => a.messi.count === a.ronaldo.count).length}
        </strong>{" "}
        categories are tied.
      </p>

      <p>
        This does not mean every category has equal importance. A Ballon
        d&apos;Or, a league scoring award, a nomination and a regional award
        measure different achievements. The category count is best used as an
        overview rather than a single definitive ranking.
      </p>


      {/* WHY COUNTS ARE TRICKY */}

      <h3 className="text-xl font-bold text-white mt-10">
        Why Total Individual Award Counts Can Be Misleading
      </h3>

      <p>
        Unlike goals or appearances, individual awards cannot always be added
        together into one simple career total. Some awards are global, some
        are regional, some are tournament-specific, and others represent
        nominations or second-place finishes rather than outright victories.
      </p>

      <p>
        Some organisations have also changed award names and formats over
        time. For that reason, comparing the individual categories directly is
        usually more meaningful than presenting one giant combined number.
      </p>


      {/* AWARDS VS TROPHIES */}

      <h3 className="text-xl font-bold text-white mt-10">
        Individual Awards vs Team Trophies
      </h3>

      <p>
        Individual awards and team trophies measure different types of
        achievement. A Champions League or league title belongs to a team,
        while the Ballon d&apos;Or, Golden Shoe or player-of-the-year award
        recognises one player.
      </p>

      <p>
        A balanced Messi vs Ronaldo comparison should therefore examine both.
        Team honours show collective success, while individual awards provide
        stronger evidence of how consistently each player was recognised for
        personal performance.
      </p>


      {/* FAQ */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Individual Awards FAQ
      </h2>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Ballon d&apos;Or awards, Messi or Ronaldo?
      </h3>

      <p>
        Lionel Messi has won{" "}
        <strong className="text-blue-400">8 Ballon d&apos;Or awards</strong>,
        compared with Cristiano Ronaldo&apos;s{" "}
        <strong className="text-red-400">5</strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many European Golden Shoes has Messi won?
      </h3>

      <p>
        Messi has won{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "European Golden Shoe")
            ?.messi.count ?? 0}
        </strong>{" "}
        European Golden Shoes according to the award data on this page.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        How many European Golden Shoes has Ronaldo won?
      </h3>

      <p>
        Ronaldo has won{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "European Golden Shoe")
            ?.ronaldo.count ?? 0}
        </strong>{" "}
        European Golden Shoes.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more Champions League top-scorer awards?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "Champions League Top Scorer")
            ?.messi.count ?? 0}
        </strong>{" "}
        Champions League top-scorer finishes, while Ronaldo has{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "Champions League Top Scorer")
            ?.ronaldo.count ?? 0}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Who has more FIFPro World XI appearances?
      </h3>

      <p>
        Messi has{" "}
        <strong className="text-blue-400">
          {MAJOR_AWARDS.find(a => a.title === "FIFPro World XI Appearances")
            ?.messi.count ?? 0}
        </strong>{" "}
        appearances listed in this comparison, while Ronaldo has{" "}
        <strong className="text-red-400">
          {MAJOR_AWARDS.find(a => a.title === "FIFPro World XI Appearances")
            ?.ronaldo.count ?? 0}
        </strong>.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Does this page include only major global awards?
      </h3>

      <p>
        No. The comparison includes global awards, continental honours,
        tournament awards, league-specific prizes, scoring awards and several
        other recognised individual distinctions. Because these categories
        have different importance and criteria, they are displayed separately
        rather than treated as identical.
      </p>


      <h3 className="text-lg font-bold text-white mt-8">
        Are team trophies included in this individual awards comparison?
      </h3>

      <p>
        No. This page focuses on individual honours. Team trophies such as
        league titles, Champions League titles and international championships
        should be compared separately on the trophies page.
      </p>


      {/* CONCLUSION */}

      <h2 className="text-2xl font-black text-white mt-14">
        Messi vs Ronaldo Awards Comparison
      </h2>

      <p>
        Lionel Messi and Cristiano Ronaldo have accumulated an extraordinary
        range of individual awards across more than two decades of elite
        football. Their honours recognise scoring, playmaking, tournament
        performances, league performances and overall excellence.
      </p>

      <p>
        Messi holds the advantage in several major categories, including the
        Ballon d&apos;Or and European Golden Shoe, while Ronaldo leads or
        remains highly competitive in several scoring, UEFA and league-related
        awards.
      </p>

      <p>
        The strongest comparison comes from looking at each award separately.
        Rather than treating every honour as equal, Mesnaldo allows visitors
        to compare the type of award, number of wins and the years in which
        each player received it.
      </p>

    </div>
  </div>
</section>
        </div>
      </div>
    </Layout>
  )
}