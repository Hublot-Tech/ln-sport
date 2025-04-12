import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { publicProcedure, adminProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { users } from "@server/db/schema";
import { compareSync } from "bcryptjs";
import { db } from "@ln-foot/server/db";

class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

export const usersRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.username),
      });

      if (!user) {
        throw new UserError("User not found");
      }

      if (!compareSync(input.password, user.password)) {
        throw new UserError("Invalid password");
      }

      return user;
    }),
  getUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      return user;
    }),
  createUser: adminProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.insert(users).values({
        email: input.email,
        password: input.password,
        role: "user",
      });

      return user;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().optional(),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await db
        .update(users)
        .set({ ...input })
        .where(eq(users.id, input.id));
      return user;
    }),
});
