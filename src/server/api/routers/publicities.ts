import { createTRPCRouter, publicProcedure } from "@ln-foot/server/api/trpc";
import { db } from "@ln-foot/server/db";
import { desc } from "drizzle-orm";
import { publicities as PublicitiesTable } from "@ln-foot/server/db/schema";

export const publicitiesRouter = createTRPCRouter({
  latest: publicProcedure.query(async ({}) => {
    const publicities = await db.query.publicities.findMany({
      orderBy: [desc(PublicitiesTable.createdAt)],
      limit: 10,
    });
    return publicities;
  }),
});
