import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
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
});
