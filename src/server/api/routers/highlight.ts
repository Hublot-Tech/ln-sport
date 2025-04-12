import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@server/api/trpc";
import { db } from "@server/db";
import { highlights as HighlightsTable } from "@server/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

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
  createHighlight: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        videoUrl: z.string(),
        thumbnailUrl: z.string(),
        apiSource: z.string().optional(),
        apiHighlightId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const highlight = await db.insert(HighlightsTable).values({
        title: input.title,
        description: input.description,
        videoUrl: input.videoUrl,
        thumbnailUrl: input.thumbnailUrl,
        apiSource: input.apiSource,
        apiHighlightId: input.apiHighlightId,
      });
      return highlight;
    }),
  updateHighlight: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        videoUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        apiSource: z.string().optional(),
        apiHighlightId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const highlight = await db
        .update(HighlightsTable)
        .set({
          title: input.title,
          description: input.description,
          videoUrl: input.videoUrl,
          thumbnailUrl: input.thumbnailUrl,
          apiSource: input.apiSource,
          apiHighlightId: input.apiHighlightId,
        })
        .where(eq(HighlightsTable.id, input.id));
      return highlight;
    }),
  deleteHighlight: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(HighlightsTable).where(eq(HighlightsTable.id, input.id));
      return { success: true };
    }),
});
