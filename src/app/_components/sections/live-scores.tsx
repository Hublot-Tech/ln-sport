import React from "react";
import { SectionTitle } from "../common/section-title";
import type { Fixtures } from "@ln-foot/api/types";
import { apiClient } from "@ln-foot/api/api-client";
import { formatDate } from "@ln-foot/utils";

const matchStatusLookup: Record<
  string,
  | "scheduled"
  | "inPlay"
  | "finished"
  | "postponed"
  | "cancelled"
  | "abandoned"
  | "notPlayed"
> = {
  // Scheduled
  TBD: "scheduled",
  NS: "scheduled",

  // In Play
  "1H": "inPlay",
  HT: "inPlay",
  "2H": "inPlay",
  ET: "inPlay",
  BT: "inPlay",
  P: "inPlay",
  SUSP: "inPlay",
  INT: "inPlay",
  LIVE: "inPlay",

  // Finished
  FT: "finished",
  AET: "finished",
  PEN: "finished",

  // Postponed
  PST: "postponed",

  // Cancelled
  CANC: "cancelled",

  // Abandoned
  ABD: "abandoned",

  // Not Played
  AWD: "notPlayed",
  WO: "notPlayed",
};

type LiveScoresProps = {
  leagueName: string;
  leagueId?: string;
};

export const LiveScore: React.FC<{ match: Fixtures }> = ({ match }) => {
  return (
    <div
      className={`grid ${matchStatusLookup[match.status!] === "inPlay" ? "animate-pulse" : ""} rounded-lg border bg-[#F1F0F0] p-4`}
    >
      <div>{match.status}</div>
      <div className="flex justify-between font-bold">
        <div>
          {match.team1.logo && (
            <img width={50} src={match.team1.logo} alt={match.team1.name} />
          )}
          {match.team1.name}
        </div>
        <div>{match.score1}</div>
      </div>
      <div className="divider divider-end text-green-500">
        {formatDate(new Date(match.matchDatetime))}&apos;
      </div>
      <div className="flex justify-between font-bold">
        <div>
          {match.team2.logo && (
            <img width={50} src={match.team2.logo} alt={match.team2.name} />
          )}
          {match.team2.name}
        </div>
        <div>{match.score2}</div>
      </div>
    </div>
  );
};

export default async function LiveScores({
  leagueId,
  leagueName,
}: LiveScoresProps) {
  const scores = await apiClient.fixtures.findAll();
  return (
    <section className="section bg-transparent p-4">
      <SectionTitle title="Scores en direct" pageRef="/live-scores" />
      <h3 className="mb-4 cursor-pointer bg-[#0D2648] p-4 text-3xl font-semibold uppercase text-white">
        {leagueName}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {scores
          .filter((_) => _.leagueId === leagueId)
          .slice(0, 5)
          .map((match, index) => (
            <LiveScore key={index} match={match} />
          ))}
      </div>
    </section>
  );
}
