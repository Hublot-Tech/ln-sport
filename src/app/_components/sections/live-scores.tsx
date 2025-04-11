import React from "react";
import { SectionTitle } from "../common/section-title";
import type { matches as MatchesTable } from "@server/db/schema";

export type Score = typeof MatchesTable.$inferSelect;
type LiveScoresProps = {
  competition: string;
  scores: Score[];
};

const LiveScore: React.FC<{ match: Score }> = ({ match }) => {
  return (
    <div
      className={`grid ${match.status !== "over" ? "animate-pulse" : ""} rounded-lg border bg-[#F1F0F0] p-4`}
    >
      <div>{match.status}</div>
      <div className="flex justify-between font-bold">
        <div>{match.team1Id}</div>
        <div>{match.score1}</div>
      </div>
      <div className="divider divider-end text-green-500">
        {(match.matchDatetime ?? new Date()).toLocaleString()}&apos;
      </div>
      <div className="flex justify-between font-bold">
        <div>{match.team2Id}</div>
        <div>{match.score2}</div>
      </div>
    </div>
  );
};

const LiveScores: React.FC<LiveScoresProps> = ({ competition, scores }) => {
  return (
    <section className="section bg-transparent p-4">
      <SectionTitle title="Scores en direct" pageRef="/live-scores" />
      <h3 className="mb-4 cursor-pointer bg-blue-900 p-4 text-3xl font-semibold uppercase text-white">
        {competition}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {scores.map((match, index) => (
          <LiveScore key={index} match={match} />
        ))}
      </div>
    </section>
  );
};

export { LiveScores as default, LiveScore };
