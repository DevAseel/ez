import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const awardsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.awards.findMany({
      take: 3,
      orderBy: {
        haki: "asc",
      },
    });
  }),

  update: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.awards.update({
        where: { id: input.id },
        data: {
          isClaimed: true,
          awardedUser: ctx.session.user.name,
          awardedUserId: ctx.session.user.id,
        },
      });
    }),
});
