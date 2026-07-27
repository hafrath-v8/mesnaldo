// pages/check-data.tsx

import { supabase } from "../lib/supabase";
import { GetServerSideProps } from "next";
import { useState } from "react";

// ------------------------------------------------------------------
// TYPES
// ------------------------------------------------------------------
interface CompetitionSummary {
  competition: string;
  total_goals: number;
  matches: number;
  avg_goals_per_match: number;
}

interface TeamSummary {
  team: string;
  total_goals: number;
}

interface CareerStats {
  player_id: number;
  total_goals: number;
  total_games: number;
}

interface ColumnSums {
  goals: number;
  assists: number;
  minutes_played: number;
  team_score: number;
  opponent_score: number;
}

interface CheckDataProps {
  careerStats: CareerStats[];
  messiComps: CompetitionSummary[];
  ronaldoComps: CompetitionSummary[];
  messiInternationalComps: CompetitionSummary[];
  ronaldoInternationalComps: CompetitionSummary[];
  messiTeams: TeamSummary[];
  ronaldoTeams: TeamSummary[];
  messiAll: any[];
  ronaldoAll: any[];
  messiTotalFromMatches: number;
  ronaldoTotalFromMatches: number;
  messiColumnSums: ColumnSums;
  ronaldoColumnSums: ColumnSums;
  messiRowCount: number;
  ronaldoRowCount: number;
  buildTime: string;
}

