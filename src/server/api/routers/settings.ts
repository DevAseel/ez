import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  userSettings: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userSettings.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  addUserSettings: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
        workingHours: z.string(),
        timeZone: z.string(),
        location: z.string(),
        githubAccount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userSettings.create({
          data: {
            userId: ctx.session.user.id,
            bio: input.bio,
            workingHours: input.workingHours,
            timeZone: input.timeZone,
            location: input.location,
            githubAccount: input.githubAccount,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  updateUserSettings: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
        workingHours: z.string(),
        timeZone: z.string(),
        location: z.string(),
        githubAccount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userSettings.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            bio: input.bio,
            workingHours: input.workingHours,
            timeZone: input.timeZone,
            location: input.location,
            githubAccount: input.githubAccount,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
