import {
  createCallerFactory,
  createTRPCRouter,
} from "@server/api/trpc";
import { matchesRouter } from "./routers/matches";
import { newsArticleRouter } from "./routers/news";
import { ecommerceArticleRouter } from "./routers/article";
import { highlightRouter } from "./routers/highlight";
import { leaguesRouter } from "./routers/leagues";
import { publicitiesRouter } from "./routers/publicities";
import { usersRouter } from "./routers/users";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  matches: matchesRouter,
  news: newsArticleRouter,
  articles: ecommerceArticleRouter,
  highlights: highlightRouter,
  leagues: leaguesRouter,
  publicities: publicitiesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
