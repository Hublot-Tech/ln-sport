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

export const LiveScore: React.FC<{ match: Fixtures }> = ({ match }) => {
  const statusType = matchStatusLookup[match.status!] ?? "scheduled";

  return (
    <div
      className={`rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg ${
        statusType === "inPlay" ? "animate-pulse ring ring-orange-400" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold uppercase text-gray-500">
          {formatDate(new Date(match.matchDatetime))}
        </span>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            statusType === "inPlay"
              ? "bg-orange-500 text-white"
              : statusType === "finished"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-800"
          }`}
        >
          {match.status}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {match.team1.logo && (
            <img
              className="h-6 w-6"
              src={match.team1.logo}
              alt={match.team1.name}
            />
          )}
          <span className="font-medium">{match.team1.name}</span>
        </div>
        <span className="text-lg font-bold">{match.score1}</span>
      </div>

      <div className="my-2 h-px bg-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {match.team2.logo && (
            <img
              className="h-6 w-6"
              src={match.team2.logo}
              alt={match.team2.name}
            />
          )}
          <span className="font-medium">{match.team2.name}</span>
        </div>
        <span className="text-lg font-bold">{match.score2}</span>
      </div>
    </div>
  );
};

export default async function LiveScores() {
  const fixtures = await apiClient.fixtures.findAll();

  return (
    <section className="section bg-transparent p-4">
      <SectionTitle title="Scores en direct" pageRef="/live-scores" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {fixtures.slice(0, 6).map((match, index) => (
          <LiveScore key={index} match={match} />
        ))}
      </div>
    </section>
  );
}
