import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { users } from "@server/db/schema";
import { compareSync } from "bcryptjs";

class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

export const usersRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
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
});
