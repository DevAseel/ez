import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const pointsRouter = createTRPCRouter({
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.points.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  addNew: protectedProcedure
    .input(z.object({ points: z.number(), userName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.points.create({
          data: {
            userId: ctx.session.user.id,
            points: input.points,
            userName: input.userName,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.points.findMany({
      distinct: ["userId"],
      orderBy: {
        points: "desc",
      },
    });
  }),
});