// ------------------------------------------------------------------
// HELPER: Fetch ALL rows by paginating (bypasses 1000 row limit)
// ------------------------------------------------------------------
async function fetchAllMatches(playerId: number) {
  const pageSize = 1000;
  let allRows: any[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("player_id", playerId)
      .range(from, from + pageSize - 1)
      .order("id", { ascending: true });

    if (error) {
      console.error(`Error fetching player ${playerId}:`, error);
      break;
    }
    if (!data || data.length === 0) break;

    allRows = allRows.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  return allRows;
}

// ------------------------------------------------------------------
// PAGE COMPONENT
// ------------------------------------------------------------------
export default function CheckData({
  careerStats,
  messiComps,
  ronaldoComps,
  messiInternationalComps,
  ronaldoInternationalComps,
  messiTeams,
  ronaldoTeams,
  messiAll,
  ronaldoAll,
  messiTotalFromMatches,
  ronaldoTotalFromMatches,
  messiColumnSums,
  ronaldoColumnSums,
  messiRowCount,
  ronaldoRowCount,
  buildTime,
}: CheckDataProps) {
  const [showMessi, setShowMessi] = useState(false);
  const [showRonaldo, setShowRonaldo] = useState(false);

  const messiCareer = careerStats.find((c) => c.player_id === 1);
  const ronaldoCareer = careerStats.find((c) => c.player_id === 2);

  const sumGoals = (list: CompetitionSummary[]) =>
    list.reduce((acc, cur) => acc + cur.total_goals, 0);

  const messiInternationalTotal = sumGoals(messiInternationalComps);
  const ronaldoInternationalTotal = sumGoals(ronaldoInternationalComps);

  const findMatchingColumn = (careerTotal: number, sums: ColumnSums) => {
    const matches: string[] = [];
    if (sums.goals === careerTotal) matches.push("goals");
    if (sums.assists === careerTotal) matches.push("assists");
    if (sums.minutes_played === careerTotal) matches.push("minutes_played");
    if (sums.team_score === careerTotal) matches.push("team_score");
    if (sums.opponent_score === careerTotal) matches.push("opponent_score");
    return matches;
  };

  const messiMatch = messiCareer
    ? findMatchingColumn(messiCareer.total_goals, messiColumnSums)
    : [];
  const ronaldoMatch = ronaldoCareer
    ? findMatchingColumn(ronaldoCareer.total_goals, ronaldoColumnSums)
    : [];

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        padding: 40,
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 10 }}>
        📊 Database Check – Data Accuracy
      </h1>
      <p style={{ color: "#666", fontSize: 12, marginBottom: 30 }}>
        Page generated at: {buildTime}
      </p>

      {/* ------------------------------------------------------------------
          ROW COUNTS
          ------------------------------------------------------------------ */}
      <div style={{ background: "#111", padding: 20, borderRadius: 12, marginBottom: 30 }}>
        <h2 style={{ color: "#F59E0B", fontSize: 18, marginBottom: 10 }}>📊 Row Counts</h2>
        <div style={{ display: "flex", gap: 40 }}>
          <div>
            <p style={{ color: "#60a5fa" }}>🔵 Messi</p>
            <p style={{ fontSize: 24, fontWeight: "bold" }}>{messiRowCount}</p>
            <p style={{ color: "#9ca3af", fontSize: 12 }}>Expected: 1162</p>
            <p style={{ color: messiRowCount === 1162 ? "#34d399" : "#f87171" }}>
              {messiRowCount === 1162 ? "✅ Complete" : "⚠️ Missing rows"}
            </p>
          </div>
          <div>
            <p style={{ color: "#f87171" }}>🔴 Ronaldo</p>
            <p style={{ fontSize: 24, fontWeight: "bold" }}>{ronaldoRowCount}</p>
            <p style={{ color: "#9ca3af", fontSize: 12 }}>Expected: 1330</p>
            <p style={{ color: ronaldoRowCount === 1330 ? "#34d399" : "#f87171" }}>
              {ronaldoRowCount === 1330 ? "✅ Complete" : "⚠️ Missing rows"}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          CAREER STATS VERIFICATION
          ------------------------------------------------------------------ */}
      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#3B82F6", marginBottom: 10 }}>
          ✅ Career Stats Verification
        </h2>

        {/* Messi */}
        <div style={{ marginBottom: 15 }}>
          <p style={{ color: "#60a5fa", fontWeight: "bold" }}>
            🔵 Messi (player_id = 1)
          </p>
          {messiCareer ? (
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span>
                Career total (career_stats):{" "}
                <strong style={{ color: "#34d399" }}>{messiCareer.total_goals}</strong>
              </span>
              <span>
                Sum from matches table (goals):{" "}
                <strong style={{ color: "#34d399" }}>{messiTotalFromMatches}</strong>
              </span>
              <span>
                Status:{" "}
                {messiCareer.total_goals === messiTotalFromMatches ? (
                  <span style={{ color: "#34d399" }}>✅ MATCH</span>
                ) : (
                  <span style={{ color: "#f87171" }}>⚠️ MISMATCH ({Math.abs(messiCareer.total_goals - messiTotalFromMatches)} diff)</span>
                )}
              </span>
            </div>
          ) : (
            <span style={{ color: "#f87171" }}>No career stats found</span>
          )}
        </div>

        {/* Ronaldo */}
        <div>
          <p style={{ color: "#f87171", fontWeight: "bold" }}>
            🔴 Ronaldo (player_id = 2)
          </p>
          {ronaldoCareer ? (
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span>
                Career total (career_stats):{" "}
                <strong style={{ color: "#34d399" }}>{ronaldoCareer.total_goals}</strong>
              </span>
              <span>
                Sum from matches table (goals):{" "}
                <strong style={{ color: "#34d399" }}>{ronaldoTotalFromMatches}</strong>
              </span>
              <span>
                Status:{" "}
                {ronaldoCareer.total_goals === ronaldoTotalFromMatches ? (
                  <span style={{ color: "#34d399" }}>✅ MATCH</span>
                ) : (
                  <span style={{ color: "#f87171" }}>⚠️ MISMATCH ({Math.abs(ronaldoCareer.total_goals - ronaldoTotalFromMatches)} diff)</span>
                )}
              </span>
            </div>
          ) : (
            <span style={{ color: "#f87171" }}>No career stats found</span>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          COLUMN MAPPING CHECK
          ------------------------------------------------------------------ */}
      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#F59E0B", marginBottom: 10 }}>
          🔎 Column Mapping Check
        </h2>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 15 }}>
          Sum of each numeric column from the <code>matches</code> table.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <p style={{ color: "#60a5fa", fontWeight: "bold" }}>🔵 Messi</p>
            <ul style={{ listStyle: "none", padding: 0, fontSize: 14 }}>
              <li style={{ padding: "4px 0" }}>goals: <strong>{messiColumnSums.goals.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>assists: <strong>{messiColumnSums.assists.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>minutes_played: <strong>{messiColumnSums.minutes_played.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>team_score: <strong>{messiColumnSums.team_score.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>opponent_score: <strong>{messiColumnSums.opponent_score.toLocaleString()}</strong></li>
            </ul>
            {messiCareer && (
              <div style={{ marginTop: 10 }}>
                Career total: <strong style={{ color: "#34d399" }}>{messiCareer.total_goals}</strong>
                <br />
                Matching column:{" "}
                {messiMatch.length > 0 ? (
                  <span style={{ color: "#34d399" }}>{messiMatch.join(", ")}</span>
                ) : (
                  <span style={{ color: "#f87171" }}>None</span>
                )}
              </div>
            )}
          </div>

          <div>
            <p style={{ color: "#f87171", fontWeight: "bold" }}>🔴 Ronaldo</p>
            <ul style={{ listStyle: "none", padding: 0, fontSize: 14 }}>
              <li style={{ padding: "4px 0" }}>goals: <strong>{ronaldoColumnSums.goals.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>assists: <strong>{ronaldoColumnSums.assists.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>minutes_played: <strong>{ronaldoColumnSums.minutes_played.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>team_score: <strong>{ronaldoColumnSums.team_score.toLocaleString()}</strong></li>
              <li style={{ padding: "4px 0" }}>opponent_score: <strong>{ronaldoColumnSums.opponent_score.toLocaleString()}</strong></li>
            </ul>
            {ronaldoCareer && (
              <div style={{ marginTop: 10 }}>
                Career total: <strong style={{ color: "#34d399" }}>{ronaldoCareer.total_goals}</strong>
                <br />
                Matching column:{" "}
                {ronaldoMatch.length > 0 ? (
                  <span style={{ color: "#34d399" }}>{ronaldoMatch.join(", ")}</span>
                ) : (
                  <span style={{ color: "#f87171" }}>None</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          INTERNATIONAL GOALS BREAKDOWN
          ------------------------------------------------------------------ */}
      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#F59E0B", marginBottom: 10 }}>
          🌍 International Goals
        </h2>

        <div style={{ marginBottom: 20 }}>
          <p style={{ color: "#60a5fa", fontWeight: "bold" }}>
            🔵 Messi – International:{" "}
            <span style={{ color: "#34d399" }}>{messiInternationalTotal} goals</span>
          </p>
          {messiInternationalComps.length > 0 ? (
            messiInternationalComps.map((item) => (
              <div key={item.competition} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #222", fontSize: 14 }}>
                <span style={{ color: "#e5e7eb" }}>{item.competition}</span>
                <span style={{ color: "#60a5fa" }}>{item.total_goals} goals ({item.matches} matches, avg {item.avg_goals_per_match.toFixed(2)})</span>
              </div>
            ))
          ) : (
            <span style={{ color: "#9ca3af" }}>No international matches found</span>
          )}
        </div>

        <div>
          <p style={{ color: "#f87171", fontWeight: "bold" }}>
            🔴 Ronaldo – International:{" "}
            <span style={{ color: "#34d399" }}>{ronaldoInternationalTotal} goals</span>
          </p>
          {ronaldoInternationalComps.length > 0 ? (
            ronaldoInternationalComps.map((item) => (
              <div key={item.competition} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #222", fontSize: 14 }}>
                <span style={{ color: "#e5e7eb" }}>{item.competition}</span>
                <span style={{ color: "#f87171" }}>{item.total_goals} goals ({item.matches} matches, avg {item.avg_goals_per_match.toFixed(2)})</span>
              </div>
            ))
          ) : (
            <span style={{ color: "#9ca3af" }}>No international matches found</span>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          GOALS BY COMPETITION (ALL)
          ------------------------------------------------------------------ */}
      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#3B82F6", marginBottom: 10 }}>🔵 Messi – Goals by Competition (All)</h2>
        {messiComps.map((item) => (
          <div key={item.competition} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #222" }}>
            <span style={{ color: "#e5e7eb" }}>{item.competition}</span>
            <span style={{ color: "#60a5fa" }}>{item.total_goals} goals ({item.matches} matches)</span>
          </div>
        ))}
        <p style={{ marginTop: 10, color: "#60a5fa", fontWeight: "bold" }}>
          TOTAL: {messiComps.reduce((s, r) => s + r.total_goals, 0)} goals
        </p>
      </div>

      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#EF4444", marginBottom: 10 }}>🔴 Ronaldo – Goals by Competition (All)</h2>
        {ronaldoComps.map((item) => (
          <div key={item.competition} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #222" }}>
            <span style={{ color: "#e5e7eb" }}>{item.competition}</span>
            <span style={{ color: "#f87171" }}>{item.total_goals} goals ({item.matches} matches)</span>
          </div>
        ))}
        <p style={{ marginTop: 10, color: "#f87171", fontWeight: "bold" }}>
          TOTAL: {ronaldoComps.reduce((s, r) => s + r.total_goals, 0)} goals
        </p>
      </div>

      {/* ------------------------------------------------------------------
          GOALS BY TEAM
          ------------------------------------------------------------------ */}
      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#3B82F6", marginBottom: 10 }}>🔵 Messi – Goals by Team</h2>
        {messiTeams.map((item) => (
          <div key={item.team} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #222" }}>
            <span style={{ color: "#e5e7eb" }}>{item.team}</span>
            <span style={{ color: "#60a5fa" }}>{item.total_goals} goals</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, color: "#EF4444", marginBottom: 10 }}>🔴 Ronaldo – Goals by Team</h2>
        {ronaldoTeams.map((item) => (
          <div key={item.team} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #222" }}>
            <span style={{ color: "#e5e7eb" }}>{item.team}</span>
            <span style={{ color: "#f87171" }}>{item.total_goals} goals</span>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------------
          SAMPLE MATCHES
          ------------------------------------------------------------------ */}
      <div style={{ marginBottom: 30, background: "#111", padding: 20, borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>
          <button onClick={() => setShowMessi(!showMessi)} style={{ background: "#3B82F6", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginRight: 10 }}>
            {showMessi ? "Hide" : "Show"} Messi Matches (Sample 10)
          </button>
          <button onClick={() => setShowRonaldo(!showRonaldo)} style={{ background: "#EF4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>
            {showRonaldo ? "Hide" : "Show"} Ronaldo Matches (Sample 10)
          </button>
        </h2>
        {showMessi && messiAll?.slice(0, 10).map((m: any, i: number) => (
          <div key={i} style={{ background: "#1a1a1a", padding: 10, marginBottom: 5, borderRadius: 6, fontSize: 11 }}>
            <span style={{ color: "#60a5fa" }}>{m.team}</span> vs <span>{m.opponent}</span> |{" "}
            <span style={{ color: "#34d399" }}>{m.goals}G</span> |{" "}
            <span style={{ color: "#a78bfa" }}>{m.competition}</span> |{" "}
            <span style={{ color: "#fbbf24" }}>{m.team_score}-{m.opponent_score}</span>
          </div>
        ))}
        {showRonaldo && ronaldoAll?.slice(0, 10).map((m: any, i: number) => (
          <div key={i} style={{ background: "#1a1a1a", padding: 10, marginBottom: 5, borderRadius: 6, fontSize: 11 }}>
            <span style={{ color: "#f87171" }}>{m.team}</span> vs <span>{m.opponent}</span> |{" "}
            <span style={{ color: "#34d399" }}>{m.goals}G</span> |{" "}
            <span style={{ color: "#a78bfa" }}>{m.competition}</span> |{" "}
            <span style={{ color: "#fbbf24" }}>{m.team_score}-{m.opponent_score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// SERVER SIDE PROPS (fetches ALL rows using pagination)
// ------------------------------------------------------------------
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: careerStats } = await supabase.from("career_stats").select("*");

    // Fetch ALL matches using pagination
    const messiAllMatches = await fetchAllMatches(1);
    const ronaldoAllMatches = await fetchAllMatches(2);

    const groupByCompetition = (matches: any[]): CompetitionSummary[] => {
      const map: Record<string, { total_goals: number; matches: number }> = {};
      matches?.forEach((m) => {
        const comp = m.competition || "Unknown";
        if (!map[comp]) map[comp] = { total_goals: 0, matches: 0 };
        map[comp].total_goals += m.goals || 0;
        map[comp].matches += 1;
      });
      return Object.entries(map).map(([competition, data]) => ({
        competition,
        total_goals: data.total_goals,
        matches: data.matches,
        avg_goals_per_match: data.matches > 0 ? data.total_goals / data.matches : 0,
      }));
    };

    const groupByTeam = (matches: any[]): TeamSummary[] => {
      const map: Record<string, number> = {};
      matches?.forEach((m) => {
        const team = m.team || "Unknown";
        map[team] = (map[team] || 0) + (m.goals || 0);
      });
      return Object.entries(map).map(([team, total_goals]) => ({ team, total_goals }));
    };

    const computeColumnSums = (matches: any[]): ColumnSums => {
      let goals = 0, assists = 0, minutes_played = 0, team_score = 0, opponent_score = 0;
      matches?.forEach((m) => {
        goals += m.goals || 0;
        assists += m.assists || 0;
        minutes_played += m.minutes_played || 0;
        team_score += m.team_score || 0;
        opponent_score += m.opponent_score || 0;
      });
      return { goals, assists, minutes_played, team_score, opponent_score };
    };

    const messiColumnSums = computeColumnSums(messiAllMatches);
    const ronaldoColumnSums = computeColumnSums(ronaldoAllMatches);

    const messiComps = groupByCompetition(messiAllMatches);
    const ronaldoComps = groupByCompetition(ronaldoAllMatches);

    const internationalCompetitions = [
      "World Cup", "World Cup Qualifier", "UEFA Euros", "Copa America",
      "International Friendly", "Nations League", "Finalissima", "Confederations Cup",
    ];

    const messiInternational = messiAllMatches.filter((m) => internationalCompetitions.includes(m.competition));
    const ronaldoInternational = ronaldoAllMatches.filter((m) => internationalCompetitions.includes(m.competition));

    const messiTeams = groupByTeam(messiAllMatches);
    const ronaldoTeams = groupByTeam(ronaldoAllMatches);

    const messiAll = messiAllMatches.slice(0, 10);
    const ronaldoAll = ronaldoAllMatches.slice(0, 10);

    return {
      props: {
        careerStats: careerStats || [],
        messiComps: messiComps.sort((a, b) => b.total_goals - a.total_goals),
        ronaldoComps: ronaldoComps.sort((a, b) => b.total_goals - a.total_goals),
        messiInternationalComps: groupByCompetition(messiInternational).sort((a, b) => b.total_goals - a.total_goals),
        ronaldoInternationalComps: groupByCompetition(ronaldoInternational).sort((a, b) => b.total_goals - a.total_goals),
        messiTeams: messiTeams.sort((a, b) => b.total_goals - a.total_goals),
        ronaldoTeams: ronaldoTeams.sort((a, b) => b.total_goals - a.total_goals),
        messiAll,
        ronaldoAll,
        messiTotalFromMatches: messiColumnSums.goals,
        ronaldoTotalFromMatches: ronaldoColumnSums.goals,
        messiColumnSums,
        ronaldoColumnSums,
        messiRowCount: messiAllMatches.length,
        ronaldoRowCount: ronaldoAllMatches.length,
        buildTime: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        careerStats: [], messiComps: [], ronaldoComps: [],
        messiInternationalComps: [], ronaldoInternationalComps: [],
        messiTeams: [], ronaldoTeams: [], messiAll: [], ronaldoAll: [],
        messiTotalFromMatches: 0, ronaldoTotalFromMatches: 0,
        messiColumnSums: { goals: 0, assists: 0, minutes_played: 0, team_score: 0, opponent_score: 0 },
        ronaldoColumnSums: { goals: 0, assists: 0, minutes_played: 0, team_score: 0, opponent_score: 0 },
        messiRowCount: 0, ronaldoRowCount: 0,
        buildTime: new Date().toISOString(),
      },
    };
  }
};