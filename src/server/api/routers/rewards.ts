import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const rewardsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.rewards.findMany({
      take: 5,
      orderBy: {
        points: "asc",
      },
    });
  }),
});
