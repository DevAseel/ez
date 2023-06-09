import { pointsRouter } from "./routers/points";
import { createTRPCRouter } from "~/server/api/trpc";
import { statusRouter } from "~/server/api/routers/status";
import { awardsRouter } from "./routers/awards";
import { settingsRouter } from "./routers/settings";
import { userRouter } from "./routers/users";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  status: statusRouter,
  points: pointsRouter,
  awards: awardsRouter,
  settings: settingsRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
