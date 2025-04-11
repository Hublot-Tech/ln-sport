import { db } from "@server/db";
import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
import {
  leagues as LeaguesTable,
  type matches as MatchesTable,
} from "@server/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const leaguesRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const leagues = await db.query.leagues.findMany({
      orderBy: [desc(LeaguesTable.createdAt)],
      with: {
        matches: true,
      },
    });
    return leagues.map(
      (
        league: typeof LeaguesTable.$inferSelect & {
          matches: (typeof MatchesTable.$inferSelect)[];
        },
      ) => ({
        ...league,
        matches: league.matches.filter(
          (match) => match?.matchDatetime && match.matchDatetime > new Date(),
        ),
      }),
    );
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const league = await db.query.leagues.findFirst({
        where: eq(LeaguesTable.id, input.id),
      });
      return league;
    }),
});
