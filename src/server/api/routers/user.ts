import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { sanitizeInput } from "~/utils/input";
import { env } from "~/env.mjs";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ ctx, input }) => {
      const sanitizedInput = sanitizeInput(input.username);
      if (!sanitizedInput) return null;
      return ctx.prisma.user.upsert({
        where: { uniqueId: sanitizedInput },
        update: {},
        create: {
          uniqueId: sanitizedInput,
        },
      });
    }),
  getUser: publicProcedure
    .input(
      z.object({ username: z.string().or(z.array(z.string())).optional() })
    )
    .query(({ ctx, input }) => {
      const sanitizedInput = sanitizeInput(input.username);
      if (!sanitizedInput) return null;
      return ctx.prisma.user.findUnique({
        where: { uniqueId: sanitizedInput },
      });
    }),
  getUsers: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.user.findMany();
    }),
  getLeaderboardUsers: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.user.findMany({
        where: {
          wins: {
            gt: 0,
          }
        },
        orderBy: {
          wins: "desc",
        },
      });
    }),
  win: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ input }) => {
      const sanitizedInput = sanitizeInput(input.username);
      if (!sanitizedInput) return null;
      return fetch(`${env.BASE_URL}/api/user/win/${sanitizedInput}`);
    }),
  loss: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ input }) => {
      const sanitizedInput = sanitizeInput(input.username);
      if (!sanitizedInput) return null;
      return fetch(`${env.BASE_URL}/api/user/loss/${sanitizedInput}`);
    }),
  reset: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ input }) => {
      const sanitizedInput = sanitizeInput(input.username);
      if (!sanitizedInput) return null;
      return fetch(`${env.BASE_URL}/api/user/reset/${sanitizedInput}`);
    }),
});
