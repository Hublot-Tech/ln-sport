import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@server/api/trpc";
import { eq, desc } from "drizzle-orm";
import { db } from "@server/db";
import { z } from "zod";
import { newsArticles as NewsArticlesTable } from "@server/db/schema";

export const newsArticleRouter = createTRPCRouter({
  latest: publicProcedure.query(async () => {
    const news = await db.query.newsArticles.findMany({
      orderBy: [desc(NewsArticlesTable.createdAt)],
    });
    return news;
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const news = await db.query.newsArticles.findFirst({
        where: eq(NewsArticlesTable.id, input.id),
      });
      return news;
    }),
  createNewsArticle: adminProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        imageUrl: z.string(),
        sourceUrl: z.string(),
        apiSource: z.string().optional(),
        apiNewsId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const news = await db.insert(NewsArticlesTable).values({
        ...input,
      });
      return news;
    }),
  updateNewsArticle: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        sourceUrl: z.string().optional(),
        apiSource: z.string().optional(),
        apiNewsId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const news = await db
        .update(NewsArticlesTable)
        .set({ ...input })
        .where(eq(NewsArticlesTable.id, input.id));
      return news;
    }),
  deleteNewsArticle: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(NewsArticlesTable)
        .where(eq(NewsArticlesTable.id, input.id));
      return { success: true };
    }),
});
