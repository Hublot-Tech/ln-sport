import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@ln-foot/server/api/trpc";
import { desc, eq } from "drizzle-orm";
import { publicities as PublicitiesTable } from "@ln-foot/server/db/schema";
import { db } from "@ln-foot/server/db";
import { z } from "zod";

export const publicitiesRouter = createTRPCRouter({
  latest: publicProcedure.query(async () => {
    const publicities = await db.query.publicities.findMany({
      orderBy: [desc(PublicitiesTable.createdAt)],
      limit: 10,
    });
    return publicities;
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const publicity = await db.query.publicities.findFirst({
        where: eq(PublicitiesTable.id, input.id),
      });
      return publicity;
    }),
  createPublicity: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        referenceUrl: z.string(),
        imageUrl: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const publicity = await db.insert(PublicitiesTable).values({
        ...input,
      });
      return publicity;
    }),
  updatePublicity: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        referenceUrl: z.string().optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const publicity = await db
        .update(PublicitiesTable)
        .set({ ...input })
        .where(eq(PublicitiesTable.id, input.id));
      return publicity;
    }),
  deletePublicity: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(PublicitiesTable)
        .where(eq(PublicitiesTable.id, input.id));
      return { success: true };
    }),
});
