import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const feedbackRouter = createTRPCRouter({
  getAllFeedback: privateProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ ctx }) => {
      return "";
    }),
});
