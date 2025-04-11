import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
import { eq, desc } from "drizzle-orm";
import { db } from "@server/db";
import { z } from "zod";
import { highlights as HighlightsTable } from "@server/db/schema";

export const highlightRouter = createTRPCRouter({
  latest: publicProcedure.query(async () => {
    const highlights = await db.query.highlights.findMany({
      orderBy: [desc(HighlightsTable.publishedAt)],
    });
    return highlights;
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const highlight = await db.query.highlights.findFirst({
        where: eq(HighlightsTable.id, input.id),
      });
      return highlight;
    }),
});
