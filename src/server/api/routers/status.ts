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
    .input(
      z.object({
        status: z.string(),
        userName: z.string(),
        emoji: z.string(),
        hours: z.number(),
        mins: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.status.create({
          data: {
            userId: ctx.session.user.id,
            status: input.status,
            userName: input.userName,
            image: ctx.session.user.image,
            emoji: input.emoji,
            hours: input.hours,
            mins: input.mins,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.status.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
