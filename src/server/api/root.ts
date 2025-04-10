import { postRouter } from "@ln-foot/server/api/routers/post";
import {
  createCallerFactory,
  createTRPCRouter,
} from "@ln-foot/server/api/trpc";
import { scoreRouter } from "./routers/score";
import { newsRouter } from "./routers/news";
import { articleRouter } from "./routers/article";
import { highlightRouter } from "./routers/highlight";
import { publiciteRouter } from "./routers/publicite";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  score: scoreRouter,
  news: newsRouter,
  article: articleRouter,
  highlight: highlightRouter,
  publicite: publiciteRouter,
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
