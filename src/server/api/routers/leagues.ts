import { db } from "@server/db";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@server/api/trpc";
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
  createLeague: adminProcedure
    .input(
      z.object({
        leagueName: z.string(),
        country: z.string(),
        tier: z.number().optional(),
        apiSource: z.string().optional(),
        apiLeagueId: z.string().optional(),
        logoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const league = await db.insert(LeaguesTable).values({
        ...input,
      });
      return league;
    }),
  updateLeague: adminProcedure
    .input(
      z.object({
        id: z.string(),
        leagueName: z.string().optional(),
        country: z.string().optional(),
        tier: z.number().optional(),
        apiSource: z.string().optional(),
        apiLeagueId: z.string().optional(),
        logoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const league = await db
        .update(LeaguesTable)
        .set({ ...input })
        .where(eq(LeaguesTable.id, input.id));
      return league;
    }),
  deleteLeague: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(LeaguesTable).where(eq(LeaguesTable.id, input.id));
      return { success: true };
    }),
});
