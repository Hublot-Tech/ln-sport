import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
import { db } from "@server/db";
import { desc, eq } from "drizzle-orm";
import { ecommerceArticles as EcommerceArticlesTable } from "@server/db/schema";
import { z } from "zod";

export const ecommerceArticleRouter = createTRPCRouter({
  latest: publicProcedure.query(async () => {
    const articles = await db.query.ecommerceArticles.findMany({
      orderBy: [desc(EcommerceArticlesTable.createdAt)],
    });
    return articles;  
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const article = await db.query.ecommerceArticles.findFirst({
        where: eq(EcommerceArticlesTable.id, input.id),
      });
      return article;
    }),
});
