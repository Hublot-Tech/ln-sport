import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@server/api/trpc";
import { db } from "@server/db";
import { desc, eq, inArray } from "drizzle-orm";
import {
  matches as MatchesTable,
  teams as TeamsTable,
} from "@server/db/schema";
import { z } from "zod";

export const matchesRouter = createTRPCRouter({
  latest: publicProcedure.query(async () => {
    const matches = await db.query.matches.findMany({
      orderBy: [desc(MatchesTable.matchDatetime)],
      limit: 10,
    });
    const teams = await db.query.teams.findMany({
      where: inArray(
        TeamsTable.id,
        matches
          .map((match) => match.team1Id ?? "")
          .concat(matches.map((match) => match.team2Id ?? "")),
      ),
    });

    const formattedMatches = await Promise.all(
      matches.map(async (match) => {
        const team1 = teams.find((team) => team.id === match.team1Id);
        const team2 = teams.find((team) => team.id === match.team2Id);
        return {
          ...match,
          team1: team1?.teamName ?? null,
          team2: team2?.teamName ?? null,
        };
      }),
    );

    return formattedMatches;
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const match = await db.query.matches.findFirst({
        where: eq(MatchesTable.id, input.id),
      });
      return match;
    }),
  createMatch: adminProcedure
    .input(
      z.object({
        matchDatetime: z.date(),
        team1Id: z.string(),
        team2Id: z.string(),
        leagueId: z.string(),
        score1: z.number().optional().default(0),
        score2: z.number().optional().default(0),
      }),
    )
    .mutation(async ({ input }) => {
      const match = await db.insert(MatchesTable).values({
        ...input,
      });
      return match;
    }),
  updateMatch: adminProcedure
    .input(
      z.object({
        id: z.string(),
        matchDatetime: z.date().optional(),
        team1Id: z.string().optional(),
        team2Id: z.string().optional(),
        leagueId: z.string().optional(),
        score1: z.number().optional(),
        score2: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const match = await db
        .update(MatchesTable)
        .set({ ...input })
        .where(eq(MatchesTable.id, input.id));
      return match;
    }),
  deleteMatch: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(MatchesTable).where(eq(MatchesTable.id, input.id));
      return { success: true };
    }),
});
