import { pointsRouter } from "./routers/points";
import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { statusRouter } from "~/server/api/routers/status";
import { rewardsRouter } from "./routers/rewards";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  status: statusRouter,
  points: pointsRouter,
  rewards: rewardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
