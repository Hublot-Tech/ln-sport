import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@server/api/trpc";
import { db } from "@server/db";
import { ecommerceArticles as EcommerceArticlesTable } from "@server/db/schema";
import { desc, eq } from "drizzle-orm";
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
  createArticle: adminProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        summary: z.string(),
        price: z.number(),
        imageUrl: z.string(),
        sourceUrl: z.string(),
        ecommerceId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const article = await db.insert(EcommerceArticlesTable).values({
        title: input.title,
        content: input.content,
        summary: input.summary,
        price: input.price.toString(),
        imageUrl: input.imageUrl,
        sourceUrl: input.sourceUrl,
        ecommerceId: input.ecommerceId,
      });
      return article;
    }),
  updateArticle: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        summary: z.string().optional(),
        price: z.number().optional(),
        imageUrl: z.string().optional(),
        sourceUrl: z.string().optional(),
        ecommerceId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const article = await db
        .update(EcommerceArticlesTable)
        .set({
          title: input.title,
          content: input.content,
          summary: input.summary,
          price: input.price?.toString(),
          imageUrl: input.imageUrl,
          sourceUrl: input.sourceUrl,
          ecommerceId: input.ecommerceId,
        })
        .where(eq(EcommerceArticlesTable.id, input.id));
      return article;
    }),
  deleteArticle: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(EcommerceArticlesTable)
        .where(eq(EcommerceArticlesTable.id, input.id));
      return { success: true };
    }),
});
