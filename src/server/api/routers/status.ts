import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const statusRouter = createTRPCRouter({
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.status.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  addNew: protectedProcedure
    .input(z.object({ status: z.string(), userName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.status.create({
          data: {
            userId: ctx.session.user.id,
            status: input.status,
            userName: input.userName,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.status.findMany({
      take: 5,
    });
  }),
});
