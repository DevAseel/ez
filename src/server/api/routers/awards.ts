import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const awardsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.awards.findMany({
      take: 3,
      orderBy: {
        haki: "asc",
      },
    });
  }),
});
