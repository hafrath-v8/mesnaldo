"use client";
import { useState } from "react";

export default function AchievementsArticle() {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="max-w-5xl mt-4 mx-auto bg-gray-900 text-gray-200 p-6 rounded-xl shadow-lg leading-relaxed">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-amber-400 mb-4">
        Messi vs Ronaldo: Career Achievements, Awards, and Records
      </h1>

      {/* Content wrapper with read-more on mobile */}
      <div
        className={`sm:max-h-none sm:overflow-visible transition-all duration-500 ${
          expanded ? "max-h-[4000px]" : "max-h-60 overflow-hidden"
        } sm:max-h-none`}
      >
        {/* Intro */}
        <p className="mb-4">
          When football fans debate about greatness, the discussion often begins
          and ends with{" "}
          <span className="text-amber-400 font-semibold">Lionel Messi</span> and{" "}
          <span className="text-amber-400 font-semibold">Cristiano Ronaldo</span>.
          Beyond goals and assists, their careers are defined by an astonishing
          number of{" "}
          <span className="text-amber-400 font-semibold">
            trophies, individual awards, and world records
          </span>. On this page, we take a detailed look at their
          achievements—showing why both can rightfully be called legends of the
          game.
        </p>

        {/* Team Achievements */}
        <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
          Team Achievements
        </h2>
        <p className="mb-4">
          Both Messi and Ronaldo have lifted the{" "}
          <span className="text-amber-400 font-semibold">
            UEFA Champions League
          </span>{" "}
          multiple times, proving their dominance on Europe’s biggest stage. Messi
          achieved Champions League glory{" "}
          <span className="text-amber-400 font-semibold">4 times</span> with FC
          Barcelona, while Ronaldo became the competition’s all-time top scorer,
          winning it{" "}
          <span className="text-amber-400 font-semibold">5 times</span> with
          Manchester United and Real Madrid.
        </p>
        <p className="mb-4">
          Domestically, Messi won{" "}
          <span className="text-amber-400 font-semibold">
            10 La Liga titles and 7 Copa del Rey trophies
          </span>{" "}
          with Barcelona, while Ronaldo conquered{" "}
          <span className="text-amber-400 font-semibold">
            3 Premier League titles, 2 La Liga crowns, and 2 Serie A championships
          </span>
          . Their ability to win across different leagues shows just how adaptable
          they are.
        </p>
        <p className="mb-4">
          On the international stage, Messi finally lifted the{" "}
          <span className="text-amber-400 font-semibold">
            FIFA World Cup in 2022
          </span>{" "}
          and the{" "}
          <span className="text-amber-400 font-semibold">
            Copa América in 2021
          </span>
          , cementing his national legacy. Ronaldo, meanwhile, led Portugal to
          historic success by winning{" "}
          <span className="text-amber-400 font-semibold">
            Euro 2016 and the UEFA Nations League in 2019
          </span>
          .
        </p>

        {/* Individual Awards */}
        <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
          Individual Awards
        </h2>
        <p className="mb-4">
          No two players in history have dominated individual awards like Messi
          and Ronaldo. Messi has won the{" "}
          <span className="text-amber-400 font-semibold">Ballon d’Or 8 times</span>,
          more than any player in history. Ronaldo follows closely with{" "}
          <span className="text-amber-400 font-semibold">5 Ballon d’Ors</span>,
          highlighting his consistency across multiple leagues and eras.
        </p>
        <p className="mb-4">
          In terms of{" "}
          <span className="text-amber-400 font-semibold">Golden Boots</span>,
          Messi has collected{" "}
          <span className="text-amber-400 font-semibold">
            6 European Golden Shoes
          </span>
          , while Ronaldo has{" "}
          <span className="text-amber-400 font-semibold">4</span>. Both have also
          won countless league MVP awards, UEFA Best Player honors, and FIFA The
          Best titles.
        </p>

        {/* Records */}
        <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
          Records and Milestones
        </h2>
        <p className="mb-4">
          Messi holds the record for{" "}
          <span className="text-amber-400 font-semibold">
            most goals in a calendar year (91 in 2012)
          </span>
          , as well as{" "}
          <span className="text-amber-400 font-semibold">
            most assists in history
          </span>
          . Ronaldo is the{" "}
          <span className="text-amber-400 font-semibold">
            all-time leading scorer in the UEFA Champions League
          </span>{" "}
          and the{" "}
          <span className="text-amber-400 font-semibold">
            all-time top scorer in men’s international football
          </span>
          .
        </p>
        <p className="mb-4">
          Their records go beyond numbers: Messi is admired for his playmaking,
          while Ronaldo is celebrated for his longevity and goal-scoring machine
          mentality.
        </p>

        {/* Legacy */}
        <h2 className="text-2xl font-semibold text-white mt-8 mb-3">
          Equal Legends, Different Paths
        </h2>
        <p className="mb-4">
          While Messi is often seen as the natural talent blessed with{" "}
          <span className="text-amber-400 font-semibold">
            unmatched dribbling and vision
          </span>
          , Ronaldo represents{" "}
          <span className="text-amber-400 font-semibold">
            relentless hard work, discipline, and athleticism
          </span>
          . Their achievements reflect two different roads to greatness, yet both
          roads led to the very top of world football.
        </p>
        <p className="mb-4">
          Instead of choosing one as the “greatest,” it may be fairer to recognize
          that{" "}
          <span className="text-amber-400 font-semibold">
            football was blessed with both Messi and Ronaldo in the same era
          </span>
          . Their achievements are not rivals but complementary parts of football
          history.
        </p>

        {/* Conclusion */}
        <h2 className="text-2xl font-semibold text-white mt-8 mb-3">Conclusion</h2>
        <p className="mb-4">
          Messi and Ronaldo’s achievements go far beyond statistics. They are{" "}
          <span className="text-amber-400 font-semibold">
            champions, record-breakers, leaders, and icons
          </span>
          . Whether it’s lifting trophies, collecting Ballon d’Ors, or inspiring
          millions, both have achieved football immortality.
        </p>
        <p className="mt-6 text-center text-lg font-semibold text-amber-400">
          Two players, two legends, one golden era of football achievements.
        </p>
      </div>

      {/* Read more toggle (only on mobile) */}
      <div className="sm:hidden text-center mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-amber-400 font-semibold underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </article>
  );
}
