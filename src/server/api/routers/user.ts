/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ id: z.string(), displayName: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const newuser = await db.users.create({
          data: {
            id: input.id,
            displayName: input.displayName,
            credits: 20,
            currentPlan: "Leaf",
          },
        });

        return newuser;
      } catch (err) {
        throw err;
      }
    }),

  //! THIS IS NOT THE RIGHT WAY, NEED TO FIX THIS
  deleteUser: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const deletedUser = await db.users.delete({ where: { id: input } });
      return deletedUser;
    } catch (err) {
      throw err;
    }
  }),
});
